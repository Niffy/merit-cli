const chalk = require('chalk')
const err = chalk.red,
      normal = chalk.yellow


function convert(...args) {
  let t = args.map((item) => {
    if (typeof item === 'object') {
      return JSON.stringify(item)
    } else {
      return item
    }
  })
  return t
}
module.exports.error = (...args) => {
  let t = convert(...args)
  console.error(err(...t))
}

module.exports.info = (...args) => {
  let t = convert(...args)
  console.log(normal(t))
}