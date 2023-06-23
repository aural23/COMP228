const Student = require('../models/student.model')

exports.create = (req, res) => {
    return new Promise((resolve, reject) => {
        if (!req.body.name) {
            reject({
                'message': 'Name cant be empty',
                'status': 400
            });
        }

        if (!req.body.age) {
            reject({
                'message': 'Age cant be empty',
                'status': 400
            });
        }

        if (!req.body.major) {
            reject({
                'message': 'Major cant be empty',
                'status': 400
            });
        }

        const student = new Student({
            name: req.body.name || 'Untitled',
            age: req.body.age,
            major: req.body.major
        });

        student.save()
            .then(data => {
                resolve(student);
            })
            .catch(err => {
                reject({
                    'message': 'Something went wrong!!',
                    'status': 500,
                    'error': err
                });
            });
    })
        .then(st => res.send(st))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        });
};


exports.findOne = (req, res) => {
    return new Promise((resolve, reject) => {
        Student.findById(req.params.id)
            .then(students => {
                resolve(students);
            })
            .catch(err => {
                reject({
                    'message': 'ID not found!!',
                    'status': 404,
                    'error': err
                });
            });
    })
        .then(st => res.send(st))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        });
};

exports.findAll = (req, res) => {
    return new Promise((resolve, reject) => {
        Student.find()
            .then(students => {
                resolve(students);
            })
            .catch(err => {
                reject({
                    'message': 'Something goes wrong!!',
                    'status': 500,
                    'error': err
                });
            });
    })
        .then(st => res.send(st))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        });
};


exports.update = (req, res) => {
    return new Promise((resolve, reject) => {
        const id = req.params.id;
        const { name, age, major } = req.body;

        if (!name || !age || !major) {
            reject({
                'message': 'Name, age, and major are required fields!',
                'status': 500,
                'error': err
            });
        }

        Student.findByIdAndUpdate(id, { name, age, major }, { new: true })
            .then(students => {
                resolve(students);
            })
            .catch(error => {
                reject({
                    'message': 'Student not found!',
                    'status': 404,
                    'error': error
                });
            });
    })
        .then(st => res.send(st))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        });
};


exports.delete = (req, res) => {
    return new Promise((resolve, reject) => {
        Student.findByIdAndRemove(req.params.id).then(
            students => {
                resolve({ 'message': 'Student deleted' });
            }
        ).catch(err => {
            reject({
                'message': 'Student not found!',
                'status': 404,
                'error': err
            });
        });
    })
        .then(st => res.send(st))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            } else {
                res.status(500).json({ message: err.message })
            }
        });
}