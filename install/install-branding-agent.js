#!/usr/bin/env node
"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");

const REPO_ROOT = path.resolve(__dirname, "..");
const SKILL_SOURCE_DIR = path.join(REPO_ROOT, "skill", "branding-agent");
const CLAUDE_AGENT_SOURCE = path.join(REPO_ROOT, "agents", "branding-agent.md");
const COPY_SKIP_NAMES = new Set([".git", "node_modules", ".DS_Store"]);

function usage() {
  console.log("Usage: node install/install-branding-agent.js [options]");
  console.log("");
  console.log("Options:");
  console.log("  --target <dir>   Install Branding Agent into this directory.");
  console.log("  --skip-global    Do not install the global branding-agent command.");
  console.log("  --home <dir>     Override the home directory for the manifest and host registration.");
  console.log("  --dry-run        Print planned actions without writing files or running installs.");
  console.log("  --help           Show this help message.");
}

function requireValue(argv, index, flag) {
  const value = argv[index + 1];
  if (!value || value.startsWith("--")) {
    throw new Error(`${flag} requires a directory path.`);
  }
  return value;
}

function parseArgs(argv) {
  const homeDir = os.homedir();
  const args = {
    target: path.join(homeDir, "Tools", "BrandingAgent"),
    home: homeDir,
    skipGlobal: false,
    dryRun: false,
    help: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--target") {
      args.target = requireValue(argv, i, token);
      i += 1;
    } else if (token === "--home") {
      args.home = requireValue(argv, i, token);
      i += 1;
    } else if (token === "--skip-global") {
      args.skipGlobal = true;
    } else if (token === "--dry-run") {
      args.dryRun = true;
    } else if (token === "--help" || token === "-h") {
      args.help = true;
    } else {
      throw new Error(`Unknown option: ${token}`);
    }
  }

  return args;
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function removeDir(targetPath) {
  fs.rmSync(targetPath, { recursive: true, force: true });
}

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

function backupPath(targetPath) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  let candidate = `${targetPath}.backup-${timestamp}`;
  let suffix = 1;
  while (fs.existsSync(candidate)) {
    candidate = `${targetPath}.backup-${timestamp}-${suffix}`;
    suffix += 1;
  }
  return candidate;
}

function copyWithBackup(sourcePath, targetPath) {
  let backup = null;
  if (fs.existsSync(targetPath)) {
    backup = backupPath(targetPath);
    fs.renameSync(targetPath, backup);
  }

  if (fs.statSync(sourcePath).isDirectory()) {
    copyRecursive(sourcePath, targetPath);
  } else {
    ensureDir(path.dirname(targetPath));
    fs.copyFileSync(sourcePath, targetPath);
  }
  return backup;
}

function commandExists(command) {
  const lookupCommand = process.platform === "win32" ? "where" : "which";
  try {
    const result = spawnSync(lookupCommand, [command], { stdio: "ignore" });
    return result.status === 0;
  } catch (_error) {
    return false;
  }
}

function directoryExists(dirPath) {
  try {
    return fs.statSync(dirPath).isDirectory();
  } catch (_error) {
    return false;
  }
}

function hostDefinitions(homeDir) {
  return [
    {
      name: "Claude Code",
      command: "claude",
      configDir: path.join(homeDir, ".claude"),
      registersAgent: true,
    },
    {
      name: "Codex",
      command: "codex",
      configDir: process.env.CODEX_HOME ? path.resolve(process.env.CODEX_HOME) : path.join(homeDir, ".codex"),
      registersAgent: false,
    },
    {
      name: "Gemini",
      command: "gemini",
      configDir: path.join(homeDir, ".gemini"),
      registersAgent: false,
    },
  ];
}

function findHosts(homeDir) {
  return hostDefinitions(homeDir).map((host) => ({
    ...host,
    found: directoryExists(host.configDir) || commandExists(host.command),
  }));
}

