function FormMenuPrincipal(){
    this.head="<div>";
    this.content='';
    this.footer="</div>";
  }
  
  FormMenuPrincipal.prototype.setContent=function(content){
    this.content=content;
  };
  
  FormMenuPrincipal.prototype.toString=function(){
    return this.head+this.content+this.footer;
  };
  