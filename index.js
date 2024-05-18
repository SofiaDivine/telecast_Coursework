$('#editChannelDropdown').on("click", function (e) {
  $('#editChannelMenu').toggle();
  $('#editScheduleMenu').hide();
  e.stopPropagation();
  e.preventDefault();
});
$('#editScheduleDropdown').on("click", function (e) {
  $('#editScheduleMenu').toggle();
  $('#editChannelMenu').hide();
  e.stopPropagation();
  e.preventDefault();
});

$('.filter-category').on('click', function (e) {
  e.preventDefault();
  var category = $(this).attr('data-category');

  if (category === 'all') {
    $('.channel-card').show();
  } else {
    $('.channel-card').each(function () {
      var channelCategory = $(this).attr('data-category');
      if (channelCategory === category) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  }
});
