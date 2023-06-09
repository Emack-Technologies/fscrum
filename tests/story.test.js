const {test} = QUnit;
QUnit.module('Story');


/**
 * Tests related to exception handling
 */
test('throws an exception when no parameters are provided', assert => {
    assert.throws(function () {
        new Story();
    }, 'Parameters should be provided');
});

test('Throws an exception when title attribute is not a string', assert => {
    assert.throws(function () {
        new Story({title: ''});
    }, 'Title parameter should be provided');
});

test('Throws an exception when there is no type', assert=>{
    assert.throws(()=>{
        new Story({title: 'titre'});
    }, 'Type is not precise');
});

test('Throws an exception when type is not correct', assert=>{
    assert.throws(()=>{
        new Story({title: 'titre', type: 'type'});
    }, 'Type is not correct');
});


/**
 * Tests related to story creation
 */

test('Set attributes by default when they are not precised', assert => {
    var props = {title: 'titre', type: 'test'};
    var st = new Story(props);
    assert.equal(typeof st.id, "string", 'id is a string');
    assert.equal(st.startDate, props.startDate, 'Set startDate');
    assert.equal(st.endDate, props.endDate, 'Set endDate');
});

test('Story creation', assert => {
    var props = {title: 'titre', type: 'test'};
    var st = new Story(props);
    assert.equal(typeof st.id, "string", 'id is a string');
    assert.equal(st.title, 'titre', 'Set title');
    assert.equal(st.startDate, props.startDate, 'Set startDate');
    assert.equal(st.endDate, props.endDate, 'Set endDate');
    assert.equal(st.dependances.length, 0, 'No dependances');
    assert.equal(st.shape.type, 'rectangle', 'Set visual shape');
});

test('Story creation by precising other parameters', assert => {
    var props = {title: 'titre',  startDate: new Date("2023-04-12"), endDate: new Date("2023-04-12"), type: 'test' };
    var st = new Story(props);
    assert.equal(typeof st.id, "string", 'id is a string');
    assert.equal(st.title, 'titre', 'Set title');
    assert.equal(st.startDate, props.startDate, 'Set startDate');
    assert.equal(st.endDate, props.endDate, 'Set endDate');
    assert.equal(st.dependances.length, 0, 'No dependances');
    assert.equal(st.shape.type, 'rectangle', 'Set visual shape');
});

test('Visual representation of a Story', assert => {
    var props = {title: 'titre', type: 'test'};
    var st = new Story(props);
    assert.equal(st.shape.type, 'rectangle', 'Shape type is a rectangle');
    assert.equal(st.shape.width, R_WIDTH, 'Set shape width');
    assert.equal(st.shape.height, R_HEIGHT, 'Set shape height');
    assert.equal(st.shape.x, 10, 'Set x-axis value');
    assert.equal(st.shape.y, 20, 'Set y-axis value');
    assert.equal(st.shape['fill'], R_FILL, 'Set shape color fill');
    assert.equal(st.shape['stroke'], R_STROKE, 'Set shape color stroke');
    assert.equal(st.shape['strokewidth'], R_STROKEWIDTH, 'Set shape color stroke width');
});


/**
 * Tests related to the adding of mouseover on the shape
 */
test('add mouseover event on the Story', assert => {
    var props = {title: 'titre', type: 'test'};
    var st = new Story(props);
    var ev = st.shape.events['mouseover'];
    assert.equal(typeof ev, 'function', 'mouseover defined');
});


/**
 * Tests related to getters
 */
test('get story id', assert => {
    var props = {title: 'titre', type: 'test'};
    var st = new Story(props);
    assert.ok(st.id, 'get story id');
});

test('get status', assert=>{
    var props = {title: 'titre', type: 'test'};
    var st = new Story(props);

    assert.equal(st.status, 'in_progress', "get status");
});

test('get type', assert=>{
    var props = {title: 'titre', type: 'test'};
    var st = new Story(props);

    assert.equal(st.type, 'test', "get type");
});

test('get story title', assert => {
    var props = {title: 'titre', type: 'test'};
    var st = new Story(props);
    assert.equal(st.title, 'titre', 'get story title');
});

test('get story startDate', assert => {
    var props = {title: 'titre', type: 'test'};
    var st = new Story(props);
    assert.equal(st.startDate, props.startDate, 'get story start date');
});

test('get story endDate', assert => {
    var props = {title: 'titre', type: 'test' };
    var st = new Story(props);
    assert.equal(st.endDate, props.endDate, 'get story end date');
});

