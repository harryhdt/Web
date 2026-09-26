<script lang="ts">
	const maximumPrice = 1_000_000_000_000;
	const amountFormatter = new Intl.NumberFormat('en-US', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});

	let price = $state('100');
	let discount = $state('20');

	let priceNumber = $derived.by(() => {
		const value = price.trim();
		if (!/^(?:\d+(?:\.\d{0,2})?|\.\d{1,2})$/.test(value)) return null;
		const number = Number(value);
		return Number.isFinite(number) && number <= maximumPrice ? number : null;
	});
	let discountNumber = $derived.by(() => {
		const value = discount.trim();
		if (!/^(?:\d+\.?\d*|\.\d+)$/.test(value)) return null;
		const number = Number(value);
		return Number.isFinite(number) && number <= 100 ? number : null;
	});
	let result = $derived.by(() => {
		if (priceNumber === null || discountNumber === null) return null;
		const priceCents = Math.round(priceNumber * 100);
		const savingsCents = Math.round(priceCents * (discountNumber / 100));
		return {
			savings: savingsCents / 100,
			finalPrice: (priceCents - savingsCents) / 100
		};
	});
</script>

<div class="mx-auto flex w-full min-w-0 max-w-xl flex-col gap-4 pb-3">
	<div class="min-w-0 rounded-xl border border-neutral-200 bg-white p-3 @xs/tools:p-4">
		<div class="grid min-w-0 grid-cols-1 gap-4 @sm/tools:grid-cols-2">
			<label class="flex min-w-0 flex-col gap-1.5 text-sm font-semibold text-neutral-700">
				Original price
				<input
					type="text"
					inputmode="decimal"
					bind:value={price}
					aria-invalid={priceNumber === null}
					class="w-full min-w-0 rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-base font-normal text-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
				/>
			</label>
			<label class="flex min-w-0 flex-col gap-1.5 text-sm font-semibold text-neutral-700">
				Discount (%)
				<input
					type="text"
					inputmode="decimal"
					bind:value={discount}
					aria-invalid={discountNumber === null}
					class="w-full min-w-0 rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-base font-normal text-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
				/>
			</label>
		</div>
		<p class="mt-3 text-xs text-neutral-500">
			Amounts use the same currency as your input and are rounded to two decimal places.
		</p>
	</div>
	<div
		class="min-w-0 rounded-xl bg-neutral-900 p-4 text-white @xs/tools:p-5"
		role="status"
		aria-live="polite"
	>
		<p class="text-xs font-semibold uppercase tracking-wide text-neutral-400">Final price</p>
		{#if result !== null}
			<p class="break-all text-2xl font-semibold @xs/tools:text-3xl">
				{amountFormatter.format(result.finalPrice)}
			</p>
			<p class="mt-2 text-sm text-neutral-300">You save {amountFormatter.format(result.savings)}</p>
		{:else if priceNumber === null}
			<p class="mt-1 text-sm text-rose-300">
				Enter a price from 0 to 1,000,000,000,000 with up to two decimal places.
			</p>
		{:else}
			<p class="mt-1 text-sm text-rose-300">Enter a discount from 0% to 100%.</p>
		{/if}
	</div>
</div>
