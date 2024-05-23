let schedules = [
  {
    id:1,
    imgSrc: "/images/1+1.jpeg",
    imgAlt: "фото каналу",
    times: ["10:00 - 11:50", "12:00 - 13:30", "13:50 - 16:30", "16:40 - 19:00", "19:20 - 23:00"],
    shows: ["Сніданок з 1+1", "ТСН - Головне", "Благодійний аукціон", "ТСН - Головне", "Телемарафон"],
    
  },
  {
    id: 2,
    imgSrc: "/images/dorama.jpg",
    imgAlt: "фото каналу",
    times: ["10:00 - 11:50", "12:00 - 13:30", "13:50 - 16:30", "16:40 - 19:00", "19:20 - 23:00"],
    shows: ["1 серія - Гоблін", "2 серія - Гоблін", "3-4 серії - Легенда синього моря", "5-6 серії - Легенда синього моря", "3-5 серії - Гоблін"],
  
  },
  {
    id: 3,
    imgSrc: "/images/sport.png",
    imgAlt: "фото каналу",
    times: ["10:00 - 12:00", "12:30 - 14:30", "15:00 - 18:00", "18:20 - 20:20", "20:30 - 22:00"],
    shows: ["Великий тенніс", "Гольф у Манчестері", "Змагання зі стрільби із лука", "Маленький теніс - Кіпр", "Тренування перед змаганням: Катання на конях"],
    
  },
  {
    id: 4,
    imgSrc: "/images/cartoon.png",
    imgAlt: "фото каналу",
    times: ["11:00 - 12:50", "13:30 - 15:20", "15:50 - 17:30", "18:00 - 19:50", "20:30 - 23:00"],
    shows: ["Аватар - Легенда про Аанга", "Унесені вітром - Хаяо Міядзакі", "КОКО", "Льодовиковий період", "Думками навиворіт"],
    
  },
  {
    id: 5,
    imgSrc: "/images/english.jpg",
    imgAlt: "фото каналу",
    times: ["10:00 - 11:50", "12:00 - 13:30", "13:50 - 16:30", "16:40 - 19:00", "19:20 - 23:00"],
    shows: ["Англійська для дітей", "Англійська мова для рівня А2", "Англіська мова для рівня В2", "Бізнес англійська", "Англійська для ІТ"],
 
  }
];

saveSchedules();
loadSchedules();

const id = new URLSearchParams(window.location.search).get('id');
const schedule = schedules.find(schedule => schedule.id == id);

showSchedule(schedule);

function showSchedule(schedule) {
  const section = document.createElement('section');
  
  section.innerHTML = `
    <div class="col-md-12 d-flex justify-content-center mt-3">
      <img src="${schedule.imgSrc}" alt="фото каналу" class="channel-bg">
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

function saveSchedules() {
  localStorage.setItem('schedules', JSON.stringify(schedules)); 
}

function loadSchedules() {
  const data = localStorage.getItem('schedules');
  if (data) {
    schedules = JSON.parse(data);
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