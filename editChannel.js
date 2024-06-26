import channels from "./channels.js";
import categories from "./categories.js";

const event = new Event('dataUpdated');
document.dispatchEvent(event);

function saveChannelData(channelId, channelData) {
  localStorage.setItem(`channel_${channelId}`, JSON.stringify(channelData));
  console.log('Data saved');
}

function loadChannelData(channelId) {
  const savedData = localStorage.getItem(`channel_${channelId}`);
  return savedData ? JSON.parse(savedData) : null;
}

function createChannelEditSection(channel) {
  const section = document.createElement('section');
  section.dataset.channelId = channel.id;

  const imageDiv = document.createElement('div');
  imageDiv.classList.add('col-md-12', 'd-flex', 'justify-content-center', 'mt-3');
  imageDiv.style.cssText = "display: block; margin: 0 auto; width: 1100px; height: 600px;";

  const image = document.createElement('img');
  image.src = channel.bgImg;
  image.alt = "фото каналу";
  image.classList.add('channel-bg');

  imageDiv.appendChild(image);

  const formGroupDiv = document.createElement('div');
  formGroupDiv.classList.add('form-group', 'mr-5', 'ml-5', 'mt-4');

  formGroupDiv.innerHTML = `
    <h2>Редагування каналу: ${channel.name}</h2>
    <form>
      <div class="form-group">
        <label for="channelName">Назва каналу</label>
        <input type="text" id="channelName" class="form-control" value="${channel.name}">
      </div>
      <div class="form-group">
        <label for="channelCategory">Категорія</label>
        <select id="channelCategory" class="form-control">
          ${categories.map(category => `<option value="${category}" ${channel.category === category ? 'selected' : ''}>${category}</option>`).join('')}
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Зберегти зміни</button>
    </form>
  `;

  formGroupDiv.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    const updatedChannel = {
      ...channel,
      name: formGroupDiv.querySelector('#channelName').value,
      category: formGroupDiv.querySelector('#channelCategory').value,
    };
    saveChannelData(channel.id, updatedChannel);
    alert('Зміни успішно збережено!'); 
  });

  section.appendChild(imageDiv);
  section.appendChild(formGroupDiv);

  return section;
}

const id = new URLSearchParams(window.location.search).get('id');

const channel = channels.find(channel => channel.id == id);

if (channel) {
  const channelData = loadChannelData(channel.id) || channel;
  const channelSection = createChannelEditSection(channelData);

  document.body.appendChild(channelSection);
} else {
  const errorMessage = document.createElement('p');
  errorMessage.textContent = 'Канал не знайдено.';
  document.body.appendChild(errorMessage);
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

