let equalButtonClicked = false;
let decimalClicked = false;
let valMemStored = "";
let classes = "";
let targetVal = "";
let oppButtons = [];
let memButtons = [];
let hasOverflow = false;
let str = "";

let Calculator = {
  onClick: function(e) {
    init(e);
    if (classes === "calcbutton calc-button-red calc-button-big") {
      mathButtonPress(targetVal);
    } else if (classes === "calcbutton calc-button-yellow calc-button-big") {
      equalButtonPress();
    } else if (classes === "calcbutton calc-button-gray") {
      //Memory button press
    } else if (classes === "calcbutton") {
      if (targetVal === "C") {
        clearButtonPress();
      } else {
        numButtonPress(targetVal);
      }
    }
  }
};

const init = e => {
  classes = e.target.className;
  targetVal = e.target.innerHTML;
  oppButtons = document.getElementsByClassName("calc-button-red");
  memButtons = document.getElementsByClassName("calc-button-gray");
  showMathOperatorButtons();
  showMemOperatorButtons();
};
//Number button clicked function
const numButtonPress = num => {
  console.log("num button has been pressed ");
  //clear overflow message
  if (hasOverflow) {
    hasOverflow = false;
    clearButtonPress();
  }
  //clear total value if equal button is previously clicked 
  if (equalButtonClicked) {
    str = "";
    equalButtonClicked = false;
  }
  //not allow multiple periods
  if (num === ".") {
    if (decimalClicked != true) {
      str += num;
      decimalClicked = true;
    }
  } else {
    str += num;
  }
  printOutput(str);
};

//Math Button clicked function
const mathButtonPress = operator => {
  console.log("math button has been pressed");
  //total value should be string if equal button is previously clicked 
  if (equalButtonClicked) {
    str = new String(str);
    equalButtonClicked = false;
  }
  //if num button is previously clicked then str=0
  if (str == "") {
    str = "0";
  }
  //multiplication operator
  if (operator == "x") {
    operator = "*";
  }
  //division operator
  if (operator == "÷") {
    operator = "/";
  }
  //add operator when last char is number
  if (Number.isInteger(parseInt(str.slice(-1)))) {
    str += operator;
  } else {
    str = str.slice(0, -1) + operator;
  }
  decimalClicked = false;  
  printOutput(str);
};
//Equal button clicked function
const equalButtonPress = () => {
  console.log("equal button has been pressed");
  decimalClicked = false;
  ////clear overflow message
  if (hasOverflow) {
    hasOverflow = false;
    clearButtonPress();
    return;
  }
  //display tatal value
  if (!divisionOverflow(str)) {
    if (!Number.isInteger(parseInt(str.slice(-1)))) {
      str = str.slice(0, -1);
    }
    str = eval(str + " ");
    equalButtonClicked = true;
    hasOverflow = false;
    printOutput(str);
  }
};
// Devision overflow function
const divisionOverflow = str => {
  if (str.includes("0/0")) {
    printOutput("Result is undefined");
    hasOverflow = true;
  } else if (str.includes("/0")) {
    printOutput("Cannot devide by zero");
    hasOverflow = true;
  } else {
    hasOverflow = false;
  }
  //hide buttons
  if (hasOverflow) {
    hideMathOperatorButtons();
    hideMemOperatorButtons();
  }
  return hasOverflow;
};

const clearButtonPress = () => {
  console.log("clear button has been pressed");
  str = "";
  decimalClicked = false;
  printOutput(0);
};

const copyButtonPress = num => {
  console.log("Mem copy button has been pressed");
  valMemStored = document.getElementById("output").value;
};

const pasteButtonPress = num => {
  console.log("Mem paste button has been pressed");
  if (valMemStored) {
    document.getElementById("output").value = valMemStored;
  }
  curVal = valMemStored;
};

//Display number in commas format
const getFormattedNumber = num => {
  if (num == "-") {
    return "";
  }
  //num is string
  if (num.constructor === String) {
    num = num.replace(/\*/g, "x");
    num = num.replace(/\//g, "÷");
    return num;
  }
  //num is integer or float
  let n = Number(num);
  return n.toLocaleString("en");
};

const reverseFormattedNumber = num => {
  return Number(num.replace(/ ,/g, ""));
};

const hideMathOperatorButtons = () => {
  for (let i = 0; i < oppButtons.length; i++) {
    oppButtons[i].style.display = "none";
  }
};

const showMathOperatorButtons = () => {
  for (let i = 0; i < oppButtons.length; i++) {
    oppButtons[i].style.display = "block";
  }
};

const hideMemOperatorButtons = () => {
  for (let i = 0; i < memButtons.length; i++) {
    memButtons[i].style.display = "none";
  }
};

const showMemOperatorButtons = () => {
  for (let i = 0; i < memButtons.length; i++) {
    memButtons[i].style.display = "block";
  }
};

const printOutput = num => {
  if (num == "") {
    document.getElementById("output").value = num;
  } else {
    document.getElementById("output").value = getFormattedNumber(num);
  }
};
