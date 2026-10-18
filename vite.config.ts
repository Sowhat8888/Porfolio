import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const env = (globalThis as typeof globalThis & { process?: { env?: Record<string, string | undefined> } }).process?.env;
const [owner, repositoryName] = env?.GITHUB_REPOSITORY?.split('/') ?? [];
const isUserSite = repositoryName === `${owner}.github.io`;
const base = env?.GITHUB_ACTIONS === 'true' && repositoryName && !isUserSite ? `/${repositoryName}/` : '/';

export default defineConfig({ base, plugins: [react()] });
