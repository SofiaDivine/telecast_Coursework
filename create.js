import categories from "./categories.js";

const form = document.forms[0];
const channels = [];
const schedules = [];

const categorySelect = form.querySelector('#category');

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

  const time = formData.get('time');
  const show = formData.get('show');
  const channelName = formData.get('channelName');

  const timeRegex = /^[0-9\s:-]+$/;
  if (!timeRegex.test(time)) {
    alert("Поле 'Час' може містити тільки цифри, пробіл, двокрапку та тире.");
    return;
  }

  const descriptionRegex = /^[a-zA-Zа-яА-Я0-9\s]{2,}$/;
  if (!descriptionRegex.test(show) || !descriptionRegex.test(channelName)) {
    alert("Поля 'Опис програми' та 'Назва каналу' повинні містити тільки літери, цифри та пробіли, і мають бути не менше, ніж 2 символи.");
    return;
  }

  const channelId = generateUniqueId(channelName); // Генеруємо унікальний ідентифікатор для каналу
  const scheduleId = generateUniqueId(channelId + time); // Генеруємо унікальний ідентифікатор для розкладу

  const channel = {
    id: channelId,
    name: channelName,
    image: formData.get('channelImage'),
    category: formData.get('category'),
  };

  const schedule = {
    id: scheduleId,
    channelId: channelId, // Додамо також ідентифікатор каналу, щоб мати можливість зв'язати розклад і канал
    imgAlt: "фото каналу",
    times: time,
    shows: show,
  };

  channels.push(channel);
  schedules.push(schedule);
  saveChannels();
  saveSchedules();
  form.reset();
}

function generateUniqueId(prefix) {
  return prefix + '_' + Date.now(); // Повертаємо унікальний ідентифікатор на основі префікса та часу
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
