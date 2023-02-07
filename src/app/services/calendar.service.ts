import { Injectable, LOCALE_ID, OnInit } from '@angular/core';
import { Month } from '../interfaces/month';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private MONTHS: Readonly<Month[]> = [
    { monthNumber: 1, name: "janvier" },
    { monthNumber: 2, name: "février" },
    { monthNumber: 3, name: "mars" },
    { monthNumber: 4, name: "avril" },
    { monthNumber: 5, name: "mai" },
    { monthNumber: 6, name: "juin" },
    { monthNumber: 7, name: "juillet" },
    { monthNumber: 8, name: "août" },
    { monthNumber: 9, name: "septembre" },
    { monthNumber: 10, name: "october" },
    { monthNumber: 11, name: "novembre" },
    { monthNumber: 12, name: "décembre"}
  ];

  private DAYS: Readonly<string[]> = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];

  private selectedYear: number = new Date().getFullYear();
  private selectedMonth?: Month;
  private selectedDay?: number;

  getSelectedYear(): number {
    return this.selectedYear;
  }

  getMonthByNumber(num: number): Month {
    return this.MONTHS[num-1];
  }

  getSelectedDay(): number | undefined {
    return this.selectedDay;
  }

  setSelectedYear(year: number): void {
    console.log(year);
    this.selectedYear = year;
  }

  setSelectedMonth(month: number | undefined): void {
    if(month) {
      this.selectedMonth = this.MONTHS[month-1];
    } else {
      this.selectedMonth = undefined;
    }
    
  }

  setSelectedDay(day: number | undefined): void {
    this.selectedDay = day;
  }

  constructor() { }

  /**
   * return the list of months in french (because it doesn't work with locale for now)
   * @returns the list of months in french
   */
  getMonths(): Readonly<Month[]> {
    return this.MONTHS;
  }

  getDays(): Readonly<string[]> {
    return this.DAYS;
  }
}
