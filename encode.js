var extend = require('object/extend')
var enc = encodeURIComponent
var spaces = /%20/g

module.exports = encode

function encode (o) {
  var output = 'magnet:?'

  // Add convenience aliases
  o = extend(o)
  if (o.infoHash) o.xt = 'urn:btih:' + o.infoHash
  if (o.name) o.dn = o.name
  if (o.keywords) o.kt = o.keywords
  if (o.announce) o.tr = o.announce
  if (o.urlList) {
    o.ws = o.urlList
    delete o.as
  }

  Object.keys(o)
    .filter(function (k) {
      return k.length === 2
    })
    .forEach(function (k, i) {
      (Array.isArray(o[k]) ? o[k] : [o[k]]).forEach(function (v, j) {
        if ((i > 0 || j > 0) && (k !== 'kt' || !j)) output += '&'
        output += k === 'kt' && j > 0 ? '+' : (k + '=')
        output += k === 'xt' ? v : enc(v)
      })
    })

  return output.replace(spaces, '+')
}
