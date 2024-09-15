const sun = document.querySelector('.sun');
const mon = document.querySelector('.mon');
const tue = document.querySelector('.tue');
const wed = document.querySelector('.wed');
const thu = document.querySelector('.thu');
const fri = document.querySelector('.fri');
const sat = document.querySelector('.sat');
let hrs = document.querySelector('#hrs');
let min = document.querySelector('#min');
let year = document.querySelector('.year');
let month = document.querySelector('.month');
let day = document.querySelector('.day');
let format = document.querySelector('.format');
const changeClockFormat = document.querySelector('.change-clock-format');
const stopwatch = document.querySelector('.stopwatch-btn');
const clockSct = document.querySelector('.clock-sct');
const stopwatchSct = document.querySelector('.stopwatch-sct');
const stopwatchContinue = document.querySelector('.stopwatch-continue');



let twentyFourHours = true;
clock();
setInterval(clock, 500);
function clock() {
 let currentTime = new Date();
 [sun, mon, tue, wed, thu, fri, sat].forEach((day, index) => {
  if (index === currentTime.getDay()) {
   day.classList.add('active');
  }
 });
 if (currentTime.getHours() >= 12 && twentyFourHours) {
  hrs.innerHTML = (currentTime.getHours() < 10 ? '0' : '') + currentTime.getHours();
 } else {
  hrs.innerHTML = ((currentTime.getHours() - 12) < 10 ? '0' : '') + (currentTime.getHours() - 12);
 }
 min.innerHTML = (currentTime.getMinutes() < 10 ? '0' : '') + currentTime.getMinutes();

 year.innerHTML = currentTime.getFullYear();
 month.innerHTML = (currentTime.getMonth() < 10 ? '0' : '') + currentTime.getMonth();
 day.innerHTML = (currentTime.getDate() < 10 ? '0' : '') + currentTime.getDate();
 format.innerHTML = currentTime.getHours() >= 12 ? 'PM' : 'AM';
};


changeClockFormat.addEventListener('click', () => {
 stopwatchClicked.textContent = '12Hrs';
 stopwatch.textContent = 'Stopwatch';
 clockSct.style.display = 'flex';
 stopwatchSct.style.display = 'none';
 
 if (twentyFourHours) {
  twentyFourHours = false;
  changeClockFormat.innerHTML = '24Hrs';
  format.style.display = 'block';
 } else if (!twentyFourHours) {
  twentyFourHours = true;
  changeClockFormat.innerHTML = '12Hrs';
  format.style.display = 'none';
 }
 
});


let stopwatchClicked = false;

let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

function stopwatchContinueBtn(){
 stopwatchClicked = true;
 clockSct.style.display = 'none';
 stopwatchSct.style.display = 'flex';

 if (stopwatchClicked) {
  changeClockFormat.textContent = 'Clock';
 }

 if (stopwatch.textContent === 'Stopwatch') {
  stopwatch.textContent = 'Start';

 } else if (stopwatch.textContent === 'Start') {


  stopwatch.textContent = 'Stop';
  start();
 } else if (stopwatch.textContent === 'Stop') {
  stopwatchContinue.style.display = 'flex';

  stopwatch.textContent = 'Reset';
  if (isRunning) {
   clearInterval(timer);
   elapsedTime = Date.now() - startTime;
   isRunning = false;
  }

 } else {
  stopwatch.textContent = 'Start';
  stopwatchContinue.style.display = 'none';
  clearInterval(timer)
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  stopwatchSct.textContent = '00:00:00:00';
 }
 function start() {
  if (!isRunning) {
   startTime = Date.now() - elapsedTime;
   timer = setInterval(update, 10);
   isRunning = true;
  }
 };


 function update() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
  let seconds = Math.floor(elapsedTime / 1000 % 60);
  let miliseconds = Math.floor(elapsedTime % 1000 / 10);

  hours = String(hours).padStart(2, '0');
  minutes = String(minutes).padStart(2, '0');
  seconds = String(seconds).padStart(2, '0');
  miliseconds = String(miliseconds).padStart(2, '0');

  stopwatchSct.textContent = `${hours}:${minutes}:${seconds}:${miliseconds}`;
 }
}
stopwatch.addEventListener('click', stopwatchContinueBtn);

stopwatchContinue.addEventListener('click', () => {
});


console.log(Date.now())