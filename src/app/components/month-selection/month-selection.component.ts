import { Component } from '@angular/core';
import { Month } from 'src/app/interfaces/month';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-month-selection',
  templateUrl: './month-selection.component.html',
  styleUrls: ['./month-selection.component.css']
})
export class MonthSelectionComponent {

  months?: Readonly<Month[]>;

  constructor(public calendarService: CalendarService) {}

  ngOnInit() {
    this.months = this.calendarService.getMonths();
  }
}
