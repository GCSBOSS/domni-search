# [DOMni Search](https://gitlab.com/GCSBOSS/domni-search)

A search bar component for filtering DOM nodes based on content.

## Get Started

Include the script:

```html
<script src="https://cdn.jsdelivr.net/npm/domni-search@0"></script>
```

Have a host input search element and a couple elements amongst which to search:

```html
<input type="search" />
<ul>
    <li>foo</li>
    <li>foo bar</li>
    <li>foo baz</li>
    <li>bar baz</li>
</ul>
```

After the page is loades, construct an index of the searchable DOM elements:

```js
var idx = new SearchIndex('div > li');
// Second parameter is a boolean for case sensitivity. Defaults to false (insensitive).
```

Optionally store some settings in an object:

```js
var settings = {
    delay: 500, // ms to delay search after typing
    any: false // wether to look for elements that match any word
};
```

And then decorate your input as a Domni Search Bar:

```js
var bar = new SearchBar('input[type=search]', idx, settings);
```

## Reporting Bugs
If you have found any problems with this module, please:

1. [Open an issue](https://gitlab.com/GCSBOSS/domni-search/issues/new).
2. Describe what happened and how.
3. Also in the issue text, reference the label `~bug`.

We will make sure to take a look when time allows us.

## Proposing Features
If you wish to get that awesome feature or have some advice for us, please:
1. [Open an issue](https://gitlab.com/GCSBOSS/domni-search/issues/new).
2. Describe your ideas.
3. Also in the issue text, reference the label `~proposal`.

## Contributing
If you have spotted any enhancements to be made and is willing to get your hands
dirty about it, fork us and
[submit your merge request](https://gitlab.com/GCSBOSS/domni-search/merge_requests/new)
so we can collaborate effectively.
