module.exports = function (methods, _interval) {
    const list = [];
    const interval = _interval || 250;
    let timeout = null;

    this.push = (obj)=> {
        list.push(obj);
        if (timeout === null)
            exec();
    };

    const exec = ()=> {
        if (!list.length) {
            clearTimeout(timeout);
            timeout = null;
            return;
        }
        timeout = -1;
        const data = list.shift();

        if (methods.hasOwnProperty(data.type)) {
            methods[data.type](data.data, (err, res)=> {
                timeout = setTimeout(exec, interval);
                data.callback(err, res);
            });
        }
        else {
            throw new Error("Wrong type: " + JSON.stringify(data));
        }
    };
};
