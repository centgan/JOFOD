export interface PostingType {
  templateID: number,
  postType: string,
  jobTitle: string,
  jobDescription: string,
  jobResponsibilities: string,
  desiredExperience: string,
  additionQuestion: string,
  additionInfo: string,
  location: string,
  workCycle: string,
  compensation: string,
  endDate: string,
}

export interface JobReturnType {
  job_id: number,
  company_id: number,
  template_id: number,
  job_title: string,
  job_description: string,
  job_responsibilities: string,
  desired_skills: string,
  additional_questions: string,
  additional_information: string,
  compensation: string,
  location: string,
  post_type: string,
  term: string,
  posted_date: string, // again same thing here string for now
  end_date: string, // string for now will deal with datetime object later
  active: boolean,
}

export interface CondensedJobType {
  job_id: number,
  company_id: number,
  job_title: string,
  location: string,
  compensation: string,
  posted_date: string,
  end_date: string,
  active: boolean,
}
