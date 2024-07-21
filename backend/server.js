const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'karan123',
    database: 'alumni_db',
    port: 3306
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Route for the root URL
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome</title>
        </head>
        <body>
            <h1>Welcome to the Alumni Database</h1>
            <p><a href="/alumni">View Alumni List</a></p>
            <p><a href="/add-alumni.html">Add New Alumni</a></p>
        </body>
        </html>
    `);
});

// API to add a new alumni
app.post('/api/alumni', (req, res) => {
    const { name, email, graduationYear } = req.body;
    connection.query(
        'INSERT INTO alumni (name, email, graduationYear) VALUES (?, ?, ?)',
        [name, email, graduationYear],
        (err) => {
            if (err) {
                console.error('Error inserting data:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.send('Alumni added successfully');
        }
    );
});

// API to fetch all alumni
app.get('/api/alumni', (req, res) => {
    connection.query('SELECT * FROM alumni', (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

// API to update an existing alumni
app.put('/api/alumni/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, graduationYear } = req.body;

    connection.query(
        'UPDATE alumni SET name = ?, email = ?, graduationYear = ? WHERE id = ?',
        [name, email, graduationYear, id],
        (err) => {
            if (err) {
                console.error('Error updating data:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.send('Alumni updated successfully');
        }
    );
});

// API to delete an alumni by ID
app.delete('/api/alumni/:id', (req, res) => {
    const { id } = req.params;

    connection.query('DELETE FROM alumni WHERE id = ?', [id], (err) => {
        if (err) {
            console.error('Error deleting data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send('Alumni deleted successfully');
    });
});

// Route to display all alumni in a user-friendly format
app.get('/alumni', (req, res) => {
    connection.query('SELECT * FROM alumni', (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        let html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Alumni List</title>
            <link rel="stylesheet" href="/style.css">
        </head>
        <body>
            <h1>Alumni List</h1>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Graduation Year</th>
                    <th>Actions</th>
                </tr>
        `;

        results.forEach(alumni => {
            html += `
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
            `;
        });

        html += `
            </table>
        </body>
        </html>
        `;

        res.send(html);
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