function writeManifest(installDir, globalWorked, homeDir) {
  const configDir = path.join(homeDir, ".branding-agent");
  const manifestPath = path.join(configDir, "install.json");
  ensureDir(configDir);
  const manifest = {
    agentName: "Branding Agent",
    installDir,
    launcherCommand: globalWorked ? "branding-agent" : `node ${path.join(installDir, "bin", "branding-agent.js")}`,
    installedAt: new Date().toISOString(),
  };
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  return manifestPath;
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

function describeRegistration(host) {
  const skillTarget = path.join(host.configDir, "skills", "branding-agent");
  const agentTarget = path.join(host.configDir, "agents", "branding-agent.md");
  return {
    skillTarget,
    agentTarget,
    skillExists: fs.existsSync(skillTarget),
    agentExists: host.registersAgent && fs.existsSync(agentTarget),
  };
}

function printPlan(installDir, homeDir, args, hosts) {
  console.log("Dry run, no files will be written.");
  console.log(`Would replace install directory: ${installDir}`);
  console.log(`Would copy repository: ${REPO_ROOT} -> ${installDir}`);
  if (args.skipGlobal) {
    console.log("Would skip global branding-agent installation.");
  } else {
    console.log("Would install the global branding-agent command.");
  }
  console.log(`Would verify: node ${path.join(installDir, "bin", "branding-agent.js")} status`);
  console.log(`Would write manifest: ${path.join(homeDir, ".branding-agent", "install.json")}`);

  for (const host of hosts) {
    if (!host.found) {
      console.log(`${host.name}: host not found.`);
      continue;
    }
    const registration = describeRegistration(host);
    const skillsDir = path.dirname(registration.skillTarget);
    if (!directoryExists(skillsDir)) {
      console.log(`${host.name}: would create skills directory: ${skillsDir}`);
    }
    if (registration.skillExists) {
      console.log(`${host.name}: would back up existing skill: ${registration.skillTarget}`);
    }
    console.log(`${host.name}: would register skill: ${registration.skillTarget}`);
    if (host.registersAgent) {
      const agentsDir = path.dirname(registration.agentTarget);
      if (!directoryExists(agentsDir)) {
        console.log(`${host.name}: would create agents directory: ${agentsDir}`);
      }
      if (registration.agentExists) {
        console.log(`${host.name}: would back up existing agent: ${registration.agentTarget}`);
      }
      console.log(`${host.name}: would register agent: ${registration.agentTarget}`);
    }
  }
  console.log("Dry run complete. No files were written.");
}

function registerHosts(hosts) {
  const summaries = [];

  for (const host of hosts) {
    if (!host.found) {
      summaries.push({ name: host.name, actions: ["host not found"] });
      continue;
    }

    const actions = [];
    const skillTarget = path.join(host.configDir, "skills", "branding-agent");
    ensureDir(path.dirname(skillTarget));
    const skillBackup = copyWithBackup(SKILL_SOURCE_DIR, skillTarget);
    if (skillBackup) {
      console.log(`${host.name}: backed up existing skill to ${skillBackup}`);
      actions.push("backed up existing skill");
    }
    actions.push("registered as skill");

    if (host.registersAgent) {
      const agentTarget = path.join(host.configDir, "agents", "branding-agent.md");
      ensureDir(path.dirname(agentTarget));
      const agentBackup = copyWithBackup(CLAUDE_AGENT_SOURCE, agentTarget);
      if (agentBackup) {
        console.log(`${host.name}: backed up existing agent to ${agentBackup}`);
        actions.push("backed up existing agent");
      }
      actions.push("registered as agent");
    }
    summaries.push({ name: host.name, actions });
  }

  return summaries;
}

function printSummary(summaries) {
  console.log("");
  console.log("Host registration summary:");
  for (const summary of summaries) {
    console.log(`- ${summary.name}: ${summary.actions.join("; ")}`);
  }
  console.log("Restart your AI tool session for newly registered skills to be discovered.");
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    usage();
    return;
  }

  const installDir = path.resolve(args.target);
  const homeDir = path.resolve(args.home);
  const hosts = findHosts(homeDir);

  console.log("==================================");
  console.log("   Branding Agent Installer");
  console.log("==================================");
  console.log(`Platform: ${process.platform}`);
  console.log(`Install directory: ${installDir}`);

  if (args.dryRun) {
    printPlan(installDir, homeDir, args, hosts);
    return;
  }

  removeDir(installDir);
  ensureDir(installDir);
  copyRecursive(REPO_ROOT, installDir);

  let globalWorked = false;
  if (!args.skipGlobal) {
    globalWorked = npmInstallGlobal(installDir);
  }

  verify(installDir);
  const manifestPath = writeManifest(installDir, globalWorked, homeDir);
  const summaries = registerHosts(hosts);

  console.log("");
  console.log("Branding Agent installed successfully.");
  console.log(`Saved absolute path: ${installDir}`);
  console.log(`Saved manifest: ${manifestPath}`);
  if (globalWorked) {
    console.log("Global command available: branding-agent");
  } else {
    console.log(`Fallback command: node ${path.join(installDir, "bin", "branding-agent.js")} status`);
  }
  printSummary(summaries);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
