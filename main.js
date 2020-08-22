// Unfetch polyfill
function unfetch(e,n){return n=n||{},new Promise(function(t,r){var s=new XMLHttpRequest,o=[],u=[],i={},a=function(){return{ok:2==(s.status/100|0),statusText:s.statusText,status:s.status,url:s.responseURL,text:function(){return Promise.resolve(s.responseText)},json:function(){return Promise.resolve(JSON.parse(s.responseText))},blob:function(){return Promise.resolve(new Blob([s.response]))},clone:a,headers:{keys:function(){return o},entries:function(){return u},get:function(e){return i[e.toLowerCase()]},has:function(e){return e.toLowerCase()in i}}}};for(var l in s.open(n.method||"get",e,!0),s.onload=function(){s.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm,function(e,n,t){o.push(n=n.toLowerCase()),u.push([n,t]),i[n]=i[n]?i[n]+","+t:t}),t(a())},s.onerror=r,s.withCredentials="include"==n.credentials,n.headers)s.setRequestHeader(l,n.headers[l]);s.send(n.body||null)})};
//# sourceMappingURL=unfetch.js.map

function clearHash() { 
  window.location.hash = "";
}

function sanitizeValues(form) {
  return form;
}

function handleSubmit(e) { 
  e.preventDefault();
  const ENDPOINT = 'https://script.google.com/macros/s/AKfycbxrsi7xtNsg5mvoZ-yGLDVDLN2CKa0BQuIN1sXalpKzE61tHZrI/exec';
  const form = e.target;
  fetch(ENDPOINT, { method: 'POST', body: new URLSearchParams([...new FormData(sanitizeValues(form))])})
    .then( r => r.json() )
    .then( data => console.log(data) )
}

function countdownTo(when, element) {
    {
        var end = new Date(when);

        var _second = 1000;
        var _minute = _second * 60;
        var _hour = _minute * 60;
        var _day = _hour * 24;
        var timer;

        function timeLeft() {
            var now = new Date();
            var dt = end - now;
            if (dt < 0) {
                clearInterval(timer);
                document.getElementById(id).innerHTML = 'WE DID IT! GREAT JOB!';

                return;
            }

            const countdownComponents = {
              days: Math.floor(dt / _day),
              hours: Math.floor((dt % _day) / _hour),
              minutes: Math.floor((dt % _hour) / _minute),
              seconds: Math.floor((dt % _minute) / _second)
            }
            
            const timeString = Object.keys(countdownComponents).reduce((acc, cur) => {
              if (cur === 'seconds') { 
                acc += countdownComponents[cur]
              } else {
                acc += countdownComponents[cur] + '.'
              }
              return acc 
            }, '');

            element.innerHTML = timeString;
        }

        timeLeft();

        timer = setInterval(timeLeft, 1000);
    }
}


function handleKeyDown(e) {
  if(e.keyCode == 13){
    const id = document.activeElement.children[0].getAttribute('for');
    document.getElementById(id).setAttribute('checked', true);
  } 

}

function handleRsvp(e) {
  clearHash();
  document.getElementById('info').classList.remove('active');
  document.getElementById('rsvp').classList.add('active');
}

function handleInfo(e) {
  clearHash();
  document.getElementById('rsvp').classList.remove('active');
  document.getElementById('info').classList.add('active');
}

function handleCloseRsvp(e) {
  clearHash();
  document.getElementById('rsvp').classList.remove('active');
}

function handleCloseInfo(e) {
  clearHash();
  document.getElementById('info').classList.remove('active');
}

function checkHash(hash) {
  if (hash.includes('rsvp')) {
    document.getElementById('rsvp').classList.add('active');
  }
}


window.onload = () => {
  const form = document.querySelector('form');
  const countdown = document.querySelector('#countdown');

  document.getElementById('toggle-rsvp').addEventListener('click', handleRsvp);
  document.getElementById('toggle-info').addEventListener('click', handleInfo);

  document.getElementById('close-rsvp').addEventListener('click', handleCloseRsvp);
  document.getElementById('close-info').addEventListener('click', handleCloseInfo);

  countdownTo("2020-10-10T18:00:00-04:00", countdown);

  document.addEventListener('keydown', handleKeyDown);

  form.addEventListener('submit', handleSubmit);
  checkHash(window.location.hash);
}

