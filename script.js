// Display current date and time
var currentDayEl = document.querySelector("#currentDay");
var currentDate = dayjs().format("dddd, MMMM D");
currentDayEl.textContent = currentDate;

// Get saved tasks from local storage
var tasks = JSON.parse(localStorage.getItem("tasks")) || {};

// Set background color of time blocks based on current time
function updateTimeBlocks() {
  var currentHour = dayjs().hour();

  if (currentHour < 9 || currentHour >= 21) {
    $(".time-block").addClass("future");
  } else if (currentHour >= 9 && currentHour < 17) {
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

      if (hour < 9 || hour >= 17) {
        descriptionEl.addClass("future");
      }
    });
  } else {
    $(".time-block").addClass("past");
  }

  // Set value of description from saved tasks
  $(".description").each(function () {
    var hour = parseInt($(this).data("hour"));
    if (tasks[hour]) {
      $(this).val(tasks[hour]);
    }
  });
}

updateTimeBlocks();

setInterval(function () {
  updateTimeBlocks();
}, 15 * 60 * 1000);

// Load saved tasks from local storage 
$(document).ready(function () {
  updateTimeBlocks();
});

// Clear local storage and reset tasks when new day starts
setInterval(function () {
  if (dayjs().hour() === 0) {
    tasks = {};
    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateTimeBlocks();
  }
}, 60 * 60 * 1000);

// Allow user to enter task when time block is clicked
$(".description").on("click", function () {
  $(this).addClass("user-input");
});

// Save task to local storage 
$(".description").on("blur", function () {
  var hour = $(this).data("hour");
  var description = $(this).val();

  tasks[hour] = description;
  localStorage.setItem("tasks", JSON.stringify(tasks));

  $(this).removeClass("user-input");
});