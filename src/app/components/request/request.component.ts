import { AfterViewChecked, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EncodingType } from 'src/app/models/encoding-type.models';
import { Environment } from 'src/app/models/env.models';
import { Request } from 'src/app/models/request.models';
import { Signatures } from 'src/app/models/signatures.models';
import { ApiService } from 'src/app/provider/api.service';
import { Params} from '../../models/params.models';
import { findString } from '../../utils/stringsUtils';

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
  paramsString: string[] = [];

  redirectorURL: string = '.mycarenet.be/cin/bed/redirector/site/cps.html?target=VlBelRai';
  previousOption: string = "params";

  request = new Request();
  keyParams = new Params();
  environments = new Environment();
  signatures = new Signatures();
  encodingType = new EncodingType();

  paramArray: string[] = [];
  envArray: string[] = [];
  signArray: string[] = [];
  encodingArray: string[] = [];
  
  constructor(
    private fb: FormBuilder,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.getRequestForm = this.fb.group({
      url: ['/'],
      iat: [''],
      sign: ['INDIVIDUAL'],
      encodingType: ['']
    });

    for( let value in this.keyParams){
      this.paramArray.push(value);
    }

    for (let env in this.environments){
      this.envArray.push(env);
    }

    for (let sign in this.signatures){
      this.signArray.push(sign);
    }

    for (let encoding in this.encodingType){
      this.encodingArray.push(encoding);
    }
    console.log(this.encodingArray);
    
  }

  ngAfterViewChecked(): void {
    this.getRequestForm.valueChanges.subscribe(v => {
      this.queryParams = '';
      this.finalUrl = '';
      this.updateRequest();
    }); 
  }

  paramSelected(event){
    console.log(event.target.value);
    this.paramArray.forEach(name => {
      if(name == event.target.value){
       let index = this.paramArray.indexOf(name);
       this.paramArray.splice(index,1); 
       this.paramsString.push(name);
       this.addRequestControlWithParam(name);
      }
    });
  }

  envSelected(event){
    console.log(event.target.value);
    switch (event.target.value) {
      case 'dev': this.getRequestForm.patchValue({url:'https://' + event.target.value + this.redirectorURL})
        break;
      case 'acc': this.getRequestForm.patchValue({url:'https://' + event.target.value + this.redirectorURL})
        break;
      case 'prod': this.getRequestForm.patchValue({url:'https://www' + this.redirectorURL})  
        break;
      default: this.getRequestForm.patchValue({url: '/'})
        break;
    }
  }

  deleteControl(event){
    let controlToDelete = event.target.id;
    controlToDelete = findString(controlToDelete, '-', 'before');
    console.log("controlName", controlToDelete);
    console.log(this.paramsString);

    this.paramsString.forEach(name => {
      if(name == controlToDelete){

        let index = this.paramsString.indexOf(name);
        this.paramsString.splice(index,1);
        console.log(this.paramsString);
        
        this.paramArray.push(name);
        this.removeRequestControlWithParam(name);
      }
    });
  }

  addRequestControlWithParam(newControl: string): void{
    // let lastNumber = this.params.length - 1;
    // this.getRequestForm.addControl(newControl, new FormControl(newControl));
    this.getRequestForm.addControl(newControl + '-value', new FormControl(''));
  }

  removeRequestControlWithParam(name): void {
    this.getRequestForm.removeControl(name + '-value');
  }

  sendRequestGET() {
    console.log(this.getRequestForm.value);

    let date = this.getRequestForm.value.iat;

    console.log("date value", date);


    date = date.split("-");
    let newDate = new Date( date[0], date[1] - 1, date[2]);
    console.log(newDate);

    console.log("new date in timestamp", newDate.getTime());
    
    
    console.log("finalUrl", this.finalUrl);
    this.api.getRequest(this.finalUrl);
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

//FOR DEV
  checkRequestForm() {
    let lastParamCreated = document.getElementById('param' + (this.params.length - 1));
    console.log("last params created is: ", lastParamCreated);
    console.log(this.getRequestForm.controls);
  }
}
