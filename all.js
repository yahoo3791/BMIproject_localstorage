const newsHeight = document.querySelector('.newsHeight') ;
const newsKg = document.querySelector('.newsKg');
const resultBtn = document.querySelector('.result');
const resultList = document.querySelector('.resultList');
const reload = document.querySelector('.reload');
const resultInner = document.querySelector('.resultInner');
let getData = JSON.parse(localStorage.getItem("list"))|| [];

resultBtn.addEventListener('click', () => {
  let heightValue = newsHeight.value;
  let KgValue = newsKg.value;


  if (heightValue == ''){
    alert('請輸入身高');
    return;
  }else if(KgValue == ''){
    alert('請輸入體重');
    return;
  };

  calBmi();
  let obj = {
    cal:cal,
    bmi:bmi,
    cm : heightValue,
    kg : KgValue
  }
  getData.push(obj);
  console.log(getData);
  localStorage.setItem("list",JSON.stringify(getData));
  display();
  checkColor();

  heightValue = '';
  KgValue = '';
});

let cal;
let bmi;
function calBmi(){
  let Heightm = (newsHeight.value)* 0.01;
  cal = (newsKg.value / (Heightm * Heightm)).toFixed(1);
  console.log(cal); //bmi anser
  //運算bmi正常範圍
  if( cal < 18.5){
    bmi = '過輕';
  }else if(cal >= 18.5 && cal < 24){
    bmi = '理想';
  }else if(cal >= 24 && cal < 27){
    bmi = '過重';
  }else if(cal >= 27 && cal < 30){
    bmi = '輕度肥胖';
  }else if(cal >= 30 && cal < 35){
    bmi = '中度肥胖';
  }else(bmi = '重度肥胖');
}

function display(){
  let today = new Date();
  let getMonth = ("0" + (today.getMonth() + 1)).slice(-2);
  let getDate = today.getDate();
  let getFullYear = today.getFullYear();
  let str = '<h3 class="resultTitle">BMI紀錄</h3>';
  let len = getData.length;
  for(let i = 0; i<len; i++){
    str += `<li class="resultItem d-flex justify-content-around">
        <p>${getData[i].bmi}</p>
        <p><span>BMI </span>${getData[i].cal}</p>
        <p><span>weight </span>${getData[i].kg}</p>
        <p><span>height </span>${getData[i].cm}</p>
        <p><span>date </span>${getMonth+'-'+getDate+'-'+getFullYear}</p>
      </li>`;
  }
resultList.innerHTML = str;
  }

display();

function checkColor(){
  let len = getData.length;
  for (let i = 0; i < len; i++) {
    if (getData[i].bmi == '過輕') {
      resultList.children[i+1].classList.add("border-blue");
      resultBtn.classList.add('blue');
      reload.classList.add('reloadBlue');
      resultInner.innerText = '過輕';
    } else if(getData[i].bmi == '理想'){
      resultList.children[i+1].classList.add("border-green");
      resultBtn.classList.add('green');
      reload.classList.add('reloadGreen');
      resultInner.innerText = '理想';
    } else if (getData[i].bmi == '過重'){
      resultList.children[i+1].classList.add("border-orange");
      resultBtn.classList.add('Orange');
      reload.classList.add('reloadOrange');
      resultInner.innerText = '過重';
    } else if (getData[i].bmi == '輕度肥胖') {
      resultList.children[i+1].classList.add("border-deepOrange");
      resultBtn.classList.add('deepOrange');
      reload.classList.add('reloadDeepOrange');
      resultInner.innerText = '輕度肥胖';
    } else if (getData[i].bmi == '中度肥胖') {
      resultList.children[i + 1].classList.add("border-deepOrange");
      resultBtn.classList.add('deepOrange');
      reload.classList.add('reloadDeepOrange');
      resultInner.innerText = '中度肥胖';
    } else if (getData[i].bmi == '重度肥胖') {
      resultList.children[i+1].classList.add("border-red");
      resultBtn.classList.add('red');
      reload.classList.add('reloadRed');
      resultInner.innerText = '重度肥胖';
    } 
  }
}
checkColor();