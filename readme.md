# script-inner-html

`dangerouslySetInnerHTML` that evaluates `<script>` tags

## install

```
npm install --save script-inner-html
```

## usage

```js
const React = require('react');
const InnerHTML = require('script-inner-html')

const html = `
  <div id="root"></div>
  <script>
    window.alert('hello from script-inner-html');
  </script>
`

module.exports = () => {
  return (
    <InnerHTML html={html) />
  );
};
```

## license

MIT