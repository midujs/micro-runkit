const program = require('commander');

const { buildClient, buildServer } = require('../build');
const { genClient, genStack, buildYamlFile } = require('../template');

const collect = (v, arr) => [...arr, v];

const runCommand = () => {
  program.version('0.0.1');

  program
    .command('build:client')
    .option('-i, --image-name <imageName>')
    .option('-i, --client-env <clientEnv>')
    .option('-d, --dockerfile [dockerfile]')
    .option('-c, --context [context]')
    .action(buildClient);

  program
    .command('build:server')
    .option('-i, --image-name <imageName>')
    .option('-d, --dockerfile [dockerfile]')
    .option('-c, --context [context]')
    .action(buildServer);

  program
    .command('compose:server')
    .option('-i, --image <image>')
    .option('-d, --domain <domain>')
    .option('-c, --server-env <serverEnv>')
    .option('-f, --file-path [filePath]')
    .option('-g, --run-in-group [runInGroup]')
    .option('-is, --ignore-services [ignoreServices]', '', collect, [])
    .action(cmd =>
      buildYamlFile({
        object: genStack(cmd),
        filePath: cmd.filePath,
      }),
    );

  program
    .command('compose:client')
    .option('-i, --image <image>')
    .option('-d, --domain <domain>')
    .option('-f, --file-path [filePath]')
    .action(cmd =>
      buildYamlFile({
        object: genClient(cmd),
        filePath: cmd.filePath,
      }),
    );

  program.parse(process.argv);
};

module.exports = runCommand;
