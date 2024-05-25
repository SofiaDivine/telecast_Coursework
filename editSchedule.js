import channels from "./channels.js";

function saveForms(channelId, formData) {
  localStorage.setItem(`schedule_${channelId}`, JSON.stringify(formData));
}

function loadForms(channelId) {
  const savedData = localStorage.getItem(`schedule_${channelId}`);
  return savedData ? JSON.parse(savedData) : [];
}

function createScheduleEditSection(channel) {
  const { bgImg, name, id, times, shows } = channel;
  const section = document.createElement('section');
  section.dataset.channelId = id;

  section.innerHTML = `
    <div class="col-md-12 d-flex justify-content-center mt-3" style="display: block; margin: 0 auto; width: 1100px; height: 600px;">
      <img src="${bgImg}" alt="фото каналу" class="channel-bg">
    </div>
    <div class="form-group mr-5 ml-5 mt-4">
      <label for="schedule_${id}" class="h2">Редагування розкладу каналу: ${name}</label>
      ${times.map((time, index) => `
        <div class="row">
          <div class="col-md-6">
            <input type="text" class="form-control mb-2" placeholder="Час" id="time_${id}_${index}" value="${time}">
            <div class="invalid-feedback" id="timeError_${id}_${index}"></div>
          </div>
          <div class="col-md-6">
            <input type="text" class="form-control mb-2" placeholder="Опис програми" id="description_${id}_${index}" value="${shows[index]}">
            <div class="invalid-feedback" id="descriptionError_${id}_${index}"></div>
          </div>
        </div>
      `).join('')}
      <button type="submit" class="btn btn-primary mb-5 mr-5 ml-5">Зберегти зміни</button>
    </div>
  `;

  section.querySelector('button[type="submit"]').addEventListener('click', (event) => {
    event.preventDefault();
    const formData = [];
    let isValid = true;

    for (let i = 0; i < times.length; i++) {
      const timeInput = document.getElementById(`time_${id}_${i}`);
      const descriptionInput = document.getElementById(`description_${id}_${i}`);
      const timeError = document.getElementById(`timeError_${id}_${i}`);
      const descriptionError = document.getElementById(`descriptionError_${id}_${i}`);

      const timeRegex = /^[\d\s:-]+$/;
      if (!timeRegex.test(timeInput.value)) {
        timeError.textContent = "Допускаються тільки цифри, пробіли, двокрапки і тире.";
        timeInput.classList.add("is-invalid");
        isValid = false;
      } else {
        timeError.textContent = "";
        timeInput.classList.remove("is-invalid");
      }

      const descriptionRegex = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9\s-]{3,}$/;
      if (!descriptionRegex.test(descriptionInput.value)) {
        descriptionError.textContent = "Опис повинен містити не менше 3 букв, допускаються тільки літери, цифри, пробіли та тире.";
        descriptionInput.classList.add("is-invalid");
        isValid = false;
      } else {
        descriptionError.textContent = "";
        descriptionInput.classList.remove("is-invalid");
      }

      formData.push({
        time: timeInput.value,
        description: descriptionInput.value
      });
    }

    if (isValid) {
      saveForms(id, formData);
    }
  });

  return section;
}

const urlParams = new URLSearchParams(window.location.search);
const id = parseInt(urlParams.get('id'), 10);

const channel = channels.find(channel => channel.id === id);

if (channel) {

  const savedForms = loadForms(channel.id);

  const times = savedForms.length ? savedForms.map(form => form.time) : channel.times;
  const shows = savedForms.length ? savedForms.map(form => form.description) : channel.shows;

  const scheduleSection = createScheduleEditSection({ ...channel, times, shows });

  document.body.appendChild(scheduleSection);
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
