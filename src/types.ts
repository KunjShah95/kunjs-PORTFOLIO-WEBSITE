export interface Project {
    id: string;
    title: string;
    category: string;
    desc: string;
    tech: string[];
    github: string;
    demo?: string;
    slug: string;
    impact: string;
}

export interface Blog {
    id: string;
    title: string;
    slug: string;
    category: string;
    excerpt: string;
    content?: string;
    date: string;
    readTime: number;
    tags: string[];
    featured: boolean;
}

export interface LogEntry {
    id: string;
    date: string;
    hash: string;
    module: string;
    action: string;
    details: string;
}

export interface Experience {
    id: string;
    company: string;
    role: string;
    period: string;
    description: string;
    skills: string[];
}

export interface SkillGroup {
    category: string;
    icon: any; // Using 'any' for Lucide icons to avoid complex type dependencies for now
    description: string;
    skills: string[];
}

export interface Education {
    id: string;
    school: string;
    degree: string;
    period: string;
    specialization: string;
    location: string;
    summary: string;
}

export interface Social {
    name: string;
    url: string;
    icon: any;
    label: string;
}

export interface UserIdentity {
    name: string;
    persona: string;
    location: string;
    contact: string;
    focus: string[];
    github_username: string;
    profile_photo?: string;
}
