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
      var injector = new Injector();
      should(injector).be.an.Object();
    } )
    it( "Contains an .invoke() function", () => {
      var injector = new Injector();
      should(injector.invoke).be.a.Function();
    } )
    it( "Contains a .branch() function", () => {
      var injector = new Injector();
      should(injector.branch).be.a.Function();
    } )
    describe(".invoke()", () => {
      it("Invokes inner functions", () => {
        var { invoke } = new Injector();
        var callback = sinon.spy();
        invoke(callback);
        callback.should.be.calledOnce();
      })
      it("Passes injector (self) as first param", () => {
        var injector = new Injector();
        var callback = sinon.spy();
        injector.invoke(callback);
        callback.should.be.calledWith(injector);
      })
      it("Passes dependencies to inner function", () => {
        var dependency = {x:1};
        var callback = sinon.spy();
        var injector = new Injector(dependency);
        var { invoke } = injector;
        invoke(callback);
        callback.should.be.calledWith(injector, dependency);
      })
      it("Can pass 3 dependencies (and probably more)", () => {
        var a={x:1}, b={x:2}, c={x:3};
        var callback = sinon.spy();
        var injector = new Injector(a,b,c);
        var { invoke } = injector;
        invoke(callback);
        callback.should.be.calledWith(injector,a,b,c);
      })
    })
    describe(".branch()", () => {
      it("Returns a new Inject", () => {
        var injector = new Injector();
        injector.branch();
        injector.should.be.an.instanceOf(Injector);
      })
      it("Branched injector should contains both original and extra dependencies", () => {
        var a = {x:1}, b = {x:2};
        var injector = new Injector(a);
        var branchedInjector = injector.branch(b);
        branchedInjector.dependencies.should.deepEqual([a,b]);
      })
      it("Supports 3 extra dependencies (and probably more)", () => {
        var a={x:1}, b={x:2}, c={x:3};
        var injector = new Injector();
        var branchedInjector = injector.branch(a,b,c);
        branchedInjector.dependencies.should.deepEqual([a,b,c]);
      })
    })
  } )
})
