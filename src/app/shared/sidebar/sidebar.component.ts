import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})

export class SidebarComponent  {

	get historial():string[] {
		return this.gifsServices.historial;
	}
	
	buscar(termino:string){
		console.log(termino);
		this.gifsServices.buscarGifs(termino);
	}
	
	

	constructor (private gifsServices:GifsService){}

	

}