test('get story dependances', assert => {
    var props = {title: 'titre', type: 'test'};
    var st = new Story(props);
    assert.equal(st.dependances.length, 0, 'story dependances is 0');
});


/**
 * Tests related to setters
 */

test('Set status to story - throws an exception when status value is not correct', assert => {
    var props = {title: 'titre', type: 'test'};
    var st = new Story(props);

    assert.throws(()=>{
        st.status = "anything exception the right one";
    }, 'status is not a correct value');
});

test('set status of a story', assert=>{
    var props = {title: 'titre', type: 'test'};
    var st = new Story(props);
    st.status = "done";
    assert.equal(st.status, "done", 'set status value');
});

test('set story title', assert => {
    var props = {title: 'titre', type: 'test'};
    var st = new Story(props);
    st.title = 'title';
    assert.notEqual(st.title, props.title, 'set story title');
});

test('set story startDate', assert => {
    var props = {title: 'titre', type: 'test'};
    var st = new Story(props);
    st.startDate = new Date("2022-04-23");
    assert.notEqual(st.startDate, props.startDate, 'set story startDate');
});

test('set story endDate', assert => {
    var props = {title: 'titre', type: 'test'};
    var st = new Story(props);
    st.endDate = new Date("2092-04-23");
    assert.notEqual(st.endDate, props.endDate, 'set story endDate');
});



/**
 * Tests related to mouseover callback
 */

test('mouseovercb - box creation', assert => {
    var props = {title: 'titre', type: 'test'};
    var st = new Story(props);
    var m = mouseovercb(st);
    assert.equal(m.box.type, 'rectangle', 'type is rectangle');
    assert.equal(m.box.width, B_WIDTH, 'Set box width');
    assert.equal(m.box.height, B_HEIGHT, 'Set box height');
    assert.equal(m.box.x, st.shape.x, 'Set x-axis value');
    assert.equal(m.box.y, st.shape.y + st.shape.height + 40, 'Set y-axis value');
    assert.equal(m.box['fill'], B_FILL, 'Set box color fill');
    assert.equal(m.box['stroke'], B_STROKE, 'Set box color stroke');
    assert.equal(m.box['strokewidth'], B_STROKEWIDTH, 'Set box color stroke width');
});


test('mouseovercb - add box to shape', assert => {
    var props = {title: 'titre', type: 'test'};
    var st = new Story(props);
    var m = mouseovercb(st);
    assert.equal(st.shape.children.length, 1, 'there is a child shape');
    assert.equal(st.shape.children[0].child.type, 'rectangle', 'shape child is a rectangle');
});

test('mouseovercb - add separator lines to the box', assert => {
    var props = {title: 'titre', type: 'test'};
    var st = new Story(props);

    var m = mouseovercb(st);

    assert.equal(m.box.children.length, 6, "five lines");
    m.box.children.map(({child}, index)=>{
        assert.equal(child.type, "line", "check child type");
        assert.equal(child.x,  m.box.x, "set x");
        assert.equal(child.y, m.box.y + m.box.height/6 * (index + 1), "set y");
        assert.equal(child.dest_x, m.box.x + m.box.width, "set dest_x");
        assert.equal(child.dest_y, m.box.y + m.box.height/6 * (index + 1), "set dest_y");
    });
});

test('mouseovercb - create texts between lines', assert => {
    var props = {title: 'titre', type: 'test'};
    var st = new Story(props);

    var m = mouseovercb(st);
   
    m.box.children.map(({child}, index)=>{
        var startDate = st.startDate.toString().split(" ");
        var endDate = st.endDate.toString().split(" ");
        var line = child; // this represents the child of the box
        var child = line.children[0].child; // this child represents the child of the line

        if (index == 0)
            assert.equal(child.text, "ID : " + st.id, "set ID");
        if(index == 1)
            assert.equal(child.text, "Title : " + st.title, "set Title");
        if (index == 2)
            assert.equal(child.text, "Start : " + startDate[1] + " " + " " + startDate[2] + " "  + " " + startDate[3], "set start date");
        if (index == 3)
            assert.equal(child.text, "Finish : " + endDate[1] + " " + " " + endDate[2] + " "  + " " + endDate[3], "set finish date");
        if (index == 4)
            assert.equal(child.text, "Status : " + st.status, "set status");
        if (index == 5)
            assert.equal(child.text, "Related to : " + st.dependances.toString(), "set dependances");

        assert.equal(line.children.length, 1, "line" + index + " has one child");
        assert.equal(child.type, "text", "child is a text");
        assert.equal(child.x, line.x + DELTA_X, "set x");
        assert.equal(child.y, line.y - DELTA_Y, "set y");
    });
});


