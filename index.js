'use strict';

const WebSocket = require('mokou-websocket');
const Events = require('events');
const util = require('util');
const http = require('http');

const ChatadelicApi = function () {
  const self = this;
  const ws = new WebSocket('ws://chatadelic.net:8181/server/ws');

  let _sid = null;
  let _username = null;
  let _password = null;
  let _chat = null;
  let _msgId = 0;

  const _online = [];
  let _onlineInited = false;

  const _queue = [];
  let _queueInterval = 500;
  let _queueIntervalTimeout = null;

  const _conf = {};
  const _act = {};

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

  /**
   * @param  {int} arg
   * @private
   */
  _conf.queueInterval = function (arg) {
    if (arg !== undefined && arg !== null && arg >= 0) {
      _queueInterval = arg;
    }
  };

  /**
   * @param {number} arg
   * @private
   */
  _conf.chat = function (arg) {
    if (arg !== undefined && arg !== null && arg >= 0) {
      _chat = arg;
    }
  };

  /**
   * @param {string} arg
   * @private
   */
  _conf.username = function (arg) {
    if (arg !== undefined && arg !== null && arg !== '') {
      _username = arg;
    }
  };

  /**
   * @param {string} arg
   * @private
   */
  _conf.password = function (arg) {
    if (arg !== undefined && arg !== null && arg !== '') {
      _password = arg;
    }
  };

  /**
   * Login into chat and get chatadelic response with session token
   * @param {function} [callback]
   * @private
   */
  const _auth = function (callback) {
    callback = callback || function () {
      };
    if (!_username || !_password || !_chat) {
      throw new Error('C_API _auth: no username/password/chat.');
    }
    const data = `chat=${_chat}&login=${encodeURI(_username)}&password=${encodeURI(_password)}&${(_sid ? `_=${+_sid}` : '')}`;
    console.log(data);
    const req = http.request({
      host: 'chatadelic.net',
      path: '/login/chatLogin',
      method: 'POST',
      headers: {
        Connection: 'keep-alive',
        'Content-Length': data.length,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Accept: 'application/json, text/javascript, */*; q=0.01',
        Origin: 'http://chatadelic.net',
        'X-Requested-With': 'XMLHttpRequest',
        Referer: `http://chatadelic.net/frame.php?chat=${_chat}`,
      },
    }, (res) => {
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        console.log(chunk);
        try {
          const r = JSON.parse(chunk);
          callback(r);
        }
        catch (e) {
          callback({});
        }
      });
    });
    req.write(data);
    req.end();
  };

  /**
   * Chatadelic actions (like send message, login, etc)
   */
  /**
   * Login into chat
   * @param {string} data
   * @param {function} [callback]
   * @private
   */
  _act.login = function (data, callback) {
    callback = callback || function () {
      };
    _auth((e) => {
      if (!e._) {
        throw new Error('C_API _act.login: login failed (no sid).');
      }
      _sid = e._;
      ws.send(JSON.stringify({
        _com: 1,
        chat: _chat,
        need: 'state',
        sid: _sid,
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
  _act.logout = function (data, callback) {
    callback = callback || function () {
      };
    ws.send(JSON.stringify({
      chat: _chat,
      act: 'logout',
      _id: _msgId++,
    }));
    callback();
  };

  /**
   * Send message
   * @param  {string} message
   * @param  {function} [callback]
   * @private
   */
  _act.message = function (message, callback) {
    callback = callback || function () {
      };
    if (!message) {
      return;
    }
    ws.send(JSON.stringify({
      chat: _chat,
      act: 'msg',
      msg: message,
      _id: _msgId++,
    }));
    callback();
  };

  /**
   * Send private message to user
   * @param {Object} args (user, message)
   * @param {function} [callback]
   */
  _act.privateMessage = function (args, callback) {
    callback = callback || function () {
      };
    if (!args || !args[0] || !args[1]) {
      return;
    }
    ws.send(JSON.stringify({
      chat: _chat,
      act: 'msg',
      msg: args[1],
      to: args[0],
      _id: _msgId++,
    }));
    callback();
  };

  /**
   * Set queue execution interval
   * If data and callback === undefined returns queue interval
   * @param {string} [data]
   * @param {function} [callback]
   * @returns {number} queueInterval
   */
  this.queueInterval = function (data, callback) {
    callback = callback || function () {
      };
    self.queueAdd('queueInterval', data, callback);
    if (!data && !callback) {
      return _queueInterval;
    }
  };

  /**
   * Set chat id
   * If data and callback === undefined returns chat id
   * @param {string} [data]
   * @param {function} [callback]
   * @returns {string} username
   */
  this.chat = function (data, callback) {
    callback = callback || function () {
      };
    self.queueAdd('chat', data, callback);
    if (!data && !callback) {
      return _chat;
    }
  };

  /**
   * Set username
   * If data and callback === undefined returns username
   * @param {string} [data]
   * @param {function} [callback]
   * @returns {string} username
   */
  this.username = function (data, callback) {
    callback = callback || function () {
      };
    self.queueAdd('username', data, callback);
    if (!data && !callback) {
      return _username;
    }
  };

  /**
   * Set password
   * @param {string} data
   * @param {function} [callback]
   */
  this.password = function (data, callback) {
    callback = callback || function () {
      };
    self.queueAdd('password', data, callback);
  };

  /**
   * Login
   * @param {function} [callback]
   */
  this.login = function (callback) {
    callback = callback || function () {
      };
    self.queueAdd('login', '', callback);
  };

  /**
   * Logout
   * @param {function} [callback]
   */
  this.logout = function (callback) {
    callback = callback || function () {
      };
    self.queueAdd('logout', '', callback);
  };

  /**
   * Send message
   * @param {string} data
   * @param {function} [callback]
   */
  this.message = function (data, callback) {
    callback = callback || function () {
      };
    const arr = data.match(/.{1,300}/g);
    for (let i = 0; i < arr.length; i++) {
      self.queueAdd('message', arr[i], callback);
    }
  };

  /**
   * Send private message to user
   * @param user
   * @param message
   * @param callback
   */
  this.privateMessage = function (user, message, callback) {
    callback = callback || function () {
      };
    const arr = message.match(/.{1,300}/g);
    for (let i = 0; i < arr.length; i++) {
      self.queueAdd('privateMessage', [user, arr[i]], callback);
    }
  };

  /**
   * Add chatadelic act to queue
   * @param  {string} type
   * @param  {string} [data]
   * @param {function} [callback]
   * @public
   */
  this.queueAdd = function (type, data, callback) {
    callback = callback || function () {
      };
    if (!_act.hasOwnProperty(type) && !_conf.hasOwnProperty(type)) {
      throw new Error('C_API queueAdd: invalid type');
    }
    _queue.push({
      type,
      data,
      callback,
    });
    _execQueue();
  };

  /**
   * Return online list
   * @returns {Array}
   */
  this.online = function () {
    return _online;
  };

  /**
   * Execute added to queue acts
   * @param {boolean} [ontimeout=false]
   * @private
   */
  var _execQueue = function (ontimeout) {
    if (ontimeout !== true && _queueIntervalTimeout !== null) {
      return;
    }
    if (_queue.length === 0) {
      _queueIntervalTimeout = null;

    }
    else {
      if (_act.hasOwnProperty(_queue[0].type)) {
        _act[_queue[0].type](_queue[0].data, (e) => {
          _queue[0].callback(e);
          _queue.shift();
          _queueIntervalTimeout = setTimeout(function () {
            _execQueue(true);
          }, _queueInterval);
        });
      }
      else if (_conf.hasOwnProperty(_queue[0].type)) {
        _conf[_queue[0].type](_queue[0].data);
        _queue[0].callback();
        _queue.shift();
        _queueIntervalTimeout = setTimeout(function () {
          _execQueue(true);
        }, 20);
      }
      else {
        throw 'C_API _execQueue: invalid type';
      }
    }
  };

  /**
   * Handles data from chatadelic and calls events
   * @param {object} data
   * @param data.t
   * @param data.event
   * @param data.from
   * @param data.text
   * @param data.ts
   * @param data.user
   * @param data.fromId
   * @private
   */
  const _handleData = function (data) {
    let e;
    if (data.t === 'user' && (data.event === 'IN' || data.event === 'OUT')) {
      e = data.user;
      data.event === 'IN' ? _addOnline(data) : _removeOnline(data);
      self.emit('log' + data.event.toLowerCase(), e);
      self['onlog' + data.event.toLowerCase()](e);
    }
    else if (data.t === 'msg' && !!data.c) {
      e = {
        private: true,
        user: {name: data.from, regId: data.fromId ? data.fromId : -1},
        text: data.text,
        ts: data.ts
      };
      self.emit('message', e);
      self.onmessage(e);
    }
    else if (data.t === 'msg') {
      e = {
        private: false,
        user: data.from,
        text: data.text,
        ts: data.ts
      };
      self.emit('message', e);
      self.onmessage(e);
    }
  };

  /**
   * Init online list
   * @param data
   * @private
   */
  const _initOnline = function (data) {
    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) { //noinspection JSValidateTypes
        if (data[i].t === 'user' && data[i].event === 'IN')
          _addOnline(data[i]);
        }
    }
    _onlineInited = true;
  };

  /**
   * Add user to online list
   * @param data
   * @private
   */
  const _addOnline = function (data) {
    data.user.regId = data.user.regId ? data.user.regId : -1;
    for (let j = 0; j < _online.length; j++)
      if (_online[j].name === data.user.name && _online[j].regId === data.user.regId)
        return;
    _online.push(data.user);
  };
  /**
   * Remove user from online list
   * @param data
   * @private
   */
  const _removeOnline = function (data) {
    data.user.regId = data.user.regId ? data.user.regId : -1;
    for (let j = 0; j < _online.length; j++)
      if (_online[j].name === data.user.name && _online[j].regId === data.user.regId) {
        _online.splice(j, 1);
        break;
      }
  };

  ws.onopen = function () {
    self.emit('open');
    self.onopen();
    ws.on('message', (e) => {
      let data = JSON.parse(e);
      if (!_onlineInited) {
        _initOnline(data);
        return;
      }
      if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
          _handleData(data[i]);
        }
      }
    });
    ws.on('close', (e) => {
      self.emit('close', e);
      self.onclose(e);
    });
    ws.on('error', (e) => {
      self.emit('error', e);
      self.onerror(e);
    });
  };
};
util.inherits(ChatadelicApi, Events);

module.exports = ChatadelicApi;
