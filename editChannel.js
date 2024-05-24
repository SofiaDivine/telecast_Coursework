import { channels } from './channels.js';


const id = new URLSearchParams(window.location.search).get('id');
console.log(id);

function showChannelData(channelId) {
  const formData = loadChannelData(channelId);
  const channelNameInput = document.getElementById(`name${channelId}`);
  const categorySelect = document.getElementById(`category_${channelId}`);
  channelNameInput.value = formData.name || '';
  categorySelect.value = formData.category || 'Новини'; // Default to 'Новини' if not set
}


function saveChannelData(channelId, formData) {
  localStorage.setItem(`channel_${channelId}`, JSON.stringify(formData));
}

function loadChannelData(channelId) {
  const savedData = localStorage.getItem(`channels`);
  return savedData ? JSON.parse(savedData) : {};
}

function handleFormSubmit(channelId) {
  const form = document.getElementById(`channelForm_${channelId}`);
  form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form submission
      const channelNameInput = document.getElementById(`channelName_${channelId}`).value;
      const categorySelect = document.getElementById(`category_${channelId}`).value;
      const formData = {
          channelName: channelNameInput,
          category: categorySelect
      };
      saveChannelData(channelId, formData);
  });
}

channels.forEach(channel => {
  const channelData = loadChannelData(channel.id);
  const channelName = channelData.channelName || '';
  const category = channelData.category || 'Новини'; // Default to 'Новини' if not set
  const channelContainer = document.createElement('div');
  channelContainer.classList.add('container', 'mt-4');

  const heading = document.createElement('h2');
  heading.textContent = 'Редагування каналу';
  channelContainer.appendChild(heading);

  const section = document.createElement('section');

  const imageDiv = document.createElement('div');
  imageDiv.classList.add('col-md-12', 'd-flex', 'justify-content-center', 'mt-3');
  imageDiv.style.cssText = "display: block; margin: 0 auto; width: 1100px; height: 600px;";

  const image = document.createElement('img');
  image.src = channel.img;
  image.alt = "фото каналу";
  image.classList.add('channel-bg');

  imageDiv.appendChild(image);
  section.appendChild(imageDiv);

  const form = document.createElement('form');
  form.id = `channelForm_${channel.id}`;

  const formGroup1 = document.createElement('div');
  formGroup1.classList.add('form-group', 'mt-3');

  const nameLabel = document.createElement('label');
  nameLabel.setAttribute('for', `channelName_${channel.id}`);
  nameLabel.textContent = 'Нова назва каналу:';
  formGroup1.appendChild(nameLabel);

  const nameInput = document.createElement('input');
  nameInput.setAttribute('type', 'text');
  nameInput.classList.add('form-control');
  nameInput.id = `channelName_${channel.id}`;
  nameInput.setAttribute('placeholder', 'Введіть нову назву каналу');
  nameInput.value = channelName;
  formGroup1.appendChild(nameInput);

  form.appendChild(formGroup1);

  const formGroup2 = document.createElement('div');
  formGroup2.classList.add('form-group');

  const categoryLabel = document.createElement('label');
  categoryLabel.setAttribute('for', `category_${channel.id}`);
  categoryLabel.textContent = 'Категорія:';
  formGroup2.appendChild(categoryLabel);

  const categorySelect = document.createElement('select');
  categorySelect.classList.add('form-control');
  categorySelect.id = `category_${channel.id}`;

  const categories = ['Новини', 'Спорт', 'Фільми і Серіали', 'Розважальні', 'Пізнавальні', 'Дитячі'];
  categories.forEach(cat => {
      const option = document.createElement('option');
      option.textContent = cat;
      option.value = cat;
      categorySelect.appendChild(option);
  });

  categorySelect.value = category;
  formGroup2.appendChild(categorySelect);

  form.appendChild(formGroup2);

  const saveButton = document.createElement('button');
  saveButton.setAttribute('type', 'submit');
  saveButton.classList.add('btn', 'btn-primary', 'mb-5');
  saveButton.textContent = "Зберегти зміни";
  form.appendChild(saveButton);

  section.appendChild(form);
  channelContainer.appendChild(section);
  document.body.appendChild(channelContainer);

  showChannelData(channel.id);
  handleFormSubmit(channel.id);
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
