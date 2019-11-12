import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap, catchError } from 'rxjs/operators'
import { UserPermissions } from './header/model/user-permissions';
import { UserInfoService } from '../providers/services/user-info.service';
import { UserPermissionsService } from './header/service/user-permissions.service';

@Injectable({
  providedIn: 'root'
})
export class UserPermissionResolverService implements Resolve<any> {

  userDetail: any;
  formDigestDetail: any;
  user: UserPermissions;
  userId: string;

  constructor(private httpClient: HttpClient, private route: Router,
    private userInfoService: UserInfoService, private userPermissionsService: UserPermissionsService) { }

  resolve() {

    var siteUrl = "https://cognizantonline.sharepoint.com/sites/TestWeb/_api/web/currentuser";
    this.httpClient.get(siteUrl, {
      headers:
      {
        "accept": "application/json;odata=verbose",
        "contentType": "text/xml"
      }
    }).subscribe((response: any) => {
      this.userDetail = response.d;
      this.userInfoService.setUserInfo(response.d);
      this.userId = response.d.UserPrincipalName.substr(0, 6);
      if (this.userId != "" && this.userId != undefined && this.userId != null) {
        this.userPermissionsService.getUserById(this.userId)
          .subscribe(model => {
            this.user = model.value;
            if (this.user != undefined && this.user != null) {
              console.log(this.user);
            }
            else if (!this.route.url.includes("plan-detail")) {
              this.route.navigateByUrl('/unauthorisedAccess');
            }
          });
      }
    }, error => {
      console.log(error);
    });
  }
}