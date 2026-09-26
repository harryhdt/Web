<script lang="ts">
	let elapsedMs = $state(0);
	let isRunning = $state(false);
	let accumulatedMs = 0;
	let startedAt = 0;

	$effect(() => {
		if (!isRunning) return;
		const interval = window.setInterval(() => {
			elapsedMs = accumulatedMs + performance.now() - startedAt;
		}, 20);
		return () => window.clearInterval(interval);
	});

	function start() {
		startedAt = performance.now();
		isRunning = true;
	}

	function pause() {
		accumulatedMs += performance.now() - startedAt;
		elapsedMs = accumulatedMs;
		isRunning = false;
	}

	function reset() {
		isRunning = false;
		accumulatedMs = 0;
		elapsedMs = 0;
	}

	let centiseconds = $derived(Math.floor(elapsedMs / 10));
	let hours = $derived(Math.floor(centiseconds / 360_000));
	let minutes = $derived(Math.floor(centiseconds / 6000) % 60);
	let seconds = $derived(Math.floor(centiseconds / 100) % 60);
</script>

<div class="mx-auto flex w-full min-w-0 max-w-xl flex-col gap-4 pb-3">
	<div class="rounded-xl bg-neutral-900 p-5 text-center text-white" role="timer" aria-live="off">
		<p class="text-xs font-semibold uppercase tracking-wide text-neutral-400">Elapsed time</p>
		<p class="mt-2 font-mono text-3xl font-semibold tabular-nums @xs/tools:text-4xl">
			{String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(
				2,
				'0'
			)}.{String(centiseconds % 100).padStart(2, '0')}
		</p>
	</div>
	<div class="flex flex-wrap gap-2">
		{#if isRunning}
			<button
				type="button"
				onclick={pause}
				class="cursor-pointer rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
			>
				Pause
			</button>
		{:else}
			<button
				type="button"
				onclick={start}
				class="cursor-pointer rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
			>
				{elapsedMs > 0 ? 'Resume' : 'Start'}
			</button>
		{/if}
		<button
			type="button"
			onclick={reset}
			class="cursor-pointer rounded-lg border border-neutral-300 bg-white px-5 py-2 font-semibold text-neutral-700 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
		>
			Reset
		</button>
	</div>
</div>
