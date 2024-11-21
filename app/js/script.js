
// Знаходимо всі елементи з класом header-i
const headers = document.querySelectorAll('.header-i');

// Перебираємо кожен елемент .header-i
headers.forEach(header => {
    const content = header.nextElementSibling; // Знаходимо наступний сусідній елемент (контент)
    const triangle = header.querySelector('.triangle');

    header.addEventListener('click', function() {
        // Перевіряємо, чи контент наразі розгорнутий
        if (content.classList.contains('expand')) {
            // Якщо контент відкритий, згортаємо його
            content.classList.remove('expand');
            triangle.classList.remove('rotated'); // Знімаємо клас обертання
        } else {
            // Якщо контент закритий, розгортаємо його
            content.classList.add('expand');
            triangle.classList.add('rotated'); // Додаємо клас обертання
        }
    });
});


function getDataXMLHttpRequest() {
    const xhr = new XMLHttpRequest();
    const url = '/data/data.json'; // Шлях до файлу JSON

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) { // Перевіряємо стан завершення запиту
            if (xhr.status === 200) { // Перевіряємо, чи запит успішний
                const data = JSON.parse(xhr.responseText); // Парсимо отримані дані
                renderData(data); // Відображаємо дані на сторінці
            } else {
                console.error('Error loading data:', xhr.statusText); // Обробка помилок
            }
        }
    };

    xhr.onerror = function() {
        console.error('The request ended with an error.'); // Обробка помилок
    };

    xhr.open("GET", url, true);
    xhr.send(); // Відправлення запиту
}
// getDataXMLHttpRequest();

function getDataFetch() {
    fetch("http://localhost:8080/data/data.json", { cache: "no-store" }) // Запит на сервер
        .then(response => {
            if (!response.ok) {
                throw new Error('Error loading data'); // Перевірка статусу відповіді
            }
            return response.json(); // Перетворення JSON у JavaScript об'єкт
        })
        .then(data => {
            renderData(data); // Функція для відображення даних на сторінці
        })
        .catch(error => {
            console.error('Error loading data', error); // Обробка помилок
        });
}

// Виклик функції для отримання даних через Fetch API
getDataFetch();


function renderData(data) {
    const contact = document.querySelector(".contact");

    contact.innerHTML = `
    <div class="contact-header">
        <i class="contact-header-i bi bi-person-fill"></i>
        <h2>CONTACT</h2>
    </div>

    <div class="contact-phone">
        <i class="telephone-i bi bi-telephone-fill"></i>
        <div class="contact-text">
            ${data.personal_info.contact.phone_numbers.map(phone => `
                <p>${phone}</p>
            `).join('')}
        </div>
    </div>

    <div class="contact-globe">
        <i class="globe-i bi bi-globe"></i>
        <div class="contact-text">
            <p><a href="http://${data.personal_info.contact.website}" target="_blank">${data.personal_info.contact.website}</a></p>
            <p><a href="mailto:${data.personal_info.contact.email}">${data.personal_info.contact.email}</a></p>
        </div>
    </div>

    <div class="contact-map">
        <i class="map-i bi bi-geo-alt-fill"></i>
        <div class="contact-text">
            <p>${data.personal_info.contact.address}</p>
        </div>
    </div>
`;

}
