import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { DatePipe } from '@angular/common';
import { DateApiService } from './dateApi.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  apiData: any;
  storeData: any;
  startDate: string;
  endDate: string;
  selectedStoreId: number;
  storeList: any[];
  showStoreLabel: boolean = false;
  storeLabelText: string = 'No store is found with this store id.';
  storeName: string = ''; 

  constructor(private datePipe: DatePipe, private apiService: DateApiService) { }
    
  formatStartDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-ddT00:00:00.000000');
  }

  formatEndDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-ddT23:59:59.999999');
  }

  formatDateNow(): string{
    return this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss.mmmmmm');
  }

  

  ngOnInit() {
    this.fetchData();  
  }


  fetchData(startDate?: string, endDate?: string, selectedStoreId?: any) {

    console.log("Fetch data triggered.");

    if ((startDate === undefined || startDate === null) && (endDate === undefined || endDate === null)) {
      console.log("if 1");
      if((selectedStoreId === undefined || selectedStoreId === null)){
        console.log("if 1 1");

        let now = this.formatDateNow();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

        this.apiService.getMonthlyTotalCounts(now).subscribe(data => {
          let months = [];
          let values = [];
          data.forEach(item => {
          const monthName = monthNames[item.month - 1]; // Aylar 1'den başladığı için index 0 bazlı düzeltme yapılır
          months.push(monthName);
          });
    
          data.forEach(item => {
            values.push(item.totalCount);
          });
    
          this.updateMonthlyCountsGraph(months,values);
    
        console.log(values);
        });
        this.apiService.getAgeStats().subscribe(data => {
          this.updateAgeGraph(data);
          
        });

        this.apiService.getGenderStats().subscribe(data => {
          this.updateGenderGraph(data);
          
        });

        this.apiService.getAgeGenderCounts().subscribe(data => {
          console.log(data);
          const maleValues: number[] = [];
          const femaleValues: number[] = [];


          Array.from(data.values()).forEach(entry => {
            if ('Male' in entry) {
              maleValues.push(entry['Male']);
          }
          if ('Female' in entry) {
              femaleValues.push(entry['Female']);
          }
          });

          
          this.updateGenderByAgeGraph(Array.from(data.keys()),maleValues, femaleValues);

        });

        this.apiService.getConfidenceScores().subscribe(data => {

          this.updateConfidenceScoreGraph(data);
        });
        

      }
      else if(selectedStoreId !== undefined && selectedStoreId !== null){
        console.log("if 1 2");
        

        this.apiService.checkStore(selectedStoreId).subscribe(data=>{
          if(data){
            this.apiService.getAgeStatsByStore(selectedStoreId).subscribe(data => {
              this.updateAgeGraph(data);
              
            });
    
            this.apiService.getGenderStatsByStore(selectedStoreId).subscribe(data => {
              this.updateGenderGraph(data);
              
            });

            this.apiService.getConfidenceScoresByStore(selectedStoreId).subscribe(data => {
              this.updateConfidenceScoreGraph(data);
            });

            this.showStoreLabel = false;

            this.apiService.getStoreName(selectedStoreId).subscribe(data => {
              this.storeName = data;
              console.log(data);
              
            },
          error => {console.error("Error fetching store name." , error)});

          this.apiService.getGenderCountByAgeGroupByStoreId(selectedStoreId).subscribe(data => {
            console.log(data);
            const maleValues: number[] = [];
            const femaleValues: number[] = [];
  
  
            Array.from(data.values()).forEach(entry => {
              if ('Male' in entry) {
                maleValues.push(entry['Male']);
            }
            if ('Female' in entry) {
                femaleValues.push(entry['Female']);
            }
            });
  
            
            this.updateGenderByAgeGraph(Array.from(data.keys()),maleValues, femaleValues);
  
          });

          let now = this.formatDateNow();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

        
          this.apiService.getMonthlyCountsByStore(selectedStoreId,now).subscribe(data => {
            let months = [];
            let values = [];
            data.forEach(item => {
            const monthName = monthNames[item.month - 1]; // Aylar 1'den başladığı için index 0 bazlı düzeltme yapılır
            months.push(monthName);
            });

            data.forEach(item => {
              values.push(item.totalCount);
            });

            this.updateMonthlyCountsGraph(months,values);

          console.log(values);
          });

            
          }
          else{
            this.showStoreLabel = true;
            this.storeName = null;
          }
        });
      
      }
    }
    else if ((startDate !== undefined || startDate !== null) && (endDate !== undefined || endDate !== null) ) {
      console.log("if 2");
      if((selectedStoreId === undefined || selectedStoreId === null)){
        console.log("if 2 1");
        this.apiService.getFilteredAgeStats(startDate, endDate).subscribe(data => {
          this.updateAgeGraph(data);
          
        });
        this.apiService.getFilteredGenderStats(startDate,endDate).subscribe(data => {
          this.updateGenderGraph(data);
          
        });

        let now = this.formatDateNow();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

        this.apiService.getMonthlyTotalCounts(now).subscribe(data => {
          let months = [];
          let values = [];
          data.forEach(item => {
          const monthName = monthNames[item.month - 1]; // Aylar 1'den başladığı için index 0 bazlı düzeltme yapılır
          months.push(monthName);
          });
    
          data.forEach(item => {
            values.push(item.totalCount);
          });
    
          this.updateMonthlyCountsGraph(months,values);
    
        console.log(values);
        });

        this.apiService.getGenderCountByAgeGroupByDateRange(startDate,endDate).subscribe(data => {
          console.log(data);
          const maleValues: number[] = [];
          const femaleValues: number[] = [];


          Array.from(data.values()).forEach(entry => {
            if ('Male' in entry) {
              maleValues.push(entry['Male']);
          }
          if ('Female' in entry) {
              femaleValues.push(entry['Female']);
          }
          });

          
          this.updateGenderByAgeGraph(Array.from(data.keys()),maleValues, femaleValues);

        });
      }
      else if(selectedStoreId !== undefined && selectedStoreId !== null){
        console.log("if 2 2");

        this.apiService.checkStore(selectedStoreId).subscribe(data =>{
          if(data){
            this.apiService.getAgeCountsByStoreAndTime(selectedStoreId,startDate,endDate).subscribe(data =>{
              this.updateAgeGraph(data);
              console.log("AGE DATA");
              console.log(data);
            });
    
            this.apiService.getGenderCountsByStoreAndTime(selectedStoreId,startDate,endDate).subscribe(data =>{
              this.updateGenderGraph(data);
              console.log("GENDER DATA");
              console.log(data);
            });

            this.apiService.getStoreName(selectedStoreId).subscribe(data => {
              this.storeName = data;
              console.log(data);
              
            },
          error => {console.error("Error fetching store name." , error)});

          this.apiService.getConfidenceScoresByStore(selectedStoreId).subscribe(data => {
            this.updateConfidenceScoreGraph(data);
          });

          let now = this.formatDateNow();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

          this.apiService.getMonthlyCountsByStore(selectedStoreId,now).subscribe(data => {
            let months = [];
            let values = [];
            data.forEach(item => {
            const monthName = monthNames[item.month - 1]; // Aylar 1'den başladığı için index 0 bazlı düzeltme yapılır
            months.push(monthName);
            });

            data.forEach(item => {
              values.push(item.totalCount);
            });

            this.updateMonthlyCountsGraph(months,values);

          console.log(values);
          });

          this.showStoreLabel = false;

          this.apiService.getGenderCountByAgeGroupByStoreIdAndDateRange(selectedStoreId,startDate,endDate).subscribe(data => {
            console.log(data);
            const maleValues: number[] = [];
            const femaleValues: number[] = [];
  
  
            Array.from(data.values()).forEach(entry => {
              if ('Male' in entry) {
                maleValues.push(entry['Male']);
            }
            if ('Female' in entry) {
                femaleValues.push(entry['Female']);
            }
            });
  
            
            this.updateGenderByAgeGraph(Array.from(data.keys()),maleValues, femaleValues);
  
          });

          

          }

          else{
            this.showStoreLabel = true;
            this.storeName = null;
          }
        })


        
        //TODO
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
      const selectedStoreId = this.selectedStoreId;
      const startDate = this.formatStartDate(new Date(this.startDate));
      const endDate = this.formatEndDate(new Date(this.endDate));

      console.log(startDate);
      console.log("*******************************");
      console.log(endDate);

      this.fetchData(startDate,endDate,selectedStoreId);
    }

  }

  updateGenderGraph(data: Map<string, number>) {

    

    var updatedValues = {
      labels: Object.keys(data),
      series: [Object.values(data)]
    };

    
    const optionsHorizontalBarChart: any = {
      seriesBarDistance: 10,
      horizontalBars: true,
      axisY: {
        offset: 50
      },
      axisX: {
        offset:50,
        onlyInteger: true
      }
    };

    var horizontalBarChart = new Chartist.Bar('#horizontalBarChart', updatedValues, optionsHorizontalBarChart);

    this.startAnimationForBarChart(horizontalBarChart);
    
  }

  updateAgeGraph(data: Map<string, number>) {
    var updatedValues = {
      labels: Object.keys(data),
      series: [Object.values(data)]
    };

    const optionsHorizontalBarChart: any = {
      seriesBarDistance: 50,
      axisY: {
        offset: 60
      },
      axisX:{
        offset: 20,
      }
    };

    var dailySalesChart = new Chartist.Bar('#ageBarChart', updatedValues, optionsHorizontalBarChart);

    this.startAnimationForBarChart(dailySalesChart);
  }

  // multilinechart barlı olan.
  updateGenderByAgeGraph(labels: any, maleValues: any, femaleValues: any) {

    console.log(maleValues);
    console.log(femaleValues);

    new Chartist.Bar('#multiLineChart', {
      labels: labels,
      series: [
        [0, 0, 0, 0,0, 0, 0, 0,0, 0, 0],
        maleValues,
        femaleValues,
      ]

    }, 
    {
      seriesBarDistance: 10,
      axisX: {
        offset: 30
      },
      axisY: {
        onlyInteger:true,
        offset: 30,
        labelInterpolationFnc: function(value) {
          return value
        },
        scaleMinSpace: 10
      },
      
    });
  }
  //düz linechart 1
  updateMonthlyCountsGraph(months: any, values: any) {
    const updatedData = {
      labels: months,
      series: [values]
    };
    const options = {
      axisY:{
        onlyInteger:true,
      }
    };
  
    new Chartist.Line('#lineChart', updatedData, options);
  }
  // ikinci düz line chart
  updateConfidenceScoreGraph(confidenceScores: any) {
    const updatedData = {
      labels: [],
      series: [
        confidenceScores, 
    
      ]
    };
    const options = {
      axisX:{
        offset:5
      }
     
    };
  
    // Grafik oluşturma
    new Chartist.Line('#secondLineChart', updatedData, options);
  }

  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  };

  clearFilters() {
    this.selectedStoreId = null;
    this.startDate = null;
    this.endDate = null;
    this.storeName = null;
    this.showStoreLabel = false;
  }


   
}
