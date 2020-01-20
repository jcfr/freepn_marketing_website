#!/bin/bash

# Script to uglify js files, so multiple js files can be supported
# in this project.

mkdirp dist/js -p
for f in ./src/js/*.js; do
	FILE=$(basename -- $f)
	FILENAME="${FILE%.*}"
	 uglifyjs $f -m -c -o dist/js/$FILENAME.min.js
	echo "Uglifying $f..."
done
