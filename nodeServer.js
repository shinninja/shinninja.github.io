const arrServer = [
  {
    path: '/',
    port: 3005
  }
]

const express = require('express')

for(let i = 0; i < arrServer.length; i++) {
  let app = express()
  let port = arrServer[i].port;
  app.use(express.static(__dirname + arrServer[i].path));
  app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
}