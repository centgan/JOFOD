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
