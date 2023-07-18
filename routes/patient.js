var express = require('express');
var router = express.Router();
const { body} = require("express-validator");
const patientController = require('../controllers/patient.Controller');
const { verifyToken } = require('../middleware/verifyAccessToken');
const { roleAuthorization } = require('../middleware/roleAuthorization');

let validateSchema = [
  body('patient_name').notEmpty().withMessage("Please provide a Patient name"),
  body('patient_contact').notEmpty().withMessage("Please provide a Patient contact ").isMobilePhone().withMessage('Invalid phone number').isLength({ min: 10 }).withMessage("Pleas provide 10 digits mobile number"),
  body('gender').notEmpty().withMessage("Please provide a gender").isIn(["Male", "Female", "Others"]).withMessage("Invalid gender provide such as Male,Female,Others"),
  body('payment_status').notEmpty().withMessage("Please provide a Patient status").isIn(["Pending", "Paid"]).withMessage("Invalid payment status provide such as Pending,Paid"),
  body('doctors_status').notEmpty().withMessage("Please provide a Patient name"),
  body('status').optional({nullable:true}).isIn([0,1,2]).withMessage("Invalid status"),
]

router.post('/create_patient/', validateSchema, verifyToken,roleAuthorization(["USERS","ADMIN"]),patientController.createPatient);
router.put('/update_patient/:id', validateSchema[3], validateSchema[4],validateSchema[5], verifyToken,roleAuthorization(["ADMIN"]),patientController.updatePatient);
router.get('/list_patient/',  verifyToken,roleAuthorization(["ADMIN"]),patientController.listPatient);
router.get('/filter_patient_attends/:id',  verifyToken,roleAuthorization(["ADMIN"]),patientController.attendPatient);
router.get('/get_patient/:id',verifyToken,roleAuthorization(["USERS","ADMIN"]),  patientController.getPatient);
router.delete('/delete_patient/:id', verifyToken,roleAuthorization(["USERS","ADMIN"]), patientController.deletePatient);

module.exports = router;
