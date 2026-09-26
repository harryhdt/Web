<script lang="ts">
	let minutes = $state('5');
	let seconds = $state('0');
	let remainingMs = $state(0);
	let endTime = 0;
	let isRunning = $state(false);
	let hasStarted = $state(false);

	let durationMs = $derived.by(() => {
		if (!/^\d{1,3}$/.test(minutes) || !/^\d{1,2}$/.test(seconds)) return null;
		const minuteCount = Number(minutes);
		const secondCount = Number(seconds);
		return secondCount <= 59 ? (minuteCount * 60 + secondCount) * 1000 : null;
	});
	let displayedSeconds = $derived(Math.ceil((hasStarted ? remainingMs : (durationMs ?? 0)) / 1000));

	$effect(() => {
		if (!isRunning) return;
		const interval = window.setInterval(() => {
			remainingMs = Math.max(0, endTime - performance.now());
			if (remainingMs === 0) isRunning = false;
		}, 100);
		return () => window.clearInterval(interval);
	});

	function start() {
		const timeLeft = hasStarted ? remainingMs : durationMs;
		if (timeLeft === null || timeLeft <= 0) return;
		remainingMs = timeLeft;
		hasStarted = true;
		endTime = performance.now() + remainingMs;
		isRunning = true;
	}

	function pause() {
		remainingMs = Math.max(0, endTime - performance.now());
		isRunning = false;
	}

	function reset() {
		isRunning = false;
		hasStarted = false;
		remainingMs = 0;
	}
</script>

<div class="mx-auto flex w-full min-w-0 max-w-xl flex-col gap-4 pb-3">
	<div
		class="grid grid-cols-2 gap-3 rounded-xl border border-neutral-200 bg-white p-3 @xs/tools:p-4"
	>
		<label class="flex min-w-0 flex-col gap-1.5 text-sm font-semibold text-neutral-700">
			Minutes (0–999)
			<input
				type="text"
				inputmode="numeric"
				bind:value={minutes}
				disabled={hasStarted}
				aria-invalid={durationMs === null}
				class="w-full min-w-0 rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-base font-normal text-neutral-800 disabled:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
			/>
		</label>
		<label class="flex min-w-0 flex-col gap-1.5 text-sm font-semibold text-neutral-700">
			Seconds (0–59)
			<input
				type="text"
				inputmode="numeric"
				bind:value={seconds}
				disabled={hasStarted}
				aria-invalid={durationMs === null}
				class="w-full min-w-0 rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-base font-normal text-neutral-800 disabled:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
			/>
		</label>
	</div>
	<div class="rounded-xl bg-neutral-900 p-5 text-center text-white" role="timer" aria-live="off">
		<p class="text-xs font-semibold uppercase tracking-wide text-neutral-400">
			{hasStarted && !isRunning && remainingMs === 0
				? 'Time is up'
				: isRunning
					? 'Counting down'
					: 'Time remaining'}
		</p>
		<p class="mt-2 font-mono text-4xl font-semibold tabular-nums @xs/tools:text-5xl">
			{String(Math.floor(displayedSeconds / 60)).padStart(2, '0')}:{String(
				displayedSeconds % 60
			).padStart(2, '0')}
		</p>
		{#if durationMs === null && !hasStarted}
			<p class="mt-2 text-sm text-rose-300">Enter up to 999 minutes and 0–59 seconds.</p>
		{/if}
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
				disabled={hasStarted ? remainingMs <= 0 : durationMs === null || durationMs === 0}
				class="cursor-pointer rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
			>
				{hasStarted ? 'Resume' : 'Start'}
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
