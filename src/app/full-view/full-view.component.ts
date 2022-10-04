import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResultModel } from '../teacher-dashboard/result.model';

@Component({
  selector: 'app-full-view',
  templateUrl: './full-view.component.html',
  styleUrls: ['./full-view.component.css']
})
export class FullViewComponent implements OnInit {

  constructor(private router : Router) { }

  result: ResultModel = new ResultModel();

  ngOnInit(): void {
    this.result = history.state.RESULT;
  }
  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    this.router.navigate([''])
  }

}
