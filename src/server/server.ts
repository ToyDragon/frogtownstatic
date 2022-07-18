import express from 'express';
import * as path from 'path';
import * as https from 'https';
import * as fs from 'fs';

const app = express();
app.use(express.static(path.resolve(__dirname, '../../docs')));

let sslConfig = null;
try {
  sslConfig = {
    key: fs.readFileSync('secrets/server.key'),
    cert: fs.readFileSync('secrets/server.crt'),
  };
} catch {}

app.listen(8080);
console.log(`Listening on port {8080}.`);
if (sslConfig) {
  https.createServer(sslConfig, app).listen(18443);
  console.log(`Listening on port {18443}.`);
}
