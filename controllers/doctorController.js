const mongoose = require("mongoose");
const Doctor = require("../models/doctorModel")

async function addDoctor(req, res) {
    console.log(req.body);
    try {
        const newDoctor = new Doctor(req.body);
        const result = await newDoctor.save()
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getAllDoctor(req, res) {
    try {
        const result = await Doctor.find();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error);
    }
}
async function loginDoctor(req, res) {
    console.log(req.body);
    try {
        const DoctorDate = req.body;

        const doctor = await Doctor.findOne({
            doctorEmail: DoctorDate.doctorEmail
        });
        if (!doctor) {
            res.status(200).send({
                message: "doctor not found",
                success: false
            });
            return
        }
        const isMatch = await Doctor.findOne({ doctorPassword: DoctorDate.doctorPassword });
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
                id: doctor._id,
                name: doctor.doctorName
            }
            res.status(200).send(result);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    addDoctor,
    getAllDoctor,
    loginDoctor
};