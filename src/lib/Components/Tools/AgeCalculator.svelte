<script lang="ts">
	import { onMount } from 'svelte';
	import { calendarDifference, parseDate } from './dates';

	let birthDate = $state('');
	let asOf = $state('');
	onMount(() => {
		const today = new Date();
		asOf = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
	});
	let birth = $derived(parseDate(birthDate));
	let target = $derived(parseDate(asOf));
	let age = $derived(birth && target && birth <= target ? calendarDifference(birth, target) : null);
</script>

<div class="mx-auto flex w-full min-w-0 max-w-xl flex-col gap-4 pb-3">
	<div
		class="grid grid-cols-1 gap-3 rounded-xl border border-neutral-200 bg-white p-3 @xs/tools:p-4 @sm/tools:grid-cols-2"
	>
		<label class="flex min-w-0 flex-col gap-1.5 text-sm font-semibold text-neutral-700">
			Date of birth
			<input
				type="date"
				bind:value={birthDate}
				class="w-full min-w-0 rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-base font-normal text-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
			/>
		</label>
		<label class="flex min-w-0 flex-col gap-1.5 text-sm font-semibold text-neutral-700">
			Age as of
			<input
				type="date"
				bind:value={asOf}
				class="w-full min-w-0 rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-base font-normal text-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
			/>
		</label>
	</div>
	<div
		class="min-w-0 rounded-xl bg-neutral-900 p-4 text-white @xs/tools:p-5"
		role="status"
		aria-live="polite"
	>
		<p class="text-xs font-semibold uppercase tracking-wide text-neutral-400">Age</p>
		{#if age}
			<p class="text-2xl font-semibold @xs/tools:text-3xl">
				{age.years} years, {age.months} months, {age.days} days
			</p>
			<p class="mt-2 text-sm text-neutral-300">
				{age.totalDays.toLocaleString('en-US')} days lived
			</p>
		{:else if birth && target && birth > target}
			<p class="mt-1 text-sm text-rose-300">Date of birth cannot be after the comparison date.</p>
		{:else}
			<p class="mt-1 text-sm text-neutral-300">Enter a valid date of birth to calculate age.</p>
		{/if}
	</div>
</div>
