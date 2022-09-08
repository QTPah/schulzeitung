sudo -v

echo "Starting MySQL database..."
sudo mysql.server start

echo "Starting Auth server..."
node server.js

echo "Starting API server..."
node APIServer.js

echo "All servers running!"