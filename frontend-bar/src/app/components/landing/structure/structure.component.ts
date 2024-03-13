import { Component, ElementRef, OnInit } from '@angular/core';
import { EventService } from '../../../services/event.service';
import { Event } from '../../../interfaces/event';

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrl: './structure.component.css'
})
export class StructureComponent implements OnInit {

  listEvent: Event[] = [];

  constructor(
    private el: ElementRef,
    private _eventService: EventService
  )
  {}




  ngOnInit(): void {
    this.loadScript('../../../../assets/js/landing/landing.js');
    this.getEvent();
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


  getEvent(){
    this._eventService.selectEventTop().subscribe((data: any) => {
     
      if (data && data.result && Array.isArray(data.result)) {
        const events = data.result[0];
        if (Array.isArray(events)) {
          this.listEvent = events;
        }
      }
    });
  }


}
