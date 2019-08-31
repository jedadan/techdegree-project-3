// study guide https://drive.google.com/file/d/1Vw658-9KUiUZ5yHaABvkytC9W2QBYiW_/view

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

let totalCost = 0;

// append total
$('.activities').append('<p><strong>Total: ' + totalCost + '</strong></p>');

// disable conflicting time checkboxes when boxes are checked

$('.activities').change(function() {
  // disable conflicting 9am-12pm
  if ($('input[name="js-frameworks"]').is(':checked')) {
    $('input[name="express"]').attr('disabled', 'true');
  } else {
    $('input[name="express"]').removeAttr('disabled');
  }

  if ($('input[name="express"]').is(':checked')) {
    $('input[name="js-frameworks"]').attr('disabled', 'true');
  } else {
    $('input[name="js-frameworks"]').removeAttr('disabled');
  }

  // disable conflicting 1pm-4pm
  if ($('input[name="js-libs"]').is(':checked')) {
    $('input[name="node"]').attr('disabled', 'true');
  } else {
    $('input[name="node"]').removeAttr('disabled');
  }

  if ($('input[name="node"]').is(':checked')) {
    $('input[name="js-libs"]').attr('disabled', 'true');
  } else {
    $('input[name="js-libs"]').removeAttr('disabled');
  }
});
