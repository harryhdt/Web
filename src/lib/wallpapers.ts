export interface Wallpaper {
	id: string;
	thumb: string;
	full: string;
}

// Static manifest — the site is fully prerendered, so `static/` assets are not
// in the Vite module graph and must be referenced by URL.
// Mapping rule: `thumb-{N}.webp` -> `/wallpaper/{N}.webp`
export const WALLPAPERS: Wallpaper[] = [
	{ id: '1', thumb: '/wallpaper/thumb-1.webp', full: '/wallpaper/1.webp' },
	{ id: '2', thumb: '/wallpaper/thumb-2.webp', full: '/wallpaper/2.webp' },
	{ id: '3', thumb: '/wallpaper/thumb-3.webp', full: '/wallpaper/3.webp' },
	{ id: '4', thumb: '/wallpaper/thumb-4.webp', full: '/wallpaper/4.webp' },
	{ id: '5', thumb: '/wallpaper/thumb-5.webp', full: '/wallpaper/5.webp' },
	{ id: '6', thumb: '/wallpaper/thumb-6.webp', full: '/wallpaper/6.webp' },
	{ id: '7', thumb: '/wallpaper/thumb-7.webp', full: '/wallpaper/7.webp' }
];

export const DEFAULT_WALLPAPER = '/wallpaper/1.webp';
