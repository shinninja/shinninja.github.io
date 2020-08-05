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


//# install dependencies
// npm install

// # initialize
// npm init

// # install express
// npm i express --save

// # execute server
// node himartServer.js

// # 시작프로그램 등록
// window + R
// shell:startup


// # Fiddler 패킷 가로채기
// [AutoResponder] check Enable rules, Unmatched requests passthrough, Add Rule, Save