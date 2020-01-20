#!/bin/bash

# Script to copy and build the html files and folders for distribution.

# copy over html files
cp src/*.html dist/ && mkdir -p dist/pages/ && cp -R src/pages/*.html dist/pages/
