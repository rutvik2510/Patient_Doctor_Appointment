const mongoose = require("mongoose");
const Patient = require("../models/patientModel");
async function addPatient(req, res) {
    console.log(req.body);
    try {
        const newPatient = new Patient(req.body);
        const result = await newPatient.save()
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getAllPatients(req, res) {
    try {
        const result = await Patient.find();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error);
    }
}
async function loginPatient(req, res) {
    console.log(req.body);
    try {
        const patientDate = req.body;

        const patient = await Patient.findOne({
            patientEmail: patientDate.patientEmail
        });
        if (!patient) {
            res.status(200).send({
                message: "patient not found",
                success: false
            });
            return
        }
        const isMatch = await Patient.findOne({ patientPassword: patientDate.patientPassword });
        if (!isMatch) {
            const result = {
                message: "password not match",
                success: false
            };
            res.status(200).send(result);
        } else {
            result = {
                message: "login SuccessFully",
                success: true,
                id: patient._id,
                name: patient.patientName
            }
            res.status(200).send(result);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    addPatient,
    getAllPatients,
    loginPatient
};