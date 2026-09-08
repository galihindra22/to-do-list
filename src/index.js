

class Todo{
    constructor(title, description, dueDate, priority, note, isChecked = false){
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.note = note;
        this.isChecked = isChecked;
    }
    toggleCheck(){
        this.isChecked = !this.isChecked;
    } 
}

class TodoList{
    constructor(name = "Default"){
        this.name = name;
        this.todos = [];
    }

    addTodo(todo){
        this.todos.push(todo);
    }

    deleteTodo(id){
        this.todos = this.todos.filter((todo) => todo.id !== id);
    }

    getTodo(id){
        return this.todos.find((todo) => todo.id === id);
    }


}

const test = new TodoList("Career");

const task1 = new Todo("Portfolio", "Finish personal site with Tailwind", "2026-09-15", "High", "Add live demo links");

test.addTodo(task1);

function renderTodos(){
    const container = document.querySelector(".container");

    
    const title = document.createElement("h2");
    const description = document.createElement("p");
    const dueDate = document.createElement("p");
    const priority = document.createElement("p");
    const note = document.createElement("p");


}


