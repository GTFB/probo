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

const SECTIONS = [
  { id: '1', title: 'Demo', icon: CheckCircle },
] as const;


export const NAVIGATION_ITEMS = SECTIONS.map(section => ({
  ...section,
  href: `#${section.id}`
}));


export const MDX_FILES = SECTIONS.map(section => ({
  id: section.id,
  name: section.title
}));
