import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LinkGenerationModel } from '../model/link-generation-model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LinkGenerationService {

  apiURL = environment.apiURL;
  constructor(private _http: HttpClient) { }

  GenerateLinkBaseUserSelection(ObjLnkGeneration: LinkGenerationModel): Observable<any> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    var body = {
      AssessmentID : ObjLnkGeneration.AssessmentID,
      CompanyId : ObjLnkGeneration.CompanyId,
      HrId : ObjLnkGeneration.HrId,
      InitialMailId : ObjLnkGeneration.InitialMailId,
      FinalMailId : ObjLnkGeneration.FinalMailId,
      IsReportSendToHr : ObjLnkGeneration.IsReportSendToHr,
      IsReportSendToCandidate : ObjLnkGeneration.IsReportSendToCandidate,
      LinkCount : ObjLnkGeneration.LinkCount
    }
    let options = {
      headers: headers
    }
    return this._http.post<any>(this.apiURL + 'api/v1/GenerateLinkBaseUserSelection', body, options);
  }


}
