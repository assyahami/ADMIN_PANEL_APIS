const app = require("./app");
const { connectDB } = require("./config/db");

let port = app.get("port")

console.log(process.env.HELLO);

connectDB()


app.listen(port, () => {
    console.log('App running on port ' + port);
})