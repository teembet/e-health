export interface IPatient {
  id?: string;
  img?: string | ArrayBuffer;
  profileImg?: string | ArrayBuffer;
  name: string;
  lastName?: string;
  fullName?: string;
  number: string;
  phone?: string;
  age: number;
  gender: string;
  address: string;
  status?: string;
  lastVisit?: string;
  needDoctor?:string;
  needPharmacy?:string;
  needLab?:string;
  dReport?:string;
  lReport?:string;
  pReport?:string;
}

export interface IAppointment {
  img: string;
  name: string;
  email: string;
  number: string;
  date: string;
  fromTo: string;
  doctor: string;
  injury: string;
  from: string;
  to: string;
}

export interface IBilling {
  billNo: number;
  billDate: string;
  patient: string;
  doctor: string;
  charges: number;
  tax: number;
  discount: number;
  total: number;
}

export interface IDepartment {
  img: string;
  title: string;
  desc: string;
  team: string[];
}
