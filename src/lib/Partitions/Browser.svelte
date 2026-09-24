<script lang="ts">
	let address = $state('');
	let openedUrl = $state<string | null>(null);
	let error = $state('');
	let navigationId = $state(0);

	const schemePattern = /^[a-z][a-z\d+.-]*:/i;
	const httpPattern = /^https?:\/\//i;
	const hostWithPortPattern = /^(?:localhost|(?:[a-z\d-]+\.)+[a-z\d-]+):\d{1,5}(?:[/?#]|$)/i;

	function normalizeAddress(value: string): string | null {
		const trimmed = value.trim();
		if (!trimmed || trimmed.startsWith('/') || trimmed.includes('\\')) return null;

		const explicitHttp = httpPattern.test(trimmed);
		if (schemePattern.test(trimmed) && !explicitHttp && !hostWithPortPattern.test(trimmed)) {
			return null;
		}

		try {
			const url = new URL(explicitHttp ? trimmed : `https://${trimmed}`);
			if (!['http:', 'https:'].includes(url.protocol) || !url.hostname) return null;
			if (url.username || url.password) return null;
			if (!explicitHttp && url.hostname !== 'localhost' && !url.hostname.includes('.')) {
				return null;
			}
			return url.href;
		} catch {
			return null;
		}
	}

	function navigate(event: SubmitEvent) {
		event.preventDefault();
		const nextUrl = normalizeAddress(address);
		if (!nextUrl) {
			error = 'Use a domain or an HTTP(S) address.';
			return;
		}
		address = nextUrl;
		openedUrl = nextUrl;
		error = '';
		navigationId += 1;
	}
</script>

<div class="@container/browser flex w-full min-w-0 min-h-0 flex-1 flex-col gap-2 pb-2">
	<div class="relative z-20">
		<form onsubmit={navigate} class="flex min-w-0 flex-col gap-2 @sm/browser:flex-row">
			<label class="block min-w-0 w-full flex-1">
				<span class="sr-only">Web address</span>
				<input
					type="text"
					inputmode="url"
					autocapitalize="off"
					autocomplete="off"
					spellcheck="false"
					placeholder="Enter a web address"
					bind:value={address}
					oninput={() => (error = '')}
					aria-invalid={Boolean(error)}
					aria-describedby={error ? 'browser-address-error' : undefined}
					class="w-full min-w-0 rounded-md border bg-white px-3 py-2 text-sm text-neutral-800 focus-visible:outline-none focus-visible:inset-ring-2 {error
						? 'border-rose-400 focus-visible:inset-ring-rose-500'
						: 'border-neutral-300 focus-visible:inset-ring-neutral-700'}"
				/>
			</label>
			<div class="flex shrink-0 items-center justify-end gap-1.5">
				<button
					type="submit"
					class="h-9 shrink-0 cursor-pointer rounded-md bg-neutral-800 px-4 text-sm font-semibold text-white hover:bg-neutral-700 focus-visible:outline-none focus-visible:inset-ring-2 focus-visible:inset-ring-white"
				>
					Go
				</button>
				{#if openedUrl}
					<a
						href={openedUrl}
						target="_blank"
						rel="external noopener noreferrer"
						aria-label="Open current page in new tab"
						title={openedUrl}
						class="grid size-9 shrink-0 place-items-center rounded-md border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100 focus-visible:outline-none focus-visible:inset-ring-2 focus-visible:inset-ring-neutral-700"
					>
						<svg
							aria-hidden="true"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							class="size-4"
						>
							<path d="M14 4h6v6m0-6-9 9" stroke-linecap="round" stroke-linejoin="round" />
							<path
								d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"
								stroke-linecap="round"
							/>
						</svg>
					</a>
				{:else}
					<button
						type="button"
						disabled
						aria-label="Open current page in new tab"
						class="grid size-9 shrink-0 place-items-center rounded-md border border-neutral-200 bg-neutral-100 text-neutral-400"
					>
						<svg
							aria-hidden="true"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							class="size-4"
						>
							<path d="M14 4h6v6m0-6-9 9" stroke-linecap="round" stroke-linejoin="round" />
							<path
								d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"
								stroke-linecap="round"
							/>
						</svg>
					</button>
				{/if}
				<div class="group relative shrink-0">
					<button
						type="button"
						aria-label="Some sites block embedded views. Open the page in a new tab if it stays blank."
						aria-describedby="browser-embed-help"
						class="grid size-9 cursor-help place-items-center rounded-md border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 focus-visible:outline-none focus-visible:inset-ring-2 focus-visible:inset-ring-amber-700"
					>
						<svg
							aria-hidden="true"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							class="size-4"
						>
							<path d="M12 3 2 21h20L12 3Z" stroke-linejoin="round" />
							<path d="M12 9v5m0 3h.01" stroke-linecap="round" />
						</svg>
					</button>
					<div
						id="browser-embed-help"
						role="tooltip"
						class="pointer-events-none invisible absolute top-full right-0 z-30 mt-2 w-52 rounded-lg border border-neutral-200 bg-white p-3 text-xs leading-snug text-neutral-700 opacity-0 shadow-lg transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
					>
						Some sites block embedded views. If a page stays blank or refuses to load, open it in a
						new tab.
					</div>
				</div>
			</div>
		</form>
		{#if error}
			<p
				id="browser-address-error"
				role="alert"
				class="absolute top-full left-0 z-30 mt-1 w-fit max-w-full rounded-md bg-neutral-900 px-3 py-2 text-xs leading-snug text-white shadow-lg"
			>
				{error}
			</p>
		{/if}
	</div>
	<div
		class="min-h-32 min-w-0 flex-1 overflow-hidden rounded-md border border-neutral-200 bg-white"
	>
		{#if openedUrl}
			{#key navigationId}
				<iframe
					title="Embedded web page"
					src={openedUrl}
					referrerpolicy="no-referrer"
					class="h-full w-full border-0"
				></iframe>
			{/key}
		{:else}
			<div class="flex h-full min-h-32 flex-col items-center justify-center gap-1 px-4 text-center">
				<p class="font-semibold text-neutral-700">Your page will appear here</p>
				<p class="text-sm text-neutral-500">Enter a web address above to get started.</p>
			</div>
		{/if}
	</div>
</div>
