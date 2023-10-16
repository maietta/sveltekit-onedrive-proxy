import type { RequestHandler } from '@sveltejs/kit';
import type { OneDriveInterface } from '$lib/trpc/onedrive';
import { trpc } from '$lib/trpc/client';

// PDF Proxy Server Endpoint (Called from /documents/[...filepath].pdf)
export const GET: RequestHandler = async (event) => {
	const { pdf } = event.params;

	const pdfReference = pdf + '.pdf';

	// Split the reference into parts using "/" as the separator
	const referenceParts = pdfReference.split('/');

	// Extract the targetPath, which is all parts except the last one
	const targetPath = referenceParts.slice(0, -1).join('/');

	// Extract the targetFileName, which is the last part
	const targetFileName = referenceParts[referenceParts.length - 1];

	try {
		// Use the rRPC client to fetch the list of documents from OneDrive router (passing in the path from params)
		const list = (await trpc(event).OneDrive.list.query(targetPath)) as OneDriveInterface;

		// Search for the file in the 'children' array by comparing the 'name' property
		let targetFile = null;
		if (list && list.children) {
			for (const item of list.children) {
				if (item.name === targetFileName) {
					targetFile = item;
					break; // Exit the loop once a match is found
				}
			}
		}

		if (!targetFile) {
			// The file was not found
			return new Response('File not found', { status: 404 });
		}

		// Capture the content download URL
		const contentDownloadUrl = targetFile['@content.downloadUrl'];

		if (!contentDownloadUrl) {
			// The content download URL is not available
			return new Response('Content download URL not found', { status: 404 });
		}

		// Fetch the content from the content download URL as a stream
		const contentResponse = await fetch(contentDownloadUrl);

		if (!contentResponse.ok) {
			// Handle the case where fetching the content failed
			return new Response('Failed to fetch content', { status: 500 });
		}

		// Create a ReadableStream from the content response body
		const contentStream = contentResponse.body;

		// Set up the response headers with a dynamic filename
		const headers = new Headers({
			'Content-Type': 'application/pdf',
			'Content-Disposition': `inline; filename="${targetFileName}"`
			// 'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
			// Pragma: 'no-cache',
			// Expires: '0'
		});

		// Create a StreamResponse with the content stream and headers
		const streamResponse = new Response(contentStream, { headers, status: 200 });

		// Return the StreamResponse
		return streamResponse;
	} catch (error) {
		// Return an error response
		return new Response('Internal Server Error', { status: 500 });
	}
};
