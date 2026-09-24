<script lang="ts">
	import Calculator from '$lib/Components/Tools/Calculator.svelte';
	import ByteConverter from '$lib/Components/Tools/ByteConverter.svelte';

	type Tool = 'calculator' | 'byte-converter';
	let selectedTool = $state<Tool | null>(null);
</script>

<div class="@container/tools flex w-full min-w-0 flex-col gap-4 pb-4">
	{#if selectedTool}
		<div
			class="sticky top-0 z-10 mx-auto flex w-full max-w-xl min-w-0 items-center gap-3 border-b border-neutral-200 bg-neutral-50 py-2"
		>
			<button
				type="button"
				aria-label="Back to tools"
				title="Back to tools"
				onclick={() => (selectedTool = null)}
				class="grid size-9 shrink-0 cursor-pointer place-items-center rounded-full bg-neutral-100 text-neutral-700 transition-colors hover:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
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
				<p class="text-xs font-semibold text-neutral-500">Tools</p>
				<h4 class="truncate text-lg font-semibold text-neutral-800">
					{selectedTool === 'calculator' ? 'Calculator' : 'Byte Converter'}
				</h4>
			</div>
		</div>
		{#if selectedTool === 'calculator'}
			<Calculator />
		{:else}
			<ByteConverter />
		{/if}
	{:else}
		<div class="mx-auto w-full max-w-xl">
			<h4 class="text-lg font-semibold text-neutral-800">Choose a tool</h4>
			<p class="text-sm text-neutral-500">Quick utilities that run in this window.</p>
		</div>
		<div class="mx-auto grid w-full max-w-xl grid-cols-1 gap-3 @sm/tools:grid-cols-2">
			<button
				type="button"
				onclick={() => (selectedTool = 'calculator')}
				class="flex cursor-pointer flex-col gap-3 rounded-lg border border-neutral-200 bg-white p-4 text-left shadow-sm transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
			>
				<span class="text-2xl font-bold text-blue-600" aria-hidden="true">+ − × ÷</span>
				<span class="font-semibold text-neutral-800">Calculator</span>
				<span class="text-sm text-neutral-500">Basic arithmetic</span>
			</button>
			<button
				type="button"
				onclick={() => (selectedTool = 'byte-converter')}
				class="flex cursor-pointer flex-col gap-3 rounded-lg border border-neutral-200 bg-white p-4 text-left shadow-sm transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
			>
				<span class="text-2xl font-bold text-teal-600" aria-hidden="true">B ⇄ KiB</span>
				<span class="font-semibold text-neutral-800">Byte Converter</span>
				<span class="text-sm text-neutral-500">SI and IEC units</span>
			</button>
		</div>
	{/if}
</div>
