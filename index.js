'use strict';

const WebSocket = require('mokou-websocket');
const Events = require('events');
const util = require('util');

const Online = require('./lib/online');
const Queue = require('./lib/queue');
const Methods = require('./lib/methods');

/**
 *
 * @callback {ChatadelicApiCallback}
 * @param {Boolean} error
 * @param (Object} data
 */

/**
 *
 * @param conf
 * @param {String} conf.username
 * @param {String} conf.password
 * @param {Number} conf.chat
 * @param {Number} [conf.interval]
 * @constructor
 */
const ChatadelicApi = function (conf) {
    if (
        !conf.hasOwnProperty('username') || !conf.hasOwnProperty('password') || !conf.hasOwnProperty('chat')
    )
        throw new Error('Invalid config!');

    const ws = new WebSocket('ws://chatadelic.net:8181/server/ws');

    const methods = new Methods(ws, conf);

    const online = new Online();
    const queue = new Queue(methods, conf.interval);

    ws.on('open', (e)=> {
        this.emit('open', e);
    });

    ws.on('close', (e)=> {
        this.emit('close', e);
    });

    ws.on('error', (e)=> {
        this.emit('error', e);
    });

    ws.on('message', (e)=> {
        try {
            const data = JSON.parse(e);
            if (online.needToInit) {
                online.add(data);
                online.needToInit = false;

            }
            else if (Array.isArray(data)) {
                data.forEach(handleData);
            }
        }
        catch (e) {
            console.log("err", e);
            this.emit('error', e);
        }
    });

    const handleData = (data)=> {
        if (data.t === 'user' && data.event === 'IN') {
            online.add(data);
            this.emit('onlogin', data.user.name);
            return;
        }
        if (data.t === 'user' && data.event === 'OUT') {
            online.remove(data);
            this.emit('onlogout', data.user.name);
            return;
        }
        if (data.t === 'msg') {
            const e = {
                user: data.from,
                text: data.text,
                ts: data.ts
            };
            e.private = !!data.c;

            this.emit('message', e);
        }
    };

    /**
     *
     * @param {ChatadelicApiCallback} [callback]
     * @returns {ChatadelicApi}
     */
    this.login = (callback)=> {
        queue.push({
            type: 'login',
            data: {},
            callback: callback || function () {
            }
        });
        return this;
    };
    /**
     *
     * @param {ChatadelicApiCallback} [callback]
     * @returns {ChatadelicApi}
     */
    this.logout = (callback)=> {
        queue.push({
            type: 'logout',
            data: {},
            callback: callback || function () {
            }
        });
        return this;
    };
    /**
     *
     * @param {String|Object} obj Message text or object
     * @param {String} obj.text Message text
     * @param {String} [obj.target] Target of message (use this to send private messages)
     * @param {ChatadelicApiCallback} [callback]
     * @returns {ChatadelicApi}
     */
    this.message = (obj, callback)=> {
        if (typeof obj === 'string' || typeof obj === 'number')
            obj = {text: obj.toString()};

        obj.text.match(/.{1,300}/g).forEach(str=> {
            queue.push({
                type: 'message',
                data: {
                    text: str ? str : '',
                    target: obj.target ? obj.target.toString() : false
                },
                callback: callback || function () {
                }
            });
        });
        return this;
    };
    /**
     * Get online list
     * @param {ChatadelicApiCallback} [callback]
     * @returns {String[]}
     */
    this.getOnline = (callback)=> {
        const _ = online.toArray();
        if (callback)
            callback(null, _);
        return _;
    };
};
util.inherits(ChatadelicApi, Events);

module.exports = ChatadelicApi;
