const mongoose = require("mongoose");
const Appointment = require("../models/appointment");


async function addAppointment(req, res) {
    console.log(req.body);
    try {
        const { patientId, doctorId, appointmentDateTime, status } = req.body;

        // Validate required fields
        if (!patientId || !doctorId || !appointmentDateTime) {
            return res.status(400).send({ error: 'Missing required fields' });
        }

        // Parse ObjectId fields correctly
        const parsedPatientId = new mongoose.Types.ObjectId(patientId.$oid || patientId);
        const parsedDoctorId = new mongoose.Types.ObjectId(doctorId.$oid || doctorId);

        // Ensure the status value matches the enum definition
        const parsedStatus = status ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase() : "Pending";

        // Create the appointment object
        const appointmentData = {
            patientId: parsedPatientId,
            doctorId: parsedDoctorId,
            appointmentDateTime: new Date(appointmentDateTime),
            status: parsedStatus
        };

        // Save the new appointment to the database
        const newAppointment = new Appointment(appointmentData);
        const result = await newAppointment.save();

        console.log(result);
        res.status(201).json(result); // 201 Created
    } catch (error) {
        console.error("Error adding appointment:", error); // Detailed error log
        res.status(500).send({ error: 'Error adding appointment', details: error });
    }
}


async function getAllAppointment(req, res) {

    console.log(req.body);
    try {
        const result = await Appointment.find({}, { __v: 0 });
        res.status(200).json(result);
    } catch (error) {
        console.error("Error retrieving appointments:", error); // Detailed error log
        res.status(500).send({ error: 'Error retrieving appointments', details: error });
    }
}

async function getappointmentsByPatientId(req, res) {
    const patientId = req.query.patientId;
    console.log("patientId*****", patientId);

    try {
        const result = await Appointment.find({}, { __v: 0 });

        res.status(200).json(result);
    } catch (error) {
        console.error("Error retrieving appointments:", error); // Detailed error log
        res.status(500).send({ error: 'Error retrieving appointments', details: error });
    }
}



async function getappointmentsByDoctorId(req, res) {
    const doctorId = req.query.doctorId;
    console.log("doctorId*******", doctorId);
    try {
        const result = await Appointment.find({}, { __v: 0 });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error);
    }


}
async function updateAppointmentByDoctor(req, res) {
    console.log("req.params for update status", req.params);
    console.log("req.body for update status", req.body);
    try {

        const { id } = req.params;
        const { status } = req.body;

        if (!['Pending', 'Accepted', 'Rejected'].includes(status)) {
            return res.status(400).json({ message: "invalid status" });
        }
        const updateAppointment = await Appointment.findByIdAndUpdate(
            id, { status }, {
                new: true
            }
        );
        if (!updateAppointment) {
            return res.status(404).json({ message: "appointment not found" });
        }
        res.status(200).json(updateAppointment);

    } catch (error) {
        console.error("Error Updating Appointment : ", error);
        if (error instanceof mongoose.error.validationError) {
            res.status(400).json({
                message: "Validation Error",
                details: error.errors
            });
        } else if (error instanceof mongoose.error.castError) {
            res.status(400).json({
                message: "Invalid ID Error",
                details: error.message
            });
        } else {
            res.status(500).json({
                message: "Internal Server Error",

            });
        }

    }
}

async function deleteAppointmentByPatient(req, res) {
    console.log("Request Body", req.body);
    try {
        const { patientId } = req.body;
        //check patient id is provided
        if (!patientId) {

            return res.status(400).json({
                message: "patientId is required"
            });
        }
        // Convert patientId to ObjectId if necessary
        const parsedPatientId = new mongoose.Types.ObjectId(patientId);

        // Delete the appointment from the database
        const result = await Appointment.deleteOne({
            patientId: parsedPatientId
        });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.status(200).json({ message: "Appointment Delete Successfully", result });
    } catch (error) {
        res.status(500).send(error);
    }
}


module.exports = {
    addAppointment,
    getAllAppointment,
    getappointmentsByPatientId,
    getappointmentsByDoctorId,
    deleteAppointmentByPatient,
    updateAppointmentByDoctor
};