let today = new Date();
let events = {};

let monthLabel = document.getElementById("monthLabel");
let dayGrid = document.getElementById("dayGrid");
let popup = document.getElementById("eventPopup");
let popupDate = document.getElementById("popupDate");
let eventText = document.getElementById("eventText");
let addEvent = document.getElementById("addEvent");
let eventItems = document.getElementById("eventItems");

function renderCalendar() {
  let year = today.getFullYear();
  let month = today.getMonth();

  monthLabel.textContent = today.toLocaleString("default", { month: "long", year: "numeric" });

  dayGrid.innerHTML = "";

  let firstDay = new Date(year, month, 1).getDay();
  let numDays = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    let blank = document.createElement("p");
    dayGrid.appendChild(blank);
  }

  for (let d = 1; d <= numDays; d++) {
    let dateKey = `${year}-${month}-${d}`;
    let cell = document.createElement("article");
    cell.className = "dayBox";
    cell.textContent = d;
    if (events[dateKey]) cell.classList.add("hasEvent");
    cell.onclick = function() {
      openPopup(dateKey);
    };
    dayGrid.appendChild(cell);
  }
}

function openPopup(dateKey) {
  popup.style.display = "block";
  popupDate.textContent = "Appointments for " + dateKey;
  eventText.value = "";
  eventItems.innerHTML = "";

  if (events[dateKey]) {
    events[dateKey].forEach((evt, i) => {
      let li = document.createElement("li");
      li.textContent = evt + " ";
      let del = document.createElement("button");
      del.textContent = "Delete";
      del.onclick = function() {
        events[dateKey].splice(i, 1);
        if (events[dateKey].length === 0) delete events[dateKey];
        popup.style.display = "none";
        renderCalendar();
      };
      li.appendChild(del);
      eventItems.appendChild(li);
    });
  }

  addEvent.onclick = function() {
    let val = eventText.value.trim();
    if (val === "") return;
    if (!events[dateKey]) events[dateKey] = [];
    events[dateKey].push(val);
    popup.style.display = "none";
    renderCalendar();
  };
}

document.getElementById("closePopup").onclick = function() {
  popup.style.display = "none";
};

window.onclick = function(e) {
  if (e.target == popup) popup.style.display = "none";
};

document.getElementById("prevBtn").onclick = function() {
  today.setMonth(today.getMonth() - 1);
  renderCalendar();
};

document.getElementById("nextBtn").onclick = function() {
  today.setMonth(today.getMonth() + 1);
  renderCalendar();
};

renderCalendar();