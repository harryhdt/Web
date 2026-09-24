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
	fill="none"
	stroke="currentColor"
	stroke-width="12"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
>
	<rect x="24" y="32" width="208" height="192" rx="16" fill="currentColor" fill-opacity=".15" />
	<path d="M24 80h208" />
	<path d="M48 56h1m23 0h1m23 0h1" stroke-width="16" />
	<circle cx="128" cy="152" r="48" />
	<path d="M80 152h96m-48-48c-14 13-22 29-22 48s8 35 22 48m0-96c14 13 22 29 22 48s-8 35-22 48" />
</svg>
