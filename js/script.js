"use strict";
const DB_NAME = "saved_data";

//собираем все введенные данные и рендерим их
document.querySelector("#todoForm")
    .addEventListener("submit", (e) => {

    e.preventDefault();
    const inputs = e.target.querySelectorAll("input, textarea");

    const obj = {
        completed: false,
        id: Date.now(),
    };

    for (const input of inputs) {
        if (!input.value.length) return alert("No way you can add this shit");
        obj[input.name] = input.value;
    }
    
    saveData(obj);
    renderItem(obj);

    e.target.reset();
});

//сохраняем в сторадж
function saveData(todoItem) {
  if (localStorage[DB_NAME]) {
    const data = JSON.parse(localStorage[DB_NAME]);
    data.push(todoItem);
    localStorage.setItem(DB_NAME, JSON.stringify(data));
    return data;
  }

    const data = [todoItem];
    localStorage.setItem(DB_NAME, JSON.stringify(data));
    return data;
}

//выводим на экран
this.window.addEventListener("load", () => {
    if (!localStorage[DB_NAME].length) return;
    const data = JSON.parse(localStorage[DB_NAME]);
    data.forEach((item) => renderItem(item));

    //alert("DOM готов!!");


    var elements = document.getElementsByClassName("taskCheckbox");
    for (let item of elements) {
        item.addEventListener("change", myHandler, false);
    }

    //удаляем тудушку
    const todoItems = document.querySelector("#todoItems")
        
    todoItems.addEventListener('click', (e) => {
        
        if (e.target.matches('.deleteBtn')) {
            data.splice(0, 1);
            localStorage.setItem(DB_NAME, JSON.stringify(data));
            document.getElementById(e.target.id).remove();
        }
    })
})


// window.addEventListener(
//     "beforeunload",
//     function (e) {
//         var elements = document.getElementsByClassName("taskCheckbox");
//         for (let item of elements) {
//         console.log("beforeunload | item", item);
//         item.removeEventListener("change", myHandler, false);
//         }
//     },
//     false
// );

//функция для вывода
function renderItem(todoItem) {
  const template = createTemplate(
    todoItem.title,
    todoItem.description,
    todoItem.completed,
    todoItem.id,
  );
    document.querySelector("#todoItems").prepend(template);
}

//создаем шаблон для вывода полученных данных
function createTemplate(titleText = " ", descriptionText = " ", status, id) {
    //console.log("createTemplate status", status);

    const mainWrp = document.createElement("div");
    mainWrp.className = "col-4";

    const wrp = document.createElement("div");
    wrp.className = "taskWrapper";
    wrp.setAttribute('id', id);
    mainWrp.append(wrp);

    const title = document.createElement("div");
    title.innerHTML = titleText;
    title.className = "taskHeading";
    wrp.append(title);

    const description = document.createElement("div");
    description.innerHTML = descriptionText;
    description.className = "taskDescription";
    wrp.append(description);

    let chkBox = document.createElement("input");
    chkBox.setAttribute("type", "checkbox");
    chkBox.setAttribute("name", titleText);
    if (status) {
        chkBox.setAttribute("checked", true);
    }
    chkBox.classList.add("taskCheckbox");
    wrp.append(chkBox);

    const statusLabel = document.createElement('label')
    statusLabel.innerHTML = 'Completed';
    wrp.append(statusLabel);

    const deleteWrp = document.createElement('div');
    wrp.append(deleteWrp);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = 'Delete';
    deleteBtn.setAttribute('id', id);
    deleteBtn.setAttribute('class', `deleteBtn`);
    wrp.append(deleteBtn);

    return mainWrp;
}

function myHandler(event) {
    //console.log("myHandler event", event);
    //console.log("myHandler event.target.checked", event.target.checked);
    //console.log("myHandler event.target.name", event.target.name);

    let chkBoxName = event.target.name;
    let chkBoxStatus = event.target.checked;

    const data = JSON.parse(localStorage[DB_NAME]);

    for (let item of data) {
        if (item.title === chkBoxName) {
        item.completed = chkBoxStatus;
        }
    }

    let dataStr = JSON.stringify(data);
    localStorage.setItem(DB_NAME, dataStr);
}

