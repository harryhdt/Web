/** Unbiased integer in an inclusive range containing at most 2^32 values. */
export function randomInteger(minimum, maximum) {
  const range = maximum - minimum + 1;
  if (!Number.isSafeInteger(minimum) || !Number.isSafeInteger(maximum) || range < 1 || range > 0x1_0000_0000) {
    throw new RangeError('Choose an integer range with at most 2^32 values.');
  }
  const limit = Math.floor(0x1_0000_0000 / range) * range;
  const sample = new Uint32Array(1);
  do { crypto.getRandomValues(sample); } while (sample[0] >= limit);
  return minimum + (sample[0] % range);
}

const dayMs = 86_400_000;
function utcDate(year, month, day) {
  const date = new Date(0);
  date.setUTCFullYear(year, month - 1, day);
  return date;
}
export function parseDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (year < 1 || year > 9999 || month < 1 || month > 12 || day < 1 || day > 31) return null;
  const date = utcDate(year, month, day);
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day ? date : null;
}
export function formatDate(date) {
  return `${String(date.getUTCFullYear()).padStart(4, '0')}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`;
}
function addMonthsClamped(date, months) {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1 + months;
  const lastDay = utcDate(year, month + 1, 0).getUTCDate();
  return utcDate(year, month, Math.min(date.getUTCDate(), lastDay));
}
export function calendarDifference(start, end) {
  let totalMonths = (end.getUTCFullYear() - start.getUTCFullYear()) * 12 + end.getUTCMonth() - start.getUTCMonth();
  if (addMonthsClamped(start, totalMonths) > end) totalMonths -= 1;
  const anniversary = addMonthsClamped(start, totalMonths);
  return {
    years: Math.floor(totalMonths / 12),
    months: totalMonths % 12,
    days: Math.round((end.getTime() - anniversary.getTime()) / dayMs),
    totalDays: Math.round((end.getTime() - start.getTime()) / dayMs)
  };
}
export function shiftDays(date, days) {
  return new Date(date.getTime() + days * dayMs);
}
export function formatValue(value, maximumFractionDigits = 12) {
  if (value === 0) return '0';
  if (Math.abs(value) < 0.000001 || Math.abs(value) >= 1_000_000_000_000) return value.toExponential(8);
  return Number(value.toPrecision(12)).toLocaleString('en-US', { maximumFractionDigits });
}
