import "dotenv/config.js"
import app from "./src/app.js"
import connectToDB from "./src/config/database.js"
import http from "http"
import { initSocket } from "./src/sockets/server.socket.js"

const PORT = process.env.PORT || 8000



const httpServer = http.createServer(app);
initSocket(httpServer);




connectToDB()
        .catch((error) => {
            console.error("Failed to connect to the database:", error)
            process.exit(1) // Exit the process with a failure code
        })

        

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
