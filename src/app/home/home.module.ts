import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { IndeterminateLoadingComponent } from './indeterminate-loading/indeterminate-loading.component';
import { JobsComponent } from './jobs/jobs.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobFileComponent } from './job-file/job-file.component';

@NgModule({
  declarations: [HomeComponent, ToolbarComponent, IndeterminateLoadingComponent, JobsComponent, ProfilesComponent, JobDetailComponent, JobFileComponent],
  imports: [CommonModule,
    SharedModule,
    HomeRoutingModule,
    MaterialModule,
  ]
})
export class HomeModule {}
