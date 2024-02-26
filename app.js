const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/', (req, res) => {
  res.send('Welcome to the CORS Proxy Server!');
});

// Forward all other requests to the target API
app.all('*', (req, res) => {
  const targetUrl = 'https://west.biz.id' + req.url;

  req.pipe(
    request(targetUrl)
      .on('response', (res) => {
        res.pipe(res);
      })
      .on('error', (err) => {
        res.status(500).send(err);
      })
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});