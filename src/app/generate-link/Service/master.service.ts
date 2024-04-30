import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiURL = environment.apiURL;
  constructor(private _http: HttpClient) { }

  GetAllCompanyDetailsForGeneratingLink(): Observable<any> {
    return this._http.get<any>(this.apiURL +'api/v1/GetAllCompanyDetailForGeneratingLink');
  }

  GetAllAssessmentDetailsBaseOnAssessmentId(CompanyId: number): Observable<any> {
    return this._http.get<any>(this.apiURL +'api/v1/GetAllAssessmentDetailsBaseOnCompany/' + CompanyId );
  }

  GetOthesMasterDetailBaseOnCompanyAndAssessmentId(CompanyId : number, AssessmentId: number): Observable<any> {
    return this._http.get<any>(this.apiURL +'api/v1/GetOthesMasterDetailBaseOnCompanyAndAssessmentId/' +CompanyId +'/'+ AssessmentId);
  }
}
