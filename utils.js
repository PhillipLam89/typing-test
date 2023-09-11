const collection = {
  easy: 'Solar flares often form around sunspots. A solar flare forms when gases and energy explode from the suns surface. The jet of energy shoots into space and it reaches Earth in just a few days. Colliding with the atmosphere!',
  medium: 'Cooling towers at a power-production facility. The equipment at power-production facilities produces a lot of waste heat energy as a by-product. Facilities use water to cool the equipment, and then need to release the water back into the environment. Releasing hot water back into rivers would harm the ecology, so many power plants have tremendous cooling towers, where hot water is sprayed inside and evaporation is used to cool the release water before it goes back into the environment. What is evaporation and why does it occur? evaporation is the process that changes liquid water to gaseous water (water vapor). Water moves from the Earth surface to the atmosphere via evaporation The opposite of evaporation is condensation. Condensation is the process of water vapor turning back into liquid water. Condensation occurs when saturated air is cooled, such as on the outside of a glass of ice water.',
  hard: 'People ' +
   'make use of evaporation One way to produce table salt is to evaporate saline water in evaporation ponds, a technique used by people for thousands of years. Seawater contains other valuable minerals that are easily obtained due to evaporation. Water from the Dead Sea is ideal for the extraction of not only table salt, but also magnesium, potash, and bromine. The Dead Sea is actually a lake, located in the Middle East within a closed watershed and without any means of outflow.' +
    ' This closed basin system is abnormal for most lakes. Water primarily leaves the lake by evaporating, resulting in upwards of 1,300 - 1,600 millimeters of evaporated water per year in this desert area! The result is that the waters of the Dead Sea have the highest salinity and density of any sea in the world, too high to support life. Because energy is required to break the bonds holding water molecules together evaporation removes heat from the environment, leading to a net cooling.' +
    "A watershed is an area of land that drains all the streams and rainfall to a common outlet such as the outflow of a reservoir, mouth of a bay, or any point along a stream channel . Watersheds can be as small as a footprint or large enough to encompass all the land that drains water into rivers that drain into Chesapeake Bay, where it enters the Atlantic Ocean. This map shows one set of watershed boundaries in the continental United States; these are known as National hydrologic units (watersheds)." +
    " Soil characteristics: In Georgia, clayey and rocky soils of the northern areas absorb less water at a slower rate than sandy soils, such as in Georgia's Coastal Plain. Soils absorbing less water results in more runoff overland into streams."

}
//code below checks for Caps-Lock
 document.addEventListener('keydown', function(event) {
    capsLockOn = event.getModifierState('CapsLock');
    const caps = document.querySelector('#capsBtn')
    caps.textContent = capsLockOn ? 'CAPS ON' : 'CAPS OFF'
    caps.style.background = capsLockOn ? 'chartreuse' : 'lightgrey'
})

function createSpaceBarDiv() {
  const spaceBarDiv = document.createElement('div')
  spaceBarDiv.setAttribute('class', 'spaceDiv tile')
  spaceBarDiv.textContent = ' '
  spaceBarDiv.style.margin = 'auto 3em'
  spaceBarDiv.style.border = '3px solid royalblue'
  spaceBarDiv.style.textAlign = 'center'
  spaceBarDiv.style.borderRadius = '8px'
  spaceBarDiv.style.height = '2rem'
  board.appendChild(spaceBarDiv)
}
function renderKeys(rowsArr) {
  while (board.childElementCount < 4) {
     const row = document.createElement('div')
     row.id = `row${board.childElementCount}`
     row.setAttribute('class', 'row')

     for (let i = 0; i < rowsArr[board.childElementCount].length; i++) {
        const tile = document.createElement('div')

        tile.textContent = rowsArr[board.childElementCount][i]
        const isOther = tile.textContent.length > 2
        tile.style.width = !isOther ? '1.8rem' : '5rem'
        tile.style.height = '1.8rem'
        tile.style.border = '2px solid royalblue'
        tile.style.borderRadius = !isOther ? '50%' : '5px'
        tile.setAttribute('class', !isOther ? 'tile' : 'shift')
        if (tile.textContent.includes('CAPS')) {
          tile.id = 'capsBtn'
          tile.style.width = '3.5rem'
          tile.style.fontSize= '.5rem'
          tile.style.fontWeight = 'bolder'

        }
        if (tile.id === 'capsBtn') tile.classList.remove('shift')
        row.appendChild(tile)
     }
     board.appendChild(row)
  }
  document.querySelector(`#row1`).style.marginLeft = '1.2em'
  document.querySelector(`#row2`).style.marginLeft = '1em'
  createSpaceBarDiv()
}

