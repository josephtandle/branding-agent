#!/usr/bin/env bash
set -euo pipefail

REPO_URL="${BRANDING_AGENT_REPO_URL:-https://github.com/josephtandle/branding-agent}"
TARGET_DIR="${BRANDING_AGENT_TARGET_DIR:-$HOME/Tools/BrandingAgent}"
TMP_DIR="$(mktemp -d "${TMPDIR:-/tmp}/branding-agent.XXXXXX")"

cleanup() {
  rm -rf "${TMP_DIR}"
}
trap cleanup EXIT

command -v git >/dev/null 2>&1 || { echo "Git is required."; exit 1; }
command -v node >/dev/null 2>&1 || { echo "Node.js is required."; exit 1; }

echo "Downloading Branding Agent..."
git clone --depth 1 "${REPO_URL}" "${TMP_DIR}/branding-agent"

cd "${TMP_DIR}/branding-agent"
node install/install-branding-agent.js --target "${TARGET_DIR}" "$@"

