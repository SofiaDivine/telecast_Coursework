const form = document.forms[0];
const channels = [];
const schedules = [];

loadChannels();
loadSchedules();

form.onsubmit = handleSubmit;

/*         <form>
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
                        <input type="text" class="form-control mb-2" placeholder="Опис програми" name="description">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <input type="text" class="form-control mb-2" placeholder="Час" name="time">
                    </div>
                    <div class="col-md-6">
                        <input type="text" class="form-control mb-2" placeholder="Опис програми" name="description">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <input type="text" class="form-control mb-2" placeholder="Час" name="time">
                    </div>
                    <div class="col-md-6">
                        <input type="text" class="form-control mb-2" placeholder="Опис програми" name="description">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <input type="text" class="form-control mb-2" placeholder="Час" name="time">
                    </div>
                    <div class="col-md-6">
                        <input type="text" class="form-control mb-2" placeholder="Опис програми" name="description">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <input type="text" class="form-control mb-2" placeholder="Час" name="time">
                    </div>
                    <div class="col-md-6">
                        <input type="text" class="form-control mb-2" placeholder="Опис програми" name="description">
                    </div>
                </div>
            </div>
            <button type="submit" class="btn btn-primary mb-5">Створити канал</button>
        </form>
 */
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