# generic-mapboxgl-map

This is an embeddable graphic built using the [`dmninteractives` Yeoman generator](https://github.com/DallasMorningNews/generator-dmninteractives). It's designed to be embedded using [Pym.js](http://blog.apps.npr.org/pym.js/) as a responsive `iframe`.

## How to use this map template

Clone this repo, but be sure to rename it to something specific to your project. In addition, make sure you update the meta.json file to reflect that name change and publish year.

In addition, I'd recommend updating the calls to the mapboxgl api css and js files in the index file. You can find the most recent markup for this under the Quickstart section [here](https://docs.mapbox.com/mapbox-gl-js/overview/).

This template contains a basic set of data as an example. The data is formatted as json with latitude and longitude properties. However, this mapboxgl template uses geojson, and thus, uses the [geojson npm package](https://www.npmjs.com/package/geojson) to convert a typical json file to geojson.

If your data is already in a geojson format, you can skip this step, which is noted in the scripts.js file.


## Requirements

- Node - `brew install node`
- Gulp - `npm install -g gulp-cli`

## Local development

#### Installation

1. `npm install` to install development tooling
2. `gulp` to open a local development server

#### What's inside

- `src/index.html` - Graphic HTML markup; there's no Nunjucks, etc. so this is just straight HTML
- `src/embed.html` - A page to test your embed
- `src/js/*.js` - Graphic scripts, written in ES2015 (it'll be transpiled with Babel)
- `src/sass/*.scss` - Graphic styles in SCSS
- `dist/*` - All of the above, transpiled

_Important caveat:_ Video, audio and ZIP files are ignored by `git` regardless of where they're saved. You'll need to manually alter the [`.gitignore`](.gitignore) file to have them committed to Github.

#### Publishing

`gulp publish` will upload your [`dist/`](dist/) folder to the `embeds/2019/generic-mapboxgl-map/` folder on our interactives S3 bucket.

## Usage

#### Embedding in Serif

The below embed code can be pasted into a Serif "code block":

```html
<div id="chemirmir-timeline"></div>

<script src="//pym.nprapps.org/pym.v1.min.js"></script>
<script>new pym.Parent('chemirmir-timeline', '//interactives.dallasnews.com/embeds/2019/interactive_chemirmir-timeline/', {})</script>
```

## Copyright

&copy;2019 The Dallas Morning News
