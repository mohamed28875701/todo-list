import todoList from "./todoList";
import task from "./task";
import project from "./project";

export default class storage{
    static saveTodoList(list){
        localStorage.setItem("todolist",JSON.stringify(list));
    }
    static getTodoList(){
        const list=Object.assign(new todoList(),JSON.parse(localStorage.getItem("todolist"))) ;
        list.setProjects(
            list.getProjects().map((proj)=> Object.assign(new project(),proj))
        )
        list.getProjects().forEach((proj)=> proj.setTasks(
            proj.getTasks().map((t)=> Object.assign(new task(),t))
        ))
        return list;
    }
    static addProject(proj){
        const list=storage.getTodoList()
        list.addProject(proj);
        storage.saveTodoList(list);
    }
    static deleteProject(projName){
        const list=storage.getTodoList();
        list.deleteProject(projName);
        storage.saveTodoList(list);
    }
    static addTask(projectName,task){
        const list=storage.getTodoList();
        list.getProject(projectName).addTask(task);
        storage.saveTodoList(list);
    }
    static deleteTask(projectName,taskName){
        const list=storage.getTodoList();
        list.getProject(projectName).deleteTask(taskName);
        storage.saveTodoList(list);
    }
    static renameTask(projectName,taskName,newName){
        const list=storage.getTodoList();
        list.getProject(projectName).getTask(taskName).setName(newName);
    }
}