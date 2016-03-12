var WebSocket = require("mokou-websocket");
var http = require("http");

var Chatadelic_api = function(){
    var self=this;

    /**
     * Event on websocket open
     * @param {Object} e - event
     */
    this.onopen = function (e) {
    };
    /**
     * Event on chat message
     * @param {Object} e - event
     */
    this.onmessage = function (e) {
    };
    /**
     * Event on user login
     * @param {Object} e - event
     */
    this.onlogin = function (e) {
    };
    /**
     * Event on user logout
     * @param {Object} e - event
     */
    this.onlogout = function (e) {
    };

    var ws = new WebSocket("ws://chatadelic.net:8181/server/ws");

    ws.onopen = function () {
        self.onopen({});
        ws.onmessage = function (e) {
            var data = JSON.parse(e.data);
            if (Array.isArray(data)) {
                for (var i = 0; i < data.length; i++) {
                    _handleData(data[i]);
                }
            }
        };
    };

    var _sid=null;
    var _username=null;
    var _password=null;
    var _chat=null;
    var _msg_id=0;

    var _queue=[];
    var _queue_interval=500;
    var _queue_interval_timeout=null;

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
    var _auth = function (callback) {
        callback = callback || function(){};
        if(!_username || !_password || !_chat)
            throw "C_API _auth: no username/password/chat.";
        var data = "chat=" + _chat + "&login=" + encodeURI(_username) + "&password=" + encodeURI(_password) + (_sid ? "&_=" + _sid : "");
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
        _auth(function (e) {
            if(!e._)
                throw "C_API _act.login: login failed (no sid).";
            _sid=e._;
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
     * Send private message to user
     * @param {array} args (user, message)
     * @param {function} [callback]
     */
    _act.privateMessage = function (args, callback) {
        if (!args || !args[0] || !args[1])return;
        ws.send(JSON.stringify({
            chat: _chat,
            act: "msg",
            msg: args[1],
            to: args[0],
            _id: _msg_id++
        }));
        callback();
    };

    /**
     * Set queue execution interval
     * @param {number} data
     * @param {function} [callback]
     */
    this.queueInterval = function (data, callback) {
        self.queueAdd("queueInterval", data, callback);
    };

    /**
     * Set chat id
     * @param {number} data
     * @param {function} [callback]
     */
    this.chat = function (data, callback) {
        self.queueAdd("chat", data, callback);
    };

    /**
     * Set username
     * @param {string} data
     * @param {function} [callback]
     */
    this.username = function (data, callback) {
        self.queueAdd("username", data, callback);
    };

    /**
     * Set password
     * @param {string} data
     * @param {function} [callback]
     */
    this.password = function (data, callback) {
        self.queueAdd("password", data, callback);
    };

    /**
     * Login
     * @param {function} [callback]
     */
    this.login = function (callback) {
        self.queueAdd("login", "", callback);
    };

    /**
     * Logout
     * @param {function} [callback]
     */
    this.logout = function (callback) {
        self.queueAdd("logout", "", callback);
    };

    /**
     * Send message
     * @param {string} data
     * @param {function} [callback]
     */
    this.message = function (data, callback) {
        self.queueAdd("message", data, callback);
    };

    /**
     * Send private message to user
     * @param user
     * @param message
     * @param callback
     */
    this.privateMessage = function (user, message, callback) {
        self.queueAdd("privateMessage", [user, message], callback);
    };

    /**
     * Add chatadelic act to queue
     * @param  {string} type
     * @param  {string} [data]
     * @param {function} [callback]
     * @public
     */
    this.queueAdd = function(type, data, callback){
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
            if (_act.hasOwnProperty(_queue[0].type)) {
                _act[_queue[0].type](_queue[0].data, function (e) {
                    _queue[0].callback(e);
                    _queue.shift();
                    _queue_interval_timeout = setTimeout(function () {
                        _execQueue(true);
                    }, _queue_interval);
                });
            }
            else if (_conf.hasOwnProperty(_queue[0].type)) {
                _conf[_queue[0].type](_queue[0].data);
                _queue[0].callback();
                _queue.shift();
                _queue_interval_timeout = setTimeout(function () {
                    _execQueue(true);
                }, 20);
            }
            else {
                throw "C_API _execQueue: invalid type";
            }
        }
    };

    /**
     * Handles data from chatadelic and calls events
     * @param {object} data
     * @private
     */
    var _handleData = function (data) {
        if (data.t === "msg" && data.fl === "sys" && (data.type === "logout" || data.type === "login")) {
            self["on" + data.type]({
                user: data.from,
                ts: data.ts
            });
        }
        else if (data.t === "msg" && !!data.c) {
            self.onmessage({
                private: true,
                user: data.from,
                text: data.text,
                ts: data.ts
            });
        }
        else if (data.t === "msg") {
            self.onmessage({
                user: data.from,
                text: data.text,
                ts: data.ts
            });
        }
    }
};

module.exports = Chatadelic_api;
