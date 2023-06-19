class Release {
  #sprint = [];
  #version = "";
  #name = "test";
  #startDate = "12-01-2015";
  #endDate = "12-02-2015";
  constructor(props) {
    if (props == undefined) throw new Error("parameter are missing");
    if (props.version == undefined)
      throw new Error("version attribute is missing");
    if (props.name == undefined) props.name = "null";
    if (props.startDate == undefined) props.startDate = "null";
    if (props.endDate == undefined) props.endDate = "null";
    if (props.version == "" || typeof props.version != "string")
      throw new Error("version has not be attribute empty value");

    this.#version = props.version;
    this.#name = props.name;
    this.#startDate = props.startDate;
    this.#endDate = props.endDate;

    this.shape = aya.circle(100, 100, 20);
    this.shape.setStyles({
      fill: "#F0EEE9",
      stroke: "#939597",
      strokewidth: "5px"
    });
    this.shape.removeBoxFromDOM();
    this.shape.makeHiddenVertex();
    this.shape.makeHiddenCpoints();
  };
  get sprint(){
    return this.#sprint;
  };
  get version(){
    return this.#version;
  };
  get name(){
    return this.#name;
  };
  get startDate(){
    return this.#startDate;
  };
  get endDate(){
    return this.#endDate;
  };

  set endDate(value){
    if (value == undefined) throw new Error("The value should'nt be undefined");
    if (value == "") throw new Error("The value should'nt be empty string");
    this.#endDate = value;
       
  };

  set startDate(value){
    if (value == undefined) throw new Error("The value should'nt be undefined");
    if (value == "") throw new Error("The value should'nt be empty string");
    this.#startDate = value;
     
  };

  set name(value){
    this.#name = value;
  };

  set version(value){
    this.#version = value;
  };
}
 


