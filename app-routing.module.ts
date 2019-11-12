import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssociatePlanComponent } from './associate-plan/associate-plan.component';
import { DashBoardComponent } from './dashboard/dashboard.component';
import { AssociateDetailComponent } from './associate-details/associateDetail.component';
import { AssociateListComponent } from './associate-details/associateList.component';
import { CourseListComponent } from './course-details/course-list.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { UserRoleDetailsComponent } from './course-group/user-role-details/user-role-details.component';
import { UserroleComponent } from './course-group/userrole/userrole.component';
import { GroupCourseComponent } from './group-course/group-course.component';
import { UnauthorisedComponent } from '../common/unauthorised/unauthorised.component';
import { UserPermissionResolverService } from '../common/user-permission-resolver.service';

const routes: Routes = [
    {
        path: 'onboarding',
        resolve: {
            onboarding: UserPermissionResolverService
        },
        children: [
            {
                path: '',
                component: DashBoardComponent
            },
            {
                path: 'dashboard',
                component: DashBoardComponent
            },
            {
                path: 'plan-detail',
                component: AssociatePlanComponent
            },
            {
                path: 'associate-List',
                component: AssociateListComponent
            },
            {
                path: 'associate-details',
                component: AssociateDetailComponent
            },
            {
                path: 'associate-details/:id',
                component: AssociateDetailComponent
            },
            { path: 'course-detail', component: CourseListComponent },
            { path: 'course-detail/add', component: CourseDetailsComponent },
            { path: 'course-detail/edit/:id', component: CourseDetailsComponent },
            { path: 'user-role/add', component: UserRoleDetailsComponent },
            { path: 'user-role/edit/:id', component: UserRoleDetailsComponent },
            { path: 'user-role-detail', component: UserroleComponent },
            { path: 'add-plan-detail', component: GroupCourseComponent },
            { path: 'unauthorisedAccess', component: UnauthorisedComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]    
})
export class OnboardingRoutingModule { }
