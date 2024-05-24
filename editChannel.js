import channels from './channels.js';

const id = new URLSearchParams(window.location.search).get('id');
const channelId = parseInt(id, 10); // Перетворення ID на число

// Перевірка, чи існує канал з таким ID
const channel = channels.find(ch => ch.id === channelId);

if (channel) {
  showChannelData(channelId);
  handleFormSubmit(channelId);
} else {
  console.error('Channel not found for id:', channelId);
}

function showChannelData(channelId) {
  const channel = channels.find(ch => ch.id === channelId);
  const channelNameInput = document.getElementById(`channelName_${channelId}`);
  const categorySelect = document.getElementById(`category_${channelId}`);
  if (channelNameInput && categorySelect) {
    channelNameInput.value = channel.name || '';
    categorySelect.value = channel.category || 'Новини'; // Default to 'Новини' if not set
  }
}

function saveChannelData(channelId, formData) {
  const channelIndex = channels.findIndex(ch => ch.id === channelId);
  if (channelIndex !== -1) {
    channels[channelIndex].name = formData.channelName;
    channels[channelIndex].category = formData.category;
    localStorage.setItem('channels', JSON.stringify(channels));
  }
}

function handleFormSubmit(channelId) {
  const form = document.getElementById(`channelForm_${channelId}`);
  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault(); 
      const channelNameInput = document.getElementById(`channelName_${channelId}`).value;
      const categorySelect = document.getElementById(`category_${channelId}`).value;
      const formData = {
        channelName: channelNameInput,
        category: categorySelect
      };
      saveChannelData(channelId, formData);
    });
  }
}

// Створення елементів форми редагування каналу
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
image.src = channel.bgImg; 
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
nameInput.value = channel.name;
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

categorySelect.value = channel.category;
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
