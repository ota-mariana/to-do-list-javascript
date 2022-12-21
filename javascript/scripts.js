// Seleção de elementos
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');

let oldInputValue;

// Funções
const saveTodo = (text) => {
  const todo = document.createElement('div');
  todo.classList.add('todo');

  const todoTitle = document.createElement('h3');
  todoTitle.innerText = text;
  todo.appendChild(todoTitle);

  const todoDoneBtn = document.createElement('button');
  todoDoneBtn.classList.add('finish-todo');
  todoDoneBtn.innerHTML = ('<i class="fa-solid fa-check"></i>');
  todo.appendChild(todoDoneBtn);

  const todoEditBtn = document.createElement('button');
  todoEditBtn.classList.add('edit-todo');
  todoEditBtn.innerHTML = ('<i class="fa-solid fa-pen"></i>');
  todo.appendChild(todoEditBtn);

  const todoRemoveBtn = document.createElement('button');
  todoRemoveBtn.classList.add('remove-todo');
  todoRemoveBtn.innerHTML = ('<i class="fa-solid fa-xmark"></i>');
  todo.appendChild(todoRemoveBtn);

  todoList.appendChild(todo);

  todoInput.value = '';
  todoInput.focus();
};

const toggleForm = () => {
  editForm.classList.toggle('hide');
  todoForm.classList.toggle('hide');
  todoList.classList.toggle('hide');
};

const updateTodo = (text) => {
  const todos = document.querySelectorAll('.todo');
  todos.forEach((todo) => {
    let todoValue = todo.querySelector('h3');

    if(todoValue.innerText === oldInputValue) {
      todoValue.innerText = text;
    }
  })
};

// Eventos
todoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const inputValue = todoInput.value;

  if(inputValue) {
    saveTodo(inputValue)
  }
});

document.addEventListener('click', (event) => {
  const targetElement = event.target;
  const parentElement = targetElement.closest('div');
  let todoTitle;

  if(parentElement && parentElement.querySelector('h3')) {
    todoTitle = parentElement.querySelector('h3').innerText;
  }

  if(targetElement.classList.contains('finish-todo')) {
    parentElement.classList.toggle('done');
  }

  if(targetElement.classList.contains('remove-todo')) {
    parentElement.remove();
  }

  if(targetElement.classList.contains('edit-todo')) {
    toggleForm();
    
    editInput.value = todoTitle;
    oldInputValue = todoTitle;
  }
});

cancelEditBtn.addEventListener('click', (event) => {
  event.preventDefault();
  toggleForm();
});

editForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const editInputValue = editInput.value;

  if(editInputValue) {
    updateTodo(editInputValue);
  }

  toggleForm();
});

