import {
  FileText,
  Component,
  Users,
  Cpu,
  Share2,
  TestTube,
  CheckCircle,
  Code,
} from 'lucide-react'

export const PROJECT_SETTINGS = {
  name: 'Probo',
  description: 'Commercial Proposal Generator',
} as const;

// Password groups configuration
export const PASSWORD_GROUPS = {
  'group1': {
    password: 'password1',
    sections: ['1', '2', '3'], // Sections A, B, C
    name: 'Group 1 - Basic Access',
    description: 'Access to basic content sections'
  },
  'group2': {
    password: 'password2', 
    sections: ['4', '5', '6'], // Sections D, E, F
    name: 'Group 2 - Premium Access',
    description: 'Access to premium content sections'
  },
  'default': {
    password: 'password',
    sections: ['*'], // All other sections
    name: 'Default Group',
    description: 'Access to all other content'
  }
} as const;

const SECTIONS = [
  { id: '1', title: 'Demo', icon: CheckCircle, slug: 'demo', translationKey: 'demo' },
  { id: '2', title: 'Group 1 - Section A', icon: CheckCircle, slug: 'group-1-section-a', translationKey: 'group1SectionA' },
  { id: '4', title: 'Group 2 - Section D', icon: CheckCircle, slug: 'group-2-section-d', translationKey: 'group2SectionD' },
] as const;


export const NAVIGATION_ITEMS = SECTIONS.map(section => ({
  ...section,
  href: `/${section.slug}`
}));


export const MDX_FILES = SECTIONS.map(section => ({
  id: section.id,
  name: section.title
}));
