let channels = [
  {
      id: 1,
      name: "1+1",
      imageSrc: "/images/1+1.jpeg"
  },
  {
      id: 2,
      name: "Дорама",
      imageSrc: "/images/dorama.jpg"
  },
  {
      id: 3,
      name: "Світ спорту",
      imageSrc: "/images/sport.png"
  },
  {
      id: 4,
      name: "Мультики",
      imageSrc: "/images/cartoon.png"
  },
  {
      id: 5,
      name: "EnglishDom",
      imageSrc: "/images/english.jpg"
  }
];

function saveForms(channelId, formData) {
  localStorage.setItem(`schedule_${channelId}`, JSON.stringify(formData));
}


function loadForms(channelId) {
  const savedData = localStorage.getItem(`schedule_${channelId}`);
  return savedData ? JSON.parse(savedData) : [];
}


function showForms(forms, channelId) {
  forms.forEach((form, index) => {
      const timeInput = document.getElementById(`time_${channelId}_${index}`);
      const descriptionInput = document.getElementById(`description_${channelId}_${index}`);
      timeInput.value = form.time;
      descriptionInput.value = form.description;
  });
}

function createScheduleEditSection(imageSrc, channelName, channelId) {
  const section = document.createElement('section');
  section.dataset.channelId = channelId;

  const imageDiv = document.createElement('div');
  imageDiv.classList.add('col-md-12', 'd-flex', 'justify-content-center', 'mt-3');
  imageDiv.style.cssText = "display: block; margin: 0 auto; width: 1100px; height: 600px;";

  const image = document.createElement('img');
  image.src = imageSrc;
  image.alt = "фото каналу";
  image.classList.add('channel-bg');

  imageDiv.appendChild(image);

  const formGroupDiv = document.createElement('div');
  formGroupDiv.classList.add('form-group', 'mr-5', 'ml-5', 'mt-4');

  const label = document.createElement('label');
  label.setAttribute('for', `schedule_${channelId}`);
  label.classList.add('h2');
  label.textContent = `Редагування розкладу каналу: ${channelName}`;

  const scheduleRows = Array.from({ length: 5 }, (_, index) => createScheduleRow(channelId, index));

  formGroupDiv.appendChild(label);
  scheduleRows.forEach(row => formGroupDiv.appendChild(row));

  const saveButton = document.createElement('button');
  saveButton.setAttribute('type', 'submit');
  saveButton.classList.add('btn', 'btn-primary', 'mb-5', 'mr-5', 'ml-5');
  saveButton.textContent = "Зберегти зміни";
  saveButton.addEventListener('click', () => {
      const formData = [];
      for (let i = 0; i < 5; i++) {
          const timeInput = document.getElementById(`time_${channelId}_${i}`);
          const descriptionInput = document.getElementById(`description_${channelId}_${i}`);
          formData.push({
              time: timeInput.value,
              description: descriptionInput.value
          });
      }
      saveForms(channelId, formData);
  });

  formGroupDiv.appendChild(saveButton);

  section.appendChild(imageDiv);
  section.appendChild(formGroupDiv);

  return section;
}

function createScheduleRow(channelId, rowIndex) {
  const row = document.createElement('div');
  row.classList.add('row');

  const col1 = document.createElement('div');
  col1.classList.add('col-md-6');

  const timeInput = document.createElement('input');
  timeInput.setAttribute('type', 'text');
  timeInput.classList.add('form-control', 'mb-2');
  timeInput.setAttribute('placeholder', 'Час');
  timeInput.id = `time_${channelId}_${rowIndex}`;

  col1.appendChild(timeInput);

  const col2 = document.createElement('div');
  col2.classList.add('col-md-6');

  const descriptionInput = document.createElement('input');
  descriptionInput.setAttribute('type', 'text');
  descriptionInput.classList.add('form-control', 'mb-2');
  descriptionInput.setAttribute('placeholder', 'Опис програми');
  descriptionInput.id = `description_${channelId}_${rowIndex}`;

  col2.appendChild(descriptionInput);

  row.appendChild(col1);
  row.appendChild(col2);

  return row;
}

channels.forEach(channel => {
  const savedForms = loadForms(channel.id);
  const scheduleSection = createScheduleEditSection(channel.imageSrc, channel.name, channel.id);
  document.body.appendChild(scheduleSection);
  showForms(savedForms, channel.id);
});


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