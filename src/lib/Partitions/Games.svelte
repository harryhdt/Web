<script lang="ts">
	import { tick } from 'svelte';

	const games = [
		{
			slug: 'tic-tac-toe',
			name: 'Tic-Tac-Toe',
			description: 'Two players or play vs AI',
			icon: '× ○',
			color: 'bg-violet-600'
		},
		{
			slug: '2048',
			name: '2048',
			description: 'Slide and merge matching tiles',
			icon: '2048',
			color: 'bg-amber-600'
		},
		{
			slug: 'snake',
			name: 'Snake',
			description: 'Eat fruit and avoid your tail',
			icon: '●→',
			color: 'bg-emerald-600'
		},
		{
			slug: 'minesweeper',
			name: 'Minesweeper',
			description: 'Find mines without setting one off',
			icon: '✹',
			color: 'bg-sky-600'
		},
		{
			slug: 'sudoku',
			name: 'Sudoku',
			description: 'Fill a grid with digits 1 to 9',
			icon: '1 9',
			color: 'bg-indigo-600'
		},
		{
			slug: 'memory-card',
			name: 'Memory Card',
			description: 'Match all the hidden pairs',
			icon: '▣',
			color: 'bg-pink-600'
		},
		{
			slug: 'connect-four',
			name: 'Connect Four',
			description: 'Two players or play vs AI',
			icon: '●○',
			color: 'bg-cyan-700'
		}
	] as const;
	let selectedGame = $state<(typeof games)[number] | null>(null);
	let root: HTMLDivElement;

	async function backToGames() {
		const slug = selectedGame?.slug;
		selectedGame = null;
		await tick();
		root.querySelector<HTMLButtonElement>(`[data-game="${slug}"]`)?.focus();
	}
</script>

<div
	class="@container/games flex min-h-0 min-w-0 w-full flex-1 flex-col gap-3 overflow-y-auto pb-2"
	bind:this={root}
>
	{#if selectedGame}
		<div class="flex min-w-0 shrink-0 items-center gap-3 border-b border-neutral-200 pb-2">
			<button
				type="button"
				aria-label="Back to games"
				title="Back to games"
				onclick={backToGames}
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
				<h4 class="truncate text-lg font-semibold text-neutral-800">{selectedGame.name}</h4>
			</div>
		</div>
		<div class="min-h-32 min-w-0 flex-1 overflow-hidden rounded-lg bg-slate-950">
			<iframe
				title="{selectedGame.name} game"
				src="/games/{selectedGame.slug}/index.html"
				sandbox="allow-scripts"
				class="h-full w-full border-0"
				onload={(event) => {
					if (document.activeElement === document.body)
						(event.currentTarget as HTMLIFrameElement).focus();
				}}
			></iframe>
		</div>
	{:else}
		<div class="mx-auto flex w-full max-w-2xl flex-col gap-4 py-3">
			<div>
				<p class="text-xs font-bold tracking-[0.18em] text-violet-600 uppercase">Play something</p>
				<h4 class="mt-1 text-2xl font-bold text-neutral-800">Choose a game</h4>
				<p class="mt-1 text-sm text-neutral-500">A quick break, right here on your desktop.</p>
			</div>
			<div class="grid grid-cols-1 gap-3 @sm/games:grid-cols-2">
				{#each games as game (game.slug)}
					<button
						type="button"
						data-game={game.slug}
						onclick={() => (selectedGame = game)}
						class="group flex min-w-0 cursor-pointer items-center gap-3 rounded-xl border border-violet-200 bg-gradient-to-br from-violet-50 to-white p-3 text-left shadow-sm transition-colors hover:border-violet-400 hover:bg-violet-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
					>
						<span
							class="grid size-12 shrink-0 place-items-center rounded-xl p-2 text-base font-bold text-white shadow-sm {game.color}"
							aria-hidden="true">{game.icon}</span
						>
						<span class="min-w-0 flex-1">
							<span class="block text-base font-bold text-neutral-800">{game.name}</span>
							<span class="mt-1 block text-xs text-neutral-500">{game.description}</span>
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
				{/each}
			</div>
		</div>
	{/if}
</div>
