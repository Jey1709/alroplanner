import * as bdaylist from "../../data/birthdaylist.json";
import Meeting from "./Meeting";
class Model {
  private _actulDate: Date;
  private _selectedDate: Date;
  private _DAYSOFWEEK: number = 7;
  private _birthdaysList: Meeting[] = [];

  constructor() {
    this._actulDate = new Date();
    this._selectedDate = this._actulDate;
    let str = JSON.stringify(bdaylist);
    let obj = JSON.parse(str);
    this._birthdaysList = this.convertMeetingList(
      Object.values(obj["meetinglist"])
    );
  }

  public convertMeetingList(values: Object[]): Meeting[] {
    let meetingList: Meeting[] = [];
    values.forEach((item) => {
      let values = Object.values(item);
      // console.log(values);
      const readdate = Object.values(values[2]);
      const year = parseInt("" + readdate[2]);
      const month = parseInt("" + readdate[1]) - 1;
      const date = parseInt("" + readdate[0]);
      let tempdate = new Date(year, month, date);
      meetingList.push(new Meeting(values[0], values[1], tempdate, values[3]));
    });
    // console.log(meetingList[0].date.getMonth());
    return meetingList;
  }

  public getActualMonthList(rows: number): number[][] {
    let calenderdays = this._DAYSOFWEEK * rows;
    const maxdays = this.getMaxDaysOfMonth(this._selectedDate.getMonth());
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
      .map((element, index) => {
        let tempdate: Date = new Date(
          this.selectedDate.getFullYear(),
          this.selectedDate.getMonth() - 1 < 0
            ? 11
            : this.selectedDate.getMonth() - 1,
          index + firstoutday + 1
        );
        return {
          value: index + firstoutday + 1,
          date:
            "" +
            tempdate.getFullYear() +
            "_" +
            tempdate.getMonth() +
            "_" +
            tempdate.getDate(),
          caltype: "pre",
          meetings: this.getMatchingBirthdays(tempdate),
        };
      });

    const secondarr = Array(maxdays)
      .fill(1)
      .map((element, index) => {
        let tempdate: Date = new Date(
          this.selectedDate.getFullYear(),
          this.selectedDate.getMonth(),
          index + 1
        );
        return {
          value: index + 1,
          date:
            "" +
            tempdate.getFullYear() +
            "_" +
            tempdate.getMonth() +
            "_" +
            tempdate.getDate(),
          caltype: "act",
          meetings: this.getMatchingBirthdays(tempdate),
        };
      });

    const thirdarr = Array(calenderdays - (maxdays + prevDaysamount))
      .fill(1)
      .map((element, index) => {
        let tempdate: Date = new Date(
          this.selectedDate.getFullYear(),
          this.selectedDate.getMonth() + 1 > 11
            ? 0
            : this.selectedDate.getMonth() + 1,
          index + 1
        );
        return {
          value: index + 1,
          date:
            "" +
            tempdate.getFullYear() +
            "_" +
            tempdate.getMonth() +
            "_" +
            tempdate.getDate(),
          caltype: "post",
          meetings: this.getMatchingBirthdays(tempdate),
        };
      });

    let resultarr: Object[] = Array(...firstarr, ...secondarr, ...thirdarr);
    const finalarr: any = [];
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

  public getMatchingBirthdays(date: Date): Meeting[] {
    const retlist = this._birthdaysList.filter((item) => {
      if (
        item.date.getMonth() === date.getMonth() &&
        item.date.getDate() === date.getDate()
      ) {
        console.log(date.getDate() + ":" + date.getMonth() + item.firstname);
      }
      return (
        // item.date.getFullYear() == date.getFullYear() &&
        item.date.getMonth() === date.getMonth() &&
        item.date.getDate() === date.getDate()
      );
    });

    return retlist;
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

  public get birthdaysList(): Meeting[] {
    return this._birthdaysList;
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
