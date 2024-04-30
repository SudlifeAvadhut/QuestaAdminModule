export class LinkGenerationModel {

    AssessmentID : number;
    CompanyId : number;
    HrId : number;
    InitialMailId : number;
    FinalMailId : number;
    IsReportSendToHr : boolean = false;
    IsReportSendToCandidate : boolean = false;
    LinkCount : number;

}


export class DisplayLinkGeneration{
    Url : String;
    TestId : number;
}
