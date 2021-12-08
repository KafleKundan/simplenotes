/*
Adding a note
*/
function addNoteFunc() {
    let addNoteTxt = document.getElementById('addNoteTxt').value
    let addNoteTitle = document.getElementById('addNoteTitle').value
    let notes = localStorage.getItem('notes')
    let notesObj;
    // parsing to Array
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    // checking if textarea is null
    let isEmpty = addNoteTxt.trim()
    if (isEmpty == "") {
        alert('Note can not be empty !!!', 'danger')
    } else {
        let myObj = {
            title: addNoteTitle,
            text: addNoteTxt,
        }

        notesObj.push(myObj);
        localStorage.setItem('notes', JSON.stringify(notesObj))
        console.log('boobies')
        alert('A Note was added sucessfully ', 'success')
    }
    document.getElementById('addNoteTxt').value = '';
    document.getElementById('addNoteTitle').value = '';
    showNotes();
}

/* 
Displaying Note
*/
function showNotes() {
    let notes = localStorage.getItem('notes')
    let notesObj;
    let html = "";
    // parsing to Array
    if (notes == null) {
        notesObj = [];

    } else {
        notesObj = JSON.parse(notes);
        notesObj.forEach(function(element, index) {
            html += `
            <div class="card noteCard mx-auto my-2 bg-dark border" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title whitetext">${element.title}</h5>
                    <p class="card-text whitetext">${element.text}</p>
                    <button id = "${index}" class="btn btn-primary btn-danger" onclick = "deleteNote(this.index)">Delete</button>
                </div>
            </div>
            `
        })
    };
    let notesDiv = document.getElementById('notesDiv')
    if (notesObj.length == 0) {
        document.getElementById('clearAll').style.display = 'none'
        html = `<h5 class= "whitetext">Nothing to display. Add a Note...</h5>`
    } else {
        document.getElementById('clearAll').style.display = 'block'
    }
    notesDiv.innerHTML = html;

}
showNotes();

/*
Deleting Notes
*/
function deleteNote(index) {
    let notes = localStorage.getItem('notes')
    let notesObj;
    // parsing to Array
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj))
    showNotes();
    alert('Note was successfully deleted', 'danger')

}

// clear All
function clearAll() {
    localStorage.removeItem('notes')
    showNotes();
    alert('All notes were cleared !!!', 'danger')
}
/*
Search Function
*/
let search = document.getElementById('search')

search.addEventListener('input', function() {
    let searchTxt = search.value;
    let noteCards = document.getElementsByClassName('noteCard')
    Array.from(noteCards).forEach(function(element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        let cardTitle = element.getElementsByTagName('h5')[0].innerText;
        if (cardTxt.includes(searchTxt) || cardTitle.includes(searchTxt)) {
            element.style.display = 'block'
        } else {
            element.style.display = 'none'

        }
    })
})

// Alert
var alertPlaceholder = document.getElementById('liveAlertPlaceholder')
var alertTrigger = document.getElementById('liveAlertBtn')


function alert(message, type) {
    var wrapper = document.createElement('div')
    alertPlaceholder.innerHTML = "";
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    alertPlaceholder.append(wrapper)
}

// about
function about() {
    //  for home
    document.getElementById('container').style.display = 'none'
    document.getElementById('aboutcontainer').style.display = 'block'
    let home = document.getElementById('home')
    home.classList.remove("disabled")
    home.classList.add("active")
        // for about 
    let about = document.getElementById('about')
    about.classList.remove("active")
    about.classList.add("disabled")
        // search
    document.getElementById('search').style.display = 'none';
    document.getElementById('submit').style.display = 'none';
    console.clear()

}

function home() {
    //  for home
    document.getElementById('container').style.display = 'block'
    document.getElementById('aboutcontainer').style.display = 'none'

    let home = document.getElementById('home')
    home.classList.remove("active")
    home.classList.add("disabled")
        // for about 
    let about = document.getElementById('about')
    about.classList.remove("disabled")
    about.classList.add("active")
    document.getElementById('search').style.display = 'block'
    document.getElementById('submit').style.display = 'block'
    console.clear()
}