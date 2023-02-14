import storage from "./storage";
import project from "./project";
import task from "./task";

export default class ui{
    static load(){
        ui.header(); 
        ui.nav();
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
        ui.loadProject(projList);
        wrapper.appendChild(projList);
        const content=document.getElementById("content");
        content.appendChild(wrapper);

    }
    static loadProject(list){
        list.innerHTML="";
        storage.getTodoList().getProjects().map((proj)=> list.appendChild(ui.createProj(proj.getName())));
        
    }
    static createProj(projName){
        const li=document.createElement("li");
        li.textContent=`${projName}`;
        li.classList.add("proj");
        return li;
    }
}