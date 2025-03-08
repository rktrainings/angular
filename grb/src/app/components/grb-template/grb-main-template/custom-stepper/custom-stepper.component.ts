import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HiringFormService } from 'src/app/services/hiring-form.service';
import templatecardJSON from 'src/assets/data/grb-template/cardTemplate.json';

@Component({
  selector: 'app-custom-stepper',
  templateUrl: './custom-stepper.component.html',
  styleUrls: ['./custom-stepper.component.scss']
})
export class CustomStepperComponent implements OnInit {

  isExternalGRB: boolean;
  isInternalGRB: boolean;
  isExternalTRAM:boolean;

  hireType: any;
  hiringAs: any;
  // checkReturn: boolean = false;
  // activeIndex: any;
  activeGRBDetails: boolean;
  activeGOMDetails: boolean;
  activeTRAMDetails: boolean;
  activeEmpDetails: boolean;
  activePreview: boolean;
  isGRBFilled: boolean;
  isGOMFilled: boolean;
  isTRAMFilled: boolean;
  isEmployeeFilled: boolean = true;
  formName: any;
  greenColor: string = 'green';
  baseColor: string = '$bg-aqua';
  backFillDataFields: any = {};
  backFillData: any = [];
  templatecard = [];
  orpData: any = [];

  constructor(private activatedRoute: ActivatedRoute,
    private hiringFormService: HiringFormService) {

    this.activatedRoute.queryParams.subscribe(params => {
      //////////console.log('param', params);
      this.hireType = params.hireType;
      this.formName = params.formName;
      // this.templatecard = templatecardJSON['card'].filter(e => e.type.includes(this.hireType));
      // //////////console.log(templatecardJSON['card']);
      // //////////console.log('templatecard', this.templatecard);

      if (this.hireType === 'external') {
        this.isExternalGRB = true;
      } else if (this.hireType === 'internal') {
        this.isInternalGRB = true;
      }

    });

  }

  ngOnInit() {
    this.hiringFormService.grbValid$.subscribe(bool => {
      this.isGRBFilled = bool;
      this.pickStepperStatus();
    });
    this.hiringFormService.gomValid$.subscribe(bool => {
      this.isGOMFilled = bool;
      this.pickStepperStatus();
    });
    this.hiringFormService.tramValid$.subscribe(bool => {
      this.isTRAMFilled = bool;
      this.pickStepperStatus();
    });

  }

  pickStepperStatus() {
    if (this.formName === 'tolls' || this.formName === 'iot' || this.formName === 'bizops' || this.formName === 'board' ||
      this.formName === 'swap') {
      if (this.isExternalGRB) {
        this.activeGRBDetails = true;
        this.backFillEmployeeData();
        this.activeGOMDetails = true;
        this.activePreview = true;
        this.activeTRAMDetails = true;
      } else if (this.isInternalGRB) {
        this.activeGRBDetails = true;
        this.backFillEmployeeData();
        this.activePreview = true;
      }
    } else {
      this.activeGRBDetails = this.isGRBFilled ? true : false;
      this.activeEmpDetails = this.isEmployeeFilled ? true : false;
      this.backFillEmployeeData();
      if (this.isExternalGRB) {
        this.activeGOMDetails = this.isGOMFilled ? true : false;
        this.activeTRAMDetails = this.isTRAMFilled ? true : false;
        this.activePreview = this.isGRBFilled && this.isGOMFilled && this.isTRAMFilled ? true : false;
      } else if (this.isInternalGRB) {
        this.activeGOMDetails = false;
        this.activeTRAMDetails = false;
        this.activePreview = this.isGRBFilled ? true : false;
      }
    }
  }

  backFillEmployeeData() {
    if (localStorage.getItem('backFillData')) {
      this.backFillData = JSON.parse(localStorage.getItem('backFillData'))
    }
    else {
      this.backFillData = this.hiringFormService.getBackFillData();
    }
    this.backFillDataFields = this.backFillData.length > 0 ? this.backFillData[0] : {};
    //////////console.log('backFillDataFields', this.backFillDataFields);

    if (localStorage.getItem('orpData')) {
      this.orpData = JSON.parse(localStorage.getItem('orpData'))
    }
    else {
      this.orpData = this.hiringFormService.getOrpData();
    }

    //////////console.log('orpData:', this.orpData.length);

    if (Object.keys(this.backFillDataFields).length === 0 && this.orpData.length === 0) {
      this.isEmployeeFilled = false;
    } else {
      this.hiringAs = this.backFillDataFields['hiringAs'];
      if (this.hiringAs)
        if (this.hiringAs.toLowerCase().includes('new growth') && this.hireType == 'external') {
          this.isEmployeeFilled = false;
        }
    }
    this.activeEmpDetails = this.isEmployeeFilled;
    //////////console.log('isEmployeeFilled:', this.isEmployeeFilled)
    //////////console.log('activeEmpDetails:', this.activeEmpDetails)
  }


  getPadding(value: any) {
    if (this.isInternalGRB) {
      switch (value) {
        case 'grb':
          return '145px';
        case 'employee':
          return '280px';
        case 'gom':
          return '280px';
        case 'priview':
          return '248px';
      }
    } else if (this.isExternalGRB) {
      if (!this.activeEmpDetails) {
        switch (value) {
          case 'grb':
            return '155px';
          case 'gom':
            return '255px';
          case 'tram':
            return '255px';
          case 'priview':
            return '270px';
        }

      } else {
        switch (value) {
          case 'grb':
            return '105px';
          case 'employee':
            return '145px';
          case 'gom':
            return '145px';
          case 'tram':
            return '145px';
          case 'priview':
            return '300px';//172
        }

      }
    }
    // switch (value) {
    //   case 'grb':
    //     return this.isExternalGRB ? '105px' : '145px';
    //   case 'employee':
    //     return this.isExternalGRB ? '145px' : '280px';
    //   case 'gom':
    //     return this.isExternalGRB ? '145px' : '280px';
    //   case 'priview':
    //     return this.isExternalGRB ? '172px' : '248px';
    // }
  }

}
