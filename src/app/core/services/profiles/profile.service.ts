import { Injectable } from '@angular/core';
import { ElectronService } from '../electron/electron.service';
import { CliProfileManager, IProfileLoaded } from '@zowe/imperative';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private initialized = false;

  cliProfileManagerApi: typeof CliProfileManager;

  selectedProfile: BehaviorSubject<IProfileLoaded> = new BehaviorSubject(null);
  allProfiles: BehaviorSubject<IProfileLoaded[]> = new BehaviorSubject(null);

  constructor(private es: ElectronService) {
    if (this.es.isElectron) {
      this.cliProfileManagerApi = window.require('@zowe/imperative').CliProfileManager;
    }

    this.init();
  }

  private async init() {
    this.current = await this.getZosmfDefault();
    this.all = await this.getAllZosmf();
  }

  private async getZosmfDefault() {
    return new this.cliProfileManagerApi({
      profileRootDirectory: this.es.path.join(this.getZoweDir(), 'profiles'),
      type: 'zosmf'
    }).load({ loadDefault: true });

  }

  private async getAllZosmf() {
    const profiles = await new this.cliProfileManagerApi({
      profileRootDirectory: this.es.path.join(this.getZoweDir(), 'profiles'),
      type: `zosmf`
    }).loadAll();

    return profiles.filter((profile) => {
      return profile.type === `zosmf`;
    });
  }

  /**
   * Allow setting of current by other services and components so that we can have a default for the
   * duration of the application that does not reset the default set via the zowe CLI.
   * @memberof ProfileService
   */
  set current(profile: IProfileLoaded) {
    console.log(`Setting next current`);
    this.selectedProfile.next(profile);
  }

  private set all(profiles: IProfileLoaded[]) {
    console.log(`Setting next all`);
    this.allProfiles.next(profiles);
  }

  private getZoweDir(): string {
    const imperativeConfigApi = window.require('@zowe/imperative').ImperativeConfig;
    imperativeConfigApi.instance.loadedConfig = {
      defaultHome: this.es.path.join(this.es.os.homedir(), ".zowe"),
      envVariablePrefix: "ZOWE",
    };
    return imperativeConfigApi.instance.cliHome;
  }
}
