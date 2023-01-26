const cluster = require('cluster');
const os = require('os');
const pid = process.pid;

if (cluster.isMaster) {
    const cpusCount = os.cpus().length;
    console.log(`CPUs: ${cpusCount}`);
    console.log(`Master start. PID: ${pid}`);
    for(let i = 0;i<cpusCount-1;i++) {
        cluster.fork();
        // worker.send(`Hello from server`);
        // worker.on('message', (message) => {
        //     console.log(`Message from worker pid ${worker.process.pid}: ${JSON.stringify(message)}`);
        // });
    }
    cluster.on('exit', (worker, code) => {
        console.log(`Worker died! PID: ${worker.process.pid}. Code ${code}`);
        if (code === 1) {
            cluster.fork();
        }
    });
} else {
    require('./worker.js');
    // process.on('message', (message) => {
    //     console.log(`Message from master: ${message}`);
    // });
    // process.send({
    //     text: "Hello",
    //     pid
    // });
}