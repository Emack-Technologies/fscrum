class Backlog{// singleton pattern
    #list = {};

    add(id, item){
        if (id)
            this.#list[id] = item;
    }

    remove(id){
        delete this.#list[id];
    }

    find(id){
        return this.#list[id] ? this.#list[id] : null;
    }

    forEach(callback, data){
        Object.keys(this.#list).map(id =>{
            callback(this.#list[id], data);
        });
    }

    findItemsByType(type){
        let result = [];
        Object.keys(this.#list).map((id)=>{
            if (this.#list[id].type == type)
                result.push(this.#list[id]);
        });
        return result;
    }

    get list(){
        return this.#list;
    }
}