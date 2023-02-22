
const express = require("express");
const fetch = require('node-fetch');
const cors = require('cors') 

const app = express();
app.use(cors({
    origin: '*'
}))

app.get('/ping', (req, res) => {
  res.json({hello:'ping'})
})

app.get('/allPools/:network/:page', async ({params}, res) => {
  const {network, page} = params;
  let pools = await fetch(`https://app.geckoterminal.com/api/p1/${network}/pools?page=${page}&include=dex`);
  pools = await pools.json();

  res.json(pools)
})

app.get('/trends/:network', async ({params}, res) => {
  const {network} = params;
  let trends = await fetch(`https://app.geckoterminal.com/api/p1/trends?network=${network}`);

  res.json(await trends.json())
})

app.get('/pool/:network/:address', async ({params}, res) => {
  const {network, address} = params;
  let pools = await fetch(`https://app.geckoterminal.com/api/p1/${network}/pools/${address}?include=dex`);
  pools = await pools.json();

  res.json(pools)
})

app.get('/poolTx/:network/:address/:page', async ({params}, res) => {
  const {network, address, page} = params;
  let pools = await fetch(`https://app.geckoterminal.com/api/p1/${network}/pools/${address}/swaps?include=from_token%2Cto_token&page=${page}`);
  pools = await pools.json();

  res.json(pools)
})

app.get('/search/:query', async ({params}, res) => {
  const {query} = params;
  let pools = await fetch(`https://app.geckoterminal.com/api/p1/search?query=${query}`);
  pools = await pools.json();

  res.json(pools)
})


app.listen(3001);

// META POOL
// app.use(
//     '/v1',
//     createProxyMiddleware({
//       target: 'https://uanalytics-api.herokuapp.com/api',
//       changeOrigin: true,
//     })
// );
  