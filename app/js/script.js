
// Знаходимо всі елементи з класом .header-i
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

