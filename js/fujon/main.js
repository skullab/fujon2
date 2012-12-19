/**
 * Copyright (c) 2013 fujon javascript framework @ skullab software
 * http://fujonjs.com
 * http://skullab.com   
 * author : [ivan.maruca[at]gmail.com]
 *   
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE. **/

var fujon = {
  version:'0.6.1',
  revision:'18/12/12',
  signature:'debug',
  packages:{}
}

function fImport(package){
  console.log(fujon.packages);
  if(package in fujon.packages){
    var path = fujon.packages[package] ;
    console.log(path);
  }else console.log('not found');
}

var fPackage = {
  create:function(){
    for(var i = 0 ; i < arguments.length ; i++){
      if(arguments[i]._path == undefined)throw new Error('Package creation : _path is not defined for package : \n'+arguments[i]);
      fujon.packages[arguments[i]] = arguments[i]._path ;
    } 
  }
}

var fLibs = {}


