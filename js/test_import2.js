var test = {
		define:'safe define!',
		create:'safe create!',
		outOfPackage:'this is out of Package !'
} ;
fPackage(test);

test.define = {
	create:'bound create...',
	define:'bound define...',
	v : 'testing',
	v1 : 10,
	subTest : {
		sv : 'other testing',
		sv1 : 20,
		subSubTest : {
			ssv : 'more level',
			ssv1 : 30,
			ssf : function() {
				alert(this.ssv+' '+this.ssv1);
			}
		}
	}
};

test.create();

function ext(){
	alert('go go foo !');
}
//alternative way !
fPackage(foo = {
	define : {
		go : ext
	}
}).create();


(function(){
	var _Class = function(){alert('ok');};
	
	fujon.define = {
			core:{
				Class:_Class
			}
	};
	fPackage(fujon).create();
})();
console.log('fujon.core.alternative',fujon.core.alternative);




