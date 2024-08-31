import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable()
export class GflixService {

  private readonly API = `${environment.wsUrl}/api/`;

  constructor(private http: HttpClient) { }

  public getMovies(page: number, uid: string | null): Promise<any> {
    return this.http.get(this.API + "movies?page=" + page.toString() + "&userId=" + uid ).toPromise();
  }

  public getTVShows(page: number, uid: string | null): Promise<any> {
    return this.http.get(this.API + "tvshows?page=" + page.toString() + "&userId=" + uid).toPromise();
  }
}
