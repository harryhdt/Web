import { writable } from 'svelte/store';
import { DEFAULT_WALLPAPER } from './wallpapers';

export const incZIndex = writable(1);

const STORAGE_KEY = 'wallpaper';

function loadWallpaper(): string {
	if (typeof localStorage !== 'undefined') {
		return localStorage.getItem(STORAGE_KEY) ?? DEFAULT_WALLPAPER;
	}
	return DEFAULT_WALLPAPER;
}

export const currentWallpaper = writable<string>(loadWallpaper());
// Temporary preview shown on the desktop before the user commits with "Apply".
export const wallpaperPreview = writable<string | null>(null);
export const wallpaperLoading = writable(false);

// Persist the chosen wallpaper so it survives reloads (browser only).
if (typeof localStorage !== 'undefined') {
	currentWallpaper.subscribe((value) => {
		localStorage.setItem(STORAGE_KEY, value);
	});
}
