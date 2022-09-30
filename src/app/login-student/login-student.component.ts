import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder } from "@angular/forms"
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-student',
  templateUrl: './login-student.component.html',
  styleUrls: ['./login-student.component.css'],
})
export class LoginStudentComponent implements OnInit {

  public loginForm!: FormGroup
  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    })
  }

  login() {
    this.http.get<any>("http://localhost:3000/users")
      .subscribe(res => {
        const user = res.find((a: any) => {
          return a.email === this.loginForm.value.email
            && a.password === this.loginForm.value.password
        });
        if (user) {
          if (user.role !== 'student') {
            alert('You do not have access')
          } else {
            localStorage.setItem('username', user.eamil)
            localStorage.setItem('role', user.role)

            let ref = document.getElementById('cancelbtn')
            ref?.click();

            this.loginForm.reset();
            this.router.navigate(['StudentDashboard'])
          }
        } else {
          alert('username or password incorrect!!')
        }
      })

  }

}
