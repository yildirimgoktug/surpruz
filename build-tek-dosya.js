// Her şeyi (sesler, fotoğraf, GIF, three.js) tek bir HTML dosyasına gömer.
// Kullanım: node build-tek-dosya.js  →  surpriz-tek-dosya.html
const fs = require('fs');
const mime = { mp4: 'audio/mp4', jpg: 'image/jpeg', gif: 'image/gif' };
let html = fs.readFileSync('index.html', 'utf8');
const three = fs.readFileSync('assets/three.min.js', 'utf8').replace(/<\/script/gi, '<\/script');
html = html.replace('<script src="assets/three.min.js"></script>', () => '<script>' + three + '</script>');
html = html.replace(/assets\/([\w.-]+\.(mp4|jpg|gif))/g, (m, file, ext) =>
  'data:' + mime[ext] + ';base64,' + fs.readFileSync('assets/' + file).toString('base64'));
fs.writeFileSync('surpriz-tek-dosya.html', html);
console.log('surpriz-tek-dosya.html', (html.length / 1048576).toFixed(1) + ' MB', 'kalan assets referansı:', (html.match(/assets\//g) || []).length);
