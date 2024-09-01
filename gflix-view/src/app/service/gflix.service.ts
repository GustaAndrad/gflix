import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { firstValueFrom } from "rxjs";

@Injectable()
export class GflixService {


  private readonly API = `${environment.wsUrl}/api/`;

  constructor(private http: HttpClient) { }

  public getMovies(page: number, uid: string | null): Promise<any> {
    return firstValueFrom(this.http.get(this.API + "movies?page=" + page + "&userId=" + uid));
  }

  public getTVShows(page: number, uid: string | null): Promise<any> {
    return firstValueFrom(this.http.get(this.API + "tvshows?page=" + page + "&userId=" + uid));
  }

  public getMovieById(movideId: number, uid: string | null): Promise<any> {
    return firstValueFrom(this.http.get(this.API + "movieById/" + movideId + "?userId=" + uid));
  }

  public getTvById(movideId: number, uid: string | null): Promise<any> {
    return firstValueFrom(this.http.get(this.API + "tvById/" + movideId + "?userId=" + uid));
  }

  getMovieBySearch(searchQuery: string, page: number, userId: any): Promise<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('userId', userId);
    return firstValueFrom(this.http.post(this.API + "movieBySearch", searchQuery, { params }));
  }
}
