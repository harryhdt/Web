<script lang="ts">
	import { onMount } from 'svelte';

	const scriptUrl = 'https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js';
	const scriptIntegrity = 'sha256-xUHvBjJ4hahBW8qN9gceFBibSFUzbe9PNttUvehITzY=';
	type QRCodeLibrary = new (
		element: HTMLElement,
		options: { text: string; width: number; height: number; correctLevel: number }
	) => object;
	type QRCodeGlobal = QRCodeLibrary & { CorrectLevel: { M: number } };
	const getQRCode = () => (window as Window & { QRCode?: QRCodeGlobal }).QRCode;

	let input = $state('https://example.com');
	let encoded = $state('');
	let loaded = $state(false);
	let error = $state('');
	let container = $state<HTMLDivElement>();
	onMount(() => {
		if (getQRCode()) {
			loaded = true;
			return;
		}
		let script = document.querySelector<HTMLScriptElement>('script[data-qrcodejs]');
		if (!script) {
			script = document.createElement('script');
			script.dataset.qrcodejs = '';
			script.src = scriptUrl;
			script.integrity = scriptIntegrity;
			script.crossOrigin = 'anonymous';
			script.async = true;
		}
		const onLoad = () => {
			loaded = Boolean(getQRCode());
			if (!loaded) error = 'QR code library could not initialize.';
		};
		const onError = () => {
			error = 'QR code library could not load. Check your connection.';
			script.remove();
		};
		script.addEventListener('load', onLoad);
		script.addEventListener('error', onError);
		if (!script.isConnected) document.head.append(script);
		return () => {
			script.removeEventListener('load', onLoad);
			script.removeEventListener('error', onError);
		};
	});

	$effect(() => {
		if (!loaded || !encoded || !container) return;
		// eslint-disable-next-line svelte/no-dom-manipulating -- QRCode.js owns this empty container's children.
		container.replaceChildren();
		try {
			const QRCode = getQRCode();
			if (!QRCode) throw new Error('QR code library is unavailable.');
			new QRCode(container, {
				text: encoded,
				width: 200,
				height: 200,
				correctLevel: QRCode.CorrectLevel.M
			});
			error = '';
		} catch {
			error = 'Could not encode this text. Try a shorter value.';
			// eslint-disable-next-line svelte/no-dom-manipulating -- QRCode.js owns this empty container's children.
			container.replaceChildren();
		}
	});

	function generate() {
		const value = input.trim();
		if (!value || value.length > 300) {
			error = 'Enter 1 to 300 characters.';
			return;
		}
		error = '';
		encoded = value;
	}
</script>

<svelte:head>
	<link
		rel="preload"
		as="script"
		href={scriptUrl}
		integrity={scriptIntegrity}
		crossorigin="anonymous"
	/>
</svelte:head>

<div class="mx-auto flex w-full min-w-0 max-w-xl flex-col gap-4 pb-3">
	<label
		class="flex min-w-0 flex-col gap-1.5 rounded-xl border border-neutral-200 bg-white p-3 text-sm font-semibold text-neutral-700 @xs/tools:p-4"
	>
		Text or URL (up to 300 characters)
		<textarea
			bind:value={input}
			rows="3"
			maxlength="300"
			class="w-full min-w-0 resize-y rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-base font-normal text-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
		></textarea>
	</label>
	<button
		type="button"
		onclick={generate}
		disabled={!loaded}
		class="w-fit cursor-pointer rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
	>
		Generate QR code
	</button>
	<div
		class="min-w-0 rounded-xl bg-neutral-900 p-4 text-white @xs/tools:p-5"
		role="status"
		aria-live="polite"
	>
		<p class="text-xs font-semibold uppercase tracking-wide text-neutral-400">QR code</p>
		{#if error}
			<p class="mt-2 text-sm text-rose-300">{error}</p>
		{:else if !loaded}
			<p class="mt-2 text-sm text-neutral-300">Loading QR code library from CDN…</p>
		{:else if !encoded}
			<p class="mt-2 text-sm text-neutral-300">Enter text and generate a QR code.</p>
		{/if}
		<div
			class="mt-3 flex w-fit max-w-full justify-center overflow-auto rounded-lg bg-white p-3"
			class:hidden={!encoded || !!error}
			bind:this={container}
			role="img"
			aria-label="Generated QR code"
		></div>
		{#if encoded && !error}
			<p class="mt-2 text-xs text-neutral-400">Right-click the code to save the image.</p>
		{/if}
	</div>
</div>
