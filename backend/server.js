const backendUrl = 'https://areyouhuman123.github.io/Alumni_db/'; // Replace with your backend URL

function addAlumni() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const graduationYear = document.getElementById('graduationYear').value;

    fetch(`${backendUrl}/api/alumni`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, graduationYear })
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        document.getElementById('alumniForm').reset();
        document.getElementById('alumniForm').style.display = 'none';
    })
    .catch(error => console.error('Error:', error));
}

function fetchAlumni() {
    fetch(`${backendUrl}/api/alumni`)
    .then(response => response.json())
    .then(data => {
        const alumniList = document.getElementById('alumniList');
        alumniList.innerHTML = `
            <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Graduation Year</th>
                    <th>Actions</th> <!-- Added Actions Column -->
                </tr>
                ${data.map(alumni => `
                    <tr>
                        <td>${alumni.id}</td>
                        <td>${alumni.name}</td>
                        <td>${alumni.email}</td>
                        <td>${alumni.graduationYear}</td>
                        <td>
                            <button class="edit" onclick="editAlumni(${alumni.id}, '${alumni.name}', '${alumni.email}', ${alumni.graduationYear})">Edit</button>
                            <button class="delete" onclick="deleteAlumni(${alumni.id})">Delete</button>
                        </td>
                    </tr>
                `).join('')}
            </table>
        `;
    })
    .catch(error => console.error('Error:', error));
}
