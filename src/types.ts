export interface Holiday {
  id: string;
  name: string;
  color: string;
  createdAt: Date;
}

export interface HolidayList {
  id: string;
  name: string;
  holidays: Holiday[];
  createdAt: Date;
}
