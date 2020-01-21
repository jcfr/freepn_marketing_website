#!/bin/bash

# Script to generate the pages/blog.html page.
# Generates article previews from md files in the /posts folder.

# build header part one
cat ./src/pages/blog_stubs/blog_header.txt > dist/pages/blog.html

# add footer section
cat ./src/pages/blog_stubs/blog_footer.txt >> dist/pages/blog.html

echo "Built blog index file as blog.html successfully."


# for f in ./src/posts/*.md; do
# 	FILE=$(basename -- $f)
# 	FILENAME="${FILE%.*}"
# done


# generate custom header tags
# for i in {2..3}; do
#   # get lines 2 and 3 from markdown file (TITLE and DESCRIPTION)
#   line=$(head -n $i $f | tail -1)
#   IFS=':' # colon (:) is set as delimiter
#   read -ra ADDR <<< "$line" # str is read into an array as tokens separated by IFS
#   IFS=' ' # reset to default value after usage

#   value=$(echo "${ADDR[1]}" | sed 's/^[[:space:]]*//') # gets the value and trims leading whitespace
#   tag=$(echo "${ADDR[0]}" | sed 's/^[[:space:]]*//') # gets the tag and trims leading whitespace

#   if [ -z ${tag+x} ]; then 
#     echo "Error: meta tag is unset. Please check your md file header section!"
#   else
#     case "$tag" in
#       ("TITLE")
#         echo "<title>FreePN - $value</title>" >> dist/posts/$FILENAME.html
#       ;;
#       ("DESCRIPTION")
#         echo "<meta name="description" content="$value" />" >> dist/posts/$FILENAME.html
#       ;;
#       (*) 
#         echo "Error: meta tag did not match any recognized value in file: $FILENAME. Please check your md file header section!"
#       ;;
#     esac
#   fi
# done
