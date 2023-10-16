<script lang="ts">
	import type { PageData } from './$types';
	import { humanReadableFilename } from '../_presentational'; // This code is could be moved into a reusable component with the code below.

	export let data: PageData;
</script>

<a href="../">Go up a level</a>

<!-- This code is could be moved into a reusable component -->

{#if data.directories.length > 0}
	<h1>Folders</h1>
	{#each data.directories as directory}
		<p><a href={directory.name}>{humanReadableFilename(directory.name)}</a></p>
	{/each}
{/if}

{#if data.files.length > 0}
	<h2>Files</h2>
	{#each data.files as file}
		<p><a href={file.name} target="_blank">{humanReadableFilename(file.name)}</a></p>
	{/each}
{/if}
