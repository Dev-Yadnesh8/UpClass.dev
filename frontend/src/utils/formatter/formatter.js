export function capitalizeFirstLetter(str) {
  if (str.length === 0) {
    return ""; // Handle empty strings
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export  function formatDuration(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const hoursPart = hrs > 0 ? `${hrs}:` : "";
  const minutesPart = `${mins}`.padStart(hrs > 0 ? 2 : 1, "0");
  const secondsPart = `${secs}`.padStart(2, "0");

  return `${hoursPart}${minutesPart}:${secondsPart}`;
}

