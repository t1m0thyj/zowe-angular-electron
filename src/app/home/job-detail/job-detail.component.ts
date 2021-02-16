import { Component, OnInit, Input } from '@angular/core';
import { IJob, IJobFile } from '@zowe/zos-jobs-for-zowe-sdk';
import { JobService } from '../../core/services/jobs/job.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {

  @Input() job: IJob;
  files: IJobFile[];
  constructor(private js: JobService) {

  }

  async ngOnInit() {
    this.files = await this.js.getFiles(this.job);
    console.log(this.job.jobname)
    console.log(this.files)
    // console.log(this.files.length)
  }

  test() {
    // TODO
  }

}
