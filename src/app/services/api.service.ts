import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Post } from '../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url: string = "http://localhost:43434";

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  private toFormDataFormGroup(model: FormGroup): FormData {
    const formData = new FormData();

    const formValues = model.getRawValue();

    Object.keys(formValues).forEach((key) => {
      if(key === 'files') {
        if(model.get(key)?.getRawValue() !== "") {
          model.get(key)?.getRawValue().map((file: { path: string; }) => file.path);
          formData.append(key, JSON.stringify(model.get(key)?.getRawValue()));
        }
      } else {
        formData.append(key, model.get(key)?.getRawValue());
      }
      
    });

    return formData;
  }

  private toFormData(data: any) {

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    })

    return formData;
  }

  savePost(model: FormGroup) {
    console.log(this.toFormDataFormGroup(model));

    this.http.put<FormData>(`${this.url}/addpost`, this.toFormDataFormGroup(model)).subscribe();
  }

  loadPosts(year: number, month: number) {
    let result;
    return this.http.get<any>(`${this.url}/post/${year}/${month}`);
  }

  showFiles(date: string, name: string) {
    return this.http.post<any>(`${this.url}/showpost`, this.toFormData({date: date, name: name}));
  }

  delFiles(date: string, name: string) {
    return this.http.post<any>(`${this.url}/delpost`, this.toFormData({date: date, name: name}));
  }
}
