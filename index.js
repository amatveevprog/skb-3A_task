import express from 'express';
import cors from 'cors';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';
require('es6-promise').polyfill();

import pc_router from './middlewares/routes/router';
import middleware from './middlewares/routes/routerMiddleware';
const app = express();
app.use(cors());


app.listen(2000,async ()=>{
    console.log('Server Started. Listening on port 2000...');
    await pc_router.makeRoutes();
});

app.use(middleware);

app.use(async (err,req,res,next)=>{
    res.statusCode=404;
    res.end('Not Found');});
