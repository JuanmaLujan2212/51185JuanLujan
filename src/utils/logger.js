import winston from "winston";
import __dirname from '../utils.js';
import path from "path";

const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warn: 2,
        info: 3,
        http: 4,
        verbose: 5,
        debug: 6,
        silly: 7
    },
    colors: {
        fatal: "red",
        error: "orange",
        warn: "yellow",
        info: "blue",
        http: "green",
        verbose: "white",
        debug: "purple",
        silly: "gray"
    }
}

winston.addColors(customLevels.colors);

const devLogger = winston.createLogger({
    levels: customLevels.levels,
    transports: [
        new winston.transports.Console({ level: "debug" })
    ]
});

const prodLogger = winston.createLogger({
    levels: customLevels.levels,
    transports: [
        new winston.transports.Console({ level: "info" }),
        new winston.transports.File({ filename: path.join(__dirname, "/logs/errores.log"), level: "warn" })
    ]
});

const currentEnv = "production";

export const addLogger = (req, res, next) => {
    if (currentEnv === "development") {
        req.logger = devLogger;
    } else {
        req.logger = prodLogger;
    }
    req.logger.http(`${req.url} - method: ${req.method}`);
    next();
}