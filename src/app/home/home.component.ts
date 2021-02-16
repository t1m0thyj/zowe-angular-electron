import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { getDefaultProfile } from "@zowe/core-for-zowe-sdk";
import { GetJobs, IJob } from "@zowe/zos-jobs-for-zowe-sdk";
import { ISession, Logger, LoggingConfigurer, Session } from "@zowe/imperative";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  jobs: IJob[];

  constructor(private router: Router) { }

  async ngOnInit(): Promise<void> {
    // init file logger for imperative
    Logger.initLogger(LoggingConfigurer.configureLogger(".sample", { name: "sample" }));

    // load default zosmf profile merged with base profile
    const profile = await getDefaultProfile("zosmf", true);

    // convert profile to connection info object
    const connectionInfo: ISession = {
      hostname: profile.host,
      port: profile.port,
      type: "basic",
      user: profile.user,
      password: profile.password,
      rejectUnauthorized: profile.rejectUnauthorized
    };

    // create a session & get jobs
    const session = new Session(connectionInfo);
    this.jobs = await GetJobs.getJobs(session);
  }

}
