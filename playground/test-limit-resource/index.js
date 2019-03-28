const os = require('os');

const cpu = os.cpus();
const mem = os.freemem();
const totalMem = os.totalmem();

const run = () => {
  console.log(
    '[cpus, totalMem]',
    cpu.length,
    `${totalMem / 1024 / 1024 / 1024}GB`,
  );
};

const loop = () => {
  run();

  setTimeout(loop, 1000);
};

loop();
