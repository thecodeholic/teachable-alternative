#!/usr/bin/env bash

# Laravel Sail shortcut script
# This script provides a convenient way to run Sail commands

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Run the Sail binary with all passed arguments
"$SCRIPT_DIR/vendor/bin/sail" "$@"
