import {createLogger, format, transports} from 'winston'

const timestampFormat = format.printf(info => {
    return `${info.level} - ${info.timestamp}: ${info.message}`
})

const logger = createLogger({
    level: 'debug',
    format: format.combine(
        format.colorize(),
        format.splat(),
        format.timestamp(),
        timestampFormat,
    ),
    transports: [
        new transports.Console({
            handleExceptions: true,
        }),
    ],
    exitOnError: false,
})

export default logger
