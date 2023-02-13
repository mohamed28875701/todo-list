export default class task{
    constructor(name,duedate="no date"){
        this.name=name;
        this.duedate=duedate;
    }
    getName(){return this.name}
    setName(name){this.name=name}
    getDueDate(){return this.duedate}
    setDueDate(date){this.duedate=date}
}