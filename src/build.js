// Import third-party
const cpr = require('child_process');

const { validateParam } = require('./utils');

// Global constant

/**
 * Build client image
 * @param {*} param
 */
const buildClient = param => {
  validateParam(['imageName', 'clientEnv'])(param);

  const {
    imageName, //
    clientEnv,
    context = 'packages/client',
    dockerfile = 'Dockerfile',
  } = param;

  const tagName = imageName.toLowerCase();
  const cmd = [
    'DOCKER_BUILDKIT=1',
    'docker build',
    `--secret id=client_env,src=${clientEnv}`,
    `--tag ${tagName}`,
    `--file ${dockerfile}`,
    '.',
  ].join(' ');

  console.log('[cmd]', cmd);

  cpr.execSync(cmd, {
    cwd: context,
    stdio: 'inherit',
  });
};

/**
 * Build server image
 * @param {*} param
 */
const buildServer = param => {
  validateParam(['imageName'])(param);

  const {
    imageName, //
    context = 'packages/server',
    dockerfile = 'Dockerfile',
  } = param;

  const tagName = imageName.toLowerCase();
  const cmd = [
    'DOCKER_BUILDKIT=1', //
    'docker build',
    `--tag ${tagName}`,
    `--file ${dockerfile}`,
    '.',
  ].join(' ');

  console.log('[cmd]', cmd);

  cpr.execSync(cmd, {
    cwd: context,
    stdio: 'inherit',
  });
};

module.exports = {
  buildClient,
  buildServer,
};
