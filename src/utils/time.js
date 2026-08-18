export function formatDuration(totalSeconds) {
  const safeSeconds = Math.max(0, Math.round(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

export function pluralizeMinutes(minutes) {
  const mod10 = minutes % 10;
  const mod100 = minutes % 100;
  if (mod10 === 1 && mod100 !== 11) return 'минуту';
  if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return 'минуты';
  return 'минут';
}
