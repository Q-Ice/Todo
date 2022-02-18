
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const areaText = $('#text-note')
const list = $('.list-todo')
const submit = $('.icon-tag.ok')
const btnCircle = $('.circle-plus')
const textTag = $('.number-task-list')
const deleteTodo = $('.delete')
const todo = $('.text-nt')

let task = {
    listTodo: [],
    listBoxCheck: [],
}

if (!localStorage.getItem('Task')) {
    localStorage.setItem('Task', JSON.stringify(task))
}

const app = {
    addTodo: function (item) {
        task.listTodo.push(item)
        task.listBoxCheck.push('box-check1')
        localStorage.setItem('Task', JSON.stringify(task));
    },
    removeTodo: function (index) {
        task.listTodo.splice(index, 1)
        task.listBoxCheck.splice(index, 1)
        _this.handleButtonCirlce()
        localStorage.setItem('Task', JSON.stringify(task));
    },
    render: function () {
        const htmls = task.listTodo.map((item, index) => {
            return `
                <div class="number-todo" data-index="${index}">
                    <div class="box-check ${task.listBoxCheck[index]}" data-index="${index}">
                        <i class="check1 fa-solid fa-circle" data-index="${index}"></i>
                        <i class="check2 fa-solid fa-circle-check" data-index="${index}"></i>
                    </div>
                    <p class="text-nt" data-index="${index}">${item}</p>
                    <span class="delete" data-index="${index}">&times</span>
                </div>
            `
        })
            .join('')

        list.innerHTML = htmls

        const html2 = `Today <span class="number-task">(${task.listTodo.length})</span>`
        textTag.innerHTML = html2;
    },
    handleButtonCirlce: function () {
        if (task.listTodo.length > 5) {
            btnCircle.style['position'] = 'sticky'
            btnCircle.style['float'] = 'right'
            btnCircle.style['bottom'] = '15px'
        }
        else {
            btnCircle.style['position'] = 'fixed'
            btnCircle.style['bottom'] = '5px'
        }
    },
    handleListTodo: function (e) {
        const deleteBtn = e.target.closest('.delete')
        const change = e.target.closest('.number-todo') || e.target.closest('.text-nt') || e.target.closest('.check1')
            || e.target.closest('.check2') || e.target.closest('.box-check') || undefined
        if (deleteBtn) {
            const index = deleteBtn.dataset.index
            this.removeTodo(index)
            this.render()
        }
        if (change && !deleteBtn) {
            const index2 = change.dataset.index
            const check = $(`.box-check[data-index="${index2}"]`)
            if (check.classList.contains('box-check1')) {
                task.listBoxCheck[index2] = 'box-check2'

            } else if (check.classList.contains('box-check2')) {
                task.listBoxCheck[index2] = 'box-check1'
            }
            this.render()
        }
        localStorage.setItem('Task', JSON.stringify(task));
    },

    init: function () {
        _this = this
        task.listTodo = JSON.parse(localStorage.getItem('Task')).listTodo || []
        task.listBoxCheck = JSON.parse(localStorage.getItem('Task')).listBoxCheck || []
        submit.onclick = function () {
            const item = areaText.value
            if (!item == '') {
                _this.addTodo(item)
            }
            _this.handleButtonCirlce()
            _this.render()
            areaText.value = ''
            areaText.focus()
        }

        list.onclick = this.handleListTodo.bind(this)

        this.handleButtonCirlce()
        this.render();
    }
}

app.init()
