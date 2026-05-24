#!/usr/bin/env node
"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const MANIFEST_PATH = path.join(os.homedir(), ".branding-agent", "install.json");

const PROMPTS = {
  "build-brand-brain": path.join(ROOT, "prompts", "build-brand-brain.md"),
  "offer-input": path.join(ROOT, "prompts", "offer-input.md"),
  "funnel-map": path.join(ROOT, "prompts", "funnel-map.md"),
  "funnel-audit": path.join(ROOT, "prompts", "funnel-audit.md"),
};

const TEMPLATES = {
  "brand-brain": path.join(ROOT, "templates", "brand-brain-template.md"),
};

function print(text) {
  process.stdout.write(`${text}\n`);
}

function readFile(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function status() {
  print("Branding Agent");
  print(`Repo root: ${ROOT}`);
  print(`Manifest: ${MANIFEST_PATH}`);
  print(`Prompts: ${Object.keys(PROMPTS).join(", ")}`);
  print(`Templates: ${Object.keys(TEMPLATES).join(", ")}`);
}

function list() {
  print("Prompts:");
  Object.keys(PROMPTS).forEach((name) => print(`- ${name}`));
  print("");
  print("Templates:");
  Object.keys(TEMPLATES).forEach((name) => print(`- ${name}`));
}

function showPrompt(name) {
  const filePath = PROMPTS[name];
  if (!filePath) {
    throw new Error(`Unknown prompt: ${name}`);
  }
  print(readFile(filePath));
}

function showTemplate(name) {
  const filePath = TEMPLATES[name];
  if (!filePath) {
    throw new Error(`Unknown template: ${name}`);
  }
  print(readFile(filePath));
}

function usage() {
  print("Usage:");
  print("  branding-agent status");
  print("  branding-agent list");
  print("  branding-agent prompt <name>");
  print("  branding-agent template <name>");
}

function main() {
  const [, , command, arg] = process.argv;

  try {
    if (!command || command === "help" || command === "--help") {
      usage();
      return;
    }
    if (command === "status") {
      status();
      return;
    }
    if (command === "list") {
      list();
      return;
    }
    if (command === "prompt") {
      showPrompt(arg);
      return;
    }
    if (command === "template") {
      showTemplate(arg);
      return;
    }
    usage();
    process.exitCode = 1;
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

main();