/**
 * Tests related to mouseleave
 */
test('add mouseleave event on the Story', assert => {
    var props = {title: 'titre', type: 'test'};
    var st = new Story(props);
    var ev = st.shape.events['mouseleave'];
    assert.equal(typeof ev, 'function', 'mouseleave defined');
});

test('mouseleavecb - delete box', assert => {
    var props = {title: 'titre', type: 'test'};
    var st = new Story(props);
    var m = mouseovercb(st);
    mouseleavecb(st);
    assert.equal(st.shape.children.length, 1, 'remove child shape');
});


/**
 * Tests related to dependsOn method
 */
test('dependsOn()- throws an exception when dates are not correct', assert => {
    var props = {title: 'titre', type: 'test', endDate: new Date('12-01-2023')};
    var story1 = new Story(props);
    var props = {title: 'titre', type: 'code', startDate: new Date('12-01-2023')};
    var story2 = new Story(props);
    assert.throws(function () {
        story2.dependsOn(story1);
    }, 'Dates should be correct');
});

test('dependsOn()- one story depends on another one', assert => {
    var props = {title: 'titre', type: 'test', endDate: new Date('12-01-2023')};
    var story1 = new Story(props);
    var props = {title: 'titre', type: 'code', startDate: new Date('13-01-2023')};
    var story2 = new Story(props);
    assert.equal(story1.dependances.length, 0, 'story1 has any dependance');
    story2.dependsOn(story1);
    assert.ok(story1.endDate.getTime(), story2.startDate.getTime(), 'endDate of story1 comes before startDate of story2');
    assert.equal(story1.dependances.length, 1, 'story1 has one dependance');
    assert.equal(story1.dependances[0], story2.id, 'story1 has story2 as dependance');
});

test('dependsOn() - Draw the edge between nodes as expected', assert => {
    var props = {title: 'titre', type: 'test', endDate: new Date('12-01-2023')};
    var story1 = new Story(props);
    var props = {title: 'titre', type: 'code', startDate: new Date('13-01-2023')};
    var story2 = new Story(props);
    var obj = {};
    story2.dependsOn(story1, obj);
    assert.equal(obj.shape.type, 'link', 'type is a link');
});

test('dependsOn() - one story has multiple successor stories', assert => {
    var props = {title: 'titre', type: 'test', endDate: new Date('12-01-2023')};
    var story1 = new Story(props);
    var props = {title: 'titre', type: 'code', startDate: new Date('13-01-2023')};
    var story2 = new Story(props);
    var props = {title: 'titre', type: 'code', startDate: new Date('14-01-2023')};
    var story3 = new Story(props);
    assert.equal(story1.dependances.length, 0, 'story1 has any dependance');
    story2.dependsOn(story1);
    story3.dependsOn(story1);
    assert.ok(story1.endDate.getTime(), story2.startDate.getTime(), 'endDate of story1 comes before startDate of story2');
    assert.ok(story1.endDate.getTime(), story3.startDate.getTime(), 'endDate of story1 comes before startDate of story3');
    assert.equal(story1.dependances.length, 2, 'story1 has one dependance');
    assert.equal(story1.dependances[0], story2.id, 'story1 has story2 as dependance');
    assert.equal(story1.dependances[1], story3.id, 'story1 has story3 as dependance');
});

test('dependsOn() - one story has multiple predecessor stories', assert => {
    var props = {title: 'titre', type: 'code', endDate: new Date('13-01-2023')};
    var story2 = new Story(props);
    var props = {title: 'titre', type: 'code', endDate: new Date('14-01-2023')};
    var story3 = new Story(props);
    var props = {title: 'titre', type: 'test', startDate: new Date('16-01-2023')};
    var story1 = new Story(props);
    story1.dependsOn(story2);
    story1.dependsOn(story3);
    assert.equal(story2.dependances.length, 1, 'story2 has a dependance');
    assert.equal(story3.dependances.length, 1, 'story3 has a dependance');
    assert.equal(story2.dependances[0], story1.id, 'story2 has story1 as dependance');
    assert.equal(story3.dependances[0], story1.id, 'story3 has story1 as dependance');
});