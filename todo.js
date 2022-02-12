
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const areaText = $('#text-note')
const list = $('.list-todo')
const submit = $('.icon-tag.ok')
const btnCircle = $('.circle-plus')
const textTag = $('.number-task-list')
const deleteTodo = $('.delete')
const todo = $('.text-nt')

let listTodo = []
let listBoxCheck = []
/* localStorage.setItem('listBoxCheck', JSON.stringify(listBoxCheck)); */

const app = {
    addTodo: function (item) {
        listTodo.push(item)
        listBoxCheck.push('box-check1')
        localStorage.setItem('listTodo', JSON.stringify(listTodo));
        localStorage.setItem('listBoxCheck', JSON.stringify(listBoxCheck));
    },
    removeTodo: function (index) {
        listTodo.splice(index, 1)
        listBoxCheck.splice(index,1)
        _this.handleButtonCirlce()
        localStorage.setItem('listTodo', JSON.stringify(listTodo));
        localStorage.setItem('listBoxCheck', JSON.stringify(listBoxCheck));
    },
    render: function () {
        const htmls = listTodo.map((item, index) => {
            return `
                <div class="number-todo" data-index="${index}">
                    <div class="box-check ${listBoxCheck[index]}" data-index="${index}">
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

        const html2 = `Today <span class="number-task">(${listTodo.length})</span>`
        textTag.innerHTML = html2;
    },
    handleButtonCirlce: function () {
        if (listTodo.length > 5) {
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
            localStorage.setItem('listTodo', JSON.stringify(listTodo));
            localStorage.setItem('listBoxCheck', JSON.stringify(listBoxCheck));
        }
        if (change && !deleteBtn) {
            const index2 = change.dataset.index
            const check = $(`.box-check[data-index="${index2}"]`)
            if (check.classList.contains('box-check1')) {
                listBoxCheck[index2] = 'box-check2'
                
            } else if (check.classList.contains('box-check2')) {
                listBoxCheck[index2] = 'box-check1'
            }
            this.render()
        }
        localStorage.setItem('listTodo', JSON.stringify(listTodo));
        localStorage.setItem('listBoxCheck', JSON.stringify(listBoxCheck));
    },

    init: function () {
        _this = this
        if (localStorage.getItem('listTodo')) {
            localStorage.setItem('listTodo', JSON.stringify(listTodo));
        }
        if (localStorage.getItem('listBoxCheck')) {
            localStorage.setItem('listBoxCheck', JSON.stringify(listBoxCheck));
        }
        listTodo = JSON.parse(localStorage.getItem('listTodo'))
        listBoxCheck = JSON.parse(localStorage.getItem('listBoxCheck'))
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
