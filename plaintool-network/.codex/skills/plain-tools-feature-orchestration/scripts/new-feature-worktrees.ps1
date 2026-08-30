[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [string]$Repository,

  [Parameter(Mandatory = $true)]
  [string]$WorktreeParent,

  [Parameter(Mandatory = $true)]
  [string]$BaseCommit,

  [Parameter(Mandatory = $true)]
  [ValidateNotNullOrEmpty()]
  [string[]]$Branches
)

$ErrorActionPreference = "Stop"
$repositoryPath = (Resolve-Path -LiteralPath $Repository).Path
$parentPath = [System.IO.Path]::GetFullPath($WorktreeParent)
if (Test-Path -LiteralPath $parentPath) {
  $parentPath = (Resolve-Path -LiteralPath $parentPath).Path
}

git -C $repositoryPath rev-parse --is-inside-work-tree 2>$null | Out-Null
if ($LASTEXITCODE -ne 0) {
  throw "Repository is not a Git worktree: $repositoryPath"
}
git -C $repositoryPath cat-file -e "$BaseCommit^{commit}" 2>$null
if ($LASTEXITCODE -ne 0) {
  throw "Base commit does not exist: $BaseCommit"
}

$planned = @()
$targets = [System.Collections.Generic.HashSet[string]]::new([System.StringComparer]::OrdinalIgnoreCase)
foreach ($branch in $Branches) {
  git -C $repositoryPath check-ref-format --branch $branch 2>$null | Out-Null
  if ($LASTEXITCODE -ne 0) {
    throw "Invalid Git branch name: $branch"
  }

  $leaf = ($branch -replace '[^A-Za-z0-9._-]', '-')
  $target = [System.IO.Path]::GetFullPath((Join-Path $parentPath $leaf))
  if (-not $target.StartsWith($parentPath + [System.IO.Path]::DirectorySeparatorChar, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "Worktree target escaped its parent: $target"
  }
  if (Test-Path -LiteralPath $target) {
    throw "Worktree target already exists: $target"
  }
  if (-not $targets.Add($target)) {
    throw "Two branches resolve to the same worktree target: $target"
  }

  git -C $repositoryPath show-ref --verify --quiet "refs/heads/$branch" 2>$null
  if ($LASTEXITCODE -eq 0) {
    throw "Branch already exists: $branch"
  }

  $planned += [pscustomobject]@{ Branch = $branch; Target = $target }
}

if (-not (Test-Path -LiteralPath $parentPath)) {
  New-Item -ItemType Directory -Path $parentPath -Force | Out-Null
  $parentPath = (Resolve-Path -LiteralPath $parentPath).Path
}

foreach ($item in $planned) {
  $previousErrorActionPreference = $ErrorActionPreference
  try {
    # Windows PowerShell can promote Git's normal "Preparing worktree" stderr
    # progress message to a terminating NativeCommandError when Stop is active.
    # Capture both streams and decide from Git's exit code instead.
    $ErrorActionPreference = "Continue"
    $gitOutput = @(git -C $repositoryPath worktree add -b $item.Branch $item.Target $BaseCommit 2>&1)
    $gitExitCode = $LASTEXITCODE
  }
  finally {
    $ErrorActionPreference = $previousErrorActionPreference
  }
  if ($gitExitCode -ne 0) {
    $details = $gitOutput -join [Environment]::NewLine
    throw "Could not create worktree for $($item.Branch). Earlier created worktrees, if any, were printed above and were not removed automatically.$([Environment]::NewLine)$details"
  }
  Write-Output "$($item.Branch)`t$($item.Target)"
}
