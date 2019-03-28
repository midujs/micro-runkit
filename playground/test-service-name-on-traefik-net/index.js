const axios = require('axios');

const apiService = 'vts_api-index';
const apiPort = '3000';
const token =
  'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBsdHYudm4iLCJleHAiOjE1NTgwNTgyNjcsInRlYW1JZCI6MSwicm9sZU5hbWUiOiJTeXN0ZW1BZG1pbmlzdHJhdG9yIiwiaWF0IjoxNTUyODc0MjY3fQ.VkXkJORga9PZBEQ_GyxEiPsrEOjPmdFhJ02NuBTho_s';

const run = () =>
  axios({
    url: `http://${apiService}:${apiPort}/api/graphql`,
    method: 'GET',
    headers: {
      Authorization: token,
    },
  })
    .then(res => {
      const data = res.data;
      console.log(data);
    })
    .catch(err => {
      console.log(err.message);
    });

const loop = () =>
  run().then(() => {
    console.log('Kick off next run');
    console.log('[apiPort]', apiPort);
    console.log('[apiService]', apiService);
    setTimeout(loop, 1000);
  });

loop();
