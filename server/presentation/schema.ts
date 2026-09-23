import { z } from 'zod';
import { contentTypes } from '../domain/cardnews.js';
export const briefSchema=z.object({topic:z.string().trim().min(3).max(160),type:z.enum(contentTypes),tone:z.enum(['student-friendly','teacher-expert','parent-friendly']),academyName:z.string().trim().min(1).max(50),audience:z.string().trim().min(1).max(40)});
