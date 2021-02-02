import {Injectable} from '@angular/core';
import {Subject, BehaviorSubject, Observable} from 'rxjs';
import {Local} from '../models/local-model';

@Injectable()
export class LocalStateService{
   private currentLocal:Local=null;

   public setCurrentLocal(newLocal:Local){
       this.currentLocal = newLocal;
   }
    
   public getCurrentLocal(){
       return this.currentLocal;
   }
}