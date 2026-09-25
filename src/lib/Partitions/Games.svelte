<script lang="ts">
	type Game = 'tic-tac-toe';
	let selectedGame = $state<Game | null>(null);
</script>

<div class="@container/games flex min-h-0 min-w-0 w-full flex-1 flex-col gap-3 pb-2">
	{#if selectedGame === 'tic-tac-toe'}
		<div class="flex min-w-0 shrink-0 items-center gap-3 border-b border-neutral-200 pb-2">
			<button
				type="button"
				aria-label="Back to games"
				title="Back to games"
				onclick={() => (selectedGame = null)}
				class="grid size-9 shrink-0 cursor-pointer place-items-center rounded-full bg-neutral-100 text-neutral-700 transition-colors hover:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
			>
				<svg
					aria-hidden="true"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					class="size-5"
				>
					<path d="m15 18-6-6 6-6" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</button>
			<div class="min-w-0">
				<p class="text-xs font-semibold text-neutral-500">Games</p>
				<h4 class="truncate text-lg font-semibold text-neutral-800">Tic-Tac-Toe</h4>
			</div>
		</div>
		<div class="min-h-32 min-w-0 flex-1 overflow-hidden rounded-lg bg-slate-950">
			<iframe
				title="Tic-Tac-Toe game"
				src="/games/tic-tac-toe/index.html"
				sandbox="allow-scripts"
				class="h-full w-full border-0"
			></iframe>
		</div>
	{:else}
		<div class="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center gap-5 py-4">
			<div>
				<p class="text-xs font-bold tracking-[0.18em] text-violet-600 uppercase">Play something</p>
				<h4 class="mt-1 text-2xl font-bold text-neutral-800">Choose a game</h4>
				<p class="mt-1 text-sm text-neutral-500">A quick break, right here on your desktop.</p>
			</div>
			<button
				type="button"
				onclick={() => (selectedGame = 'tic-tac-toe')}
				class="group flex w-full cursor-pointer items-center gap-3 rounded-xl border border-violet-200 bg-gradient-to-br from-violet-50 to-white p-3 text-left shadow-sm transition-colors hover:border-violet-400 hover:bg-violet-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 @xs/games:gap-4 @xs/games:p-4"
			>
				<span
					class="grid size-12 shrink-0 grid-cols-2 place-items-center rounded-xl bg-violet-600 p-2 text-base font-bold text-white shadow-sm @xs/games:size-20 @xs/games:text-xl"
					aria-hidden="true"
				>
					<span>×</span><span>○</span><span>○</span><span>×</span>
				</span>
				<span class="min-w-0 flex-1">
					<span class="block text-lg font-bold text-neutral-800">Tic-Tac-Toe</span>
					<span class="mt-1 block text-sm text-neutral-500">Two players or play vs AI</span>
				</span>
				<svg
					aria-hidden="true"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					class="hidden size-5 shrink-0 text-violet-500 transition-transform group-hover:translate-x-1 @xs/games:block"
				>
					<path d="m9 6 6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</button>
		</div>
	{/if}
</div>
