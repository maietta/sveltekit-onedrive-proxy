// Seems like a good place to put this, because it's used in multiple places within the documents folder.
export const humanReadableFilename = (name: string) => {
	// HUMAN READABLE
	// Remvoe all the _ and - from the name.
	name = name.replace(/[_-]/g, ' ');
	// Replace all the spaces with %20

	// Uppercase the first letter of each word.
	name = name.replace(/\b\w/g, (l) => l.toUpperCase());

	// Remove the file extension.
	name = name.replace(/\.[^/.]+$/, '');

	// Remove .Pdf from the end of the name.

	// Replace space To space with %20
	name = name.replace(/ To /g, ' ');

	// If the Filename starts with names followed by a space, remove the names.
	// name = name.replace(/^([A-Z][a-z]+ )+/, '');

	// Replace Rfp with RFP
	name = name.replace(/ Rfp /g, ' RFP ');

	return name;
};
