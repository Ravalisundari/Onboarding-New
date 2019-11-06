import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserPermissions } from '../model/user-permissions';

@Injectable()
export class UserPermissionsService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = "UserPermissionDetails";
  }

  private handleError(error: any) {
    console.log(error);
    return Observable.throw(error.json().error || 'Server Error');
  }

  getUserById(userId: any): Observable<any> {
    var apiURL = "https://cognizantonline.sharepoint.com/sites/TestWeb/_api/lists/getbytitle('UserPermissions')/items?$filter=AssociateID eq " + userId;
    return this.httpClient.get(apiURL).pipe(map((response: any) => {
      debugger;
      console.log(response);
      if (response) {
        const userDetails = new UserPermissions(
          response.value[0].AssociateID,
          response.value[0].Title,
          response.value[0].Permissions
        );
        console.log(userDetails);
        return of(userDetails);
      }
      return of(null);
    }));
  }
}