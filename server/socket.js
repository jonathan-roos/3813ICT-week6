module.exports = {
    connect: function(io, PORT) {

        io.on('connect', (socket) => {
            console.log('User connection on port ' + PORT + ' : ' + socket.id);

            // Event to send message back to clients
            socket.on('message', (message) => {
                console.log('message recieved')
                io.emit('message', message)
            });

            socket.on('disconnect', () => {
                console.log('Client Disconnected');
            })

        })
    }
}