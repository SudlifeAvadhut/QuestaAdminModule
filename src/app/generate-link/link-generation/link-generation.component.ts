import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DisplayLinkGeneration, LinkGenerationModel } from '../model/link-generation-model';
import { LinkGenerationService } from '../Service/link-generation.service';
import { MasterService } from '../Service/master.service';
import { CompanyModel } from '../model/company-model';
import { AssessmentModel } from '../model/assessment-model';
import { HumanResourceModel } from '../model/human-resource-model';
import { MailConfigModel } from '../model/mail-config-model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-link-generation',
  templateUrl: './link-generation.component.html',
  styleUrls: ['./link-generation.component.css']
})
export class LinkGenerationComponent implements OnInit {
  
  GenerationLinkForm: FormGroup;
  ObjLinkGenerationModel : LinkGenerationModel = new LinkGenerationModel();
  lstCompany : CompanyModel[];
  lstAssessment : AssessmentModel[];
  lstHrDetails : HumanResourceModel[];
  lstInitialMail : MailConfigModel[];
  lstFinalMail : MailConfigModel[];
  submitted = false;
  loading = false;
  displayedColumns: string[] = ['Url', 'TestId'];
  lstLinkGeneration: DisplayLinkGeneration[] = [];
  dataSource: MatTableDataSource<DisplayLinkGeneration>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  message: string = "";
  public isVisible: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private LinkGenerationSvc : LinkGenerationService,
              private MasterSvc : MasterService){

  }
  ngOnInit(): void {
    this.GenerationLinkForm = this.GenerateFormGroup(); 
    this.GetAllCompanyDetail();
  }

  GenerateFormGroup() : FormGroup{
    return this.formBuilder.group({
      AssessmentId : ["",[Validators.required]],
      CompanyId :["",[Validators.required]],
      HumanResourceId :["",[Validators.required]],
      InitialMailId : ["",[Validators.required]],
      FinalMailId : ["",[Validators.required]],
      IsReportSendToHr : [false],
      IsReportSendToCandidate : [false],
      LinkCount : ["",[Validators.required]]
    })
  }

  get f1() { return this.GenerationLinkForm.controls; }


  GetAllCompanyDetail() : any{
    this.MasterSvc.GetAllCompanyDetailsForGeneratingLink().subscribe(data =>{
      if(data.IsSucess){
        this.lstCompany = data.CompanyDetails.map((e : any) => ({ CompanyId : e.CompanyId,CompanyName : e.CompanyName })); 
      }
    })
  }

  GetAllAssessmentDetailsBaseOnCompanyId(CompanyId : number) : any{
    debugger
    this.lstAssessment = [];
      this.ObjLinkGenerationModel.AssessmentID = 0;
      this.lstHrDetails = []; 
      this.ObjLinkGenerationModel.HrId = 0;
      this.lstInitialMail = [];
      this.ObjLinkGenerationModel.InitialMailId = 0;
      this.lstFinalMail = [];
      this.ObjLinkGenerationModel.FinalMailId = 0;

    this.MasterSvc.GetAllAssessmentDetailsBaseOnAssessmentId(CompanyId).subscribe(data =>{
      if(data.IsSucess){
        this.lstAssessment = data.AssessmentDetails.map((e :any) =>({AssessmentId : e.AssessmentId,AssessmentName :e.AssessmentName}));
      }
    })
  }

  GetOthesMasterDetailBaseOnCompanyAndAssessmentId(CompanyId : number , AssessmentId : number) : any{
    if(AssessmentId === undefined || AssessmentId === null ){
      this.lstInitialMail = [];
      this.ObjLinkGenerationModel.InitialMailId = 0;
      this.lstHrDetails = []; 
      this.ObjLinkGenerationModel.HrId = 0;
      this.lstFinalMail = [];
      this.ObjLinkGenerationModel.FinalMailId = 0;
    }
    else if(CompanyId === undefined || CompanyId === null)
      {
        this.lstAssessment = [];
        this.ObjLinkGenerationModel.AssessmentID = 0;
        
        this.lstInitialMail = [];
      this.ObjLinkGenerationModel.InitialMailId = 0;
      this.lstHrDetails = []; 
      this.ObjLinkGenerationModel.HrId = 0;
      this.lstFinalMail = [];
      this.ObjLinkGenerationModel.FinalMailId = 0;
      }
    
    this.MasterSvc.GetOthesMasterDetailBaseOnCompanyAndAssessmentId(CompanyId,AssessmentId).subscribe(data =>{
      if(data.IsSucess){
        this.lstInitialMail = data.InitialMailTemplate.map((e :any) =>({MailConfigId : e.MailConfigId,MailConfigName :e.MailConfigName}));
        this.lstFinalMail =data.FinalMailTemplate.map((e :any) =>({MailConfigId : e.MailConfigId,MailConfigName :e.MailConfigName}));
        this.lstHrDetails =data.HrDetails.map((e :any) =>({HrId : e.HrId,HrName :e.HrName}));
      }
    })
  }

  Onsubmitforgeneratelink(){
    this.submitted = true;
    this.loading = true;
    // Returns false if form is invalid
    if (this.GenerationLinkForm.invalid) {
      return;
    }

    this.LinkGenerationSvc.GenerateLinkBaseUserSelection(this.ObjLinkGenerationModel).subscribe(data =>{
      if(data.IsSucess){
        this.lstLinkGeneration = data.Links;
        this.dataSource = new MatTableDataSource(data.Links);
        this.dataSource.paginator = this.paginator;
        this.submitted = false;
        this.loading = false;
        this.message = "Link generated successfully"
        this.isVisible = true;
        setTimeout(()=> this.isVisible = false,2500); 
        this.GenerationLinkForm.reset();
        this.GenerationLinkForm.controls['IsReportSendToHr'].patchValue(false);
        this.GenerationLinkForm.controls['IsReportSendToCandidate'].patchValue(false);
      }
    })
  }

  OnExportToExcel(){

    this.loading = true;

    if(this.lstLinkGeneration.length == 0){
      alert('Data does not available for export to excel');
      this.loading = false;
      return;
    }
     /* pass here the table id */
     const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.lstLinkGeneration);
     /* generate workbook and add the worksheet */
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
     /* save to file */
     XLSX.writeFile(wb, "Downloadlinks.xlsx");
     this.loading = false;
  }


}
