# Style guide

Fonts
=====
We use two main fonts for our interactive content. PT Serif is our standard serif font, while Gotham is our sans-serif font. In some specific cases, it's okay to deviate from these two fonts for display type and design purposes, but a good case should be made for such deviation.

### PT Serif
PT Serif is used for most display type, including headlines and deck heads, and body copy. Large blocks of copy that are meant to be read uninterrupted, such as body copy, should be in PT Serif to allow for easier reading.

**CSS or SCSS variable**
```css
font-family: "PT Serif", Georgia, serif;
font-family: $serif;
```
***

### Montserrat
Montserrat is used for smaller, individual blocks of text, including headers, chatter, call outs and axes for data vizualizations, bylines and publish dates and labels. In some special instances, Montserrat can be used for display type, usually when the interactive that follows is a data-viz-heavy story or presentation that is told in a means other than large blocks of copy.

**CSS or SCSS Variable**
```css
font-family: Montserrat, Arial, sans;
font-family: $sans;
```
&nbsp;

Typography
=====

The follow sections specify rules about the typography of most text elements in our interactives. The base font size for interactive presentations is `10px` with elements sized in `rems` against this. The base styles sheet within the interactives generator will handle setting type sizes and spacing in most cases. While these rules are not set in stone, they should be considered a reliable guide. Changes to the base styles should be carefully considered.


### Headlines and Deckheads
Headlines are defined at the top of interactive articles, or on landing pages for multi-part series. The headline element consists of at least a `h1` and `h2` tag, and optionally can be proceeded by a `h3` tag that serves as a label. Headlines typically display in our serif font, but, as stated above, can optionally be displayed in our sans-serif font for specific story types or displays. Font sizes and line-heights vary by screen size, but styles are pre-written within the base style sheet.

**HTML**
```html
<div id="story-head">
  <h3>Label head</h3>
  <h1>Headline here</h1>
  <h2>Deck head here</h2>
</div>
```
***

### Body copy
Body copy makes up the bulk of the content of interactive presentations and consists of a collection of `p` elements within a `section` element with the class of `content-well`. In almost all cases, body copy should be displayed in our serif font (see above), sized at `1.7rem`, with a line-height and margin-bottom of `2.4rem`. In addition, body copy should be displayed no wider than `650px`.

**HTML**
```html
<section class="content-well">
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
</section>
```

***

### Cutlines
Cutlines follow photos, and when possible, should be written to reflect not only what's going on within the image but also compliment the story while avoiding running overly long. In most instances, cutlines will span the width of the image, though cutlines on full bleed images require padding to the left and right. Cutlines are styled with font-size/line-height at `1.3rem/1.8rem` and a color value of `#424242`. Changes to cutline sizes should be avoided, but position and color could change based on design.

**HTML**
```html
<div class="image-block">
  <img src="images/_defaultImage.jpg" alt="Alt text" />
  <p class="cutline">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
</div>
```

***

### Charts
Charts and data visualizations consist of a chart head, intro chatter, a legend or key (optional), the data visualization, a source line and credit line. Chart heads should always be written in sentence case, capitalizing on the first letter of the first word and any proper nouns.

#### Chart elements

| element | font sizes | line heights | margin-bottom | weights |
| :------ | ---------: | -----------: | ------: | ------: |
| Head | 2.4rem | 3rem | 1.2rem | 700 |
| Intro | 1.4rem  | 1.8rem | 1.2rem | 400 |
| Legend | 1.3rem | 1.8rem | 0.6rem | 400 |
| Source | 1.2rem | 1.5rem | 0.6rem | 400 |
| Credit | 1.2rem | 1.5rem | 0rem | 400 |

**HTML**
```html
<div class="chart__group inline-block">
  <div class="chart__chatter">
    <h4>Chart head goes here</h4>
    <p>Chart intro text goes here.</p>
  </div>
  <div class="chart__legend">
    <ul>
      <li>Thing 1</li>
      <li>Thing 2</li>
    </ul>
  </div>
  <div class="chart"></div>
  <p class="chart__source"><strong>Source: </strong> Source goes here.</p>
  <p class="chart__credit">Your name/DMN</p>
</div>
```

