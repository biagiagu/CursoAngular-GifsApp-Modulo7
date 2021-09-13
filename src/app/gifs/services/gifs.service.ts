import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class GifsService {

  private gifsApiKey:string='vQT46CKTXInn2jQrj3RvOjo2NsP0YakU';

  private _historial: string[]=[];

  public resultdos:any[]=[];


   get historial(){
	   return [...this._historial]
   }
   
   constructor( private http: HttpClient){

   }

   buscarGifs( query:string ='' ){

    //Limitamos el historial a 10
		if (this._historial.length>10){
      this._historial.pop();
    }
    
    query=query.trim().toLowerCase();

    if (query.length !== 0){
      if (!this._historial.includes(query)) {
        this._historial.unshift(query);
        this._historial=this._historial.slice(0,9)
      }
    }

    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=vQT46CKTXInn2jQrj3RvOjo2NsP0YakU&q=${ query }&limit=10`)
		.subscribe((resp:any)=>{
			console.log(resp.data);
      this.resultdos=resp.data; 
		});
		//console.log(this._historial);

   }
}
