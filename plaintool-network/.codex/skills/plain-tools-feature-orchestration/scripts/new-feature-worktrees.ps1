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
$parentPath = (Resolve-Path -LiteralPath $WorktreeParent).Path

git -C $repositoryPath rev-parse --is-inside-work-tree | Out-Null
git -C $repositoryPath cat-file -e "$BaseCommit^{commit}"
if ($LASTEXITCODE -ne 0) {
  throw "Base commit does not exist: $BaseCommit"
}

foreach ($branch in $Branches) {
  if ($branch -notmatch '^[A-Za-z0-9][A-Za-z0-9._/-]*$') {
    throw "Unsafe branch name: $branch"
  }

  $leaf = ($branch -replace '[^A-Za-z0-9._-]', '-')
  $target = [System.IO.Path]::GetFullPath((Join-Path $parentPath $leaf))
  if (-not $target.StartsWith($parentPath + [System.IO.Path]::DirectorySeparatorChar, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "Worktree target escaped its parent: $target"
  }
  if (Test-Path -LiteralPath $target) {
    throw "Worktree target already exists: $target"
  }

  git -C $repositoryPath show-ref --verify --quiet "refs/heads/$branch"
  if ($LASTEXITCODE -eq 0) {
    throw "Branch already exists: $branch"
  }

  git -C $repositoryPath worktree add -b $branch $target $BaseCommit
  if ($LASTEXITCODE -ne 0) {
    throw "Could not create worktree for $branch"
  }
  Write-Output "$branch`t$target"
}
