import { Injectable } from '@angular/core';
import { ElectronService } from '../electron/electron.service';
import { IProfile, ISession, Session } from '@zowe/imperative';
// import { ZosmfSession } from '@zowe/cli';
import { ProfileService } from '../profiles/profile.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  sessionApi: typeof Session;
  // zosmfSessionApi: typeof ZosmfSession;

  selectedSession: BehaviorSubject<Session> = new BehaviorSubject(null);

  constructor(private es: ElectronService, private ps: ProfileService) {
    if (this.es.isElectron) {
      this.sessionApi = window.require('@zowe/imperative').Session;
      // this.zosmfSessionApi = window.require('@zowe/cli').ZosmfSession;
    }

    this.ps.selectedProfile.subscribe(async (profile) => {

      if (profile != null) {

        console.log(`Got new profile ${profile.name}`);
        const session = this.createBasicZosmfSession(profile.profile);
        console.log(`Got session ${session.ISession.hostname}`);

        console.log(`Setting next`);
        this.selectedSession.next(session);
      }
    });
  }

  private createBasicZosmfSession(profile: IProfile): Session {
    const connectionInfo = profile as ISession;
    connectionInfo.hostname = profile.host;
    connectionInfo.type = (profile.user != null && profile.password != null) ? "basic" : "token";
    return new Session(connectionInfo);
  }

}
