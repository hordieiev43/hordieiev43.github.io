function checkCheckBox(value) {
    let counter = 0;
    for (let i = 1; i <= value; i++) {
        const checkbox = document.getElementById(i.toString());
        if (!checkbox.checked) counter++;
    }
    return counter;
}

function checkTodo() {
    const items = document.querySelectorAll('.list-group-item');

    items.forEach((item, index) => {
        const checkbox = document.getElementById((index + 1).toString());

        checkbox.addEventListener("change", () => {
            updateCounter(items.length);
            const todos = setData(items.length);
            render(todos);
        });
    });
}

function setItemCountElement(value) {
    document.getElementById('item-count').textContent = value;
}

function setUncheckedCountElement(value) {
    document.getElementById('unchecked-count').textContent = checkCheckBox(value);
}

function updateCounter(num) {
    setItemCountElement(num);
    setUncheckedCountElement(num);
}

function setData(value) {
    const data = new Set();

    for (let i = 1; i <= value; i++) {
        const checkbox = document.getElementById(i.toString());
        const spans = document.getElementsByTagName("span");

        const todo = new Map([
            ['ischeck', checkbox.checked],
            ['text', spans[i + 3].textContent]
        ]);

        data.add(todo);
    }

    return data;
}

const list = document.getElementById('todo-list');

function render(todos) {
    let content = '';
    let counter = 1;

    todos.forEach(todo => {
        const isChecked = todo.get('ischeck');
        const text = todo.get('text');

        content += `<li class="list-group-item">
      <input type="checkbox" class="form-check-input me-2" id="${counter}" ${isChecked ? 'checked' : ''} />
      <label for="${counter}"><span class="${isChecked ? 'text-success text-decoration-line-through' : ''}">${text}</span></label>
      <button class="btn btn-danger btn-sm float-end" onClick="deleteTodo(${counter})">delete</button>
    </li>`;

        counter++;
    });

    list.innerHTML = content;
    checkTodo();
    updateCounter(todos.size);
}

function newTodo() {
    const todoName = prompt("Назва завдання: ");

    if (todoName) {
        const items = document.querySelectorAll('.list-group-item');
        const todos = setData(items.length);

        const newTodo = new Map([
            ['ischeck', false],
            ['text', todoName]
        ]);

        todos.add(newTodo);
        render(todos);
    } else {
        alert("Ви не введено!");
    }
}

function deleteTodo(num) {
    const items = document.querySelectorAll('.list-group-item');
    const todos = setData(items.length);

    const updatedTodos = new Set();
    let counter = 1;

    todos.forEach(todo => {
        if (counter !== num) updatedTodos.add(todo);
        counter++;
    });

    render(updatedTodos);
}