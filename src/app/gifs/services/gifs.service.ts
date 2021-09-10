import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GifsService {

   private _historial: string[]=[];

   get historial(){
	   return [...this._historial]
   }
   

   buscarGifs( query:string ='' ){

    //Limitamos el historial a 10
		if (this._historial.length>10){
      this._historial.pop();
    }
    query=query.trim().toLowerCase();

    //Verificamos que no se guarden items repetidos ni valores en cero antes de agregar el item al historial
    // if (this._historial.find(e => e === query)){
    //   console.log("Este elemento ya fue añadido");
    // }else if (query.trim().length === 0) {
    //   console.log("No hay ningun dato para guardar");
    // }else{
    //   this._historial.unshift(query);
    // }

    if (query.length !== 0){
      if (!this._historial.includes(query)) {
        this._historial.unshift(query);
        this._historial=this._historial.slice(0,9)
      }
    }

		console.log(this._historial);

   }
}
