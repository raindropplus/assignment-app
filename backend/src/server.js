import app from "./app";
import { connectWithDb } from "./mongo";

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION!!! shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Application is running on port ${port}`);
    connectWithDb();
});

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION!!!  shutting down ...');
    console.log(err.name, err.message);
    app.close(() => {
        process.exit(1);
    });
});
