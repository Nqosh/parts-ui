import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Part } from '../../models/part.model';

@Injectable({ providedIn: 'root' })
export class PartService {
private apiUrl = 'https://localhost:7222/api/part'; // Adjust if needed

constructor(private http: HttpClient) {}

getAll(): Observable<Part[]> {
return this.http.get<Part[]>(this.apiUrl + "/" + "GetParts").pipe(catchError(this.handleError));
}

get(partNumber: string): Observable<Part> {
return this.http.get<Part>(`${this.apiUrl + "/" + "GetPart" + "?Id="}${partNumber}`).pipe(catchError(this.handleError));
}

create(part: Part): Observable<Part> {
return this.http.post<Part>(this.apiUrl + "/" + "CreatePart" , part).pipe(catchError(this.handleError));
}

update(part: Part): Observable<void> {
return this.http.put<void>(`${this.apiUrl + "/" + "UpdatePart" + "?Id="}${part.partNumber}`, part).pipe(catchError(this.handleError));
}

delete(partNumber: string): Observable<void> {
return this.http.delete<void>(`${this.apiUrl + "/" + "DeletePart" + "?partNumber=" }${partNumber}`).pipe(catchError(this.handleError));
}

private handleError(error: HttpErrorResponse) {
console.error('Server Error:', error);
return throwError(() => error);
}
}