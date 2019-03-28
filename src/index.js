const { buildServer } = require('./build');
const { getCommitHash } = require('./utils');
const { genStack, buildYamlFile } = require('./template');
const runCommand = require('./command');

// console.log('[INDEX]');

/* Test generate stack */
// const stackParam = {
//   IMAGE: 'registry.ltv.coffee:5000/vts_server:latest',
//   API_GATEWAY_PORT: '3000',
//   SERVER_ENV: 'vts_server_env',
//   TRAEFIK_NETWORK: 'traefik-net',
//   DOMAIN: 'vts-dev.traefik.tinypos.org',
// };

// const stack = genStack(stackParam);

/* Test build compose file */
// const buildYamlFileParm = {
//   object: stack,
//   filePath: 'docker-compose.yml',
// };

// buildYamlFile(buildYamlFileParm);

/* Test build server */
// const TAG_NAME = `registry.ltv.coffee:5000/vts_server:${getCommitHash()}`;
// buildServer({ TAG_NAME });

/* Test run command */
runCommand();
