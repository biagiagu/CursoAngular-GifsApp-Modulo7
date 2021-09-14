import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
	providedIn: 'root'
})

export class GifsService {

	private gifsApiKey: string = 'vQT46CKTXInn2jQrj3RvOjo2NsP0YakU';
	private _historial: string[] = [];
	public resultdos: Gif[] = [];


	get historial() {
		return [...this._historial]
	}

	constructor(private http: HttpClient) {

		this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
		this.resultdos = JSON.parse(localStorage.getItem('resultados')!) || [];

	}

	buscarGifs(query: string = '') {

		//Limitamos el historial a 10
		if (this._historial.length > 10) {
			this._historial.pop();
		}

		query = query.trim().toLowerCase();

		if (query.length !== 0) {
			if (!this._historial.includes(query)) {
				this._historial.unshift(query);
				this._historial = this._historial.slice(0, 9)

				localStorage.setItem('historial', JSON.stringify(this._historial));
			}
		}

		this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this.gifsApiKey}&q=${query}&limit=10`)
			.subscribe((resp) => {
				console.log(resp.data);
				this.resultdos = resp.data;
				localStorage.setItem('resultados', JSON.stringify(this.resultdos));
			});
		

	}
}
