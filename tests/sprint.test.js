const { test } = QUnit;

QUnit.module("Sprint");

/**
 * Tests related to handling sprint exception
 */

test("throws an exception when no parameter are precise", assert=>{
    assert.throws(()=>{
        new Sprint();
    }, "no parameter");
});

test("throws an exception when name attribute is not a non-empty string", assert=>{
    assert.throws(()=>{
        new Sprint({name: null});
    }, "name attribute should be a non-empty string");
});

test("throws an exception when startDate attribute is not precise", assert=>{
    assert.throws(()=>{
        new Sprint({name: "sprint 0"});
    }, "startDate attribute should be precise");
});

test("throws an exception when endDate attribute is not precise", assert=>{
    assert.throws(()=>{
        new Sprint({name: "sprint 0", startDate: new Date("2021-04-3")});
    }, "endDate attribute should be precise");
});

test("throws an exception when startDate comes after endDate", assert=>{
    var props = {name: "sprint 0", startDate: new Date("2023-04-20"), endDate: new Date("2023-04-3")};
    assert.throws(()=>{
        new Sprint(props);
    }, "date error");
});

test("throws an exception when backlog parameter is not precise", assert=>{
    var props = {name: "sprint 0", startDate: new Date("2023-04-10"), endDate: new Date("2023-04-23")};
    assert.throws(()=>{
        new Sprint(props);
    }, "backlog should be precise");
});


/**
 * Tests related to getters
 */

test("get name", assert=>{
    var props = {name: "sprint 0", startDate: new Date("2021-04-3"), endDate: new Date("2022-04-20"), backlog: new Backlog()};
    var sp = new Sprint(props);

    assert.equal(sp.name, props.name, "get name");
});

test("get start date", assert=>{
    var props = {name: "sprint 0", startDate: new Date("2021-04-3"), endDate: new Date("2022-04-20"), backlog: new Backlog()};
    var sp = new Sprint(props);

    assert.equal(sp.startDate, props.startDate, "get start date");
});

test("get end date", assert=>{
    var props = {name: "sprint 0", startDate: new Date("2021-04-3"), endDate: new Date("2022-04-20"), backlog: new Backlog()};
    var sp = new Sprint(props);

    assert.equal(sp.endDate, props.endDate, "get end date");
});
test("get goal", assert=>{
    var props = {name: "sprint 0", startDate: new Date("2021-04-3"), endDate: new Date("2022-04-20"), backlog: new Backlog()};
    var sp = new Sprint(props);

    assert.equal(sp.goal, "", "get goal");
});

test("get type", assert=>{
    var props = {name: "sprint 0", startDate: new Date("2021-04-3"), endDate: new Date("2022-04-20"), backlog: new Backlog()};
    var sp = new Sprint(props);

    assert.equal(sp.type, "sprint", "get type");
});
test("get shape", assert=>{
    var props = {name: "sprint 0", startDate: new Date("2021-04-3"), endDate: new Date("2022-04-20"), backlog: new Backlog()};
    var sp = new Sprint(props);null

    assert.ok(sp.shape, "get shape");
});

test("get id", assert=>{
    var props = {name: "sprint 0", startDate: new Date("2021-04-3"), endDate: new Date("2022-04-20"), backlog: new Backlog()};
    var sp = new Sprint(props);null

    assert.ok(sp.id, "get id");
});
/**
 * Test(s) related to sprint creation
 */
test("sprint creation", assert=>{
    var props = {name: "sprint 0", startDate: new Date("2021-04-3"), endDate: new Date("2022-04-20"), backlog: new Backlog()};
    var sp = new Sprint(props);

    assert.equal(typeof sp.id, "string", "unique identifier");
    assert.equal(sp.name, props.name, "set name");
    assert.equal(sp.startDate, props.startDate, "set start date");
    assert.equal(sp.endDate, props.endDate, "set end date");
    assert.equal(sp.goal, "", "default goal value");
    assert.equal(Object.keys(sp.stories).length, 0, "no stories yet");
    assert.ok(sp.status, "status");
    assert.equal(sp.comment, null, "comments");
    assert.deepEqual(sp.backlog, props.backlog, "product backlog");
});

test("visual representation of a sprint", assert=>{
    var props = {name: "sprint 0", startDate: new Date("2021-04-3"), endDate: new Date("2022-04-20"), backlog: new Backlog()};
    var sp = new Sprint(props);
    assert.equal(sp.shape.type, "image", "type is an image");
    assert.equal(sp.shape.x, 100, "set x");
    assert.equal(sp.shape.y, 100, "set y");
    assert.equal(sp.shape.width, IMG_W, "set width");
    assert.equal(sp.shape.height, IMG_H, "set height");
    assert.equal(sp.shape.path, PATH, "set path");
    assert.equal(sp.shape.name, sp.name, "set name");
});


/**
 * Tests related to setters
 */
