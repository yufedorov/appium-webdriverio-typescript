& cmd /c 'npm run mb-debug'
if ($LASTEXITCODE -ne 0) {
  For ($i=0; $i -le 1; $i++) 
  {
	& cmd /c 'npm run mb-debug'
	if ($LASTEXITCODE -ne 1)
	{
		break
	}
  }
}
  