const { default: mongoose } = require("mongoose");
const Users = require("../models/users");


const users = { name: 'Admin', phone: '7639950620', role: "ADMIN" } ;



async function seedUsers() {
    try {
        const user = new Users(users)
        user.save()
            .then(() => {
                console.log('User saved successfully');
            })
            .catch((error) => {
                console.error('Error saving user:', error);
            });
    } catch (error) {
        console.log(error);
    } finally {
        mongoose.disconnect()
    }

}
seedUsers()