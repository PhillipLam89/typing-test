let text = 'Your test will appear here!'

const startBtn = document.getElementById('start')
const container = document.getElementById('container')

let userStarted = false
let currentCharCount = 0
let mistakes = 0
let timer = 0
let timerInterval = null


function renderText(str) {
   const arrayStr = str.split('')
   arrayStr.forEach((char,index) => {
    const spanBox = document.createElement('span')
    spanBox.id = 'text'+index
    spanBox.textContent = char
    container.append(spanBox)
    })
}
renderText(text)


startBtn.onclick = function() {
    container.innerHTML = ''
    text = document.querySelector('textarea').value.trim()
            ||
            'DEFAULT TEST: DONT BE LAZY...REFRESH... WRITE YOUR OWN TEST :D'
    this.disabled = true
    this.textContent = 'START TYPING ALREADY'
    userStarted = true
    renderText(text)
    document.querySelector('textarea').style.display = 'none'
    timerInterval = setInterval(() => timer++, 1000)
}

document.onkeypress = (e)  => {
    if (!userStarted) return
    const currentChar =  document.
                         querySelector(`#text${currentCharCount}`)
    const nextChar =  document.
                         querySelector(`#text${currentCharCount + 1}`) || 0
    if (e.key == text[currentCharCount]) {
        currentChar.style.background = 'green'
        nextChar.classList?.add('hasBlink')
        currentChar.classList?.remove('hasBlink')
        currentCharCount++

        if (currentCharCount === text.length) {
            clearInterval(timerInterval)
            document.body.textContent = `You got
            ${mistakes} mistakes and ${text.length - mistakes} correct in ${timer} seconds
            ${container.childElementCount} characters total!
            `
        }
    } else if (!currentChar.dataset.tried) {
            currentChar.classList?.remove('hasBlink')
            mistakes++
            currentChar.dataset.tried = true
            currentChar.style.background = 'red'
    }
}
