// study guide https://drive.google.com/file/d/1Vw658-9KUiUZ5yHaABvkytC9W2QBYiW_/view

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
