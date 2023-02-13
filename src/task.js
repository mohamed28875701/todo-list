export default class task{
    constructor(name,duedate="no date",description="",priority="low"){
        this.name=name;
        this.duedate=duedate;
        this.description=description;
        this.priority=priority;
    }
    getName(){return this.name}
    setName(name){this.name=name}
    getDueDate(){return this.duedate}
    setDueDate(date){this.duedate=date}
    setDescription(desc){this.description=desc}
    setPriority(pr){this.priority=this.priority}
}