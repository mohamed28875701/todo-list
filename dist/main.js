/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/interface.js":
/*!**************************!*\
  !*** ./src/interface.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ui)
/* harmony export */ });
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ "./src/storage.js");
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project */ "./src/project.js");
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./task */ "./src/task.js");




class ui{
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
        _storage__WEBPACK_IMPORTED_MODULE_0__["default"].getTodoList().getProjects().map((proj)=> list.appendChild(ui.createProj(proj.getName())));
        
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
        _storage__WEBPACK_IMPORTED_MODULE_0__["default"].getTodoList().getProject(active.textContent).getTasks().map((t)=>tasks.appendChild(ui.createTask(t)));
        
        if(_storage__WEBPACK_IMPORTED_MODULE_0__["default"].getTodoList().getProject(active.textContent).getTasks().length===0){
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
        _storage__WEBPACK_IMPORTED_MODULE_0__["default"].addTask(document.querySelector("[data-status='active']").textContent,new _task__WEBPACK_IMPORTED_MODULE_2__["default"](name,dueDate,desc,priority));
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
        _storage__WEBPACK_IMPORTED_MODULE_0__["default"].addProject(new _project__WEBPACK_IMPORTED_MODULE_1__["default"](name.value));
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
        details.addEventListener("click",ui.details);
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
            
            if(document.getElementById("addmodal")!==null){
                document.getElementById("addmodal").remove();
            }
            
            if(document.getElementById("details-modal")!==null)
                document.getElementById("details-modal").remove();
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
        if(active.textContent==="main")
            return;
        document.getElementById("projlist").firstElementChild.setAttribute("data-status","active");
        _storage__WEBPACK_IMPORTED_MODULE_0__["default"].deleteProject(active.textContent);
        ui.loadProject(document.getElementById("projlist"));
        ui.loadTasks();
        
    }
    static deleteTask(e){
        const taskName=e.target.parentElement.parentElement.firstChild.textContent;
        
        _storage__WEBPACK_IMPORTED_MODULE_0__["default"].deleteTask(document.querySelector("[data-status='active']").textContent,taskName);
        ui.loadTasks();
    }
    static details(e){
        
        const proj=document.querySelector("[data-status='active']");
        const projj=_storage__WEBPACK_IMPORTED_MODULE_0__["default"].getTodoList().getProject(proj.textContent);
        const task=projj.getTask(e.target.parentElement.parentElement.firstChild.textContent);
        const wrapper=document.createElement("div");
        const name=document.createElement("p");
        name.textContent=`${task.getName()}`
        name.id="details-title";
        const projname=document.createElement("p");
        projname.textContent=`Project:${document.querySelector("[data-status='active']").textContent}`
        const dateelement=document.createElement("p");
        dateelement.textContent=`Duedate:${task.getDueDate()}`;
        wrapper.appendChild(name)
        wrapper.appendChild(projname)
        wrapper.appendChild(dateelement);
        wrapper.setAttribute("id","details-modal");
        document.body.appendChild(wrapper);
        document.getElementById("content").style.filter="blur(8px)";
        
    }
}


/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ project)
/* harmony export */ });
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task */ "./src/task.js");

class project{
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

/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ storage)
/* harmony export */ });
/* harmony import */ var _todoList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todoList */ "./src/todoList.js");
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task */ "./src/task.js");
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./project */ "./src/project.js");




class storage{
    static saveTodoList(list){
        localStorage.setItem("todolist",JSON.stringify(list));
    }
    static getTodoList(){
        const list=Object.assign(new _todoList__WEBPACK_IMPORTED_MODULE_0__["default"](),JSON.parse(localStorage.getItem("todolist"))) ;
        list.setProjects(
            list.getProjects().map((proj)=> Object.assign(new _project__WEBPACK_IMPORTED_MODULE_2__["default"](),proj))
        )
        list.getProjects().forEach((proj)=> proj.setTasks(
            proj.getTasks().map((t)=> Object.assign(new _task__WEBPACK_IMPORTED_MODULE_1__["default"](),t))
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

/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ task)
/* harmony export */ });
class task{
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
    getDescription(){return this.description}
    setPriority(pr){this.priority=this.priority}
    getPriority(){return this.priority}
}

/***/ }),

/***/ "./src/todoList.js":
/*!*************************!*\
  !*** ./src/todoList.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ todoList)
/* harmony export */ });
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project */ "./src/project.js");
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task */ "./src/task.js");


