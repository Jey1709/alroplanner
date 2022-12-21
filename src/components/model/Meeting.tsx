class Meeting {
  private _firstname: string;
  private _lastname: string;
  private _date: Date;
  private _onLeapYear: Boolean;

  constructor(
    firstname: string,
    lastname: string,
    date: Date,
    onleapyear: Boolean
  ) {
    this._firstname = firstname;
    this._lastname = lastname;
    this._date = date;
    this._onLeapYear = onleapyear;
  }

  public get firstname(): string {
    return this._firstname;
  }
  public set firstname(value: string) {
    this._firstname = value;
  }

  public get lastname(): string {
    return this._lastname;
  }
  public set lastname(value: string) {
    this._lastname = value;
  }

  public get date(): Date {
    return this._date;
  }
  public set date(value: Date) {
    this._date = value;
  }

  public get onLeapYear(): Boolean {
    return this._onLeapYear;
  }
  public set onLeapYear(value: Boolean) {
    this._onLeapYear = value;
  }
}
export default Meeting;
