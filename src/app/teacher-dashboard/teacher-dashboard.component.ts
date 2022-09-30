import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { ResultModel } from './result.model';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {

  resultModelObj: ResultModel = new ResultModel();
  formValue !: FormGroup;
  submitted = false;

  id !: any;
  resultsData !: any;
  length !: number;
  showAdd !: boolean;
  showEdit !: boolean;


  constructor(private formbuilder: FormBuilder, 
    private api: ApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllResults();

    this.formValue = this.formbuilder.group({
      RollNo: ['', Validators.required],
      Name: ['', Validators.required],
      DOB: ['', Validators.required],
      Score: ['', Validators.required]
    })
  }

  getAllResults() {
    this.api.getResults()
      .subscribe(res => {
        this.resultsData = res;
        this.length = res.length;
      })
  }

  get formControl() {
    return this.formValue.controls;
  }

  Valid() {
    this.submitted = true;
    if (this.formValue.valid) {
      return true;
    }
    else {
      return false;
    }
  }

  onAdd() {
    this.showAdd = true;
    this.showEdit = false;
    this.formValue.reset();
    this.submitted = false;
  }

  postResult() {
    if (this.Valid()) {
      this.resultModelObj.RollNo = this.formValue.value.RollNo;
      this.resultModelObj.Name = this.formValue.value.Name;
      this.resultModelObj.DOB = this.formValue.value.DOB;
      this.resultModelObj.Score = this.formValue.value.Score;

      this.api.postResult(this.resultModelObj)
        .subscribe(res => {
          console.log(res);


          let ref = document.getElementById('canceladd')
          ref?.click();

          window.location.reload();
          alert("Result Added Successfully")
        })
    }
  }

  deleteResult(row: any) {
    this.api.deleteResult(row.id)
      .subscribe(res => {
        alert("Record Deleted")
        this.getAllResults();
      })
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showEdit = true;

    this.id = row.id;
    this.formValue.controls['RollNo'].setValue(row.RollNo);
    this.formValue.controls['Name'].setValue(row.Name);
    this.formValue.controls['DOB'].setValue(row.DOB);
    this.formValue.controls['Score'].setValue(row.Score);
  }

  editResult() {
    if (this.Valid()) {
      this.resultModelObj.RollNo = this.formValue.value.RollNo;
      this.resultModelObj.Name = this.formValue.value.Name;
      this.resultModelObj.DOB = this.formValue.value.DOB;
      this.resultModelObj.Score = this.formValue.value.Score;

      this.api.updateResult(this.resultModelObj, this.id)
        .subscribe(res => {
          console.log(res);

          let ref = document.getElementById('canceledit')
          ref?.click();

          this.formValue.reset();
          alert("Result Updated Successfully")
          window.location.reload();

        })
    }
  }

  logout(){
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    this.router.navigate([''])
  }

}
