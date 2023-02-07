import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Month } from 'src/app/interfaces/month';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-month-preview',
  templateUrl: './month-preview.component.html',
  styleUrls: ['./month-preview.component.css']
})
export class MonthPreviewComponent {
  @Input('month') month?: Month;

  constructor(private calendarService: CalendarService,
    private router: Router,
    private route: ActivatedRoute) { }

  getMonthName(): string {
    return this.month?.name || '';
  }

  onSelected() {
    this.calendarService.setSelectedMonth(this.month?.monthNumber);
    this.router.navigateByUrl(`/home/${this.route.snapshot.paramMap.get('year')}/${this.month?.monthNumber}`);
  }
}
