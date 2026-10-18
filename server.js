const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/tasks', (request, response) => {
  response.status(200).json([]);
});

app.listen(PORT, () => {
  console.log(`TaskFlow API is running at http://localhost:${PORT}`);
});
