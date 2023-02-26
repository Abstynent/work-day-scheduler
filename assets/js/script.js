var mainContentEl = $('#schedule');
var dateEl = $('#currentDay');
var startHour = 9;
var endHour = 17;
var savedEvents = {
};

// Display date and time on the page
dateEl.text(dayjs().format('ddd D YYYY, hh:mm:ss a'));
var timeInterval = setInterval(function() {
  dateEl.text(dayjs().format('ddd D YYYY, hh:mm:ss a'));
}, 1000);

// Change time to 12h clock
function changeTime(time) {
  return (time+24) % 12 || 12;
};

$(function () {
  for(var i=startHour; i<endHour+1; i++) {
    var meridiem = "PM";
    var styleAt = "present";
    var blockId = "hour-" + i;
    if(i < dayjs().format('H')) styleAt = "past";
    else if(i > dayjs().format('H')) styleAt= "future";

    if(i<12) meridiem = "AM"; // change value if hour is before 12

    // Declare DOM elements
    var hourBlockEl = $('<div id="'+ blockId +'" class="row time-block">');
    var hourEl = $('<div class="col-2 col-md-1 hour text-center py-3">'+ changeTime(i) + meridiem + '</div>');
    var textEl = $('<textarea class="col-8 col-md-10 description" rows="3">');
    var btnEl = $('<button class="btn saveBtn col-2 col-md-1" aria-label="save">');
    textEl.addClass(styleAt);

    // Append elemnts to be displayed on the page
    mainContentEl.append(hourBlockEl);
    hourBlockEl.append(hourEl).append(textEl).append(btnEl);
    btnEl.append('<i class="fas fa-save" aria-hidden="true">');

    // Check if there are any events saved in localStorage, if yes - print them
    tempStr = localStorage.getItem(blockId);
    if(tempStr !== null) textEl.text(tempStr);
  };
});

mainContentEl.on('click','.saveBtn', function() {
  var parentID = $(this).parent().attr('id');
  var newEvent = $(this).prev().val();
  localStorage.setItem(parentID, newEvent);
});