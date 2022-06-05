#!/bin/bash
set -ue -i -o pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "converting CFHero_Slovak.json to sk.json"
./index.js po2ios "$SCRIPT_DIR/../languages/CFHero_Slovak.json" "$SCRIPT_DIR/../../src/translations/sk.json"
echo "SK: done"

echo "converting CFHero_Czech.json to cs.json"
./index.js po2ios "$SCRIPT_DIR/../languages/CFHero_Czech.json" "$SCRIPT_DIR/../../src/translations/cs.json"
echo "CS: done"

echo "converting CFHero_Polish.json to pl.json"
./index.js po2ios "$SCRIPT_DIR/../languages/CFHero_Polish.json" "$SCRIPT_DIR/../../src/translations/pl.json"
echo "PL: done"

echo "converting CFHero_Ukrainian.json to uk.json"
./index.js po2ios "$SCRIPT_DIR/../languages/CFHero_Ukrainian.json" "$SCRIPT_DIR/../../src/translations/uk.json"
echo "UK: done"
