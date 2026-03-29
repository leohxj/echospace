# CLAUDE.md

## Project Overview

EchoSpace — open-source, local-first prompt debugging workspace for LLM developers. Runs as a CLI tool that launches a local web UI for managing `.echo` conversation files.

## Tech Stack

- **Language:** TypeScript (strict, ES2022+, ESM-only)
- **Client:** React 19 + Vite + Tailwind CSS 4 + Zustand + CodeMirror
- **Server:** Hono + @hono/node-server
- **CLI:** Commander + @clack/prompts
- **Build:** Vite (client) + tsup (CLI & core SDK)
- **Test:** Vitest
- **Package manager:** pnpm

## Project Structure

```
src/
  cli/          # CLI entry point (commander)
  client/       # React SPA (Vite dev on :5173)
    app/        # App root, initial-file logic
    components/ # UI components (editor, file-list, toolbar, etc.)
    stores/     # Zustand stores (workspace, thread, plugin)
    lib/        # Utilities, theme, store-context
  core/         # Shared core modules (exported as SDK)
    echo/       # .echo format parser/serializer & types
    history/    # Conversation history/branching
    plugins/    # Plugin system (html-plugin, etc.)
    providers/  # LLM provider adapters (openai, anthropic, google)
    smart-paste/# Auto-detect & convert pasted conversations
  server/       # Hono API server (on :3240)
    routes/     # API routes (chat, config, files)
    services/   # Config service
skills/         # Agent skills for coding assistants
```

## Path Alias

`~/` maps to `./src/` (configured in tsconfig, vite, and tsup).

## Common Commands

```bash
pnpm install          # Install dependencies
pnpm dev              # Start dev (UI :5173, API :3240)
pnpm build            # Production build (vite + tsup)
pnpm test             # Run tests (vitest)
pnpm typecheck        # Type-check (tsc --noEmit)
pnpm lint             # ESLint
pnpm format           # Prettier
```

## Key Conventions

- `.echo` files use NDJSON format (line 1 = meta, rest = messages)
- Provider config lives in `~/.echospace/config.yaml`
- API keys support `${ENV_VAR}` substitution; `.env` files are auto-loaded
- The client proxies `/api` requests to the backend server in dev mode
