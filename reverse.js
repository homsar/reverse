function copyText () { // eslint-disable-line no-unused-vars
  /* Thanks to w3schools https://www.w3schools.com/howto/howto_js_copy_clipboard.asp */

  // Get the text field
  const copyText = document.getElementById('to')

  // Select the text field
  copyText.select()
  copyText.setSelectionRange(0, 99999) // For mobile devices

  // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value)
}

function reverseSingleName (name) {
  const splitName = name.split(' ')
  if (splitName.length === 2) {
    return splitName.reverse().join(' ')
  } else {
    return name
  }
}

function reverseLine (theLine) {
  let outputLine = ''
  let currentName = ''

  for (let charIdx = 0; charIdx < theLine.length; charIdx++) {
    let currentChar = theLine[charIdx]

    if ((charIdx === theLine.length - 1) && (currentChar !== ')')) {
      currentName = currentName + currentChar
      outputLine = outputLine + reverseSingleName(currentName)
    } else if ('),:'.includes(currentChar)) {
      outputLine = outputLine + reverseSingleName(currentName) + currentChar
      currentName = ''
    } else if ('('.includes(currentChar)) {
      if (currentName.substring(currentName.length - 1) === ' ') {
        currentChar = ' ' + currentChar
        currentName = currentName.substring(0, currentName.length - 1)
      }
      outputLine = outputLine + reverseSingleName(currentName) + currentChar
      currentName = ''
    } else {
      currentName = currentName + currentChar
      if (currentName.substring(currentName.length - 5) === ' and ') {
        outputLine = outputLine + reverseSingleName(currentName.substring(0, currentName.length - 5)) + ' and '
        currentName = ''
      } else if (/^CV[^A-Za-z0-9]? $/.test(currentName)) {
        outputLine = outputLine + 'CV: '
        currentName = ''
      } else if ((currentName === ' ') || (currentName === 'and ')) {
        outputLine = outputLine + currentName
        currentName = ''
      }
    }
  }
  return outputLine
}

function reverseAll (theText) {
  return theText.split('\n').map(reverseLine).join('\n')
}

window.onload = function () {
  const fromText = document.getElementById('from')
  const toText = document.getElementById('to')

  fromText.addEventListener(
    'input', function () {
      toText.value = reverseAll(fromText.value)
    }
  )
}
