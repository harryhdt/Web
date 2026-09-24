<script lang="ts">
	type UnitSystem = 'SI' | 'IEC';
	const systems = {
		SI: { base: 1000, units: ['B', 'kB', 'MB', 'GB', 'TB'] },
		IEC: { base: 1024, units: ['B', 'KiB', 'MiB', 'GiB', 'TiB'] }
	} as const;

	let system = $state<UnitSystem>('SI');
	let input = $state('1000');
	let fromUnit = $state(0);
	let toUnit = $state(1);

	let selectedSystem = $derived(systems[system]);
	let inputNumber = $derived.by(() => {
		const value = input.trim();
		if (!/^(?:\d+\.?\d*|\.\d+)$/.test(value)) return null;
		const number = Number(value);
		return Number.isFinite(number) ? number : null;
	});
	let converted = $derived.by(() => {
		if (inputNumber === null) return null;
		const bytes = inputNumber * selectedSystem.base ** fromUnit;
		const result = bytes / selectedSystem.base ** toUnit;
		return Number.isFinite(bytes) && Number.isFinite(result) ? result : null;
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
		<div
			class="flex flex-col gap-3 @md/tools:flex-row @md/tools:items-center @md/tools:justify-between"
		>
			<div>
				<p class="text-sm font-semibold text-neutral-800">Unit system</p>
				<p class="text-xs text-neutral-500">Choose the unit scale.</p>
			</div>
			<div
				class="grid w-full grid-cols-2 rounded-lg bg-neutral-100 p-1 @md/tools:w-auto"
				role="group"
				aria-label="Unit system"
			>
				<button
					type="button"
					aria-pressed={system === 'SI'}
					onclick={() => (system = 'SI')}
					class="min-w-0 cursor-pointer rounded-md px-2 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 @xs/tools:px-3 @xs/tools:text-sm {system ===
					'SI'
						? 'bg-neutral-800 text-white shadow-sm'
						: 'text-neutral-700 hover:bg-neutral-200'}"
				>
					SI · 1000
				</button>
				<button
					type="button"
					aria-pressed={system === 'IEC'}
					onclick={() => (system = 'IEC')}
					class="min-w-0 cursor-pointer rounded-md px-2 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 @xs/tools:px-3 @xs/tools:text-sm {system ===
					'IEC'
						? 'bg-neutral-800 text-white shadow-sm'
						: 'text-neutral-700 hover:bg-neutral-200'}"
				>
					IEC · 1024
				</button>
			</div>
		</div>
		<div class="mt-4 flex flex-col gap-4">
			<label class="flex min-w-0 flex-col gap-1.5 text-sm font-semibold text-neutral-700">
				Amount
				<input
					type="text"
					inputmode="decimal"
					bind:value={input}
					class="w-full min-w-0 rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-base font-normal text-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
				/>
			</label>
			<div
				class="grid min-w-0 grid-cols-1 items-end gap-2 @sm/tools:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]"
			>
				<label class="flex min-w-0 flex-col gap-1.5 text-sm font-semibold text-neutral-700">
					From
					<select
						bind:value={fromUnit}
						class="w-full min-w-0 rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-base font-normal text-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
					>
						{#each selectedSystem.units as unit, index (unit)}
							<option value={index}>{unit}</option>
						{/each}
					</select>
				</label>
				<span
					aria-hidden="true"
					class="text-center text-xl leading-none text-neutral-400 @sm/tools:pb-2.5"
				>
					<span class="@sm/tools:hidden">↓</span>
					<span class="hidden @sm/tools:inline">→</span>
				</span>
				<label class="flex min-w-0 flex-col gap-1.5 text-sm font-semibold text-neutral-700">
					To
					<select
						bind:value={toUnit}
						class="w-full min-w-0 rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-base font-normal text-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
					>
						{#each selectedSystem.units as unit, index (unit)}
							<option value={index}>{unit}</option>
						{/each}
					</select>
				</label>
			</div>
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
				{selectedSystem.units[toUnit]}
			</p>
		{:else if inputNumber === null}
			<p class="mt-1 text-sm text-rose-300">Enter a non-negative decimal number.</p>
		{:else}
			<p class="mt-1 text-sm text-rose-300">Value is too large to convert.</p>
		{/if}
		<p class="mt-2 text-xs text-neutral-400">
			{system === 'SI' ? '1 kB = 1000 B' : '1 KiB = 1024 B'} · B through
			{system === 'SI' ? 'TB' : 'TiB'}
		</p>
	</div>
</div>
