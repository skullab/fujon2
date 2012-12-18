var foo = {
  myFoo:function(){},
  other:{
    subOther:function(){}
  }
}
fPackage.create(foo);
fImport(foo.other.subOther);
