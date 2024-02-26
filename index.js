const express = require('express');
const cors = require('cors');
const proxy = require('http-proxy-middleware');

const app = express();

const port = process.env.PORT || 3000;

const onProxyReq = function (proxyReq, req, res) {
  proxyReq.setHeader('Authorization', 'Basic SECRET');
};

const apiProxy = proxy('**', {
    target: 'https://west.biz.id',
    changeOrigin: true, // for vhosted sites
    onProxyReq: onProxyReq
});

app.use(cors());
app.use(apiProxy);

app.listen(port, function() {
	console.log('Proxy app is running on http://localhost:' + port);
});