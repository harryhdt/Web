<script lang="ts">
	const units = ['°C', '°F', 'K'] as const;
	type Unit = (typeof units)[number];
	let input = $state('0');
	let fromUnit = $state<Unit>('°C');
	let toUnit = $state<Unit>('°F');
	let inputNumber = $derived.by(() => {
		const value = input.trim();
		if (!/^-?(?:\d+\.?\d*|\.\d+)$/.test(value)) return null;
		const number = Number(value);
		return Number.isFinite(number) ? number : null;
	});
	let kelvin = $derived.by(() => {
		if (inputNumber === null) return null;
		if (fromUnit === '°C') return inputNumber + 273.15;
		if (fromUnit === '°F') return ((inputNumber + 459.67) * 5) / 9;
		return inputNumber;
	});
	let converted = $derived.by(() => {
		if (kelvin === null || kelvin < -1e-9) return null;
		const value = Math.max(0, kelvin);
		const result =
			toUnit === '°C' ? value - 273.15 : toUnit === '°F' ? (value * 9) / 5 - 459.67 : value;
		return Number.isFinite(result) ? result : null;
	});

	function formatValue(value: number): string {
		if (Math.abs(value) < 1e-10) return '0';
		if (Math.abs(value) >= 1_000_000_000_000) return value.toExponential(8);
		return Number(value.toPrecision(12)).toLocaleString('en-US', {
			maximumFractionDigits: 10
		});
	}
</script>

<div class="mx-auto flex w-full min-w-0 max-w-xl flex-col gap-4 pb-3">
	<div class="min-w-0 rounded-xl border border-neutral-200 bg-white p-3 @xs/tools:p-4">
		<label class="flex min-w-0 flex-col gap-1.5 text-sm font-semibold text-neutral-700">
			Temperature
			<input
				type="text"
				inputmode="decimal"
				bind:value={input}
				class="w-full min-w-0 rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-base font-normal text-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
			/>
		</label>
		<div class="mt-4 grid min-w-0 grid-cols-1 gap-3 @sm/tools:grid-cols-2">
			<label class="flex min-w-0 flex-col gap-1.5 text-sm font-semibold text-neutral-700">
				From
				<select
					bind:value={fromUnit}
					class="w-full min-w-0 rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-base font-normal text-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
				>
					{#each units as unit (unit)}
						<option value={unit}>{unit}</option>
					{/each}
				</select>
			</label>
			<label class="flex min-w-0 flex-col gap-1.5 text-sm font-semibold text-neutral-700">
				To
				<select
					bind:value={toUnit}
					class="w-full min-w-0 rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-base font-normal text-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
				>
					{#each units as unit (unit)}
						<option value={unit}>{unit}</option>
					{/each}
				</select>
			</label>
		</div>
	</div>
	<div
		class="min-w-0 rounded-xl bg-neutral-900 p-4 text-white @xs/tools:p-5"
		role="status"
		aria-live="polite"
	>
		<p class="text-xs font-semibold uppercase tracking-wide text-neutral-400">Result</p>
		{#if converted !== null}
			<p class="break-all text-2xl font-semibold @xs/tools:text-3xl">
				{formatValue(converted)}
				{toUnit}
			</p>
		{:else if inputNumber === null}
			<p class="mt-1 text-sm text-rose-300">Enter a valid temperature.</p>
		{:else if kelvin !== null && kelvin < -1e-9}
			<p class="mt-1 text-sm text-rose-300">Temperature cannot be below absolute zero.</p>
		{:else}
			<p class="mt-1 text-sm text-rose-300">Value is too large to convert.</p>
		{/if}
	</div>
</div>
