export const logEnabled = process.env.NEXT_PUBLIC_LOG_ENABLED === "true";
// console.log("logEnabled", logEnabled);

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
