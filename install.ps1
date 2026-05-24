#Requires -Version 5.1
$ErrorActionPreference = "Stop"

$RepoUrl = if ($env:BRANDING_AGENT_REPO_URL) { $env:BRANDING_AGENT_REPO_URL } else { "https://github.com/josephtandle/branding-agent" }
$TargetDir = if ($env:BRANDING_AGENT_TARGET_DIR) { $env:BRANDING_AGENT_TARGET_DIR } else { Join-Path $env:USERPROFILE "Tools\BrandingAgent" }
$TempDir = Join-Path $env:TEMP ("branding-agent-" + [System.Guid]::NewGuid().ToString("N"))

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Host "Git is required." -ForegroundColor Red
  exit 1
}

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Host "Node.js is required." -ForegroundColor Red
  exit 1
}

try {
  Write-Host "Downloading Branding Agent..."
  git clone --depth 1 $RepoUrl "$TempDir\branding-agent" | Out-Null
  if ($LASTEXITCODE -ne 0) { throw "Git clone failed" }

  Set-Location "$TempDir\branding-agent"
  node install/install-branding-agent.js --target $TargetDir @args
}
finally {
  if (Test-Path $TempDir) {
    Remove-Item -Path $TempDir -Recurse -Force -ErrorAction SilentlyContinue
  }
}