class todoList{
    constructor(){
        this.projects=[];
        let p =new _project__WEBPACK_IMPORTED_MODULE_0__["default"]("Home");
        p.addTask(new _task__WEBPACK_IMPORTED_MODULE_1__["default"]("hey","23-23-2004","dddd","medium"));
        this.projects.push(p);

        this.projects.push(new _project__WEBPACK_IMPORTED_MODULE_0__["default"]("Gym"));
        this.projects.push(new _project__WEBPACK_IMPORTED_MODULE_0__["default"]("uni"));
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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _interface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interface */ "./src/interface.js");


document.addEventListener("DOMContentLoaded",_interface__WEBPACK_IMPORTED_MODULE_0__["default"].load);



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QixnREFBTztBQUN0QztBQUNBLDBCQUEwQjtBQUMxQixrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsd0JBQXdCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztVQ25DQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTjZCO0FBQzdCO0FBQ0EsNkNBQTZDLHVEQUFPO0FBQ3BEO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW50ZXJmYWNlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9wcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdG9yYWdlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90YXNrLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90b2RvTGlzdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0b3JhZ2UgZnJvbSBcIi4vc3RvcmFnZVwiO1xyXG5pbXBvcnQgcHJvamVjdCBmcm9tIFwiLi9wcm9qZWN0XCI7XHJcbmltcG9ydCB0YXNrIGZyb20gXCIuL3Rhc2tcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHVpe1xyXG4gICAgc3RhdGljIGxvYWQoKXtcclxuICAgICAgICB1aS5oZWFkZXIoKTsgXHJcbiAgICAgICAgdWkubmF2KCk7XHJcbiAgICAgICAgdWkudGFza3MoKTtcclxuICAgICAgICB1aS5sb2FkVGFza3MoKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLHVpLmNsb3NlTW9kYWxzKTtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIHN0YXRpYyBoZWFkZXIoKXtcclxuICAgICAgICBjb25zdCB3cmFwcGVyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgd3JhcHBlci5zZXRBdHRyaWJ1dGUoXCJpZFwiLFwiaGVhZGVyXCIpO1xyXG4gICAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZChcImhlYWRlclwiKTtcclxuICAgICAgICBjb25zdCB0aXRsZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQ9XCJUb2RvIExpc3RcIjtcclxuICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHRpdGxlKTtcclxuICAgICAgICBjb25zdCBjb250ZW50PWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGVudFwiKTtcclxuICAgICAgICBjb250ZW50LmFwcGVuZENoaWxkKHdyYXBwZXIpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIG5hdigpe1xyXG4gICAgICAgIGNvbnN0IHdyYXBwZXI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICB3cmFwcGVyLnNldEF0dHJpYnV0ZShcImlkXCIsXCJuYXZcIik7XHJcbiAgICAgICAgY29uc3QgcHJvakxpc3Q9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xyXG4gICAgICAgIHByb2pMaXN0LnNldEF0dHJpYnV0ZShcImlkXCIsXCJwcm9qbGlzdFwiKTtcclxuICAgICAgICBjb25zdCBhZGQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgICAgICBhZGQuc2V0QXR0cmlidXRlKFwiaWRcIixcImFkZFwiKTtcclxuICAgICAgICBhZGQudGV4dENvbnRlbnQ9XCIrXCI7XHJcbiAgICAgICAgYWRkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHVpLmNyZWF0ZUFkZE1vZGFsKTtcclxuICAgICAgICB1aS5sb2FkUHJvamVjdChwcm9qTGlzdCk7XHJcbiAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZChwcm9qTGlzdCk7XHJcbiAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZChhZGQpO1xyXG4gICAgICAgIGNvbnN0IGNvbnRlbnQ9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50XCIpO1xyXG4gICAgICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQod3JhcHBlcik7XHJcblxyXG4gICAgfVxyXG4gICAgc3RhdGljIGxvYWRQcm9qZWN0KGxpc3Qpe1xyXG4gICAgICAgIGxpc3QudGV4dENvbnRlbnQ9XCJcIjtcclxuICAgICAgICBzdG9yYWdlLmdldFRvZG9MaXN0KCkuZ2V0UHJvamVjdHMoKS5tYXAoKHByb2opPT4gbGlzdC5hcHBlbmRDaGlsZCh1aS5jcmVhdGVQcm9qKHByb2ouZ2V0TmFtZSgpKSkpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgc3RhdGljIGNyZWF0ZVByb2oocHJvak5hbWUpe1xyXG4gICAgICAgIGNvbnN0IGxpPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICAgICAgICBsaS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXN0YXR1c1wiLFwiaW5hY3RpdmVcIik7XHJcbiAgICAgICAgbGkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsdWkuc2VsZWN0UHJvamVjdCk7XHJcbiAgICAgICAgbGkudGV4dENvbnRlbnQ9YCR7cHJvak5hbWV9YDtcclxuICAgICAgICBpZihsaS50ZXh0Q29udGVudD09PVwiSG9tZVwiKXtcclxuICAgICAgICAgICAgbGkuc2V0QXR0cmlidXRlKFwiZGF0YS1zdGF0dXNcIixcImFjdGl2ZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGkuY2xhc3NMaXN0LmFkZChcInByb2pcIik7XHJcbiAgICAgICAgcmV0dXJuIGxpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIHRhc2tzKCl7XHJcbiAgICAgICAgY29uc3Qgd3JhcHBlcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIHdyYXBwZXIuc2V0QXR0cmlidXRlKFwiaWRcIixcInRhc2tzXCIpO1xyXG4gICAgICAgIGNvbnN0IHVsPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcclxuICAgICAgICB1bC5zZXRBdHRyaWJ1dGUoXCJpZFwiLFwidGFza2xpc3RcIik7XHJcbiAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZCh1bCk7XHJcbiAgICAgICAgY29uc3QgY29udGVudD1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRlbnRcIik7XHJcbiAgICAgICAgY29udGVudC5hcHBlbmRDaGlsZCh3cmFwcGVyKTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBsb2FkVGFza3MoKXtcclxuICAgICAgICBjb25zdCBhY3RpdmU9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXN0YXR1cz0nYWN0aXZlJ11cIik7XHJcbiAgICAgICAgY29uc3QgdGFza3M9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrbGlzdFwiKTsgICAgXHJcbiAgICAgICAgdGFza3MudGV4dENvbnRlbnQ9XCJcIjtcclxuICAgICAgICBzdG9yYWdlLmdldFRvZG9MaXN0KCkuZ2V0UHJvamVjdChhY3RpdmUudGV4dENvbnRlbnQpLmdldFRhc2tzKCkubWFwKCh0KT0+dGFza3MuYXBwZW5kQ2hpbGQodWkuY3JlYXRlVGFzayh0KSkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHN0b3JhZ2UuZ2V0VG9kb0xpc3QoKS5nZXRQcm9qZWN0KGFjdGl2ZS50ZXh0Q29udGVudCkuZ2V0VGFza3MoKS5sZW5ndGg9PT0wKXtcclxuICAgICAgICAgICAgY29uc3QgdGl0bGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGVsPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaSA9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xyXG4gICAgICAgICAgICAgICAgbGkuaWQ9XCJlbXB0eS10aXRsZVwiO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaWwgPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICAgICAgICAgICAgICAgIGlsLmlkPVwicHJvai1kZWxldGUtbGlcIjtcclxuICAgICAgICAgICAgICAgIGxpLmFwcGVuZENoaWxkKHRpdGxlKTtcclxuICAgICAgICAgICAgICAgIGlsLmFwcGVuZENoaWxkKGRlbCk7XHJcbiAgICAgICAgICAgICAgICBkZWwuaWQ9XCJkZWxldGUtcHJvamVjdFwiO1xyXG4gICAgICAgICAgICAgICAgZGVsLnRleHRDb250ZW50PVwiZGVsZXRlIHByb2plY3Q/XCI7XHJcbiAgICAgICAgICAgICAgICB0aXRsZS50ZXh0Q29udGVudD1cIldvdyAsU3VjaCBFbXB0eVwiO1xyXG4gICAgICAgICAgICAgICAgZGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHVpLmRlbGV0ZVByb2plY3QpO1xyXG4gICAgICAgICAgICAgICAgdGFza3MuYXBwZW5kQ2hpbGQobGkpO1xyXG4gICAgICAgICAgICAgICAgdGFza3MuYXBwZW5kQ2hpbGQoaWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgfVxyXG4gICAgc3RhdGljIGNyZWF0ZUFkZE1vZGFsKCl7XHJcbiAgICAgICAgY29uc3Qgd3JhcHBlcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIHdyYXBwZXIuc2V0QXR0cmlidXRlKFwiaWRcIixcImFkZG1vZGFsXCIpO1xyXG4gICAgICAgIGNvbnN0IHNpZGViYXI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBjb25zdCBwcm9qZWN0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgY29uc3QgdG9kbz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgICAgIHByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsdWkubG9hZFByb2plY3RGb3JtKTtcclxuICAgICAgICB0b2RvLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHVpLmxvYWRUb0RvRm9ybSlcclxuICAgICAgICBzaWRlYmFyLnNldEF0dHJpYnV0ZShcImlkXCIsXCJzaWRlXCIpO1xyXG4gICAgICAgIHByb2plY3Quc2V0QXR0cmlidXRlKFwiaWRcIixcImFkZHByb2pcIik7XHJcbiAgICAgICAgcHJvamVjdC50ZXh0Q29udGVudD1cIkFkZCBQcm9qZWN0XCI7XHJcbiAgICAgICAgdG9kby50ZXh0Q29udGVudD1cIkFkZCBUb0RvXCJcclxuICAgICAgICB0b2RvLnNldEF0dHJpYnV0ZShcImlkXCIsXCJhZGR0b2RvXCIpO1xyXG4gICAgICAgIHNpZGViYXIuYXBwZW5kQ2hpbGQocHJvamVjdCk7XHJcbiAgICAgICAgc2lkZWJhci5hcHBlbmRDaGlsZCh0b2RvKTtcclxuICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHNpZGViYXIpO1xyXG4gICAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQodWkucHJvamVjdEZvcm0oKSk7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50XCIpLnN0eWxlPVwidHJhbnNpdGlvbjphbGwgLjNzIGVhc2UtaW4tb3V0XCI7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50XCIpLnN0eWxlLmZpbHRlcj1cImJsdXIoOHB4KVwiXHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh3cmFwcGVyKTtcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIHN0YXRpYyB0b0RvRm9ybSgpe1xyXG4gICAgICAgIGNvbnN0IHdyYXBwZXI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICB3cmFwcGVyLnNldEF0dHJpYnV0ZShcImlkXCIsXCJ0b2RvLWZvcm1cIik7XHJcbiAgICAgICAgY29uc3QgZm9ybT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcclxuICAgICAgICBjb25zdCBuYW1lPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgICAgICBjb25zdCBkZXNjPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgICAgICBjb25zdCBkaXY9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBkaXYuaWQ9XCJob2xkZXJcIjtcclxuICAgICAgICBuYW1lLmlkPVwidG9kby1uYW1lLWlucHV0XCI7XHJcbiAgICAgICAgbmFtZS5tYXhMZW5ndGg9XCIyNVwiO1xyXG4gICAgICAgIG5hbWUucmVxdWlyZWQ9dHJ1ZTtcclxuICAgICAgICBuYW1lLnBsYWNlaG9sZGVyPVwidG9kbyBuYW1lIGkuZSB3ZWFyIGNsb3RoZXNcIjtcclxuICAgICAgICBkZXNjLmlkPVwidG9kby1kZXNjXCI7XHJcbiAgICAgICAgY29uc3QgbG93PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgbG93LnRleHRDb250ZW50PVwibG93XCI7XHJcbiAgICAgICAgbG93LmlkPVwibG93XCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgbWVkaXVtPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgbWVkaXVtLnRleHRDb250ZW50PVwibWVkaXVtXCI7XHJcbiAgICAgICAgbWVkaXVtLmlkPVwibWVkaXVtXCI7XHJcbiAgICAgICAgY29uc3QgaGlnaD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGhpZ2gudGV4dENvbnRlbnQ9XCJoaWdoXCI7XHJcbiAgICAgICAgaGlnaC5pZD1cImhpZ2hcIlxyXG4gICAgICAgIGxvdy5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRvZ2dsZVwiLFwib2ZmXCIpO1xyXG4gICAgICAgIG1lZGl1bS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRvZ2dsZVwiLFwib2ZmXCIpO1xyXG4gICAgICAgIGhpZ2guc2V0QXR0cmlidXRlKFwiZGF0YS10b2dnbGVcIixcIm9mZlwiKTtcclxuICAgICAgICBjb25zdCBzdWI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgICAgICBzdWIuaWQ9XCJzYXZlLXRhc2tcIjtcclxuICAgICAgICBzdWIudGV4dENvbnRlbnQ9XCJzYXZlXCI7XHJcbiAgICAgICAgc3ViLnR5cGU9XCJzdWJtaXRcIjtcclxuICAgICAgICBjb25zdCBkYXRlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgICAgICBkYXRlLmlkPVwiZGF0ZS1pbnB1dFwiO1xyXG4gICAgICAgIGRhdGUudHlwZT1cImRhdGVcIjtcclxuICAgICAgICBkZXNjLnBsYWNlaG9sZGVyPVwiaS5lIHNoaXJ0LHBhbnRzLi4uXCI7XHJcbiAgICAgICAgbG93Lm9uY2xpY2s9dWkuZ2V0UHJpb3JpdHk7XHJcbiAgICAgICAgbWVkaXVtLm9uY2xpY2s9dWkuZ2V0UHJpb3JpdHk7XHJcbiAgICAgICAgaGlnaC5vbmNsaWNrPXVpLmdldFByaW9yaXR5O1xyXG4gICAgICAgIHN1Yi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIix1aS5zYXZlVGFzaylcclxuICAgICAgICBmb3JtLmFwcGVuZENoaWxkKG5hbWUpXHJcbiAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChkZXNjKVxyXG4gICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQobG93KVxyXG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChtZWRpdW0pXHJcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKGhpZ2gpXHJcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKGRhdGUpO1xyXG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChzdWIpO1xyXG4gICAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoZm9ybSlcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gd3JhcHBlcjtcclxuICAgIH1cclxuICAgIHN0YXRpYyBzYXZlVGFzayhlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgY29uc3QgbmFtZT1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvZG8tbmFtZS1pbnB1dFwiKS52YWx1ZTtcclxuICAgICAgICBjb25zdCBkdWVEYXRlPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGF0ZS1pbnB1dFwiKS52YWx1ZTtcclxuICAgICAgICBjb25zdCBkZXNjPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9kby1kZXNjXCIpLnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IHByaW9yaXR5PWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS10b2dnbGU9J29uJ11cIikudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgc3RvcmFnZS5hZGRUYXNrKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1zdGF0dXM9J2FjdGl2ZSddXCIpLnRleHRDb250ZW50LG5ldyB0YXNrKG5hbWUsZHVlRGF0ZSxkZXNjLHByaW9yaXR5KSk7XHJcbiAgICAgICAgdWkubG9hZFRhc2tzKCk7XHJcbiAgICAgICAgY29uc3QgbT1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZG1vZGFsXCIpO1xyXG4gICAgICAgIG0ucmVtb3ZlKCk7XHJcbiAgICAgICAgY29uc3QgY29udGVudD1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRlbnRcIik7XHJcbiAgICAgICAgY29udGVudC5zdHlsZS5maWx0ZXI9XCJcIjtcclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXRQcmlvcml0eShlKXtcclxuICAgICAgICBlLnRhcmdldC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRvZ2dsZVwiLFwib25cIik7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgcHJvamVjdEZvcm0oKXtcclxuICAgICAgICBjb25zdCB3cmFwcGVyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgY29uc3QgZm9ybT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcclxuICAgICAgICBjb25zdCBuYW1lPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgICAgICBjb25zdCBzdWI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgICAgICBzdWIudGV4dENvbnRlbnQ9XCJTYXZlXCI7XHJcbiAgICAgICAgc3ViLnNldEF0dHJpYnV0ZShcImlkXCIsXCJzdWJcIik7XHJcbiAgICAgICAgc3ViLnNldEF0dHJpYnV0ZShcInR5cGVcIixcInN1Ym1pdFwiKTtcclxuICAgICAgICBuYW1lLnBsYWNlaG9sZGVyPVwicHJvamVjdCBuYW1lIGkuZSBneW1cIjtcclxuICAgICAgICB3cmFwcGVyLnNldEF0dHJpYnV0ZShcImlkXCIsXCJwcm9qZWN0LWZvcm1cIik7XHJcbiAgICAgICAgbmFtZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLFwicHJvamVjdC1uYW1lLWlucHV0XCIpO1xyXG4gICAgICAgIG5hbWUuc2V0QXR0cmlidXRlKFwidHlwZVwiLFwidGV4dFwiKTtcclxuICAgICAgICBuYW1lLnNldEF0dHJpYnV0ZShcIm1pbmxlbmd0aFwiLFwiMVwiKTtcclxuICAgICAgICBuYW1lLnNldEF0dHJpYnV0ZShcIm1heGxlbmd0aFwiLFwiMTBcIik7XHJcbiAgICAgICAgbmFtZS5uYW1lPVwicHJvamVjdC1uYW1lLWlucHV0XCI7XHJcbiAgICAgICAgbmFtZS5yZXF1aXJlZD10cnVlO1xyXG4gICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQobmFtZSk7XHJcbiAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChzdWIpO1xyXG4gICAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoZm9ybSk7XHJcbiAgICAgICAgc3ViLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHVpLnNhdmVQcm9qZWN0KTtcclxuICAgICAgICByZXR1cm4gd3JhcHBlcjtcclxuICAgIH1cclxuICAgIHN0YXRpYyBzYXZlUHJvamVjdChlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgY29uc3QgbmFtZT1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtbmFtZS1pbnB1dFwiKTtcclxuICAgICAgICBzdG9yYWdlLmFkZFByb2plY3QobmV3IHByb2plY3QobmFtZS52YWx1ZSkpO1xyXG4gICAgICAgIGNvbnN0IG09ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGRtb2RhbFwiKTtcclxuICAgICAgICBtLnJlbW92ZSgpO1xyXG4gICAgICAgIGNvbnN0IGNvbnRlbnQ9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50XCIpO1xyXG4gICAgICAgIGNvbnRlbnQuc3R5bGUuZmlsdGVyPVwiXCI7XHJcbiAgICAgICAgdWkubG9hZFByb2plY3QoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qbGlzdFwiKSk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgY3JlYXRlVGFzayh0YXNrKXtcclxuICAgICAgICBjb25zdCBsaT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgICAgICAgbGkuc2V0QXR0cmlidXRlKFwiaWRcIixcInRhc2tcIik7XHJcbiAgICAgICAgY29uc3QgZGl2PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgZGl2LnNldEF0dHJpYnV0ZShcImlkXCIsXCJkaXZcIik7XHJcbiAgICAgICAgY29uc3QgbmFtZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgICAgICBuYW1lLnRleHRDb250ZW50PXRhc2suZ2V0TmFtZSgpO1xyXG4gICAgICAgIGNvbnN0IGRldGFpbHM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgICAgICBjb25zdCBkYXRlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgICAgIGNvbnN0IGRlbD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgICAgIGRldGFpbHMuc2V0QXR0cmlidXRlKFwiaWRcIixcImRldGFpbHNcIik7XHJcbiAgICAgICAgZGVsLnNldEF0dHJpYnV0ZShcImlkXCIsXCJkZWxldGVcIik7XHJcbiAgICAgICAgZGVsLnRleHRDb250ZW50PVwiZGVsZXRlXCI7XHJcbiAgICAgICAgZGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHVpLmRlbGV0ZVRhc2spO1xyXG4gICAgICAgIGRldGFpbHMudGV4dENvbnRlbnQ9XCJkZXRhaWxzXCI7XHJcbiAgICAgICAgZGV0YWlscy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIix1aS5kZXRhaWxzKTtcclxuICAgICAgICBkYXRlLnRleHRDb250ZW50PXRhc2suZ2V0RHVlRGF0ZSgpO1xyXG4gICAgICAgIGxpLmFwcGVuZENoaWxkKG5hbWUpO1xyXG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChkZXRhaWxzKTtcclxuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoZGF0ZSk7XHJcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKGRlbCk7XHJcbiAgICAgICAgbGkuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgICAgICBpZih0YXNrLmdldFByaW9yaXR5KCk9PT1cImxvd1wiKXtcclxuICAgICAgICAgICAgbGkuc3R5bGUuYm9yZGVyTGVmdENvbG9yPVwiZ3JlZW5cIlxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRhc2suZ2V0UHJpb3JpdHkoKT09PVwibWVkaXVtXCIpe1xyXG4gICAgICAgICAgICBsaS5zdHlsZS5ib3JkZXJMZWZ0Q29sb3I9XCJvcmFuZ2VcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgbGkuc3R5bGUuYm9yZGVyTGVmdENvbG9yPVwicmVkXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsaTtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIHN0YXRpYyBzZWxlY3RQcm9qZWN0KGUpe1xyXG4gICAgICAgIGNvbnN0IHVsPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFza2xpc3RcIik7XHJcbiAgICAgICAgdWwudGV4dENvbnRlbnQ9XCJcIjtcclxuICAgICAgICBjb25zdCBvbGQ9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXN0YXR1cz0nYWN0aXZlJ11cIik7XHJcbiAgICAgICAgb2xkLnNldEF0dHJpYnV0ZShcImRhdGEtc3RhdHVzXCIsXCJpbmFjdGl2ZVwiKTtcclxuICAgICAgICBlLnRhcmdldC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXN0YXR1c1wiLFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIHVpLmxvYWRUYXNrcygpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGNsb3NlTW9kYWxzKGUpe1xyXG4gICAgICAgIGlmKGUua2V5PT09XCJFc2NhcGVcIil7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZG1vZGFsXCIpIT09bnVsbCl7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZG1vZGFsXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRldGFpbHMtbW9kYWxcIikhPT1udWxsKVxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZXRhaWxzLW1vZGFsXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRlbnRcIikuc3R5bGUuZmlsdGVyPVwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc3RhdGljIGxvYWRQcm9qZWN0Rm9ybSgpe1xyXG4gICAgICAgIGlmKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkbW9kYWxcIikuZmlyc3RDaGlsZC5uZXh0U2libGluZy5pZD09PVwicHJvamVjdC1mb3JtXCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZG1vZGFsXCIpLmZpcnN0Q2hpbGQubmV4dFNpYmxpbmcucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkbW9kYWxcIikuYXBwZW5kQ2hpbGQodWkucHJvamVjdEZvcm0oKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgc3RhdGljIGxvYWRUb0RvRm9ybSgpe1xyXG4gICAgICAgIGlmKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkbW9kYWxcIikuZmlyc3RDaGlsZC5uZXh0U2libGluZy5pZD09PVwidG9kby1mb3JtXCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZG1vZGFsXCIpLmZpcnN0Q2hpbGQubmV4dFNpYmxpbmcucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkbW9kYWxcIikuYXBwZW5kQ2hpbGQodWkudG9Eb0Zvcm0oKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgc3RhdGljIGRlbGV0ZVByb2plY3QoZSl7XHJcbiAgICAgICAgY29uc3QgYWN0aXZlPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1zdGF0dXM9J2FjdGl2ZSddXCIpO1xyXG4gICAgICAgIGlmKGFjdGl2ZS50ZXh0Q29udGVudD09PVwibWFpblwiKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qbGlzdFwiKS5maXJzdEVsZW1lbnRDaGlsZC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXN0YXR1c1wiLFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIHN0b3JhZ2UuZGVsZXRlUHJvamVjdChhY3RpdmUudGV4dENvbnRlbnQpO1xyXG4gICAgICAgIHVpLmxvYWRQcm9qZWN0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamxpc3RcIikpO1xyXG4gICAgICAgIHVpLmxvYWRUYXNrcygpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgc3RhdGljIGRlbGV0ZVRhc2soZSl7XHJcbiAgICAgICAgY29uc3QgdGFza05hbWU9ZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmZpcnN0Q2hpbGQudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc3RvcmFnZS5kZWxldGVUYXNrKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1zdGF0dXM9J2FjdGl2ZSddXCIpLnRleHRDb250ZW50LHRhc2tOYW1lKTtcclxuICAgICAgICB1aS5sb2FkVGFza3MoKTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBkZXRhaWxzKGUpe1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IHByb2o9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXN0YXR1cz0nYWN0aXZlJ11cIik7XHJcbiAgICAgICAgY29uc3QgcHJvamo9c3RvcmFnZS5nZXRUb2RvTGlzdCgpLmdldFByb2plY3QocHJvai50ZXh0Q29udGVudCk7XHJcbiAgICAgICAgY29uc3QgdGFzaz1wcm9qai5nZXRUYXNrKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5maXJzdENoaWxkLnRleHRDb250ZW50KTtcclxuICAgICAgICBjb25zdCB3cmFwcGVyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgY29uc3QgbmFtZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgICAgICBuYW1lLnRleHRDb250ZW50PWAke3Rhc2suZ2V0TmFtZSgpfWBcclxuICAgICAgICBuYW1lLmlkPVwiZGV0YWlscy10aXRsZVwiO1xyXG4gICAgICAgIGNvbnN0IHByb2puYW1lPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgICAgIHByb2puYW1lLnRleHRDb250ZW50PWBQcm9qZWN0OiR7ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLXN0YXR1cz0nYWN0aXZlJ11cIikudGV4dENvbnRlbnR9YFxyXG4gICAgICAgIGNvbnN0IGRhdGVlbGVtZW50PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgICAgIGRhdGVlbGVtZW50LnRleHRDb250ZW50PWBEdWVkYXRlOiR7dGFzay5nZXREdWVEYXRlKCl9YDtcclxuICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKG5hbWUpXHJcbiAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZChwcm9qbmFtZSlcclxuICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGRhdGVlbGVtZW50KTtcclxuICAgICAgICB3cmFwcGVyLnNldEF0dHJpYnV0ZShcImlkXCIsXCJkZXRhaWxzLW1vZGFsXCIpO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQod3JhcHBlcik7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50XCIpLnN0eWxlLmZpbHRlcj1cImJsdXIoOHB4KVwiO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB0YXNrIGZyb20gXCIuL3Rhc2tcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgcHJvamVjdHtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWUpe1xyXG4gICAgICAgIHRoaXMubmFtZT1uYW1lO1xyXG4gICAgICAgIHRoaXMudGFza3M9W107XHJcbiAgICB9XHJcbiAgICBnZXROYW1lKCl7cmV0dXJuIHRoaXMubmFtZX1cclxuICAgIHNldE5hbWUobil7dGhpcy5uYW1lPW47fVxyXG4gICAgZ2V0VGFza3MoKXtyZXR1cm4gdGhpcy50YXNrc31cclxuICAgIHNldFRhc2tzKHRhc2tzKXt0aGlzLnRhc2tzPXRhc2tzO31cclxuICAgIGFkZFRhc2sodGFzayl7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7aSE9dGhpcy50YXNrcy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgaWYodGFzay5nZXROYW1lKCk9PT10aGlzLnRhc2tzW2ldLmdldE5hbWUoKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGFza3MucHVzaCh0YXNrKTtcclxuICAgIH1cclxuICAgIGNvbnRhaW5zKHRhc2tOYW1lKXtcclxuICAgICAgICBmb3IobGV0IGk9MDtpIT10aGlzLnRhc2tzLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICBpZih0YXNrTmFtZT09PXRoaXMudGFza3NbaV0uZ2V0TmFtZSgpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGRlbGV0ZVRhc2sodGFza05hbWUpe1xyXG4gICAgICAgIGlmKCF0aGlzLmNvbnRhaW5zKHRhc2tOYW1lKSlcclxuICAgICAgICAgICAgcmV0dXJuIDtcclxuICAgICAgICB0aGlzLnRhc2tzPXRoaXMudGFza3MuZmlsdGVyKCh0KT0+IHQuZ2V0TmFtZSgpIT09dGFza05hbWUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgZ2V0VGFzayh0YXNrTmFtZSl7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDtpIT09dGhpcy50YXNrcy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgaWYodGhpcy50YXNrc1tpXS5nZXROYW1lKCk9PT10YXNrTmFtZSlcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRhc2tzW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB0b2RvTGlzdCBmcm9tIFwiLi90b2RvTGlzdFwiO1xyXG5pbXBvcnQgdGFzayBmcm9tIFwiLi90YXNrXCI7XHJcbmltcG9ydCBwcm9qZWN0IGZyb20gXCIuL3Byb2plY3RcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHN0b3JhZ2V7XHJcbiAgICBzdGF0aWMgc2F2ZVRvZG9MaXN0KGxpc3Qpe1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidG9kb2xpc3RcIixKU09OLnN0cmluZ2lmeShsaXN0KSk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZ2V0VG9kb0xpc3QoKXtcclxuICAgICAgICBjb25zdCBsaXN0PU9iamVjdC5hc3NpZ24obmV3IHRvZG9MaXN0KCksSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRvZG9saXN0XCIpKSkgO1xyXG4gICAgICAgIGxpc3Quc2V0UHJvamVjdHMoXHJcbiAgICAgICAgICAgIGxpc3QuZ2V0UHJvamVjdHMoKS5tYXAoKHByb2opPT4gT2JqZWN0LmFzc2lnbihuZXcgcHJvamVjdCgpLHByb2opKVxyXG4gICAgICAgIClcclxuICAgICAgICBsaXN0LmdldFByb2plY3RzKCkuZm9yRWFjaCgocHJvaik9PiBwcm9qLnNldFRhc2tzKFxyXG4gICAgICAgICAgICBwcm9qLmdldFRhc2tzKCkubWFwKCh0KT0+IE9iamVjdC5hc3NpZ24obmV3IHRhc2soKSx0KSlcclxuICAgICAgICApKVxyXG4gICAgICAgIHJldHVybiBsaXN0O1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGFkZFByb2plY3QocHJvail7XHJcbiAgICAgICAgY29uc3QgbGlzdD1zdG9yYWdlLmdldFRvZG9MaXN0KClcclxuICAgICAgICBsaXN0LmFkZFByb2plY3QocHJvaik7XHJcbiAgICAgICAgc3RvcmFnZS5zYXZlVG9kb0xpc3QobGlzdCk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZGVsZXRlUHJvamVjdChwcm9qTmFtZSl7XHJcbiAgICAgICAgY29uc3QgbGlzdD1zdG9yYWdlLmdldFRvZG9MaXN0KCk7XHJcbiAgICAgICAgbGlzdC5kZWxldGVQcm9qZWN0KHByb2pOYW1lKTtcclxuICAgICAgICBzdG9yYWdlLnNhdmVUb2RvTGlzdChsaXN0KTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBhZGRUYXNrKHByb2plY3ROYW1lLHRhc2spe1xyXG4gICAgICAgIGNvbnN0IGxpc3Q9c3RvcmFnZS5nZXRUb2RvTGlzdCgpO1xyXG4gICAgICAgIGxpc3QuZ2V0UHJvamVjdChwcm9qZWN0TmFtZSkuYWRkVGFzayh0YXNrKTtcclxuICAgICAgICBzdG9yYWdlLnNhdmVUb2RvTGlzdChsaXN0KTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBkZWxldGVUYXNrKHByb2plY3ROYW1lLHRhc2tOYW1lKXtcclxuICAgICAgICBjb25zdCBsaXN0PXN0b3JhZ2UuZ2V0VG9kb0xpc3QoKTtcclxuICAgICAgICBsaXN0LmdldFByb2plY3QocHJvamVjdE5hbWUpLmRlbGV0ZVRhc2sodGFza05hbWUpO1xyXG4gICAgICAgIHN0b3JhZ2Uuc2F2ZVRvZG9MaXN0KGxpc3QpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIHJlbmFtZVRhc2socHJvamVjdE5hbWUsdGFza05hbWUsbmV3TmFtZSl7XHJcbiAgICAgICAgY29uc3QgbGlzdD1zdG9yYWdlLmdldFRvZG9MaXN0KCk7XHJcbiAgICAgICAgbGlzdC5nZXRQcm9qZWN0KHByb2plY3ROYW1lKS5nZXRUYXNrKHRhc2tOYW1lKS5zZXROYW1lKG5ld05hbWUpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgdGFza3tcclxuICAgIGNvbnN0cnVjdG9yKG5hbWUsZHVlZGF0ZT1cIm5vIGRhdGVcIixkZXNjcmlwdGlvbj1cIlwiLHByaW9yaXR5PVwibG93XCIpe1xyXG4gICAgICAgIHRoaXMubmFtZT1uYW1lO1xyXG4gICAgICAgIHRoaXMuZHVlZGF0ZT1kdWVkYXRlO1xyXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb249ZGVzY3JpcHRpb247XHJcbiAgICAgICAgdGhpcy5wcmlvcml0eT1wcmlvcml0eTtcclxuICAgIH1cclxuICAgIGdldE5hbWUoKXtyZXR1cm4gdGhpcy5uYW1lfVxyXG4gICAgc2V0TmFtZShuYW1lKXt0aGlzLm5hbWU9bmFtZX1cclxuICAgIGdldER1ZURhdGUoKXtyZXR1cm4gdGhpcy5kdWVkYXRlfVxyXG4gICAgc2V0RHVlRGF0ZShkYXRlKXt0aGlzLmR1ZWRhdGU9ZGF0ZX1cclxuICAgIHNldERlc2NyaXB0aW9uKGRlc2Mpe3RoaXMuZGVzY3JpcHRpb249ZGVzY31cclxuICAgIGdldERlc2NyaXB0aW9uKCl7cmV0dXJuIHRoaXMuZGVzY3JpcHRpb259XHJcbiAgICBzZXRQcmlvcml0eShwcil7dGhpcy5wcmlvcml0eT10aGlzLnByaW9yaXR5fVxyXG4gICAgZ2V0UHJpb3JpdHkoKXtyZXR1cm4gdGhpcy5wcmlvcml0eX1cclxufSIsImltcG9ydCBwcm9qZWN0IGZyb20gXCIuL3Byb2plY3RcIjtcclxuaW1wb3J0IHRhc2sgZnJvbSBcIi4vdGFza1wiO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB0b2RvTGlzdHtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5wcm9qZWN0cz1bXTtcclxuICAgICAgICBsZXQgcCA9bmV3IHByb2plY3QoXCJIb21lXCIpO1xyXG4gICAgICAgIHAuYWRkVGFzayhuZXcgdGFzayhcImhleVwiLFwiMjMtMjMtMjAwNFwiLFwiZGRkZFwiLFwibWVkaXVtXCIpKTtcclxuICAgICAgICB0aGlzLnByb2plY3RzLnB1c2gocCk7XHJcblxyXG4gICAgICAgIHRoaXMucHJvamVjdHMucHVzaChuZXcgcHJvamVjdChcIkd5bVwiKSk7XHJcbiAgICAgICAgdGhpcy5wcm9qZWN0cy5wdXNoKG5ldyBwcm9qZWN0KFwidW5pXCIpKTtcclxuICAgIH1cclxuICAgIHNldFByb2plY3RzKHByb2plY3RzKXt0aGlzLnByb2plY3RzPXByb2plY3RzfVxyXG4gICAgZ2V0UHJvamVjdHMoKXtyZXR1cm4gdGhpcy5wcm9qZWN0c31cclxuICAgIGdldFByb2plY3QocHJvamVjdE5hbWUpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb2plY3RzLmZpbmQoKHByKT0+IHByLmdldE5hbWUoKT09PXByb2plY3ROYW1lKTtcclxuICAgIH1cclxuICAgIGNvbnRhaW5zKHByb2plY3ROYW1lKXtcclxuICAgICAgICBmb3IobGV0IGkgPTA7aSE9dGhpcy5wcm9qZWN0cy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgaWYodGhpcy5wcm9qZWN0c1tpXS5nZXROYW1lKCk9PT1wcm9qZWN0TmFtZSlcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBhZGRQcm9qZWN0KHByb2ope1xyXG4gICAgICAgIGlmKHRoaXMuY29udGFpbnMocHJvai5nZXROYW1lKCkpKVxyXG4gICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgIHRoaXMucHJvamVjdHMucHVzaChwcm9qKTtcclxuICAgIH1cclxuICAgIGRlbGV0ZVByb2plY3QocHJvamVjdE5hbWUpe1xyXG4gICAgICAgIGlmKCF0aGlzLmNvbnRhaW5zKHByb2plY3ROYW1lKSlcclxuICAgICAgICAgICAgcmV0dXJuIDtcclxuICAgICAgICB0aGlzLnByb2plY3RzPXRoaXMucHJvamVjdHMuZmlsdGVyKChwKT0+IHAuZ2V0TmFtZSgpIT09cHJvamVjdE5hbWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB1aSBmcm9tIFwiLi9pbnRlcmZhY2VcIjtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsdWkubG9hZCk7XHJcblxyXG5cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9