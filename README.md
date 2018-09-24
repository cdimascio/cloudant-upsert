# cloudant-upsert

![](https://img.shields.io/badge/status-stable-green.svg) ![](https://img.shields.io/badge/license-MIT-blue.svg)

A no-dependency module that adds an `upsert` function to the [nodejs-cloudant](https://github.com/cloudant/nodejs-cloudant/blob/master/cloudant.js) module.

<p align="center">
<img src="https://raw.githubusercontent.com/cdimascio/cloudant-upsert/master/assets/cloudant-upsert.png"/>
</p>

## Install

```shell
npm install cloudant-upsert
```

## Usage

The following adds the `upsert` function to a `cloudant` instance

```javascript
var Cloudant = require('cloudant');
var cloudant = Cloudant('<YOUR_CLOUDANT_URI>');
require('cloudant-upsert')(cloudant);
```

## Examples

#### Promises

In the example below `prevdoc` contains `null` or the previous doc

```javascript
cloudant.db.use('mydb').upsert('carmine', prevdoc => ({
    "text": "Woop Woop! We're using promises",
  }))
  .then(r => console.log('result', r))
  .catch(e => console.log('error', e.message));
```

#### Callbacks

In the example below `prevdoc` contains `null` or the previous doc

```javascript
cloudant.db.use('mydb').upsert('carmine', prevdoc => ({
    "text": "Woop! Woop! We're using callbacks"
  }), (err, data) => {
    if (err) console.log('error', err.reason)
    else console.log('data', data)
  })
```

## API

### Promise API
### `upsert(id, function(prevdoc)`)

| param | description |
| ------------- | ------------- |
| `id`  | The document id to upsert  |
| `function(prevdoc): doc `  | A function that provides the previous document (or null when inserting a new doc) as input. You must return the document to upsert.  |


### Callback API
### `upsert(id, function(prevdoc), function(err, res)}`

| param | description |
| ------------- | ------------- |
| `id`  | The document id to upsert  |
| `function(prevdoc): doc`  | A function that provides the previous document (or null when inserting a new doc) and returns a new document to upsert  |
| `function(err, res): void`  | A Node.js error first callback |


## License
MIT
