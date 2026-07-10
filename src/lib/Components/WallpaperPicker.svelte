<script lang="ts">
	import Window from '$lib/Components/Window.svelte';
	import { WALLPAPERS } from '$lib/wallpapers';
	import { currentWallpaper, wallpaperPreview, wallpaperLoading } from '$lib';

	interface Props {
		onClose: () => void;
	}
	let { onClose }: Props = $props();

	// Whatever is currently visible on the desktop (preview overrides committed).
	const shown = $derived($wallpaperPreview ?? $currentWallpaper);

	const preview = (full: string) => {
		wallpaperLoading.set(true);
		const img = new Image();
		img.onload = () => wallpaperLoading.set(false);
		img.onerror = () => wallpaperLoading.set(false);
		img.src = full;
		// Live preview on the desktop; not persisted until "Apply".
		wallpaperPreview.set(full);
	};

	const apply = () => {
		currentWallpaper.set($wallpaperPreview ?? $currentWallpaper);
		wallpaperPreview.set(null);
		onClose();
	};

	// Discard the preview and revert to the committed wallpaper.
	const cancel = () => {
		wallpaperPreview.set(null);
		onClose();
	};
</script>

<Window title="Wallpaper" onClose={cancel} class="max-w-lg">
	<div class="grid grid-cols-3 gap-2 p-1">
		{#each WALLPAPERS as w (w.id)}
			<button
				type="button"
				class="relative overflow-hidden rounded-md border-2 transition-all {shown === w.full
					? 'border-blue-500'
					: 'border-transparent hover:border-blue-300'}"
				onclick={() => preview(w.full)}
				aria-label="Wallpaper {w.id}"
			>
				<img
					src={w.thumb}
					alt="Wallpaper {w.id}"
					loading="lazy"
					class="aspect-video w-full object-cover"
				/>
			</button>
		{/each}
	</div>

	{#if $wallpaperPreview}
		<div class="flex justify-end gap-2 border-t border-black/10 p-2">
			<button
				type="button"
				class="rounded-md bg-neutral-200 px-3 py-1.5 text-sm text-neutral-700 transition-colors hover:bg-neutral-300"
				onclick={cancel}
			>
				Cancel
			</button>
			<button
				type="button"
				class="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white transition-colors hover:bg-blue-700"
				onclick={apply}
			>
				Apply
			</button>
		</div>
	{/if}
</Window>
