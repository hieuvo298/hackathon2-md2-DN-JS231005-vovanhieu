interface TodoItem {
  content: string;
  status: number;
}
const todoList: TodoItem[] = [];

if (!JSON.parse(localStorage.getItem("todoList") as string )) {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

function renderTodo() {
  const localData: TodoItem[] = JSON.parse(localStorage.getItem('todoList') || '[]');
  const listTodo = document.querySelector('.list-todo') as HTMLElement;
  listTodo.innerHTML = "";
  if ( localData.length === 0) {
    listTodo.innerHTML = `
      <img src="../img/360_F_586210337_WOGOw0l7raEB8F61Muc4hWbvVcyQdk9Z.jpg" alt="anh">
    `; 
  } else {
    localData.forEach(function (item, index) {
      const countCompeleteWork=[item.content].length
      console.log(item);
      const inCompeleteWork=item.status?item.status:0
      listTodo.innerHTML += `
        <div class="todo-list">
          <div class="checkbox">
            <input type="checkbox" onclick="updateTodo(${index})" ${item.status ? 'checked' : ''}>
            <p style="text-decoration:${item.status ? 'line-through' : 'none'}">${item.content}</p>
          </div>
          <div class="icon">
            <i onclick="editToDo(${index})" class="fa-solid fa-pen" style="color: #ffa200;"></i>
            <i onclick="deleteTodo(${index})" class="fa-solid fa-trash" style="color: #e10505;"></i>
          </div>
          </div>
          <div class="compelete-work">
          <p>Công việc đã hoàn thành${inCompeleteWork}/${countCompeleteWork}</p>
          </div>
      `;
    });
  }
}
renderTodo()
function addTodo() {
  const inputElement = document.querySelector('#input-form') as HTMLInputElement;
  const inputValue = inputElement.value;
  const newTodo: TodoItem = {
      content: inputValue,
      status: 0
  };
  if (!inputValue) {
      alert('Tên công việc không được để trống.');
      return;
  }

  const localData: TodoItem[] = JSON.parse(localStorage.getItem('todoList') || '[]');
  localData.push(newTodo);
  localStorage.setItem('todoList', JSON.stringify(localData));
  inputElement.value = "";
  renderTodo();
}
function deleteTodo(index: number) {
  const dataLocal: TodoItem[] = JSON.parse(localStorage.getItem('todoList') || '[]');
  const item = dataLocal[index];
  const confirmDelete = confirm(`Bạn có chắc muốn xóa công việc "${item.content}" không?`);

  if (confirmDelete) {
    dataLocal.splice(index, 1); 
    localStorage.setItem("todoList", JSON.stringify(dataLocal));
    renderTodo();
    };     
}
function editToDo(index: number): void {
  const dataList: TodoItem[] = JSON.parse(localStorage.getItem("todoList") as string) || [];
  const currentContent: string = dataList[index].content;
  const updatedContent: string | null  = prompt("Nhập công việc muôn sửa:", currentContent);
  if(!updatedContent){
      return alert('Tên công việc không được để trống.'); 
  }
  if (updatedContent!== null ) {
    dataList[index].content = updatedContent;
    localStorage.setItem("todoList", JSON.stringify(dataList));
    renderTodo();
  }
} 
function updateTodo(index: number): void {
  const dataList: TodoItem[] = JSON.parse(localStorage.getItem("todoList") as string) || [];
  dataList[index].status = dataList[index].status ? 0 : 1; 
  localStorage.setItem("todoList", JSON.stringify(dataList));
  renderTodo();
}

