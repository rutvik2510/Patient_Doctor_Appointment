const mongoose = require("mongoose");

const patientSchema = mongoose.Schema({
    patientName: { type: String, required: false },
    patientPhoneNunmber: { type: String, required: false },
    patientGener: { type: String, required: false },
    patientDOB: { type: Date, required: false },
    patientBloodGroup: { type: String, required: false },
    patientEmail: { type: String, required: false },
    patientPassword: { type: String, required: false },
    patientAddress: { type: String, required: false },
})

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;



// "patientName": "patient1",
// "patientPhoneNunmber": "12312312312",
// "patientGener": "male",
// "patientDOB": "2001-12-12",
// "patientBloodGroup": "A+ve",
// "patientEmail": "patient1@gmail.com",
// "patientPassword": "patient1",
// "patientAddress": "pune",

// const mongoose = require("mongoose");

// const patientSchema = mongoose.Schema({
//     patientName: { type: String, required: false },
//     patientPhoneNunmber: { type: String, required: false },
//     patientGener: { type: String, required: false },
//     patientDOB: { type: Date, required: false },
//     patientBloodGroup: { type: String, required: false },
//     patientEmail: { type: String, required: false },
//     patientPassword: { type: String, required: false },
//     patientAddress: { type: String, required: false },
// });

// const Patient = mongoose.model('Patient', patientSchema);
// module.exports = Patient;