**CSS**
```css
@import 'components/_charts';
```

***

### Pullquotes

Pull quotes are usually used as design elements, so their styles can vary greatly depending on the design asthetic of the individual project. The starterkit does come with a some base pull quote styles, depending on what you're looking for.

**HTML**
```html
<div class="pullquote">
	<blockquote>A strategy to attract the middle class back to Dallas will be complex, but it is not impossible. After all, many believed that downtown couldn&rsquo;t be restored.</blockquote>
	<p class="attribution">Quote Attribution</p>
</div>
```

**CSS**
```css
@import 'components/_pullquotes.scss';
```

Use the table below to determine which classes need to be added to the `<div class="pullquote">` element, along with which additional scss component files need to be imported (if any).

| Type | Class(es) | CSS Import |
| :--- | :-------- | :----- |
| Full width  | full-block | N/A |
| Inline | inline-block | N/A |
| Left hang | side-block left-block | components/_side-blocks |
| Right hang | side-block right-block | components/_side-blocks |


&nbsp;

Colors
=====
The interactives color palette is divided in to two sub palettes, blacks and colors. Blacks are used for typography and rules, while colors highlight links and bring life to our data vizualizations and graphics. Our blacks do not contain a solid black color. For a dark background, use the primary black, as it offers a richer mat for content and type than the 100% black.

### Primary blacks
Primary blacks are the blacks used most often and serve as a starting point when choosing which black to use.

