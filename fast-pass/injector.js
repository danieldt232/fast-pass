module.exports = class Injector{
  constructor(...dependencies){
    this.dependencies = dependencies;
    this.invoke = this.invoke.bind(this);
  }
  invoke(innerFunction){
    innerFunction(this, ...this.dependencies);
  }
  branch(...extraDependencies){
    return new Injector(...this.dependencies, ...extraDependencies);
  }
}
