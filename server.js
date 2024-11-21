const express = require("express");
const path = require("path");
const WebSocket = require("ws");
const fs = require("fs");

const app = express();
const port = 3000;

const uploadsDir = path.join(__dirname, "uploads");
const videoPath = path.join(uploadsDir, "streamed_video.mp4");

// Validate video existence
if (!fs.existsSync(uploadsDir) || !fs.existsSync(videoPath)) {
    console.error("Error: 'uploads/streamed_video.mp4' not found.");
    process.exit(1);
}

app.use(express.static(__dirname));
app.use("/uploads", express.static(uploadsDir));

app.listen(port, "0.0.0.0", () => {
    console.log(`Server running at http://192.168.137.11:${port}`);
});

// WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

let currentVideoTime = 0;
let isPlaying = true;
let playbackStartTime = Date.now();
const videoDuration = 379; // Replace with the actual video duration in seconds
const leaderIP = "192.168.137.11"; // Replace with the static IP of your leader system

// Sync broadcast interval
setInterval(() => {
    if (isPlaying) {
        currentVideoTime = (Date.now() - playbackStartTime) / 1000;
        if (currentVideoTime >= videoDuration) {
            currentVideoTime = 0;
            playbackStartTime = Date.now();
        }
    }

    const syncData = JSON.stringify({
        command: "sync",
        videoUrl: "/uploads/streamed_video.mp4",
        leaderTime: currentVideoTime,
        isPlaying: isPlaying,
        serverTimestamp: Date.now(),
    });

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(syncData);
        }
    });
}, 500); // Sync updates every 0.5 seconds

// WebSocket event handling
wss.on("connection", (ws, req) => {
    const clientIP = req.socket.remoteAddress.replace("::ffff:", "");

    console.log(`Client connected: ${clientIP}`);

    // Send initial sync data
    ws.send(
        JSON.stringify({
            command: "sync",
            videoUrl: "/uploads/streamed_video.mp4",
            leaderTime: currentVideoTime,
            isPlaying: isPlaying,
            serverTimestamp: Date.now(),
            isServerLeader: clientIP === leaderIP,
        })
    );

    ws.on("message", (message) => {
        const data = JSON.parse(message);

        // Only process leader commands
        if (clientIP === leaderIP) {
            if (data.command === "pause") {
                isPlaying = false;
                currentVideoTime = (Date.now() - playbackStartTime) / 100000;
            } else if (data.command === "play") {
                isPlaying = true;
                playbackStartTime = Date.now() - currentVideoTime * 1000;
            }
        }
    });

    ws.on("close", () => {
        console.log(`Client disconnected: ${clientIP}`);
    });
});

