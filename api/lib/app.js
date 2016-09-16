import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Autonym, {AutonymResponder} from 'autonym';

import handleError from './handle-error';

process.on('unhandledRejection', handleError);

const app = express();
app.use(bodyParser.json({}));
app.use(cors());

app.get('/', (req, res) => res.json({message: 'Hello world!'}));

app.use(new Autonym(__dirname).middleware);
app.use(new AutonymResponder(handleError).middleware);

http.createServer(app).listen(process.env.PORT, err => {
    if (err) { return handleError(err); }
    console.log(`Listening on port ${process.env.PORT}`);
});