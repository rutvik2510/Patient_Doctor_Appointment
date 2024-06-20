const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
    doctorName: { type: String, required: false },
    doctorPhoneNunmber: { type: String, required: false },
    doctorSpecialist: { type: String, required: false },
    doctorEmail: { type: String, required: false },
    doctorPassword: { type: String, required: false },
    doctorAddress: { type: String, required: false },
})


module.exports = mongoose.model('Doctor', doctorSchema);