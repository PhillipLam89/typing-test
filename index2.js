const collection = {
  easy: 'Solar flares often form around sunspots. A solar flare forms when gases and energy explode from the suns surface. The jet of energy shoots into space and it reaches Earth in just a few days. Colliding with the atmosphere!',
  medium: 'Cooling towers at a power-production facility. The equipment at power-production facilities produces a lot of waste heat energy as a by-product. Facilities use water to cool the equipment, and then need to release the water back into the environment. Releasing hot water back into rivers would harm the ecology, so many power plants have tremendous cooling towers, where hot water is sprayed inside and evaporation is used to cool the release water before it goes back into the environment. What is evaporation and why does it occur? evaporation is the process that changes liquid water to gaseous water (water vapor). Water moves from the Earth surface to the atmosphere via evaporation The opposite of evaporation is condensation. Condensation is the process of water vapor turning back into liquid water. Condensation occurs when saturated air is cooled, such as on the outside of a glass of ice water.',
  hard: 'People ' +
   'make use of evaporation One way to produce table salt is to evaporate saline water in evaporation ponds, a technique used by people for thousands of years. Seawater contains other valuable minerals that are easily obtained due to evaporation. Water from the Dead Sea is ideal for the extraction of not only table salt, but also magnesium, potash, and bromine. The Dead Sea is actually a lake, located in the Middle East within a closed watershed and without any means of outflow.' +
    ' This closed basin system is abnormal for most lakes. Water primarily leaves the lake by evaporating, resulting in upwards of 1,300 - 1,600 millimeters of evaporated water per year in this desert area! The result is that the waters of the Dead Sea have the highest salinity and density of any sea in the world, too high to support life. Because energy is required to break the bonds holding water molecules together evaporation removes heat from the environment, leading to a net cooling.' +
    "A watershed is an area of land that drains all the streams and rainfall to a common outlet such as the outflow of a reservoir, mouth of a bay, or any point along a stream channel . Watersheds can be as small as a footprint or large enough to encompass all the land that drains water into rivers that drain into Chesapeake Bay, where it enters the Atlantic Ocean. This map shows one set of watershed boundaries in the continental United States; these are known as National hydrologic units (watersheds)." +
    " Soil characteristics: In Georgia, clayey and rocky soils of the northern areas absorb less water at a slower rate than sandy soils, such as in Georgia's Coastal Plain. Soils absorbing less water results in more runoff overland into streams."

}

document.addEventListener('keydown', function(event) {
    capsLockOn = event.getModifierState('CapsLock');
    const caps = document.querySelector('#capsBtn')
    caps.textContent = capsLockOn ? 'CAPS ON' : 'CAPS OFF'
    caps.style.background = capsLockOn ? 'chartreuse' : 'lightgrey'
});

let row0 = ['1!','2@','3#', '4$',
           '5%', '6^','7&', '8*', '9(', '0)']

const row1 = [...'QWERTYUIOP']
let row2 = [...'ASDFGHJKL']
    row2 = ['CAPS:', ...row2]
let row3 = [...'ZXCVBNM']
    row3 = ['Shift', ...row3]

const allRows = [row0,row1, row2, row3]
const board = document.getElementById('keyboard-container')

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
renderKeys(allRows)

const allTiles =  [...document.querySelectorAll('.tile')]
const shiftBTN  = document.querySelector('.shift')

function updateHighlights(letter) {
  shiftBTN.style.background = 'none'
  allTiles.forEach(tile => tile?.classList?.remove('hasHighlight'))
  const newTarget = allTiles.find(tile => tile?.textContent.includes(letter.toUpperCase()))
  newTarget?.classList?.add('hasHighlight')

  if (shiftNeeded.includes(text[currentCharCount])) {
    shiftBTN.style.background = 'yellow'
  }
}
const capsChars = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']
const shiftNeeded = [...'!@#$%^&*()_+{}:"<>?', ...capsChars]
const hideBtn = document.querySelector('.hide')

hideBtn.onclick = () => {
  document.querySelector('#keyboard-container').style.display = 'none'
  hideBtn.disabled = true
  hideBtn.textContent = 'Keyboard Hidden'
}
