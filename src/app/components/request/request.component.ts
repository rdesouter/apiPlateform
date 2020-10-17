import { AfterViewChecked, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { optionSection } from 'src/app/models/optionSection.models';
import { ApiService } from 'src/app/provider/api.service';
import { Params} from '../../models/params.models';

@Component({
  selector: 'request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit, AfterViewChecked{

  getRequestForm: FormGroup;
  public finalUrl: string = '';
  public queryParams: string = '';
  params: number[] = [];
  options1: string[] = ['params','authtorization','headers','body'];

  options: optionSection[] = [
    {"name": "params", "isSelected": false},
    {"name": "authtorization", "isSelected": false},
    {"name": "headers", "isSelected": false},
    {"name": "body", "isSelected": false},
  ]


  visibleDiv:string = '';


  previousOption: string = "params";

  params1 = new Params();
  paramArray: string[] = [];


  
  constructor(
    private fb: FormBuilder,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.getRequestForm = this.fb.group({
      requestUrl: ['url to send'],
      iat: [''],
      iat_checkbox: ['']
    });

    console.log(this.options[0].isSelected = true);
    

    for( let value in this.params1){
      this.paramArray.push(value);
    }

    for (let [k,v] of Object.entries(this.params1)){
      console.log(`key: ${k} value: ${v}` );
    }

    // this.params1.iss = "toto"
  }

  ngAfterViewChecked(): void {
    this.getRequestForm.valueChanges.subscribe(v => {
      this.queryParams = '';
      this.finalUrl = '';
      this.updateRequest();
    });
  }

  addOptionActive(event){
    
    console.log("event srcElement: " , event.srcElement.innerHTML);

    for( let value of this.options){
      if (this.previousOption == value.name){
        value.isSelected = false;
      }
      if(value.name == event.srcElement.innerHTML){
        value.isSelected = true;
      }
      console.log("each value after:" , value);
    }
    this.previousOption = event.srcElement.innerHTML;
  }

  addParam(): void {
    this.params.push(this.params.length);
    this.addRequestControl();
  }

  deleteParam(): void {

    this.removeRequestControl();
    this.params.pop();
  }


  addRequestControl(): void{
    let lastNumber = this.params.length - 1;
    this.getRequestForm.addControl('key' + lastNumber, new FormControl('key' + lastNumber));
    this.getRequestForm.addControl('value' + lastNumber, new FormControl('value' + lastNumber));
  }

  removeRequestControl(): void {
    let lastNumber = this.params.length - 1;  
    this.getRequestForm.removeControl('key' + lastNumber);
    this.getRequestForm.removeControl('value' + lastNumber);
  }


  updateRequest(){
    let getForm = this.getRequestForm;
    let baseUrl: any = '';
    // console.log("last object ",(Object.keys(getForm.controls)));

    for (let i = 0; i < Object.keys(getForm).length ; i++){
      for (let [key,value] of Object.entries(getForm.value)){
        if(key == 'requestUrl'){
          baseUrl = value;
        }
        if(key == ('key' + i)){
          this.queryParams = this.queryParams + value + '=';
        }
        if(key == ('value' + i)){
          this.queryParams = this.queryParams + value + '&';
        }
      }
    }
    // console.log("baseUrl: ", baseUrl);
    // console.log("queryParams: ", this.queryParams);
    this.finalUrl = baseUrl + '?' + this.queryParams;
  }

  sendRequestGET() {
    console.log(this.getRequestForm.value);
    
    console.log("finalUrl", this.finalUrl);
    this.api.getRequest(this.finalUrl);
    
  }


  // checkRequestForm() {
  //   let lastParamCreated = document.getElementById('param' + (this.params.length - 1));
  //   console.log("last params created is: ", lastParamCreated);
  //   console.log(this.getRequestForm.controls);
  // }


}
