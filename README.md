# speq
a promise-happy test DSL

## stability: experimental
should not be used yet, but comments and feedback welcome!

## example

    var speq = require('speq')
    var Q = require('q')
    var chai = require('chai')

    speq('is a test DSL', function (it) {

      it('lets you do all kinds of crazy things', function (it) {

        it('can nest tests arbitrarily')

      })

      it('this test will fail', function () {
        throw new Error('OH NOES!')
      })

      it('lets you use whatever assertion library you want', function () {
        chai.expect('foo')
      })

      it('supports async tests - just return a promise', function (it) {

        it('this test should fail async', function () {
          return Q.reject(new Error('set sail for fail'))
        })

        it('this test should pass async', function () {
          return Q.resolve()
        })
      })

    })

## license

MIT. (c) 2013 jden <jason@denizac.org>. See LICENSE.md