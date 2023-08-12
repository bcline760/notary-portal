import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entity } from '../contract/entity.contract';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntityService<T> {
  protected controller: string = '';
  constructor(protected client: HttpClient) { }

  public getAll(): Observable<T[]> {
    const url: string = `${environment.apiUrl}/${this.controller}`;

    const entities$: Observable<T[]> = this.client.get<T[]>(url);

    return entities$;
  }

  public get(slug: string): Observable<T> {
    const url: string = `${environment.apiUrl}/${this.controller}/${slug}`;

    const entity$: Observable<T> = this.client.get<T>(url);

    return entity$;
  }

  public save(entity: Entity): Observable<Object> {
    if (entity == null) {
      throw Error('Please supply an entity to save');
    }

    let result$: Observable<Object>;
    if (entity.slug !== '') {
      const url: string = `${environment.apiUrl}/${this.controller}/${entity.slug}`;
      result$ = this.client.put(url, entity);
    } else {
      const url: string = `${environment.apiUrl}/${this.controller}`;
      result$ = this.client.post(url, entity);
    }

    return result$;
  }
}
