const ora = require('ora');

const spinner = ora('Loading unicorns').start();

setTimeout(() => {
  spinner.color = 'yellow';
  spinner.text = 'Loading rainbows';
}, 1000);

setTimeout(() => {
  spinner.stop();
  spinner.succeed('OK, Good to see it complete');
}, 3000);
