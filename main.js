const display = document.getElementById("display");
const displayEl = document.getElementById("display2");
let step = false;
let dot = false;
let specialChar = ["+", "-", "*", "/", "×","÷","%","%"];
let result = 0;
let num = ["1", "2", "3", "4", "5","6","7","8","9"];
let operator_prevent = num.join('+');
let prevent = operator_prevent.match(/\d+\+/g);
let Num_Operator = [prevent];
let operators = false;
let dotClicked = false; 
let slide =false;
let historyArray =[];
let ended_result = true;
let ended_result2 = true;
let ended = true;
let Zero = false;
let Zero1 = false;
let clear = true;
let Dot_after =true;
document.addEventListener('keydown', function (event) {
  const originalKey = event.key;
  let fakekey = originalKey;

  if(/\d/.test(originalKey) || ['+', '-', '*', '/','.','('].includes(originalKey)) {
      fakekey = fakekey.replace(/\*/g, '×').replace(/\//g, '÷');
      number(fakekey);
      numbers(originalKey);
  } else if(event.keyCode === 13) {
      Calculator();
  } else if(originalKey === 'Delete') { 
      clearDisplay(); 
  } else if(originalKey === 'Backspace') {  
      deletes();
  }
});
let i ;
function number(input){
let string = display.value;
var lastChar = string.slice(-1);
var secondchar = string[string.length-2];
let splitstring = string.split('')
for( i = 0 ; i<splitstring.length ; i++){
  if(i>10){
    return;
  } 
}
if(input === '0'){
  if(display.value === '0' && lastChar === '0'){
    display.value = '0';
  }
  else if(Zero){
    display.value += input;
    return;
  }
  else if(lastChar == "0"){
    display.value += input;
    return;
  }else if(clear == false){
    display.value += input;
    clear = true;
    return;
  }
  else if(dot == true){
    display.value += input;
    clear = false;
    return;
  }
  else if(specialChar.includes(lastChar)){
    return;
  }
  else{
    display.value += input;
  }
}
if (num.includes(input)) {
  playAlertSound1()
  if(ended_result === false){
    display.value = input;
    ended_result = true;
  }
  if(clear == false){
    display.value = input;
    clear = true;
  }
  else if(dot == true){
    display.value += input;
    clear = false;
    return;
  }
  else if(display.value == "Error Syntax" || display.value == "Infinity" || display.value == "infinite" ){
    display.value = input;
  }
  else if(display.value === "0"){
    display.value = display.value.slice(0,-1) + input;
  }
  else if(lastChar === "0" && specialChar.includes(secondchar)){
    display.value = display.value.slice(0,-1) + input;
  }
  else if(display.value === "0" || lastChar === "0" ){
    if(num.includes(input)){
      display.value += input; 
    }
  }
  else{
    display.value += input;
  }
}
else if(specialChar.includes(lastChar) && input !== '.'){
  display.value = display.value.slice(0,-1) + input;
  return;
}
if(step === false){
  if(display.value === "" && input === '.'){
    display.value = `0${input}`;
    step = true;
    dot = true;
  }   
}      
if(specialChar.includes(input)){
  playAlertSound1()
  clear = true;
  dot = false;
  if(ended_result === false){
    display.value = `0${input}`;
    ended_result = true;
  }
  if(input === "%"){
    display.value = display.value/100;
    return;
  }
  else if(lastChar === "."){
    display.value = display.value.slice(0,-1) + input;
  }
  else if(parseFloat(display.value) === 0  && lastChar === '0'){
    display.value = `0${input}`;
  }
  else if (!display.value){
    display.value += `0${input}`;
  }
  else{
      display.value += input;
  }
  dot = false;
}
if(dot === false && input === '.'){
  if(specialChar.includes(lastChar)){
      display.value += '0.'; 
      Zero = true;
  } 
  else{
    display.value +=input;
 
    Zero = true;
  }
  dot = true;
  Dot_after = false;
}
}
let steps = false;
let dots = false;
function numbers(input){
let string = displayEl.value;
var lastChar = string.slice(-1);
var secondchar = string[string.length-2];
let splitstring = string.split('')
for( i = 0 ; i<splitstring.length ; i++){
  if(i>10){
    return;
  }
}
if(input === '0'){
  if(displayEl.value === '0' && lastChar === '0'){
    displayEl.value = '0';
  }
  else if(Zero1){
    displayEl.value += input;
    return;
  }
  else if(lastChar == "0"){
    displayEl.value += input;
    return;
  }
  else if(specialChar.includes(lastChar)){
    return;
  }
  else{
    displayEl.value += input;
  }
}
if (num.includes(input)) {
  clear = true;
  if(ended_result2 === false){
    displayEl.value = input;
    ended_result2= true;
  }
  else if(displayEl.value == "Error Syntax" || displayEl.value == "Infinity"){
    displayEl.value = input;
  } 
  else if(displayEl.value === "0"){
    displayEl.value = displayEl.value.slice(0,-1) + input;
  }
  else if("0".includes(lastChar) && specialChar.includes(secondchar)){
    displayEl.value = displayEl.value.slice(0,-1) + input;
  }
  else if(displayEl.value === "0" || lastChar === "0" ){
    if(num.includes(input)){
      displayEl.value += input;
    }
  }
  else{
    displayEl.value += input;
  }
}
if(specialChar.includes(lastChar) && input !== '.'){
  displayEl.value = displayEl.value.slice(0, -1) + input;
  return;
}
if(specialChar.includes(input)){
  if(ended_result2 === false){
    displayEl.value = `0${input}`;
    ended_result2 = true;
  }
  else if(lastChar === "."){
    displayEl.value = displayEl.value.slice(0,-1) + input;
  }
  else if(parseFloat(displayEl.value) === 0  && lastChar === '0'){
    displayEl.value = `0${input}`;
  }
  else if (!displayEl.value){
    displayEl.value += `0${input}`;
  }
  else{
    displayEl.value += input;
  }
  dots = false; 
}
if(steps === false){
  if(displayEl.value === "" && input === '.'){
    displayEl.value = `0${input}`;
    steps = true;
    dots = true;

  }   
}
if(dots === false && input === '.'){
  if(specialChar.includes(lastChar)){
      displayEl.value += '0.';
      Zero1 = true;
   }
  else{
    displayEl.value +=input;
    Zero1 = true;
  }
  dots = true;
}
}
function clearDisplay(){
    playAlertSound();
    display.value = "";
    displayEl.value = "";
    step =  false;
    steps = false;
    dots = false;
    dot = false;
    ended_result2 = true;
    ended_result = true;
    Zero1 = false;
    Zero = false; 
}
function playAlertSound() {
  var audio = new Audio(); 
  audio.play();
}
function playAlertSound1() {
  var audio1 = new Audio();   
  audio1.play();
} 
// Define a variable to hold the previous result
let previousResult = 0;

function Calculator() {
  var lastChar = display.value.slice(-1);
  clear = false;
  dot = true;
  // Check if the last character is an operator
  if ("+ , -".includes(lastChar)) {
    display.value = display.value.slice(0, -1);
    displayEl.value = displayEl.value.slice(0, -1);
  } else if ("* , / , × , ÷ ".includes(lastChar)) {
    let last = displayEl.value.slice(0, -1);
    if ("/ , ÷ ".includes(lastChar) && last != "0") {
      let total = Function(`'use strict'; return (${last})`)();
      display.value = total / total;
      previousResult = total; // Store the result
      return;
    } else if ("/ , ÷ ".includes(lastChar) && display.value == "1/0") {
      display.value = "∞"
      return;
    } else if ("* , × ".includes(lastChar)) {
      let total = Function(`'use strict'; return (${last})`)();
      display.value = total * total;
      previousResult = total; // Store the result
      return;
    }
  }
  // Retrieve the expression from the display element
  var expression = displayEl.value;
  
  try {
    // Attempt to evaluate the expression
    result = Function(`'use strict'; return (${e = expression})`)();
    
    // Check if the result is NaN
    if (isNaN(result)) {
      display.value = result.slice(0, -1);
      return;
    }
    
    // Update the display with the result
    display.value = result;
    displayEl.value = result;
    
    // Store the result as the previous result for future calculations
    previousResult = result;
  } catch (error) { 
    // Handle syntax errors
    display.value = 'Error Syntax';
    displayEl.value = 'Error Syntax';
  }
  
  // Format the expression for display in the history
  e = e.replace(/\*/g, '×');
  e = e.replace(/\//g, '÷');
  
  // Update the history display
  if (displayEl.value !== "" && display.value !== "" && display.value !== "Error Syntax" && display.value !== "undefined" && display.value !== "0") {
    historyArray.push(`${e} = ${result}`)
    let storehistory = historyArray.map(item => `<hr>${item}<hr>`).join('');
    // historyEl.innerHTML = storehistory;
  }
   // Set the display value to the result
   display.value = result;
}

function ClearHistory(){
  // historyEl.innerText = "";
  historyArray.length = 0;
}
function deletes(){
  var lastChar1 = display.value.slice(-1);
    if(!display.value){
    }
    if(display.value.slice(-1) == "."){
      Zero = false;
      Zero1 = false;
    }
    if(specialChar.includes(lastChar1)){
    dot = false;
    dots = false;
    }
    if(!display.value || display.value === "0"){
      step = false;
      steps = false;
      display.value ="";
      displayEl.value ="";
    }
    else if(display.value === "Error Syntax" || ended_result2 === false ){
      display.value ="";
      displayEl.value ="";
      ended_result2 = true;
      ended_result = true;
    }
    else if(".".includes(lastChar1)){
      display.value = display.value.substring(0,display.value.length - 1);
      displayEl.value = displayEl.value.substring(0,displayEl.value.length - 1);
      dot = false;
      dots = false;
    }
    else if("+-*/".includes(lastChar1) && Dot_after === false){
      display.value = display.value.substring(0,display.value.length - 1);
      displayEl.value = displayEl.value.substring(0,displayEl.value.length - 1);
      dot = true;
      dots = true;
    }
    else{
      display.value = display.value.substring(0,display.value.length - 1);
      displayEl.value = displayEl.value.substring(0,displayEl.value.length - 1);
    }
}

