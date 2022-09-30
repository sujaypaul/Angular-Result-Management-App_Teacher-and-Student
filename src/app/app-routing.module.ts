import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginStudentComponent } from './login-student/login-student.component';
import { LoginTeacherComponent } from './login-teacher/login-teacher.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './service/auth.guard';
import { TeacherAuthGuard } from './service/teacher-auth.guard';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'Teacher', component: LoginTeacherComponent },
  { path: 'Student', component: LoginStudentComponent },

  {
    path: 'StudentDashboard',
    component: StudentDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'TeacherDashboard',
    component: TeacherDashboardComponent,
    canActivate: [TeacherAuthGuard]
  },

  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
