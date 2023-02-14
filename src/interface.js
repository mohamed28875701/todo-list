import storage from "./storage";
import project from "./project";
import task from "./task";

export default class ui{
    static load(){
        ui.header(); 
        ui.nav();
        ui.tasks();
        
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
        ui.loadProject(projList);
        wrapper.appendChild(projList);
        wrapper.appendChild(add);
        const content=document.getElementById("content");
        content.appendChild(wrapper);

    }
    static loadProject(list){
        list.innerHTML="";
        storage.getTodoList().getProjects().map((proj)=> list.appendChild(ui.createProj(proj.getName())));
        
    }
    static createProj(projName){
        const li=document.createElement("li");
        li.setAttribute("data-status","inactive");
        
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
        wrapper.appendChild(ul);
        const content=document.getElementById("content");
        content.appendChild(wrapper);
    }
    static loadTasks(){
        const active=document.querySelector("[data-status='active']");
        const tasks=document.getElementById("tasks");
    }
    static createTask(task){
        const li=document.createElement("li");
        li.setAttribute("id","task");
        const div=document.createElement("div");
        const name=document.createElement("p");
        name.textContent=task.getName();
        const details=document.createElement("button");
        const date=document.createElement("p");
        const del=document.createElement("button");
        details.setAttribute("id","details");
        del.setAttribute("id","delete");
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
        
    }
}