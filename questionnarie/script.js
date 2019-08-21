// getting all DOM elements to work with 
var getHeading = document.getElementById('heading');
var getQuestion = document.getElementById('question');
var getInput = document.getElementById('input-holder');
var getButton = document.getElementById('buttons');
var getAnswer = document.getElementById('answer');

//slide renderer vars
var slidesCount;
var slideTitle;
var slideQuestion;
var slideAnswerType;
var slideButtonNumber;
var slideAnswersNumber;

// global presentation vars
var slideNumber = 0; // start with first slide // 
var questionScore;
var questionAggregate;
var historyLog;
var enableButton;
var historyLog = new Array;
var dataFromHistory = new Array;

// navigation between slides variables 
var previousQuestion;
var nextQuestion = 1;

function drawSlide(slideNumber) {
  // clear-up slide from previous details
    clearDom();

  // if nothing found in history log initialize as new
    initializeVariables(slideNumber);

  // draw the slide
  renderSlide(slideNumber);

  enableButtonFromHistory();
  
  showResults();
}


function enableButtonFromHistory() {
  
  if(enableButton && dataFromHistory) {
    checkForm(enableButton, dataFromHistory);
  }
}

function renderSlide(slideNumber, dataFromHistory){

   //recording slide number in data-slide attribute for recordHistory function 
   getAnswer.setAttribute('data-slide', slideNumber);

   // draw titile and the question 
   getHeading.innerHTML = slideTitle;
   getQuestion.innerHTML = slideQuestion;

   // if slide contains input draw it  
   if(slideAnswerType == 'input') { 
     drawInput(slideNumber, slideAnswersNumber);
     questionScore += slideAnswersNumber;
   }

   if(slideAnswerType == 'radio') { 
     drawRadioButtons(slideNumber, slideAnswersNumber);
     questionScore += 1;
   }

   if(slideAnswerType == 'checkbox') { 
     drawCheckbox(slideNumber, slideAnswersNumber);
     questionScore += 1;
   }

   if(slideAnswerType == 'select') { 
     drawSelect(slideNumber, slideAnswersNumber);
     questionScore += 1;
   }

   if(slideAnswerType == 'textarea') { 
     drawTextarea(slideNumber, slideAnswersNumber);
     questionScore += slideAnswersNumber;
   }

   // draw buttons 
   if(slideButtonNumber > 0)
   {
     drawButtons(slideNumber, slideButtonNumber);
   }
}
function initializeVariables(slideNumber){
  // getting the data from the array 
  slidesCount = klausimynas.length;
  slideTitle = klausimynas[slideNumber].title || '';
  slideQuestion = klausimynas[slideNumber].klausimas || '';
  slideAnswerType = klausimynas[slideNumber].tipas || '';

  slideButtonNumber = (klausimynas[slideNumber].buttons == undefined  ? 0 : klausimynas[slideNumber].buttons.length);
  slideAnswersNumber = (klausimynas[slideNumber].atsakymai == undefined ? 0 : klausimynas[slideNumber].atsakymai.length);
}


// empty the DOM and read the values from the string
function clearDom(){
    // Clearing the DOM for new slide

    getHeading.innerHTML = '';
    getQuestion.innerHTML = '';
    getInput.innerHTML = '';
    getAnswer.innerHTML = '';
    getButton.innerHTML = '';

    //clearing answers verification
    questionScore = 0;
  }
          //////////////////////////
          // Drawers of the forms //
          //////////////////////////

function drawInput(slideNumber, slideAnswersNumber){
  retrieveHistoricalData(slideNumber);
  
  for(i=0; i < slideAnswersNumber;i++) {
    
    input = document.createElement('input');
    label = document.createElement('label');
    br = document.createElement('br');
    div = document.createElement('div');
    if(klausimynas[slideNumber].atsakymai[i].kitas_klausimas) {
      input.setAttribute('data-nq', klausimynas[slideNumber].atsakymai[i].kitas_klausimas);
    }
    label.innerText = klausimynas[slideNumber].atsakymai[i].pavadinimas;
    label.setAttribute('for', klausimynas[slideNumber].atsakymai[i].pavadinimas);
    input.setAttribute('type', 'text');
    input.setAttribute('oninput', 'checkInput();');
    if(dataFromHistory) {
      input.value = dataFromHistory[i];
      nextQuestionSetter(input);
    }
    input.setAttribute('id', klausimynas[slideNumber].atsakymai[i].pavadinimas);
    div.appendChild(label);
    div.appendChild(br);
    div.appendChild(input);
    getInput.appendChild(div);
  }
}

