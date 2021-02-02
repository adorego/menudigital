
import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {Category} from '../models/category.model';
import {ConfigurationService} from '../configuration/configuration-services';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CategoriesStateService{
    
    private _categorias: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>(null);

    public readonly  categorias$:Observable<Category[]> = this._categorias.asObservable();

    constructor(){
        
    }

    public addCategoria(newCategoria: Category): void{
        let categorias:Category[] = this._categorias.getValue();
        categorias.forEach(categoria =>{
            if(categoria.puesto >= newCategoria.puesto){
                categoria.puesto++;
            }
        })
        categorias.push(newCategoria);
        categorias.sort(this.compare);
        this._categorias.next(categorias);
    }

    public setCategories(categorias:Category[]){
        categorias.sort(this.compare);
        this._categorias.next(categorias);
    }
    
    public deleteCategoria(deletedCategory: Category):void{
        let categorias:Category[] = this._categorias.getValue();
        categorias.forEach(categoria =>{
            if(categoria.puesto > deletedCategory.puesto){
                categoria.puesto--;
            }
        })
        const newCategories = this._categorias.getValue().filter(value => value._id!==deletedCategory._id);
        categorias.sort(this.compare);
        this._categorias.next(newCategories);
    }

    private compare(a:Category,b:Category){
        if(a.puesto < b.puesto){
            return -1;
        }
        if(a.puesto > b.puesto){
            return 1;
        }
        return 0;
    }
}