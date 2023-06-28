var getValue = (id, title, startDate, endDate, status, dependances) => {
    return [
        "ID : " + id,
        "Title : " + title,
        "Start : " + startDate[1] + " " + " " + startDate[2] + " "  + " " + startDate[3],
        "Finish : " + endDate[1] + " " + " " + endDate[2] + " "  + " " + endDate[3],
        "Status : " + status,
        "Related to : " + dependances.toString()
    ];
};

const story_type = [
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

const status_type = ['todo', 'done', 'in_review', 'in_progress'];


class Story{
    #id = 0;
    #title = 'titre';
    #startDate = new Date("2023-04-23");
    #endDate = new Date("3000-05-12");
    #dependances = [];
    #status = "in_progress";
    #type = "test"
    
    constructor(props){
        if (!props)
            throw new Error('Parameters are missing');
        
        if (Object.keys(props).includes('title') && (typeof props.title != 'string' || props.title == ''))
            throw new Error('Title should be a none-empty string');

        if (props.type == undefined)
            throw new Error('Type is required');
        
        if (props && !story_type.includes(props.type))
            throw new Error("this type of story is not included");

        if (!props.id)
            props.id = 0;
        
        if (!props.startDate)
            props.startDate = this.#startDate;
        
        if (!props.endDate)
            props.endDate = this.#endDate;

        this.#id = aya.id();
        this.#title = props.title;
        this.#type = props.type;
        this.#startDate = props.startDate;
        this.#endDate = props.endDate;
        this.shape = aya.rectangle(10, 20, R_WIDTH, R_HEIGHT);
        this.shape.setStyles({fill: R_FILL, stroke: R_STROKE, strokewidth: R_STROKEWIDTH});

        this.shape.addEvent("mouseover", ()=> {
            mouseovercb(this);
        });

        this.shape.addEvent("mouseleave", ()=> {
            mouseleavecb(this);
        });
    }

    get id(){
        return this.#id;
    };

    get type(){
        return this.#type;
    }

    get status(){
        return this.#status;
    }

    get title(){
        return this.#title;
    };

    get startDate(){
        return this.#startDate;
    };

    get endDate(){
        return this.#endDate;
    };

    get dependances(){
        return this.#dependances;
    };


    /**
     * setters
     */

    set status(value){
        if (value && !status_type.includes(value))
            throw new Error("this type of status is not allowed");
        this.#status = value;
    }

    set title(value){
        this.#title = value;
    };

    set startDate(value){
        this.#startDate = value;
    };

    set endDate(value){
        this.#endDate = value;
    };
}

var mouseovercb = (story) => {
    if(story.shape.children.length == 0){
        var startDate = new Date(story.startDate).toString().split(" ");
        var endDate = new Date(story.endDate).toString().split(" ");
        var values = getValue(story.id, story.title, startDate, endDate, story.status, story.dependances);
        var box = aya.rectangle(story.shape.x, story.shape.y + story.shape.height + 40, B_WIDTH, B_HEIGHT, false);
        var text;
        story.shape.addChild(box, {x:0, y:0}, {x:story.shape.x, y:story.shape.y});       
        box.setStyles({fill: B_FILL, stroke: B_STROKE, strokewidth:  B_STROKEWIDTH});
        for(var i=0; i<=5; i++){
            var line = aya.line(box.x, box.y + box.height/6 * (i+1), box.x + box.width, box.y + box.height/6 * (i+1), false);
            box.addChild(line);
            text = aya.text(line.x + DELTA_X, line.y - DELTA_Y, values[i], 0, line.dest_x, line.dest_y, false);
            line.addChild(text);
        };
        return {
            box: box
        };
    } 
    else {
        var box = story.shape.children[0].child;
        box.c_svg.setAttribute("visibility", "visible");
        box.children.map(({child}) => {
            var line = child;
            line.c_svg.setAttribute("visibility", "visible");
            line.children.map(({child}) => {
                var text = child;
                text.c_svg.setAttribute("visibility", "visible");
            });
        });
    }

};

var mouseleavecb = (story) => {
    var box = story.shape.children[0].child;
    box.c_svg.setAttribute("visibility", "hidden");
    box.children.map(({child}) => {
        var line = child;
        line.c_svg.setAttribute("visibility", "hidden");
        line.children.map(({child}) => {
            var text = child;
            text.c_svg.setAttribute("visibility", "hidden");
        });
    });
};