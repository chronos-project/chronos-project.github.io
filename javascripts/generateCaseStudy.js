const marked = require('marked');
const fs = require('fs');

const md = fs.readFileSync('../markdown/casestudyraw.md', 'utf-8');
const markdown = marked(md);

fs.writeFileSync('../markdown/cstudy.html', markdown);
