<script lang="ts">
	import { calendarDifference, formatDate, parseDate, shiftDays } from './dates';

	type Mode = 'difference' | 'offset';
	let mode = $state<Mode>('difference');
	let firstDate = $state('');
	let secondDate = $state('');
	let offset = $state('30');
	let direction = $state<'add' | 'subtract'>('add');
	let first = $derived(parseDate(firstDate));
	let second = $derived(parseDate(secondDate));
	let difference = $derived(
		first && second
			? calendarDifference(first < second ? first : second, first < second ? second : first)
			: null
	);
	let offsetNumber = $derived.by(() => {
		if (!/^\d{1,6}$/.test(offset)) return null;
		const value = Number(offset);
		return value <= 365_000 ? value : null;
	});
	let shifted = $derived.by(() => {
		if (!first || offsetNumber === null) return null;
		const result = shiftDays(first, (direction === 'add' ? 1 : -1) * offsetNumber);
		return result.getUTCFullYear() >= 1 && result.getUTCFullYear() <= 9999 ? result : null;
	});
</script>

<div class="mx-auto flex w-full min-w-0 max-w-xl flex-col gap-4 pb-3">
	<div
		class="grid grid-cols-2 gap-1 rounded-lg bg-neutral-200 p-1"
		role="group"
		aria-label="Date operation"
	>
		<button
			type="button"
			aria-pressed={mode === 'difference'}
			onclick={() => (mode = 'difference')}
			class="cursor-pointer rounded-md px-2 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 {mode ===
			'difference'
				? 'bg-white text-neutral-900 shadow-sm'
				: 'text-neutral-600 hover:bg-neutral-100'}"
		>
			Between dates
		</button>
		<button
			type="button"
			aria-pressed={mode === 'offset'}
			onclick={() => (mode = 'offset')}
			class="cursor-pointer rounded-md px-2 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 {mode ===
			'offset'
				? 'bg-white text-neutral-900 shadow-sm'
				: 'text-neutral-600 hover:bg-neutral-100'}"
		>
			Add / subtract days
		</button>
	</div>
	<div
		class="flex min-w-0 flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-3 @xs/tools:p-4"
	>
		<label class="flex min-w-0 flex-col gap-1.5 text-sm font-semibold text-neutral-700">
			{mode === 'difference' ? 'First date' : 'Start date'}
			<input
				type="date"
				bind:value={firstDate}
				class="w-full min-w-0 rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-base font-normal text-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
			/>
		</label>
		{#if mode === 'difference'}
			<label class="flex min-w-0 flex-col gap-1.5 text-sm font-semibold text-neutral-700">
				Second date
				<input
					type="date"
					bind:value={secondDate}
					class="w-full min-w-0 rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-base font-normal text-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
				/>
			</label>
		{:else}
			<div class="grid grid-cols-1 gap-3 @sm/tools:grid-cols-2">
				<label class="flex min-w-0 flex-col gap-1.5 text-sm font-semibold text-neutral-700">
					Operation
					<select
						bind:value={direction}
						class="w-full min-w-0 rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-base font-normal text-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
					>
						<option value="add">Add days</option>
						<option value="subtract">Subtract days</option>
					</select>
				</label>
				<label class="flex min-w-0 flex-col gap-1.5 text-sm font-semibold text-neutral-700">
					Number of days
					<input
						type="text"
						inputmode="numeric"
						bind:value={offset}
						class="w-full min-w-0 rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-base font-normal text-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
					/>
				</label>
			</div>
		{/if}
	</div>
	<div
		class="min-w-0 rounded-xl bg-neutral-900 p-4 text-white @xs/tools:p-5"
		role="status"
		aria-live="polite"
	>
		<p class="text-xs font-semibold uppercase tracking-wide text-neutral-400">Result</p>
		{#if mode === 'difference' && difference}
			<p class="text-2xl font-semibold @xs/tools:text-3xl">
				{difference.totalDays.toLocaleString('en-US')} days
			</p>
			<p class="mt-2 text-sm text-neutral-300">
				{difference.years} years, {difference.months} months, {difference.days} days (absolute difference)
			</p>
		{:else if mode === 'offset' && shifted}
			<p class="text-2xl font-semibold @xs/tools:text-3xl">{formatDate(shifted)}</p>
		{:else if mode === 'offset' && first && offsetNumber === null}
			<p class="mt-1 text-sm text-rose-300">Enter 0 to 365,000 whole days.</p>
		{:else if mode === 'offset' && first && offsetNumber !== null}
			<p class="mt-1 text-sm text-rose-300">Result is outside the supported year range (1–9999).</p>
		{:else}
			<p class="mt-1 text-sm text-neutral-300">Enter valid dates to calculate a result.</p>
		{/if}
	</div>
</div>
