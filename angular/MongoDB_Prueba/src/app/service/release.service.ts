// services/release.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReleaseService {
  private apiUrl = 'http://localhost:3000/api/releases';

  constructor(private http: HttpClient) {}

  getReleases(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addRelease(release: any): Observable<any> {
    return this.http.post(this.apiUrl, release);
  }
}