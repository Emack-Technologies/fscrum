const {test} = QUnit;

QUnit.module("Backlog");


test("get list", assert=>{
    var bk = new Backlog();

    assert.equal(Object.keys(bk.list).length, 0, 'empty list');
});

test("create a backlog with an empty list of story", assert=>{
    var bk = new Backlog();
    assert.equal(Object.keys(bk.list).length, 0, 'empty list');
});

test("add nothing when no id", assert=>{
    var bk = new Backlog();
    bk.add();

    assert.equal(Object.keys(bk.list).length, 0, 'list should be empty');
});

test("add an item to the backlog", assert=>{
    var bk = new Backlog();
    var obj = {
        id: "gezuygduvdevevdetye",
        type: "sprint"
    };

    assert.equal(Object.keys(bk.list).length, 0, "list should be empty");

    bk.add(obj.id, obj);
    
    assert.equal(Object.keys(bk.list).length, 1, "list should have one item");
    assert.equal(bk.list[obj.id], obj, 'item added');

});

test("remove an item from the backlog", assert=>{
    var bk = new Backlog();
    var obj = {
        id: "gezuygduvdevevdetye",
        type: "sprint"
    };

    assert.equal(Object.keys(bk.list).length, 0, "list should be empty");

    bk.add(obj.id, obj);
    
    assert.equal(Object.keys(bk.list).length, 1, "list should have one item");

    bk.remove(obj.id);

    assert.equal(Object.keys(bk.list).length, 0, "list should be empty");
});

test("find an item by its id", assert=>{
    var bk = new Backlog();
    var obj = {
        id: "gezuygduvdevevdetye",
        type: "sprint"
    };

    bk.add(obj.id, obj);

    var item = bk.find(obj.id);

    assert.equal(item.id, obj.id, "item found");
});

test("find all items with the same type", assert=>{
    var bk = new Backlog();
    var obj1 = {
        id: "gezuygduvdevevdetye",
        type: "sprint"
    };
    var obj2 = {
        id: "gezuygduezeezezevdetye",
        type: "sprint"
    };
    var obj3 = {
        id: "gezucddddvdevevdetye",
        type: "feature"
    };

    bk.add(obj1.id, obj1);
    bk.add(obj2.id, obj2);
    bk.add(obj3.id, obj3);

    var items = bk.findItemsByType("sprint");

    assert.equal(items.length, 2, "items founded");
    items.map((item)=>{
        assert.equal(item.type, 'sprint', 'item is a sprint');
    });
});

test("find return null when item is not found", assert =>{
    var bk = new Backlog();

    var item = bk.find('nothing');

    assert.equal(item, null, 'component not found');
});

test("test forEach function", assert=>{
    var bk = new Backlog();

    var obj1 = {
        id: "gezuygduvdevevdetye",
        type: "sprint"
    };

    var obj2 = {
        id: "hbuudbebeuybdedevevdetye",
        type: "sprint"
    };

    bk.add(obj1.id, obj1);
    bk.add(obj2.id, obj2);

    var count = { count: 0};
    bk.forEach( (c, u)=>{u.count++}, count);
    assert.equal(count.count, 2, "count value");
    bk.list = {};
});