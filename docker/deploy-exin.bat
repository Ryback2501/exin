@echo off
setlocal EnableExtensions EnableDelayedExpansion

set "SshHost=%~1"
set "SshUser=%~2"

set "RepoGitUrl=git@github.com:Ryback2501/exin.git"
set "RepoBranch=main"
set "DockerfilePathInRepo=docker/Dockerfile"

set "RemoteWorkDir=/opt/exin"
set "ImageName=exin:latest"
set "ContainerName=exin"
set "HostPort=8080"

where ssh >nul 2>&1
if errorlevel 1 (
  echo ssh is not available in your Windows PATH.
  exit /b 1
)

if "%SshHost%"=="" (
  set /p "SshHost=Enter the SSH server IP or hostname: "
)

if "%SshUser%"=="" (
  set /p "SshUser=Enter the SSH user: "
)

if "%SshHost%"=="" (
  echo SSH host is required.
  exit /b 1
)

if "%SshUser%"=="" (
  echo SSH user is required.
  exit /b 1
)

set "RepoPath=%RepoGitUrl%"
set "RepoPath=%RepoPath:git@github.com:=%"
set "RepoPath=%RepoPath:https://github.com/=%"
set "RepoPath=%RepoPath:.git=%"
if "%RepoPath:~-1%"=="/" set "RepoPath=%RepoPath:~0,-1%"

for /f "tokens=1,2 delims=/" %%A in ("%RepoPath%") do (
  set "RepoOwner=%%A"
  set "RepoName=%%B"
)

if "%RepoOwner%"=="" (
  echo Unsupported repo URL: %RepoGitUrl%
  exit /b 1
)

if "%RepoName%"=="" (
  echo Unsupported repo URL: %RepoGitUrl%
  exit /b 1
)

set "DockerfileRawUrl=https://raw.githubusercontent.com/%RepoOwner%/%RepoName%/%RepoBranch%/%DockerfilePathInRepo%"
set "RepoArchiveUrl=https://codeload.github.com/%RepoOwner%/%RepoName%/tar.gz/refs/heads/%RepoBranch%"
set "AppUrl=http://%SshHost%:%HostPort%"

echo Connecting via SSH to %SshUser%@%SshHost%...
echo Repo: %RepoGitUrl% ^(branch: %RepoBranch%^)
echo Dockerfile: %DockerfileRawUrl%
echo Step 1: enter SSH password for %SshUser%@%SshHost%.
ssh -tt -o PubkeyAuthentication=no "%SshUser%@%SshHost%" ^
  "echo Welcome to the server; ^
  echo Introduce super user password.; ^
  su -c 'set -eu; ^
  echo Password introduced successfully; ^
  echo [1/4] Downloading Dockerfile...; ^
  mkdir -p %RemoteWorkDir%; ^
  cd %RemoteWorkDir%; ^
  wget -O Dockerfile %DockerfileRawUrl%; ^
  echo [2/4] Building Docker image...; ^
  docker build --pull --build-arg REPO_ARCHIVE_URL=%RepoArchiveUrl% -t %ImageName% -f Dockerfile .; ^
  echo [3/4] Recreating container...; ^
  docker rm -f %ContainerName% 2>/dev/null || true; ^
  docker run -d --name %ContainerName% --restart unless-stopped -p %HostPort%:80 %ImageName%; ^
  echo [4/4] Container status:; ^
  docker ps --filter name=%ContainerName%'"
set "ExitCode=%ERRORLEVEL%"

if not "%ExitCode%"=="0" (
  echo Remote deployment failed.
  exit /b %ExitCode%
)

echo Deployment completed. Opening %AppUrl% ...
start "" "%AppUrl%"

exit /b 0
