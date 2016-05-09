/**
 * Created by sunny on 16/4/30.
 */
'use strict'
var sha1 = require('sha1');
var Promise = require('bluebird');
var getRawBody = require('raw-body');
//request的then方法,是request promise化之后得到的
var request = Promise.promisify(require('request'));
var Wechat = require('./wechat');
var util = require('./util');
module.exports = function(opts,handler){
    //wechat存储的数据是和微信交互的接口,里面存储信息:票据,还有票据有效性检查的方法
    var wechat = new Wechat(opts);
    return function *(next){//生成期函数
        var that = this;
        console.log(this.query);
        //本地的
        var token = opts.token;
        //请求query里的
        var timestamp = this.query.timestamp;
        var nonce = this.query.nonce;
        var signature = this.query.signature;
        var echostr = this.query.echostr;

        var str = [token,timestamp,nonce].sort().join('');
        var sha = sha1(str);
        if(this.method === 'GET'){
            if(sha == signature){
                this.body = echostr+'';
            }
            else{
                this.body = 'wrong';

            }
        }
        else if(this.method === 'POST'){
            if(sha !== signature){
                this.body = 'wrong';
                return false;
            }
            //获取post来的数据,data是xml类型的数据
            var data = yield getRawBody(this.req, {
                length:this.length,
                limit:'1mb',
                encoding:this.charset
            });
            var content = yield util.parseXMLAsync(data);
            console.log(content);
            var message = util.formatMessage(content.xml);
            console.log(message);
            
            this.weixin = message;
            //走向外层逻辑,改变上下文
            yield handler.call(this,next);
            wechat.reply.call(this);
        }
    }
}
