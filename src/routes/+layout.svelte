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
	import IconWiFi from '$lib/Icons/IconWiFi.svelte';
	import IconSpeaker from '$lib/Icons/IconSpeaker.svelte';
	import IconSkill from '$lib/Icons/IconSkill.svelte';
	import Skill from '$lib/Partitions/Skill.svelte';
	import Contact from '$lib/Partitions/Contact.svelte';
	import Portfolio from '$lib/Partitions/Portfolio.svelte';

	const { children } = $props();

	const apps = [
		{
			name: 'About Me',
			slug: 'about',
			icon: IconAbout,
			content: About,
			iconClass: '',
			class: '',
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

	let windows: ((typeof apps)[0] & { id: number })[] = $state([]);

	const openWindow = (appSlug: string) => {
		if (windows.filter((w) => w.slug === appSlug).length > 3) {
			alert('Max window for app reached');
			return;
		}
		windows[windows.length] = {
			id: new Date().getTime(),
			...(apps.find((app) => app.slug === appSlug) as (typeof apps)[0])
		};
	};

	const closeWindow = (windowId: number) => {
		windows = windows.filter((w) => w.id !== windowId);
	};

	let timeNow = $state(''),
		timeNowMobile = $state('');
	const getTimeNow = () => {
		const now = moment();
		timeNow = now.format('ddd MMM D h:mm:ss A');
		timeNowMobile = now.format('h:mm:ss A');
		setTimeout(() => {
			getTimeNow();
		}, 1000);
	};
	getTimeNow();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="relative h-screen overflow-hidden select-none text-neutral-600 font-app text-[15px]"
	oncontextmenu={(e) => {
		e.preventDefault();
		console.warn('DISABLED BY SYSTEM :)');
	}}
>
	<div class="h-7 bg-black/20 sticky top-0 flex items-center px-2.5">
		<div class="hidden mr-auto sm:block">
			<span class="text-sm font-semibold text-white">harryhdt.dev</span>
		</div>
		<div class="mr-auto text-sm font-medium text-white sm:mx-auto">
			<span class="hidden sm:block">
				{timeNow}
			</span>
			<span class="sm:hidden">
				{timeNowMobile}
			</span>
		</div>
		<div class="flex items-center ml-auto gap-x-2 sm:gap-x-4">
			<IconWiFi class="text-white w-[18px] h-[18px]" />
			<IconSpeaker class="text-white w-[19px] h-[19px]" />
			<IconBattery class="w-6 h-6 text-white" />
		</div>
	</div>
	<img
		src={appWallpaperPlaceholder}
		data-src={appWallpaper}
		alt="Harry Hidayat Web Wallpaper"
		class="absolute inset-0 object-cover w-full h-full -z-50"
		use:lazyImage
	/>
	<div class="p-5 space-y-5">
		{#each apps as app (app.slug)}
			<button
				onclick={() => openWindow(app.slug)}
				class="flex flex-col items-center justify-center w-20 h-20 text-white transition-all bg-transparent border border-transparent rounded-md active:bg-blue-200/20 active:border-blue-500 hover:scale-105"
			>
				<app.icon class="w-8 sm:w-11 h-8 sm:h-11 flex-shrink-0 mb-1 {app.iconClass}" />
				<span class="text-sm whitespace-nowrap">{app.name}</span>
				<div class="flex items-center justify-center h-5 mt-1 gap-x-1.5">
					{#each windows.filter((w) => w.slug === app.slug) as _ (_.id)}
						<div class="w-1 h-1 bg-blue-600 rounded-full ring-2 ring-white"></div>
					{/each}
				</div>
			</button>
		{/each}
	</div>
	{@render children()}
	{#each windows as window (window.id)}
		<Window
			title={window.name ?? 'Untitled'}
			onClose={() => closeWindow(window.id)}
			class={window.class}
			contentClass={window.contentClass}
		>
			<window.content />
		</Window>
	{/each}
</div>
