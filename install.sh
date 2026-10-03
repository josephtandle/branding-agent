#!/usr/bin/env bash
set -euo pipefail

REPO_URL="${BRANDING_AGENT_REPO_URL:-https://github.com/josephtandle/branding-agent}"
TARGET_DIR="${BRANDING_AGENT_TARGET_DIR:-$HOME/Tools/BrandingAgent}"

command -v git >/dev/null 2>&1 || { echo "Git is required."; exit 1; }
command -v node >/dev/null 2>&1 || { echo "Node.js is required."; exit 1; }

# The install folder is a git clone so it can update itself weekly.
if [ -d "${TARGET_DIR}/.git" ]; then
  echo "Updating Branding Agent..."
  git -C "${TARGET_DIR}" pull --ff-only || echo "Could not update the existing copy; using what is there."
else
  if [ -e "${TARGET_DIR}" ]; then
    OLD="${TARGET_DIR}.backup-$(date +%Y%m%d-%H%M%S)"
    echo "Moving your existing ${TARGET_DIR} to ${OLD}"
    mv "${TARGET_DIR}" "${OLD}"
  fi
  echo "Downloading Branding Agent..."
  mkdir -p "$(dirname "${TARGET_DIR}")"
  git clone "${REPO_URL}" "${TARGET_DIR}"
fi

cd "${TARGET_DIR}"
node install/install-branding-agent.js --target "${TARGET_DIR}" "$@"

# Weekly self-update: on by default, one line turns it off. It fast-forwards
# this clone from its origin, backs up your own files first and rolls back if
# the self-test fails.
echo ""
if [ "${BRANDING_AGENT_SKIP_UPDATES:-0}" = "1" ]; then
  echo "Weekly updates not scheduled (BRANDING_AGENT_SKIP_UPDATES=1). Later: node \"${TARGET_DIR}/scripts/self-update.js\" --register"
else
  node "${TARGET_DIR}/scripts/self-update.js" --register || echo "Weekly updates could not be scheduled. Try later: node \"${TARGET_DIR}/scripts/self-update.js\" --register"
fi
