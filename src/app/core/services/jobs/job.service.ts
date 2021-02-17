import { Injectable } from '@angular/core';
import { ElectronService } from '../electron/electron.service';
import { GetJobs, IJob, IJobFile } from '@zowe/zos-jobs-for-zowe-sdk';
import { SessionService } from '../session/session.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { AbstractSession } from '@zowe/imperative';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  getJobsApi: typeof GetJobs;
  selectedJobs: BehaviorSubject<IJob[]> = new BehaviorSubject(null);
  private jobFiles: Map<IJob, IJobFile[]> = new Map<IJob, IJobFile[]>();

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

        // TODO(Kelosky): load this behind the scenes so load happens quickly
        await this.updateJobFiles(session, jobs);
        this.selectedJobs.next(jobs);
      }
    });

  }

  public async downloadFile(file: IJobFile): Promise<string> {
    return await this.getJobsApi.getSpoolContent(this.ss.selectedSession.value, file);
  }

  public getFiles(job: IJob) {
    return this.jobFiles.get(job);
  }

  private async updateJobFiles(session: AbstractSession, jobs: IJob[]) {

    for (const job of jobs) {
      const jobFile = await this.getJobFiles(session, job);
      console.log(`job ${job.jobname} - ${jobFile.length}`)
      this.jobFiles.set(job, jobFile);
    }
  }

  private async getAllJobs(session: AbstractSession) {
    return await this.getJobsApi.getJobs(session);
  }

  private async getJobFiles(session: AbstractSession, job: IJob) {
    return await this.getJobsApi.getSpoolFilesForJob(session, job);
  }

}
