import channels from './channels.js';

loadChannels();
showChannels(channels);

function saveChannels() {
  localStorage.setItem('channels', JSON.stringify(channels));
}

function loadChannels() {
  const data = localStorage.getItem('channels');
  if (data) {
    const loadedChannels = JSON.parse(data);
    channels.splice(0, channels.length, ...loadedChannels);
  } else {
    saveChannels(); // Зберігаємо початкові дані, якщо localStorage порожній
  }
}

function showChannels(channels) {
  const channelList = document.querySelector('.channel-list>.row');
  channelList.innerHTML = ''; // Очищення існуючого контенту

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


