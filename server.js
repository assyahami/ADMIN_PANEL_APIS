const app = require("./app");
const { connectDB } = require("./config/db");

let port = app.get("port")


connectDB()

process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down to error due to unhandled exception`);
    server.close(() => {
        process.exit(1)
    })
})

process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down to error due to unhandled rejection`);
    server.close(() => {
        process.exit(1)
    })
})

app.listen(port, () => {
    console.log('App running on port ' + port);
})