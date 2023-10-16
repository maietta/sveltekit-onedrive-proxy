import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';
import type { Handle } from '@sveltejs/kit';
import { createTRPCHandle } from 'trpc-sveltekit';

export const handle: Handle = createTRPCHandle({ router, createContext });

// NOTE! If needint more than one export, such as adding support for Pocketbase or other Auth scheme, use the sequence() method-- something that isn't documented in the SvelteKit docs.

// Hit me up if you want to see a good example one.
