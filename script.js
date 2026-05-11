const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let memory = 0;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.dataset.value;
    const action = button.dataset.action;

    if (value) appendValue(value);
    else if (action) handleAction(action);
  });
});

function appendValue(value) {
  if (display.value === '0' && value !== '.') display.value = value;
  else display.value += value;
}

function handleAction(action) {
  switch(action) {
    case 'clear':
      display.value = '';
      break;
    case 'delete':
      display.value = display.value.slice(0, -1);
      break;
    case 'calculate':
      calculate();
      break;
    case 'sqrt':
      display.value = Math.sqrt(parseFloat(display.value)) || 'Error';
      break;
    case 'square':
      display.value = Math.pow(parseFloat(display.value), 2) || 'Error';
      break;
    case 'cube':
      display.value = Math.pow(parseFloat(display.value), 3) || 'Error';
      break;
    case 'inverse':
      display.value = display.value != 0 ? (1 / parseFloat(display.value)) : 'Error';
      break;
    case 'negate':
      display.value = parseFloat(display.value) * -1 || '0';
      break;
    case 'percent':
      display.value = parseFloat(display.value) / 100 || '0';
      break;
    case 'mc':
      memory = 0;
      break;
    case 'mr':
      display.value = memory;
      break;
    case 'mplus':
      memory += parseFloat(display.value) || 0;
      break;
    case 'mminus':
      memory -= parseFloat(display.value) || 0;
      break;
  }
}

function calculate() {
  try {
    let result = Function('"use strict";return (' + display.value + ')')();
    display.value = Number.isFinite(result) ? parseFloat(result.toFixed(10)) : 'Error';
  } catch {
    display.value = 'Error';
  }
}

// Keyboard support
document.addEventListener('keydown', e => {
  if ((e.key >= '0' && e.key <= '9') || ['/', '*', '-', '+', '.'].includes(e.key)) appendValue(e.key);
  else if (e.key === 'Enter') calculate();
  else if (e.key === 'Backspace') display.value = display.value.slice(0, -1);
  else if (e.key.toLowerCase() === 'c') display.value = '';
});
