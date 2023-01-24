// window.addEventListener('load', ()=>{
    let form = document.querySelector("#new-td-form")
    let input = document.querySelector("#new-td-input")
    let list_el = document.querySelector("#tasks")

    form.addEventListener('submit', (e)=>{
        e.preventDefault();

        let task = input.value

        if (!task) {
            alert('introduisez un tâche à faire')
            return
        }

        let task_el = document.createElement("div")
        task_el.classList.add("task")

        let task_contenu_el = document.createElement("div")
        task_contenu_el.classList.add("content")
        

        task_el.appendChild(task_contenu_el)

        let task_input_el = document.createElement('input')
        task_input_el.classList.add('text')
        task_input_el.type = 'text'
        task_input_el.value = task
        task_input_el.setAttribute('readonly', 'readonly')
        task_contenu_el.appendChild(task_input_el)

        let task_actions_el = document.createElement('div')
        task_actions_el.classList.add('actions')

        let task_check_el = document.createElement('button')
        task_check_el.classList.add("check")
        task_check_el.innerHTML = "check"

        let task_edit_el = document.createElement('button')
        task_edit_el.classList.add("edit")
        task_edit_el.innerHTML = "modifier"

        let task_delete_el = document.createElement('button')
        task_delete_el.classList.add('delete')
        task_delete_el.innerHTML = "supprimer"

        task_actions_el.appendChild(task_check_el)
        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_actions_el);

        list_el.appendChild(task_el);

        input.value = "";

        let originalColor = task_el.style.backgroundColor;
        task_check_el.addEventListener('click', () =>{
            if (task_el.style.backgroundColor === originalColor) {
                task_el.style.backgroundColor = "green";
            } else {
                task_el.style.backgroundColor = originalColor;
            }
        })

        task_edit_el.addEventListener('click', () => {
            console.log(task_edit_el)
            if(task_edit_el.innerText.toLowerCase() == "modifier"){
                task_input_el.removeAttribute("readonly")
                task_input_el.focus();
                task_edit_el.innerText = "Sauvegarder"
            } else {
                task_input_el.setAttribute("readonly","readonly")
                task_edit_el.innerText = "Modifier"
            }
        });

        task_delete_el.addEventListener('click', () => {
            list_el.removeChild(task_el);
        });
    })
// })

