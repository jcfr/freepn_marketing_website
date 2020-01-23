#!/bin/bash

# Script to generate the pages/blog.html page.
# Generates article previews from md files in the /posts folder.

declare -a DATE_ARRAY

# get markdown files in posts folder
# and get the date fields from the files
# create an array in the format date|filename
for f in ./src/posts/*.md; do
	FILE=$(basename -- $f)
	FILENAME="${FILE%.*}"

  line=$(head -n 5 $f | tail -1)
  
  IFS=':' # colon (:) is set as delimiter
  read -ra DATE <<< "$line|$f" # str is read into an array as tokens separated by IFS
  unset IFS # reset to default value after usage
  DATE_ARRAY+=(${DATE[1]})
done

# numerically sort the date fields in reverse order (most recent first)
IFS=$'\n' 
SORTED_DATES_ARRAY=($(sort -rn <<<"${DATE_ARRAY[*]}"))
unset IFS

declare -a FILE_ARRAY

# strip out the date field to create the sorted array of files
for x in "${SORTED_DATES_ARRAY[@]}"; do
  IFS='|' # pipe (|) is set as delimiter
  read -ra FILE_NAME <<< "$x" # str is read into an array as tokens separated by IFS
  unset IFS # reset to default value after usage
  FILE_ARRAY+=(${FILE_NAME[1]})
done

# build header part one
cat ./src/pages/blog_stubs/blog_header.txt > dist/pages/blog.html

# iterate over sorted array of markdown files
for f in "${FILE_ARRAY[@]}"; do
	FILE=$(basename -- $f)
	FILENAME="${FILE%.*}"

  echo '<a class="blog_section_one_post scroll_animate" href="/posts/'$FILENAME'.html">' >> dist/pages/blog.html

  declare -a ARTICLE_ARRAY

  for i in {2..6}; do
    # get lines 2 through 6 from markdown file (HEADER tags)
    line=$(head -n $i $f | tail -1)
    IFS=':' # colon (:) is set as delimiter
    read -ra ADDR <<< "$line" # str is read into an array as tokens separated by IFS
    unset IFS # reset to default value after usage

    value=$(echo "${ADDR[1]}" | sed 's/^[[:space:]]*//') # gets the value and trims leading whitespace
    tag=$(echo "${ADDR[0]}" | sed 's/^[[:space:]]*//') # gets the tag and trims leading whitespace

    if [ -z ${tag+x} ]; then 
      echo "Error: meta tag is unset. Please check your md file header section!"
    else
      case "$tag" in
        ("TITLE")
          ARTICLE_ARRAY[0]='    <span class="blog_section_one_post_title">'$value'</span>'
        ;;
        ("DESCRIPTION")
          ARTICLE_ARRAY[1]='    <span class="blog_section_one_post_description">'$value'</span>'
        ;;
        ("AUTHOR")
          ARTICLE_ARRAY[2]='    <span class="blog_section_one_post_author">'$value'</span>'
        ;;
        ("DATE")
          ARTICLE_ARRAY[3]='    <span class="blog_section_one_post_date">'$value'</span>'
        ;;
        ("IMAGE")
          value_two=$(echo "${ADDR[2]}" | sed 's/^[[:space:]]*//') # gets the value and trims leading whitespace
          # if array is of size 2, then it's an internal link, otherwise, it must be an external link (with a colon ':')
          if [ ${#ADDR[@]} -eq 2 ]; then
            ARTICLE_ARRAY[4]='    <img class="blog_section_one_post_img" src="'$value'" />'
          else
            ARTICLE_ARRAY[4]='    <img class="blog_section_one_post_img" src="'$value':'$value_two'" />'
          fi
        ;;
        (*) 
          echo "Error: meta tag did not match any recognized value in file: $FILENAME. Please check your md file header section!"
        ;;
      esac
    fi
  done

  # build the HTML
  echo ${ARTICLE_ARRAY[4]} >> dist/pages/blog.html # image tag
  echo '  <div class="blog_section_one_post_info">' >> dist/pages/blog.html
  echo ${ARTICLE_ARRAY[0]} >> dist/pages/blog.html # title
  echo ${ARTICLE_ARRAY[1]} >> dist/pages/blog.html # description
  echo '    <div class="blog_section_one_post_info_bottom">' >> dist/pages/blog.html
  echo ${ARTICLE_ARRAY[2]} >> dist/pages/blog.html # author
  echo ${ARTICLE_ARRAY[3]} >> dist/pages/blog.html # date
  echo '    </div>' >> dist/pages/blog.html
  echo '  </div>' >> dist/pages/blog.html
  echo '</a>' >> dist/pages/blog.html

done

# add footer section
cat ./src/pages/blog_stubs/blog_footer.txt >> dist/pages/blog.html

echo "Built blog index file as blog.html successfully."
