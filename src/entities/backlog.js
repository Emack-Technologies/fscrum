class Backlog{
    static list = {};

    static add(id, item){
        if (id)
            Backlog.list[id] = item;
    }

    static remove(id){
        delete Backlog.list[id];
    }

    static find(id){
        return Backlog.list[id] ? Backlog.list[id] : null;
    }

    static forEach(callback, data){
        Object.keys(Backlog.list).map(id =>{
            callback(Backlog.list[id], data);
        });
    }
}