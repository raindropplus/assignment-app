import jwt from "jsonwebtoken";
import { GeneralError, BadRequest } from '../utils/errors';

const config = process.env;

export const verifyToken = (req, res, next) => {
   if (config.ENVIRONMENT === 'TEST')
     return next();

  const token =
    req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];   

  if (!token) {
    //return res.status(403).send("A token is required for authentication");
    return res.status(403).json({
      status: 403,
      message: "A token is required for authentication",
    });
  }
  try {
    const tokens=token.split(' ')[1];
    const decoded = jwt.verify(tokens, config.JWT_SECRET);   
    req.user = decoded;
  } catch (err) {    
    return res.status(403).json({
      status: 403,
      message: "Invalid Token",
    });
  }
  return next();
};

export const handleError = async (err, req, res, next) => {
    let code = 500;
    if (err instanceof GeneralError) {
        code = err.getCode();
    }

    let correlationId = req.headers['x-correlation-id'];
    return res.status(code).json({
        correlationId: correlationId, message: err.message
    });
}

export const handleRequest = async (req, res, next) => {
    let correlationId = req.headers['x-correlation-id'];
    if (!correlationId) {
        correlationId = Date.now().toString();
        req.headers['x-correlation-id'] = correlationId;
    }

    res.set('x-correlation-id', correlationId);

    return next();
}

export const handleValidation = (validate) => {
    return (req, res, next) => {
        const result = validate(req.body);
        const isValid = result.error == null;
        if (isValid) {
            return next();
        }

        const { details } = result.error;
        const messages = details.map((e) => e.message);
        const msg = messages.join(',');
        throw new BadRequest(msg);
    }
}