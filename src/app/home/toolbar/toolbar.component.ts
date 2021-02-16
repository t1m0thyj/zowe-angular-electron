import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../core/services/profiles/profile.service';
import { IProfileLoaded } from '@zowe/imperative';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  profiles: IProfileLoaded[] = [];
  currentProfile: IProfileLoaded;

  constructor(private ps: ProfileService) { }

  async ngOnInit() {

    this.ps.selectedProfile.subscribe(async (profile) => {
      console.log(`Profile loaded ${profile.name}`);
      this.currentProfile = profile;
    });

    this.ps.allProfiles.subscribe(async (profiles) => {
      this.profiles = profiles.filter((prof) => prof.name !== this.currentProfile.name); // filter out the default
    });

  }

  change(profile: IProfileLoaded) {
    console.log(`Changed default profile to ${profile.name}`);
    this.ps.current = profile;
  }

}
