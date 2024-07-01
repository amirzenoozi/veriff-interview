# Run Both Front and Backed Application at the same time
echo "Installing Veriff Interview Packages..."
for d in ./*/ ; do (cd "$d" && yarn); done
