require('should');
const sinon = require('sinon');
require('should-sinon');

const fastPass = require('../fast-pass');
const { Injector } = require('../fast-pass');

describe("fast-pass", () => {
  it( "Exists", () => should(fastPass).be.an.Object() );
  it( "Contains as Injector funciton", () => should(fastPass.Injector).be.a.Function() )
  describe( "Injector", () => {
    it( "Can be constructed", () => {
      var injector = new Injector({});
      should(injector).be.an.Object();
    } )
    it( "Contains an .invoke() function", () => {
      var injector = new Injector({});
      should(injector.invoke).be.a.Function();
    } )
    describe(".invoke()", () => {
      it("Invokes inner functions", () => {
        var { invoke } = new Injector({});
        var callback = sinon.spy();
        invoke(callback);
        callback.should.be.calledOnce();
      })
      it("Passes dependencies to inner function", () => {
        var dependency = {x:1};
        var callback = sinon.spy();
        var { invoke } = new Injector(dependency);
        invoke(callback);
        callback.should.be.calledWith(dependency);
      })
      it("Can pass 3 dependencies (and probably more)", () => {
        var a={x:1}, b={x:2}, c={x:3};
        var callback = sinon.spy();
        var { invoke } = new Injector(a,b,c);
        invoke(callback);
        callback.should.be.calledWith(a,b,c);
      })
    })
  } )
})
