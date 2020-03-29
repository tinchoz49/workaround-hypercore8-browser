require('budo').cli(process.argv.slice(2), {
  // additional overrides for our custom tool
  pushstate: true,
  browserify: {
    transform: [
      ['babelify', {
        global: true,
        only: [/(\.\/index.js|node_modules\/noise-protocol|node_modules\/simple-hypercore-protocol|node_modules\/hmac-blake2b)/]
      }]
    ]
  }
})
