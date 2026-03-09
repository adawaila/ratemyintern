import { z } from 'zod';

// Allowed university email domains
const ALLOWED_DOMAINS = [
  // US
  '.edu',
  // Canada
  '.ca',
  'uqtr.ca',
  'polymtl.ca',
  'mcgill.ca',
  'concordia.ca',
  'ulaval.ca',
  'umontreal.ca',
  'usherbrooke.ca',
  'uottawa.ca',
  'utoronto.ca',
  'uwaterloo.ca',
  'ubc.ca',
  // France
  '.fr',
  'polytechnique.edu',
  'mines-paristech.fr',
  'centralesupelec.fr',
  'ens.fr',
  'hec.edu',
];

// Blocked disposable email domains
const BLOCKED_DOMAINS = [
  'tempmail.com',
  'throwaway.email',
  '10minutemail.com',
  'guerrillamail.com',
  'mailinator.com',
  'yopmail.com',
];

// Validate university email
export function isValidUniversityEmail(email: string): boolean {
  const domain = email.toLowerCase().split('@')[1];
  if (!domain) return false;

  // Check if blocked
  if (BLOCKED_DOMAINS.some((blocked) => domain.includes(blocked))) {
    return false;
  }

  // Check if allowed
  return ALLOWED_DOMAINS.some((allowed) => {
    if (allowed.startsWith('.')) {
      return domain.endsWith(allowed);
    }
    return domain === allowed || domain.endsWith('.' + allowed);
  });
}

// Email schema
export const emailSchema = z
  .string()
  .email('Invalid email address')
  .refine(isValidUniversityEmail, {
    message: 'Please use a valid university email (.edu, .ca, or .fr)',
  });

// Review submission schema
export const reviewSchema = z.object({
  company_id: z.string().uuid().optional(),
  company_name: z.string().min(2).max(100).optional(),
  role_title: z.string().min(2).max(100),
  role_type: z.enum(['SWE', 'Design', 'Finance', 'Marketing', 'Data', 'Other']),
  year: z.number().min(2015).max(new Date().getFullYear()),
  season: z.enum(['Winter', 'Summer', 'Fall']),
  city: z.string().min(2).max(100),
  is_remote: z.boolean(),
  pay_amount: z.number().min(0).max(500).nullable(),
  pay_type: z.enum(['hourly', 'monthly', 'stipend', 'unpaid']).nullable(),
  body: z
    .string()
    .min(50, 'Review must be at least 50 characters')
    .max(2000, 'Review must be less than 2000 characters'),
  pros: z.string().max(500).nullable(),
  cons: z.string().max(500).nullable(),
  rating_mentorship: z.number().min(1).max(5),
  rating_work_quality: z.number().min(1).max(5),
  rating_culture: z.number().min(1).max(5),
  rating_compensation: z.number().min(1).max(5),
  rating_return_offer: z.number().min(1).max(5),
  would_recommend: z.boolean(),
  received_offer: z.boolean().nullable(),
  school: z.string().max(100).nullable(),
  language: z.enum(['en', 'fr']),
});

export type ReviewInput = z.infer<typeof reviewSchema>;

// Company creation schema
export const companySchema = z.object({
  name: z.string().min(2).max(100),
  domain: z.string().max(100).nullable(),
  industry: z.string().max(50).nullable(),
  country: z.enum(['CA', 'US', 'FR']).nullable(),
});

export type CompanyInput = z.infer<typeof companySchema>;

// Search schema
export const searchSchema = z.object({
  query: z.string().min(1).max(100),
  city: z.string().max(100).optional(),
  role_type: z.enum(['SWE', 'Design', 'Finance', 'Marketing', 'Data', 'Other']).optional(),
  year: z.number().min(2015).max(new Date().getFullYear()).optional(),
  season: z.enum(['Winter', 'Summer', 'Fall']).optional(),
  min_salary: z.number().min(0).optional(),
  is_remote: z.boolean().optional(),
  language: z.enum(['en', 'fr']).optional(),
});

export type SearchInput = z.infer<typeof searchSchema>;

// Generate slug from company name
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
