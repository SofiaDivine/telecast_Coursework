import channels from './channels.js';

document.addEventListener('DOMContentLoaded', function () {
  loadChannels();

  const updatedChannels = JSON.parse(localStorage.getItem('channels'));
  if (updatedChannels) {
    channels.splice(0, channels.length, ...updatedChannels);
    showChannels(channels);
  }
});

saveChannels();
showChannels(channels);

function saveChannels() {
  localStorage.setItem('channels', JSON.stringify(channels));
}

function loadChannels(channelId) {
  const savedData = localStorage.getItem(`channel_${channelId}`);
  return savedData ? JSON.parse(savedData) : null;
}

function showChannels(channels) {
  const channelList = document.querySelector('.channel-list>.row');
  channelList.innerHTML = ''; 

  channels.forEach(channel => {
    const channelCard = document.createElement('div');
    channelCard.classList.add('col-md-4', 'mb-4', 'channel-card');
    channelCard.setAttribute('data-category', channel.category);
    channelCard.innerHTML = `
      <div class="card">
        <a href="schedule.html?id=${channel.id}">
          <img src="${channel.mainImg}" class="card-img-top" alt="фото каналу">
          <div class="card-body">
            <h5 class="card-title">${channel.name}</h5>
            <p class="card-text channel-category">Категорія: ${channel.category}</p>
          </div>
        </a>
      </div>
    `;  
    channelList.appendChild(channelCard);
  });
}


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


