import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../core/services';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss', '../home.component.scss']
})
export class ProfilesComponent implements OnInit {

  constructor(private ps: ProfileService) { }

  ngOnInit() {


  }

  get containers() {
    return [];  // TODO
  }

  add() {
    // TODO
  }

  edit(container: any) {
    // TODO
  }

  launch(container: any) {
    // TODO
  }

}
