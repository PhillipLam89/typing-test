let text = 'sample text'
const startBtn = document.getElementById('start')
const container = document.getElementById('container')
const textArea = document.querySelector('textarea')

function renderText(str) {
    const arr = str.split('')
    arr.forEach((char, index) => {
        const span = document.createElement('span')
        span.id = `char${index}`
        span.textContent = char
        container.append(span)
    })
}
renderText(text)

let userStarted = false
let mistakes = 0
let timer = 0
let currentCharCount = 0
let myInterval = null

function renderDifficulty() {
 const all = [...document.querySelectorAll('input')]
 const rightOne = all.find(input => input.checked).value
 return collection[rightOne]
}

startBtn.onclick = function(e) {
    container.innerHTML = ''
    this.disabled = true
    userStarted = true
    this.textContent = 'TYPE NOW!'
    textArea.style.display = 'none'
    document.querySelector('fieldset').style.display = 'none'
    text = textArea.value.trim() || renderDifficulty()
    renderText(text)
    document.querySelector('h6').textContent = `Current Mistakes: ${mistakes}`
    document.querySelector('h5').textContent = `${text.length} chars`
    myInterval = setInterval(() => timer++,1000)
}

document.onkeypress = (e) => {
    if (!userStarted) return
    if (e.keyCode == 32) e.preventDefault()
    const char = document.getElementById(`char${currentCharCount}`)
    const nextChar = char.nextElementSibling

    if (e.key == char.textContent) {
        currentCharCount++
        char.style.background = 'green'
        nextChar?.classList?.add('hasBlink')
        char.classList?.remove('hasBlink')
    } else if (!char.dataset.tried) {

        document.querySelector('h6').textContent=
        `Current Mistakes: ${++mistakes}`
        char.dataset.tried = true
        char.style.background = 'red'
        if (mistakes > Math.round(text.length * 0.5)) {
            alert('TOO MANY MISTAKES, RESTARTED')
            window.location.reload()
            return
        }
    }
    if (currentCharCount === text.length) {
        clearInterval(myInterval)
        const correctCount = text.length - mistakes
        const wpm = [correctCount / timer * 60 ] / 5

        document.body.innerHTML = `<h1>You finished in ${timer} seconds</h1>
                                   <p>${mistakes} mistakes</p>
                                   <p> ${correctCount} letters correct out of ${text.length}</p>
                                   <p> accuracy: ${(correctCount / text.length * 100).toFixed(2) }%</p>
                                   <h3>${wpm} Words per Minute</h3> `
    }
}
