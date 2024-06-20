const express = require('express');
const router = express.Router();
const patientController = require("../controllers/patientController");
const doctorController = require("../controllers/doctorController");
const appointController = require("../controllers/appointmentController");


// Define routes for patients
router.post('/patient', patientController.addPatient);
router.get('/patients', patientController.getAllPatients);
router.post('/patients/login', patientController.loginPatient);



//doctor Routes
router.post("/adddoctor", doctorController.addDoctor);
router.post("/login", doctorController.loginDoctor);
router.get("/doctors", doctorController.getAllDoctor);


//appointment Routes post get 
router.post("/addAppointment", appointController.addAppointment);
router.get("/getAllappointments", appointController.getAllAppointment);
router.delete("/deleteAppointmentByPatientId", appointController.deleteAppointmentByPatient);
router.get("/getappointmentsByPatientId", appointController.getappointmentsByPatientId);
router.get("/getappointmentsByDoctorId", appointController.getappointmentsByDoctorId);
router.put("/updateAppointmentByDoctor/:id", appointController.updateAppointmentByDoctor);

module.exports = router;