import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { ResultModel } from '../teacher-dashboard/result.model';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  public searchForm!: FormGroup
  found !: boolean;
  notFound !: boolean;

  resultObj: ResultModel = new ResultModel();

  // example !: any;

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private api: ApiService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      RollNo: ['', Validators.required],
      DOB: ['', Validators.required]
    })
  }

  search() {
    if (this.searchForm.valid) {
      this.getResult();
    }
  }

  getResult() {
    this.api.getResults()
      .subscribe(res => {
        const result = res.find((a: any) => {

          if (a.RollNo === this.searchForm.value.RollNo
            && a.DOB === this.searchForm.value.DOB)
            return a;

          return null;
        });
        if (result !== undefined) {
          this.found = true;
          this.notFound = false;

          this.searchForm.reset();

          this.resultObj = result;

        } else {
          this.found = false;
          this.notFound = true;
        }
      })
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    this.router.navigate([''])
  }

  redirect() {
    let ref = document.getElementById('close')
    ref?.click();
    this.router.navigate(['ResultView'], { state: { RESULT: this.resultObj } });
  }

}
