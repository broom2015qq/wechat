'use strict'
var config = require('./config');
var Wechat = require('./gwechat/wechat');
//config.wechat是票据
var wechatApi = new Wechat(config.wechat);
//生成期函数
exports.reply = function* (next){
	var message = this.weixin;
	//关注,取关,点击,发送位置等事件
	if (message.MsgType ==='event') {
		console.log(message.Event);

		if (message.Event ==='subscribe') {
			if (message.EventKey) {
				console.log('扫二维码进来');
			}
			this.body = '我的青春啊，全来学习nodejs了\r\n';
			console.log('我的青春啊，全来学习nodejs了');
		}
		else if (message.Event==='unsubscribe') {
			this.body='无情取关';
			console.log('无情取关');
		}
		else if (message.Event==='LOCATION') {
			this.body='您上报的位置是 '+ message.Latitude+ '/'+ message.Longitude +'-'+message.Precision;
		}
		else if (message.Event==='CLICK') {
			this.body='您点击了菜单 '+ message.EventKey;
		}
		else if (message.Event==='SCAN') {
			console.log('关注后扫二维码'+message.EventKey +''+message.Ticket);
			this.body='你扫了二维码哦 ';
		}
		else if (message.Event==='VIEW') {
			this.body='你点击了菜单中的链接 '+ message.EventKey;
		}
	}
	//用户发的text
	else if (message.MsgType==='text') {
		var content = message.Content;
		var reply = message.Content+'是啥意思?';
		if (content==='1') {
			reply = '第一项';
		}
		else if (content==='2') {
			reply = '第二项';
		}
		else if (content==='3') {
			reply = '第三项';
		}
		else if (content==='4') {
			reply = [{
				title:'nodeJs学习过程之一个图片上传显示的例子',
				description:'学习笔记',
				picUrl:'http://static.open-open.com/news/uploadImg/20140123/20140123090127_450.png',
				url:'http://www.cnblogs.com/thingk/archive/2013/11/25/3434032.html'
			}]
		}
		else if (content==='5') {
			var data =yield wechatApi.uploadMaterial('image',__dirname+'/2.jpg');
			reply = {
				type:'image',
				mediaId:data.media_id
			}
		}
		else if (content==='6') {
			var data =yield wechatApi.uploadMaterial('video',__dirname+'/2.mp4');
			reply = {
				type: 'video',
				title: '回复视频内容',
				description: '发送6,返回视频',
				mediaId: data.media_id
			}
		}

		this.body = reply;

	}
	yield next;
}