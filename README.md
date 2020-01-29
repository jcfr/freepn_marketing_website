# FreePN Marketing Website

FreePN marketing website / landing page.

-   [Getting Started](#getting-started)
-   [Adding Blog Posts](#adding-blog-posts)

# Getting Started

-   First, ensure that node.js, npm, and yarn are installed.
-   Clone the project and use your command line to enter your project directory.
-   Run `yarn install` to install the necessary dependencies.

Once the packages have finished installing, it will start a new server, open up a browser to `localhost:3000/dist/index.html` and watch for any HTML, TXT, MD, SCSS, or JS changes in the `src` directory; once it compiles those changes, the browser will automatically update & inject the changed file(s)! If you change an SVG file in the image folder, you may need to manually refresh the page to see the change take effect.

#### Notes:

> If you are having issues with installing or running the project, it was developed with the following versions:
>
> -   Node: `v10.16.0`
> -   Yarn: `1.16.0`
> -   npm: `6.9.0`

> If you are having issues with the markdown or blog page generation scripts, you may want to try installing the `markdown-js` package globally.
>
> -   `npm install -g markdown`

## Development

Start the development server by running `yarn run watch`.

## Deployment

Ready the site for deployment / test compilation with `yarn run predeploy`.
Deploy the site with `yarn run deploy`.

## Linting

You can lint the `js` files at any time by running `yarn run lint-fix`.

# Adding Blog Posts

There are two main scripts in this project for running the blog engine.

-   `build-blog-script.sh`
-   `build-md-script.sh`

These scripts allow you to easily add new pages to the blog! To add a new blog post, you simply create a new markdown file like: `my_blog_post.md` and add it to the `src/posts/` folder of this project. The scripts will take care of generating the page itself and adding it to the main blog index page.

### **Some REALLY IMPORTANT things to note about adding a blog post:**

The name of the file will be the url, so name things intelligently. As an example: `my_blog_post.md` will become: `https://freepn.com/posts/my_blog_post.html`, so make sure to name your file according to SEO concerns for the content - try to match the filename with the keywords you are targeting. As an addendum to this, **DO NOT USE SPECIAL CHARACTERS LIKE % \$ # \* ? ! etc. IN YOUR FILENAME!!!**

Each blog post must have the following header section at the top of the file. This section should **ALWAYS** take up the top 8 lines of the file (7 lines plus one blank line at the bottom). **Having all 8 lines and keeping the order the same MATTERS. Keeping the tags like `TITLE:` the same MATTERS. You will break the blog pages if you don't follow this template.**

You should copy this template exactly, changing each line after the `:` to suit your post.

```
---
TITLE: My Blog Post Title
DESCRIPTION: This is a description of my blog post.
AUTHOR: Ian H. Bateman
DATE: 2020-01-22
IMAGE: https://d14fqx6aetz9ka.cloudfront.net/wp-content/uploads/2020/01/20141709/20200119_TURKOWSKI_Surfline1-2730.jpg
---

```

Some things that **YOU NEED TO KNOW**:

-   The `TITLE:` section will turn into a `<title></title>` HTML tag for the page. This should match the title of the blog post itself. No length restrictions here (be reasonable).
-   The `DESCRIPTION:` section will turn into the `<meta name="description" content="" />` tag for the blog post page. This should be a simple description of the post (could be the first few lines, etc.), but should have any relevant keywords for the post you'd want to show up in a search engine. This should be between `120` and `158` characters, NO SHORTER AND NO LONGER.
-   The `AUTHOR:` tag should simply be your name.
-   The `DATE:` tag should be the date the post is published. If you update the post at some later point, you should update this field as well. This field MUST BE IN THE FORMAT `YYYY-MM-DD`. Any other format WILL BREAK THE BLOG POST INDEX PAGE. The date tag determines the order posts appear on the blog post index page - the most recent post date will appear at the top, on the first page; the oldest post date will appear at the bottom on the last page.
-   The `IMAGE:` tag should be a link to a header image for the blog post. This tag must be present, but if it is left blank like: `IMAGE:` with nothing after, a default image will be filled in. This is the ONLY tag field that can be optionally left blank.
-   You must leave the `---` tags at the top and bottom of the tag section, **AND YOU MUST HAVE A BLANK LINE AT THE BOTTOM OF THE TAG SECTION BENEATH THE BOTTOM** `---` **TAG**.
