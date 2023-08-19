export function formatEpisodeNumber(episodeNumber: number): string {
  return "E" + episodeNumber.toString().padStart(2, "0");
}

export  function formatSeasonNumber(seasonNumber: number): string {
  return "S" + seasonNumber.toString().padStart(2, "0");
}

export function getInitials(name:string):string {
  const names = name.split(" ");
  const initials = names.map((part) => part.charAt(0));
  return initials.join("").toUpperCase();
}

export function formatRuntime(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const formattedHours = hours > 0 ? `${hours}h` : '';
  const formattedMinutes = remainingMinutes > 0 ? ` ${remainingMinutes}m` : '';

  return formattedHours + formattedMinutes;
}

export function truncateString(str, maxLength, customEnding = '...') {
  if (str.length <= maxLength) {
    return str;
  } else {
    return str.slice(0, maxLength - customEnding.length) + customEnding;
  }
}