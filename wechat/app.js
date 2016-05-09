'use strict'
var Koa = require('koa');
var path = require('path');
var g = require('./gwechat/g');
var weixin = require('./weixin');
var util = require('./libs/util');

var wechat_file=path.join(__dirname,'config/wechat.txt')
var config = require('./config');
var app = new Koa();
app.use(g(config.wechat,weixin.reply));

app.listen(1234);
console.log('Listening:1234');