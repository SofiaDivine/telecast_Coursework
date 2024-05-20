let schedules = [
  {
    imgSrc: "/images/1+1.jpeg",
    imgAlt: "фото каналу",
    times: ["10:00 - 11:50", "12:00 - 13:30", "13:50 - 16:30", "16:40 - 19:00", "19:20 - 23:00"],
    shows: ["Сніданок з 1+1", "ТСН - Головне", "Благодійний аукціон", "ТСН - Головне", "Телемарафон"],
    hidden: false
  },
  {
    imgSrc: "/images/dorama.jpg",
    imgAlt: "фото каналу",
    times: ["10:00 - 11:50", "12:00 - 13:30", "13:50 - 16:30", "16:40 - 19:00", "19:20 - 23:00"],
    shows: ["1 серія - Гоблін", "2 серія - Гоблін", "3-4 серії - Легенда синього моря", "5-6 серії - Легенда синього моря", "3-5 серії - Гоблін"],
    hidden: true
  },
  {
    imgSrc: "/images/sport.png",
    imgAlt: "фото каналу",
    times: ["10:00 - 12:00", "12:30 - 14:30", "15:00 - 18:00", "18:20 - 20:20", "20:30 - 22:00"],
    shows: ["Великий тенніс", "Гольф у Манчестері", "Змагання зі стрільби із лука", "Маленький теніс - Кіпр", "Тренування перед змаганням: Катання на конях"],
    hidden: true
  },
  {
    imgSrc: "/images/cartoon.png",
    imgAlt: "фото каналу",
    times: ["11:00 - 12:50", "13:30 - 15:20", "15:50 - 17:30", "18:00 - 19:50", "20:30 - 23:00"],
    shows: ["Аватар - Легенда про Аанга", "Унесені вітром - Хаяо Міядзакі", "КОКО", "Льодовиковий період", "Думками навиворіт"],
    hidden: true
  },
  {
    imgSrc: "/images/english.jpg",
    imgAlt: "фото каналу",
    times: ["10:00 - 11:50", "12:00 - 13:30", "13:50 - 16:30", "16:40 - 19:00", "19:20 - 23:00"],
    shows: ["Англійська для дітей", "Англійська мова для рівня А2", "Англіська мова для рівня В2", "Бізнес англійська", "Англійська для ІТ"],
    hidden: true
  }
];

const app = document.getElementById('app');

schedules.forEach(schedule => {
  const section = document.createElement('section');
  if (schedule.hidden) {
    section.setAttribute('hidden', '');
  }
  section.classList.add('container', 'mb-4');

  const row = document.createElement('div');
  row.classList.add('row', 'align-items-center');

  const imgCol = document.createElement('div');
  imgCol.classList.add('col-md-12', 'text-center', 'mb-3');

  const img = document.createElement('img');
  img.src = schedule.imgSrc;
  img.alt = schedule.imgAlt;
  img.classList.add('img-fluid');
  imgCol.appendChild(img);

  const timesCol = document.createElement('div');
  timesCol.classList.add('col-md-6');

  const timesTitle = document.createElement('h5');
  timesTitle.textContent = 'Час';
  timesCol.appendChild(timesTitle);

  const times = document.createElement('ul');
  times.classList.add('list-group', 'list-group-flush');
  schedule.times.forEach(time => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.textContent = time;
    times.appendChild(li);
  });
  timesCol.appendChild(times);

  const showsCol = document.createElement('div');
  showsCol.classList.add('col-md-6');

  const showsTitle = document.createElement('h5');
  showsTitle.textContent = 'Розклад передач';
  showsCol.appendChild(showsTitle);

  const shows = document.createElement('ul');
  shows.classList.add('list-group', 'list-group-flush');
  schedule.shows.forEach(show => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.textContent = show;
    shows.appendChild(li);
  });
  showsCol.appendChild(shows);

  row.appendChild(imgCol);
  row.appendChild(timesCol);
  row.appendChild(showsCol);

  section.appendChild(row);
  app.appendChild(section);
});

const colDiv = document.createElement('div');
colDiv.classList.add('col-md-12', 'd-flex', 'justify-content-center', 'mt-3');
app.appendChild(colDiv);



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