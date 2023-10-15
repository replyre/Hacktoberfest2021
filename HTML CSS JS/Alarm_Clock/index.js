const time = document.querySelector(".current-time");
const hourInput = document.getElementById("hours");
const minuteInput = document.getElementById("minutes");
const ActiveAlarms = document.querySelector(".alarm-list");
const setAlarm = document.getElementById("set");
const ClearAll = document.querySelector(".clear");
const alarmsound = new Audio("./alarm.wav");

let alarmIndex = 0;
let alarmArray = [];
let IniitialHour = 0;
let initialMinute = 0;

const appendZero = (value) => (value < 10 ? "0" + value : value);
const displayTimer = () => {
  const date = new Date();
  const currentTime = date.toLocaleTimeString("en-US", { hour12: false });
  time.textContent = currentTime;

  alarmArray.forEach((alarm) => {
    if (alarm.isActive && alarm.time === currentTime.slice(0, 5)) {
      alarmsound.play();
    }
  });
};

const creatAlarm = (hour, minute) => {
  alarmIndex += 1;
  const alaramObj = {
    id: `${alarmIndex}_${hour}_${minute}`,
    time: `${appendZero(hour)}:${appendZero(minute)}`,
    isActive: true,
  };

  alarmArray.push(alaramObj);
  const alarmDiv = document.createElement("div");
  alarmDiv.className = "alarm";
  alarmDiv.dataset.id = alaramObj.id;
  alarmDiv.innerHTML = `<span> ${alaramObj.time}</span>`;

  const btn = document.createElement("input");
  btn.type = "checkbox";
  btn.setAttribute("checked", "true");
  btn.addEventListener("change", () => toogleAlarm(alaramObj));
  alarmDiv.appendChild(btn);

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  deleteBtn.className = "deleteBtn";
  deleteBtn.addEventListener("click", () => deleteAlarm(alaramObj));
  alarmDiv.appendChild(deleteBtn);
  ActiveAlarms.appendChild(alarmDiv);
};

const toogleAlarm = (alarm) => {
  alarm.isActive = !alarm.isActive;
  if (alarm.isActive) {
    const currentTime = new Date()
      .toLocaleTimeString("en-US", {
        hour12: false,
      })
      .slice(0, 5);

    if (alarm.time == currentTime) alarmsound.play();
    else alarmsound.pause();
  }
};

const deleteAlarm = (alarm) => {
  const ind = alarmArray.indexOf(alarm);
  if (ind > -1) {
    alarmArray.splice(ind, 1);
    document.querySelector(`[data-id="${alarm.id}"]`).remove();
  }
};

ClearAll.addEventListener("click", () => {
  alarmArray = [];
  ActiveAlarms.innerHTML = "";
});

setAlarm.addEventListener("click", () => {
  let hr = parseInt(hourInput.value) || 0;
  let min = parseInt(minuteInput.value) || 0;

  if (hr < 0 || hr > 23 || min < 0 || min > 59) {
    alert("invalid input");
    return;
  }
  if (
    !alarmArray.some(
      (alarm) => alarm.time === `${appendZero(hr)}:${appendZero(min)}`
    )
  ) {
    creatAlarm(hr, min);
  }
  [hourInput.value, minuteInput.value] = ["", ""];
});

window.onload = () => {
  setInterval(displayTimer, 1000);

  setInterval(() => {
    d = new Date(); //object of date()
    hr = d.getHours();
    min = d.getMinutes();
    sec = d.getSeconds();
    hr_rotation = 30 * hr + min / 2; //converting current time
    min_rotation = 6 * min;
    sec_rotation = 6 * sec;

    hour.style.transform = `rotate(${hr_rotation}deg)`;
    minute.style.transform = `rotate(${min_rotation}deg)`;
    second.style.transform = `rotate(${sec_rotation}deg)`;
  }, 1000);

  [hourInput.value, minuteInput.value] = ["", ""];
};
