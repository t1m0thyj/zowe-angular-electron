import { Component, OnInit, Input } from '@angular/core';
import { IJob, IJobFile } from '@zowe/zos-jobs-for-zowe-sdk';
import { ElectronService, JobService } from '../../core/services';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {

  @Input() job: IJob;
  files: IJobFile[];
  constructor(private js: JobService, private es: ElectronService) {

  }

  ngOnInit() {
    this.files = this.js.getFiles(this.job);
    console.log(this.job.jobname)
    console.log(this.files)
    // console.log(this.files.length)
  }

  async open(file: IJobFile) {
    const spoolContent = await this.js.downloadFile(file);
    const outFile = this.es.path.join(this.es.os.tmpdir(), `${file.jobname}_${file.ddname}.txt`);
    this.es.fs.writeFileSync(outFile, spoolContent);
    this.es.remote.shell.openPath(outFile);
  }

}
