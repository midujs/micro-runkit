const fs = require('fs');

const run = () => {
  try {
    const envContent = fs.readFileSync('./.env', 'utf8');
    console.log('[envContent]', envContent);
  } catch (err) {
    console.log(
      '[INFO] Secrete added by "RUN --mount=type=secret" in Dockerfile: secret at BUILD-TIME',
    );
    console.log('[ERR]', err.message);
  }
};

const loop = func =>
  Promise.resolve(func()) //
    .then(() => setTimeout(() => loop(func), 1000));

loop(run);
