const Patient = require("../models/Patient");
const APIRES = require("../utils/apiResponse")
const { validationResult } = require("express-validator");
const { signinAuthToken } = require("../utils/signAuthToken");
const getPagination = require("../utils/getPaginateItem");

const createPatient = async (req, res, next) => {
    try {
        // console.log(req.user,'userid');
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            let getErrmsg = errors.array()
            let errResp = Array.isArray(getErrmsg) ? getErrmsg[0].msg : getErrmsg
            return APIRES.getErrorResult({message: errResp }, res)
        }
        let send = {}
        
        const body = req.body
        const savePatient = new Patient({
            ...body
        })
        savePatient.save().then((data) => {
            console.log(data, 'data1');
        })
        send.patient = savePatient

        APIRES.getSuccessResult(send, res)
    } catch (error) {
        return APIRES.getErrorResult(error, res)
    }
}


const updatePatient = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            let getErrmsg = errors.array()
            let errResp = Array.isArray(getErrmsg) ? getErrmsg[0].msg : getErrmsg
            return APIRES.getErrorResult({message: errResp }, res)
       
        }
        let send = {}
        const body = req.body
        console.log('body', body);
        const patientID = req.params.id
        const isPatientExit = await Patient.findById(patientID)
        if (!isPatientExit) {
            return APIRES.getNotFoundMsg("'Patient can't be found", res)
        }
        const findPatientAndUpdate = await Patient.findByIdAndUpdate(patientID, {
            ...body
        }, { new: true })
        send.data = findPatientAndUpdate
        send.mesage = "Succesfully updated patient"
        APIRES.getSuccessResult(send, res)
    } catch (error) {
        return APIRES.getErrorResult(error, res)
    }
}

const listPatient = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            let getErrmsg = errors.array()
            let errResp = Array.isArray(getErrmsg) ? getErrmsg[0].msg : getErrmsg
            return APIRES.getErrorResult({message: errResp }, res)
       
        }
        let send = {}
        let ITEMS_PER_PAGE = 10
        const body = req.body
        const query = {}
        const page = Number(req.query?.page) || 0
        const status = Number(req.query?.status) || 0
        const totalItems = await Patient.countDocuments();
        let getQuery = req.query

        const getListPatient = await Patient.find({
            payment_status: getQuery.payment_status || "Pending",
            status: status,
        }).sort({ name: 'asc' }).limit(ITEMS_PER_PAGE).skip(page).select("-__v")
        send.data = getListPatient
        send.totalItems = getListPatient.length
        send.totalIPage = totalItems
        APIRES.getSuccessResult(send, res)
    } catch (error) {
        return APIRES.getErrorResult(error, res)
    }
}

const attendPatient = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            let getErrmsg = errors.array()
            let errResp = Array.isArray(getErrmsg) ? getErrmsg[0].msg : getErrmsg
            return APIRES.getErrorResult({message: errResp }, res)
       
        }
        let send = {}
        let ITEMS_PER_PAGE = 10
        let today_start_date = new Date()
        let today_end_date = new Date(today_start_date.getTime() + 24 * 60 * 60 * 1000)

        today_start_date.setHours(0, 0, 0, 0)
        const startOfWeek = new Date(today_start_date);
        startOfWeek.setDate(today_start_date.getDate() - today_start_date.getDay()); // Set to the first day of the week (Sunday)

        const endOfWeek = new Date(today_start_date);
        endOfWeek.setDate(today_start_date.getDate() - today_start_date.getDay() + 7);

        const startOfMonth = new Date(today_start_date);
        startOfMonth.setDate(1); // Set to the first day of the month

        const endOfMonth = new Date(today_start_date);
        endOfMonth.setMonth(endOfMonth.getMonth() + 1);

        const id = req.params.id
        const page = Number(req.query.page) || 0
        let getResult;
        if (id == "week") {
            getResult = await Patient.find({
                createdAt: {
                    $gte: startOfWeek,
                    $lt: endOfWeek
                }
            }).limit(ITEMS_PER_PAGE).skip(page).select("-__v")
        } else if (id == "day") {
            getResult = await Patient.find({
                createdAt: {
                    $gt: today_start_date,
                    $lt: today_end_date
                }
            }).limit(ITEMS_PER_PAGE).skip(page).select("-__v")
        } else {
            getResult = await Patient.find({
                createdAt: {
                    $gt: startOfMonth,
                    $lt: endOfMonth
                }
            }).limit(ITEMS_PER_PAGE).skip(page).select("-__v")

        }
        send.data = getResult,
            send.totalData = getResult?.length
        console.log(id);
        APIRES.getSuccessResult(send, res)
    } catch (error) {
        return APIRES.getErrorResult(error, res)
    }
}

const getPatient = async (req, res, next) => {
    try {
        let send = {}
        const patientID = req.params.id
        const getPatient = await Patient.findById(patientID).select("-__v")
        if (!getPatient) {
            return APIRES.getNotFoundMsg("Patient can't found", res)
        }
        APIRES.getSuccessResult(getPatient, res)
    } catch (error) {
        return APIRES.getErrorResult(error, res)
    }
}

const deletePatient = async (req, res, next) => {
    try {
        let send = {}
        const patientID = req.params.id
        const isPatientExits = await Patient.findById(patientID)
        if (!isPatientExits) {
            return APIRES.getNotFoundMsg("Patient can't found", res)
        }
        const getPatient = await Patient.findByIdAndDelete(patientID).select("-__v")
        send.data = getPatient
        send.mesage = "Succesfully deleted patient"
        APIRES.getSuccessResult(send, res)
    } catch (error) {
        return APIRES.getErrorResult(error, res)
    }
}

module.exports = {
    createPatient,
    updatePatient,
    listPatient,
    getPatient,
    deletePatient,
    attendPatient
}

