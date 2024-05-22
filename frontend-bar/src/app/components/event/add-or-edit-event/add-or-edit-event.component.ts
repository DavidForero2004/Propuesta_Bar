import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventService } from '../../../services/event.service';
import { ErrorService } from '../../../services/error.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Events } from '../../../interfaces/event';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { format } from 'date-fns';

@Component({
  selector: 'app-add-or-edit-event',
  templateUrl: './add-or-edit-event.component.html',
  styleUrl: './add-or-edit-event.component.css'
})

export class AddOrEditEventComponent implements OnInit {
  myFilter = (d: Date | null): boolean => {
    const today = new Date();

    if (!d) {
      return false;
    }

    today.setHours(0, 0, 0, 0);

    return !(d < today);
  };

  form: FormGroup;
  loading: boolean = false;
  eventSave: string = '';
  aggregate: string = '';
  eventUpdate: string = '';
  edited: string = '';
  operation: string = '';
  id: number | undefined;

  constructor(
    public dialogRef: MatDialogRef<AddOrEditEventComponent>,
    private fb: FormBuilder,
    private _eventService: EventService,
    private _errorService: ErrorService,
    private toastr: ToastrService,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DATE_LOCALE) private dateLocale: string,
    private datePipe: DatePipe,
    private dateAdapter: DateAdapter<any>
  ) {
    this.form = this.fb.group({
      name_event: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });

    this.id = data.id;

    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');

    this._eventService.updateServerLanguage('es').subscribe(() => { });

    this.translate.get(['add','saveEvent','aggregate','editEvent','edited']).subscribe((res: any) => {
      this.operation = res.add;
      this.eventSave = res.saveEvent;
      this.aggregate = res.aggregate;
      this.eventUpdate = res.editEvent;
      this.edited = res.edited;
    });
  };

  ngOnInit(): void {
    this.isEdit(this.id)
  }

  cancel() {
    this.dialogRef.close(false);
  }

  isEdit(id: number | undefined) {
    if (id !== undefined) {
      this.translate.get('edit').subscribe((res: string) => {
        this.operation = res;
      });

      this.getEventId(id);
    }
  }

  getEventId(id: number) {
    this._eventService.getEventId(id).subscribe((data: any) => {
      if (data && data.result && Array.isArray(data.result)) {
        const resultArray = data.result;
        if (resultArray.length > 0) {
          const firstArray = resultArray[0];
          if (firstArray.length > 0 && typeof firstArray[0] === 'object') {
            const eventObject = firstArray[0];
            const eventDate = new Date(eventObject.date);
            const formattedDate = new Date(eventDate);
            const timeString = this.datePipe.transform(eventDate, 'HH:mm');

            this.form.patchValue({
              name_event: eventObject.name_event,
              date: formattedDate,
              time: timeString
            });

          }
        }
      }
    });
  }


  addEvent() {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const selectedDate = new Date(this.form.get('date')?.value);
    selectedDate.setHours(0, 0, 0, 0);

    if (this.form.invalid) {
      return;
    }

    if (selectedDate.getTime() === currentDate.getTime()) {
      const currentTime = new Date();
      const timeInput = this.form.get('time')?.value;
      const inputHour = parseInt(timeInput.split(':')[0], 10);
      const inputMinute = parseInt(timeInput.split(':')[1], 10);

      if (inputHour < currentTime.getHours() ||
        (inputHour === currentTime.getHours() && inputMinute < currentTime.getMinutes())) {
        this.loading = false;
        this.translate.get('invalidTime').subscribe((res: string) => {
          this.toastr.error(res, 'Error');
        });

        return;
      }
    }

    const getDate = this.form.get('date')?.value;
    const getTime = this.form.get('time')?.value;

    const combinedDate = this.datePipe.transform(getDate, 'YYYY-MM-dd');
    const formatdatetime = combinedDate + ' ' + getTime;

    const formatdate = this.datePipe.transform(formatdatetime, 'YYYY-MM-dd HH:mm:ss');

    this.loading = true;

    if (this.id === undefined) {
      if (formatdate !== null) {
        const event: Events = {
          name_event: this.form.value.name_event,
          dateString: formatdate,
        };

        setTimeout(() => {
          this._eventService.addEvent(event).pipe(
            catchError((error: HttpErrorResponse) => {
              this.loading = false;
              this._errorService.msjError(error);
              return throwError(error);
            })
          ).subscribe(() => {
            this.loading = false;
            this.dialogRef.close(true);
            this.toastr.success(this.eventSave, this.aggregate);
          });
        }, 200);
      }
    } else {
      if (formatdate !== null) {
        const event: Events = {
          id: this.id,
          name_event: this.form.value.name_event,
          dateString: formatdate,
        }

        setTimeout(() => {
          this._eventService.updateEvent(event).pipe(
            catchError((error: HttpErrorResponse) => {
              this.loading = false;
              this._errorService.msjError(error);
              return throwError(error);
            })
          ).subscribe(() => {
            this.loading = false;
            this.dialogRef.close(true);
            this.toastr.success(this.eventUpdate, this.edited);
          });
        }, 200);
      }
    }
  }

  es() {
    this.translate.use('es');
    this._eventService.updateServerLanguage('es').subscribe(() => { });
    this.dateAdapter.setLocale('es');
  }

  en() {
    this.translate.use('en');
    this._eventService.updateServerLanguage('en').subscribe(() => { });
    this.dateAdapter.setLocale('en');
  }
}
