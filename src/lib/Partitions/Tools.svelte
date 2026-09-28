<script lang="ts">
	import { tick } from 'svelte';
	import IconClose from '$lib/Icons/IconClose.svelte';

	const tools = [
		{ slug: 'calculator', name: 'Calculator', icon: '+ − × ÷', color: 'bg-blue-600' },
		{ slug: 'byte-converter', name: 'Byte Converter', icon: 'B ⇄ KiB', color: 'bg-teal-600' },
		{
			slug: 'discount-calculator',
			name: 'Discount Calculator',
			icon: '%',
			color: 'bg-orange-600'
		},
		{ slug: 'timer', name: 'Timer', icon: '◷', color: 'bg-rose-600' },
		{ slug: 'stopwatch', name: 'Stopwatch', icon: '⏱', color: 'bg-indigo-600' },
		{ slug: 'length-converter', name: 'Length Converter', icon: 'km ⇄ mi', color: 'bg-emerald-600' },
		{ slug: 'random-number', name: 'Random Number', icon: '#', color: 'bg-purple-600' },
		{ slug: 'random-spinner', name: 'Random Spinner', icon: '✦', color: 'bg-pink-600' },
		{
			slug: 'temperature-converter',
			name: 'Temperature Converter',
			icon: '°C ⇄ °F',
			color: 'bg-red-600'
		},
		{ slug: 'age-calculator', name: 'Age Calculator', icon: '🎂', color: 'bg-amber-600' },
		{ slug: 'date-calculator', name: 'Date Calculator', icon: '📅', color: 'bg-cyan-700' },
		{ slug: 'qr-code-generator', name: 'QR Code Generator', icon: '▦', color: 'bg-slate-700' },
		{
			slug: 'password-generator',
			name: 'Password Generator',
			icon: '***',
			color: 'bg-green-700'
		}
	] as const;
	let selectedTool = $state<(typeof tools)[number] | null>(null);
	let root: HTMLDivElement;
	let toolContainer = $state<HTMLDivElement | null>(null);

	async function openTool(tool: (typeof tools)[number]) {
		selectedTool = tool;
		await tick();
		await toolContainer?.requestFullscreen();
	}

	async function closeTool() {
		if (document.fullscreenElement === toolContainer) {
			await document.exitFullscreen();
			return;
		}
		const slug = selectedTool?.slug;
		selectedTool = null;
		await tick();
		root.querySelector<HTMLButtonElement>(`[data-tool="${slug}"]`)?.focus();
	}
</script>

<div
	class="@container/tools flex min-h-0 min-w-0 w-full flex-1 flex-col gap-3 overflow-y-auto pb-2"
	bind:this={root}
>
	{#if selectedTool}
		<div
			class="relative min-h-32 min-w-0 flex-1 overflow-hidden rounded-lg bg-neutral-50 [&:fullscreen]:rounded-none"
			bind:this={toolContainer}
			onfullscreenchange={() => {
				if (document.fullscreenElement !== toolContainer) void closeTool();
			}}
		>
			<button
				type="button"
				aria-label="Close tool"
				title="Close tool"
				onclick={closeTool}
				class="absolute top-3 right-3 z-10 grid size-9 cursor-pointer place-items-center rounded-full bg-neutral-900/80 text-white transition-colors hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
			>
				<IconClose class="size-5" />
			</button>
			<iframe
				title="{selectedTool.name} tool"
				src="/tools/{selectedTool.slug}/index.html"
				class="h-full w-full border-0"
			></iframe>
		</div>
	{:else}
		<div class="flex w-full flex-wrap items-start justify-start gap-x-2 gap-y-4 py-3">
			{#each tools as tool (tool.slug)}
				<button
					type="button"
					data-tool={tool.slug}
					onclick={() => openTool(tool)}
					data-umami-event="Tools > {tool.name}"
					class="group flex w-24 shrink-0 cursor-pointer flex-col items-center gap-2 rounded-xl p-1 text-center transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 @sm/tools:w-28"
				>
					<span
						class="grid size-16 shrink-0 place-items-center rounded-xl text-sm font-bold text-white shadow-sm @sm/tools:size-20 {tool.color}"
						aria-hidden="true">{tool.icon}</span
					>
					<span class="text-sm font-semibold text-neutral-800">{tool.name}</span>
				</button>
			{/each}
		</div>
	{/if}
</div>
