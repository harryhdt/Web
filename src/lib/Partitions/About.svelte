<script lang="ts">
	import { aboutIllustration, aboutIllustrationPlaceholder } from '$lib';
	import { useLazyImage as lazyImage } from 'svelte-lazy-image';
</script>

<div
	class="flex flex-col items-center justify-center flex-grow w-full max-w-lg px-6 pt-6 pb-10 mx-auto space-y-4 text-center sm:px-10"
>
	<div>
		<div
			class="relative mx-auto overflow-hidden border-4 rounded-full bg-neutral-100 border-neutral-200 w-28 h-28"
		>
			<img
				src={aboutIllustrationPlaceholder}
				data-src={aboutIllustration}
				alt="Harry Hidayat"
				class="absolute inset-0 object-cover w-full h-full"
				use:lazyImage
			/>
		</div>
	</div>
	<h3 class="text-2xl font-semibold">Harry Hidayat</h3>
	<div class="space-y-2.5 text-base">
		<p>
			Hello There,
			<br />
			I am Harry Hidayat, a Software Engineer. I have been programming since 2020. Especially on Web
			and Mobile Development.
		</p>
		<p>
			Currently (June, 2025), I work as Full time Software Engineer, totally coding for web, yaa for
			sure i learn every day, to make me grow and gain more experience.
		</p>
	</div>
</div>
