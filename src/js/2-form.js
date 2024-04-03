// Получаем форму и ключ для локального хранилища
const form = document.querySelector('.feedback-form');
const localStorageKey = 'feedback-form-state';
const formObject = {}; // Создаём пустой объект для хранения данных формы

// Функция для загрузки данных из локального хранилища
function loadFormData() {
  // Получаем данные из локального хранилища по ключу
  const storedData = localStorage.getItem(localStorageKey);
  if (storedData) {
    // Проверяем, есть ли сохранённые данные
    const parsedData = JSON.parse(storedData); // Преобразуем строку JSON в объект JavaScript
    if (parsedData) {
      // Если есть сохранённые данные, заполняем поля формы этими данными
      form.elements.email.value = parsedData.email;
      form.elements.message.value = parsedData.message;
      // Обновляем объект данных формы, чтобы он соответствовал сохранённым данным
      Object.assign(formObject, parsedData);
    }
  }
}

// Функция для сохранения данных формы в локальном хранилище
function saveFormData() {
  const formData = new FormData(form); // Получаем данные из всех полей формы
  // Проходим по каждому полю и сохраняем его значение в объект формы
  formData.forEach((value, key) => {
    formObject[key] = value.trim(); // Обрезаем пробелы вокруг значений и сохраняем их в объект формы
  });
  // Сохраняем объект формы в локальном хранилище после преобразования его в строку JSON
  localStorage.setItem(localStorageKey, JSON.stringify(formObject));
}

// Функция для сброса данных формы и удаления их из локального хранилища
function resetForm() {
  form.reset(); // Сбрасываем значения полей формы
  localStorage.removeItem(localStorageKey); // Удаляем данные из локального хранилища по ключу
}

// Слушатель события ввода данных в форму
form.addEventListener('input', () => {
  const formData = new FormData(form); // Получаем данные из всех полей формы
  // Обновляем объект данных формы при каждом вводе новых данных
  formData.forEach((value, key) => {
    formObject[key] = value.trim(); // Обрезаем пробелы вокруг значений и сохраняем их в объект формы
  });
  // Сохраняем обновлённые данные формы в локальном хранилище
  localStorage.setItem(localStorageKey, JSON.stringify(formObject));
});

// Слушатель события отправки формы
form.addEventListener('submit', e => {
  e.preventDefault(); // Отменяем стандартное поведение отправки формы

  const email = e.currentTarget.elements.email.value; // Получаем значение поля email
  const message = e.currentTarget.elements.message.value; // Получаем значение поля message

  // Проверяем, заполнены ли все поля формы
  if (email === '' || message === '') {
    alert('All form fields must be filled in'); // Выводим сообщение об ошибке, если поля не заполнены
  } else {
    // Если все поля заполнены, выводим данные формы в консоль и сбрасываем форму
    console.log(formObject);
    resetForm(); // Сбрасываем данные формы
  }
});

// Загружаем данные формы при загрузке страницы
loadFormData();
// Здесь вызываем функцию loadFormData() для загрузки данных при загрузке страницы
