<script lang="ts">
	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();
</script>

<svg
	class={className}
	xmlns="http://www.w3.org/2000/svg"
	width="256"
	height="256"
	viewBox="0 0 256 256"
	fill="currentColor"
	aria-hidden="true"
>
	<path
		d="M24 40a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v64a16 16 0 0 1-16 16H40a16 16 0 0 1-16-16Zm112 0a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v64a16 16 0 0 1-16 16h-64a16 16 0 0 1-16-16ZM24 152a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v64a16 16 0 0 1-16 16H40a16 16 0 0 1-16-16Zm112 0a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v64a16 16 0 0 1-16 16h-64a16 16 0 0 1-16-16Z"
		fill-opacity=".2"
	/>
	<path
		d="M72 49v46m-23-23h46M159 72h50M49 184h46m-46-14 46 28m81-28 22 28m0-28-22 28"
		fill="none"
		stroke="currentColor"
		stroke-width="10"
		stroke-linecap="round"
	/>
</svg>
