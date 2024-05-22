import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RolService } from '../../../services/rol.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ErrorService } from '../../../services/error.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Rol } from '../../../interfaces/rol';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EventService } from '../../../services/event.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AddOrEditRolComponent } from '../add-or-edit-rol/add-or-edit-rol.component';

@Component({
  selector: 'app-list-rol',
  templateUrl: './list-rol.component.html',
  styleUrl: './list-rol.component.css'
})

export class ListRolComponent implements OnInit, AfterViewInit {
  dataSources = new MatTableDataSource<Rol>;
  displayedColumns: string[] = ['name', 'action'];
  rolDelete: string = '';
  removed: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _rolService: RolService,
    public dialog: MatDialog,
    private _errorService: ErrorService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {
    this.dataSources = new MatTableDataSource();

    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');

    this._rolService.updateServerLanguage('es').subscribe(() => { });

    this.translate.get(['deleteRol','removed']).subscribe((res: any) => {
      this.rolDelete = res.deleteRol;
      this.removed = res.removed;
    });
  }

  ngOnInit(): void {
    this.getRol();
  }

  ngAfterViewInit(): void {
    this.dataSources.paginator = this.paginator;
    this.dataSources.sort = this.sort;
  }

  rolFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSources.filter = filterValue.trim().toLowerCase();

    if (this.dataSources.paginator) {
      this.dataSources.paginator.firstPage();
    }
  }

  getRol() {
    this._rolService.getRol().subscribe((data: any) => {
      if (data && data.result && Array.isArray(data.result)) {
        const result = data.result[0];
        if (Array.isArray(result)) {
          this.dataSources.data = result;
        }
      }
    });
  }
  addRol(id?: number) {
    const dialogRef = this.dialog.open(AddOrEditRolComponent, {
      width: '550px',
      disableClose: true,
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getRol();
      }
    });
  }

  deleteRol(id: number) {
    this._rolService.deleteRol(id).pipe(
      catchError((error: HttpErrorResponse) => {
        this._errorService.msjError(error);
        return throwError(error);
      })
    ).subscribe(() => {
      this.getRol();

      this.toastr.success(this.rolDelete, this.removed);
    });;
  }

  translateRolName(rolName: string | undefined): string {
    if (typeof rolName === 'string') {
      const translatedName = this.translate.instant(`role.${rolName}`);
      return translatedName !== `role.${rolName}` ? translatedName : '';
    } else {
      return '';
    }
  }

  es() {
    this.translate.use('es');
    this._rolService.updateServerLanguage('es').subscribe(() => { });
  }

  en() {
    this.translate.use('en');
    this._rolService.updateServerLanguage('en').subscribe(() => { });
  }
}