function updateHighlights(letter) {
  shiftBTN.style.background = 'none'
  allTiles.forEach(tile => tile?.classList?.remove('hasHighlight'))
  const newTarget = allTiles.find(tile => tile?.textContent.includes(letter.toUpperCase()))
  newTarget?.classList?.add('hasHighlight')

  if (shiftNeeded.includes(text[currentCharCount])) {
    shiftBTN.style.background = 'yellow'
  }
}

function renderText(str) {
    const arr = str.split('')
    arr.forEach((char, index) => {
        const span = document.createElement('span')
        span.id = `char${index}`
        span.textContent = char
        container.append(span)
    })
}
function renderDifficulty() {
 const all = [...document.querySelectorAll('input')]
 const rightOne = all.find(input => input.checked).value
 return collection[rightOne]
}
function convertSeconds(seconds) {
    //example: 70secs = 1min and 10 secs
    const mins = Math.round(seconds / 60)
    const plural = mins === 1 ? '' : 's'
    const secs = seconds % 60
    return  `${mins} minute${plural}, ${secs}`
}

function handleStartBtn() {
      container.innerHTML = ''
    this.disabled = true
    userStarted = true
    this.textContent = 'TYPE NOW!'
    textArea.remove()
    preTestCharCounter.remove()
    document.querySelector('fieldset').style.display = 'none'
    text = textArea.value.trim() || renderDifficulty()
    renderText(text)
    mistakesTag.textContent = `Current Mistakes: ${mistakes}`
    charCounterTag.textContent = `${text.length} chars`
    const firstHighlight = allTiles.find(letterDiv =>
                           letterDiv.textContent.includes(text[0].toUpperCase()))
    firstHighlight?.classList.add('hasHighlight')
    if (shiftNeeded.includes(text[0]) ) {
        shiftBTN.style.background = 'yellow'
    }
    myInterval = setInterval(() => timer+= 0.25, 250)
}

function handleKeyPress(e) {
    if (!userStarted) return
    if (e.keyCode == 32 || e.keyCode == 8 || e.keyCode == 46) e.preventDefault()
    sound.play()
    const char = document.getElementById(`char${currentCharCount}`)
    const nextChar = char.nextElementSibling
    if (e.key == char.textContent) {
        currentCharCount++
        nextChar && updateHighlights(nextChar.textContent)
        char.style.background = char.dataset.tried
                                     ?
                                'gold' : 'chartreuse'
                // if they missed then corrected a mistake => gold background

        nextChar?.classList?.add('hasBlink')
        char.classList?.remove('hasBlink')
    } else if (!char.dataset.tried) {
        mistakesTag.textContent=
        `Current Mistakes: ${++mistakes}`
        char.dataset.tried = true
        char.style.background = 'red'
        wrongSound.play()
    } else wrongSound.play()
    if (currentCharCount === text.length) {
        clearInterval(myInterval)
        const correctCount = text.length - mistakes
        timer = timer < 0.25 ? 0.1 : timer // this is better than running the setInterval MORE times
        const wpm = [correctCount / timer * 60 ] / 4.7
        if (timer >= 60) timer = convertSeconds(timer)

                    //average length of English words is 4.7 chars
        document.body.innerHTML =

        `<article class="result">
         <h4>You finished in <span>${timer} seconds</span></h4>
          <hr>
          <h4><span>${mistakes}</span> mistakes</h4>
          <hr>
          <h4> <span>${correctCount}</span> letters correct out of <span>${text.length}</span></h4>
          <hr>
          <h4> accuracy: <span>${(correctCount / text.length * 100).toFixed(2) }%</span></h4>
          <hr>
          <h3><span>${wpm.toFixed(0)}</span> Words Per Minute </h3>
        </article>`
    }

}
