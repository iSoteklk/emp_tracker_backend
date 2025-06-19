export const extractTimeFromDate = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

export const calculateTimeDifference = (
  startTime: Date,
  endTime: Date
): string => {
  const diffInMs = endTime.getTime() - startTime.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const hours = Math.floor(diffInSeconds / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);
  const seconds = diffInSeconds % 60;
  console.log(`Time difference: ${hours}h ${minutes}m ${seconds}s`);
  return `${hours}h ${minutes}m ${seconds}s`;
};

calculateTimeDifference(
  new Date("2025-06-18T10:00:00.000Z"),
  new Date("2025-06-18T17:00:00.000Z")
);

console.log(new Date());
