// study guide https://drive.google.com/file/d/1Vw658-9KUiUZ5yHaABvkytC9W2QBYiW_/view

// add focus to the 'name' field on page load
$('#name').focus();

// hide 'other' text input
$('#other-title').hide();

// show 'other' text input, when 'other' option is selected
$('#title').change(function() {
  if ($(this).val() === 'other') {
    $('#other-title').show();
  } else {
    $('#other-title').hide();
  }
});

// functions to show only the colors relevant to the theme
function showJSPunsColors() {
  $('#color option').remove();
  $('#color').append(
    '<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>'
  );
  $('#color').append(
    '<option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option>'
  );
  $('#color').append('<option value="gold">Gold (JS Puns shirt only)</option>');
}

function showHeartJSColors() {
  $('#color option').remove();
  $('#color').append(
    '<option value="tomato">Tomato (I &#9829; JS shirt only)</option>'
  );
  $('#color').append(
    '<option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option>'
  );
  $('#color').append(
    '<option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>'
  );
}

// hide 'select theme' option
$("option:contains('Select Theme')").attr('hidden', 'true');

// insert 'Please select a T-shirt theme' before first child and hide option
$('#color').prepend(
  '<option value="theme-first">Please select a T-shirt theme</option>'
);
$('#color option[value="theme-first"]').attr('selected', 'true');
$('#color option[value="theme-first"]').attr('hidden', 'true');

// hide all color options unless theme is selected
$('#color').attr('hidden', 'true');
$('#design').change(function() {
  if ($('#design').val() === 'js puns') {
    $('#color').show();
    showJSPunsColors();
  } else if ($('#design').val() === 'heart js') {
    $('#color').show();
    showHeartJSColors();
  }
});

// append total
let totalCost = 0;
const totalString = '<h2>Total: $</h2>';
$('.activities').append(totalString);

// convert string to number and display total of selected activities
$('.activities').on('click', function(e) {
  let $clicked = $(e.target);
  let dataCost = $clicked.attr('data-cost');
  dataCost = dataCost.replace(/\$/g, '');
  dataCost = parseInt(dataCost, 10);
  if ($(event.target).is(':checked')) {
    totalCost += dataCost;
  } else {
    totalCost -= dataCost;
  }
  $('h2').text(`Total: $ ${totalCost}`);

  // disable checkboxes of confliciting activities of selected checkboxes
  let selectedDayAndTime = $clicked.attr('data-day-and-time');
  const $checkbox = $('.activities input[type=checkbox]');
  for (let i = 0; i < $checkbox.length; i += 1) {
    let eventDayAndTime = $checkbox[i].getAttribute('data-day-and-time');
    if (
      eventDayAndTime === selectedDayAndTime &&
      $(event.target).is(':checked')
    ) {
      $checkbox[i].disabled = true;
      $clicked.prop('disabled', false);
    } else if (!$(event.target).is(':checked')) {
      $checkbox[i].disabled = false;
    }
  }
});

// hide 'select payment method' option
$('#payment [value="select method"]').attr('hidden', 'true');

// credit card option selected by default
$('#payment option[value="Credit Card"]').attr('selected', 'true');

// determines which payment option is displayed
$('#paypal').hide();
$('#bitcoin').hide();
$('#payment').change(function(e) {
  const paymentOption = this.target;
  if ($('#payment').val() === 'PayPal') {
    $('#credit-card').hide();
    $('#paypal').show();
    $('#bitcoin').hide();
  } else if ($('#payment').val() === 'Bitcoin') {
    $('#credit-card').hide();
    $('#paypal').hide();
    $('#bitcoin').show();
  } else {
    $('#credit-card').show();
    $('#paypal').hide();
    $('#bitcoin').hide();
  }
});

// validation and error for the name input
const $name = $('#name');
$($name).after('<span class="nameError">Please enter a valid name</span>');
$('.nameError').hide();

function validName(name) {
  if (name !== '') {
    $('.nameError').hide();
    return true;
  } else {
    $('.nameError').show();
    return false;
  }
}

$name.on('keypress blur', function(e) {
  validName(e.target.value);
});

// validation and errors for the email input
const $email = $('#mail');
$($email).after('<span class="emailError">Please enter a valid email</span>');
$($email).after('<span class="emailEmpty">Field cannot remain empty</span>');
$('.emailError').hide();
$('.emailEmpty').hide();

function validEmail(email) {
  let regexEmail = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
  if (regexEmail) {
    $('.emailError').hide();
    $('.emailEmpty').hide();
    return true;
  } else if (email === '') {
    $('.emailError').hide();
    $('.emailEmpty').show();
    return false;
  } else {
    $('.emailError').show();
    $('.emailEmpty').hide();
    return false;
  }
}

$email.on('keypress blur', function(e) {
  validEmail(e.target.value);
});

// validation and error for the activity options
const $activity = $('.activities');
$($('legend:contains("Register for Activities")')).after(
  '<span class="activityError">Please select at least one activity</span>'
);
$('.activityError').hide();

function validActivity(activity) {
  if (totalCost !== 0) {
    $('.activityError').hide();
    return true;
  } else {
    $('.activityError').show();
    return false;
  }
}

$activity.on('click', function(e) {
  validActivity(e.target.value);
});

// validation and errors for credit card number input
const $number = $('#cc-num');
$($number).after(
  '<span class="numberError">Credit card number must be between 13 to 19 digits long</span>'
);
$($number).after('<span class="numberEmpty">Field cannot remain empty</span>');
$('.numberError').hide();
$('.numberEmpty').hide();

function validNumber(cardnumber) {
  let regexNumber = /^\d{13,19}$/.test(cardnumber);
  if (regexNumber) {
    $('.numberError').hide();
    $('.numberEmpty').hide();
    return true;
  } else if (cardnumber === '') {
    $('.numberError').hide();
    $('.numberEmpty').show();
    return false;
  } else {
    $('.numberError').show();
    $('.numberEmpty').hide();
    return false;
  }
}

$number.on('keypress blur', function(e) {
  validNumber(e.target.value);
});

// validation and errors for zip code input
const $zip = $('#zip');
$($zip).after('<span class="zipError">Zip code must be 5 digits long</span>');
$($zip).after('<span class="zipEmpty">Field cannot remain empty</span>');
$('.zipError').hide();
$('.zipEmpty').hide();

function validZip(zip) {
  let regexZip = /^\d{5}$/.test(zip);
  if (regexZip) {
    $('.zipError').hide();
    $('.zipEmpty').hide();
    return true;
  } else if (zip === '') {
    $('.zipError').hide();
    $('.zipEmpty').show();
    return false;
  } else {
    $('.zipError').show();
    $('.zipEmpty').hide();
  }
}

$zip.on('keypress blur', function(e) {
  validZip(e.target.value);
});
