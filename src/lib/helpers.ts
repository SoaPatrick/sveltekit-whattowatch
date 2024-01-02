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

export function calculateAge(birthday) {
  const birthDate = new Date(birthday);
  const currentDate = new Date();
  const timeDiff = currentDate - birthDate;
  const age = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
  return age;
}

export function formatDate(date) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  return formattedDate;
}

export function getGender(genderCode) {
    if (genderCode === 1) {
      return "Female";
    } else if (genderCode === 2) {
      return "Male";
    } else {
      return "Unknown";
    }
  }

export function isDateBeforeToday(dateString) {
  const today = new Date();
  const dateToCompare = new Date(dateString);

  // Setze die Zeit auf Mitternacht, um nur das Datum zu vergleichen
  today.setHours(0, 0, 0, 0);
  dateToCompare.setHours(0, 0, 0, 0);

  return dateToCompare < today;
}

export function daysUntil(date) {
  const now = new Date();
  const futureDate = new Date(date);
  if (futureDate > now) {
    const diffInMs = futureDate.getTime() - now.getTime();
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    return diffInDays + " Days";
  } else {
    return 0;
  }
}

export function initializeModalArray(length: number): boolean[] {
  let showModal = new Array(length).fill(false);
  return showModal;
}

export function extractData(data) {
  let userId;
  if (data.session) {
    userId = data.session.user.id;
  }
  let { supabase } = data;
  return { userId, supabase };
}