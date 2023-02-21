
const express = require("express");
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors')


const app = express();
app.use(cors({
    origin: '*'
}))

app.use('/api', (req, res) => {
    res.json({hello:'hello'})
});

app.listen(3001);

// ALL POOLS
app.use(
    '/',
    createProxyMiddleware({
      target: 'https://app.geckoterminal.com/api/p1',
      changeOrigin: true,
    })
);


app.use(
    '/trends',
    createProxyMiddleware({
      target: 'https://app.geckoterminal.com/api',
      changeOrigin: true,
    })
);

// TAXES
app.use(
    '/default',
    createProxyMiddleware({
      target: 'рttps://aywt3wreda.execute-api.eu-west-1.amazonaws.com',
      changeOrigin: true,
    })
);

// META POOL
app.use(
    '/v1',
    createProxyMiddleware({
      target: 'https://uanalytics-api.herokuapp.com/api',
      changeOrigin: true,
    })
);
  