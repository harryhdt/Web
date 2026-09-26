const dayMs = 86_400_000;

export function utcDate(year: number, month: number, day: number): Date {
	const date = new Date(0);
	date.setUTCFullYear(year, month - 1, day);
	return date;
}

export function parseDate(value: string): Date | null {
	const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
	if (!match) return null;
	const year = Number(match[1]);
	const month = Number(match[2]);
	const day = Number(match[3]);
	if (year < 1 || year > 9999 || month < 1 || month > 12 || day < 1 || day > 31) return null;
	const date = utcDate(year, month, day);
	return date.getUTCFullYear() === year &&
		date.getUTCMonth() === month - 1 &&
		date.getUTCDate() === day
		? date
		: null;
}

export function formatDate(date: Date): string {
	return `${String(date.getUTCFullYear()).padStart(4, '0')}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`;
}

function addMonthsClamped(date: Date, months: number): Date {
	const year = date.getUTCFullYear();
	const month = date.getUTCMonth() + 1 + months;
	const lastDay = utcDate(year, month + 1, 0).getUTCDate();
	return utcDate(year, month, Math.min(date.getUTCDate(), lastDay));
}

export function calendarDifference(start: Date, end: Date) {
	let totalMonths =
		(end.getUTCFullYear() - start.getUTCFullYear()) * 12 + end.getUTCMonth() - start.getUTCMonth();
	if (addMonthsClamped(start, totalMonths) > end) totalMonths -= 1;
	const anniversary = addMonthsClamped(start, totalMonths);
	return {
		years: Math.floor(totalMonths / 12),
		months: totalMonths % 12,
		days: Math.round((end.getTime() - anniversary.getTime()) / dayMs),
		totalDays: Math.round((end.getTime() - start.getTime()) / dayMs)
	};
}

export function shiftDays(date: Date, days: number): Date {
	return new Date(date.getTime() + days * dayMs);
}
