<script lang="ts">
	interface MenuItem {
		label: string;
		onSelect: () => void;
		separator?: boolean;
	}

	interface Props {
		x: number;
		y: number;
		items: MenuItem[];
		onClose: () => void;
	}

	let { x, y, items, onClose }: Props = $props();

	let menuEl = $state<HTMLDivElement | null>(null);

	// Clamp the menu inside the viewport. Recomputed when x/y or the measured
	// element change. Guards `window` for SSR safety (component is client-only).
	let style = $derived.by(() => {
		const vw = typeof window !== 'undefined' ? window.innerWidth : 9999;
		const vh = typeof window !== 'undefined' ? window.innerHeight : 9999;
		const el = menuEl;
		const w = el ? el.getBoundingClientRect().width : 0;
		const h = el ? el.getBoundingClientRect().height : 0;
		const pad = 8;
		const left = Math.min(Math.max(x, pad), Math.max(pad, vw - w - pad));
		const top = Math.min(Math.max(y, pad), Math.max(pad, vh - h - pad));
		return `left:${left}px; top:${top}px;`;
	});

	const select = (item: MenuItem) => {
		if (item.separator) return;
		item.onSelect();
		onClose();
	};

	const onDocClick = (e: MouseEvent) => {
		if (menuEl && !menuEl.contains(e.target as Node)) onClose();
	};
	const onKey = (e: KeyboardEvent) => {
		if (e.key === 'Escape') onClose();
	};

	$effect(() => {
		window.addEventListener('click', onDocClick, true);
		window.addEventListener('keydown', onKey);
		window.addEventListener('scroll', onClose, true);
		return () => {
			window.removeEventListener('click', onDocClick, true);
			window.removeEventListener('keydown', onKey);
			window.removeEventListener('scroll', onClose, true);
		};
	});
</script>

<div
	bind:this={menuEl}
	class="fixed z-[200] min-w-[170px] rounded-md bg-neutral-100 py-1 text-sm text-neutral-800 shadow-lg ring-1 ring-black/10 font-app"
	{style}
>
	{#each items as item (item.label)}
		{#if item.separator}
			<div class="my-1 h-px bg-black/10"></div>
		{:else}
			<button
				class="block w-full px-3 py-1.5 text-left transition-colors hover:bg-blue-500 hover:text-white"
				onclick={() => select(item)}
			>
				{item.label}
			</button>
		{/if}
	{/each}
</div>
