let channels = [ {
  id: 1,
  name: "1+1",
  category: "Новини",
  mainImg: "/images/news.jpg",
  bgImg: "/images/1+1.jpeg",
  times: ["10:00 - 11:50", "12:00 - 13:30", "13:50 - 16:30", "16:40 - 19:00", "19:20 - 23:00"],
  shows: ["Сніданок з 1+1", "ТСН - Головне", "Благодійний аукціон", "ТСН - Головне", "Телемарафон"],
},
{
  id: 2,
  name: "Дорама",
  category: "Фільми і Серіали",
  mainImg: "/images/goblin.jpg",
  bgImg: "/images/dorama.jpg",
  times: ["10:00 - 11:50", "12:00 - 13:30", "13:50 - 16:30", "16:40 - 19:00", "19:20 - 23:00"],
  shows: ["1 серія - Гоблін", "2 серія - Гоблін", "3-4 серії - Легенда синього моря", "5-6 серії - Легенда синього моря", "3-5 серії - Гоблін"],
},
{
  id: 3,
  name: "Світ спорту",
  category: "Спорт",
  mainImg: "/images/tennis.jpg",
  bgImg: "/images/sport.png",
  times: ["10:00 - 12:00", "12:30 - 14:30", "15:00 - 18:00", "18:20 - 20:20", "20:30 - 22:00"],
  shows: ["Великий тенніс", "Гольф у Манчестері", "Змагання зі стрільби із лука", "Маленький теніс - Кіпр", "Тренування перед змаганням: Катання на конях"],
},
{
  id: 4,
  name: "Мультики",
  category: "Дитячі",
  mainImg: "/images/baby.jpg",
  bgImg: "/images/cartoon.png",
  times: ["10:00 - 11:50", "12:00 - 13:30", "13:50 - 16:30", "16:40 - 19:00", "19:20 - 23:00"],
  shows: ["Аватар - Легенда про Аанга", "Унесені вітром - Хаяо Міядзакі", "КОКО", "Льодовиковий період", "Думками навиворіт"],
},
{
  id: 5,
  name: "EnglishDom",
  category: "Пізнавальні",
  mainImg: "/images/english.jpg", 
  bgImg: "/images/english.jpg",
  times: ["10:00 - 11:50", "12:00 - 13:30", "13:50 - 16:30", "16:40 - 19:00", "19:20 - 23:00"],
  shows: ["Англійська для дітей", "Англійська мова для рівня А2", "Англіська мова для рівня В2", "Бізнес англійська", "Англійська для ІТ"],
}
]

export default channels;

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