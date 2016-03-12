var WebSocket = require("mokou-websocket");
var http = require("http");

var Chatadelic_api = function(){
    var self=this;

    var ws = new WebSocket("ws://chatadelic.net:8181/server/ws");
    ws.onmessage = function (e) {
        console.log(e.data)
    };
    var _sid=null;
    var _username=null;
    var _password=null;
    var _chat=null;
    var _msg_id=0;

    var _queue=[];
    var _queue_interval=500;
    var _queue_interval_timeout=null;

    /**
     * Bot conf actions
     * @type {Object}
     * @private
     */
    var _conf = {};

    /**
     * @param  {int} arg
     * @private
     */
    _conf.queueInterval = function (arg) {
        if(arg!==undefined && arg!==null && arg>=0){
            _queue_interval=arg;
        }
    };

    /**
     * @param {number} arg
     * @private
     */
    _conf.chat = function (arg) {
        if(arg!==undefined && arg!==null && arg>=0){
            _chat=arg;
        }
    };

    /**
     * @param {string} arg
     * @private
     */
    _conf.username = function (arg) {
        if(arg!==undefined && arg!==null && arg!==""){
            _username=arg;
        }
    };

    /**
     * @param {string} arg=
     * @private
     */
    _conf.password = function (arg) {
        if(arg!==undefined && arg!==null && arg!==""){
            _password=arg;
        }
    };

    /**
     * Login into chat and get chatadelic response with session token
     * @param {function} [callback]
     * @private
     */
    var auth = function(callback){
        callback = callback || function(){};
        if(!_username || !_password || !_chat)
            throw "C_API _auth: no username/password/chat.";
        var data = "chat=" + _chat + "&login=" + encodeURI(_username) + "&password=" + encodeURI(_password) + (_sid ? "&_=" + _sid : "");
        console.log(data);
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
     * Chatadelic actions (like send message, login, etc)
     * @type {Object}
     * @private
     */
    var _act = {};

    /**
     * Login into chat
     * @param {string} data
     * @param {function} [callback]
     * @private
     */
    _act.login = function(data, callback){
        callback = callback || function(){};
        auth(function(e){
            if(!e._)
                throw "C_API _act.login: login failed (no sid).";
            console.log(_sid);
            _sid=e._;
            console.log(_sid);
            ws.send(JSON.stringify({
                _com:1,
                chat:_chat,
                need:"",
                sid:_sid
            }));
            callback(e);
        });
    };

    /**
     *  Logout from chat
     *  @param {string} data
     *  @param {function} [callback]
     *  @private
     */
    _act.logout = function(data, callback){
        callback = callback || function(){};
        ws.send(JSON.stringify({
            chat:_chat,
            act:"logout",
            _id: _msg_id++
        }));
        callback();
    };

    /**
     * Send message
     * @param  {string} message
     * @param  {function} [callback]
     * @private
     */
    _act.message = function(message, callback){
        if(!message)return;
        ws.send(JSON.stringify({
            chat:_chat,
            act:"msg",
            msg:message,
            _id:_msg_id++
        }));
        callback();
    };

    /**
     * Add chatadelic act to queue
     * @param  {string} type
     * @param  {string} [data]
     * @param {function} [callback]
     * @public
     */
    this.queueAdd = function(type, data, callback){
        console.log("queueadd",type,data);
        if (!_act.hasOwnProperty(type) && !_conf.hasOwnProperty(type))
            throw "C_API queueAdd: invalid type";
        _queue.push({type:type,data:data,callback:callback||function(){}});
        _execQueue();
    };

    /**
     * Execute added to queue acts
     * @param {boolean} [ontimeout=false]
     * @private
     */
    var _execQueue = function(ontimeout){
        if(ontimeout!==true && _queue_interval_timeout!==null){
            return;
        }
        if(_queue.length===0){
            _queue_interval_timeout = null;

        }
        else{
            if (_act.hasOwnProperty(_queue[0].type))
            _act[_queue[0].type](_queue[0].data,function(e){
                _queue[0].callback(e);
                _queue.shift();
                _queue_interval_timeout=setTimeout(function(){_execQueue(true);}, _queue_interval);
            });
            else if (_conf.hasOwnProperty(_queue[0].type)) {
                _conf[_queue[0].type](_queue[0].data);
                _queue[0].callback();
                _queue.shift();
                _queue_interval_timeout = setTimeout(function () {
                    _execQueue(true);
                }, 20);
            }
            else {
                console.log(_queue[0]);
                throw "C_API _execQueue: invalid type";
            }
        }
    };
};

module.exports = Chatadelic_api;
