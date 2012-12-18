var log = function(){
  if(log.enable)
    console.log.apply(console,arguments);  
}
log.enable = true;
/***************************************************/
var fujon = {
  packages:{}
}
function fImport(package,root){
    
    var root = root || fujon.packages ;
    
    log('try to import',package,typeof package);
    if(package === undefined){
      log('Package does not exist !');
      return ;
    }
    
    for(var p in root){
      if(package == root[p]){
        log('find package');
        break;
      }
      if(root[p] instanceof Object){
        log(root[p]);
      }
    }
    
    function load(p,pp){
      console.log('loading...',p,pp);
    }
    
}

var fPackage = {
  create:function(package){
    log('create package',package);
    fujon.packages[package] = package ;
    fujon.packages[package]._ = package;
  }
}
