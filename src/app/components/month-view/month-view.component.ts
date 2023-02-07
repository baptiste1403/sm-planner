import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Month } from 'src/app/interfaces/month';
import { ApiService } from 'src/app/services/api.service';
import { CalendarService } from 'src/app/services/calendar.service';
import { AddPopupComponent } from '../add-popup/add-popup.component';

@Component({
  selector: 'app-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.css']
})
export class MonthViewComponent implements OnInit, AfterViewInit{

  year?: number;

  month?: Month;

  offset?: number;

  daysInMonth?: number[];

  showPopup: boolean = false;

  postData: any;

  @ViewChild(AddPopupComponent) popup!: AddPopupComponent;

  constructor(private calendarService: CalendarService,
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService) { }

  ngAfterViewInit(): void {
    console.log(this.popup);
  }

  ngOnInit(): void {
    this.year = Number(this.route.snapshot.paramMap.get('year'));
    this.month = this.calendarService.getMonthByNumber(Number(this.route.snapshot.paramMap.get('month')));

    if(this.month) {
      this.offset = new Date(this.year, this.month.monthNumber-1, 1).getDay();
      const nbDays = new Date(this.year, this.month.monthNumber-1, 0).getDate();
      this.daysInMonth = Array.from({length: nbDays}, (_, i) => i + 1)
      console.log(nbDays);
    }
    
    this.initPosts();
  }

  initPosts() {
    this.year = Number(this.route.snapshot.paramMap.get('year'));
    this.month = this.calendarService.getMonthByNumber(Number(this.route.snapshot.paramMap.get('month')));

    this.api.loadPosts(this.year, this.month.monthNumber).subscribe((data) => {
      this.postData = data;
      console.log(this.postData);
    });
  }

  getDays(): Readonly<string[]> {
    return this.calendarService.getDays();
  }

  onPopupClose() {
    this.showPopup = false;
    this.initPosts();
  }

  onEditPost(model: any) {
    console.log("fired");
    this.popup.prepareForEdit(model);
    this.showPopup = true;
  }

  onPopupOpen() {
    this.showPopup = true;
  }

  onMonthSelectionClick() {
    this.router.navigateByUrl(`/home/${this.route.snapshot.paramMap.get('year')}`);
  }
}