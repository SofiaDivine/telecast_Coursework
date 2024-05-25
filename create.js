import categories from "./categories.js";

const form = document.forms[0];
const channels = [];
const schedules = [];

// Заповнення селектора категорій
const categorySelect = form.querySelector('#category');

// Очищення селектора перед додаванням категорій
categorySelect.innerHTML = '';

categories.forEach(category => {
  const option = document.createElement('option');
  option.value = category;
  option.textContent = category;
  categorySelect.appendChild(option);
});

loadChannels();
loadSchedules();

form.onsubmit = handleSubmit;

function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(form);

  const id = Date.now();
  const channel = {
    id,
    name: formData.get('channelName'),
    image: formData.get('channelImage'),
    category: formData.get('category'),
  };

  const schedule = {
    id,
    imgAlt: "фото каналу",
    times: formData.get('time'),
    shows: formData.get('show'),
  };


  channels.push(channel);
  schedules.push(schedule);
  saveChannels();
  saveSchedules();
  form.reset();
}

function saveChannels() {
  localStorage.setItem('channels', JSON.stringify(channels));
}

function loadChannels() {
  const data = localStorage.getItem('channels');
  if (data) {
    channels.splice(0, channels.length, ...JSON.parse(data));
  } 
}

function saveSchedules() {
  localStorage.setItem('schedules', JSON.stringify(schedules)); 
}

function loadSchedules() {
  const data = localStorage.getItem('schedules');
  if (data) {
    schedules.splice(0, schedules.length, ...JSON.parse(data)); 
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
