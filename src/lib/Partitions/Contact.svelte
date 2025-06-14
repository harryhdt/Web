<script lang="ts">
	import IconGithub from '$lib/Icons/IconGithub.svelte';
	import IconLinkedin from '$lib/Icons/IconLinkedin.svelte';
	import IconMail from '$lib/Icons/IconMail.svelte';
	import IconTelegram from '$lib/Icons/IconTelegram.svelte';
</script>

<div class="flex flex-col pb-10 grow">
	<div
		class="flex flex-wrap items-start justify-start gap-2 min-[500px]:gap-4 max-[500px]:[&>a]:w-[calc(50%-4px)]"
	>
		<a
			href="mailto:mail@harryhdt.dev"
			target="_blank"
			class="flex flex-col items-center justify-center w-24 h-24 transition-all duration-200 border rounded bg-neutral-100 border-neutral-200 hover:bg-neutral-200/80 active:scale-95"
			data-umami-event="Contact > Email link"
		>
			<IconMail class="w-16 h-16 text-[#c71610]" />
			<span class="text-sm">Email</span>
		</a>
		<a
			href="https://t.me/harryhdt"
			target="_blank"
			class="flex flex-col items-center justify-center w-24 h-24 transition-all duration-200 border rounded bg-neutral-100 border-neutral-200 hover:bg-neutral-200/80 active:scale-95"
			data-umami-event="Contact > Telegram link"
		>
			<IconTelegram class="w-16 h-16 text-[#0088cc]" />
			<span class="text-sm">Telegram</span>
		</a>
		<a
			href="https://github.com/harryhdt"
			target="_blank"
			class="flex flex-col items-center justify-center w-24 h-24 transition-all duration-200 border rounded bg-neutral-100 border-neutral-200 hover:bg-neutral-200/80 active:scale-95"
			data-umami-event="Contact > Github link"
		>
			<IconGithub class="w-16 h-16 text-[#171515]" />
			<span class="text-sm">Github</span>
		</a>
		<a
			href="https://linkedin.com/in/harryhdt"
			target="_blank"
			class="flex flex-col items-center justify-center w-24 h-24 transition-all duration-200 border rounded bg-neutral-100 border-neutral-200 hover:bg-neutral-200/80 active:scale-95"
			data-umami-event="Contact > Linkedin link"
		>
			<IconLinkedin class="w-16 h-16 text-[#0e76a8]" />
			<span class="text-sm">Linkedin</span>
		</a>
	</div>
	<!-- <p>
		Below is my social media,
		<br />
		- Linkedin
		<a
			class="text-teal-600 hover:text-neutral-600"
			href="https://linkedin.com/in/harryhdt"
			rel="nofollow"
			target="_blank">@harryhdt</a
		><br />
		- Telegram
		<a
			class="text-teal-600 hover:text-neutral-600"
			href="https://t.me/harryhdt"
			rel="nofollow"
			target="_blank">@harryhdt</a
		><br />
		- Github
		<a
			class="text-teal-600 hover:text-neutral-600"
			href="https://github.com/harryhdt"
			rel="nofollow"
			target="_blank">@harryhdt</a
		><br />
		- Dev Community
		<a
			class="text-teal-600 hover:text-neutral-600"
			href="https://dev.to/harryhdt/"
			rel="nofollow"
			target="_blank">@harryhdt</a
		><br />
	</p> -->
</div>
