import { Component, OnInit, Input } from '@angular/core';
import { IJob } from '@zowe/zos-jobs-for-zowe-sdk';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {

  @Input() job: IJob;
  constructor() { }

  ngOnInit() {
    console.log(this.job)
  }

}
