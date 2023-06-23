module.exports = (app) => {
    const students = require('../controllers/student.controller');

    // Fetch all students
     app.get('/students', students.findAll);

    // Fetch a single student by id
    app.get('/students/:id', students.findOne);

    // Add new student
    app.post('/students', students.create);

    // Update a student by id
    app.put('/students/:id', students.update);

    // Delete a student by id
    app.delete('/students/:id', students.delete);
}