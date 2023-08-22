<script lang="ts">
	import { aboutIllustration, aboutIllustrationPlaceholder } from '$lib';
	import { useLazyImage as lazyImage } from 'svelte-lazy-image';
</script>

<div
	class="flex flex-col w-full max-w-lg mx-auto space-y-4 pb-10 text-center items-center justify-center flex-grow"
>
	<div>
		<div
			class="rounded-full bg-neutral-100 border-4 border-neutral-200 w-28 h-28 mx-auto relative overflow-hidden"
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
	<h3 class="font-semibold text-2xl">Harry Hidayat</h3>
	<div class="space-y-2.5">
		<p>
			Hello There,
			<br />
			I am Harry Hidayat, a Fullstack Software Engineer. I have been programming since 2020. Especially
			on Web and Mobile Development.
		</p>
		<p>
			Currently (Aug, 2023), I work as Full time Software Engineer, totally coding for web, yaa for
			sure i learn every day, to make me grow and gain more experience. And always open to learn new
			technology if it needed.
		</p>
		<p>
			My current setup is Lenovo Ideapad Slim 3, with 512 GB SSD, 12 GB RAM, AMD Ryzen 5 4000
			Series, Then, I am using Pop OS from System76, is a Linux distribution.
			<br />
			For doing code, i am using Visual Studio Code, then Firefox or Chrome for browser.
		</p>
	</div>
</div>
