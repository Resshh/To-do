
function loginSuccess() {

    window.location.href = "todo.html";

}

function loginForm(callback) {

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "admin" && password === "12345") {
        callback();
    }
    else {
        alert("Invalid Username or Password");
    }

}

function logout() {
    window.location.href = "index.html";
}

if (window.location.pathname.includes("todo.html")) {
    loadTodos();
}

function loadTodos() {

    fetch("https://jsonplaceholder.typicode.com/todos")
        .then(function (response) {
            return response.json();
        })
        .then(function (todos) {
            displayTodos(todos);
        });

}
let completedCount = 0;

function displayTodos(todos) {

    let todoList = document.getElementById("todoList");

    todos.forEach(function (todo) {

        let div = document.createElement("div");
        div.className = "todo-item";

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        if (todo.completed) {
            checkbox.checked = true;
            checkbox.disabled = true;
        }
        else {

            checkbox.addEventListener("change", function () {

                if (checkbox.checked) {
                    completedCount++;

                    checkFiveTasks();
                }

            });

        }

        let label = document.createElement("label");
        label.innerText = todo.title;

        div.appendChild(checkbox);
        div.appendChild(label);

        todoList.appendChild(div);

    });

}
function checkFiveTasks() {

    let promise = new Promise(function (resolve, reject) {

        if (completedCount === 5) {
            resolve("Congrats. 5 Tasks have been Successfully Completed");
        }
        else {
            reject();
        }

    });

    promise
        .then(function (message) {
            alert(message);
        })
        .catch(function () {

        });

}