import type { LayoutServerLoad } from './$types';
import { trpc } from '$lib/trpc/client';
import { error } from '@sveltejs/kit';
import type { OneDriveInterface } from '$lib/trpc/onedrive'; // Import the OneDriveInterface from root.

// Load the list of documents from OneDrive
export const load: LayoutServerLoad = async (event) => {
	let list: OneDriveInterface | undefined;

	const path = (event.params.path as string) || '/';

	try {
		// Use the rRPC client to fetch the list of documents from OneDrive router (passing in the path from params)
		list = (await trpc(event).OneDrive.list.query(path)) as OneDriveInterface;
	} catch (e) {
		throw error(500, 'Invalid JSON response');
	}

	if (list && list.error) {
		throw error(404, 'Not found');
	}

	// Check if 'list.children' exists before filtering
	const directories =
		list?.children?.filter((item) => item.folder && item.folder.folderType === 'document') || [];

	// Check if 'list.children' exists before filtering for files
	const files = list?.children?.filter((item) => item.file && item.file.mimeType) || [];

	return {
		directories,
		files
	};
};
