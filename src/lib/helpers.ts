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
