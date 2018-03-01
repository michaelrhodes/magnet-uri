var base32 = require('base32')
var u8a = require('u8a/from-string')
var hex = require('u8a/to-hex')
var dec = decodeURIComponent

module.exports = decode

function decode (uri) {
  var output = {}

  // Support 'magnet:' and 'stream-magnet:' uris
  var data = uri.split('magnet:?')[1]
  var params = data && data.length ? data.split('&') : []

  params.forEach(function (param) {
    var kv = param.split('=')

    // This kv is invid, skip it
    if (kv.length !== 2) return

    var k = kv[0]
    var v = kv[1]

    // Clean up torrent name
    if (k === 'dn') v = dec(v).replace(/\+/g, ' ')

    // Address tracker (tr), exact source (xs), and acceptable
    // source (as) are encoded URIs, so decode them
    if (k === 'tr' || k === 'xs' || k === 'as' || k === 'ws') v = dec(v)

    // Return keywords as an array
    if (k === 'kt') v = dec(v).split('+')

    // Cast file index (ix) to a number
    if (k === 'ix') v = Number(v)

    // If there are repeated parameters, return an array of vues
    if (!output[k]) return output[k] = v
    if (Array.isArray(output[k])) output[k].push(v)
    else output[k] = [output[k], v]
  })

  // Convenience properties for parity with `parse-torrent-file` module
  if (output.xt) {
    var m, xts = Array.isArray(output.xt) ? output.xt : [output.xt]
    xts.forEach(function (xt) {
      if ((m = xt.match(/^urn:btih:(.{40})/))) {
        output.infoHash = m[1].toLowerCase()
      }
      else if ((m = xt.match(/^urn:btih:(.{32})/))) {
        output.infoHash = hex(base32.decode(u8a(m[1])))
      }
    })
  }

  if (output.dn) output.name = output.dn
  if (output.kt) output.keywords = output.kt

  if (typeof output.tr === 'string') output.announce = [output.tr]
  else if (Array.isArray(output.tr)) output.announce = output.tr
  else output.announce = []

  output.urlList = []
  if (typeof output.as === 'string' || Array.isArray(output.as)) {
    output.urlList = output.urlList.concat(output.as)
  }
  if (typeof output.ws === 'string' || Array.isArray(output.ws)) {
    output.urlList = output.urlList.concat(output.ws)
  }

  uniq(output.announce)
  uniq(output.urlList)
  return output
}

function uniq (arr) {
  var i = -1, l = arr.length, j
  while (i++ < l)
    for (j = i + 1; j < arr.length; ++j)
      if (arr[i] === arr[j])
        arr.splice(j--, 1)
  return arr
}
