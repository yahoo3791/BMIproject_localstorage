const newsHeight = document.querySelector('.newsHeight');
const newsKg = document.querySelector('.newsKg');
const result = document.querySelector('.result');
const getData = JSON.parse(localStorage.getItem('list')) || [];
const resultList = document.querySelector('.resultList');
const clearBtn = document.querySelector('.clearBtn');

clearBtn.addEventListener('click', () => {
  localStorage.clear();
  location.reload();
})




result.addEventListener('click',function(){
  let HeightValue = newsHeight.value;
  let KgValue = newsKg.value;
  if (HeightValue == '' || KgValue == '' || HeightValue == null || KgValue == null || HeightValue == undefined || KgValue == undefined){
    alert('error');
    return;
  }
  let bmi = calculate(KgValue, HeightValue).toFixed(2);
  let BmiResult;
  let date = new Date;
  let month = ('0' + (date.getMonth() + 1)).slice(-2);
  let day = date.getDate();
  let year = date.getFullYear();
  let today = month + '-' + day + '-' + year;
  let BmiColor;

  if (bmi < 18.5) {
    BmiResult = '過輕';
    BmiColor = '31BAF9';
  } else if (bmi >= 18.5 && bmi < 24) {
    BmiResult = '理想';
    BmiColor = '86D73F';
  } else if (bmi >= 24 && bmi < 27) {
    BmiResult = '過重';
    BmiColor = 'FF982D';
  } else if (bmi >= 27 && bmi < 30) {
    BmiResult = '輕度肥胖';
    BmiColor = 'FF6C03';
  } else if (bmi >= 30 && bmi < 35) {
    BmiResult = '中度肥胖';
    BmiColor = 'FF6C03';
  } else if (bmi >= 35) {
    BmiResult = '重度肥胖';
    BmiColor = 'FF1200';
  }

  let obj ={};
  obj.result = `${BmiResult}`;
  obj.bmi = bmi;
  obj.kg = KgValue;
  obj.height = HeightValue;
  obj.date = today;
  obj.color = BmiColor;
  getData.push(obj);
  localStorage.setItem('list',JSON.stringify(getData));

  HeightValue ='';
  kgVaule ='';
  render();
});


function calculate(a, b){
  let Mathpow = Math.pow(b*0.01,2);
  let bmi = a / Mathpow;
  return bmi;
}

function render(){
  let btn = `<p class="" style="text-align: center; line-height: 120px;">看結果</p>`;
  let len = getData.length;
  let str = `<h2 class="resultTitle">BMI紀錄</h2>`;
  for(let i=0; i<len; i++){
    btn = `<p style="border-radius:50%; text-align: center; line-height: 110px; border:5px solid #${getData[i].color}; color:#${getData[i].color}">BMI${getData[i].bmi}</p>
  <span class="reload position-absolute" style="background-color:#${getData[i].color}"><img style="" src="https://upload.cc/i1/2022/05/08/9FJVha.png" alt=""></span>
  <span class="position-absolute" style="bottom: -30px; left:20px ;color:#${getData[i].color}">${getData[i].result}</span>
  `;
    str += `<li class="resultItem" style="border-left:7px solid #${getData[i].color}"><p>${getData[i].result}</p><p><span>BMI</span>${getData[i].bmi}</p><p><span>weight</span>${getData[i].kg}kg</p><p><span>height</span>${getData[i].height}cm</p><p>${getData[i].date}</p></li>`
  }
  resultList.innerHTML = str;
  result.innerHTML = btn;
// 
  const reload = document.querySelector('.reload');
  if( reload == null ){
    return;
  }else{
    reload.addEventListener('click', function (e) {
      console.log(e.target);
      if (e.target.nodeName == "SPAN" || e.target.nodeName == "IMG") {
        result.innerHTML = `<p class="" style="text-align: center; line-height: 120px;">看結果</p>`;
      } else {
        return;
      }
    })
// 
  }
}
render();
