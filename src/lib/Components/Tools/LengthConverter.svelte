<script lang="ts">
	const units = {
		mm: { label: 'Millimeters (mm)', meters: 0.001 },
		cm: { label: 'Centimeters (cm)', meters: 0.01 },
		m: { label: 'Meters (m)', meters: 1 },
		km: { label: 'Kilometers (km)', meters: 1000 },
		in: { label: 'Inches (in)', meters: 0.0254 },
		ft: { label: 'Feet (ft)', meters: 0.3048 },
		yd: { label: 'Yards (yd)', meters: 0.9144 },
		mi: { label: 'Miles (mi)', meters: 1609.344 }
	} as const;
	type Unit = keyof typeof units;

	let input = $state('1');
	let fromUnit = $state<Unit>('km');
	let toUnit = $state<Unit>('mi');
	let inputNumber = $derived.by(() => {
		const value = input.trim();
		if (!/^(?:\d+\.?\d*|\.\d+)$/.test(value)) return null;
		const number = Number(value);
		return Number.isFinite(number) ? number : null;
	});
	let converted = $derived.by(() => {
		if (inputNumber === null) return null;
		const result = (inputNumber * units[fromUnit].meters) / units[toUnit].meters;
		return Number.isFinite(result) ? result : null;
	});

	function formatValue(value: number): string {
		if (value === 0) return '0';
		if (value < 0.000001 || value >= 1_000_000_000_000) return value.toExponential(8);
		return Number(value.toPrecision(12)).toLocaleString('en-US', {
			maximumFractionDigits: 12
		});
	}
</script>

<div class="mx-auto flex w-full min-w-0 max-w-xl flex-col gap-4 pb-3">
	<div class="min-w-0 rounded-xl border border-neutral-200 bg-white p-3 @xs/tools:p-4">
		<label class="flex min-w-0 flex-col gap-1.5 text-sm font-semibold text-neutral-700">
			Length
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
					{#each Object.entries(units) as [symbol, unit] (symbol)}
						<option value={symbol}>{unit.label}</option>
					{/each}
				</select>
			</label>
			<label class="flex min-w-0 flex-col gap-1.5 text-sm font-semibold text-neutral-700">
				To
				<select
					bind:value={toUnit}
					class="w-full min-w-0 rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-base font-normal text-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
				>
					{#each Object.entries(units) as [symbol, unit] (symbol)}
						<option value={symbol}>{unit.label}</option>
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
			<p class="mt-1 text-sm text-rose-300">Enter a non-negative decimal number.</p>
		{:else}
			<p class="mt-1 text-sm text-rose-300">Value is too large to convert.</p>
		{/if}
	</div>
</div>
