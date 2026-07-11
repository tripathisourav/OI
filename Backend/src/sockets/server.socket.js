import { Server } from 'socket.io'


let io;

export function initSocket(httpServer) {
    io = new Server(httpServer, {   
        cors: {
            origin: "http://localhost:5173",
            credentials: true
        }
    })

    console.log("socket.io server is running")

    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id)  // Log the socket ID of the connected user, if user reconnects, socket ID will change, so we can track connections and disconnections.
    })
}


export function getIO() {
    if(!io) {
        throw new Error("Socket.io not initialized")
    }

    return io
}