export const logEnabled = process.env.LOG_ENABLED;

export function log(...args: unknown[]): void {
  if (logEnabled) {
    console.log("logging", ...args);
  }
}

export function logError(...args: unknown[]): void {
  if (logEnabled) {
    console.error("error logging", ...args);
  }
}
