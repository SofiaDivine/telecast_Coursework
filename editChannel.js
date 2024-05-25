import channels from './channels.js';

// Отримання ID каналу з URL
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

// Показ даних каналу у формі
function showChannelData(channelId) {
  const channel = channels.find(ch => ch.id === channelId);
  const channelNameInput = document.getElementById(`channelName_${channelId}`);
  const categorySelect = document.getElementById(`category_${channelId}`);
  if (channelNameInput && categorySelect) {
    channelNameInput.value = channel.name || '';
    categorySelect.value = channel.category || 'Новини'; // Default to 'Новини' if not set
  }
}

// Збереження даних каналу у localStorage
function saveChannelData(channelId, formData) {
  const channelIndex = channels.findIndex(ch => ch.id === channelId);
  if (channelIndex !== -1) {
    channels[channelIndex].name = formData.channelName;
    channels[channelIndex].category = formData.category;
    localStorage.setItem('channels', JSON.stringify(channels));
    console.log('Channel data saved to localStorage:', channels[channelIndex]);
  }
}

function loadChannels() {
  const data = localStorage.getItem('channels');
  if (data) {
    const loadedChannels = JSON.parse(data);
    channels.splice(0, channels.length, ...loadedChannels);
    console.log('Channels loaded from localStorage:', channels);
  } else {
    saveChannels(); // Зберігаємо початкові дані, якщо localStorage порожній
  }
}


// Обробка події відправки форми
function handleFormSubmit(channelId) {
  const form = document.getElementById(`channelForm_${channelId}`);
  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Запобігання відправки форми
      const channelNameInput = document.getElementById(`channelName_${channelId}`).value;
      const categorySelect = document.getElementById(`category_${channelId}`).value;
      const formData = {
        channelName: channelNameInput,
        category: categorySelect
      };
      saveChannelData(channelId, formData);
      alert('Зміни збережено!');
      window.location.href = 'index.html'; // Перенаправлення на головну сторінку
    });
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

