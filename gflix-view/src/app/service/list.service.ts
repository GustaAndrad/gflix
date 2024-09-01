import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { firstValueFrom } from "rxjs";

@Injectable()
export class ListService {


  private readonly API = `${environment.wsUrl}/gflix/`;

  constructor(private http: HttpClient) { }

  public setItemList(midia: any): Promise<any> {
    return firstValueFrom(this.http.post(this.API + "setItemList", midia));
  }

  public deleteItemList(midia: any): Promise<any> {
    const options = {
      body: midia,
    };
    return firstValueFrom(this.http.delete(this.API + "deleteItemList", options));
  }

  getFavorites(uid: any, tokenList: string): Promise<any> {
    return firstValueFrom(this.http.get(this.API + "myList?tokenList=" + tokenList + "&userId=" + uid));
  }
}
