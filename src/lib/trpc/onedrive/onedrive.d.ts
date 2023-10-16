interface OneDriveInterface {
	[x: string];
	'@odata.context': string;
	createdBy: {
		application: {
			displayName: string;
			id: string;
		};
		user: {
			displayName: string;
			id: string;
		};
	};
	createdDateTime: string; // Using string for date-time in TypeScript
	cTag: string;
	eTag: string;
	id: string;
	lastModifiedBy: {
		application: {
			displayName: string;
			id: string;
		};
		user: {
			displayName: string;
			id: string;
		};
	};
	lastModifiedDateTime: string;
	name: string;
	parentReference: {
		driveId: string;
		driveType: string;
	};
	size: number;
	webUrl: string;
	fileSystemInfo: {
		createdDateTime: string;
		lastModifiedDateTime: string;
	};
	folder: {
		childCount: number;
		folderView: {
			viewType: string;
			sortBy: string;
			sortOrder: string;
		};
		folderType: string;
	};
	reactions: {
		commentCount: number;
	};
	shared: {
		effectiveRoles: string[];
		owner: {
			user: {
				displayName: string;
				id: string;
			};
		};
		scope: string;
		sharedDateTime: string;
	};
	'children@odata.context': string;
	'children@odata.count': number;
	children: {
		createdBy: {
			application: {
				displayName: string;
				id: string;
			};
			user: {
				displayName: string;
				id: string;
			};
		};
		createdDateTime: string;
		cTag: string;
		eTag: string;
		id: string;
		lastModifiedBy: {
			application: {
				displayName: string;
				id: string;
			};
			user: {
				displayName: string;
				id: string;
			};
		};
		lastModifiedDateTime: string;
		name: string;
		parentReference: {
			driveId: string;
			driveType: string;
			id: string;
			name: string;
			path: string;
			shareId: string;
		};
		size: number;
		webUrl: string;
		fileSystemInfo: {
			createdDateTime: string;
			lastModifiedDateTime: string;
		};
		folder?: {
			childCount: number;
			folderView: {
				viewType: string;
				sortBy: string;
				sortOrder: string;
			};
			folderType: string;
		};
		reactions: {
			commentCount: number;
		};
		'@content.downloadUrl'?: string;
		file?: {
			hashes: {
				quickXorHash: string;
				sha1Hash: string;
				sha256Hash: string;
			};
			mimeType: string;
		};
	}[];

	error?: {
		code: string;
		message: string;
		localizedMessage: string;
	};
}

export type { OneDriveInterface };