test("set name", assert=>{
    var props = {name: "sprint 0", startDate: new Date("2021-04-3"), endDate: new Date("2022-04-20"), backlog: new Backlog()};
    var sp = new Sprint(props);

    sp.name = "sprint 1";
    assert.equal(sp.name, "sprint 1", "set name");
});

test("set start date", assert=>{
    var props = {name: "sprint 0", startDate: new Date("2021-04-3"), endDate: new Date("2022-04-20"), backlog: new Backlog()};
    var sp = new Sprint(props);

    sp.startDate = new Date("2021-05-3");
    assert.deepEqual(sp.startDate, new Date("2021-05-3"), "set start date");
});

test("set end date", assert=>{
    var props = {name: "sprint 0", startDate: new Date("2021-04-3"), endDate: new Date("2022-04-20"), backlog: new Backlog()};
    var sp = new Sprint(props);

    sp.endDate = new Date("2022-04-25");
    assert.deepEqual(sp.endDate, new Date("2022-04-25"), "set end date");
});


test("set goal", assert=>{
    var props = {name: "sprint 0", startDate: new Date("2021-04-3"), endDate: new Date("2022-04-20"), backlog: new Backlog()};
    var sp = new Sprint(props);

    sp.goal = "goal 1"
    assert.equal(sp.goal, "goal 1", "set goal");
});


test("set status", assert=>{
    var props = {name: "sprint 0", startDate: new Date("2021-04-3"), endDate: new Date("2022-04-20"), backlog: new Backlog()};
    var sp = new Sprint(props);

    sp.status  = "undefined";
    assert.equal(sp.status, 'undefined', "set sprint status");
});


/**
 * Tests related to sprint status
 */

test("set status to done when endDate comes before the actual time", assert=>{
    var props = {name: "sprint 0", startDate: new Date("2021-04-3"), endDate: new Date("2022-04-20"), backlog: new Backlog()};
    var sp = new Sprint(props);
    
    assert.true(sp.endDate.getTime() < Date.now(), "end date is before actual time");
    assert.equal(sp.status, "done", "set status");
});

test("set status to current when startDate comes before the actual time and endDate after", assert=>{
    var props = {name: "sprint 0", startDate: new Date("2023-04-3"), endDate: new Date("2024-04-20"), backlog: new Backlog()};
    var sp = new Sprint(props);
    
    assert.true(sp.startDate.getTime() < Date.now(), "start date is before actual time");
    assert.true(sp.endDate.getTime() > Date.now(), "end date is after actual time");
    assert.equal(sp.status, "current", "set status");
});

test("set status to future when startDate comes after the actual time", assert=>{
    var props = {name: "sprint 0", startDate: new Date("3000-04-3"), endDate: new Date("4050-04-20"), backlog: new Backlog()};
    var sp = new Sprint(props);
    
    assert.true(sp.startDate.getTime() > Date.now(), "start date is before actual time");
    assert.equal(sp.status, "future", "set status");
});


/**
 * Tests related to adding a story to that specific sprint
 */

test("addStory() - throws an exception when the parameter is not a story", assert=>{
    var props = {name: "sprint 0", startDate: new Date("2021-04-3"), endDate: new Date("2022-04-20"), backlog: new Backlog()};
    var sp = new Sprint(props);

    assert.throws(()=>{
        sp.addStory({type: 'anything except the right', id: 1});
    }, 'the paramter should be a story object');
});

test("addStory() - add a story to a sprint", assert=>{
    var props = {name: "sprint 0", startDate: new Date("2021-04-3"), endDate: new Date("2022-04-20"), backlog: new Backlog()};
    var sp = new Sprint(props);

    assert.equal(Object.keys(sp.stories).length, 0, "no story inside");
    sp.addStory({type: 'code_review', id: 1});
    assert.equal(Object.keys(sp.stories).length, 1, "story added");
});


// delete a story from a sprint
test("deleteStory() - delete a story from a specific sprint", assert=>{
    var props = {name: "sprint 0", startDate: new Date("2021-04-3"), endDate: new Date("2022-04-20"), backlog: new Backlog()};
    var sp = new Sprint(props);

    sp.addStory({type: 'code_review', id: 1});
    assert.equal(Object.keys(sp.stories).length, 1, "story added");
    sp.deleteStory(1);
    assert.equal(Object.keys(sp.stories).length, 0, "story deleted");
});


/**
 * Functional test related to Sprint and Backlog class
 */
test("addStory() - a story cannot be added to more than one sprint", assert=>{
    var props = {name: "sprint 0", startDate: new Date("2021-04-3"), endDate: new Date("2022-04-20"), backlog: new Backlog()};
    var sp1 = new Sprint(props);
    var sp2 = new Sprint(props);

    sp1.addStory({type: 'code_review', id: 1});
    sp2.addStory({type: 'code_review', id: 1});

    assert.equal(Object.keys(sp1.stories).length, 0, "story deleted from sp1");
    assert.equal(Object.keys(sp2.stories).length, 1, "story added to sp2");
});