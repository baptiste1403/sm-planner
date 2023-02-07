import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-year-selector',
  templateUrl: './year-selector.component.html',
  styleUrls: ['./year-selector.component.css']
})
export class YearSelectorComponent implements OnInit {

  year: number = 0;

  constructor(private calendarService: CalendarService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.year = Number(this.route.snapshot.paramMap.get('year'));
  }

  onPreviousClick() {
    this.router.navigateByUrl(`/home/${--this.year}`);
  }

  onNextClick() {
    this.router.navigateByUrl(`/home/${++this.year}`);
  }
}
