#!/bin/bash

# build and copy blog posts
mkdir -p dist/posts/
for f in ./src/posts/*.md; do
	FILE=$(basename -- $f)
	FILENAME="${FILE%.*}"

	# build header part one
	cat ./src/posts/post_stubs/post_header_part_one.txt > dist/posts/$FILENAME.html

	# generate custom header tags
	for i in {1..2}; do
		# get lines 1 and 2 from markdown file
		line=$(head -n $i $f | tail -1)
		IFS=':' # colon (:) is set as delimiter
		read -ra ADDR <<< "$line" # str is read into an array as tokens separated by IFS
		IFS=' ' # reset to default value after usage

		value=$(echo "${ADDR[1]}" | sed 's/^[[:space:]]*//') # gets the value and trims leading whitespace
		tag=$(echo "${ADDR[0]}" | sed 's/^[[:space:]]*//') # gets the tag and trims leading whitespace

		if [ -z ${tag+x} ]; then 
			echo "Error: meta tag is unset. Please check your md file header section!"
		else
			case "$tag" in
				("TITLE")
					echo "<title>FreePN - $value</title>" >> dist/posts/$FILENAME.html
				;;
				("DESCRIPTION")
					echo "<meta name="description" content="$value" />" >> dist/posts/$FILENAME.html
				;;
				(*) 
					echo "Error: meta tag did not match any recognized value in file: $FILENAME. Please check your md file header section!"
				;;
			esac
		fi
	done

	# complete header section
	cat ./src/posts/post_stubs/post_header_part_two.txt >> dist/posts/$FILENAME.html
	# generate content from markdown file
	markdown $f >> dist/posts/$FILENAME.html
	# add footer section
	cat ./src/posts/post_stubs/post_footer.txt >> dist/posts/$FILENAME.html

	echo "Built Markdown file $FILE as $FILENAME.html successfully."
done
