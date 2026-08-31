$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$configPath = Join-Path $projectRoot 'agent-browser.json'
$sessionName = 'absoltools-qa'

$agentBrowserShim = Get-Command agent-browser.cmd -ErrorAction SilentlyContinue
if (-not $agentBrowserShim) {
    [Console]::Error.WriteLine(
        'agent-browser is not installed. Run: npm install -g agent-browser@0.35.2'
    )
    exit 1
}

$agentBrowserExe = Join-Path `
    (Split-Path -Parent $agentBrowserShim.Source) `
    'node_modules\agent-browser\bin\agent-browser-win32-x64.exe'
if (-not (Test-Path -LiteralPath $agentBrowserExe)) {
    [Console]::Error.WriteLine('The agent-browser native Windows binary is missing.')
    exit 1
}

[Console]::Error.WriteLine('Starting or reusing the agent-browser QA session...')
$captureRoot = Join-Path ([System.IO.Path]::GetTempPath()) ([System.Guid]::NewGuid())
$stdoutPath = "$captureRoot.stdout"
$stderrPath = "$captureRoot.stderr"
try {
    $agentBrowserProcess = Start-Process `
        -FilePath $agentBrowserExe `
        -ArgumentList @(
            '--config', $configPath,
            '--session', $sessionName,
            'get', 'cdp-url', '--json'
        ) `
        -WindowStyle Hidden `
        -PassThru `
        -RedirectStandardOutput $stdoutPath `
        -RedirectStandardError $stderrPath

    $deadline = (Get-Date).AddSeconds(20)
    while (-not $agentBrowserProcess.HasExited -and (Get-Date) -lt $deadline) {
        Start-Sleep -Milliseconds 100
    }

    if (-not $agentBrowserProcess.HasExited) {
        [Console]::Error.WriteLine('agent-browser did not return CDP data in time.')
        Stop-Process -Id $agentBrowserProcess.Id -Force -ErrorAction SilentlyContinue
        exit 1
    }
    $agentBrowserProcess.WaitForExit()

    $agentBrowserError = Get-Content -LiteralPath $stderrPath -Raw
    if (-not [string]::IsNullOrWhiteSpace($agentBrowserError)) {
        [Console]::Error.WriteLine($agentBrowserError.Trim())
    }
    $cdpJson = Get-Content -LiteralPath $stdoutPath -Raw
}
finally {
    Remove-Item -LiteralPath $stdoutPath, $stderrPath -Force -ErrorAction SilentlyContinue
}

if ([string]::IsNullOrWhiteSpace($cdpJson)) {
    [Console]::Error.WriteLine('agent-browser returned no CDP connection data.')
    exit 1
}

$cdpInfo = $cdpJson | ConvertFrom-Json
$cdpUrl = $cdpInfo.data.cdpUrl
if (-not $cdpInfo.success -or [string]::IsNullOrWhiteSpace($cdpUrl)) {
    [Console]::Error.WriteLine('agent-browser returned an invalid CDP endpoint.')
    exit 1
}

# Keep stdout clean: from this point it is the MCP JSON-RPC transport.
[Console]::Error.WriteLine('Attaching Chrome DevTools MCP to agent-browser...')
& npx -y chrome-devtools-mcp@1.8.0 `
    --wsEndpoint $cdpUrl `
    --no-usage-statistics
exit $LASTEXITCODE
