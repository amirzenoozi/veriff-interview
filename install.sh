# Run Both Front and Backed Application at the same time
echo "Installing Frontend Packages..."
cd front && yarn
echo "Installing Backend Packages..."
cd ../back && yarn
echo "Veriff Interview Application Installed Successfully!"
