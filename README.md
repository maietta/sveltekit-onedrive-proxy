# create-svelte

Enough people have asked me about this solution, so I decided to make a repo for it.

This solution effectively enables you to incorporate a publicly shared OneDrive directory into your SvelteKit project and proxies PDF files from it.

Your website visitors won't know that the files are hosted on OneDrive and you do not need to share the private URL publically.

## How to use

Modify the .env file to include your OneDrive folder ID and the path to your PDF files. Run the local dev server with `npm run dev` and navigate to `http://localhost:3000/documents/` to see the PDF files. Clicking on any of the files will open them in the browser, but will be streamed from OneDrive through the SvelteKit app and not directly from OneDrive.

# Caveats

This solution DOES NOT use the Microsoft Graph API but instead relies on the RESTful-like API that OneDrive uses to share files. This API does not appear to be public. Using this solution may break at any time, given that Micosoft may change the API at any time.

# Notes

This example uses a tRPC route to handle the requests to the OneDrive API, however I kept the proxy endpoint a normal SvelteKit endpoint.

Improvements are welcome, as this is a quick and dirty working example.
