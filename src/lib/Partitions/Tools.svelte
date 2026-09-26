<script lang="ts">
	import Calculator from '$lib/Components/Tools/Calculator.svelte';
	import ByteConverter from '$lib/Components/Tools/ByteConverter.svelte';
	import DiscountCalculator from '$lib/Components/Tools/DiscountCalculator.svelte';
	import Timer from '$lib/Components/Tools/Timer.svelte';
	import Stopwatch from '$lib/Components/Tools/Stopwatch.svelte';
	import LengthConverter from '$lib/Components/Tools/LengthConverter.svelte';
	import RandomNumber from '$lib/Components/Tools/RandomNumber.svelte';
	import RandomSpinner from '$lib/Components/Tools/RandomSpinner.svelte';
	import TemperatureConverter from '$lib/Components/Tools/TemperatureConverter.svelte';
	import AgeCalculator from '$lib/Components/Tools/AgeCalculator.svelte';
	import DateCalculator from '$lib/Components/Tools/DateCalculator.svelte';
	import QRCodeGenerator from '$lib/Components/Tools/QRCodeGenerator.svelte';
	import PasswordGenerator from '$lib/Components/Tools/PasswordGenerator.svelte';

	const tools = [
		{
			name: 'Calculator',
			description: 'Basic arithmetic',
			icon: '+ − × ÷',
			iconClass: 'text-blue-600',
			content: Calculator
		},
		{
			name: 'Byte Converter',
			description: 'SI and IEC units',
			icon: 'B ⇄ KiB',
			iconClass: 'text-teal-600',
			content: ByteConverter
		},
		{
			name: 'Discount Calculator',
			description: 'Final price and savings',
			icon: '%',
			iconClass: 'text-orange-600',
			content: DiscountCalculator
		},
		{
			name: 'Timer',
			description: 'Pause and resume a countdown',
			icon: '◷',
			iconClass: 'text-rose-600',
			content: Timer
		},
		{
			name: 'Stopwatch',
			description: 'Track elapsed time',
			icon: '⏱',
			iconClass: 'text-indigo-600',
			content: Stopwatch
		},
		{
			name: 'Length Converter',
			description: 'Metric, imperial and miles',
			icon: 'km ⇄ mi',
			iconClass: 'text-emerald-600',
			content: LengthConverter
		},
		{
			name: 'Random Number',
			description: 'Pick a whole number in a range',
			icon: '#',
			iconClass: 'text-purple-600',
			content: RandomNumber
		},
		{
			name: 'Random Spinner',
			description: 'Spin a wheel of custom choices',
			icon: '✦',
			iconClass: 'text-pink-600',
			content: RandomSpinner
		},
		{
			name: 'Temperature Converter',
			description: 'Celsius, Fahrenheit and Kelvin',
			icon: '°C ⇄ °F',
			iconClass: 'text-red-600',
			content: TemperatureConverter
		},
		{
			name: 'Age Calculator',
			description: 'Age in years, months and days',
			icon: '🎂',
			iconClass: 'text-amber-600',
			content: AgeCalculator
		},
		{
			name: 'Date Calculator',
			description: 'Compare dates or shift by days',
			icon: '📅',
			iconClass: 'text-cyan-700',
			content: DateCalculator
		},
		{
			name: 'QR Code Generator',
			description: 'Turn text or URLs into QR codes',
			icon: '▦',
			iconClass: 'text-slate-700',
			content: QRCodeGenerator
		},
		{
			name: 'Password Generator',
			description: 'Create a secure random password',
			icon: '***',
			iconClass: 'text-green-700',
			content: PasswordGenerator
		}
	];
	let selectedTool = $state<(typeof tools)[number] | null>(null);
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
					{selectedTool.name}
				</h4>
			</div>
		</div>
		<selectedTool.content />
	{:else}
		<div class="mx-auto w-full max-w-xl">
			<h4 class="text-lg font-semibold text-neutral-800">Choose a tool</h4>
			<p class="text-sm text-neutral-500">Quick utilities that run in this window.</p>
		</div>
		<div class="mx-auto grid w-full max-w-xl grid-cols-1 gap-3 @sm/tools:grid-cols-2">
			{#each tools as tool (tool.name)}
				<button
					type="button"
					onclick={() => (selectedTool = tool)}
					class="flex cursor-pointer flex-col gap-3 rounded-lg border border-neutral-200 bg-white p-4 text-left shadow-sm transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
				>
					<span class="text-2xl font-bold {tool.iconClass}" aria-hidden="true">{tool.icon}</span>
					<span class="font-semibold text-neutral-800">{tool.name}</span>
					<span class="text-sm text-neutral-500">{tool.description}</span>
				</button>
			{/each}
		</div>
	{/if}
</div>
