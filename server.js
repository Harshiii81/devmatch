// server.js — starts the server

require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`DevMatch server running on http://localhost:${PORT}`);
});