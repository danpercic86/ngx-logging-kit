export const NgxLogLevels = {
    TRACE: 0,
    DEBUG: 1,
    INFO: 2,
    LOG: 3,
    WARN: 4,
    ERROR: 5,
    FATAL: 6,
    OFF: 7,
} as const;

export type NgxLogLevel = (typeof NgxLogLevels)[keyof typeof NgxLogLevels];
export type NgxLogLevelName = keyof typeof NgxLogLevels;

const NgxLogLevelsReversed: Record<NgxLogLevel, NgxLogLevelName> = Object.entries(NgxLogLevels).reduce(
    (acc, [key, value]) => ({ ...acc, [value]: key }),
    {} as Record<NgxLogLevel, NgxLogLevelName>,
);

export function getLevelName(level: NgxLogLevel): NgxLogLevelName | undefined {
    return NgxLogLevelsReversed[level];
}
