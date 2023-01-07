import express from "express";
import  rateLimit  from "express-rate-limit";
import  helmet  from "helmet";
import  mongoSanitize from "express-mongo-sanitize";
import  xss from "xss-clean";
import  hpp  from "hpp";
import  cors  from "cors";
import configure from "./controllers";
import { handleRequest, handleError } from "./middlewares/index";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Allow Cross-Origin requests
app.use(cors());

// Set security HTTP headers
app.use(helmet());

// Limit request from the same API 
const limiter = rateLimit({
    max: 150,
    windowMs: 60 * 60 * 1000,
    message: 'Too Many Request from this IP, please try again in an hour'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({
    limit: '15kb'
}));

// Data sanitization against Nosql query injection
app.use(mongoSanitize());

// Data sanitization against XSS(clean user input from malicious HTML code)
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

app.use(handleRequest);

configure(app);

app.use(handleError);

export default app;