| Swatch | Name | Hex | SCSS Variable |
| :----- | :--- | :-- | :------------ |
| ![#212121](https://placehold.it/15/212121/000000?text=+) | Primary black | #212121 | $black33 |
| ![#212121](https://placehold.it/15/323232/000000?text=+) | Brand black | #323232 | $black50 |
| ![#f5f5f5](https://placehold.it/15/f5f5f5/000000?text=+) | Primary gray | #f5f5f5 | $black245 |

### Secondary blacks
Secondary blacks offer a wide variety of blacks and shades of gray between our primary black and our primary gray.

| Swatch | Name | Hex | SCSS Variable |
| :----- | :--- | :-- | :------------ |
| ![#424242](https://placehold.it/15/424242/000000?text=+) | Black 66 | #424242 | $black66 |
| ![#797979](https://placehold.it/15/797979/000000?text=+) | Black 121 | #797979 | $black121 |
| ![#d7d7d7](https://placehold.it/15/d7d7d7/000000?text=+) | Black 215 | #d7d7d7 | $black215 |
| ![#ebebeb](https://placehold.it/15/ebebeb/000000?text=+) | Black 235 | #ebebeb | $black235 |

### Non-chart Colors
Non chart colors define colors on elements outside of data visualizations, such as links, branding and table bars.

| Swatch | Name | Hex | SCSS Variable |
| :----- | :--- | :-- | :------------ |
| ![#0185d3](https://placehold.it/15/0185d3/000000?text=+) | DMN Blue | #0185d3 | $dmnblue |
| ![#efebde](https://placehold.it/15/efebde/000000?text=+) | Table Tan | #efebde | $tableBar |

### Chart Colors
Data visualizations should make use of the colors below for displaying data. Preference in color usage is from top to bottom, but, is not set in stone. Use what works best for your visualization.

| Swatch | Name | Hex | SCSS Variable |
| :----- | :--- | :-- | :------------ |
| ![#329ce8](https://placehold.it/15/329ce8/000000?text=+) | Chart blue | #329ce8 | $chartBlue |
| ![#e34e36](https://placehold.it/15/e34e36/000000?text=+) | Chart red | #e34e36 | $chartRed |
| ![#ff8f24](https://placehold.it/15/ff8f24/000000?text=+) | Chart orange | #ff8f24 | $chartOrange |
| ![#fec44f](https://placehold.it/15/fec44f/000000?text=+) | Chart yellow | #fec44f | $chartYellow |
| ![#52b033](https://placehold.it/15/52b033/000000?text=+) | Chart green | #52b033 | $chartGreen |
| ![#8554bf](https://placehold.it/15/8554bf/000000?text=+) | Chart purple | #8554bf | $chartPurple |
| ![#6dccf2](https://placehold.it/15/6dccf2/000000?text=+) | Chart light blue | #6dccf2 | $chartLightBlue |
| ![#c9c9c9](https://placehold.it/15/c9c9c9/000000?text=+) | Chart gray | #c9c9c9 | $chartGray |

&nbsp;

Links and Buttons
===

Semantically, links and buttons do two very distinct things. If the action the user takes results in them being taken to a new page, or to a different position on the current page, a link should be used. If the action results in something changing (charts updating, elements being revealed or hidden, etc), then a button should be used.

### Links
By default in the starterkit, links will have an unvisted color of  `$dmnblue` and a visited color of `$black66`. These colors are open to customization based on the design theme of the interactive. They should not be underline, but should display an underline when hovered over. There are rare occasions where a link may take the form of a button while still semantically being an anchor tag in the markup. Our subscribe call-to-action module is one of those instances.

### Buttons

The starterkit comes with a couple of built in button styles with blue and red buttons. When possible, button styles should not be changed, though depending on the intention of the button, a different color can be used. Buttons get a class of `.int-btn`, with the red variant getting an additional class of `.int-btn--red`.

&nbsp;


Image and video blocks
=====
The interactives starterkit comes with a variety of image sizes and layouts prebuilt into the stylesheet. All that is required is adding the appropriate class names to the `<div class="image-block">` element, and in some cases, importing some additional component stylesheets. Reference the chart below:

| Type | Class list | CSS Import list |
| :--- | :--------- | :-------------- |
| Full | full-block | N/A |
| Wide | wide-block | N/A |
| Inline | inline-block | N/A |
| Left hang | left-block side-block | components/_side-blocks.scss |
| Right hang | right-block side-block | components/_side-blocks.scss |
| Double | wide-block double-block | N/A |
| Video | see below | components/_videos.scss |

### Base image blocks
Most images blocks can simply use the class list and component list above combined with the base image block class:

**HTML**
```html
<div class="image-block">
  <img src="images/_defaultImage.jpg" alt="ALT TEXT GOES HERE. DO NOT LEAVE UNEDITED">
  <p class="cutline">Cutline goes here. You can remove this tag if you don't feel the lead image needs a cutline</p>
</div>
```
***

### Full width image blocks
The full width image block requires some additional html tags surrounding it to close off the content well, then reopen it.

**HTML**
```html
</section>
<!-- end content-well -->
<div class="image-block full-block">
  <img src="images/_defaultImage.jpg" alt="ALT TEXT GOES HERE. DO NOT LEAVE UNEDITED">
  <p class="cutline">Cutline goes here. You can remove this tag if you don't feel the lead image needs a cutline</p>
</div>
<!-- start content-well -->
<section class="content-well">
```
***

### Double image blocks
The double image block needs an additional image tag within the `image-block` element.

**HTML**
```html
<div class="image-block wide-block double-block clearfix">
  <div>
    <img src="images/_defaultImage.jpg" alt="ALT TEXT GOES HERE. DO NOT LEAVE UNEDITED">
    <p class="cutline">Proin pharetra massa quis turpis scelerisque, ut pharetra enim semper. Integer congue lacus felis, sit amet accumsan neque suscipit feugiat. Aenean pretium mattis felis, a suscipit neque posuere ac.</p>
  </div>
  <div>
    <img src="images/_defaultImage.jpg" alt="ALT TEXT GOES HERE. DO NOT LEAVE UNEDITED">
    <p class="cutline">Proin pharetra massa quis turpis scelerisque, ut pharetra enim semper. Integer congue lacus felis, sit amet accumsan neque suscipit feugiat. Aenean pretium mattis felis, a suscipit neque posuere ac.</p>
  </div>
</div>
```
***

### Mug blocks
Used to inset a mug-sized photo inside the column well.

**HTML**
```html
<div class="image-block mug-block">
  <img src="images/_defaultImage.jpg" alt="" />
  <p class="cutline">Name</p>
</div>
```

### Video blocks
Video blocks are our standard code block to handle youtube video embeds. They take a slightly different markup as other image blocks to accommodate for making the video embed responsive and require the video's unique id to be included in the iframe src attribute.

**HTML**
```html
<div class="video__block">
  <div class="videowrapper">
    <iframe width="1280" height="720" src="http://www.youtube.com/embed/{{video-id-here}}" frameborder="0" allowfullscreen></iframe>  
    <!-- change out iframe code with your youtube video -->
  </div>
</div>
<!-- end you tube video -->
```

Miscellaneous elements
=====
There are a few other miscellaneous elements prebuilt into the starter kit that one might find useful.

### Breakouts
Breakouts allow for columned layouts of elements in groups of two, three and four. These can be useful for small, alike text chunks or character profiles. All of the breakout modules take a `breakout__module` class on the parent div, along with the class specified in the table below:

| Type | Class list | CSS Import list |
| :--- | :--------- | :-------------- |
| Two-up | breakout--two | components/_breakouts.scss |
| Three-up | breakout--three | components/_breakouts.scss |
| Four-up | breakout--four | components/_breakouts.scss |

**HTML example of a two-across breakout**
```html
<div class="breakout--two breakout__module">
  <h4>Chatter head here</h4>
  <div class="breakout__grid">
    <div class="breakout__box clearfix">
      <img src="images/_defaultImage.jpg" alt="Fill this in">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
    <div class="breakout__box clearfix">
      <img src="images/_defaultImage.jpg" alt="Fill this in">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
  </div>
</div>
```

**Note:** Including images in the `breakout__box` elements is optional, but the breakout elements will work best if the images are the same dimensions. Additional `breakout__box` elements may be needed depending on which type of breakout module you're using.

***

## Slideshows
Setting up a slideshow in the interactives starterkit is a multi-step process, detailed below:

1. Collect and size all your photos as you normally would for an interactive. It's helpful if photos are the same dimensions, so it's recommended to take any vertical photos and save them as horizontal on a white mat.
2. Add `@import "components/_slideshows.scss";` to your **styles.scss** file.
3. Add `import './slideshow';` to your **scripts.js** file.
4. Install the **imagesloaded** plugin via npm with `npm install imagesloaded --save` at your project root level in the command line.
5. Install the **hammer.js** plugin via npm with `npm install hammerjs --save` at your project root level in the command line to provide swipe support.
6. Fill out [this form](http://interactives.dallasnews.com/tools/easyslide/) to gather your slideshow html markup and place in your index.html file.
7. In your **scripts.js** file, call `easyslide` on the id of your slideshow html element like so:
```js
$('#my-slideshow').easyslide();
```
***

### Side blocks
As discussed above in the pullquote elements, there are sideblock elements that allow you to place small pieces of content to the left and right of the content well. All of the side-block elements contain the class `side-block` on the parent element. These can be used in conjunction with other elements, such as pullquotes, charts, etc. These elements progress into the copy as the screen gets smaller, and finally, fall inline on the smallest of screens.

| Type | Class list | CSS Import list |
| :--- | :--------- | :-------------- |
| Left | left-block | components/_side-blocks.scss |
| Right | right-across | components/_side-blocks.scss |

**HTML example of a left, side block:**
```html
<aside class="side-block left-block">
	<h5>Lorem ipsum</h5>
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
	<p>Vestibulum interdum, est vel elementum tincidunt, ante mauris tempus eros, commodo viverra arcu diam euismod erat. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras elementum nulla nunc, vitae venenatis magna fringilla nec. </p>
</aside>
```

### Subscribe call to action
On much of what we do, we’ll want to include a specific all to action for readers to subscribe if they haven't already. The wording of this element will change from story type to story type, but the structure and style remain the same.

**HTML**
```html
<div class="subscribe-cta">
  <h4>Looking for the next great enterprise story?</h4>
  <p>If you enjoy profiles of interesting Texans such as this, please consider supporting dallasnews.com by subscribing today.</p>
  <a href="https://www.dallasnews.com/offers/sign-up">Subscribe now</a>
</div>
```

**SCSS import**
```css
@import 'components/_subscribe.scss';
```
