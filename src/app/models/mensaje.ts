
 export class Mensaje {
  fecha:string;
  usuario:string;
  texto:string;
  emisor:string;


  public constructor() {
      this.fecha = new Date().toLocaleString();
      this.texto ="";
      this.usuario="no seteado";

  }



}
