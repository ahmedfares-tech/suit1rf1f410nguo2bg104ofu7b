var bluebird = require('bluebird');
var mongodb = bluebird.promisifyAll(require('mongoose'));
const SR00 = mongodb.Schema({
    Studentid: {
        type: Number,
    },
    StudentName: {
        type: String,
        required: true,
    },
    Phones: {
        required: true,
        type: {
            studentphone: Number,
            parentsphone: Number,
            whatsappphone: Number,
        }
    },
    courseGrade: {
        type: String,
        required: true
    },
    AnotherData: {
        type: {
            SchoolName: String,
        }
    },
    REGcost: {
        type: Number,
        required: true
    }
});

module.exports = mongodb.model('StudentRegisteration', SR00);
