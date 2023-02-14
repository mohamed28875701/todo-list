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
        _storage__WEBPACK_IMPORTED_MODULE_0__["default"].getTodoList().getProject(active.textContent).getTasks().map((t)=>tasks.appendChild(ui.createTask(t)));
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
        this.tasks=this.tasks.filter((t)=> taskName!==t.getName());
    }
    getTask(taskName){
        return this.tasks.find((t)=>t.getName()===taskName);
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
        p.addTask(new _task__WEBPACK_IMPORTED_MODULE_1__["default"]("hey","23/23/2004","dddd","medium"));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QXFCLHdCQUF3QjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7VUNuQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ042QjtBQUM3QjtBQUNBLDZDQUE2Qyx1REFBTztBQUNwRDtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2ludGVyZmFjZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvcHJvamVjdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdGFzay5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdG9kb0xpc3QuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzdG9yYWdlIGZyb20gXCIuL3N0b3JhZ2VcIjtcclxuaW1wb3J0IHByb2plY3QgZnJvbSBcIi4vcHJvamVjdFwiO1xyXG5pbXBvcnQgdGFzayBmcm9tIFwiLi90YXNrXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB1aXtcclxuICAgIHN0YXRpYyBsb2FkKCl7XHJcbiAgICAgICAgdWkuaGVhZGVyKCk7IFxyXG4gICAgICAgIHVpLm5hdigpO1xyXG4gICAgICAgIHVpLnRhc2tzKCk7XHJcbiAgICAgICAgdWkubG9hZFRhc2tzKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBzdGF0aWMgaGVhZGVyKCl7XHJcbiAgICAgICAgY29uc3Qgd3JhcHBlcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIHdyYXBwZXIuc2V0QXR0cmlidXRlKFwiaWRcIixcImhlYWRlclwiKTtcclxuICAgICAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJoZWFkZXJcIik7XHJcbiAgICAgICAgY29uc3QgdGl0bGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xyXG4gICAgICAgIHRpdGxlLnRleHRDb250ZW50PVwiVG9kbyBMaXN0XCI7XHJcbiAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZCh0aXRsZSk7XHJcbiAgICAgICAgY29uc3QgY29udGVudD1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRlbnRcIik7XHJcbiAgICAgICAgY29udGVudC5hcHBlbmRDaGlsZCh3cmFwcGVyKTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBuYXYoKXtcclxuICAgICAgICBjb25zdCB3cmFwcGVyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgd3JhcHBlci5zZXRBdHRyaWJ1dGUoXCJpZFwiLFwibmF2XCIpO1xyXG4gICAgICAgIGNvbnN0IHByb2pMaXN0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcclxuICAgICAgICBwcm9qTGlzdC5zZXRBdHRyaWJ1dGUoXCJpZFwiLFwicHJvamxpc3RcIik7XHJcbiAgICAgICAgY29uc3QgYWRkPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgYWRkLnNldEF0dHJpYnV0ZShcImlkXCIsXCJhZGRcIik7XHJcbiAgICAgICAgYWRkLnRleHRDb250ZW50PVwiK1wiO1xyXG4gICAgICAgIGFkZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIix1aS5jcmVhdGVBZGRNb2RhbCk7XHJcbiAgICAgICAgdWkubG9hZFByb2plY3QocHJvakxpc3QpO1xyXG4gICAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQocHJvakxpc3QpO1xyXG4gICAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoYWRkKTtcclxuICAgICAgICBjb25zdCBjb250ZW50PWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGVudFwiKTtcclxuICAgICAgICBjb250ZW50LmFwcGVuZENoaWxkKHdyYXBwZXIpO1xyXG5cclxuICAgIH1cclxuICAgIHN0YXRpYyBsb2FkUHJvamVjdChsaXN0KXtcclxuICAgICAgICBsaXN0LnRleHRDb250ZW50PVwiXCI7XHJcbiAgICAgICAgc3RvcmFnZS5nZXRUb2RvTGlzdCgpLmdldFByb2plY3RzKCkubWFwKChwcm9qKT0+IGxpc3QuYXBwZW5kQ2hpbGQodWkuY3JlYXRlUHJvaihwcm9qLmdldE5hbWUoKSkpKTtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIHN0YXRpYyBjcmVhdGVQcm9qKHByb2pOYW1lKXtcclxuICAgICAgICBjb25zdCBsaT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcbiAgICAgICAgbGkuc2V0QXR0cmlidXRlKFwiZGF0YS1zdGF0dXNcIixcImluYWN0aXZlXCIpO1xyXG4gICAgICAgIGxpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHVpLnNlbGVjdFByb2plY3QpO1xyXG4gICAgICAgIGxpLnRleHRDb250ZW50PWAke3Byb2pOYW1lfWA7XHJcbiAgICAgICAgaWYobGkudGV4dENvbnRlbnQ9PT1cIkhvbWVcIil7XHJcbiAgICAgICAgICAgIGxpLnNldEF0dHJpYnV0ZShcImRhdGEtc3RhdHVzXCIsXCJhY3RpdmVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoXCJwcm9qXCIpO1xyXG4gICAgICAgIHJldHVybiBsaTtcclxuICAgIH1cclxuICAgIHN0YXRpYyB0YXNrcygpe1xyXG4gICAgICAgIGNvbnN0IHdyYXBwZXI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICB3cmFwcGVyLnNldEF0dHJpYnV0ZShcImlkXCIsXCJ0YXNrc1wiKTtcclxuICAgICAgICBjb25zdCB1bD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XHJcbiAgICAgICAgdWwuc2V0QXR0cmlidXRlKFwiaWRcIixcInRhc2tsaXN0XCIpO1xyXG4gICAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQodWwpO1xyXG4gICAgICAgIGNvbnN0IGNvbnRlbnQ9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50XCIpO1xyXG4gICAgICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQod3JhcHBlcik7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgbG9hZFRhc2tzKCl7XHJcbiAgICAgICAgY29uc3QgYWN0aXZlPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1zdGF0dXM9J2FjdGl2ZSddXCIpO1xyXG4gICAgICAgIGNvbnN0IHRhc2tzPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFza2xpc3RcIik7XHJcbiAgICAgICAgc3RvcmFnZS5nZXRUb2RvTGlzdCgpLmdldFByb2plY3QoYWN0aXZlLnRleHRDb250ZW50KS5nZXRUYXNrcygpLm1hcCgodCk9PnRhc2tzLmFwcGVuZENoaWxkKHVpLmNyZWF0ZVRhc2sodCkpKTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBjcmVhdGVBZGRNb2RhbCgpe1xyXG4gICAgICAgIGNvbnN0IHdyYXBwZXI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICB3cmFwcGVyLnNldEF0dHJpYnV0ZShcImlkXCIsXCJhZGRtb2RhbFwiKTtcclxuICAgICAgICBjb25zdCBzaWRlYmFyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgY29uc3QgcHJvamVjdD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgICAgIGNvbnN0IHRvZG89ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgICAgICBzaWRlYmFyLnNldEF0dHJpYnV0ZShcImlkXCIsXCJzaWRlXCIpO1xyXG4gICAgICAgIHByb2plY3Quc2V0QXR0cmlidXRlKFwiaWRcIixcImFkZHByb2pcIik7XHJcbiAgICAgICAgcHJvamVjdC50ZXh0Q29udGVudD1cIkFkZCBQcm9qZWN0XCI7XHJcbiAgICAgICAgdG9kby50ZXh0Q29udGVudD1cIkFkZCBUb0RvXCJcclxuICAgICAgICB0b2RvLnNldEF0dHJpYnV0ZShcImlkXCIsXCJhZGR0b2RvXCIpO1xyXG4gICAgICAgIHNpZGViYXIuYXBwZW5kQ2hpbGQocHJvamVjdCk7XHJcbiAgICAgICAgc2lkZWJhci5hcHBlbmRDaGlsZCh0b2RvKTtcclxuICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHNpZGViYXIpO1xyXG4gICAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQodWkucHJvamVjdEZvcm0oKSk7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50XCIpLnN0eWxlPVwidHJhbnNpdGlvbjphbGwgLjNzIGVhc2UtaW4tb3V0XCI7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50XCIpLnN0eWxlLmZpbHRlcj1cImJsdXIoOHB4KVwiXHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh3cmFwcGVyKTtcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIHN0YXRpYyBwcm9qZWN0Rm9ybSgpe1xyXG4gICAgICAgIGNvbnN0IHdyYXBwZXI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBjb25zdCBmb3JtPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpO1xyXG4gICAgICAgIGNvbnN0IG5hbWU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgICAgIGNvbnN0IHN1Yj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHN1Yi50ZXh0Q29udGVudD1cIlNhdmVcIjtcclxuICAgICAgICBzdWIuc2V0QXR0cmlidXRlKFwiaWRcIixcInN1YlwiKTtcclxuICAgICAgICBzdWIuc2V0QXR0cmlidXRlKFwidHlwZVwiLFwic3VibWl0XCIpO1xyXG4gICAgICAgIG5hbWUucGxhY2Vob2xkZXI9XCJwcm9qZWN0IG5hbWUgaS5lIGd5bVwiO1xyXG4gICAgICAgIHdyYXBwZXIuc2V0QXR0cmlidXRlKFwiaWRcIixcInByb2plY3QtZm9ybVwiKTtcclxuICAgICAgICBuYW1lLnNldEF0dHJpYnV0ZShcImlkXCIsXCJwcm9qZWN0LW5hbWUtaW5wdXRcIik7XHJcbiAgICAgICAgbmFtZS5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsXCJ0ZXh0XCIpO1xyXG4gICAgICAgIG5hbWUuc2V0QXR0cmlidXRlKFwibWlubGVuZ3RoXCIsXCIxXCIpO1xyXG4gICAgICAgIG5hbWUuc2V0QXR0cmlidXRlKFwibWF4bGVuZ3RoXCIsXCIxMFwiKTtcclxuICAgICAgICBuYW1lLm5hbWU9XCJwcm9qZWN0LW5hbWUtaW5wdXRcIjtcclxuICAgICAgICBuYW1lLnJlcXVpcmVkPXRydWU7XHJcbiAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChuYW1lKTtcclxuICAgICAgICBmb3JtLmFwcGVuZENoaWxkKHN1Yik7XHJcbiAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZChmb3JtKTtcclxuICAgICAgICBzdWIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsdWkuc2F2ZVByb2plY3QpO1xyXG4gICAgICAgIHJldHVybiB3cmFwcGVyO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIHNhdmVQcm9qZWN0KGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBjb25zdCBuYW1lPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdC1uYW1lLWlucHV0XCIpO1xyXG4gICAgICAgIHN0b3JhZ2UuYWRkUHJvamVjdChuZXcgcHJvamVjdChuYW1lLnZhbHVlKSk7XHJcbiAgICAgICAgY29uc3QgbT1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZG1vZGFsXCIpO1xyXG4gICAgICAgIG0ucmVtb3ZlKCk7XHJcbiAgICAgICAgY29uc3QgY29udGVudD1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRlbnRcIik7XHJcbiAgICAgICAgY29udGVudC5zdHlsZS5maWx0ZXI9XCJcIjtcclxuICAgICAgICB1aS5sb2FkUHJvamVjdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2psaXN0XCIpKTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBjcmVhdGVUYXNrKHRhc2spe1xyXG4gICAgICAgIGNvbnN0IGxpPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICAgICAgICBsaS5zZXRBdHRyaWJ1dGUoXCJpZFwiLFwidGFza1wiKTtcclxuICAgICAgICBjb25zdCBkaXY9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBkaXYuc2V0QXR0cmlidXRlKFwiaWRcIixcImRpdlwiKTtcclxuICAgICAgICBjb25zdCBuYW1lPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgICAgIG5hbWUudGV4dENvbnRlbnQ9dGFzay5nZXROYW1lKCk7XHJcbiAgICAgICAgY29uc3QgZGV0YWlscz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgICAgIGNvbnN0IGRhdGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICAgICAgY29uc3QgZGVsPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgZGV0YWlscy5zZXRBdHRyaWJ1dGUoXCJpZFwiLFwiZGV0YWlsc1wiKTtcclxuICAgICAgICBkZWwuc2V0QXR0cmlidXRlKFwiaWRcIixcImRlbGV0ZVwiKTtcclxuICAgICAgICBkZWwudGV4dENvbnRlbnQ9XCJkZWxldGVcIjtcclxuICAgICAgICBkZXRhaWxzLnRleHRDb250ZW50PVwiZGV0YWlsc1wiO1xyXG4gICAgICAgIGRhdGUudGV4dENvbnRlbnQ9dGFzay5nZXREdWVEYXRlKCk7XHJcbiAgICAgICAgbGkuYXBwZW5kQ2hpbGQobmFtZSk7XHJcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKGRldGFpbHMpO1xyXG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChkYXRlKTtcclxuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoZGVsKTtcclxuICAgICAgICBsaS5hcHBlbmRDaGlsZChkaXYpO1xyXG4gICAgICAgIGlmKHRhc2suZ2V0UHJpb3JpdHkoKT09PVwibG93XCIpe1xyXG4gICAgICAgICAgICBsaS5zdHlsZS5ib3JkZXJMZWZ0Q29sb3I9XCJncmVlblwiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGFzay5nZXRQcmlvcml0eSgpPT09XCJtZWRpdW1cIil7XHJcbiAgICAgICAgICAgIGxpLnN0eWxlLmJvcmRlckxlZnRDb2xvcj1cIm9yYW5nZVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBsaS5zdHlsZS5ib3JkZXJMZWZ0Q29sb3I9XCJyZWRcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgc3RhdGljIHNlbGVjdFByb2plY3QoZSl7XHJcbiAgICAgICAgY29uc3QgdWw9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0YXNrbGlzdFwiKTtcclxuICAgICAgICB1bC50ZXh0Q29udGVudD1cIlwiO1xyXG4gICAgICAgIGNvbnN0IG9sZD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtc3RhdHVzPSdhY3RpdmUnXVwiKTtcclxuICAgICAgICBvbGQuc2V0QXR0cmlidXRlKFwiZGF0YS1zdGF0dXNcIixcImluYWN0aXZlXCIpO1xyXG4gICAgICAgIGUudGFyZ2V0LnNldEF0dHJpYnV0ZShcImRhdGEtc3RhdHVzXCIsXCJhY3RpdmVcIik7XHJcbiAgICAgICAgdWkubG9hZFRhc2tzKCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgdGFzayBmcm9tIFwiLi90YXNrXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHByb2plY3R7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lKXtcclxuICAgICAgICB0aGlzLm5hbWU9bmFtZTtcclxuICAgICAgICB0aGlzLnRhc2tzPVtdO1xyXG4gICAgfVxyXG4gICAgZ2V0TmFtZSgpe3JldHVybiB0aGlzLm5hbWV9XHJcbiAgICBzZXROYW1lKG4pe3RoaXMubmFtZT1uO31cclxuICAgIGdldFRhc2tzKCl7cmV0dXJuIHRoaXMudGFza3N9XHJcbiAgICBzZXRUYXNrcyh0YXNrcyl7dGhpcy50YXNrcz10YXNrczt9XHJcbiAgICBhZGRUYXNrKHRhc2spe1xyXG4gICAgICAgIGZvcihsZXQgaT0wO2khPXRoaXMudGFza3MubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGlmKHRhc2suZ2V0TmFtZSgpPT09dGhpcy50YXNrc1tpXS5nZXROYW1lKCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRhc2tzLnB1c2godGFzayk7XHJcbiAgICB9XHJcbiAgICBjb250YWlucyh0YXNrTmFtZSl7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7aSE9dGhpcy50YXNrcy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgaWYodGFza05hbWU9PT10aGlzLnRhc2tzW2ldLmdldE5hbWUoKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBkZWxldGVUYXNrKHRhc2tOYW1lKXtcclxuICAgICAgICBpZighdGhpcy5jb250YWlucyh0YXNrTmFtZSkpXHJcbiAgICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICAgdGhpcy50YXNrcz10aGlzLnRhc2tzLmZpbHRlcigodCk9PiB0YXNrTmFtZSE9PXQuZ2V0TmFtZSgpKTtcclxuICAgIH1cclxuICAgIGdldFRhc2sodGFza05hbWUpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRhc2tzLmZpbmQoKHQpPT50LmdldE5hbWUoKT09PXRhc2tOYW1lKTtcclxuICAgIH1cclxufSIsImltcG9ydCB0b2RvTGlzdCBmcm9tIFwiLi90b2RvTGlzdFwiO1xyXG5pbXBvcnQgdGFzayBmcm9tIFwiLi90YXNrXCI7XHJcbmltcG9ydCBwcm9qZWN0IGZyb20gXCIuL3Byb2plY3RcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHN0b3JhZ2V7XHJcbiAgICBzdGF0aWMgc2F2ZVRvZG9MaXN0KGxpc3Qpe1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidG9kb2xpc3RcIixKU09OLnN0cmluZ2lmeShsaXN0KSk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZ2V0VG9kb0xpc3QoKXtcclxuICAgICAgICBjb25zdCBsaXN0PU9iamVjdC5hc3NpZ24obmV3IHRvZG9MaXN0KCksSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRvZG9saXN0XCIpKSkgO1xyXG4gICAgICAgIGxpc3Quc2V0UHJvamVjdHMoXHJcbiAgICAgICAgICAgIGxpc3QuZ2V0UHJvamVjdHMoKS5tYXAoKHByb2opPT4gT2JqZWN0LmFzc2lnbihuZXcgcHJvamVjdCgpLHByb2opKVxyXG4gICAgICAgIClcclxuICAgICAgICBsaXN0LmdldFByb2plY3RzKCkuZm9yRWFjaCgocHJvaik9PiBwcm9qLnNldFRhc2tzKFxyXG4gICAgICAgICAgICBwcm9qLmdldFRhc2tzKCkubWFwKCh0KT0+IE9iamVjdC5hc3NpZ24obmV3IHRhc2soKSx0KSlcclxuICAgICAgICApKVxyXG4gICAgICAgIHJldHVybiBsaXN0O1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGFkZFByb2plY3QocHJvail7XHJcbiAgICAgICAgY29uc3QgbGlzdD1zdG9yYWdlLmdldFRvZG9MaXN0KClcclxuICAgICAgICBsaXN0LmFkZFByb2plY3QocHJvaik7XHJcbiAgICAgICAgc3RvcmFnZS5zYXZlVG9kb0xpc3QobGlzdCk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZGVsZXRlUHJvamVjdChwcm9qTmFtZSl7XHJcbiAgICAgICAgY29uc3QgbGlzdD1zdG9yYWdlLmdldFRvZG9MaXN0KCk7XHJcbiAgICAgICAgbGlzdC5kZWxldGVQcm9qZWN0KHByb2pOYW1lKTtcclxuICAgICAgICBzdG9yYWdlLnNhdmVUb2RvTGlzdChsaXN0KTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBhZGRUYXNrKHByb2plY3ROYW1lLHRhc2spe1xyXG4gICAgICAgIGNvbnN0IGxpc3Q9c3RvcmFnZS5nZXRUb2RvTGlzdCgpO1xyXG4gICAgICAgIGxpc3QuZ2V0UHJvamVjdChwcm9qZWN0TmFtZSkuYWRkVGFzayh0YXNrKTtcclxuICAgICAgICBzdG9yYWdlLnNhdmVUb2RvTGlzdChsaXN0KTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBkZWxldGVUYXNrKHByb2plY3ROYW1lLHRhc2tOYW1lKXtcclxuICAgICAgICBjb25zdCBsaXN0PXN0b3JhZ2UuZ2V0VG9kb0xpc3QoKTtcclxuICAgICAgICBsaXN0LmdldFByb2plY3QocHJvamVjdE5hbWUpLmRlbGV0ZVRhc2sodGFza05hbWUpO1xyXG4gICAgICAgIHN0b3JhZ2Uuc2F2ZVRvZG9MaXN0KGxpc3QpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIHJlbmFtZVRhc2socHJvamVjdE5hbWUsdGFza05hbWUsbmV3TmFtZSl7XHJcbiAgICAgICAgY29uc3QgbGlzdD1zdG9yYWdlLmdldFRvZG9MaXN0KCk7XHJcbiAgICAgICAgbGlzdC5nZXRQcm9qZWN0KHByb2plY3ROYW1lKS5nZXRUYXNrKHRhc2tOYW1lKS5zZXROYW1lKG5ld05hbWUpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgdGFza3tcclxuICAgIGNvbnN0cnVjdG9yKG5hbWUsZHVlZGF0ZT1cIm5vIGRhdGVcIixkZXNjcmlwdGlvbj1cIlwiLHByaW9yaXR5PVwibG93XCIpe1xyXG4gICAgICAgIHRoaXMubmFtZT1uYW1lO1xyXG4gICAgICAgIHRoaXMuZHVlZGF0ZT1kdWVkYXRlO1xyXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb249ZGVzY3JpcHRpb247XHJcbiAgICAgICAgdGhpcy5wcmlvcml0eT1wcmlvcml0eTtcclxuICAgIH1cclxuICAgIGdldE5hbWUoKXtyZXR1cm4gdGhpcy5uYW1lfVxyXG4gICAgc2V0TmFtZShuYW1lKXt0aGlzLm5hbWU9bmFtZX1cclxuICAgIGdldER1ZURhdGUoKXtyZXR1cm4gdGhpcy5kdWVkYXRlfVxyXG4gICAgc2V0RHVlRGF0ZShkYXRlKXt0aGlzLmR1ZWRhdGU9ZGF0ZX1cclxuICAgIHNldERlc2NyaXB0aW9uKGRlc2Mpe3RoaXMuZGVzY3JpcHRpb249ZGVzY31cclxuICAgIGdldERlc2NyaXB0aW9uKCl7cmV0dXJuIHRoaXMuZGVzY3JpcHRpb259XHJcbiAgICBzZXRQcmlvcml0eShwcil7dGhpcy5wcmlvcml0eT10aGlzLnByaW9yaXR5fVxyXG4gICAgZ2V0UHJpb3JpdHkoKXtyZXR1cm4gdGhpcy5wcmlvcml0eX1cclxufSIsImltcG9ydCBwcm9qZWN0IGZyb20gXCIuL3Byb2plY3RcIjtcclxuaW1wb3J0IHRhc2sgZnJvbSBcIi4vdGFza1wiO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB0b2RvTGlzdHtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgdGhpcy5wcm9qZWN0cz1bXTtcclxuICAgICAgICBsZXQgcCA9bmV3IHByb2plY3QoXCJIb21lXCIpO1xyXG4gICAgICAgIHAuYWRkVGFzayhuZXcgdGFzayhcImhleVwiLFwiMjMvMjMvMjAwNFwiLFwiZGRkZFwiLFwibWVkaXVtXCIpKTtcclxuICAgICAgICB0aGlzLnByb2plY3RzLnB1c2gocCk7XHJcblxyXG4gICAgICAgIHRoaXMucHJvamVjdHMucHVzaChuZXcgcHJvamVjdChcIkd5bVwiKSk7XHJcbiAgICAgICAgdGhpcy5wcm9qZWN0cy5wdXNoKG5ldyBwcm9qZWN0KFwidW5pXCIpKTtcclxuICAgIH1cclxuICAgIHNldFByb2plY3RzKHByb2plY3RzKXt0aGlzLnByb2plY3RzPXByb2plY3RzfVxyXG4gICAgZ2V0UHJvamVjdHMoKXtyZXR1cm4gdGhpcy5wcm9qZWN0c31cclxuICAgIGdldFByb2plY3QocHJvamVjdE5hbWUpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb2plY3RzLmZpbmQoKHByKT0+IHByLmdldE5hbWUoKT09PXByb2plY3ROYW1lKTtcclxuICAgIH1cclxuICAgIGNvbnRhaW5zKHByb2plY3ROYW1lKXtcclxuICAgICAgICBmb3IobGV0IGkgPTA7aSE9dGhpcy5wcm9qZWN0cy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgaWYodGhpcy5wcm9qZWN0c1tpXS5nZXROYW1lKCk9PT1wcm9qZWN0TmFtZSlcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBhZGRQcm9qZWN0KHByb2ope1xyXG4gICAgICAgIGlmKHRoaXMuY29udGFpbnMocHJvai5nZXROYW1lKCkpKVxyXG4gICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgIHRoaXMucHJvamVjdHMucHVzaChwcm9qKTtcclxuICAgIH1cclxuICAgIGRlbGV0ZVByb2plY3QocHJvamVjdE5hbWUpe1xyXG4gICAgICAgIGlmKCF0aGlzLmNvbnRhaW5zKHByb2plY3ROYW1lKSlcclxuICAgICAgICAgICAgcmV0dXJuIDtcclxuICAgICAgICB0aGlzLnByb2plY3RzPXRoaXMucHJvamVjdHMuZmlsdGVyKChwKT0+IHAuZ2V0TmFtZSgpIT09cHJvamVjdE5hbWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB1aSBmcm9tIFwiLi9pbnRlcmZhY2VcIjtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsdWkubG9hZCk7XHJcblxyXG5cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9