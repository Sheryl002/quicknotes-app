# QuickNotes

QuickNotes is a simple note-taking web app built with HTML, CSS and JavaScript. You can write short notes, sort them into Personal, Work or Study categories, search through them and delete the ones you no longer need. Your notes are saved in your browser, so they are still there when you refresh the page.

## Features

- Add notes of up to 200 characters
- Choose a category: Personal, Work or Study
- Each category has its own coloured card style
- Validation with clear error messages for empty or too-long notes
- Delete any note
- Search notes as you type (not case-sensitive)
- Note count that reads correctly for zero, one or many notes
- Notes saved with localStorage, so they survive a refresh
- Responsive layout that stacks the form on small screens

## How to run locally

1. Clone the repository: `git clone https://github.com/Sheryl002/quicknotes-app.git`
2. Open the `quicknotes-app` folder.
3. Double-click `index.html` to open it in your browser, or right-click it in VS Code and choose **Open with Live Server**.

No installation is needed.

## What I learned

- How to build a page with semantic HTML and labels linked to inputs.
- How to use Flexbox and a media query to make a layout responsive.
- How to store data as an array of objects and rebuild the page with `render()`.
- How to use `createElement` and `textContent` instead of `innerHTML` to display user text safely.
- How to save and load data with `localStorage`, `JSON.stringify` and `JSON.parse`.