// takes slide number and number of buttons to draw disables them where necessary
function drawButtons(slideNumber, slideButtonNumber){
  for(i=0; i < slideButtonNumber;i++) {
    var buttonDisable = !Boolean(klausimynas[slideNumber].buttons[i].enabled);
    var func = klausimynas[slideNumber].buttons[i].tekstas;
    var button = document.createElement('input'); 
    var nextSlide = slideNumber;

    var previousSlide;

        button.setAttribute('type', 'button');
        button.setAttribute('id', klausimynas[slideNumber].buttons[i].tekstas);
        button.setAttribute('value', klausimynas[slideNumber].buttons[i].tekstas);
          if(buttonDisable) {button.setAttribute('disabled', buttonDisable);}
          if(func == 'pirmyn') {button.setAttribute('onclick', 'nextQ();');};
          if(func == 'atgal') {button.setAttribute('onclick', 'previousQ();');};
          if(func == 'pateikti') {button.setAttribute('onclick', 'showResults();');};
          if(func == 'spausdinti') {button.setAttribute('onclick', 'window.print()');};
          if(func == 'pabaiga') {button.setAttribute('onclick', "alert('Galite uždaryti šį langą')");};
        getButton.appendChild(button);

  }
}
function drawRadioButtons(slideNumber, slideAnswersNumber){
  retrieveHistoricalData(slideNumber);
  
  for(i=0; i < slideAnswersNumber;i++) {
    var radio = document.createElement('input');
    var lable = document.createElement('label');
    var br = document.createElement('br');
    if(klausimynas[slideNumber].atsakymai[i].kitas_klausimas) {
      radio.setAttribute('data-nq', klausimynas[slideNumber].atsakymai[i].kitas_klausimas);
    }
    radio.setAttribute('name', slideNumber);
    radio.setAttribute('id', i);
    lable.setAttribute('for', i);
    radio.setAttribute('type', 'radio');
    radio.setAttribute('data-nq', klausimynas[slideNumber].atsakymai[i].kitas_klausimas);
    radio.setAttribute('onchange', 'checkRadio();');
    radio.setAttribute('value', klausimynas[slideNumber].atsakymai[i].pavadinimas);
    lable.innerText = klausimynas[slideNumber].atsakymai[i].pavadinimas;
    if(dataFromHistory == lable.innerText) {
      radio.setAttribute('checked', 'true');
      nextQuestionSetter(radio);
    }
    getInput.appendChild(radio);
    getInput.appendChild(lable);
    getInput.appendChild(br);
  }
}
function drawCheckbox(slideNumber, slideAnswersNumber){
  retrieveHistoricalData(slideNumber);
  for(i=0; i < slideAnswersNumber;i++) {
    var checkbox = document.createElement('input');
    var label = document.createElement('label');
    var br = document.createElement('br');
    if(klausimynas[slideNumber].atsakymai[i].kitas_klausimas) {
      checkbox.setAttribute('data-nq', klausimynas[slideNumber].atsakymai[i].kitas_klausimas);
    }
    checkbox.setAttribute('name', klausimynas[slideNumber].atsakymai[i].pavadinimas);
    checkbox.setAttribute('id', klausimynas[slideNumber].atsakymai[i].pavadinimas);
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('onclick', 'checkCheckbox();');
    label.setAttribute('for', klausimynas[slideNumber].atsakymai[i].pavadinimas);
    checkbox.setAttribute('value', klausimynas[slideNumber].atsakymai[i].pavadinimas);
    
    
    if(dataFromHistory) {
      if(dataFromHistory[i] != null){
        checkbox.setAttribute('checked', 'true');
        nextQuestionSetter(checkbox);
      }
    }

    label.innerText = klausimynas[slideNumber].atsakymai[i].pavadinimas;
    getInput.appendChild(checkbox);
    getInput.appendChild(label);
    getInput.appendChild(br);
  }
}
function drawSelect(slideNumber, slideAnswersNumber){
  retrieveHistoricalData(slideNumber);
  var select = document.createElement('select');
  select.setAttribute('onchange', 'checkSelect()');
  getInput.appendChild(select);
  var blankOption = document.createElement('option');
  select.appendChild(blankOption);
  for(i=0; i < slideAnswersNumber;i++) {
    var option = document.createElement('option');
    if(klausimynas[slideNumber].atsakymai[i].kitas_klausimas) {
      select.setAttribute('data-nq', klausimynas[slideNumber].atsakymai[i].kitas_klausimas);
    }
    option.setAttribute('value', klausimynas[slideNumber].atsakymai[i].pavadinimas);
      if(dataFromHistory){
       if(dataFromHistory == option.value) {
        option.setAttribute('selected', 'true');
        nextQuestionSetter(select);
      } 
      }
    option.innerText = klausimynas[slideNumber].atsakymai[i].pavadinimas;
    select.appendChild(option);
  }
}

