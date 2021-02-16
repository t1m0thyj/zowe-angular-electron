import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { JobService } from '../../core/services/jobs/job.service';
import { IJob } from '@zowe/zos-jobs-for-zowe-sdk';


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss', '../home.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ],
})

export class JobsComponent implements AfterViewInit {

  dataSource = new MatTableDataSource<IJob>([]);

  columnsToDisplay = ['jobname', 'jobid', 'status', 'retcode']; // IJob column titles
  columnTitles = ['Name', 'ID', 'Status', 'RC']; // IJob column titles

  expandedJob: IJob | null;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private js: JobService) {
  }

  async ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    await this.js.init();

    this.js.selectedJobs.subscribe((jobs) => {

      if (jobs) {
        this.dataSource.data = jobs;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setExpanded(job) {
    // TODO(Kelosky): broken
    console.log(`Expanded trigger clicked for ${job.name}`);
    this.expandedJob = this.expandedJob === job ? null : job;
  }

}
