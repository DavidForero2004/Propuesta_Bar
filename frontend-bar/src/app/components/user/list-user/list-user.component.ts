import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../services/error.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddOrEditUserComponent } from '../add-or-edit-user/add-or-edit-user.component';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'email', 'status', 'rol', 'action'];
  dataSource = new MatTableDataSource<User>;
  userDelete: string = '';
  removed: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  // listUser: User[] = [];

  constructor(private _userService: UserService,
    public dialog: MatDialog,
    private _errorService: ErrorService,
    private toastr: ToastrService,
    private translate: TranslateService) {
    this.dataSource = new MatTableDataSource();

    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');

    this.translate.get('deleteUser').subscribe((res: string) => {
      this.userDelete = res;
    });

    this.translate.get('removed').subscribe((res: string) => {
      this.removed = res;
    });
  }

  ngOnInit(): void {
    this.getUser();
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

  getUser() {
    this._userService.getUser().subscribe((data: any) => {
      if (data && data.result && Array.isArray(data.result)) {
        const result = data.result[0];
        // Check if the first element of result is an array of users
        if (Array.isArray(result)) {
          // Assign users to listUser
          // this.listUser = result;
          this.dataSource.data = result;
        }
      }
    });
  }

  addUser(id?: number) {
    // console.log(id);
    const dialogRef = this.dialog.open(AddOrEditUserComponent, {
      width: '550px',
      disableClose: true,
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      if (result) {
        this.getUser();
      }
    });
  }

  deleteUser(id: number) {
    this._userService.deleteUser(id).pipe(
      catchError((error: HttpErrorResponse) => {
        this._errorService.msjError(error);
        return throwError(error);
      })
    ).subscribe(() => {
      this.getUser();
      this.toastr.success(this.userDelete, this.removed);
    });;
  }

  es() {
    this.translate.use('es');
    this._userService.updateServerLanguage('es').subscribe(() => { });
  }

  en() {
    this.translate.use('en');
    this._userService.updateServerLanguage('en').subscribe(() => { });
  }
}
