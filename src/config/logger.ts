import { format, createLogger, transports } from 'winston';
import 'winston-daily-rotate-file';

const dailyInfoFile = new transports.DailyRotateFile({
  level: 'info',
  filename: 'logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  maxSize: '20m',
  maxFiles: '14d',
});

const dailyErrorFile = new transports.DailyRotateFile({
  level: 'error',
  filename: 'logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  maxSize: '10m',
  maxFiles: '14d',
});

const enumerateErrorFormat = format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

export const logger = createLogger({
  level: 'debug',
  format: format.combine(
    enumerateErrorFormat(),
    format.colorize(),
    format.splat(),
    format.printf(({ level, message }) => `${level}: ${message}`),
  ),
  transports: [
    dailyInfoFile,
    dailyErrorFile,
    new transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});
