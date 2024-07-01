# Run Both Front and Backed Application at the same time
echo "Running Veriff Interview Application..."
(cd front && yarn run start &) && (cd back && yarn start:dev)