function drawTextarea(slideNumber, slideAnswersNumber){
  retrieveHistoricalData(slideNumber);

  for(i=0; i < slideAnswersNumber;i++) {

    var textarea = document.createElement('textarea');
      if(dataFromHistory){
        textarea.value = dataFromHistory;
        nextQuestionSetter(textarea);
    }
    textarea.setAttribute('oninput', 'checkTextArea();');
    if(klausimynas[slideNumber].atsakymai[i].kitas_klausimas) {
      textarea.setAttribute('data-nq', klausimynas[slideNumber].atsakymai[i].kitas_klausimas);
    }
    textarea.setAttribute('name', klausimynas[slideNumber].atsakymai[i].pavadinimas);
    getInput.appendChild(textarea);
  }
}
          //////////////////////////
          // Checkers of the form //
          //////////////////////////

function checkForm(questionAggregate, result){
  var button = (document.querySelector('#pirmyn') ? document.querySelector('#pirmyn') : document.querySelector('#pateikti'));
  if(questionScore <= questionAggregate) {
    button.removeAttribute('disabled');
    //when all details collected and user ready to click next 
    //record the values 
    recordHistory(result);
  } else if(questionScore > questionAggregate){
    button.setAttribute('disabled', 'true'); 
  } else if(questionAggregate == 'enable'){
    button.removeAttribute('disabled');
  } 
    else {
    button.removeAttribute('disabled');
  }
}

function checkInput(){
  var allInputs = document.querySelectorAll("input[type=text]");
  var array = new Array();
  for(i=0; i < allInputs.length; i++) {
    if(allInputs[i].value == '') {
    } else { 
      array[i] = allInputs[i].value;
      nextQuestionSetter(allInputs[i]);
      var result = array.filter(element => element.length > 0);
      var inputScore = result.length;
      inputScore = parseInt(inputScore);
      checkForm(inputScore, result);
    }
  }
}  
function checkRadio(){
  var radioScore = 1;
  var getButton = document.querySelector('#pirmyn');
  var getChosenValue = document.querySelectorAll('input[type=radio]');
  var result;
    for(i=0; i<getChosenValue.length; i++){
      if(getChosenValue[i].checked){
        result = getChosenValue[i].value;
        nextQuestionSetter(getChosenValue[i]);
        }
    }
  radioScore = parseInt(radioScore);
  checkForm(radioScore, result);
}

