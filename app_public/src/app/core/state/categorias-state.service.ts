import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { CategoriaMenu } from "../models/categoria-menu.model";

@Injectable()
export class CategoriasStateService{
    private _categorias: BehaviorSubject<CategoriaMenu[]> = new BehaviorSubject<CategoriaMenu[]>(null);

    public readonly categorias$:Observable<CategoriaMenu[]> = this._categorias.asObservable();

    constructor(){}

    public setCategorias(categorias:CategoriaMenu[]){
        console.log('CategoriasState:', categorias);
        this._categorias.next(categorias);
        
    }

    public addCategoria(categoria:CategoriaMenu){
        const categorias = this._categorias.getValue();
        categorias.push(categoria);
        this._categorias.next(categorias);
    }

}