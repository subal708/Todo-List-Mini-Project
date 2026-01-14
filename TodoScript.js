const input = document.querySelector(".input-row input");
const addBtn = document.querySelector(".add-btn");
const todoContainer = document.querySelector(".todo-container");
const footerText = document.querySelector(".footer strong");

// update remaining count
function updateCount() {
  const todos = document.querySelectorAll(".todo-item");
  const completed = document.querySelectorAll(".todo-item input:checked");
  footerText.textContent = `Your remaining todos : ${todos.length - completed.length}`;
}

// add new todo
addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (text === "") return;

  const todoItem = document.createElement("div");
  todoItem.className = "todo-item";

  todoItem.innerHTML = `
    <div class="left">
      <input type="checkbox">
      <span>${text}</span>
    </div>
    <span class="delete">×</span>
  `;

  todoContainer.insertBefore(todoItem, document.querySelector(".footer"));
  input.value = "";
  updateCount();
});

// add with Enter key
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addBtn.click();
});

// ONE listener for checkbox + delete (works for ALL todos)
todoContainer.addEventListener("click", (e) => {

  // delete todo
  if (e.target.classList.contains("delete")) {
    e.target.closest(".todo-item").remove();
    updateCount();
  }

  // checkbox toggle
  if (e.target.type === "checkbox") {
    const span = e.target.nextElementSibling;
    span.classList.toggle("completed", e.target.checked);
    updateCount();
  }
});

// initial count (important)
updateCount();