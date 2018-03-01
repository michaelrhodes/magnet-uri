var Benchmark = require('benchmark')
var mold = require('magnet-uri')
var mnew = require('./')

if (typeof window !== 'undefined')
  window.Benchmark = Benchmark

var obj = {
  xt: [
    'urn:ed2k:354B15E68FB8F36D7CD88FF94116CDC1',
    'urn:tree:tiger:7N5OAMRNGMSSEUE3ORHOKWN4WWIQ5X4EBOOTLJY',
    'urn:btih:QHQXPYWMACKDWKP47RRVIV7VOURXFE5Q'
  ],
  xl: '10826029',
  dn: 'mediawiki-1.15.1.tar.gz',
  tr: ['udp://tracker.example4.com:80/announce'],
  as: 'http://download.wikimedia.org/mediawiki/1.15/mediawiki-1.15.1.tar.gz',
  xs: [
    'http://cache.example.org/XRX2PEFXOOEJFRVUCX6HMZMKS5TWG4K5',
    'dchub://example.org'
  ]
}

var uri = 'magnet:?xt=urn:ed2k:354B15E68FB8F36D7CD88FF94116CDC1&xt=urn:tree:tiger:7N5OAMRNGMSSEUE3ORHOKWN4WWIQ5X4EBOOTLJY&xt=urn:btih:QHQXPYWMACKDWKP47RRVIV7VOURXFE5Q&xl=10826029&dn=mediawiki-1.15.1.tar.gz&tr=udp%3A%2F%2Ftracker.example4.com%3A80%2Fannounce&as=http%3A%2F%2Fdownload.wikimedia.org%2Fmediawiki%2F1.15%2Fmediawiki-1.15.1.tar.gz&xs=http%3A%2F%2Fcache.example.org%2FXRX2PEFXOOEJFRVUCX6HMZMKS5TWG4K5&xs=dchub%3A%2F%2Fexample.org'

Benchmark.Suite()
  .add('encode (old)', function () {
    mold.encode(obj)
  })
  .add('encode (new)', function () {
    mnew.encode(obj)
  })
  .add('decode (old)', function () {
    mold.decode(uri)
  })
  .add('decode (new)', function () {
    mnew.decode(uri)
  })
  .on('error', error)
  .on('cycle', cycle)
  .run()

function error (e) {
  console.error(e.target.error.stack)
}

function cycle (e) {
  console.log(String(e.target))
}
