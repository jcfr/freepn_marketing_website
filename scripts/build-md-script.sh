#!/bin/bash

# build and copy blog posts
mkdirp dist/posts/
for f in ./src/posts/*.md; do
	FILE=$(basename -- $f)
	FILENAME="${FILE%.*}"
	cat ./src/posts/post_stubs/post_header.txt > dist/posts/$FILENAME.html
	markdown $f >> dist/posts/$FILENAME.html	
	cat ./src/posts/post_stubs/post_footer.txt >> dist/posts/$FILENAME.html
	echo "Built Markdown file $FILE as $FILENAME.html"
done
