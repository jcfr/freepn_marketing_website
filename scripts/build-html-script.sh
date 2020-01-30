#!/bin/bash

# Script to copy and build the html files and folders for distribution.

# copy over html, robots.txt, and sitemap.xml files
cp src/CNAME dist/ && mkdir -p dist/downloads/ && cp src/downloads/* dist/downloads/ && cp src/robots.txt dist/ && cp src/*.html dist/ && mkdir -p dist/pages/ && cp -R src/pages/*.html dist/pages/ && ./scripts/build-blog-script.sh && ./scripts/build-sitemap-script.sh
echo 'Built all HTML files successfully.'
