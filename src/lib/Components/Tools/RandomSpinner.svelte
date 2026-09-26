<script lang="ts">
	import { onDestroy } from 'svelte';
	import { randomInteger } from './random';

	const colors = ['#0284c7', '#7c3aed', '#ea580c', '#059669', '#be123c', '#4f46e5'];
	let input = $state('Coffee\nTea\nWater\nJuice');
	let rotation = $state(0);
	let isSpinning = $state(false);
	let winner = $state<string | null>(null);
	let timeout: ReturnType<typeof setTimeout> | undefined;
	let entries = $derived(
		input
			.split(/[\n,]+/)
			.map((item) => item.trim())
			.filter(Boolean)
	);
	let wheelBackground = $derived(
		`conic-gradient(${entries
			.map((_, index) => {
				const start = (index / entries.length) * 100;
				const end = ((index + 1) / entries.length) * 100;
				return `${colors[index % colors.length]} ${start}% ${end}%`;
			})
			.join(', ')})`
	);

	onDestroy(() => window.clearTimeout(timeout));

	function spin() {
		if (isSpinning || entries.length < 2 || entries.length > 24) return;
		const picked = randomInteger(0, entries.length - 1);
		const targetAngle = (360 - ((picked + 0.5) * 360) / entries.length) % 360;
		rotation += 1800 + ((targetAngle - (rotation % 360) + 360) % 360);
		winner = null;
		isSpinning = true;
		timeout = window.setTimeout(() => {
			winner = entries[picked];
			isSpinning = false;
		}, 1800);
	}
</script>

<div class="mx-auto flex w-full min-w-0 max-w-xl flex-col gap-4 pb-3">
	<label
		class="flex min-w-0 flex-col gap-1.5 rounded-xl border border-neutral-200 bg-white p-3 text-sm font-semibold text-neutral-700 @xs/tools:p-4"
	>
		Choices (one per line or separated by commas)
		<textarea
			bind:value={input}
			oninput={() => (winner = null)}
			disabled={isSpinning}
			rows="4"
			class="w-full min-w-0 resize-y rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-base font-normal text-neutral-800 disabled:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
		></textarea>
	</label>
	{#if entries.length < 2 || entries.length > 24}
		<p class="text-sm text-rose-600">Enter 2 to 24 choices to spin.</p>
	{/if}
	<div class="relative mx-auto size-48 @xs/tools:size-56" aria-hidden="true">
		<div
			class="absolute top-0 left-1/2 z-10 -translate-x-1/2 border-x-[10px] border-t-[18px] border-x-transparent border-t-neutral-900"
		></div>
		<div
			class="size-full rounded-full border-4 border-white shadow-lg"
			style:background={entries.length >= 2 && entries.length <= 24 ? wheelBackground : '#d4d4d4'}
			style:transform={`rotate(${rotation}deg)`}
			style:transition={isSpinning ? 'transform 1800ms cubic-bezier(0.12, 0.75, 0.12, 1)' : 'none'}
		></div>
	</div>
	{#if entries.length >= 2 && entries.length <= 24}
		<ol class="flex flex-wrap gap-2 text-sm text-neutral-700" aria-label="Spinner choices">
			{#each entries as entry, index (`${index}-${entry}`)}
				<li class="max-w-full break-all rounded-full border border-neutral-200 bg-white px-3 py-1">
					{index + 1}. {entry}
				</li>
			{/each}
		</ol>
	{/if}
	<button
		type="button"
		onclick={spin}
		disabled={isSpinning || entries.length < 2 || entries.length > 24}
		class="w-fit cursor-pointer rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
	>
		{isSpinning ? 'Spinning…' : 'Spin'}
	</button>
	<div
		class="min-w-0 rounded-xl bg-neutral-900 p-4 text-white @xs/tools:p-5"
		role="status"
		aria-live="polite"
	>
		<p class="text-xs font-semibold uppercase tracking-wide text-neutral-400">Selected choice</p>
		<p class="break-all text-2xl font-semibold @xs/tools:text-3xl">{winner ?? '—'}</p>
	</div>
</div>
