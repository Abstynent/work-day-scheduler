// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var mainContentEl = $('#schedule');
var dateEl = $('#currentDay');

// Display date and time on the page
dateEl.text(dayjs().format('ddd D YYYY, hh:mm:ss a'));
var timeInterval = setInterval(function() {
  dateEl.text(dayjs().format('ddd D YYYY, hh:mm:ss a'));
}, 1000);
function changeTime(time) {
  return (time+24) % 12 || 12;
};
$(function () {
  for(var i=9; i<18; i++) {
    console.log("i: " + i);
    console.log(dayjs().format('H'));
    var amPM = "PM";
    var styleAt = "present";
    var time = changeTime(i);
    if(i < dayjs().format('H')) styleAt = "past";
    else if(i > dayjs().format('H')) styleAt= "future";

    if(i<12) amPM = "AM";
    // past, present, future - classes to do style rows
    var hourMainDivEl = $('<div id="" class="row time-block">');
    var timeColEl = $('<div class="col-2 col-md-1 hour text-center py-3">'+ time + amPM + '</div>');
    var textEl = $('<textarea class="col-8 col-md-10 description" rows="3">');
    var btnEl = $('<button class="btn saveBtn col-2 col-md-1" aria-label="save">');
    textEl.addClass(styleAt);

    mainContentEl.append(hourMainDivEl);
    hourMainDivEl.append(timeColEl);
    hourMainDivEl.append(textEl);
    hourMainDivEl.append(btnEl);
    btnEl.append('<i class="fas fa-save" aria-hidden="true">');
  };
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});


///////////////////////////////////////
      // <div id="hour-9" class="row time-block past">
      //   <div class="col-2 col-md-1 hour text-center py-3">9AM</div>
      //   <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
      //   <button class="btn saveBtn col-2 col-md-1" aria-label="save">
      //     <i class="fas fa-save" aria-hidden="true"></i>
      //   </button>
      // </div>