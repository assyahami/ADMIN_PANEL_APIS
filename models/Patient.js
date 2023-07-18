const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoosePagination=require('mongoose-paginate-v2')
const PatientSchema = new Schema(
    {
        patient_name: {
            type: String,
            required: [true, "Please provide a Patient name"],
        },
        patient_contact: {
            type: String,
            required: [true, "Please provide a patient_contact"],
        },
        gender: {
            type: String,
            enum:["Male","Female",'Others'],
            required: [true, "Please provide a gender"],
        },
        payment_status: {
            type: String,
            enum: ["Pending", "Paid"],
            required: [true, "Please provide a Payment status"],
        },
        status:{
            type:Number,
            default:0,
            enum:[0,1,2],//this will status codes for upcoming=0,completed=2,cancelled=3
            required: [true, "Please provide a status"],
        },
        doctors_status:{
            type:String,
            required: [true, "Please provide a doctor status"],
        },
        // doctors__id:{
        //     type:Schema.Types.ObjectId(),
        //     ref:'doctors'
        // }
        
    },
  { timestamps: true }
);

PatientSchema.plugin(mongoosePagination)
const Patient = mongoose.model("patient", PatientSchema);
module.exports = Patient;