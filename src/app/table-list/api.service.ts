import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  getAgeDetectionData() {
    return this.http.get<any>('https://capstone-app-backend-ghl2.onrender.com/rest/results');
  }

  getFilteredAgeDetectionData(startDate: string, endDate: string) {
    let params = new HttpParams();
  params = params.append('start_date', startDate);
  params = params.append('end_date', endDate);

  const options = { params: params };
    return this.http.get<any>('https://capstone-app-backend-ghl2.onrender.com/rest/results',options);
  }

  getFilteredAgeDetectionDataByStore(startDate: string, endDate: string, storeId: any) {
    let params = new HttpParams();
  params = params.append('start_date', startDate);
  params = params.append('end_date', endDate);
  

  const options = { params: params };
    return this.http.get<any>('https://capstone-app-backend-ghl2.onrender.com/rest/findResultByStore/' + storeId,options);
  }

  getResultsByStore(storeId: any){


    return this.http.get<any>('https://capstone-app-backend-ghl2.onrender.com/rest/findResultByStore/' + storeId);
  }

  checkStore(storeId: number){
    let params = new HttpParams();
    params = params.append('store_id', storeId);

    const options = {params: params};
    return this.http.get<any>('https://capstone-app-backend-ghl2.onrender.com/rest/checkStoreId', options);
  }

  getStoreName(storeId: number){
    return this.http.get('https://capstone-app-backend-ghl2.onrender.com/rest/stores/' + storeId, {responseType: 'text'});
  }
}