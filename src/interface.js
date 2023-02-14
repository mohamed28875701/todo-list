import storage from "./storage";
import project from "./project";
import task from "./task";

export default class ui{
    static load(){
        ui.header(); 
        ui.nav();
        ui.tasks();
        ui.loadTasks();
        
        
    }
    static header(){
        const wrapper=document.createElement("div");
        wrapper.setAttribute("id","header");
        wrapper.classList.add("header");
        const title=document.createElement("h2");
        title.textContent="Todo List";
        wrapper.appendChild(title);
        const content=document.getElementById("content");
        content.appendChild(wrapper);
    }
    static nav(){
        const wrapper=document.createElement("div");
        wrapper.setAttribute("id","nav");
        const projList=document.createElement("ul");
        projList.setAttribute("id","projlist");
        const add=document.createElement("button");
        add.setAttribute("id","add");
        add.textContent="+";
        add.addEventListener("click",ui.createAddModal);
        ui.loadProject(projList);
        wrapper.appendChild(projList);
        wrapper.appendChild(add);
        const content=document.getElementById("content");
        content.appendChild(wrapper);

    }
    static loadProject(list){
        list.textContent="";
        storage.getTodoList().getProjects().map((proj)=> list.appendChild(ui.createProj(proj.getName())));
        
    }
    static createProj(projName){
        const li=document.createElement("li");
        li.setAttribute("data-status","inactive");
        li.addEventListener("click",ui.selectProject);
        li.textContent=`${projName}`;
        if(li.textContent==="Home"){
            li.setAttribute("data-status","active");
        }
        
        li.classList.add("proj");
        return li;
    }
    static tasks(){
        const wrapper=document.createElement("div");
        wrapper.setAttribute("id","tasks");
        const ul=document.createElement("ul");
        ul.setAttribute("id","tasklist");
        wrapper.appendChild(ul);
        const content=document.getElementById("content");
        content.appendChild(wrapper);
    }
    static loadTasks(){
        const active=document.querySelector("[data-status='active']");
        const tasks=document.getElementById("tasklist");
        storage.getTodoList().getProject(active.textContent).getTasks().map((t)=>tasks.appendChild(ui.createTask(t)));
    }
    static createAddModal(){
        const wrapper=document.createElement("div");
        wrapper.setAttribute("id","addmodal");
        const sidebar=document.createElement("div");
        const project=document.createElement("button");
        const todo=document.createElement("button");
        sidebar.setAttribute("id","side");
        project.setAttribute("id","addproj");
        project.textContent="Add Project";
        todo.textContent="Add ToDo"
        todo.setAttribute("id","addtodo");
        sidebar.appendChild(project);
        sidebar.appendChild(todo);
        wrapper.appendChild(sidebar);
        wrapper.appendChild(ui.projectForm());
        document.getElementById("content").style="transition:all .3s ease-in-out";
        document.getElementById("content").style.filter="blur(8px)"
        document.body.appendChild(wrapper);
        
        
    }
    static projectForm(){
        const wrapper=document.createElement("div");
        const form=document.createElement("form");
        const name=document.createElement("input");
        const sub=document.createElement("button");
        
        sub.textContent="Save";
        sub.setAttribute("id","sub");
        sub.setAttribute("type","submit");
        name.placeholder="project name i.e gym";
        wrapper.setAttribute("id","project-form");
        name.setAttribute("id","project-name-input");
        name.setAttribute("type","text");
        name.setAttribute("minlength","1");
        name.setAttribute("maxlength","10");
        name.name="project-name-input";
        name.required=true;
        form.appendChild(name);
        form.appendChild(sub);
        wrapper.appendChild(form);
        sub.addEventListener("click",ui.saveProject);
        return wrapper;
    }
    static saveProject(e){
        e.preventDefault();
        const name=document.getElementById("project-name-input");
        storage.addProject(new project(name.value));
        const m=document.getElementById("addmodal");
        m.remove();
        const content=document.getElementById("content");
        content.style.filter="";
        ui.loadProject(document.getElementById("projlist"));
    }
    static createTask(task){
        const li=document.createElement("li");
        li.setAttribute("id","task");
        const div=document.createElement("div");
        div.setAttribute("id","div");
        const name=document.createElement("p");
        name.textContent=task.getName();
        const details=document.createElement("button");
        const date=document.createElement("p");
        const del=document.createElement("button");
        details.setAttribute("id","details");
        del.setAttribute("id","delete");
        del.textContent="delete";
        details.textContent="details";
        date.textContent=task.getDueDate();
        li.appendChild(name);
        div.appendChild(details);
        div.appendChild(date);
        div.appendChild(del);
        li.appendChild(div);
        if(task.getPriority()==="low"){
            li.style.borderLeftColor="green"
        }
        else if(task.getPriority()==="medium"){
            li.style.borderLeftColor="orange";
        }
        else{
            li.style.borderLeftColor="red";
        }
        return li;
        
    }
    static selectProject(e){
        const ul=document.getElementById("tasklist");
        ul.textContent="";
        const old=document.querySelector("[data-status='active']");
        old.setAttribute("data-status","inactive");
        e.target.setAttribute("data-status","active");
        ui.loadTasks();
    }
}