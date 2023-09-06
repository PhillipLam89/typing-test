let text = 'sample text, your test will appear here'
const startBtn = document.getElementById('start')
const container = document.getElementById('container')
const textArea = document.querySelector('textarea')
const charCounterTag = document.getElementById('char-counter')
const mistakesTag = document.getElementById('mistakes-counter')

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
    mistakesTag.textContent = `Current Mistakes: ${mistakes}`
    charCounterTag.textContent = `${text.length} chars`
    myInterval = setInterval(() => {
        timer+= 0.25; console.log(timer)
    }, 250)
}

function convertSeconds(seconds) {
    //example: 70secs = 1min and 10 secs
    const mins = Math.round(seconds / 60)
    const plural = mins === 1 ? '' : 's'
    const secs = seconds % 60
    return  `${mins} minute${plural}, ${secs}`
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
        mistakesTag.textContent=
        `Current Mistakes: ${++mistakes}`
        char.dataset.tried = true
        char.style.background = 'red'
        if (mistakes > Math.round(text.length * 0.25)) {
            alert('TOO MANY MISTAKES! RESTARTED')
            window.location.reload()
            return
        }
    }
    if (currentCharCount === text.length) {
        console.log(timer)
        clearInterval(myInterval)
        const correctCount = text.length - mistakes
        timer = timer < 0.25 ? 0.1 : timer // this is better than running the setInterval MORE times
        const wpm = [correctCount / timer * 60 ] / 4.7
        if (timer > 60) {
            console.log('it ran')
             timer = convertSeconds(timer)
             console.log('new timer', timer)
        }

                    //average length of English words is 4.7 chars
        document.body.innerHTML = `<h1>You finished in ${timer} seconds</h1>
                                   <p>${mistakes} mistakes</p>
                                   <p> ${correctCount} letters correct out of ${text.length}</p>
                                   <p> accuracy: ${(correctCount / text.length * 100).toFixed(2) }%</p>
                                   <h3>${wpm.toFixed(0) +' Words per Minute'} </h3> `
    }
}
