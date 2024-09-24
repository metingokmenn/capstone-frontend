import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  ageDetectionData:any;
  filteredAgeDetectionData:any;

  startDate:string;
  endDate:string;

  selectedStoreId: number;
  showStoreLabel: boolean = false;
  storeLabelText: string = 'No store is found with this store id.';
  storeName: string = ''; 

  constructor(private datePipe:DatePipe, private apiService:ApiService) { }

 

  storeList: any[];



  formatStartDate(date:Date): string{

    return this.datePipe.transform(date, 'yyyy-MM-ddT00:00:00.000000');
    
    
  }

  formatEndDate(date:Date): string{
    if ((date === undefined || date === null)){
      return;
    }
    else if(date !== undefined && date !== null){
      return this.datePipe.transform(date, 'yyyy-MM-ddT00:00:00.000000');
    }
  }

  ngOnInit(): void {
    this.fetchData();

  }

  fetchData(startDate?:string, endDate?:string, selectedStoreId?: any) {

    if ((startDate === undefined || startDate === null) && (endDate === undefined || endDate === null)) {
      if((selectedStoreId === undefined || selectedStoreId === null)){
        this.apiService.getAgeDetectionData().subscribe(data => {
          this.ageDetectionData = data;
          console.log(data);
      });
      }
      else if(selectedStoreId !== undefined && selectedStoreId !== null){
        this.apiService.checkStore(selectedStoreId).subscribe(data => {
          if(data){
            this.apiService.getResultsByStore(selectedStoreId).subscribe(data => {
              this.ageDetectionData = data;
              console.log(data);
          });

          this.apiService.getStoreName(selectedStoreId).subscribe(data => {
            this.storeName = data;
            console.log(data);
            
          },
        error => {console.error("Error fetching store name." , error)});

          this.showStoreLabel = false;

          }
          else{
            this.showStoreLabel = true;
            this.storeName = null;
          }
        });
      }
    }
    else if ((startDate !== undefined || startDate !== null) && (endDate !== undefined || endDate !== null) ) {
      if((selectedStoreId === undefined || selectedStoreId === null)){
        this.apiService.getFilteredAgeDetectionData(startDate, endDate).subscribe(data => {
          this.ageDetectionData = data;
          console.log(data);
        });
      }
      else if(selectedStoreId !== undefined && selectedStoreId !== null){
        this.apiService.checkStore(selectedStoreId).subscribe(data =>{
          if(data){
            this.apiService.getFilteredAgeDetectionDataByStore(startDate,endDate,selectedStoreId).subscribe(data => {
              this.ageDetectionData = data;
              console.log(data);
            });
          }
          else{
            this.showStoreLabel = true;
            this.storeName = null;
          }
        });
      }
  }

  /* this.apiService.getStoreList().subscribe(data => {

    this.storeList = data;
    
  }); */
  }

  applyFilters() {


    if ((this.startDate === undefined || this.startDate === null) && (this.endDate === undefined || this.endDate === null)){
      const selectedStoreId = this.selectedStoreId;

      this.fetchData(null,null,selectedStoreId);
    }

    else if ((this.startDate !== undefined || this.startDate !== null) && (this.endDate !== undefined || this.endDate !== null) ){

      const startDate = this.formatStartDate(new Date(this.startDate));
      const endDate = this.formatEndDate(new Date(this.endDate));
      const selectedStoreId = this.selectedStoreId;
      
    
      console.log(startDate);
      console.log("*******************************");
      console.log(endDate);
  
      this.fetchData(startDate,endDate,selectedStoreId);
    }
}

clearFilters() {
  this.selectedStoreId = null;
  this.startDate = null;
  this.endDate = null;
  this.storeName = null;
}
}
