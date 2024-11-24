export interface OptionType {
  value: string;
  label: string;
}

export interface AddEmployer {
  address: string;
  hiringPreference: string;
  website: string;
  industry: string;
  size: string;
  summary: string;
  values: string;
  mission: string;
}

export interface AddEmployee {
  cycleType: string;
  cycles: string;
  pitch: string;
  intro: string;
  university: string;
  studyYear: string;
  degreeType: string;
  degree: string;
  links: string[][];
  graduationDate: Date;
}

export interface AddEmployerBack {
  address: string;
  hiringPreference: string;
  website: string;
  industry: string;
  size: string;
  summary: string;
  values: string;
  mission: string;
  company_id: number;
  user_id: number;
}

export interface AddEmployeeBack {
  cycleType: string;
  cycles: string;
  pitch: string;
  intro: string;
  university: string;
  studyYear: string;
  degreeType: string;
  degree: string;
  links: string[][];
  graduationDate: Date;
  user_id: number;
}
