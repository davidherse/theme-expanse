'use strict';

var express       = require('express')
var app           = express();
var compression   = require('compression');
var morgan        = require('morgan');
var expressLiquid = require('express-liquid');
var Liquid        = require("liquid-node");

var fs            = require('fs');
Liquid.If = require("./liquid-tags/if")
var engine        = new Liquid.Engine;
var staticPath    = __dirname + '/assets/';
var port          = Number(5000);
var pkg           = require('./package.json');

var author = {
  name: 'David Herse',
  avatar: 'http://www.gravatar.com/avatar/2939af6352ae78b160d8ec4a9c7245fb?s=256&d=mm&r=g'
}
var post = {
  title: 'About',
  content: '<p>UX designer. Front-end developer. Lead ui/ux at everydayhero.com. User driven. Data driven. Better UX within the Agile methodology.</p><p><a href="#">Linked In</a></p>',
  created_at: '20th Dec 2014',
  author: author,
  tags: ['foo', 'bar'],
  type: 'post'
}

var site = {
  name: 'David Herse',
  bio: 'The control experiement',
  description: 'The control experiement'
}

var templateMocks = {
  is_login: false,
  is_tag: false,
  is_home: false,
  dev: true,
  post: post,
  posts: [post, post],
  tag: "",
  site: site,
  header_meta: '',
  pages: [{
    title: 'About',
    permalink: '/'
  }],
  pagination: {
    prev: false,
    next: false
  }
}

app.use(morgan('tiny'));
app.use(compression());

engine.registerFilters({
  striptags: function(input) {
    return input;
  },
  format_tag: function(input) {
    return input;
  },
  format_date: function(input) {
    return input;
  }
});

function renderTemplate(name) {
  return function (_, res) {
    fs.readFile(name, 'utf8', function(err, data) {
       engine
      .parseAndRender(data, templateMocks)
      .nodeify(function(err, result) {
        if (err) {
          res.end("ERROR: " + err);
        } else {
          res.end(result);
        }
      });
    });
  };
}

app.use(express.static(staticPath));
app.get('/', renderTemplate('theme.html'));

app.listen(port, console.log.bind(this, 'Port: ' + port));
