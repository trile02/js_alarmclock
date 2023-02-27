const currentTime=document.querySelector('h1') 
selectMenu=document.querySelectorAll('select');
SetAlarmbtn=document.querySelector('button');

let alarmTime,checkAlarm=false;
ringtone=new Audio("files/ringtone.mp3")


function checkPermission(){
      if (!window.Notification) {
        console.log('Browser does not support notifications.');
    } else {
        // request permission from user
        Notification.requestPermission().then(function (p) {
            if (p === 'granted') {
                 var notify = new Notification('Alarm time!', {
                    icon:"files/clock.png"
                });
            } else {
                console.log('User blocked notifications.');
            }
        }).catch(function (err) {
            console.error(err);
        });
    }
}

function notify() {
    
        // check if permission is already granted
        if (Notification.permission === 'granted') {
            // notification object
            var notify = new Notification('Alarm time!', {
                icon:"files/clock.png"
            });
        } 
        else {
            console.log('Notifications permission not granted.');
          }
   
}

        for (let i = 24; i > 0; i--){
            if (i<10){
                i= "0"+i;
            }
            else i;
           let option=`<option value="${i}"> ${i} </option>`;
           selectMenu[0].firstElementChild.insertAdjacentHTML("afterend",option);
        }
        for (let i = 60; i >= 0; i--){
            if (i<10){
                i= "0"+i;
            }
            else i;
           let option=`<option value="${i}"> ${i} </option>`;
           selectMenu[1].firstElementChild.insertAdjacentHTML("afterend",option);
        }
        
         
        setInterval(() => {
            // getting hour, mins, secs by Date object
            let date=new Date();
            h=date.getHours();
            m=date.getMinutes();
            s=date.getSeconds();
   
            // adding 0 before hr,min,sec if this value is less than 10
           h=h<10 ? "0" + h : h;
           m=m<10 ? "0" + m : m;
           s=s<10 ? "0" + s: s;
            
           currentTime.innerText = (`${h}:${m}:${s}`);
           if (alarmTime==`${h}:${m}`)
           {
              ringtone.play();
              ringtone.loop=true;
              notify();
           }

        }, 1000);

            // Set Alarm Function
            function setAlarm() {

            if (checkAlarm){
                alarmTime="";
                ringtone.pause();
                SetAlarmbtn.innerText="Set Alarm";
                return checkAlarm=false;
                
            }
            let time = `${selectMenu[0].value}:${selectMenu[1].value}`;
            if( time.includes("Hour") || time.includes("Minute")){
                return alert("Chose a time to set a alarm");
            }
            checkAlarm=true;
            alarmTime=time;
            SetAlarmbtn.innerText="Clear Alarm";
            }
            
            
            SetAlarmbtn.addEventListener("click",setAlarm);
            
            checkPermission();

