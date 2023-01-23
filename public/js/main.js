const ul = document.querySelector('ul')
const form = document.querySelector('form')
const input = document.querySelector('form > input')

// test
const todos = [

]

// EventListener
form.addEventListener('submit', (e) => {
    let value = input.value.trim()
  // const text = input.value.trim()

    e.preventDefault()

    constVerifieErr(value)
})

// display Todo
const displayTodo = () => {
  // console.log(todos.length)
  // Array d'élément
  const todosNode = todos.map((todo, index) => {
    if (todo.editMode) {
        return createTodoEditElement(todo, index)
    } else {
        return createTodoElement(todo, index)
    }
  })

  ul.innerHTML = ''
  //  the spread operator to convert our array into a comma separated list of HTML nodes
  ul.append(...todosNode.reverse())
}

// method
const createTodoElement = (todo, index) => {
  // li
  const li = document.createElement('li')

  // span
  const span = document.createElement('span')
  const spanClass = document.createAttribute('class')
  spanClass.value = `todo ${todo.done ? 'done' : ''} `
  span.setAttributeNode(spanClass)

  // paragraphe
  const paragaphe = document.createElement('p')
  const paragapheText = document.createTextNode(todo.text)
  paragaphe.appendChild(paragapheText)

  // button edit
  const btnEdit = document.createElement('button')
  const btnEditClass = document.createAttribute('class')
  btnEditClass.value = 'btn-edit'
  btnEdit.setAttributeNode(btnEditClass)
  btnEdit.innerHTML = 'Editer'

  btnEdit.addEventListener('click', (e) => {
    e.stopPropagation()
    toggleEditMode(index)
  })

  // button delete
  const btnDelete = document.createElement('button')
  const btnDeleteClass = document.createAttribute('class')
  btnDeleteClass.value = 'btn-delete'
  btnDelete.setAttributeNode(btnDeleteClass)
  btnDelete.innerHTML = 'Supprimer'

  btnDelete.addEventListener('click', (e) => {
    // stopPropagation li
    e.stopPropagation()

    if (confirm(`êtes-vous sûr de vouloir supprime la tâche : ${todo.text}?`)) {
      deleteTodo(index)
    }
  })

  li.addEventListener('click', (e) => {
    toggleTodo(index)
  })

  li.append(span, paragaphe, btnEdit, btnDelete)

  return li
}

// add todo
const addTodo = (text) => {
  todos.push({
    text,
    done: false,
    id: Date.now(),
  })
  console.log(todos)
  displayTodo()
}

// verifie
const constVerifieErr = (value) => {
  const spanError = document.createElement('span')
  const spanErrorClass = document.createAttribute('class')
  spanErrorClass.value = 'error'
  const characterMin = 5

  form.insertAdjacentElement('beforebegin', spanError)
  spanError.setAttributeNode(spanErrorClass)

  if (value == '') {
    input.style.borderColor = 'red'
    input.focus()
    spanError.textContent =
      'Veuillez remplir le formulaire avant de valider! merci'
    // minimum size
  } else if (value.length < characterMin) {
    spanError.textContent = `La taille minimum est de ${characterMin} charactére`
  } else {
    input.style.borderColor = '#ddd'
    document.querySelectorAll('.error').forEach(function (a) {
      a.remove()
    })
    input.focus()

    addTodo(value)
    input.value = ''
  }
}

// delete Todo
const deleteTodo = (index) => {
  todos.splice(index, 1)
  displayTodo()
}
// toggleTodo
const toggleTodo = (index) => {
  todos[index].done = !todos[index].done
  displayTodo()
}

const createTodoEditElement = (todo, index) => {
  const li = document.createElement('li')

  const input = document.createElement('input')
  input.text = 'text'
  input.value = todo.text

  const btnSave = document.createElement('button')
  btnSave.innerHTML = 'sauvegarder'
  btnSave.addEventListener('click', (e) => {
    editTodo(index, input)
  })
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      editTodo(index, input)
    }
  })

  const btnCancel = document.createElement('button')
  btnCancel.addEventListener('click', (e) => {
    e.stopPropagation()
    toggleEditMode(index)
  })
  btnCancel.innerHTML = 'Annuler'

  li.append(input, btnCancel, btnSave)
  return li
}

// toggleEditMode
const toggleEditMode = (index) => {
  todos[index].editMode = !todos[index].editMode
  displayTodo()
}

// editTodo
const editTodo = (index, input) => {
  if (input.value === '') {
    input.style.borderColor = 'red'
    console.log('vide')
  } else {
    const value = input.value
    todos[index].text = value
    todos[index].editMode = false
    displayTodo()
  }
}

displayTodo()