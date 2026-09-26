<script lang="ts">
	import { randomInteger } from './random';

	let minimum = $state('1');
	let maximum = $state('100');
	let result = $state<number | null>(null);
	let bounds = $derived.by(() => {
		if (!/^-?\d+$/.test(minimum.trim()) || !/^-?\d+$/.test(maximum.trim())) return null;
		const min = Number(minimum);
		const max = Number(maximum);
		return min >= -1_000_000_000 && max <= 1_000_000_000 && min <= max ? { min, max } : null;
	});

	function generate() {
		if (!bounds) return;
		result = randomInteger(bounds.min, bounds.max);
	}
</script>

<div class="mx-auto flex w-full min-w-0 max-w-xl flex-col gap-4 pb-3">
	<div
		class="grid grid-cols-1 gap-3 rounded-xl border border-neutral-200 bg-white p-3 @xs/tools:p-4 @sm/tools:grid-cols-2"
	>
		<label class="flex min-w-0 flex-col gap-1.5 text-sm font-semibold text-neutral-700">
			Minimum
			<input
				type="text"
				inputmode="numeric"
				bind:value={minimum}
				oninput={() => (result = null)}
				class="w-full min-w-0 rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-base font-normal text-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
			/>
		</label>
		<label class="flex min-w-0 flex-col gap-1.5 text-sm font-semibold text-neutral-700">
			Maximum
			<input
				type="text"
				inputmode="numeric"
				bind:value={maximum}
				oninput={() => (result = null)}
				class="w-full min-w-0 rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-base font-normal text-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
			/>
		</label>
		{#if bounds === null}
			<p class="text-sm text-rose-600 @sm/tools:col-span-2">
				Use whole numbers from -1,000,000,000 to 1,000,000,000; minimum must not exceed maximum.
			</p>
		{/if}
	</div>
	<button
		type="button"
		onclick={generate}
		disabled={bounds === null}
		class="w-fit cursor-pointer rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
	>
		Generate number
	</button>
	<div
		class="min-w-0 rounded-xl bg-neutral-900 p-4 text-white @xs/tools:p-5"
		role="status"
		aria-live="polite"
	>
		<p class="text-xs font-semibold uppercase tracking-wide text-neutral-400">Random number</p>
		<p class="break-all text-2xl font-semibold @xs/tools:text-3xl">
			{result === null ? '—' : result.toLocaleString('en-US')}
		</p>
	</div>
</div>
