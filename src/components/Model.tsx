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
    console.log(this.getDayOfWeek());
    return [[12, 3]];
  }

  private getDayOfWeek(): number {
    const day_in_ms = 60 * 60 * 24 * 1000;
    const fstjan = new Date(this._selectedDate.getFullYear(), 0, 1);
    const erg = this._selectedDate.getMilliseconds() - fstjan.getMilliseconds();

    return Math.ceil(erg / day_in_ms) + fstjan.getDay() + 1 / 7;
  }

  private getMaxDaysOfMonth(month?: number): number {
    let maxdays;

    if (typeof month !== "undefined") {
      maxdays = new Date(this._selectedDate.getFullYear(), month, 0);
    }
    maxdays = new Date(
      this._selectedDate.getFullYear(),
      this._selectedDate.getMonth(),
      0
    );

    return maxdays.getDay();
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

  public setPreviousMonth() {
    let month = this._selectedDate.getMonth();
    let year = this._selectedDate.getFullYear();

    if (month - 1 < 0) {
      month = 11;
      year -= 1;
    } else {
      month -= 1;
    }
    this._selectedDate.setMonth(month);
    this._selectedDate.setFullYear(year);
  }

  public setNextMonth() {
    let month = this._selectedDate.getMonth();
    let year = this._selectedDate.getFullYear();
    if (month + 1 > 11) {
      month = 0;
      year += 1;
    } else {
      month += 1;
    }
    this._selectedDate.setMonth(month);
    this._selectedDate.setFullYear(year);
  }
}

export default Model;
