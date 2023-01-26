const http = require('http');
const pid = process.pid;

const server = http
                .createServer((req, res) => {
                    for(let i=0;i<1e7;i++) {}
                    res.end(`Hello from Node.js \n`);
                })
                .listen(3000, () => {
                    console.log(`Server start. PID: ${pid}`);
                });

server.on('SIGINT', () => {
    server.close(() => {
        process.exit(0);
    });
});

server.on('SIGTERM', () => {
    server.close(() => {
        process.exit(0);
    });
});

server.on('SIGUSR2', () => {
    server.close(() => {
        process.exit(1);
    });
});