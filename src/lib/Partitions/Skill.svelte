<script>
	import { fly } from 'svelte/transition';
</script>

<div class="flex flex-col pb-10 grow gap-y-4">
	<div
		class="grid grid-cols-4 gap-2.5"
		style="grid-template-columns: repeat(auto-fill, minmax(216px, 1fr))"
	>
		<div in:fly={{ y: 16 }} class="bg-yellow-500/80 p-2.5 shadow-md text-neutral-900 rounded">
			<h4 class="font-semibold">Programming</h4>
			<ul class="list-disc ml-5 mt-0.5">
				<li>HTML, CSS & Javascript</li>
				<li>Typescript</li>
				<li>PHP</li>
				<!-- <li>Golang</li> -->
				<!-- <li>Dart</li> -->
				<!-- <li>Python</li> -->
			</ul>
		</div>
		<div in:fly={{ y: 16, delay: 200 }} class="bg-blue-700/80 p-2.5 shadow-md text-white rounded">
			<h4 class="font-semibold">Fullstack Web (Standard)</h4>
			<ul class="list-disc ml-5 mt-0.5">
				<li>PHP Laravel</li>
				<li>MySQL / PostgreSQL</li>
				<li>Svelte / Blade with Alpine js</li>
				<li>Tailwind CSS</li>
			</ul>
		</div>
		<div in:fly={{ y: 16, delay: 400 }} class="bg-teal-700/80 p-2.5 shadow-md text-white rounded">
			<h4 class="font-semibold">Fullstack Web (Modern)</h4>
			<ul class="list-disc ml-5 mt-0.5">
				<li>Bun / Node JS</li>
				<li>MySQL / PostgreSQL</li>
				<li>SvelteKit</li>
				<li>Tailwind iconClass</li>
			</ul>
		</div>
		<div in:fly={{ y: 16, delay: 400 }} class="bg-orange-600/80 p-2.5 shadow-md text-white rounded">
			<h4 class="font-semibold">Cloudflare</h4>
			<ul class="list-disc ml-5 mt-0.5">
				<li>Workers (Hono)</li>
				<li>Pages (SvelteKit)</li>
				<li>D1 Database</li>
				<li>R2 Storage</li>
			</ul>
		</div>
		<div in:fly={{ y: 16, delay: 600 }} class="bg-sky-700/80 p-2.5 shadow-md text-white rounded">
			<h4 class="font-semibold">Frontend Web</h4>
			<ul class="list-disc ml-5 mt-0.5">
				<li>Svelte (&amp; Kit)</li>
				<li>React (&amp; Next)</li>
				<li>Alpine js</li>
				<li>Tailwind CSS</li>
				<li>Some UI Library</li>
			</ul>
		</div>
		<!-- <div in:fly={{ y: 16, delay: 800 }} class="bg-slate-700/80 p-2.5 shadow-md text-white rounded">
			<h4 class="font-semibold">Frontend Mobile</h4>
			<ul class="list-disc ml-5 mt-0.5">
				<li>Flutter (Dart)</li>
				<li>Capacitor (Javascript)</li>
			</ul>
		</div> -->
		<div
			in:fly={{ y: 16, delay: 1000 }}
			class="bg-indigo-700/80 p-2.5 shadow-md text-white rounded"
		>
			<h4 class="font-semibold">Backend Development</h4>
			<ul class="list-disc ml-5 mt-0.5">
				<li>PHP Laravel</li>
				<li>Node JS (Adonis & Hono)</li>
				<li>Bun (Hono)</li>
				<!-- <li>Goravel (Golang)</li> -->
			</ul>
		</div>
		<div in:fly={{ y: 16, delay: 1200 }} class="bg-lime-700/80 p-2.5 shadow-md text-white rounded">
			<h4 class="font-semibold">Database</h4>
			<ul class="list-disc ml-5 mt-0.5">
				<li>MySQL</li>
				<li>PostgreSQL</li>
				<li>SQLite</li>
				<li>Lowdb</li>
			</ul>
		</div>
		<div in:fly={{ y: 16, delay: 800 }} class="bg-slate-700/80 p-2.5 shadow-md text-white rounded">
			<h4 class="font-semibold">Testing</h4>
			<ul class="list-disc ml-5 mt-0.5">
				<li>PHPUnit (Laravel)</li>
				<li>Vitest (Hono)</li>
			</ul>
		</div>
		<div in:fly={{ y: 16, delay: 1400 }} class="bg-cyan-700/80 p-2.5 shadow-md text-white rounded">
			<h4 class="font-semibold">Cloud</h4>
			<ul class="list-disc ml-5 mt-0.5">
				<li>VPS</li>
				<li>Shared Hosting</li>
				<li>PaaS</li>
				<!-- <li>Netlify &amp; Vercel</li> -->
				<!-- <li>Supabase &amp; Firebase</li> -->
				<li>Cloudflare</li>
			</ul>
		</div>
		<div in:fly={{ y: 16, delay: 1600 }} class="bg-pink-700/80 p-2.5 shadow-md text-white rounded">
			<h4 class="font-semibold">Etc</h4>
			<ul class="list-disc ml-5 mt-0.5">
				<li>Git & Github</li>
				<li>VS Code</li>
				<li>Figma</li>
				<li>Postman/Insomnia</li>
			</ul>
		</div>
	</div>
</div>
