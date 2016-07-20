module.exports = function () {
    this.needToInit = true;
    const list = new Set();

    this.add = (data)=> {
        if (Array.isArray(data))
            data.forEach((e)=> {
                if (e.t === 'user' && e.event === 'IN')
                    this.add(e);
            });
        else {
            list.add(typeof data === 'object' ? data.user.name : data);
        }
    };

    this.remove = (data)=>
        list.delete(typeof data === 'object' ? data.user.name : data);

    this.toArray = ()=>Array.from(list);
};
