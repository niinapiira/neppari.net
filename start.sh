#!/bin/bash

# Set monitor mode on, for the fg command to work
set -o monitor

# Start jekyll with local settings
bundle exec jekyll serve --config _config.yml,_config_local.yml &

# Wait for the server to start
sleep 2

# Open the generated page in a browser
open -a "Google Chrome" http://localhost:4000/

# Return to the Jekyll task
fg
