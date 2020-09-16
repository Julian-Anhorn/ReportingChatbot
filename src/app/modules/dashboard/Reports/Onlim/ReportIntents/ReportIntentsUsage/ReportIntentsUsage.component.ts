import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as Highcharts from 'highcharts';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ReportService } from '../../Onlimreport.service';
import * as moment from 'moment';
import { Options } from 'highcharts';
import IntentsFile from 'src/app/Data/Intents.json'
import HC_exporting from 'highcharts/modules/exporting';
import { element } from 'protractor';
HC_exporting(Highcharts);

@Component({
  selector: 'app-ReportIntentsUsage',
  templateUrl: './ReportIntentsUsage.component.html',
  styleUrls: ['./ReportIntentsUsage.component.scss']
})
export class ReportIntentsUsageComponent implements OnInit {

//dataMap = {"Total":0,"Jan":0,"Feb":0,"Mar":0,"Apr":0,"May":0,"Jun":0,"Jul":0,"Aug":0,"Sep":0,"Oct":0,"Nov":0,"Dec":0}
dataMap ;
range = new FormGroup({
  start: new FormControl(),
  end: new FormControl()
});

chartOptions: {};
Highcharts = Highcharts;
jsonData;
updateFlag = false;

IsWait=true;
toppings = new FormControl();
startDate;
endDate;
average=0.0;
nData=[]
constructor(private reportService: ReportService){
}

ngOnInit(): void {
  this.dataMap = {"Jan":[],"Feb":[],"Mar":[],"Apr":[],"May":[],"Jun":[],"Jul":[],"Aug":[],"Sep":[],"Oct":[],"Nov":[],"Dec":[]}
  let range=["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]

  this.reportService.getAll().subscribe(data => {
    const result = data.map(item => Object.values(item));


    this.jsonData=result.map(element => ({

      filteredData: element[1].filter(value =>value["sender"]["type"]!="bot"),

    }
))


      this.jsonData.forEach(element => {
        element["filteredData"].forEach(innerElement => {
          if(innerElement["intent_uid"]!=undefined){
            this.nData.push(innerElement["intent_uid"])
          }
        });


      })
      var counts=[]

      this.nData.forEach(function(uid) {
        if(IntentsFile.find(item => item.uid == ""+uid+"")!=undefined){

          var realName=IntentsFile.find(item => item.uid == ""+uid+"").name
        }

        if((counts.some(item => item.name == ""+realName+"") == false)){
          var temp ={name:realName, y:0}

          counts.push(temp)
        }

        if(uid != null ){
          counts.find(item => item.name == ""+realName+"").y+=1
        }
      });
      ;
      let sum_count=0
      sum_count+=counts.find(item => item.name == "Dialog_StartOfferSearch").y
      sum_count+=counts.find(item => item.name == "Dialog_OffersearchStart_B").y
      sum_count+=counts.find(item => item.name == "Dialog_OffersearchStart_AB").y
      sum_count+=counts.find(item => item.name == "Dialog_OffersearchStart_A").y
      sum_count+=counts.find(item => item.name == "Dialog_OffersearchStart_AC").y
      sum_count+=counts.find(item => item.name == "Dialog_OfferSearchStart_BC").y
      sum_count+=counts.find(item => item.name == "Dialog_OffersearchStart_C").y;
      var temp ={name:"Stellensuche", y:sum_count}
      counts.push(temp)


        counts=counts.filter(item => item.name != "Dialog_StartOfferSearch");
        counts=counts.filter(item => item.name != "Dialog_OffersearchStart_B");
        counts=counts.filter(item => item.name != "Dialog_OffersearchStart_AB");
        counts=counts.filter(item => item.name != "Dialog_OffersearchStart_A");
        counts=counts.filter(item => item.name != "Dialog_OffersearchStart_AC");
        counts=counts.filter(item => item.name != "Dialog_OfferSearchStart_BC")
        counts=counts.filter(item => item.name != "Dialog_OffersearchStart_C")
        counts=counts.filter(item => item.name !="Dialog_OfferSearchJobtyp_")
        counts=counts.filter(item => item.name !="Dialog_OffersearchJobTyp")
        counts=counts.filter(item => item.name !="Dialog_OffersearchLocation")
        counts=counts.filter(item => item.name !="Dialog_OffersearchJobField")
        counts=counts.filter(item => item.name !="Dialog_OffersearchJobTyp_Specific")
        counts=counts.filter(item => item.name !="Dialog_OfferSearch_A_B_AC")
        counts=counts.filter(item => item.name !="Dialog_Offersearch_C_B_AC")
        counts=counts.filter(item => item.name !="Dialog_Offersearch_A_CAB")
        counts=counts.filter(item => item.name !="Datalayer_Offer_B")
        counts=counts.filter(item => item.name !="Dialog_Offersearch_B_C_AB")
        counts=counts.filter(item => item.name !="Dialog_OffersearchJobField - fallback")
        counts=counts.filter(item => item.name !="Dialog_Offersearch_A_BAC_Specific")
        counts=counts.filter(item => item.name !="Dialog_Offersearch_C_AB_C")
        counts=counts.filter(item => item.name !="Dialog_Offersearch_B")
        counts=counts.filter(item => item.name !="Dialog_OfferSearch_AC_B")
        counts=counts.filter(item => item.name !="Dialog_Offersearch_A_CAB_Specific")
        counts=counts.filter(item => item.name !="Datalayer_Offer")
        counts=counts.filter(item => item.name !="Dialog_OffersearchLocation_Trainee")
        counts=counts.filter(item => item.name !="Dialog_Offersearch_A_BCA")
        counts=counts.filter(item => item.name !="Dialog_Offersearch_C_A_BC")
        counts=counts.filter(item => item.name !="Dialog_Offersearch_A_BCA_Specific")
        counts=counts.filter(item => item.name !="Dialog_Offersearch_C_B_AC - fallback")
        counts=counts.filter(item => item.name !="Datalayer_Offer_A")
        counts=counts.filter(item => item.name !="Dialog_OffersearchLocation - fallback")
        counts=counts.filter(item => item.name !="Dialog_Offersearch_C_A_BC - fallback")
        counts=counts.filter(item => item.name !="Dialog_Offersearch_A_BCA - fallback")
        counts=counts.filter(item => item.name !="Dialog_Offersearch_B - fallback")
        counts=counts.filter(item => item.name !="Dialog_Offersearch_A_BCA_Specific - fallback")
        counts=counts.filter(item => item.name !="Dialog_OffersearchJobTyp- fallback")
        counts=counts.filter(item => item.name !="Dialog_Offersearch_A_CAB - fallback")
        counts=counts.filter(item => item.name !="Datalayer_Offer_ABC")
        counts=counts.filter(item => item.name !="Dialog_Offersearch_B_C_AB - fallback")
        counts=counts.filter(item => item.name !="Dialog_Offersearch_A_CAB_Specific - fallback")
        counts=counts.filter(item => item.name !="Dialog_OfferSearch_AC_B - fallback")
        counts=counts.filter(item => item.name !="Dialog_OfferSearch_A_B_AC - fallback")





      counts.sort((a, b) => (a.y > b.y) ? 1 : -1)
      counts= counts.slice(counts.length-10, counts.length+1);
      counts.reverse()
    this.updateChart(counts);
  });
}
setStartDate(type: string, event: MatDatepickerInputEvent<Date>) {
  this.startDate=new Date(`${type}: ${event.value}`);
}
setEndDate(type: string, event: MatDatepickerInputEvent<Date>) {
  this.endDate=new Date(`${type}: ${event.value}`);
  console.log(this.startDate+"-"+this.endDate)
  this.updateData()
}
setAverage(){
  this.average=2.2;
}

updateData(){

}

updateChart(data:any[]) {


  var pieColors = (function () {
    var colors = [],
    base = "#774251",

        i;

    for (i = 0; i < 10; i += 1) {
        // Start out with a darkened base color (negative brighten), and end
        // up with a much brighter color
        colors.push(Highcharts.color(base).brighten((i-4) / 15).get());
    }
    return colors;
}());




  this.chartOptions = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Top-10 Intents<br>'
    },
    tooltip: {

        pointFormat: '<span style="color:{point.color}"><b>{point.y}</b>; <b>{point.percentage:.1f}%</b>',

        style: {

          fontSize:'14px'
      }
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            colors: pieColors,

            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f}%',
                style: {
                  backgroundColor: '#FCFFC5',
                  fontSize:'15px'
              }

            }
        }
    },
    credits: {
      enabled:false,
    },
    exporting: {
      sourceWidth: 800,
      sourceHeight: 400,
      scale: 1
  },
    series: [{
        name: 'Anteil',
        colorByPoint: true,
        data: (data)
    }]
};
this.IsWait=false
}}
