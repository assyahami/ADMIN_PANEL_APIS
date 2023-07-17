const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a username"],
        },
        phone: {
            type: String,
            required: [true, "Please provide a valid phone number"],
        },
        role: {
            type: String,
            enum: ["ADMIN", "SUPER_ADMIN"]
        },
        // password:{
        //     type:String,
        //     required: [true, "Please provide a password"],
        // }
    },
  { timestamps: true }
);

const Users = mongoose.model("users", UserSchema);
module.exports = Users;