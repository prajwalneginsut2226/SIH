// Initialising socket
import { Server } from 'socket.io'


export function setupSocket(io) {
    io.on('connection', (socket) => {

        console.log('Client connected', socket.id)

        socket.on('message', async(data) => {

            socket.broadcast.emit("message", data)

        })

        socket.on('disconnect', () => {
            console.log('a client disconnected', socket.id)
        })
    })
} 