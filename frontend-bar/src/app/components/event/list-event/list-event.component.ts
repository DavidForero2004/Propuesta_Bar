import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Events } from '../../../interfaces/event';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EventService } from '../../../services/event.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorService } from '../../../services/error.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { AddOrEditEventComponent } from '../add-or-edit-event/add-or-edit-event.component';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrl: './list-event.component.css'
})

export class ListEventComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name_event', 'date', 'action'];
  dataSource = new MatTableDataSource<Events>;
  eventDelete: string = '';
  removed: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _eventService: EventService,
    public dialog: MatDialog,
    private _errorService: ErrorService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {
    this.dataSource = new MatTableDataSource();

    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');

    this._eventService.updateServerLanguage('es').subscribe(() => { });

    this.translate.get(['deleteEvent','removed']).subscribe((res: any) => {
      this.eventDelete = res.deleteEvent;
      this.removed = res.removed;
    });
  }

  ngOnInit(): void {
    this.getEvent();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  eventFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refresh() {
    this.getEvent();
  }

  getEvent() {
    this._eventService.getEvent().subscribe((data: any) => {
      if (data && data.result && Array.isArray(data.result)) {
        const result = data.result[0];
        if (Array.isArray(result)) {
          this.dataSource.data = result;
        }
      }
    });
  }

  addEvent(id?: number) {
    const dialogRef = this.dialog.open(AddOrEditEventComponent, {
      width: '550px',
      disableClose: true,
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getEvent();
      }
    });
  }

  deleteEvent(id: number) {
    this._eventService.deleteEvent(id).pipe(
      catchError((error: HttpErrorResponse) => {
        this._errorService.msjError(error);
        return throwError(error);
      })
    ).subscribe(() => {
      this.getEvent();
      this.toastr.success(this.eventDelete, this.removed);
    });
  }

  es() {
    this.translate.use('es');
    this._eventService.updateServerLanguage('es').subscribe(() => { });
  }

  en() {
    this.translate.use('en');
    this._eventService.updateServerLanguage('en').subscribe(() => { });
  }
}
