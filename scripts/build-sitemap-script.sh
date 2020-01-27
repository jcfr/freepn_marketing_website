#!/bin/bash

# Script to build the sitemap.xml file.

# remove existing sitemap file
rm dist/sitemap.xml

# add static bits to the file
echo '<?xml version="1.0" encoding="UTF-8"?>' > dist/sitemap.xml
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' >> dist/sitemap.xml

# save the current date
date=$(date '+%Y-%m-%d')

# home/index page
echo '  <url>' >> dist/sitemap.xml
echo '    <loc>https://freepn.com/index.html</loc>' >> dist/sitemap.xml
echo '    <lastmod>'$date'</lastmod>' >> dist/sitemap.xml
echo '    <changefreq>monthly</changefreq>' >> dist/sitemap.xml
echo '    <priority>1</priority>' >> dist/sitemap.xml
echo '  </url>' >> dist/sitemap.xml

# pages folder files
for f in ./src/pages/*.html; do
	FILE=$(basename -- $f)
	FILENAME="${FILE%.*}"
  echo '  <url>' >> dist/sitemap.xml
  echo '    <loc>https://freepn.com/pages/'$FILENAME'.html</loc>' >> dist/sitemap.xml
  echo '    <lastmod>'$date'</lastmod>' >> dist/sitemap.xml
  echo '    <changefreq>monthly</changefreq>' >> dist/sitemap.xml
  echo '    <priority>0.8</priority>' >> dist/sitemap.xml
  echo '  </url>' >> dist/sitemap.xml
done 

# posts folder markdown files
for f in ./src/posts/*.md; do
	FILE=$(basename -- $f)
	FILENAME="${FILE%.*}"

  # start sitemap section
  echo '  <url>' >> dist/sitemap.xml
  echo '    <loc>https://freepn.com/posts/'$FILENAME'.html</loc>' >> dist/sitemap.xml
  
  # pull out date from header section
  # get line 5 from markdown file (DATE)
  line=$(head -n 5 $f | tail -1)
  IFS=':' # colon (:) is set as delimiter
  read -ra ADDR <<< "$line" # str is read into an array as tokens separated by IFS
  IFS=' ' # reset to default value after usage

  value=$(echo "${ADDR[1]}" | sed 's/^[[:space:]]*//') # gets the value and trims leading whitespace
  tag=$(echo "${ADDR[0]}" | sed 's/^[[:space:]]*//') # gets the tag and trims leading whitespace

  if [ -z ${tag+x} ]; then 
    echo "Error: date meta tag is unset. Please check your md file header section!"
  else
    case "$tag" in
      ("DATE")
        echo '    <lastmod>'$value'</lastmod>' >> dist/sitemap.xml
      ;;
      (*) 
        echo "Error: meta tag did not match needed value in file: $FILENAME. Please check your md file header section!"
      ;;
    esac
  fi

  # rest of sitemap section
  echo '    <changefreq>yearly</changefreq>' >> dist/sitemap.xml
  echo '    <priority>0.5</priority>' >> dist/sitemap.xml
  echo '  </url>' >> dist/sitemap.xml

done 

# final static bits
echo '</urlset>' >> dist/sitemap.xml
echo 'Built sitemap.xml file successfully.'
