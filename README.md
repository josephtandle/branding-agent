# Branding Agent

A lightweight branding and funnel-audit toolkit for founder-led businesses.

This repo is built for people using Claude Code, Codex, or another local AI coding agent who want a repeatable way to:

- clarify what their offer actually is
- build a usable brand brain
- map the path from free offer to low-ticket to high-ticket
- find leaks in the funnel
- tighten the message before adding more channels

It ships with:

- a framework library
- a reusable brand-brain template
- install scripts for macOS, Linux, and Windows
- a small `branding-agent` CLI for verification and prompt lookup
- prompt files you can paste directly into Claude Code

## Install

### macOS / Linux

```bash
curl -fsSL https://raw.githubusercontent.com/josephtandle/branding-agent/main/install.sh | bash
```

### Windows PowerShell

```powershell
powershell -ExecutionPolicy Bypass -Command "iwr https://raw.githubusercontent.com/josephtandle/branding-agent/main/install.ps1 -UseBasicParsing | iex"
```

## What the installer does

- detects your operating system
- resolves your home directory automatically
- installs the repo into `~/Tools/BrandingAgent` on macOS/Linux
- installs the repo into `%USERPROFILE%\Tools\BrandingAgent` on Windows
- saves the absolute install path in a local manifest
- installs the global `branding-agent` command when possible

Local manifest path:

- macOS/Linux: `~/.branding-agent/install.json`
- Windows: `%USERPROFILE%\.branding-agent\install.json`

## Verify the install

```bash
branding-agent status
branding-agent list
```

If the global command is unavailable, use the fallback launcher command printed by the installer.

## Prompt library

Available prompts:

- `build-brand-brain`
- `offer-input`
- `funnel-map`
- `funnel-audit`

Show one:

```bash
branding-agent prompt offer-input
branding-agent prompt funnel-map
branding-agent prompt funnel-audit
```

Show the template:

```bash
branding-agent template brand-brain
```

## Recommended workflow

1. Run `branding-agent prompt offer-input`
2. Run `branding-agent prompt funnel-map`
3. Run `branding-agent prompt funnel-audit`
4. Use the findings to tighten your message, offer framing, and conversion path

## Repository structure

- `frameworks/` — brand and positioning frameworks
- `templates/` — reusable brand-brain template
- `prompts/` — copy/paste prompts for Claude Code or similar agents
- `install/` — installer and launcher
- `bin/` — CLI entrypoint

## Notes

- This repo is intentionally lightweight. It is designed to improve clarity and decisions, not to add more operational complexity.
- The framework files are reference material. The prompt files are the fastest path.

## License

MIT
