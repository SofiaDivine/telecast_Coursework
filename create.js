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

showCreationForms();
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

function showCreationForms(channels, schedules) {
  const app = document.getElementById('app');
  if (!app) {
    console.error('App element not found');
    return;
  }

  const section = document.createElement('section');
  section.innerHTML = `
  <div class="container">
    <h2 class="mt-4">Створення нового каналу</h2>
    <form>
      <div class="form-group">
        <label for="channelImage">Фото каналу:</label>
        <input type="file" class="form-control-file" id="channelImage">
      </div>
      <div class="form-group">
        <label for="channelName">Назва каналу:</label>
        <input type="text" class="form-control" id="channelName" placeholder="Введіть назву каналу">
      </div>
      <div class="form-group">
        <label for="category">Категорія:</label>
        <select class="form-control" id="category">
          <option>Новини</option>
          <option>Спорт</option>
          <option>Фільми і Серіали</option>
          <option>Розважальні</option>
          <option>Пізнавальні</option>
          <option>Дитячі</option>
        </select>
      </div>
      <div class="form-group">
        <label for="schedule">Розклад програми:</label>
        <div class="row">
          <div class="col-md-6">
            <input type="text" class="form-control mb-2" placeholder="Час" name="time">
          </div>
          <div class="col-md-6">
            <input type="text" class="form-control mb-2" placeholder="Опис програми" name="show">
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <input type="text" class="form-control mb-2" placeholder="Час" name="time">
          </div>
          <div class="col-md-6">
            <input type="text" class="form-control mb-2" placeholder="Опис програми" name="show">
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <input type="text" class="form-control mb-2" placeholder="Час" name="time">
          </div>
          <div class="col-md-6">
            <input type="text" class="form-control mb-2" placeholder="Опис програми" name="show">
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <input type="text" class="form-control mb-2" placeholder="Час" name="time">
          </div>
          <div class="col-md-6">
            <input type="text" class="form-control mb-2" placeholder="Опис програми" name="show">
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <input type="text" class="form-control mb-2" placeholder="Час" name="time">
          </div>
          <div class="col-md-6">
            <input type="text" class="form-control mb-2" placeholder="Опис програми" name="show">
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary mb-5">Створити канал</button>
    </form>
  </div>
`;
app.replaceChildren(section);
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
