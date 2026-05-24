#!/usr/bin/env node
"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");

const REPO_ROOT = path.resolve(__dirname, "..");
const DEFAULT_INSTALL_DIR = path.join(os.homedir(), "Tools", "BrandingAgent");
const CONFIG_DIR = path.join(os.homedir(), ".branding-agent");
const MANIFEST_PATH = path.join(CONFIG_DIR, "install.json");

function parseArgs(argv) {
  const args = {
    target: DEFAULT_INSTALL_DIR,
    skipGlobal: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--target") args.target = argv[++i];
    else if (token === "--skip-global") args.skipGlobal = true;
  }

  return args;
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function removeDir(targetPath) {
  fs.rmSync(targetPath, { recursive: true, force: true });
}

const COPY_SKIP_NAMES = new Set([".git", "node_modules", ".DS_Store"]);

function copyRecursive(sourceDir, destDir) {
  ensureDir(destDir);
  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    if (COPY_SKIP_NAMES.has(entry.name)) continue;
    const sourcePath = path.join(sourceDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyRecursive(sourcePath, destPath);
    } else {
      ensureDir(path.dirname(destPath));
      fs.copyFileSync(sourcePath, destPath);
    }
  }
}

function writeManifest(installDir, globalWorked) {
  ensureDir(CONFIG_DIR);
  const manifest = {
    agentName: "Branding Agent",
    installDir,
    launcherCommand: globalWorked ? "branding-agent" : `node ${path.join(installDir, "install", "launcher.js")}`,
    installedAt: new Date().toISOString(),
  };
  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
}

function npmInstallGlobal(installDir) {
  const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";
  const result = spawnSync(npmCmd, ["install", "-g", "."], {
    cwd: installDir,
    stdio: "inherit",
  });
  return result.status === 0;
}

function verify(installDir) {
  const result = spawnSync("node", [path.join(installDir, "bin", "branding-agent.js"), "status"], {
    cwd: installDir,
    stdio: "inherit",
  });
  if (result.status !== 0) {
    throw new Error("Branding Agent verification failed.");
  }
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const installDir = path.resolve(args.target);

  console.log("==================================");
  console.log("   Branding Agent Installer");
  console.log("==================================");
  console.log(`Platform: ${process.platform}`);
  console.log(`Install directory: ${installDir}`);

  removeDir(installDir);
  ensureDir(installDir);
  copyRecursive(REPO_ROOT, installDir);

  let globalWorked = false;
  if (!args.skipGlobal) {
    globalWorked = npmInstallGlobal(installDir);
  }

  verify(installDir);
  writeManifest(installDir, globalWorked);

  console.log("");
  console.log("Branding Agent installed successfully.");
  console.log(`Saved absolute path: ${installDir}`);
  console.log(`Saved manifest: ${MANIFEST_PATH}`);
  if (globalWorked) {
    console.log("Global command available: branding-agent");
  } else {
    console.log(`Fallback command: node ${path.join(installDir, "install", "launcher.js")} status`);
  }
}

main();

