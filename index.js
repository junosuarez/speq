var Q = require('q')

var tests = []

var speq = module.exports = function speq(label, body) {
  var parent = this
  if (!(parent && 'level' in parent)) {
    parent = null
  }

  var test = {
    parent: parent,
    level: parent ? parent.level + 1 : 0,
    label: label,
    run: body
  }

  execute(test)
  tests.push(test)


  // todo: separate test plan from test execution
  // right now this is all super flawed and proof-of-concepty
  if (!parent) {
    Q.all(tests.map(awaitResult)).then(function (results) {

      results.forEach(function (result) {
        if (result.err) {

          if (result.err === pending) {
            pending(result.level, result.label)
          } else {
            fail(result.level, result.label, result.err)
          }
        } else {
          ok(result.level, result.label)
        }
      })

      console.log('\n\n')
      if (ok.count === tests.length) {
        console.log('All tests pass!')
      }
      console.log(ok.count + '/' + tests.length  + ' pass')
      if (pending.count) {
        console.log(pending.count + ' test' + (pending.count === 1 ? '' : 's') + ' not yet implemented')
      }
    })
  }

}

function awaitResult (test) {
  return Q.promise(function (resolve, reject) {
    if (isThenable(test.err)) {
      test.err.then(function (err) {
        test.err = err
        resolve(test)
      })
    }
    resolve(test)
  })
}

function plan() {

}

function execute(test) {

  if (!test.run) {
    test.err = pending
    return
  }
  try {
    var res = test.run(speq.bind(test))

    if (isThenable(res)) {
      test.err = res.then(function () {
        return null
      }, function (err) {
        return err
      })
    } else {
      test.err = null
    }
  } catch (err) {
    test.err = err
  }

}


function isThenable(thing) {
  return thing && typeof thing === 'object' && typeof thing.then === 'function'
}

function pending(level, label) {
  console.log(spaces(level) + '! ' + label + ' (not yet tested)')
  pending.count++
}
pending.count = 0

function ok(level, label) {
  console.log(spaces(level) + '✓ ' + label)
  ok.count++
}
ok.count = 0

function fail(level, label, err) {
  console.log(spaces(level) + '✗ ' + label +':\n\n' + err + err.stack + '\n\n')
  fail.count++
}
fail.count = 0


function spaces(number) {
  if (!number) return '';
  var s = new Array(number * 3)
  s = s.join(' ')
  return s
}


module.exports.path = function () {

}