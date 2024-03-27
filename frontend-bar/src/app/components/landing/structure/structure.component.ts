import { Component, ElementRef, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { Event } from '../../../interfaces/event';
import { CalendarOptions, EventInput } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrl: './structure.component.css'
})
export class StructureComponent implements OnInit {

  listEvent: Event[] = [];
  public eventCalendar: any[] = [];


  constructor(
    private el: ElementRef,
    private _eventService: EventService,
    private translate: TranslateService,
  ) {
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');
  }

  ngOnInit(): void {
    this.loadScript('../../../../assets/js/landing/landing.js');
    this.getEvent();
    this.getEventCalendar();
  }

  private loadScript(url: string): void {
    if (typeof document !== 'undefined') {
      const script = document.createElement('script');
      script.src = url;
      script.type = 'text/javascript';
      script.async = true;
      script.defer = true;
      this.el.nativeElement.appendChild(script);
    }
  }



  getEvent() {
    this._eventService.selectEventTop().subscribe((data: any) => {

      if (data && data.result && Array.isArray(data.result)) {
        const events = data.result[0];
        if (Array.isArray(events)) {
          this.listEvent = events;
        }
      }
    });
  }

  getEventCalendar() {
    this._eventService.selectEventTop().subscribe((data: any) => {
      if (data && data.result && Array.isArray(data.result)) {
        const events = data.result[0];
        if (Array.isArray(events)) {
          this.eventCalendar = events.map(event => ({
            //le pasamos a un objeto los datos que va a usar el calendario
            title: event.name_event + ' \u2013 ' + 'El Evento: ' + event.name_event + ' es el día: ' + event.day + ' de ' + event.month + ' a las: ' + event.hour,
            date: event.date ? new Date(event.date).toISOString().split('T')[0] : null,
            start: event.date,
            end: event.date,
            backgroundColor: '#3A0709',
            borderColor: '#3A0709',
            
          }));

          // Aquí inicializamos calendarOptions con los eventos actualizados
          this.calendarOptions = {
            headerToolbar: {
              left: 'prev next today dayGridMonth',
              center: 'title',
              right: 'dayGridWeek dayGridDay prevYear nextYear',
            },
            locale: esLocale,
            initialView: 'dayGridMonth',
            windowResize: function(arg) {
            },
            plugins: [dayGridPlugin, interactionPlugin],
            navLinks: true,
            events: this.eventCalendar,

          };
        }
      }
    });
  }
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev next today dayGridMonth',
      center: 'title',
      right: 'dayGridWeek dayGridDay prevYear nextYear',
    },
    locale: esLocale,
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    navLinks: true,
    events: this.eventCalendar,
  };


  es() {
    this.translate.use('es');
    this._eventService.updateServerLanguage('es').subscribe(() => {
      console.log('Idioma del servidor actualizado a español.');
    });
  }

  en() {
    this.translate.use('en');
    this._eventService.updateServerLanguage('en').subscribe(() => {
      console.log('Server language updated to English.');
    });
  }


}
