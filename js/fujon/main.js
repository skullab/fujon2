/*******************************************************************************
 * Copyright (c) 2013 fujon javascript framework @ skullab software
 * http://fujonjs.com http://skullab.com author : [ivan.maruca[at]gmail.com]
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED
 * "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
 * LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 ******************************************************************************/

/*
 * Global scope -> aliasing 
 * change this to refer to another scope 
 * example: 
 * var ____scope = MyCloseScope = {} ;
 */
var ____scope = FUJON = this;

(function(context) {

	this.Context = context;

	Context.fujon = {
		version : '0.6.1',
		revision : '18/12/12',
		signature : 'debug',
		packages : {}
	};

	Context.fImport = function(context) {
		_import.call(context);
	};

	Context.fPackage = function(context) {
		return _package.call(context);
	};
	
	Context.fScope = _scope ;

	function _package() {
		if (this == Context)
			return;
		var oldCreate , oldDefine ;
		if(this.create)oldCreate = this.create;
		if(this.define)oldDefine = this.define ;
		
		this.define = this.define ? this.define : {} ;
		
		console.log('define',this.define);
		
		this.create = function() {
			
			console.log('define',this.define);
			
			console.log('create package...');
			
			var path = '' ;
			
			for ( var module in Context) {
				if (Context[module] == this) {
					path = module;
					console.log('find path :', module);
				}
			}
			
			function extract(module) {
				for ( var value in module) {
					console.log(path,value);
					fujon.packages[value] = {path:path} ;
					
					if (typeof module[value] == 'object') {
						path += '.'+value ;
						extract(module[value]);
					}
				}
			}

			extract(this.define);
			
			for(var v in this.define){
				if(v == 'define'){
					v = '_define' ;
				}
				this[v] = this.define[v];
			}
			
			delete this.create;
			delete this.define;
			if(oldDefine)this.define = oldDefine ;
			if (oldCreate)this.create = oldCreate;
		};

		return this;
	}

	function _import() {
		if (this == Context)return;
		var script = document.createElement('script');
		script.type = 'text/javascript';
		for(var value in fujon.packages){
			if(this == fujon.packages[value].path){
				var path = fujon.packages[value].path ;
				script.text += 'var '+value+' = '+path+'.'+value+' ;\n';
			}
		}
		if(script.text){
			document.getElementsByTagName('head')[0].appendChild(script);
			console.log(script);
		}
	}
	
	function _scope(path){
		var p = path.split('.');
		var last = p.length-1 ;
		var v = 'var '+p[last]+' = '+path+' ;\n';
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.text = v ;
		document.getElementsByTagName('head')[0].appendChild(script);
	}

})(____scope);
