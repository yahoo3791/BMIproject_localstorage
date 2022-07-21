const newsHeight = document.querySelector('.newsHeight') ;
const newsKg = document.querySelector('.newsKg');
const resultBtn = document.querySelector('.result');
const resultList = document.querySelector('.resultList');
let getData = JSON.parse(localStorage.getItem("list"))|| [];

resultBtn.addEventListener('click', () => {
  let heightValue = newsHeight.value;
  let KgValue = newsKg.value;
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
  display()
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
  let str = '<h3 class="resultTitle">BMI紀錄</h3>';
  let len = getData.length;
  for(let i = 0; i<len; i++){
    str += `<li class="resultItem border-start d-flex justify-content-around">
        <p>${getData[i].bmi}</p>
        <p><span>BMI</span>${getData[i].cal}</p>
        <p><span>weight</span>${getData[i].kg}</p>
        <p><span>height</span>${getData[i].cm}</p>
        <p>date未設定</p>
      </li>`;
  }
resultList.innerHTML = str;
}
display();