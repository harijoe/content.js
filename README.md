# parse-content.js

A HTML parser which retrieves most useful information from an html string

---

## Basic Usage

* `npm install parse-content.js`
* Parse some html:
```
import parseContent from 'parse-content.js';

const HTML = // ...some HTML string

parseContent(HTML);
/* {
    title: 'Hello',
    description: 'A description'
    content: 'All the content...'
} */
```
