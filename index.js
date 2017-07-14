const { createServer } = require('http');
require('dotenv').config();
const startBot = require('./bot');

const server = createServer((req, res) => {
  res.writeHead(302, {
    Location: 'https://twitter.com/HobbitIntuition',
  });
  res.end();
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`:: server listening on port: ${PORT}`);
  startBot();
});
