// Event Listener für das Formular
document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Verhindert das Standardverhalten des Formulars (z.B. Neuladen der Seite)
    
    const lang = document.getElementById('lang').value; // Wert des Sprachfelds holen
    generateFakeData(lang); // Generiere Fake-Daten mit der ausgewählten Sprache
});

// Funktion zur Generierung von Fake-Daten
function generateFakeData(lang) {
    fetch(`https://fakerapi.it/api/v1/persons?_locale=${lang}&_quantity=1`)
        .then(response => response.json())
        .then(data => {
            const person = data.data[0];
            if (!person) {
                console.error('Keine Daten erhalten');
                return;
            }

            const name = `${person.firstname} ${person.lastname}`;
            const email = person.email || 'Nicht verfügbar'; // Echte E-Mail-Adresse aus der API-Daten verwenden
            const birthday = person.birthday || 'Nicht verfügbar';
            const address = person.address ? `${person.address.street}, ${person.address.city}, ${person.address.country}` : 'Nicht verfügbar';

            displayResults(name, birthday, address, email);
        })
        .catch(error => console.error('Fehler:', error));
}

// Funktion zum Anzeigen der Ergebnisse
function displayResults(name, birthday, address, email) {
    const results = document.getElementById('results');
    results.innerHTML = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Geburtsdatum:</strong> ${birthday}</p>
        <p><strong>Adresse:</strong> ${address}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
    `;
}
