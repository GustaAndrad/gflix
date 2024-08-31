import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable()
export class ListService {

  private readonly API = `${environment.wsUrl}/gflix/`;

  constructor(private http: HttpClient) { }

  public setItemList(midia: any): Promise<any> {
    return this.http.post(this.API + "setItemList", midia).toPromise();
  }

  public deleteItemList(midia: any): Promise<any> {
    const options = {
      body: midia,
    };
    return this.http.delete(this.API + "deleteItemList", options).toPromise();
  }
}
