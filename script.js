const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const MAX_LENGTH = 20; // Change this to your desired character limit

let tasks = [];

// Add a new task
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText.length <= MAX_LENGTH && taskText !== '') {
    tasks.push({ text: taskText, completed: false });
    renderTaskList();
    taskInput.value = ''; // Clear input
  } else {
    alert('Task must be less than or equal to ' + MAX_LENGTH + ' characters.');
  }
});

// Render the task list
function renderTaskList() {
  taskList.innerHTML = ''; // Clear existing list
  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.innerHTML = `
      <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
      <button class="btn btn-danger ml-2 delete-task" data-index="${index}">Delete</button>
    `;
    taskList.appendChild(listItem);
  });
  // Add event listeners for delete and completion toggle
  const deleteButtons = document.querySelectorAll('.delete-task');
  deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
      const index = parseInt(button.dataset.index);
      tasks.splice(index, 1);
      renderTaskList();
    });
  });
  const taskItems = document.querySelectorAll('.list-group-item span');
  taskItems.forEach(item => {
    item.addEventListener('click', () => {
      const index = Array.from(taskList.children).indexOf(item.parentElement);
      tasks[index].completed = !tasks[index].completed;
      renderTaskList();
    });
  });
}