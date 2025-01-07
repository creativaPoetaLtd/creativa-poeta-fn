export interface Job {
    id: number;
    title: string;
    company: string;
    location: string;
    // salary: string;
    description: string;
    responsibilities: string[];
    requirements: string[];
    // skills: string[];
    benefits: string[];
    applicationInstructions: string | React.ReactNode;
}