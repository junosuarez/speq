var Q = require('q')
var chai = require('chai')
chai.should()

var speq = require('../index')

var path = speq.path(__dirname)


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


  // it('supports multiple test cases',
  //   [[true,  true,  true],
  //    [true,  false, false],
  //    [false, true,  false],
  //    [false, false, false]],
  //   function () {
  //     //this function will be called 4 times,
  //     //with `this` being a value of an element of the array.

  //     chai.expect(this[0] && this[1]).to.equal(this[2])

  //   })

})