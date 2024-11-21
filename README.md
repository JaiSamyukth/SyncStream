# SyncStream  

**SyncStream** is a synchronized video streaming application that allows multiple clients to view and control video playback in perfect sync. Ideal for remote group watch parties, collaborative video sessions, or synchronized media presentations.  

---

## Features  
- **Real-Time Synchronization**: Ensures all connected clients stay in sync.  
- **Leader Control**: A designated leader manages playback (play, pause).  
- **WebSocket Integration**: Enables seamless communication for syncing data.  
- **Customizable**: Easily update the video source and configurations.  
- **Volume and Audio Control**: Allows individual users to manage their own volume preferences.  

---

## Requirements  
- **Node.js** (v14.x or later)  
- **npm** or **yarn** (for dependency management)  
- A static IP for the leader system (for WebSocket connections).  

---

## Setup Instructions  

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/yourusername/syncstream.git
   cd syncstream
   ```

2. **Install Dependencies**  
   ```bash
   npm install
   ```

3. **Prepare the Environment**  
   - Create an `uploads` directory in the root of the project:  
     ```bash
     mkdir uploads
     ```
   - Ensure the video file (`streamed_video.mp4`) is placed inside the `uploads` directory.  
   - **Update the IP address in both `server.js` and `index.html`:**

     - **In `server.js`**:  
       Change the value of the `appIP` variable to the desired IP address (used for both the HTTP server and WebSocket server).  
       ```javascript
       const appIP = "192.168.137.11"; // Change this to your desired IP address
       ```

     - **In `index.html`**:  
       Update the WebSocket URL to match the new IP address.  
       ```javascript
       const socket = new WebSocket("ws://192.168.137.11"); // Change this to the same IP address
       ```

4. **Run the Application**  
   ```bash
   node server.js
   ```

5. **Access the App**  
   - Open a web browser and navigate to:  
     ```bash
     http://<your-server-ip>:3000
     ```
   - The WebSocket server runs on port `8080` by default.  

---

## How to Use  

1. **Leader System**  
   - Controls video playback (Play/Pause).  
   - Automatically broadcasts sync updates to all connected clients.  

2. **Clients**  
   - Connect to the app using the provided IP.  
   - Playback is automatically synchronized with the leader system.  

---

## Customization  

1. **Change Video**  
   Replace `streamed_video.mp4` in the `uploads` folder with your desired video file. Ensure it has the same filename or update `server.js` accordingly.  

2. **Adjust Video Duration**  
   Update the `videoDuration` value in the `server.js` file to match your video's total duration (in seconds).  

3. **Drift Threshold**  
   Modify the `DRIFT_THRESHOLD` in the frontend script (`index.html`) to control synchronization sensitivity.  

---

## License  
This project is open-source and available under the **MIT License**. Feel free to use, modify, and distribute!  

---

## Contributions  
We welcome contributions!  
- Fork the repository.  
- Create a new branch for your feature/bugfix.  
- Submit a pull request with a detailed description.  

---

### Support  
If you encounter any issues or have questions, please open an [issue](https://github.com/JaiSamyukth/SyncStream/issues).  

Happy Streaming with **SyncStream**! 🎥✨
