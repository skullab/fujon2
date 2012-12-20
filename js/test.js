//fImport('test.subTest.subSubTest');
//fImport('foo');

function handler(){
  console.log('handler',fujon.error);
}
fLibs.setRoot('js');
fujon.require('fujon.error.IllegalTypeAssignment','fujon.error.IllegalInterfaceMethod');
console.log(fujon.error);


