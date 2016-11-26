# content.js

A HTML parser which retrieves most useful information from an html string

---

## Basic Usage

* `npm install content.js`
* Parse some html:
```
import content from 'content.js';

const HTML = // ...some HTML string

content(HTML);
/* {
    title: 'Hello',
    description: 'A description'
    content: 'All the content...'
} */
```
