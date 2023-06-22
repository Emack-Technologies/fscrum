const story_t = [
    "technical",
    "design_review",
    "code_review",
    "testing_review",
    "code",
    "test",
    "functional",
    "bug_fixing",
    "technical_debt",
    "epique"
];

class Sprint{
    #id = "";
    #goal = "";
    #stories = {};
    #status = "";
    #name = "undefined";
    #startDate = "null";
    #endDate = "null";
    #shape = "undefined";
    #backlog = {};
    #type = "sprint";

    constructor(props){
        if (!props)
            throw new Error("parameter should be precise");
        if (props && (typeof props.name != "string" || props.name == ""))
            throw new Error("name attribute should be precise");
        if (props && props.startDate == undefined)
            throw new Error("startDate should be precise");
        if (props && props.endDate == undefined)
            throw new Error("endDate should be precise");
        if (props.startDate.getTime() > props.endDate.getTime())
            throw new Error("start date should come before end date");   
        if (props && props.backlog.list == undefined)
            throw new Error("backlog should be precise");

        this.#id = aya.id();
        this.#name = props.name;
        this.#startDate = props.startDate;
        this.#endDate = props.endDate;
        this.#backlog = props.backlog;

        if (this.#endDate.getTime() < Date.now())
            this.#status = "done";
        if (this.#startDate < Date.now() && this.#endDate > Date.now())
            this.#status = "current";
        if (this.#startDate > Date.now())
            this.#status = "future";

        this.#shape = aya.image(100, 100, IMG_W, IMG_H, PATH, this.#name);
        this.#backlog.add(this.#id, this);
    }

    addStory(story){
        if (story.type && !story_t.includes(story.type))
            throw new Error("this type of story is not included");
        let sprints = this.#backlog.findItemsByType("sprint");
        sprints.map((sprint)=>{
            if (sprint.stories[story.id])
                sprint.deleteStory(story.id);
        });
        this.#stories[story.id] = story;
    }

    deleteStory(id){
        delete this.#stories[id];
    }


    /**
     * Code related to getters
     */
    get goal(){
        return this.#goal;
    }

    get type(){
        return this.#type;
    }

    get stories(){
        return this.#stories;
    }

    get status(){
        return this.#status;
    }

    get name(){
        return this.#name;
    }

    get startDate(){
        return this.#startDate;
    }

    get endDate(){
        return this.#endDate;
    }

    get shape(){
        return this.#shape;
    }

    get id(){
        return this.#id;
    }

    get backlog(){
        return this.#backlog;
    }

    /**
     * Code related to setters
     */

    set name(value){
        this.#name = value;
    }

    set startDate(value){
        this.#startDate = value;
    }

    set endDate(value){
        this.#endDate = value;
    }

    set goal(value){
        this.#goal = value;
    }

    set status(value){
        this.#status = value;
    }
}