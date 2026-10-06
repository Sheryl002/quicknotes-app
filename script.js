// Select elements
const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");

// Notes are stored as an array of objects
let notes = [];

// Rebuild the list from the array
function render() {
  notesList.textContent = "";

  for (const note of notes) {
    const li = document.createElement("li");
    li.className = `note category-${note.category}`;

    const text = document.createElement("p");
    text.className = "note-text";
    text.textContent = note.text;

    const meta = document.createElement("div");
    meta.className = "note-meta";

    const label = document.createElement("span");
    label.className = "category-label";
    label.textContent = note.category.charAt(0).toUpperCase() + note.category.slice(1);

    const date = document.createElement("span");
    date.textContent = note.createdAt;

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete";

    meta.append(label, date, deleteBtn);
    li.append(text, meta);
    notesList.appendChild(li);
  }
}

// Add a note when the form is submitted
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = noteInput.value.trim();
  if (text === "") {
    return;
  }

  notes.push({
    id: Date.now(),
    text: text,
    category: categorySelect.value,
    createdAt: new Date().toLocaleString(),
  });

  noteInput.value = "";
  render();
});

render();
