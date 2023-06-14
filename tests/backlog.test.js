QUnit.module("Backlog");


QUnit.test("add nothing when no id", assert=>{
    Backlog.add();

    assert.equal(Object.keys(Backlog.list).length, 0, 'list should be empty');
});

QUnit.test("add an item to the backlog", assert=>{
    var obj = {
        id: "gezuygduvdevevdetye",
        type: "sprint"
    };

    assert.equal(Object.keys(Backlog.list).length, 0, "list should be empty");

    Backlog.add(obj.id, obj);
    
    assert.equal(Object.keys(Backlog.list).length, 1, "list should have one item");
    assert.equal(Backlog.list[obj.id], obj, 'item added');

    Backlog.list = {};
});

QUnit.test("remove an item from the backlog", assert=>{
    var obj = {
        id: "gezuygduvdevevdetye",
        type: "sprint"
    };

    assert.equal(Object.keys(Backlog.list).length, 0, "list should be empty");

    Backlog.add(obj.id, obj);
    
    assert.equal(Object.keys(Backlog.list).length, 1, "list should have one item");

    Backlog.remove(obj.id);

    assert.equal(Object.keys(Backlog.list).length, 0, "list should be empty");
});

QUnit.test("find an item by its id", assert=>{
    var obj = {
        id: "gezuygduvdevevdetye",
        type: "sprint"
    };

    Backlog.add(obj.id, obj);

    var item = Backlog.find(obj.id);

    assert.equal(item.id, obj.id, "item found");
});

QUnit.test("find return null when item is not found", assert =>{
    var item = Backlog.find('nothing');

    assert.equal(item, null, 'component not found');
});

QUnit.test("test forEach function", assert=>{
    var obj1 = {
        id: "gezuygduvdevevdetye",
        type: "sprint"
    };

    var obj2 = {
        id: "hbuudbebeuybdedevevdetye",
        type: "sprint"
    };

    Backlog.add(obj1.id, obj1);
    Backlog.add(obj2.id, obj2);

    console.log(Backlog.list);
    var count = { count: 0};
    Backlog.forEach( (c, u)=>{u.count++}, count);
    assert.equal(count.count, 2, "count value");

    Backlog.list = {};
});