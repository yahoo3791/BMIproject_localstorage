const newsHeight = document.querySelector('.newsHeight');
const newsKg = document.querySelector('.newsKg');
const result = document.querySelector('.result');
let getData = JSON.parse(localStorage.getItem('list')) || [];
const resultList = document.querySelector('.resultList');
const clearBtn = document.querySelector('.clearBtn');
const resultP = document.querySelector('.resultP');

clearBtn.addEventListener('click', () => {
  localStorage.removeItem('list');
  init();
})
function init(){
  resultList.innerHTML = `
  <h2 class="resultTitle">BMI紀錄</h2>
  <li style="color:white;font-size:1rem">這裡還沒有資料，快來計算你的 BMI 吧！</li>`;
  newsHeight.value = '';
  newsKg.value = '';
  let btn = `<p class="" style="text-align: center; line-height: 120px;color:#7a8f69">看結果</p>`;
  result.innerHTML = btn;
  if (JSON.parse(localStorage.getItem('list')) == null ){
    localStorage.setItem('list', JSON.stringify([]));
    let arr1 = [];
    getData = arr1;
    // 設定回空陣列 localStorage清空但陣列沒空 導致重新輸入新值會有清空值出現
  }
  clearBtn.classList.add('d-none');
}

result.addEventListener('click',function(){
  let heightValue = parseInt(newsHeight.value);
  let kgValue = parseInt(newsKg.value);
  if ( heightValue <= 0 || kgValue <= 0 ){
    alert('error');
    return;
  }
  let bmi = calculate(kgValue, heightValue).toFixed(2);
  if(isNaN(bmi)){return};
  let bmiResult;
  let date = new Date;
  let month = ('0' + (date.getMonth() + 1)).slice(-2);
  let day = date.getDate();
  let year = date.getFullYear();
  let today = month + '-' + day + '-' + year;
  let bmiColor;

  if (bmi < 18.5) {
    bmiResult = '過輕';
    bmiColor = '31BAF9';
  } else if (bmi >= 18.5 && bmi < 24) {
    bmiResult = '理想';
    bmiColor = '86D73F';
  } else if (bmi >= 24 && bmi < 27) {
    bmiResult = '過重';
    bmiColor = 'FF982D';
  } else if (bmi >= 27 && bmi < 30) {
    bmiResult = '輕度肥胖';
    bmiColor = 'FF6C03';
  } else if (bmi >= 30 && bmi < 35) {
    bmiResult = '中度肥胖';
    bmiColor = 'FF6C03';
  } else if (bmi >= 35) {
    bmiResult = '重度肥胖';
    bmiColor = 'FF1200';
  }

  let obj = {};
  obj.result = `${bmiResult}`;
  obj.bmi = bmi;
  obj.kg = kgValue;
  obj.height = heightValue;
  obj.date = today;
  obj.color = bmiColor;
  getData.push(obj);
  localStorage.setItem('list',JSON.stringify(getData));
  newsHeight.value = '';
  newsKg.value = '';
  render(getData);
  reset();
});


function calculate(a, b){
  let mathpow = Math.pow(b*0.01,2);
  let bmi = a / mathpow;
  return bmi;
}


function render(data){
  let btn = `<p class="" style="text-align: center; line-height: 120px;color:#7a8f69">看結果</p>`;
  let len = getData.length;
  let str = `<h2 class="resultTitle">BMI紀錄</h2>`;
  for(let i=0; i<len; i++){
    btn = `<p style="margin-bottom:10px; border-radius:50%; text-align: center; line-height: 110px; border:5px solid #${getData[i].color}; color:#${getData[i].color}">BMI${getData[i].bmi}</p>
  <span class="reload position-absolute" style="background-color:#${getData[i].color}"><img style="" src="https://upload.cc/i1/2022/05/08/9FJVha.png" alt=""></span>
  <span style="color:#${getData[i].color}">${getData[i].result}</span>
  `;
    str += `<li class="resultItem" style="border-left:7px solid #${getData[i].color}"><p>${getData[i].result}</p><p><span>BMI</span> ${getData[i].bmi}</p><p><span>weight</span> ${getData[i].kg}kg</p><p><span>height</span> ${getData[i].height}cm</p><p> ${getData[i].date}</p></li>`
  }
  resultList.innerHTML = str;
  result.innerHTML = btn;
  if ( len <=0 ) {
    resultList.innerHTML = `
    <h2 class="resultTitle">BMI紀錄</h2>
    <li style="color:white;font-size:1rem">這裡還沒有資料，快來計算你的 BMI 吧！</li>`;
    clearBtn.classList.add('d-none');
  } else {
    clearBtn.classList.remove('d-none');
  }
}
render();


function reset(){
  result.addEventListener('click', function (e) {
    let btn = `<p class="" style="text-align: center; line-height: 120px;color:#7a8f69">看結果</p>`;
    if (e.target.nodeName == "P") {
      return;
    } else if (e.target.nodeName == "SPAN" || e.target.nodeName == "IMG") {
      result.innerHTML = btn;
    }
  }, false)
};
