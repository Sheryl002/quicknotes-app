// Select elements
const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

const STORAGE_KEY = "quicknotes-notes";

// Notes are stored as an array of objects: { id, text, category, createdAt }
let notes = loadNotes();

// Load notes from localStorage (empty array if nothing valid is saved)
function loadNotes() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return [];
  }
  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

// Save notes to localStorage
function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// Show the correct count message
function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

// Remove one note by id
function deleteNote(id) {
  notes = notes.filter(function (note) {
    return note.id !== id;
  });
  saveNotes();
  render();
}

// Rebuild the list from the array (filtered by the search box)
function render() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const visibleNotes = notes.filter(function (note) {
    return note.text.toLowerCase().includes(searchTerm);
  });

  notesList.textContent = "";

  if (notes.length > 0 && visibleNotes.length === 0) {
    const message = document.createElement("li");
    message.className = "empty-message";
    message.textContent = "No notes match your search.";
    notesList.appendChild(message);
  }

  for (const note of visibleNotes) {
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
    deleteBtn.addEventListener("click", function () {
      deleteNote(note.id);
    });

    meta.append(label, date, deleteBtn);
    li.append(text, meta);
    notesList.appendChild(li);
  }

  updateCount();
}

// Add a note when the form is submitted
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = noteInput.value.trim();

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }
  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";
  notes.push({
    id: Date.now(),
    text: text,
    category: categorySelect.value,
    createdAt: new Date().toLocaleString(),
  });

  noteInput.value = "";
  saveNotes();
  render();
});

// Search as the user types
searchInput.addEventListener("input", render);

render();
