var parse5 = require('parse5');
var flatten = require('lodash.flatten');
var React = require('react');
var uuid = require('uuid').v4;
var fbemitter = require('fbemitter');
var createReactClass = require('create-react-class');

const isBrowser = !!(document && window);

var totalNumber = 0;
var loadNumber = 0;
var toLoadSrc = [];
var emitter = new fbemitter.EventEmitter();

emitter.addListener('loaded', function () {
  loadNumber++;
  onLoaded();
});

var onLoaded = function (src) {
  src && toLoadSrc.push(src);
  if (loadNumber >= totalNumber) {
    toLoadSrc.map(function (s) {
      loadText(s);
    })
    toLoadSrc = [];
  }
}

var loadSrc = function (src) {
  totalNumber++;
  const script = document.createElement("script");
  script.src = src;
  script.onload = function () {
    emitter.emit('loaded');
  }
  script.async = false;
  document.body.appendChild(script);
}

var loadText = function (src) {
  const script = document.createElement("script");
  script.innerHTML = src;
  script.async = false;
  document.body.appendChild(script);
}


var findScripts = function (node) {
  if (node.tagName && node.tagName === 'script') {
    if (node.childNodes && node.childNodes.length > 0) {
      return (node.childNodes || []).map(function (n) {
        return n.value
      });
    } else {
      var srcs = (node.attrs || []).map(function (n) {
        if (n['name'] == 'src') {
          return n.value;
        }
      });

      var fns = (srcs || []).map(function (n) {
        n && loadSrc(n);
      })
    }
  }

  return flatten((node.childNodes || []).map(findScripts));
};

var run = function () {
  const scripts = ((this.state || {}).scripts || []);
  var fns = scripts.map(function (src) {
    src && onLoaded(src);
  })
};

module.exports = createReactClass({
  clean: function () {
    if (!this.state.id || !isBrowser) {
      return;
    }

    const node = document.getElementById(this.state.id);

    if (!node) {
      return;
    }

    while (node.hasChildNodes()) {
      node.removeChild(node.lastChild);
    }
  },
  parse: function (props) {
    const html = (props || {}).html;

    if (!html || typeof html !== 'string') {
      return;
    }
    return findScripts(parse5.parseFragment(html));
  },
  initialState: function (props) {
    return {
      id: (this.state || {}).id || uuid(),
      scripts: this.parse(props)
    };
  },
  getInitialState: function () {
    return this.initialState(this.props);
  },
  shouldComponentUpdate: function (nextProps) {
    return this.props.html !== nextProps.html;
  },
  componentWillReceiveProps: function (nextProps) {
    if (this.props.html === nextProps.html) {
      return;
    }

    this.clean();
    this.setState(this.initialState(nextProps));
  },
  componentDidMount: run,
  componentDidUpdate: run,
  render: function () {
    if (typeof this.props.html !== 'string') {
      return null;
    }

    return React.createElement('div', {
      id: this.state.id,
      dangerouslySetInnerHTML: {
        __html: this.props.html
      }
    });
  }
});
