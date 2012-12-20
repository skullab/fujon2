if(!fujon.error)fujon.error = {} ;

fujon.error.IllegalInterfaceMethod = function (){
  this.name = 'IllegalInterfaceMethod' ;
  this.message = 'You must override all and only methods of Interface' ;
}

fujon.error.IllegalInterfaceMethod.prototype = new Error() ;
fujon.error.IllegalInterfaceMethod.prototype.constructor = fujon.error.IllegalInterfaceMethod ;
