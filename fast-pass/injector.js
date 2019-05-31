module.exports = class Injector{
  constructor(...dependencies){
    this.dependencies = dependencies;
    this.invoke = this.invoke.bind(this);
  }
  invoke(innerFunction){
    innerFunction(...this.dependencies);
  }
}