function checkCheckbox(){
  var allCheckboxes = document.querySelectorAll('input[type=checkbox]');
  var allLabels = document.querySelectorAll('label');
  var array = new Array();
  var arrayForLabels = new Array();
  var checkboxScore;
  // var checked;
  for(i=0; i <allCheckboxes.length; i++) {
    if (allCheckboxes[i].checked == true) {
      array[i] = allCheckboxes[i].checked ;
      arrayForLabels[i] = allLabels[i].getAttribute('for');
      nextQuestionSetter(allCheckboxes[i]);
      var result = array.filter(Boolean);
      checkboxScore = result.length;
      checkboxScore = parseInt(checkboxScore);
      checkForm(checkboxScore, arrayForLabels);
    } else {
      array[i] = allCheckboxes[i].checked;
      arrayForLabels[i] = null;
      var result = array.filter(Boolean);
      checkboxScore = result.length;
      checkboxScore = parseInt(checkboxScore);
      checkForm(checkboxScore, arrayForLabels);
    }
  }
}

function checkSelect(){
  var selectEl = document.querySelector('select');
  var selectValue = document.querySelector('select').value;
  if(selectValue !=''){
      nextQuestionSetter(selectEl);
      checkForm(1, selectValue);
    } else {
      checkForm(0);
    }
}
function checkTextArea(){
  var textArea = document.querySelector('textarea');
  var altButton = document.querySelector('#pateikti');
  if(textArea.value != ''){
    checkForm(1, textArea.value);
    nextQuestionSetter(textArea);
  }else{
    checkForm(0, textArea.value);
  }
}

function recordHistory(array){
  var currentSlide = document.querySelector('#answer');
  var currentSlideNumber = currentSlide.dataset.slide;
  historyLog[currentSlideNumber] = array;
}

function showResults(){

  var resultsPlaceholder = document.querySelector('#answer');
  //nullifying resultsPlaceholder if button is pressed more than once 
  resultsPlaceholder.innerHTML = '';
  // skipping first slide, since it's not a form value
  var navButtonHolder = document.createElement('div');
  navButtonHolder.setAttribute('class', 'navButtonHolder');
  resultsPlaceholder.appendChild(navButtonHolder);
  for(i=1; i < historyLog.length; i++){
    if(historyLog[i] != undefined) {
      var button = document.createElement('input');
          button.setAttribute('type', 'button');
          button.setAttribute('value', i);
          button.setAttribute('onclick', 'drawSlide('+i+')');
          navButtonHolder.appendChild(button);
      var heading = document.createElement('strong');
      var paragraph = document.createElement('p');
      var br = document.createElement('br');
      heading.innerHTML = i + '. ' + klausimynas[i].klausimas;
      resultsPlaceholder.appendChild(heading);
      
      if(Array.isArray(historyLog[i])){
        for (j=0; j<historyLog[i].length; j++) {
          if(historyLog[i][j] != null && historyLog[i][j] != undefined && historyLog[i][j] != '' ){
            paragraph.innerHTML += historyLog[i][j];
            resultsPlaceholder.appendChild(paragraph);
            paragraph.appendChild(br);
          }
        } 
      } else {
        paragraph.innerHTML = historyLog[i];
        resultsPlaceholder.appendChild(paragraph);
      } // else it should be skipped entirely 
    }
  }
}  

function retrieveHistoricalData(slideNumber){
  if(historyLog[slideNumber]){
    dataFromHistory = historyLog[slideNumber];
    enableButton = 'enable';
  } else {
    dataFromHistory = null;
  }
}
            //////////////////////////////////////
            // previous and next question logic //
            //////////////////////////////////////


function previousQ () {
  if(previousQuestion > 0 ){
  // console.log(`next question is ${nextQuestion}, and previous question was ${previousQuestion}`);
  drawSlide(previousQuestion);
  previousQuestionSetter();
  previousQuestion--;
  } else {
    previousQuestionSetter();
    drawSlide(previousQuestion);
  }
}

function nextQ () {
previousQuestionSetter();
  // console.log(`next question is ${nextQuestion}, and previous question was ${previousQuestion}`);
  drawSlide(nextQuestion);
}

function nextQuestionSetter(element) {
  var currentSlide = document.querySelector('#answer').dataset.slide;
  if(element) {
    if(element.dataset.nq) {
      nextQuestion = parseInt(element.dataset.nq);
    } 
  }
}

function previousQuestionSetter(){
  previousQuestion = document.querySelector('#answer').dataset.slide;
  previousQuestion = parseInt(previousQuestion);

}
drawSlide(0);