if(!fujon.error)fujon.error = {} ;

fujon.error.IllegalTypeAssignment = function (){
  this.name = 'IllegalTypeAssignment' ;
  this.message = 'The assignment you are trying to do is invalid' ;
}

fujon.error.IllegalTypeAssignment.prototype = new Error() ;
fujon.error.IllegalTypeAssignment.prototype.constructor = fujon.error.IllegalTypeAssignment ;

