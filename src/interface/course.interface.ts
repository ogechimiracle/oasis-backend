
export interface CreateCourseInput {
  category: string;
  title: string;
  slug?: string;
  briefDefinition: string;
  prerequisite?: string;
  keyAreas: string[];
  outcomes: string[];
  jobRoles: string[];
  industries: string[];
  duration?: string;
  cost?: number;
  paid: boolean;
  thumbnail?: string;
  level: "beginner" | "intermediate" | "advanced";
  createdBy?: string;
}

export interface ContactMessageInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}