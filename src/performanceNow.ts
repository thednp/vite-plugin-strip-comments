import process from "node:process";

// quick performance check test
export function performanceNow() {
  const [seconds, nanoseconds] = process.hrtime();
  return seconds * 1000 + nanoseconds / 1000000;
}
