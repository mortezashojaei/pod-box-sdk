#!/usr/bin/env bash
sed "s/$(cat .old-version)/$(node -e 'console.log(require("./package.json").version)')/g" < README.md > ~README.md
rm README.md .old-version
mv ~README.md README.md
git add README.md