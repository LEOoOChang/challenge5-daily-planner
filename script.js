var currentDayEl = document.querySelector("#currentDay");
var currentDate = dayjs().format("dddd, MMMM D");
currentDayEl.textContent = currentDate;

var tasks = JSON.parse(localStorage.getItem("tasks")) || {};

function updateTimeBlocks() {
  var currentHour = dayjs().hour();

  $(".time-block").each(function () {
    var hour = parseInt($(this).find(".hour").text().replace(/[^\d]/g, ""));
    var descriptionEl = $(this).find(".description");

    if (hour < currentHour) {
      descriptionEl.addClass("past");
    } else if (hour === currentHour) {
      descriptionEl.addClass("present");
    } else {
      descriptionEl.addClass("future");
    }

     if (tasks[hour]) {
      descriptionEl.val(tasks[hour]);
    }
  });
}

updateTimeBlocks();

$(".saveBtn").on("click", function () {
  var hour = $(this).siblings(".hour").text().replace(/[^\d]/g, "");
  var description = $(this).siblings(".description").val();

  tasks[hour] = description;
  localStorage.setItem("tasks", JSON.stringify(tasks));
});

setInterval(function () {
  updateTimeBlocks();
}, 15 * 60 * 1000);