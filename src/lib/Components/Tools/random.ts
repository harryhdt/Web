/** Return an unbiased integer in the inclusive range (at most 2^32 possibilities). */
export function randomInteger(minimum: number, maximum: number): number {
	const range = maximum - minimum + 1;
	if (
		!Number.isSafeInteger(minimum) ||
		!Number.isSafeInteger(maximum) ||
		range < 1 ||
		range > 0x1_0000_0000
	) {
		throw new RangeError('Choose an integer range with at most 2^32 values.');
	}
	const limit = Math.floor(0x1_0000_0000 / range) * range;
	const sample = new Uint32Array(1);
	do {
		crypto.getRandomValues(sample);
	} while (sample[0] >= limit);
	return minimum + (sample[0] % range);
}
