# magnet-uri

A reworking of [webtorrent/magnet-uri](https://github.com/webtorrent/magnet-uri) that eschews [feross/buffer](https://github.com/feross/buffer). As a result it’s tiny, and decodes twice as fast in browsers.

[![build status](https://travis-ci.org/michaelrhodes/magnet-uri.svg?branch=master)](https://travis-ci.org/michaelrhodes/magnet-uri)

## install
```sh
pnpm install michaelrhodes/magnet-uri#1.0.0
```

## use
```js
var encode = require('magnet-uri/encode')
var decode = require('magnet-uri/decode')

var encoded = encode({
  xt: [
    'urn:ed2k:354B15E68FB8F36D7CD88FF94116CDC1',
    'urn:tree:tiger:7N5OAMRNGMSSEUE3ORHOKWN4WWIQ5X4EBOOTLJY',
    'urn:btih:QHQXPYWMACKDWKP47RRVIV7VOURXFE5Q'
  ],
  xl: '10826029',
  dn: 'mediawiki-1.15.1.tar.gz',
  tr: ['udp://tracker.openbittorrent.com:80/announce'],
  as: 'http://download.wikimedia.org/mediawiki/1.15/mediawiki-1.15.1.tar.gz',
  xs: [
    'http://cache.example.org/XRX2PEFXOOEJFRVUCX6HMZMKS5TWG4K5',
    'dchub://example.org'
  ]
})

console.log(encoded)
> "magnet:?xt=urn:ed2k:354B15E68FB8F36D7CD88FF94116CDC1&xt=urn:tree:tiger:7N5OAMRNGMSSEUE3ORHOKWN4WWIQ5X4EBOOTLJY&xt=urn:btih:QHQXPYWMACKDWKP47RRVIV7VOURXFE5Q&xl=10826029&dn=mediawiki-1.15.1.tar.gz&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&as=http%3A%2F%2Fdownload.wikimedia.org%2Fmediawiki%2F1.15%2Fmediawiki-1.15.1.tar.gz&xs=http%3A%2F%2Fcache.example.org%2FXRX2PEFXOOEJFRVUCX6HMZMKS5TWG4K5&xs=dchub%3A%2F%2Fexample.org"

var decoded = decode('magnet:?xt=urn:btih:d2474e86c95b19b8bcfdb92bc12c9d44667cfa36&dn=Leaves+of+Grass+by+Walt+Whitman.epub&tr=udp%3A%2F%2Ftracker.example4.com%3A80&tr=udp%3A%2F%2Ftracker.example5.com%3A80&tr=udp%3A%2F%2Ftracker.example3.com%3A6969&tr=udp%3A%2F%2Ftracker.example2.com%3A80&tr=udp%3A%2F%2Ftracker.example1.com%3A1337')

console.log(decoded.dn)
> "Leaves of Grass by Walt Whitman.epub"
console.log(decoded.infoHash)
> "d2474e86c95b19b8bcfdb92bc12c9d44667cfa36"
```

## obey
[MIT](https://opensource.org/licenses/MIT)
