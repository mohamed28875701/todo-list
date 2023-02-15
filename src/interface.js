import storage from "./storage";
import project from "./project";
import task from "./task";

export default class ui{
    static load(){
        ui.header(); 
        ui.nav();
        ui.tasks();
        ui.loadTasks();
        document.addEventListener("keydown",ui.closeModals);
        
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
        tasks.textContent="";
        storage.getTodoList().getProject(active.textContent).getTasks().map((t)=>tasks.appendChild(ui.createTask(t)));
        
        if(storage.getTodoList().getProject(active.textContent).getTasks().length===0){
            const title=document.createElement("h2");
                const del=document.createElement("button");
                const li =document.createElement("li");
                li.id="empty-title";
                const il =document.createElement("li");
                il.id="proj-delete-li";
                li.appendChild(title);
                il.appendChild(del);
                del.id="delete-project";
                del.textContent="delete project?";
                title.textContent="Wow ,Such Empty";
                del.addEventListener("click",ui.deleteProject);
                tasks.appendChild(li);
                tasks.appendChild(il);
        }
        
            
            
                
            
    }
    static createAddModal(){
        const wrapper=document.createElement("div");
        wrapper.setAttribute("id","addmodal");
        const sidebar=document.createElement("div");
        const project=document.createElement("button");
        const todo=document.createElement("button");
        project.addEventListener("click",ui.loadProjectForm);
        todo.addEventListener("click",ui.loadToDoForm)
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
    static toDoForm(){
        const wrapper=document.createElement("div");
        wrapper.setAttribute("id","todo-form");
        const form=document.createElement("form");
        const name=document.createElement("input");
        const desc=document.createElement("input");
        const div=document.createElement("div");
        div.id="holder";
        name.id="todo-name-input";
        name.maxLength="25";
        name.required=true;
        name.placeholder="todo name i.e wear clothes";
        desc.id="todo-desc";
        const low=document.createElement("div");
        low.textContent="low";
        low.id="low";
        
        const medium=document.createElement("div");
        medium.textContent="medium";
        medium.id="medium";
        const high=document.createElement("div");
        high.textContent="high";
        high.id="high"
        low.setAttribute("data-toggle","off");
        medium.setAttribute("data-toggle","off");
        high.setAttribute("data-toggle","off");
        const sub=document.createElement("button");
        sub.id="save-task";
        sub.textContent="save";
        sub.type="submit";
        const date=document.createElement("input");
        date.id="date-input";
        date.type="date";
        desc.placeholder="i.e shirt,pants...";
        low.onclick=ui.getPriority;
        medium.onclick=ui.getPriority;
        high.onclick=ui.getPriority;
        sub.addEventListener("click",ui.saveTask)
        form.appendChild(name)
        form.appendChild(desc)
        form.appendChild(div);
        div.appendChild(low)
        div.appendChild(medium)
        div.appendChild(high)
        div.appendChild(date);
        div.appendChild(sub);
        wrapper.appendChild(form)
        
        return wrapper;
    }
    static saveTask(e){
        e.preventDefault();
        const name=document.getElementById("todo-name-input").value;
        const dueDate=document.getElementById("date-input").value;
        const desc=document.getElementById("todo-desc").value;
        const priority=document.querySelector("[data-toggle='on']").textContent;
        storage.addTask(document.querySelector("[data-status='active']").textContent,new task(name,dueDate,desc,priority));
        ui.loadTasks();
        const m=document.getElementById("addmodal");
        m.remove();
        const content=document.getElementById("content");
        content.style.filter="";
    }
    static getPriority(e){
        e.target.setAttribute("data-toggle","on");
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
        del.addEventListener("click",ui.deleteTask);
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
    static closeModals(e){
        if(e.key==="Escape"){
            const rem=document.getElementById("addmodal");
            rem.remove();
            document.getElementById("content").style.filter="";
        }
    }
    static loadProjectForm(){
        if(document.getElementById("addmodal").firstChild.nextSibling.id==="project-form")
            return;
        else{
            document.getElementById("addmodal").firstChild.nextSibling.remove();
            document.getElementById("addmodal").appendChild(ui.projectForm());
        }
        
    }
    static loadToDoForm(){
        if(document.getElementById("addmodal").firstChild.nextSibling.id==="todo-form")
            return;
        else{
            document.getElementById("addmodal").firstChild.nextSibling.remove();
            document.getElementById("addmodal").appendChild(ui.toDoForm());
        }
        
    }
    static deleteProject(e){
        const active=document.querySelector("[data-status='active']");
        document.getElementById("projlist").firstElementChild.setAttribute("data-status","active");
        storage.deleteProject(active.textContent);
        ui.loadProject(document.getElementById("projlist"));
        ui.loadTasks();
        
    }
    static deleteTask(e){
        const taskName=e.target.parentElement.parentElement.firstChild.textContent;
        
        storage.deleteTask(document.querySelector("[data-status='active']").textContent,taskName);
        ui.loadTasks();
    }
}
