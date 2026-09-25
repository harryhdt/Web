<script lang="ts">
	import '../app.css';
	import moment from 'moment';
	import IconAbout from '$lib/Icons/IconAbout.svelte';
	import { currentWallpaper, wallpaperPreview, wallpaperLoading } from '$lib';
	import ContextMenu from '$lib/Components/ContextMenu.svelte';
	import WallpaperPicker from '$lib/Components/WallpaperPicker.svelte';
	import Window from '$lib/Components/Window.svelte';
	import About from '$lib/Partitions/About.svelte';
	import IconBattery from '$lib/Icons/IconBattery.svelte';
	import IconBrowser from '$lib/Icons/IconBrowser.svelte';
	import IconContact from '$lib/Icons/IconContact.svelte';
	import IconGames from '$lib/Icons/IconGames.svelte';
	// import IconPortfolio from '$lib/Icons/IconPortfolio.svelte';
	import IconWiFi from '$lib/Icons/IconWiFi.svelte';
	import IconSpeaker from '$lib/Icons/IconSpeaker.svelte';
	// import IconSkill from '$lib/Icons/IconSkill.svelte';
	import IconTools from '$lib/Icons/IconTools.svelte';
	// import Skill from '$lib/Partitions/Skill.svelte';
	import Browser from '$lib/Partitions/Browser.svelte';
	import Contact from '$lib/Partitions/Contact.svelte';
	import Games from '$lib/Partitions/Games.svelte';
	// import Portfolio from '$lib/Partitions/Portfolio.svelte';
	import Tools from '$lib/Partitions/Tools.svelte';

	const { children } = $props();

	const apps = [
		{
			name: 'About Me',
			slug: 'about',
			icon: IconAbout,
			content: About,
			tile: 'bg-gradient-to-br from-blue-500 to-indigo-600',
			class: '',
			contentClass: ''
		},
		/*
		{
			name: 'My Skill',
			slug: 'skill',
			icon: IconSkill,
			content: Skill,
			tile: 'bg-gradient-to-br from-violet-500 to-fuchsia-600',
			class: '',
			contentClass: ''
		},
		{
			name: 'Portfolio',
			slug: 'portfolio',
			icon: IconPortfolio,
			content: Portfolio,
			tile: 'bg-gradient-to-br from-orange-500 to-amber-500',
			class: '',
			contentClass: ''
		},
		*/
		{
			name: 'Contact',
			slug: 'contact',
			icon: IconContact,
			content: Contact,
			tile: 'bg-gradient-to-br from-emerald-500 to-teal-600',
			class: '',
			contentClass: ''
		},
		{
			name: 'Tools',
			slug: 'tools',
			icon: IconTools,
			content: Tools,
			tile: 'bg-neutral-800',
			class: '',
			contentClass: ''
		},
		{
			name: 'Browser',
			slug: 'browser',
			icon: IconBrowser,
			content: Browser,
			tile: 'bg-gradient-to-br from-violet-500 to-purple-700',
			class: '',
			contentClass: 'min-h-0'
		},
		{
			name: 'Games',
			slug: 'games',
			icon: IconGames,
			content: Games,
			tile: 'bg-gradient-to-br from-fuchsia-500 to-violet-700',
			class: '',
			contentClass: 'min-h-0'
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

	let menu = $state<{ x: number; y: number } | null>(null);
	let pickerOpen = $state(false);

	const openMenu = (x: number, y: number) => {
		menu = { x, y };
	};

	const onContextMenu = (e: MouseEvent) => {
		e.preventDefault();
		const t = e.target as HTMLElement;
		// Only open on the desktop background — not on windows, icons, or the taskbar.
		if (t.closest('[id^="window-"]') || t.closest('button') || t.closest('[data-taskbar]')) {
			menu = null; // close any open menu when right-clicking a window/icon/taskbar
			return;
		}
		openMenu(e.clientX, e.clientY);
	};

	const menuItems = [
		{ label: 'Refresh', onSelect: () => location.reload() },
		{ label: 'Change Wallpaper', onSelect: () => (pickerOpen = true) }
	];
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="relative h-[100dvh] overflow-x-hidden select-none text-neutral-600 font-app text-[15px]"
	oncontextmenu={onContextMenu}
>
	<div data-taskbar class="h-7 bg-black/20 sticky top-0 flex items-center px-2.5 w-full">
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
		id="wallpaper-img"
		src={$wallpaperPreview ?? $currentWallpaper}
		alt="Harry Hidayat Web Wallpaper"
		class="fixed inset-0 object-cover w-full h-full -z-50"
		style="filter: brightness(0.6);"
	/>
	<div class="p-5 space-y-5">
		{#each apps as app (app.slug)}
			<button
				onclick={() => openWindow(app.slug)}
				class="flex w-20 cursor-pointer flex-col items-center justify-center transition-transform duration-150 hover:scale-105 active:scale-95"
				data-umami-event="{app.name} button"
			>
				<div
					class="flex h-14 w-14 items-center justify-center rounded-2xl shadow-2xl sm:h-16 sm:w-16 {app.tile}"
				>
					<app.icon class="h-7 w-7 text-white sm:h-8 sm:w-8" />
				</div>
				<span class="mt-1 whitespace-nowrap text-sm text-white drop-shadow">{app.name}</span>
				<div class="mt-1 flex h-5 items-center justify-center gap-x-1.5">
					{#each windows.filter((w) => w.slug === app.slug) as _ (_.id)}
						<div class="h-1 w-1 rounded-full bg-blue-600 ring-2 ring-white"></div>
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

	{#if menu}
		<ContextMenu x={menu.x} y={menu.y} items={menuItems} onClose={() => (menu = null)} />
	{/if}

	{#if pickerOpen}
		<WallpaperPicker onClose={() => (pickerOpen = false)} />
	{/if}

	{#if $wallpaperLoading}
		<div
			class="fixed inset-0 z-[150] flex items-center justify-center bg-black/20 pointer-events-none"
		>
			<div
				class="h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white"
			></div>
		</div>
	{/if}
</div>
