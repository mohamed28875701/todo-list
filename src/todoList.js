import project from "./project";
import task from "./task";
export default class todoList{
    constructor(){
        this.projects=[];
        let p =new project("Home");
        p.addTask(new task("hey","23-23-2004","dddd","medium"));
        this.projects.push(p);

        this.projects.push(new project("Gym"));
        this.projects.push(new project("uni"));
    }
    setProjects(projects){this.projects=projects}
    getProjects(){return this.projects}
    getProject(projectName){
        return this.projects.find((pr)=> pr.getName()===projectName);
    }
    contains(projectName){
        for(let i =0;i!=this.projects.length;i++){
            if(this.projects[i].getName()===projectName)
                return true;
        }
        return false;
    }
    addProject(proj){
        if(this.contains(proj.getName()))
            return ;
        this.projects.push(proj);
    }
    deleteProject(projectName){
        if(!this.contains(projectName))
            return ;
        this.projects=this.projects.filter((p)=> p.getName()!==projectName);
    }
    
}