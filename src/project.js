import task from "./task";
export default class project{
    constructor(name){
        this.name=name;
        this.tasks=[];
    }
    getName(){return this.name}
    setName(n){this.name=n;}
    getTasks(){return this.tasks}
    setTasks(tasks){this.tasks=tasks;}
    addTask(task){
        for(let i=0;i!=this.tasks.length;i++){
            if(task.getName()===this.tasks[i].getName())
                return ;
        }
        this.tasks.push(task);
    }
    contains(taskName){
        for(let i=0;i!=this.tasks.length;i++){
            if(taskName===this.tasks[i].getName())
                return true;
        }
        return false;
    }
    deleteTask(taskName){
        if(!this.contains(taskName))
            return ;
        this.tasks=this.tasks.filter((t)=> t.getName()!==taskName);
        
            
                
        
    }
    getTask(taskName){
        for(let i = 0;i!==this.tasks.length;i++){
            if(this.tasks[i].getName()===taskName)
                return this.tasks[i];
        }
    }
}