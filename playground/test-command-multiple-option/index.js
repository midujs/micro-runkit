const program = require('commander');

const collect = (val, bucket) => {
  bucket.push(val);
  return bucket;
};

program.version('0.0.1');

program
  .command('test')
  .option('-i, --ignore-service [service]', 'Repeat', collect, [])
  .action(cmd => {
    console.log(cmd.ignoreService);
  });

program.parse(process.argv);
