import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import { CreateListDto } from '@models/list.model';

@Injectable({
  providedIn: 'root',
})
export class ListsService {
  apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  createList(list: CreateListDto) {
    return this.http.post(`${this.apiUrl}/api/v1/lists`, list, {
      context: checkToken(),
    });
  }
}
