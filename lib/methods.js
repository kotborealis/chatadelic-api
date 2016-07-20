const http = require('http');

module.exports = function (ws, conf) {
    let sid = '';

    this.auth = (data, callback)=> {
        const body = `chat=${conf.chat}&login=${encodeURI(conf.username)}&password=${encodeURI(conf.password)}&_=${sid}`;
        const req = http.request({
            host: 'chatadelic.net',
            path: '/login/chatLogin',
            method: 'POST',
            headers: {
                Connection: 'keep-alive',
                'Content-Length': body.length,
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                Accept: 'application/json, text/javascript, */*; q=0.01',
                Origin: 'http://chatadelic.net',
                'X-Requested-With': 'XMLHttpRequest',
                Referer: `http://chatadelic.net/frame.php?chat=${conf.chat}`
            }
        }, (res) => {
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                const data = JSON.parse(chunk);
                callback(data.result === 'success' ? null : true, data);
            });
        });
        req.write(body);
        req.end();
    };

    this.init = (data, callback)=> {
        ws.send(JSON.stringify({
            _com: 1,
            chat: conf.chat,
            need: 'state',
            sid
        }));
        callback(null, {});
    };

    this.login = (data, callback)=> {
        this.auth(null, (err, res)=> {
            if (err)
                callback(err, res);
            else {
                sid = res._;
                this.init(null, callback);
            }
        });
    };

    this.logout = (data, callback)=> {
        ws.send(JSON.stringify({
            chat: conf.chat,
            act: 'logout'
        }));
        callback(null, {});
    };

    this.message = (data, callback)=> {
        if (data.text === '')
            callback(null, {});
        else {
            const msg = {
                chat: conf.chat,
                act: 'msg',
                msg: data.text
            };
            if (data.target !== false)
                msg.to = data.target;

            ws.send(JSON.stringify(msg));
            callback(null, {});
        }
    };
};
