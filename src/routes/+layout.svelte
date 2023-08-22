<script lang="ts">
	import '../app.css';
	import moment from 'moment';
	import { useLazyImage as lazyImage } from 'svelte-lazy-image';
	import { appWallpaper, appWallpaperPlaceholder } from '$lib';
	import IconAbout from '$lib/Icons/IconAbout.svelte';
	import Window from '$lib/Components/Window.svelte';
	import About from '$lib/Partitions/About.svelte';
	import IconBattery from '$lib/Icons/IconBattery.svelte';
	import IconContact from '$lib/Icons/IconContact.svelte';
	import IconPortfolio from '$lib/Icons/IconPortfolio.svelte';
	import IconAnalytics from '$lib/Icons/IconAnalytics.svelte';
	import IconWiFi from '$lib/Icons/IconWiFi.svelte';
	import IconSpeaker from '$lib/Icons/IconSpeaker.svelte';
	import IconSkill from '$lib/Icons/IconSkill.svelte';
	import Skill from '$lib/Partitions/Skill.svelte';
	import Contact from '$lib/Partitions/Contact.svelte';
	import Portfolio from '$lib/Partitions/Portfolio.svelte';

	const apps = [
		{
			name: 'About Me',
			slug: 'about',
			icon: IconAbout,
			content: About,
			iconClass: '',
			class: 'max-w-6xl',
			contentClass: ''
		},
		{
			name: 'My Skill',
			slug: 'skill',
			icon: IconSkill,
			content: Skill,
			iconClass: '',
			class: '',
			contentClass: ''
		},
		{
			name: 'Portfolio',
			slug: 'portfolio',
			icon: IconPortfolio,
			content: Portfolio,
			iconClass: '',
			class: '',
			contentClass: ''
		},
		{
			name: 'Contact',
			slug: 'contact',
			icon: IconContact,
			content: Contact,
			iconClass: '!w-7 !h-7 sm:!w-10 sm:!h-10',
			class: '',
			contentClass: ''
		}
	];

	let windows: any[] = [];

	const openWindow = (appSlug: string) => {
		windows[windows.length] = {
			id: new Date().getTime(),
			...apps.find((app) => app.slug === appSlug)
		};
	};

	const closeWindow = (windowId: number) => {
		windows = windows.filter((w) => w.id !== windowId);
	};

	let timeNow = '',
		timeNowMobile = '';
	const getTimeNow = () => {
		const now = moment();
		timeNow = now.format('dddd MMM D h:mm:ss A');
		timeNowMobile = now.format('h:mm:ss A');
		setTimeout(() => {
			getTimeNow();
		}, 1000);
	};
	getTimeNow();
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="relative h-screen overflow-hidden select-none text-neutral-600 font-app text-[15px]"
	on:contextmenu|preventDefault={null}
>
	<div class="h-7 bg-black/20 sticky top-0 flex items-center px-2.5">
		<div class="mr-auto hidden sm:block">
			<span class="font-semibold text-sm text-white">harryhdt.dev</span>
		</div>
		<div class="mr-auto sm:mx-auto text-white font-medium text-sm">
			<span class="hidden sm:block">
				{timeNow}
			</span>
			<span class="sm:hidden">
				{timeNowMobile}
			</span>
		</div>
		<div class="ml-auto flex gap-x-2 sm:gap-x-4 items-center">
			<IconWiFi class="text-white w-[18px] h-[18px]" />
			<IconSpeaker class="text-white w-[19px] h-[19px]" />
			<IconBattery class="text-white w-6 h-6" />
		</div>
	</div>
	<img
		src={appWallpaperPlaceholder}
		data-src={appWallpaper}
		alt="Harry Hidayat Web Wallpaper"
		class="absolute inset-0 -z-50 object-cover w-full h-full"
		use:lazyImage
	/>
	<div class="space-y-5 p-5">
		{#each apps as app}
			<button
				on:click={() => openWindow(app.slug)}
				class="flex items-center justify-center rounded-md bg-transparent active:bg-blue-200/20 border border-transparent active:border-blue-500 w-20 h-20 text-white hover:scale-105 transition-all flex-col"
			>
				<svelte:component
					this={app.icon}
					class="w-8 sm:w-11 h-8 sm:h-11 flex-shrink-0 mb-1 {app.iconClass}"
				/>
				<span class="whitespace-nowrap text-sm">{app.name}</span>
			</button>
		{/each}
	</div>
	<slot />
	{#each windows as window}
		<Window
			title={window.name ?? 'Untitled'}
			onClose={() => closeWindow(window.id)}
			class={window.class}
			contentClass={window.contentClass}
		>
			<svelte:component this={window.content} />
		</Window>
	{/each}
</div>
