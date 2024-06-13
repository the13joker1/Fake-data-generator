document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const lang = document.getElementById('lang').value;
    generateFakeData(lang);
});

const emailEndings = [
    "@gmail.com", "@yahoo.com", "@outlook.com", "@hotmail.com", "@aol.com",
    "@icloud.com", "@protonmail.com", "@gmx.de", "@web.de", "@t-online.de",
    "@freenet.de", "@mail.com", "@zoho.com", "@yandex.com", "@mail.ru",
    "@live.com", "@aol.de", "@arcor.de", "@yahoo.de", "@gmx.net",
    "@online.de", "@me.com", "@mac.com", "@freenet.com", "@hotmail.de",
    "@googlemail.com", "@t-online.com", "@yahoo.co.uk", "@msn.com",
    "@live.de", "@web.de", "@mail.de", "@google.com", "@ymail.com",
    "@rocketmail.com", "@inbox.com", "@t-online.at", "@bluewin.ch",
    "@hotmail.co.uk", "@outlook.de", "@outlook.fr", "@orange.fr",
    "@laposte.net", "@sfr.fr", "@alice.it", "@libero.it", "@fastmail.com",
    "@tiscali.it", "@virgilio.it", "@wind.it", "@tin.it", "@alice.de",
    "@alice.nl", "@virginmedia.com", "@btinternet.com", "@ntlworld.com",
    "@talktalk.net", "@shaw.ca", "@sympatico.ca", "@telus.net",
    "@rogers.com", "@bell.net", "@videotron.ca"
];

function generateFakeData(lang) {
    fetch(`https://fakerapi.it/api/v1/persons?_locale=${lang}&_quantity=1`)
        .then(response => response.json())
        .then(data => {
            const person = data.data[0];
            const name = `${person.firstname} ${person.lastname}`;
            const username = name.toLowerCase().replace(/\s/g, '_');
            const email = `${username}${emailEndings[Math.floor(Math.random() * emailEndings.length)]}`;
            const birthday = person.birthday || 'Nicht verfügbar';
            const job = person.company || 'Nicht verfügbar';
            const address = person.address ? `${person.address.street}, ${person.address.city}, ${person.address.country}` : 'Nicht verfügbar';

            displayResults(name, birthday, job, address, email);
        })
        .catch(error => console.error('Error:', error));
}

function displayResults(name, birthday, job, address, email) {
    const results = document.getElementById('results');
    results.innerHTML = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Geburtsdatum:</strong> ${birthday}</p>
        <p><strong>Beruf:</strong> ${job}</p>
        <p><strong>Adresse:</strong> ${address}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
    `;
}
