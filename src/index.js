import Todo from "./todo.js";
import ProjectManager from "./projectmanager.js";
import './styles.css';
import { format, formatDistanceToNow, parseISO, isValid } from "date-fns";

function init() {
    const manager = new ProjectManager();

    const projectList = document.querySelector("#project-list");
    const todoList = document.querySelector("#todo-list");
    const activeTitle = document.querySelector("#active-project-title");
    const newProjectForm = document.querySelector("#new-project-form");
    const projectInput = document.querySelector("#project-input");
    const newTodoForm = document.querySelector("#new-todo-form");

    function renderSidebar() {
        projectList.innerHTML = "";

        manager.projects.forEach((project) => {
            const li = document.createElement("li");
            const btn = document.createElement("button");

            btn.textContent = project.name;
            if (project.id === manager.activeProjectId) {
                btn.classList.add("active");
            }

            btn.addEventListener("click", () => {
                manager.switchActiveProject(project.id);
                render();
            });

            li.appendChild(btn);
            projectList.appendChild(li);
        });
    }

    function renderTodos() {
        const currentProject = manager.getActiveProject();
        activeTitle.textContent = currentProject.name;
        todoList.innerHTML = "";

        if (currentProject.todos.length === 0) {
            const emptyMsg = document.createElement("p");
            emptyMsg.textContent = "No tasks yet.";
            todoList.appendChild(emptyMsg);
            return;
        }

        currentProject.todos.forEach((todo) => {
            const card = document.createElement("div");
            card.classList.add("todo-card");
            if (todo.isChecked) card.classList.add("completed");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = todo.isChecked;
            checkbox.addEventListener("change", () => {
                todo.toggleCheck();
                renderTodos();
            });

            const titleSpan = document.createElement("span");
            titleSpan.textContent = todo.title;

            const dueSpan = document.createElement("span");
            dueSpan.classList.add("due-date");
            dueSpan.textContent = displayDate(todo.dueDate);

            const prioritySpan = document.createElement("span");
            prioritySpan.textContent = todo.priority; 

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "delete";
            deleteBtn.addEventListener("click", () => {
                currentProject.deleteTodo(todo.id);
                renderTodos();
            });

            card.append(checkbox, titleSpan, dueSpan, prioritySpan, deleteBtn);
            todoList.appendChild(card);
        });
    }

    function render(){
        renderSidebar();
        renderTodos();
    }

    newProjectForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = projectInput.value.trim();
        if(!name) return;

        const newProject = manager.addProject(name);
        manager.switchActiveProject(newProject.id);
        projectInput.value = "";
        render();
    });

    newTodoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const titleInput = document.querySelector("#todo-title");
        const descriptionInput = document.querySelector("#todo-description");
        const dateInput = document.querySelector("#todo-date");
        const priorityInput = document.querySelector("#todo-priority");
        
        const title = titleInput.value.trim();
        if(!title) return;

        const activeProject = manager.getActiveProject();
        activeProject.addTodo(new Todo(title, descriptionInput.value, dateInput.value, priorityInput.value));

        newTodoForm.reset();
        renderTodos();
    });

    render();
}


function displayDate(rawDate) {
    if (!rawDate) return "no date";

    const parsed = parseISO(rawDate);
    if (!isValid(parsed)) return "Invalid date";

    return format(parsed, "MMM d, yyyy");
}

init();