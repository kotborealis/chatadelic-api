var WebSocket = require("mokou-websocket");
var http = require("http");

var Chatadelic_api = function(){
    var self=this;

    var ws=WebSocket("ws://chatadelic.net:8181/server/ws");

    var _sid=null;
    var _username=null;
    var _password=null;
    var _chat=null;

    /**
     * Set/get chat
     * @param {int} [arg]
     * @returns {int}
     */
    this.chat=function(arg){
        if(arg!==undefined && arg!==null && arg>=0){
            _chat=arg;
        }
        return _chat;
    };

    /**
     * Set/get sid
     * @param {string} [arg]
     * @returns {string}
     */
    this.sid=function(arg){
        if(arg!==undefined && arg!==null && arg!==""){
            _sid=arg;
        }
        return _sid;
    };

    /**
     * Set/get username
     * @param {string} [arg]
     * @returns {string}
     */
    this.username=function(arg){
        if(arg!==undefined && arg!==null && arg!==""){
            _username=arg;
        }
        return _username;
    };

    /**
     * Set password
     * @param {string} arg
     * @returns {}
     */
    this.password=function(arg){
        if(arg!==undefined && arg!==null && arg!==""){
            _password=arg;
        }
    };

    /**
     * Login into chat and get chatadelic response with session token
     * Returns chatadelic response
     * @param {function} [callback]
     */
    this.auth = function(callback){
        callback = callback || function(){};
        if(!_username || !_password || !_chat)
            throw "Chatadelic_api auth: no username/password/chat.";
        var data = "chat="+_chat+"&login="+encodeURI(_username)+"&password="+encodeURI(_password);
        var req = http.request({
            host: 'chatadelic.net',
            path: '/login/chatLogin',
            method: 'POST',
            headers: {
                'Connection': 'keep-alive',
                'Content-Length': data.length,
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'Origin': 'http://chatadelic.net',
                'X-Requested-With': 'XMLHttpRequest',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.130 Safari/537.36',
                'Referer': 'http://chatadelic.net/frame.php?chat=' + _chat
            }
        }, function(res){
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log(chunk);
                var r=JSON.parse(chunk);
                callback(r);
            });
        });
        req.write(data);
        req.end();
    };

    /**
     * Login into chat
     * @param {function} [callback]
     */
    this.login = function(callback){
        callback = callback || function(){};
        self.auth(function(e){
            self.sid(e._);
            callback();
        });
    };

    this.logout = function(callback){
        self.ws.send(JSON.stringify({

        }));
    }
};

module.exports = Chatadelic_api;