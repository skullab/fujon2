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

if(typeof ____scope === 'undefined'){
  var ____scope = this ;
}

(function(context) {

	var Context = context;

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
  Context.fLibs = new _require ;
  Context.fujon.require = Context.fLibs.load ;
  
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
  
  function _require(){
    
    var head = document.getElementsByTagName('head')[0] ;
    var currentStack = 0 , maxStack ;
    var files = [] ; 
    var _this = this ;
    
    function getFiles(){
      var f = arguments[0] , files = [] ;
      for(var i = 0 ; i < f.length ; i++){
        var file = f[i].replace(/\./g,'/');
        file = file + '.js' ;
        files.push(file);
      }
      return files ;
    }
    
    function error404(){}
    
    function  fireHandler(){
      console.log('loaded !');
      if(currentStack == maxStack){
        if(_this.handler)_this.handler();
      }else{
        append(files[currentStack]);
      }
    }
    
    function loadSync(file){
      currentStack++ ;
      var xml = new XMLHttpRequest();
      var root = _this.root || '' ;
      xml.open('GET',root + '/' + file,false);
      xml.send('');
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.text = xml.response ;
      head.appendChild(script);
      if(currentStack < maxStack)loadSync(files[currentStack]);
    }
    
    function append(file){
      console.log(file);
      currentStack++ ;
      var root = _this.root || '' ;
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = root + '/' + file ;
      
        if (window.addEventListener) {
			    script.addEventListener('load',fireHandler,false);
          script.addEventListener('error',error404,false);
		    } else if (window.attachEvent) {
			    script.attachEvent('onload',fireHandler);
          script.attachEvent('onerror',error404);
		    }
        
      head.appendChild(script);
    }
    
    function load(){
      var args = Array.prototype.slice.call(arguments) , last = args.length - 1;
      var lastArg = args[last] ;
      if(typeof lastArg === 'function'){
        _this.handler = lastArg ;
        args.pop();  
      }
      files = getFiles(args);
      maxStack = files.length ;
      if(_this.handler){
        append(files[0]);
      }else loadSync(files[0]);
    }
    
    this.setRoot = function(root){
       this.root = root ;
    }
    
    this.load = load ;
    
  }
    
})(____scope);
