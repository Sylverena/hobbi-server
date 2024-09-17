/************************
 EXPRESS SERVER FOR hoBBi

 Author: Serena Zapata

 For use of the hoBBi app
 ************************/

const path = require('path');

const express = require('express');
const server = express();
const cors = require('cors')

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, 'public')));

/*
 * Middleware for parsing the request body
 * https://www.npmjs.com/package/body-parser
 */
const bodyParser = require('body-parser')
server.use(bodyParser.json())

