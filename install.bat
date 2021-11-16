call npm run build
az storage blob upload-batch -s .\build -d $web --account-name gangtestqrscan
