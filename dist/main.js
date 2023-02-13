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


class ui{
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
            list.getProjects().map((proj)=> Object.assign(new _project__WEBPACK_IMPORTED_MODULE_2__["default"](),_project__WEBPACK_IMPORTED_MODULE_2__["default"]))
        )
        list.getProjects().forEach((proj)=> proj.setTasks(
            proj.getTasks().map((t)=> Object.assign(new _task__WEBPACK_IMPORTED_MODULE_1__["default"](),t))
        ))
        return list;
    }
    static addProject(proj){
        const list=Storage.getTodoList()
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
    setPriority(pr){this.priority=this.priority}
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
        this.projects.push(new _project__WEBPACK_IMPORTED_MODULE_0__["default"]("Home"));
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

_interface__WEBPACK_IMPORTED_MODULE_0__["default"].loadPage();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBZ0M7QUFDaEM7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNyQjBCO0FBQ1g7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZCxlQUFlO0FBQ2YsZUFBZTtBQUNmLG9CQUFvQjtBQUNwQjtBQUNBLG9CQUFvQixxQkFBcUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHFCQUFxQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2hDa0M7QUFDUjtBQUNNO0FBQ2hDO0FBQ2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxpREFBUTtBQUM3QztBQUNBLDhEQUE4RCxnREFBTyxHQUFHLGdEQUFPO0FBQy9FO0FBQ0E7QUFDQSx3REFBd0QsNkNBQUk7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDMUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkLGtCQUFrQjtBQUNsQixpQkFBaUI7QUFDakIscUJBQXFCO0FBQ3JCLHlCQUF5QjtBQUN6QixvQkFBb0I7QUFDcEI7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiZ0M7QUFDTjtBQUNYO0FBQ2Y7QUFDQTtBQUNBLCtCQUErQixnREFBTztBQUN0QywrQkFBK0IsZ0RBQU87QUFDdEMsK0JBQStCLGdEQUFPO0FBQ3RDO0FBQ0EsMEJBQTBCO0FBQzFCLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQix3QkFBd0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O1VDaENBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNONkI7QUFDN0IsMkRBQVciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW50ZXJmYWNlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9wcm9qZWN0LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdG9yYWdlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90YXNrLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90b2RvTGlzdC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0b3JhZ2UgZnJvbSBcIi4vc3RvcmFnZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgdWl7XHJcbiAgICBzdGF0aWMgc2l0ZSgpe1xyXG4gICAgICAgIHVpLmhlYWRlcigpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGhlYWRlcigpe1xyXG4gICAgICAgIGNvbnN0IHdyYXBwZXI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICB3cmFwcGVyLnNldEF0dHJpYnV0ZShcImlkXCIsXCJoZWFkZXJcIik7XHJcbiAgICAgICAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKFwiaGVhZGVyXCIpO1xyXG4gICAgICAgIGNvbnN0IHRpdGxlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICAgICAgICB0aXRsZS50ZXh0Q29udGVudD1cIlRvZG8gTGlzdFwiO1xyXG4gICAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xyXG4gICAgICAgIGNvbnN0IGNvbnRlbnQ9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50XCIpO1xyXG4gICAgICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQod3JhcHBlcik7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgbmF2KCl7XHJcbiAgICAgICAgY29uc3Qgd3JhcHBlcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGNvbnN0IHByb2pMaXN0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgdGFzayBmcm9tIFwiLi90YXNrXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHByb2plY3R7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lKXtcclxuICAgICAgICB0aGlzLm5hbWU9bmFtZTtcclxuICAgICAgICB0aGlzLnRhc2tzPVtdO1xyXG4gICAgfVxyXG4gICAgZ2V0TmFtZSgpe3JldHVybiB0aGlzLm5hbWV9XHJcbiAgICBzZXROYW1lKG4pe3RoaXMubmFtZT1uO31cclxuICAgIGdldFRhc2tzKCl7cmV0dXJuIHRoaXMudGFza3N9XHJcbiAgICBzZXRUYXNrcyh0YXNrcyl7dGhpcy50YXNrcz10YXNrczt9XHJcbiAgICBhZGRUYXNrKHRhc2spe1xyXG4gICAgICAgIGZvcihsZXQgaT0wO2khPXRoaXMudGFza3MubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgIGlmKHRhc2suZ2V0TmFtZSgpPT09dGhpcy50YXNrc1tpXS5nZXROYW1lKCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRhc2tzLnB1c2godGFzayk7XHJcbiAgICB9XHJcbiAgICBjb250YWlucyh0YXNrTmFtZSl7XHJcbiAgICAgICAgZm9yKGxldCBpPTA7aSE9dGhpcy50YXNrcy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgaWYodGFza05hbWU9PT10aGlzLnRhc2tzW2ldLmdldE5hbWUoKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBkZWxldGVUYXNrKHRhc2tOYW1lKXtcclxuICAgICAgICBpZighdGhpcy5jb250YWlucyh0YXNrTmFtZSkpXHJcbiAgICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICAgdGhpcy50YXNrcz10aGlzLnRhc2tzLmZpbHRlcigodCk9PiB0YXNrTmFtZSE9PXQuZ2V0TmFtZSgpKTtcclxuICAgIH1cclxuICAgIGdldFRhc2sodGFza05hbWUpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRhc2tzLmZpbmQoKHQpPT50LmdldE5hbWUoKT09PXRhc2tOYW1lKTtcclxuICAgIH1cclxufSIsImltcG9ydCB0b2RvTGlzdCBmcm9tIFwiLi90b2RvTGlzdFwiO1xyXG5pbXBvcnQgdGFzayBmcm9tIFwiLi90YXNrXCI7XHJcbmltcG9ydCBwcm9qZWN0IGZyb20gXCIuL3Byb2plY3RcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHN0b3JhZ2V7XHJcbiAgICBzdGF0aWMgc2F2ZVRvZG9MaXN0KGxpc3Qpe1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidG9kb2xpc3RcIixKU09OLnN0cmluZ2lmeShsaXN0KSk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZ2V0VG9kb0xpc3QoKXtcclxuICAgICAgICBjb25zdCBsaXN0PU9iamVjdC5hc3NpZ24obmV3IHRvZG9MaXN0KCksSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRvZG9saXN0XCIpKSkgO1xyXG4gICAgICAgIGxpc3Quc2V0UHJvamVjdHMoXHJcbiAgICAgICAgICAgIGxpc3QuZ2V0UHJvamVjdHMoKS5tYXAoKHByb2opPT4gT2JqZWN0LmFzc2lnbihuZXcgcHJvamVjdCgpLHByb2plY3QpKVxyXG4gICAgICAgIClcclxuICAgICAgICBsaXN0LmdldFByb2plY3RzKCkuZm9yRWFjaCgocHJvaik9PiBwcm9qLnNldFRhc2tzKFxyXG4gICAgICAgICAgICBwcm9qLmdldFRhc2tzKCkubWFwKCh0KT0+IE9iamVjdC5hc3NpZ24obmV3IHRhc2soKSx0KSlcclxuICAgICAgICApKVxyXG4gICAgICAgIHJldHVybiBsaXN0O1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGFkZFByb2plY3QocHJvail7XHJcbiAgICAgICAgY29uc3QgbGlzdD1TdG9yYWdlLmdldFRvZG9MaXN0KClcclxuICAgICAgICBsaXN0LmFkZFByb2plY3QocHJvaik7XHJcbiAgICAgICAgc3RvcmFnZS5zYXZlVG9kb0xpc3QobGlzdCk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZGVsZXRlUHJvamVjdChwcm9qTmFtZSl7XHJcbiAgICAgICAgY29uc3QgbGlzdD1zdG9yYWdlLmdldFRvZG9MaXN0KCk7XHJcbiAgICAgICAgbGlzdC5kZWxldGVQcm9qZWN0KHByb2pOYW1lKTtcclxuICAgICAgICBzdG9yYWdlLnNhdmVUb2RvTGlzdChsaXN0KTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBhZGRUYXNrKHByb2plY3ROYW1lLHRhc2spe1xyXG4gICAgICAgIGNvbnN0IGxpc3Q9c3RvcmFnZS5nZXRUb2RvTGlzdCgpO1xyXG4gICAgICAgIGxpc3QuZ2V0UHJvamVjdChwcm9qZWN0TmFtZSkuYWRkVGFzayh0YXNrKTtcclxuICAgICAgICBzdG9yYWdlLnNhdmVUb2RvTGlzdChsaXN0KTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBkZWxldGVUYXNrKHByb2plY3ROYW1lLHRhc2tOYW1lKXtcclxuICAgICAgICBjb25zdCBsaXN0PXN0b3JhZ2UuZ2V0VG9kb0xpc3QoKTtcclxuICAgICAgICBsaXN0LmdldFByb2plY3QocHJvamVjdE5hbWUpLmRlbGV0ZVRhc2sodGFza05hbWUpO1xyXG4gICAgICAgIHN0b3JhZ2Uuc2F2ZVRvZG9MaXN0KGxpc3QpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIHJlbmFtZVRhc2socHJvamVjdE5hbWUsdGFza05hbWUsbmV3TmFtZSl7XHJcbiAgICAgICAgY29uc3QgbGlzdD1zdG9yYWdlLmdldFRvZG9MaXN0KCk7XHJcbiAgICAgICAgbGlzdC5nZXRQcm9qZWN0KHByb2plY3ROYW1lKS5nZXRUYXNrKHRhc2tOYW1lKS5zZXROYW1lKG5ld05hbWUpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgdGFza3tcclxuICAgIGNvbnN0cnVjdG9yKG5hbWUsZHVlZGF0ZT1cIm5vIGRhdGVcIixkZXNjcmlwdGlvbj1cIlwiLHByaW9yaXR5PVwibG93XCIpe1xyXG4gICAgICAgIHRoaXMubmFtZT1uYW1lO1xyXG4gICAgICAgIHRoaXMuZHVlZGF0ZT1kdWVkYXRlO1xyXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb249ZGVzY3JpcHRpb247XHJcbiAgICAgICAgdGhpcy5wcmlvcml0eT1wcmlvcml0eTtcclxuICAgIH1cclxuICAgIGdldE5hbWUoKXtyZXR1cm4gdGhpcy5uYW1lfVxyXG4gICAgc2V0TmFtZShuYW1lKXt0aGlzLm5hbWU9bmFtZX1cclxuICAgIGdldER1ZURhdGUoKXtyZXR1cm4gdGhpcy5kdWVkYXRlfVxyXG4gICAgc2V0RHVlRGF0ZShkYXRlKXt0aGlzLmR1ZWRhdGU9ZGF0ZX1cclxuICAgIHNldERlc2NyaXB0aW9uKGRlc2Mpe3RoaXMuZGVzY3JpcHRpb249ZGVzY31cclxuICAgIHNldFByaW9yaXR5KHByKXt0aGlzLnByaW9yaXR5PXRoaXMucHJpb3JpdHl9XHJcbn0iLCJpbXBvcnQgcHJvamVjdCBmcm9tIFwiLi9wcm9qZWN0XCI7XHJcbmltcG9ydCB0YXNrIGZyb20gXCIuL3Rhc2tcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgdG9kb0xpc3R7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMucHJvamVjdHM9W107XHJcbiAgICAgICAgdGhpcy5wcm9qZWN0cy5wdXNoKG5ldyBwcm9qZWN0KFwiSG9tZVwiKSk7XHJcbiAgICAgICAgdGhpcy5wcm9qZWN0cy5wdXNoKG5ldyBwcm9qZWN0KFwiR3ltXCIpKTtcclxuICAgICAgICB0aGlzLnByb2plY3RzLnB1c2gobmV3IHByb2plY3QoXCJ1bmlcIikpO1xyXG4gICAgfVxyXG4gICAgc2V0UHJvamVjdHMocHJvamVjdHMpe3RoaXMucHJvamVjdHM9cHJvamVjdHN9XHJcbiAgICBnZXRQcm9qZWN0cygpe3JldHVybiB0aGlzLnByb2plY3RzfVxyXG4gICAgZ2V0UHJvamVjdChwcm9qZWN0TmFtZSl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvamVjdHMuZmluZCgocHIpPT4gcHIuZ2V0TmFtZSgpPT09cHJvamVjdE5hbWUpO1xyXG4gICAgfVxyXG4gICAgY29udGFpbnMocHJvamVjdE5hbWUpe1xyXG4gICAgICAgIGZvcihsZXQgaSA9MDtpIT10aGlzLnByb2plY3RzLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICBpZih0aGlzLnByb2plY3RzW2ldLmdldE5hbWUoKT09PXByb2plY3ROYW1lKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGFkZFByb2plY3QocHJvail7XHJcbiAgICAgICAgaWYodGhpcy5jb250YWlucyhwcm9qLmdldE5hbWUoKSkpXHJcbiAgICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICAgdGhpcy5wcm9qZWN0cy5wdXNoKHByb2opO1xyXG4gICAgfVxyXG4gICAgZGVsZXRlUHJvamVjdChwcm9qZWN0TmFtZSl7XHJcbiAgICAgICAgaWYoIXRoaXMuY29udGFpbnMocHJvamVjdE5hbWUpKVxyXG4gICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgIHRoaXMucHJvamVjdHM9dGhpcy5wcm9qZWN0cy5maWx0ZXIoKHApPT4gcC5nZXROYW1lKCkhPT1wcm9qZWN0TmFtZSk7XHJcbiAgICB9XHJcbiAgICBcclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHVpIGZyb20gXCIuL2ludGVyZmFjZVwiO1xyXG51aS5sb2FkUGFnZSgpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=