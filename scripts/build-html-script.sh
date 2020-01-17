#!/bin/bash

# copy over html files
cp src/*.html dist/ && mkdir -p dist/pages/ && cp -R src/pages/*.html dist/pages/
