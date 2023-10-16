import { PRIVATE_ONEDRIVE_URL } from '$env/static/private';
import { t } from '$lib/trpc/t';
import { z } from 'zod';
import type { OneDriveInterface } from './onedrive';

// ONEDRIVE API ROUTER
const OneDrive = t.router({
	// Create a route to fetch main list of documents (return separate lists of files and folders from single request)
	list: t.procedure.input(z.string()).query(async ({ input }) => {
		// If input does not start with '/' then add it
		if (!input.startsWith('/')) {
			input = `/${input}`;
		}

		const token = btoa(PRIVATE_ONEDRIVE_URL);
		const sharingToken = `u!${token}`; // Append "u!" to the front of the encoded string to indicate it's a sharing token
		const list = await fetch(
			`https://api.onedrive.com/v1.0/shares/${sharingToken}/root:${input}:?expand=children`
		);

		const data: OneDriveInterface = await list.json();

		return data;
	})

	// Proxying PDF's doesn't really need a tRPC route since the /documents/[...pdf].pdf/+server.ts endpoint seems better suited for this.
});

// Export the routes
export { OneDrive, OneDriveInterface };
