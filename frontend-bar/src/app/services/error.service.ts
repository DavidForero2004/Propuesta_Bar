import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private toastr: ToastrService,
    private translate: TranslateService) {
    }

  msjError(e: HttpErrorResponse) {
    if (e.error.msg) {
      this.toastr.error(e.error.msg, 'Error')
    } else {
      this.translate.get('errorOccurred').subscribe((res: string) => {
        this.toastr.error(res, 'Error');
      });
    }
  }
}