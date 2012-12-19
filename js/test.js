var test = {
  _path:'test',
  
  v:'testing',
  v1:10,
  subTest:{
    _path:'test.subTest',
    
    sv:'sub testing',
    sv1:20
  }
}

var foo ;
fPackage.create(test,test.subTest);
fImport(test.subTest);
