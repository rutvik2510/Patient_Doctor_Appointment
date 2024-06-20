const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({

    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    appointmentDateTime: { type: Date, required: true },
    status: { type: String, enum: ["Pending", "Acepted", "Rejected"], default: "pending" },

});


module.exports = mongoose.model('Appointment', appointmentSchema);