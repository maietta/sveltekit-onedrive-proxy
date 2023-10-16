// My own flavor of trpc router
import { t } from '$lib/trpc/t';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'; // 👈 import the types

import { OneDrive } from '$lib/trpc/onedrive';

export const router = t.router({
	greeting: t.procedure.query(async () => {
		return `Hello tRPC v10 @ ${new Date().toLocaleTimeString()}`;
	}),

	OneDrive // 👈 add the OneDrive router
});

export type Router = typeof router;

// 👇 export the types (Nick's own spin to improve DX)
export type RouterInputs = inferRouterInputs<Router>; // 👈 infer the input types
export type RouterOutputs = inferRouterOutputs<Router>; // 👈 infer the output types
