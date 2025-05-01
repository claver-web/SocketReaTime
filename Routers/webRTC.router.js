import express from 'express';
import {webRTC} from '../Controllers/webRTC.Controller.js';

const route = express.Router();

route.get('/', webRTC);


export default route;