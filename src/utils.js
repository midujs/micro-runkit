const os = require('os');
const cpr = require('child_process');

const getCommitHash = () => {
  const cmd = 'git rev-parse --short HEAD';
  return cpr.execSync(cmd, { encoding: 'utf8' }).trim();
};

/**
 * Validate required params
 * @param {*} keys
 */
const validateParam = keys => param => {
  const hasRequiredKeys = keys.reduce(
    (hasKey, key) => hasKey && param[key],
    true,
  );

  if (!hasRequiredKeys) {
    throw new Error(
      [
        'Please provide required keys:', //
        ...keys.map(key => `  - ${key}`),
      ].join(os.EOL),
    );
  }
};

module.exports = {
  getCommitHash,
  validateParam,
};
