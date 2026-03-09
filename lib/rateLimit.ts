import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Rate limiters for different actions
export const rateLimiters = {
  // Magic link requests: 3 per IP per hour
  magicLink: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, '1 h'),
    prefix: 'ratelimit:magic-link',
  }),

  // Review submission: 1 per IP per 24 hours
  reviewSubmit: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(1, '24 h'),
    prefix: 'ratelimit:review-submit',
  }),

  // Helpful votes: 10 per IP per hour
  helpfulVote: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '1 h'),
    prefix: 'ratelimit:helpful-vote',
  }),

  // Report: 1 per review per IP
  report: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(1, '24 h'),
    prefix: 'ratelimit:report',
  }),

  // Search: 60 per IP per minute
  search: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(60, '1 m'),
    prefix: 'ratelimit:search',
  }),
};

// Helper to get client IP from request
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
  return ip;
}

// Check rate limit and return result
export async function checkRateLimit(
  limiter: Ratelimit,
  identifier: string
): Promise<{ success: boolean; remaining: number; reset: number }> {
  const result = await limiter.limit(identifier);
  return {
    success: result.success,
    remaining: result.remaining,
    reset: result.reset,
  };
}
