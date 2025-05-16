// Add event listener to the form
document.getElementById('dataForm').addEventListener('submit', event => {
    event.preventDefault();
    fetchFakePerson();
});

// Fetch and display fake person data
function fetchFakePerson() {
    fetch('https://fakerapi.it/api/v1/persons?_locale=en&_quantity=1')
        .then(res => res.json())
        .then(data => {
            const person = data.data?.[0];
            if (!person) {
                showError('No data received from the API.');
                return;
            }

            const name = `${person.firstname} ${person.lastname}`;
            const email = person.email || 'Unavailable';
            const birthday = person.birthday || 'Unavailable';
            const address = person.address
                ? `${person.address.street}, ${person.address.city}, ${person.address.country}`
                : 'Unavailable';

            renderResults(name, birthday, address, email);
        })
        .catch(err => {
            console.error('API error:', err);
            showError('An error occurred while fetching data. Please try again later.');
        });
}

// Render results to the page
function renderResults(name, birthday, address, email) {
    document.getElementById('results').innerHTML = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Date of Birth:</strong> ${birthday}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Email:</strong> ${email}</p>
    `;
}

// Display an error message in red
function showError(message) {
    document.getElementById('results').innerHTML = `
        <p style="color: red;"><strong>Error:</strong> ${message}</p>
    `;
}
