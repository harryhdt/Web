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
	<path
		d="M77 88h102c24 0 40 13 46 36l13 55c5 21-10 39-30 39-10 0-18-4-25-11l-22-23H95l-22 23c-7 7-15 11-25 11-20 0-35-18-30-39l13-55c6-23 22-36 46-36Z"
	/>
	<path d="M71 130v36m-18-18h36" />
	<circle cx="174" cy="134" r="5" fill="currentColor" stroke="none" />
	<circle cx="199" cy="158" r="5" fill="currentColor" stroke="none" />
</svg>
