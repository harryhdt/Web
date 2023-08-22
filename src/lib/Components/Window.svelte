<script lang="ts">
	import IconClose from '$lib/Icons/IconClose.svelte';
	import Moveable from 'svelte-moveable';
	import { blur, fade, fly } from 'svelte/transition';
	let target: HTMLDivElement, dragTarget: HTMLDivElement;

	let className = '';

	export let title: string;
	export { className as class };
	export let contentClass = '';
	export let onClose: () => void;
</script>

<div
	transition:blur={{ duration: 300, amount: 25 }}
	bind:this={target}
	class="absolute bg-neutral-50 rounded-md shadow top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[calc(100%-32px)] max-w-5xl aspect-3/3 min-[420px]:aspect-square sm:aspect-video min-w-[192px] min-h-[144px] {className}"
>
	<button
		on:click|stopPropagation|preventDefault={onClose}
		class="absolute right-2.5 top-1.5 bg-red-600 border border-red-600 text-white rounded-full flex items-center justify-center w-7 h-7 hover:bg-red-700 transition-all duration-200 active:scale-95 z-20"
	>
		<IconClose class="w-5 h-5" />
	</button>
	<div
		bind:this={dragTarget}
		class="w-full h-10 bg-neutral-100 flex items-center justify-between px-2.5 relative rounded-t-md cursor-grab border-b border-neutral-200"
	>
		<h3 class="font-medium cursor-default text-neutral-800">{title}</h3>
	</div>
	<div
		class="px-2.5 mt-2 overflow-auto h-[calc(100%-48px-16px)] max-[500px]:max-h-[60vh] flex flex-col {contentClass}"
	>
		<slot />
	</div>
</div>

<Moveable
	{target}
	{dragTarget}
	draggable
	throttleDrag={1}
	origin={false}
	dot
	hideDefaultLines={true}
	edgeDraggable={false}
	startDragRotate={0}
	throttleDragRotate={0}
	on:drag={({ detail: e }) => {
		e.target.style.transform = e.transform;
	}}
	resizable
	keepRatio={false}
	throttleResize={1}
	renderDirections={['nw', 'ne', 'sw', 'se']}
	on:resize={({ detail: e }) => {
		e.target.style.width = `${e.width}px`;
		e.target.style.height = `${e.height}px`;
		e.target.style.transform = e.drag.transform;
	}}
/>

<style>
	:global(.moveable-control.moveable-direction) {
		opacity: 0 !important;
	}
</style>
