<script lang="ts">
	import { tick } from 'svelte';
	import IconClose from '$lib/Icons/IconClose.svelte';

	const games = [
		{
			slug: 'tic-tac-toe',
			name: 'Tic-Tac-Toe',
			icon: '× ○',
			color: 'bg-violet-600'
		},
		{
			slug: '2048',
			name: '2048',
			icon: '2048',
			color: 'bg-amber-600'
		},
		{
			slug: 'snake',
			name: 'Snake',
			icon: '●→',
			color: 'bg-emerald-600'
		},
		{
			slug: 'minesweeper',
			name: 'Minesweeper',
			icon: '✹',
			color: 'bg-sky-600'
		},
		{
			slug: 'sudoku',
			name: 'Sudoku',
			icon: '1 9',
			color: 'bg-indigo-600'
		},
		{
			slug: 'memory-card',
			name: 'Memory Card',
			icon: '▣',
			color: 'bg-pink-600'
		},
		{
			slug: 'connect-four',
			name: 'Connect Four',
			icon: '●○',
			color: 'bg-cyan-700'
		},
		{
			slug: 'sliding-puzzle',
			name: 'Sliding Puzzle',
			icon: '▦',
			color: 'bg-orange-600'
		},
		{
			slug: 'flappy-bird',
			name: 'Flappy Bird',
			icon: '🐤',
			color: 'bg-sky-600'
		},
		{
			slug: 'pixel-trail',
			name: 'Pixel Trail',
			icon: '★',
			color: 'bg-emerald-700'
		},
		{
			slug: 'mortar-watch',
			name: 'Mortar Watch',
			icon: '◎',
			color: 'bg-rose-700'
		},
		{
			slug: 'roadbreak',
			name: 'Roadbreak',
			icon: '🚗',
			color: 'bg-red-600'
		}
	] as const;
	let selectedGame = $state<(typeof games)[number] | null>(null);
	let root: HTMLDivElement;
	let gameContainer = $state<HTMLDivElement | null>(null);

	async function openGame(game: (typeof games)[number]) {
		selectedGame = game;
		await tick();
		await gameContainer?.requestFullscreen();
	}

	async function closeGame() {
		if (document.fullscreenElement === gameContainer) {
			await document.exitFullscreen();
			return;
		}
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
		<div
			class="relative min-h-32 min-w-0 flex-1 overflow-hidden rounded-lg bg-slate-950 [&:fullscreen]:rounded-none"
			bind:this={gameContainer}
			onfullscreenchange={() => {
				if (document.fullscreenElement !== gameContainer) void closeGame();
			}}
		>
			<button
				type="button"
				aria-label="Close game"
				title="Close game"
				onclick={closeGame}
				class="absolute top-3 right-3 z-10 grid size-9 cursor-pointer place-items-center rounded-full bg-neutral-900/80 text-white transition-colors hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
			>
				<IconClose class="size-5" />
			</button>
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
		<div class="w-full py-3">
			<div class="flex flex-wrap items-start justify-start gap-x-2 gap-y-4">
				{#each games as game (game.slug)}
					<button
						type="button"
						data-game={game.slug}
						onclick={() => openGame(game)}
						data-umami-event="Games > {game.name}"
						class="group flex w-24 shrink-0 cursor-pointer flex-col items-center gap-2 rounded-xl p-1 text-center transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 @sm/games:w-28"
					>
						<span
							class="grid size-16 shrink-0 place-items-center rounded-xl text-lg font-bold text-white shadow-sm @sm/games:size-20 {game.color}"
							aria-hidden="true">{game.icon}</span
						>
						<span class="text-sm font-semibold text-neutral-800">{game.name}</span>
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>
