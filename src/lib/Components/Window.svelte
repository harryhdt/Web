<script lang="ts">
	import { incZIndex } from '$lib';
	import IconClose from '$lib/Icons/IconClose.svelte';
	import Moveable from 'moveable';
	import { untrack } from 'svelte';
	import { blur } from 'svelte/transition';

	const id = crypto.randomUUID();

	interface Props {
		class?: string;
		title: string;
		contentClass?: string;
		onClose: () => void;
		children?: import('svelte').Snippet;
	}

	let { class: className = '', title, contentClass = '', onClose, children }: Props = $props();

	const bringToTop = (target: HTMLDivElement | HTMLElement | SVGElement) => {
		$incZIndex += 2;
		target.style.zIndex = String($incZIndex);
	};

	let moveable: Moveable;
	const initMoveable = () => {
		const target = document.getElementById('window-' + id) as HTMLDivElement;
		const dragTarget = target?.querySelector('.drag-target') as HTMLDivElement;
		if (!target) return;
		moveable = new Moveable(document.body, {
			target,
			dragTarget,
			// If the container is null, the position is fixed. (default: parentElement(document.body))
			// container: document.body,
			edgeDraggable: false,
			draggable: true,
			resizable: true,
			scalable: false,
			rotatable: false,
			warpable: false,
			// Enabling pinchable lets you use events that
			// can be used in draggable, resizable, scalable, and rotateable.
			pinchable: true, // ["resizable", "scalable", "rotatable"]
			origin: false,
			keepRatio: false,
			// Resize, Scale Events at edges.
			edge: false,
			throttleDrag: 0,
			throttleResize: 0,
			throttleScale: 0,
			throttleRotate: 0,
			renderDirections: ['nw', 'ne', 'sw', 'se']
		});
		//
		moveable
			.on('dragStart', ({ target }) => {
				bringToTop(target);
			})
			.on('drag', ({ target, left, top }) => {
				target!.style.left = `${left}px`;
				target!.style.top = `${top}px`;
			})
			.on('resizeStart', ({ target }) => {
				bringToTop(target);
			})
			.on('resize', ({ target, width, height, delta }) => {
				if (delta[0]) {
					target!.style.width = `${width}px`;
				}
				if (delta[1]) {
					target!.style.height = `${height}px`;
				}
			});
	};

	$effect(() => {
		untrack(() => {
			initMoveable();
			//
			const windowElm = document.getElementById('window-' + id) as HTMLDivElement;
			if (windowElm) {
				bringToTop(windowElm);
			}
		});
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
	transition:blur={{ duration: 200 }}
	id="window-{id}"
	class="absolute bg-neutral-50 rounded-md shadow w-[calc(100%-32px)] max-w-5xl aspect-3/3 max-h-[80vh] min-[420px]:aspect-square sm:aspect-video min-w-[256px] min-h-[400px] overflow-hidden {className}"
	style="top: 50%; left: 50%; transform: translate(-50%, -50%);"
	onclick={(e) => {
		const elm = e.currentTarget as HTMLDivElement;
		bringToTop(elm);
	}}
>
	<button
		onclick={(e) => {
			e.preventDefault();
			e.stopPropagation();
			moveable.destroy();
			onClose();
		}}
		class="absolute right-2.5 top-1.5 bg-red-600 border border-red-600 text-white rounded-full flex items-center justify-center w-7 h-7 hover:bg-red-700 transition-all duration-200 active:scale-95 z-20 cursor-pointer"
	>
		<IconClose class="w-5 h-5" />
	</button>
	<div
		class="w-full h-10 bg-neutral-100 flex items-center justify-between px-2.5 relative rounded-t-md cursor-grab border-b border-neutral-200 drag-target"
	>
		<h3 class="font-medium cursor-default text-neutral-800">{title}</h3>
	</div>
	<div class="px-2.5 mt-2 overflow-auto h-[calc(100%-48px-8px)] flex flex-col {contentClass}">
		{@render children?.()}
	</div>
</div>

<style>
	:global(.moveable-control.moveable-direction, .moveable-control-box) {
		opacity: 0 !important;
	}
</style>
