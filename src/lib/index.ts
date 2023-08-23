import { writable } from 'svelte/store';

// place files you want to import through the `$lib` alias in this folder.
export {
	appWallpaper,
	appWallpaperPlaceholder,
	aboutIllustration,
	aboutIllustrationPlaceholder
} from './images';

export const incZIndex = writable(1);
