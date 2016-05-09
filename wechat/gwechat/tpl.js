/**
 * Created by sunny on 16/5/2.
 */
'use strict'
var ejs = require('ejs');
var heredoc = require('heredoc');
//传进来的是congtent
var tpl = heredoc(function(){/*
	<xml>
	<ToUserName><![CDATA[<%= toUserName %>]]></ToUserName>
	<FromUserName><![CDATA[<%= fromUserName %>]]></FromUserName>
	<CreateTime><% createTime %></CreateTime>
	<MsgType><![CDATA[<%= MsgType %>]]></MsgType>
	<% if(MsgType === 'text'){ %>
		<Content><![CDATA[<%= content %>]]></Content>
	<% }else if(MsgType === 'image'){ %>
		<Image>
		<MediaId><![CDATA[<%= content.mediaId %>]]></MediaId>
		</Image>

	<% }else if(MsgType === 'voice'){ %>
		<Voice>
		<MediaId><![CDATA[<%= content.mediaId %>]]></MediaId>
		</Voice>

	<% }else if(MsgType === 'video'){ %>
		<Video>
		<MediaId><![CDATA[<%= content.mediaId %>]]></MediaId>
		<Title><![CDATA[<%= content.title %>]]></Title>
		<Description><![CDATA[<%= content.description %>]]></Description>
		</Video> 

	<% }else if(MsgType === 'music'){ %>
		<Music>
		<Title><![CDATA[<%= content.title %>]]></Title>
		<Description><![<%= content.description %>]]></Description>
		<MusicUrl><![CDATA[<%= content.musicUrl %>]]></MusicUrl>
		<HQMusicUrl><![CDATA[<%= content.hqMusicUrl %>]]></HQMusicUrl>
		<ThumbMediaId><![CDATA[<%= content.thumbMediaId %>]]></ThumbMediaId>
		</Music> 

	<% }else if(MsgType === 'news'){ %>
		<ArticleCount><%= content.length %></ArticleCount>
		<Articles>
		<% content.forEach(function(item){ %>
			<item>
			<Title><![CDATA[<%= item.title %>]]></Title> 
			<Description><![CDATA[<%= item.description %>]]></Description>
			<PicUrl><![CDATA[<%= item.picUrl %>]]></PicUrl>
			<Url><![CDATA[<%= item.url %>]]></Url>
			</item>
		<% }) %>

		</Articles>

 	<% }%>
	</xml>
*/});
//ejs编译这个函数
var compiled = ejs.compile(tpl);
exports= module.exports={
	compiled:compiled
}









