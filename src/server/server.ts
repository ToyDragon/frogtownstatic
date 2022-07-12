import express from 'express';
import * as path from 'path';

const app = express();
app.use(express.static(path.resolve(__dirname, '../views')));
app.use(express.static(path.resolve(__dirname, '../bundles')));
app.use(express.static(path.resolve(__dirname, '../../src/views')));
app.listen(8080);
console.log(`Listening on port {8080}.`);
