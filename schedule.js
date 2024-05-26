import channels from './channels.js';


document.addEventListener('DOMContentLoaded', function () {
    console.log('Data updated event received');
  // Оновлюємо дані на головній сторінці
  loadChannels();

  // Оновлюємо дані на сторінці розкладу (якщо відкрита)
  const id = new URLSearchParams(window.location.search).get('id');
  const schedule = channels.find(channel => channel.id == id);
  if (schedule) {
    showSchedule(schedule);
  }
});

const id = new URLSearchParams(window.location.search).get('id');
const schedule = channels.find(channel => channel.id == id);

if (schedule) {
  showSchedule(schedule);
} else {
  console.error('Schedule not found for id:', id);
}

function showSchedule(schedule) {
  const app = document.getElementById('app');
  if (!app) {
    console.error('App element not found');
    return;
  }

  const section = document.createElement('section');
  section.innerHTML = `
    <div class="col-md-12 d-flex justify-content-center mt-3">
      <img src="${schedule.bgImg}" alt="фото каналу" class="channel-bg">
    </div>
    <div class="mt-3">
      <h2 style="text-align: center">Розклад каналу:</h2>
    </div>
    <div class="container mb-5 mt-4">
      <div class="row">
        <div class="col-md-6">
          <ul class="list-group">
            ${schedule.times.map(time => `<li class="list-group-item">${time}</li>`).join('')}
          </ul>
        </div>
        <div class="col-md-6">
          <ul class="list-group">
            ${schedule.shows.map(show => `<li class="list-group-item">${show}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;
  app.replaceChildren(section);
}

function loadChannels() {
  const data = localStorage.getItem('channels');
  if (data) {
    channels.splice(0, channels.length, ...JSON.parse(data));
  }
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
  
