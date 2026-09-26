<script lang="ts">
	import { randomInteger } from './random';

	const groups = {
		lowercase: 'abcdefghjkmnpqrstuvwxyz',
		uppercase: 'ABCDEFGHJKMNPQRSTUVWXYZ',
		digits: '23456789',
		symbols: '!@#$%^&*()-_=+?'
	} as const;

	let lengthInput = $state('16');
	let lowercase = $state(true);
	let uppercase = $state(true);
	let digits = $state(true);
	let symbols = $state(true);
	let password = $state('');
	let feedback = $state('');
	let length = $derived.by(() => {
		if (!/^[1-9]\d{0,2}$/.test(lengthInput)) return null;
		const value = Number(lengthInput);
		return value >= 8 && value <= 128 ? value : null;
	});
	let selectedGroups = $derived(
		[
			lowercase ? groups.lowercase : '',
			uppercase ? groups.uppercase : '',
			digits ? groups.digits : '',
			symbols ? groups.symbols : ''
		].filter(Boolean)
	);

	function clearPassword() {
		password = '';
		feedback = '';
	}

	function generate() {
		if (length === null || selectedGroups.length === 0) return;
		const pool = selectedGroups.join('');
		const characters = selectedGroups.map((group) => group[randomInteger(0, group.length - 1)]);
		while (characters.length < length) characters.push(pool[randomInteger(0, pool.length - 1)]);
		for (let index = characters.length - 1; index > 0; index--) {
			const other = randomInteger(0, index);
			[characters[index], characters[other]] = [characters[other], characters[index]];
		}
		password = characters.join('');
		feedback = '';
	}

	async function copy() {
		if (!password) return;
		try {
			await navigator.clipboard.writeText(password);
			feedback = 'Copied to clipboard.';
		} catch {
			feedback = 'Clipboard unavailable. Select and copy the password manually.';
		}
	}
</script>

<div class="mx-auto flex w-full min-w-0 max-w-xl flex-col gap-4 pb-3">
	<div class="min-w-0 rounded-xl border border-neutral-200 bg-white p-3 @xs/tools:p-4">
		<label class="flex min-w-0 flex-col gap-1.5 text-sm font-semibold text-neutral-700">
			Length (8–128)
			<input
				type="text"
				inputmode="numeric"
				bind:value={lengthInput}
				oninput={clearPassword}
				class="w-full min-w-0 rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-base font-normal text-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
			/>
		</label>
		<div class="mt-4 grid grid-cols-2 gap-3 text-sm text-neutral-700">
			<label class="flex items-center gap-2">
				<input type="checkbox" bind:checked={lowercase} onchange={clearPassword} /> Lowercase
			</label>
			<label class="flex items-center gap-2">
				<input type="checkbox" bind:checked={uppercase} onchange={clearPassword} /> Uppercase
			</label>
			<label class="flex items-center gap-2">
				<input type="checkbox" bind:checked={digits} onchange={clearPassword} /> Numbers
			</label>
			<label class="flex items-center gap-2">
				<input type="checkbox" bind:checked={symbols} onchange={clearPassword} /> Symbols
			</label>
		</div>
		{#if length === null || selectedGroups.length === 0}
			<p class="mt-3 text-sm text-rose-600">
				Choose a length from 8 to 128 and at least one character set.
			</p>
		{/if}
	</div>
	<div class="flex flex-wrap gap-2">
		<button
			type="button"
			onclick={generate}
			disabled={length === null || selectedGroups.length === 0}
			class="cursor-pointer rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
		>
			Generate password
		</button>
		<button
			type="button"
			onclick={copy}
			disabled={!password}
			class="cursor-pointer rounded-lg border border-neutral-300 bg-white px-5 py-2 font-semibold text-neutral-700 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
		>
			Copy
		</button>
	</div>
	<div class="min-w-0 rounded-xl bg-neutral-900 p-4 text-white @xs/tools:p-5">
		<label class="block text-xs font-semibold uppercase tracking-wide text-neutral-400">
			Password
			<input
				readonly
				value={password}
				placeholder="Generate a password"
				class="mt-2 w-full min-w-0 select-text rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 font-mono text-sm font-normal text-white"
			/>
		</label>
		<p class="mt-2 text-xs text-neutral-400">
			Generated locally using your browser’s cryptographic random source. Not stored or sent to a
			server.
		</p>
		{#if feedback}
			<p class="mt-2 text-sm text-neutral-300" role="status">{feedback}</p>
		{/if}
	</div>
</div>
