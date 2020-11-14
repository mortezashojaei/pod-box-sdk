#!/usr/bin/env bash
node -e 'console.log(require("./package.json").version)' > .old-version