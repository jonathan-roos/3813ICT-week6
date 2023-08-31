module.exports = {
    connect: function(io, PORT) {

        io.on('connect', (socket) => {

            // Event to send message back to clients
            socket.on('message', (message) => {
                chat.emit('message', message)
            });

        })
    }
}