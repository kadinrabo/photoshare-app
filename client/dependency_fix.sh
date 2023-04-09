#!/bin/sh
webpack_config="./node_modules/react-scripts/config/webpack.config.js"

line_number=306
line_to_add='fallback: { "crypto": require.resolve("crypto-browserify"), "stream": require.resolve("stream-browserify") },'

echo "Fixing crypto and steam dependencies..."

if grep -q "$line_to_add" $webpack_config
then
    echo "Crypto and steam fallback already added to the file $webpack_config"
else
    echo "Adding crypto and steam fallback into the file $webpack_config"
    sed -i "$line_number i \ \ \ \ \ \ $line_to_add" $webpack_config
fi
echo "Done! crypto and steam dependency fixed."