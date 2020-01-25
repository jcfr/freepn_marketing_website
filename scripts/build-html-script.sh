#!/bin/bash

# Script to copy and build the html files and folders for distribution.

# copy over html files
cp src/CNAME dist/ && cp src/robots.txt dist/ && cp src/sitemap.xml dist/ && cp src/*.html dist/ && mkdir -p dist/pages/ && cp -R src/pages/*.html dist/pages/ && ./scripts/build-blog-script.sh
