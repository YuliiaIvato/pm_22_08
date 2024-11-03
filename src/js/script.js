// Функція для асинхронного отримання даних з JSON за допомогою XMLHttpRequest
function getDataXMLHttpRequest() {
    const xhr = new XMLHttpRequest();
    const url = '/data/data.json'; // Шлях до файлу JSON

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) { // Перевіряємо стан завершення запиту
            if (xhr.status === 200) { // Перевіряємо, чи запит успішний
                const data = JSON.parse(xhr.responseText); // Парсимо отримані дані
                renderData(data); // Відображаємо дані на сторінці
            } else {
                console.error('Помилка при отриманні даних:', xhr.statusText); // Обробка помилок
            }
        }
    };

    xhr.onerror = function() {
        console.error('Запит завершився помилкою.'); // Обробка помилок
    };

    xhr.open("GET", url, true);
    xhr.send(); // Відправлення запиту
}

// Виклик функції для отримання даних через XMLHttpRequest
getDataXMLHttpRequest();

// Функція для відображення даних на сторінці
function renderData(data) {
    // Відображення особистої інформації
    const nameElement = document.querySelector('.header-row h1');
    const titleElement = document.querySelector('.header-row p');
    nameElement.textContent = data.personal_info.name;
    titleElement.textContent = data.personal_info.title;

    // Відображення контактної інформації
    const phoneElements = document.querySelectorAll('.contact-phone p');
    phoneElements[0].textContent = data.personal_info.contact.phone_numbers[0];
    phoneElements[1].textContent = data.personal_info.contact.phone_numbers[1];

    const websiteElement = document.querySelector('.contact-globe p a');
    websiteElement.textContent = data.personal_info.contact.website;
    websiteElement.href = `http://${data.personal_info.contact.website}`;

    const emailElement = document.querySelector('.contact-globe p:nth-of-type(2) a');
    emailElement.textContent = data.personal_info.contact.email;
    emailElement.href = `mailto:${data.personal_info.contact.email}`;

    const addressElements = document.querySelectorAll('.contact-map p');
    addressElements[0].textContent = data.personal_info.contact.address;

    // Відображення "Про мене"
    const aboutElement = document.querySelector('.about .folding-content p');
    aboutElement.textContent = data.about;

    // Відображення навичок
    const skillsContainer = document.querySelector('.skills .folding-content');
    skillsContainer.innerHTML = ''; // Очищення попереднього вмісту
    data.skills.forEach(skill => {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';

        const skillLabel = document.createElement('p');
        skillLabel.textContent = skill;

        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';

        const progress = document.createElement('div');
        progress.className = 'progress';
        progress.style.width = '70%'; // Можна зробити динамічним

        progressBar.appendChild(progress);
        progressContainer.appendChild(skillLabel);
        progressContainer.appendChild(progressBar);
        skillsContainer.appendChild(progressContainer);
    });

    // Відображення мов
    const languagesContainer = document.querySelector('.languages .language-boxes .row');
    languagesContainer.innerHTML = ''; // Очищення попереднього вмісту
    data.languages.forEach(language => {
        const languageDiv = document.createElement('div');
        languageDiv.className = 'language col text-center border';
        languageDiv.textContent = language;
        languagesContainer.appendChild(languageDiv);
    });

    // Відображення хобі
    const hobbiesContainer = document.querySelector('.hobbies .folding-content');
    hobbiesContainer.innerHTML = ''; // Очищення попереднього вмісту
    data.hobbies.forEach(hobby => {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';

        const hobbyLabel = document.createElement('p');
        hobbyLabel.textContent = hobby;

        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';

        const progress = document.createElement('div');
        progress.className = 'progress';
        progress.style.width = '70%'; // Можна зробити динамічним

        progressBar.appendChild(progress);
        progressContainer.appendChild(hobbyLabel);
        progressContainer.appendChild(progressBar);
        hobbiesContainer.appendChild(progressContainer);
    });

    // Відображення освіти
    const educationContainer = document.querySelector('.education .row');
    educationContainer.innerHTML = ''; // Очищення попереднього вмісту
    data.education.forEach(item => {
        const educationItem = document.createElement('div');
        educationItem.className = 'col-md-6 education-item';

        const institution = document.createElement('h3');
        institution.textContent = item.institution;

        const level = document.createElement('p');
        level.className = 'level';
        level.textContent = item.degree;

        const years = document.createElement('p');
        years.className = 'years';
        years.textContent = item.years;

        educationItem.appendChild(institution);
        educationItem.appendChild(level);
        educationItem.appendChild(years);
        educationContainer.appendChild(educationItem);
    });

    // Відображення досвіду роботи
    const experienceContainer = document.querySelector('.experience .folding-content');
    experienceContainer.innerHTML = ''; // Очищення попереднього вмісту
    data.job_experience.forEach(job => {
        const jobDiv = document.createElement('div');
        jobDiv.className = 'job';

        const jobTitle = document.createElement('h3');
        jobTitle.className = 'job-title d-flex justify-content-between align-items-center';
        jobTitle.innerHTML = `${job.job_title} <span class="job-dates">${job.duration}</span>`;

        const jobLocation = document.createElement('p');
        jobLocation.className = 'job-location';
        jobLocation.textContent = job.location;

        const jobDescription = document.createElement('p');
        jobDescription.className = 'job-description';
        jobDescription.textContent = job.description;

        jobDiv.appendChild(jobTitle);
        jobDiv.appendChild(jobLocation);
        jobDiv.appendChild(jobDescription);
        experienceContainer.appendChild(jobDiv);
    });

    // Відображення референсів
    const referencesContainer = document.querySelector('.references .folding-content');
    referencesContainer.innerHTML = ''; // Очищення попереднього вмісту
    data.references.forEach(reference => {
        const referenceItem = document.createElement('div');
        referenceItem.className = 'reference-item';

        const referenceName = document.createElement('h3');
        referenceName.textContent = reference.name;

        const referenceAddress = document.createElement('p');
        referenceAddress.textContent = reference.address;

        const referencePhone = document.createElement('p');
        referencePhone.textContent = `Tel: ${reference.phone}`;

        const referenceEmail = document.createElement('p');
        referenceEmail.innerHTML = `Email: <a href="mailto:${reference.email}">${reference.email}</a>`;

        referenceItem.appendChild(referenceName);
        referenceItem.appendChild(referenceAddress);
        referenceItem.appendChild(referencePhone);
        referenceItem.appendChild(referenceEmail);
        referencesContainer.appendChild(referenceItem);
    });
}