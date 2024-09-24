import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface GenderData {
  Female: number;
  Male: number;
}

@Injectable({
  providedIn: 'root'
})
export class DateApiService {

  constructor(private http: HttpClient) { }

  
  getFilteredAgeDetectionData(startDate: string, endDate: string) {
    let params = new HttpParams();
  params = params.append('start_date', startDate);
  params = params.append('end_date', endDate);

  const options = { params: params };
    return this.http.get<any>('https://capstone-app-backend-ghl2.onrender.com/rest/results',options);
  }

  getFilteredGenderStats(startDate: string, endDate: string){
    let params = new HttpParams();
    params = params.append('start_date', startDate);
    params = params.append('end_date', endDate);

    const options = {params: params};

    return this.http.get<any>('https://capstone-app-backend-ghl2.onrender.com/rest/results/gender',options);
  }

  

  getFilteredAgeStats(startDate: string, endDate: string){
    let params = new HttpParams();
    params = params.append('start_date', startDate);
    params = params.append('end_date', endDate);

    const options = {params: params};

    return this.http.get<any>('https://capstone-app-backend-ghl2.onrender.com/rest/results/age',options);
  }
  
  getGenderStats(){
    return this.http.get<any>('https://capstone-app-backend-ghl2.onrender.com/rest/results/gender');
  }

  getAgeStats(){
    return this.http.get<any>('https://capstone-app-backend-ghl2.onrender.com/rest/results/age');
  }

  checkStore(storeId: number){
    let params = new HttpParams();
    params = params.append('store_id', storeId);

    const options = {params: params};
    return this.http.get<any>('https://capstone-app-backend-ghl2.onrender.com/rest/checkStoreId', options);
  }

  getAgeStatsByStore(storeId: number){
    return this.http.get<any>('https://capstone-app-backend-ghl2.onrender.com/rest/age_group_counts/' + storeId);
  }

  getGenderStatsByStore(storeId: number){
    return this.http.get<any>('https://capstone-app-backend-ghl2.onrender.com/rest/gender_counts/' + storeId);
  }

  

  getAgeGenderCounts(): Observable<Map<string, GenderData>> {
    return this.http.get<any[]>('https://capstone-app-backend-ghl2.onrender.com/rest/results/getGenderCountByAgeGroup').pipe(
      map(response => {
        const result = new Map<string, GenderData>();
        response.forEach(item => {
          const ageGroup = Object.keys(item)[0]; // Yaş grubunu al
          const genderData = item[ageGroup]; // Cinsiyet verisini al
          result.set(ageGroup, genderData);
        });
        return result;
      })
    );
  }

  getMonthlyTotalCounts(startDate: string) {
    let params = new HttpParams();
    params = params.append('start_date', startDate);

    const options = {params: params};


    return this.http.get<any>('https://capstone-app-backend-ghl2.onrender.com/rest/monthly_counts',options);
  }

  getConfidenceScoresByStore(storeId: number){
    let params = new HttpParams();
    params = params.append('store_id', storeId);

    const options = {params:params};

    return this.http.get<any>('https://capstone-app-backend-ghl2.onrender.com/rest/confidenceScoresByStore',options);
  }

  getConfidenceScores(){

    return this.http.get<any>('https://capstone-app-backend-ghl2.onrender.com/rest/confidenceScores');
  }

  getStoreName(storeId: number){
    return this.http.get('https://capstone-app-backend-ghl2.onrender.com/rest/stores/' + storeId, {responseType: 'text'});
  }

  getMonthlyCountsByStore(storeId: number, startDate: any){
    let params = new HttpParams();
    params = params.append('store_id', storeId);
    params = params.append('start_date', startDate);

    const options = {params:params};

    return this.http.get<any>('https://capstone-app-backend-ghl2.onrender.com/rest/monthlyCountsByStore',options);
  }

  getGenderCountsByStoreAndTime(storeId:number, startDate:any, endDate:any){
    let params = new HttpParams();
    params = params.append('store_id', storeId);
    params = params.append('start_date', startDate);
    params = params.append('end_date', endDate);

    const options = {params:params};

    return this.http.get<any>('https://capstone-app-backend-ghl2.onrender.com/rest/gender-counts',options);
  }

  getAgeCountsByStoreAndTime(storeId:number, startDate:any, endDate:any){
    let params = new HttpParams();
    params = params.append('store_id', storeId);
    params = params.append('start_date', startDate);
    params = params.append('end_date', endDate);

    const options = {params:params};

    return this.http.get<any>('https://capstone-app-backend-ghl2.onrender.com/rest/age-group-counts',options);
  }

  getGenderCountByAgeGroupByStoreId(storeId:number){
    let params = new HttpParams();
    params = params.append('store_id', storeId);

    const options = {params:params};

    return this.http.get<any[]>('https://capstone-app-backend-ghl2.onrender.com/rest/results/getGenderCountByAgeGroupByStoreId',options).pipe(
      map(response => {
        const result = new Map<string, GenderData>();
        response.forEach(item => {
          const ageGroup = Object.keys(item)[0]; // Yaş grubunu al
          const genderData = item[ageGroup]; // Cinsiyet verisini al
          result.set(ageGroup, genderData);
        });
        return result;
      })
    );
  }

  getGenderCountByAgeGroupByDateRange(startDate: any, endDate: any){
    let params = new HttpParams();

    params = params.append('start_date', startDate);
    params = params.append('end_date', endDate);

    const options = {params:params};

    return this.http.get<any[]>('https://capstone-app-backend-ghl2.onrender.com/rest/results/getGenderCountByAgeGroupByDateRange',options).pipe(
      map(response => {
        const result = new Map<string, GenderData>();
        response.forEach(item => {
          const ageGroup = Object.keys(item)[0]; // Yaş grubunu al
          const genderData = item[ageGroup]; // Cinsiyet verisini al
          result.set(ageGroup, genderData);
        });
        return result;
      })
    );
  }

  getGenderCountByAgeGroupByStoreIdAndDateRange(storeId: number,startDate: any, endDate: any){
    let params = new HttpParams();
    params = params.append('store_id', storeId);
    params = params.append('start_date', startDate);
    params = params.append('end_date', endDate);

    const options = {params:params};

    return this.http.get<any[]>('https://capstone-app-backend-ghl2.onrender.com/rest/results/getGenderCountByAgeGroupByStoreIdAndDateRange',options).pipe(
      map(response => {
        const result = new Map<string, GenderData>();
        response.forEach(item => {
          const ageGroup = Object.keys(item)[0]; // Yaş grubunu al
          const genderData = item[ageGroup]; // Cinsiyet verisini al
          result.set(ageGroup, genderData);
        });
        return result;
      })
    );
  }

}


