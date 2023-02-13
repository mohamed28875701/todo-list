import storage from "./storage";

export default class ui{
    static site(){
        ui.header();
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
        const projList=document.createElement("ul");

    }
}