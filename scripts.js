function showForm() {
    document.getElementById('alumniForm').style.display = 'block';
    document.getElementById('alumniId').value = ''; // Clear the ID field
}

function addAlumni() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const graduationYear = document.getElementById('graduationYear').value;

    fetch('http://localhost:3000/api/alumni', {
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
        fetchAlumni(); // Refresh the alumni list
    })
    .catch(error => console.error('Error:', error));
}

function fetchAlumni() {
    fetch('http://localhost:3000/api/alumni')
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
                    <th>Actions</th>
                </tr>
                ${data.map(alumni => `
                    <tr>
                        <td>${alumni.id}</td>
                        <td>${alumni.name}</td>
                        <td>${alumni.email}</td>
                        <td>${alumni.graduationYear}</td>
                        <td>
                            <button onclick="showUpdateForm(${alumni.id}, '${alumni.name}', '${alumni.email}', ${alumni.graduationYear})">Edit</button>
                            <button onclick="deleteAlumni(${alumni.id})">Delete</button>
                        </td>
                    </tr>
                `).join('')}
            </table>
        `;
    })
    .catch(error => console.error('Error:', error));
}

function showUpdateForm(id, name, email, graduationYear) {
    document.getElementById('alumniForm').style.display = 'block';
    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
    document.getElementById('graduationYear').value = graduationYear;
    document.getElementById('alumniId').value = id; // Set the ID for update
}

function updateAlumni() {
    const id = document.getElementById('alumniId').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const graduationYear = document.getElementById('graduationYear').value;

    fetch(`http://localhost:3000/api/alumni/${id}`, {
        method: 'PUT',
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
        fetchAlumni(); // Refresh the alumni list
    })
    .catch(error => console.error('Error:', error));
}

function deleteAlumni(id) {
    if (confirm('Are you sure you want to delete this record?')) {
        fetch(`http://localhost:3000/api/alumni/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            fetchAlumni(); // Refresh the alumni list
        })
        .catch(error => console.error('Error:', error));
    }
}
