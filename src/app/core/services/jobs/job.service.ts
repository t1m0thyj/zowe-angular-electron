import { Injectable } from '@angular/core';
import { ElectronService } from '../electron/electron.service';
import { GetJobs, IJob } from '@zowe/zos-jobs-for-zowe-sdk';
import { SessionService } from '../session/session.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  getJobsApi: typeof GetJobs;

  selectedJobs: BehaviorSubject<IJob[]> = new BehaviorSubject(null);

  constructor(private es: ElectronService, private ss: SessionService, private js: JobService) {
    if (this.es.isElectron) {
      this.getJobsApi = window.require('@zowe/zos-jobs-for-zowe-sdk').GetJobs;
    }
  }

  async init() {

    this.ss.selectedSession.subscribe(async (session) => {

      if (session != null) {

        console.log(`Got new session ${session.ISession.hostname}`);
        const jobs = await this.getAllJobs(session);
        this.selectedJobs.next(jobs);
      }
    });

  }

  private async getAllJobs(session) {
    return await this.getJobsApi.getJobs(session);
  }

}
