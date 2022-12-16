import { tmpdir } from "os";

class Model {
  private _actulDate: Date;
  private _selectedDate: Date;
  private _DAYSOFWEEK: number = 7;

  constructor() {
    this._actulDate = new Date();
    this._selectedDate = this._actulDate;
  }

  public getActualMonthList(rows: number): number[][] {
    let calenderdays = this._DAYSOFWEEK * rows;
    const maxdays = this.getMaxDaysOfMonth(this._selectedDate.getMonth());
    const outerdays: number = calenderdays - maxdays;
    const prevMonthdays: number = this.getMaxDaysOfMonth(
      this.checkPreviousMonth(this.selectedDate).getMonth()
    );
    const complimentaryDays = this.complimentaryDays(
      new Date(
        this._selectedDate.getFullYear(),
        this.selectedDate.getMonth(),
        1
      )
    );

    const firstoutday = prevMonthdays - complimentaryDays;
    const prevDaysamount = prevMonthdays - firstoutday;

    const firstarr = Array(prevDaysamount)
      .fill(1)
      .map((element, index) => index + firstoutday + 1);

    const secondarr = Array(maxdays)
      .fill(1)
      .map((element, index) => index + 1);
    const thirdarr = Array(calenderdays - (maxdays + prevDaysamount))
      .fill(1)
      .map((element, index) => index + 1);
    let resultarr = Array(...firstarr, ...secondarr, ...thirdarr);
    const finalarr: number[][] = [];
    let idx = 0;
    let tmparr = [];
    do {
      tmparr = resultarr.slice(idx, idx + 7);
      finalarr.push(new Array(...tmparr));
      idx += 7;
    } while (idx < resultarr.length);

    // console.log(finalarr);

    return finalarr;
  }

  /**
   * Returns the amount of dates before a selected date e.g. Mi=3 = 2 (Mon, Di)
   * @param comparedate
   * @returns
   */
  private complimentaryDays(comparedate: Date): number {
    return comparedate.getDay() - 1 === -1 ? 6 : comparedate.getDay() - 1;
  }

  private getMaxDaysOfMonth(month?: number): number {
    let maxdays;

    if (typeof month !== "undefined") {
      // console.log("here");
      maxdays = new Date(this._selectedDate.getFullYear(), month + 1, 0);
    } else {
      maxdays = new Date(
        this._selectedDate.getFullYear(),
        this._selectedDate.getMonth() + 1,
        0
      );
    }

    return maxdays.getDate();
  }

  public get actualDate() {
    const tempdate = this._selectedDate;
    return `${tempdate.getDay()}_${tempdate.getMonth()}_${tempdate.getFullYear()} `;
  }

  public get selectedDate(): Date {
    return this._selectedDate;
  }

  public getMonthAsWord(month: number) {
    let name = "";
    switch (month) {
      case 0:
        name = "Januar";
        break;
      case 1:
        name = "Februar";
        break;
      case 2:
        name = "März";
        break;
      case 3:
        name = "April";
        break;
      case 4:
        name = "Mai";
        break;
      case 5:
        name = "Juni";
        break;
      case 6:
        name = "Juli";
        break;
      case 7:
        name = "August";
        break;
      case 8:
        name = "September";
        break;
      case 9:
        name = "Oktober";
        break;
      case 10:
        name = "November";
        break;
      case 11:
        name = "Dezember";
        break;
    }

    return name;
  }

  public checkPreviousMonth(date: Date) {
    let month = date.getMonth();
    let year = date.getFullYear();
    if (month - 1 < 0) {
      month = 11;
      year -= 1;
    } else {
      month -= 1;
    }
    // console.log(new Date(year, month, date.getDate()));
    return new Date(year, month, date.getDate());
  }

  public setPreviousMonth() {
    const prevmonth: Date = this.checkPreviousMonth(this.selectedDate);
    this._selectedDate.setMonth(prevmonth.getMonth());
    this._selectedDate.setFullYear(prevmonth.getFullYear());
  }

  public checkNextMonth(date: Date) {
    let month = date.getMonth();
    let year = date.getFullYear();
    if (month + 1 > 11) {
      month = 0;
      year += 1;
    } else {
      month += 1;
    }
    return new Date(year, month, date.getDate());
  }

  public setNextMonth() {
    const nextmonth: Date = this.checkNextMonth(this.selectedDate);
    this._selectedDate.setMonth(nextmonth.getMonth());
    this._selectedDate.setFullYear(nextmonth.getFullYear());
  }
}

export default Model;
