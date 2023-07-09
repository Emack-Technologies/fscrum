QUnit.module("Release");

QUnit.test("throws an exception when no parameters are precised", assert => {
  assert.throws(() => {
    new Release();
  }, "parameter are missing");
});

QUnit.test("throws an exception when version attribute is missing", assert => {
  assert.throws(() => {
    new Release({});
  }, "version attribute is missing");
});

QUnit.test("set default parameters after release creation", assert => {
  var props = { version: "1.0.0" };
  var r = new Release(props);
  assert.equal(r.version, props.version, "set version");
  assert.equal(r.name, props.name, "set name");
  assert.equal(r.startDate, props.startDate, "set start date");
  assert.equal(r.endDate, props.endDate, "set end date");
});

QUnit.test(
  "throws an in exception when version parameter is an empty string",
  assert => {
    assert.throws(() => {
      new Release({ version: "" });
    }, "version parameter should'nt be empty string");
  }
);
QUnit.test(
  "throws an in exception when version parameter is not a string",
  assert => {
    assert.throws(() => {
      new Release({ version: null });
    }, "version parameter should'nt be empty string");
  }
);

QUnit.test("visuale representation of release", assert => {
  var props = {
    version: "1.0.1",
    name: "test",
    startDate: "12-01-2015",
    endDate: "12-02-15"
  };
  var r = new Release(props);
  assert.equal(r.shape.type, "circle", "shape is a circle");
});

QUnit.test("Set default attribut of the shape", assert => {
  var props = {
    version: "1.0.1",
    name: "test",
    startDate: "12-01-2015",
    endDate: "12-02-15"
  };
  var r = new Release(props);
  assert.equal(r.shape.x, 100, "shape x(abscissa) should be 100");
  assert.equal(r.shape.y, 100, "shape y(ordinate) should be 150");
  assert.equal(r.shape.r, 20, "shape r(radius) should be 20");
  assert.equal(r.shape["fill"], "#F0EEE9", "the shape color fill");
  assert.equal(r.shape["stroke"], "#939597", "the shape color stroke");
  assert.equal(r.shape["strokewidth"], "5px", "the shape stroke width");
});

QUnit.test("get sprint attribute", assert => {
  var props = {
    version: "1.0.1",
    name: "test",
    startDate: "12-01-2015",
    endDate: "12-02-15"
  };
  var r = new Release(props);
  assert.equal(r.sprint.length, 0, "size is zero");
});

QUnit.test("get version attribute", assert => {
  var props = {
    version: "1.0.1",
    name: "test",
    startDate: "12-01-2015",
    endDate: "12-02-15"
  };
  var r = new Release(props);
  assert.equal(r.version, "1.0.1", "get version");
});

QUnit.test("get name attribute", assert => {
  var props = {
    version: "1.0.1",
    name: "test",
    startDate: "12-01-2015",
    endDate: "12-02-15"
  };
  var r = new Release(props);
  assert.equal(r.name, "test", "get name");
});

QUnit.test("get startDate attribute", assert => {
  var props = {
    version: "1.0.1",
    name: "test",
    startDate: "12-01-2015",
    endDate: "12-02-15"
  };
  var r = new Release(props);
  assert.equal(r.startDate, "12-01-2015", "get startDate");
});

QUnit.test("get endDate attribute", assert => {
  var props = {
    version: "1.0.1",
    name: "test",
    startDate: "12-01-2015",
    endDate: "12-02-15"
  };
  var r = new Release(props);
  assert.equal(r.endDate, "12-02-15", "get endDate");
});

QUnit.test("set endDate attribute", assert => {
  var props = {
    version: "1.0.1",
    name: "test",
    startDate: "12-01-2015",
    endDate: new Date(),
  };  
  var r = new Release(props);
  r.endDate = "12-02-15";
  assert.notEqual(r.endDate, props.endDate, "set endDate");
});

QUnit.test("set endDate()  - throws an exception when the value is undefined", assert => {
  var props = {
    version: "1.0.1",
    name: "test",
    startDate: "12-01-2015",
    endDate: new Date(),
  };  
  var r = new Release(props);
  assert.throws(() => {    
    r.endDate = undefined;    
  }, "The value is undifine");
});

QUnit.test("set endDate()  - throws an exception when the value is empty string", assert => {
  var props = {
    version: "1.0.1",
    name: "test",
    startDate: "12-01-2015",
    endDate: new Date(),
  };  
  var r = new Release(props);
  assert.throws(() => {    
    r.endDate = "";    
  }, "The value is empty string");
});

QUnit.test("set startDate attribut", assert => {
  var props = {
    version:"1.0.1",
    name:"test",
    startDate:new Date(),
    endDate:"12-02-15"
  };
  var r = new Release(props);
  r.startDate = "12-01-2015";
  assert.notEqual(r.startDate, props.startDate, "set startDate")
})

QUnit.test("set startDate()  - throws an exception when the value is undefined", assert => {
  var props = {
    version: "1.0.1",
    name: "test",
    startDate: new Date(),
    endDate: "12-01-2015",
  };  
  var r = new Release(props);
  assert.throws(() => {    
    r.startDate = undefined;    
  }, "The value is undifine");
});

QUnit.test("set startDate()  - throws an exception when the value is empty string", assert => {
  var props = {
    version: "1.0.1",
    name: "test",
    startDate: new Date(),
    endDate: "12-01-2015",
  };  
  var r = new Release(props);
  assert.throws(() => {    
    r.startDate = "";    
  }, "The value is empty string");
});

QUnit.test("set name attribut", assert => {
  var props = {
    version:"1.0.1",
    name:"test",
    startDate:"12-01-2015",
    endDate:"12-02-15",
  };
  var r = new Release(props)
  r.name = "toto"
  assert.notEqual(r.name, "test", "set name")
})

QUnit.test("set version attribut", assert => {
  var props = {
    version:"1.0.1",
    name:"test",
    startDate:"12-01-15",
    endDate:"12-02-2015",
  };
  var r = new Release(props);
  r.version = ""
  assert.notEqual(r.version, "1.0.1", "set version")
})
// QUnit.test("addSprint() - add a sprint to the release", assert => {
//    var props = {

//    }
// });

