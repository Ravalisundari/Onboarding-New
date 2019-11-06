import { Component, OnInit, Input } from '@angular/core';
import { UserInfoService } from 'src/app/providers/services/user-info.service';
import { HttpClient } from '@angular/common/http';
import { UserPermissionsService } from './service/user-permissions.service';
import { UserPermissions } from './model/user-permissions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  status: string;
  userDetail: any;
  formDigestDetail: any;
  user: UserPermissions;

  routeDetails: any;

  routePath = [
    { "path": "onboarding/course-detail", "displayName": "Course Details", "category": "Onboarding", "isOther": false },
    { "path": "onboarding/user-role-detail", "displayName": "User Group Details", "category": "Onboarding", "isOther": false },
    { "path": "onboarding/add-plan-detail", "displayName": "Raise Onboarding", "category": "Onboarding", "isOther": false },
    { "path": "onboarding/plan-detail", "displayName": "Plan Detail", "category": "Onboarding", "isOther": true },
    { "path": "onboarding/dashboard", "displayName": "Dashboard", "category": "Onboarding", "isOther": false }
  ];

  constructor(private httpClient: HttpClient,
    private userInfoService: UserInfoService, private userPermissionsService: UserPermissionsService) { }

  ngOnInit(): void {
    this.getFormDigest();
    this.getUserInfo();
  }

  public getUserInfo() {
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

      const userId = response.d.UserPrincipalName.substr(0, 6);

      if (userId != "" && userId != undefined && userId != null) {
        this.userPermissionsService.getUserById(userId)
          .subscribe(model => {
            this.user = model.value;
            if (this.user != undefined && this.user != null) {
              this.routeDetails = this.routePath;
            } else {
              this.routeDetails = this.routePath.filter(route => route.isOther == true);
            }
          });
      }
    }, error => {
      console.log(error);
    });
  }

  public getFormDigest() {
    let options = {
      "accept": "application/json;odata=verbose",
      "contentType": "text/xml"
    };

    var siteUrl = "https://cognizantonline.sharepoint.com/sites/TestWeb/_api/contextinfo";
    this.httpClient.post(siteUrl, options).subscribe((response: Response) => {
      this.formDigestDetail = response;
    }, error => {
      console.log(error);
    });
  }

  setStatus = message => {
    this.status = message;
  };
}
