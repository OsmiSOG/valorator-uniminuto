class LocalidadDetector{
  constructor () {

  }
  
  /**
   * Este método permite establecer si una coordenada se encuentra dentro de una localidad dada
   * @param {*} loc hace referencia a un objeto Localidad
   */
  establecerLocalidad(lat, lng, loc) {
    //alert(loc.name+" "+lat+" "+lng);
    var resp=false;
    var c1=0;
    var c2=0;
    var c3=0;
    var c4=0;
   
    //Verificación por localidad
    var i=0;
    for(i=0; i<loc.coords.length; i++){
      //Cuadrante I----------------------
      //Latitud
      if(lat<=loc.coords[i][0]){
        //Longitud
        if(lng<=loc.coords[i][1]){
          c1++;
        }
      }
      //Cuadrante II
      //Latitud
      if(lat<=loc.coords[i][0]){
        //Longitud
        if(lng>=loc.coords[i][1]){
          c2++;
        }
      }
      //Cuadrante III
      //Latitud
      if(lat>=loc.coords[i][0]){
        //Longitud
        if(lng>=loc.coords[i][1]){
          c3++;
        }
      }
      //Cuadrante IV
      //Latitud
      if(lat>=loc.coords[i][0]){
        //Longitud
        if(lng<=loc.coords[i][1]){
          c4++;
        }
      }
      //---------------------------------
    }
   
    if(c1>0 && c2>0 && c3>0 && c4>0){
        resp=true;
    }
    
    return resp;
  }

  
}