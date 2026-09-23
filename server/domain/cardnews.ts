export const contentTypes = ['study-strategy','problem-solving','concept-strategy','academy-story','student-growth'] as const;
export type ContentType = typeof contentTypes[number];
export type Tone = 'student-friendly'|'teacher-expert'|'parent-friendly';
export interface Brief { topic:string; type:ContentType; tone:Tone; academyName:string; audience:string; }
export interface ArtDirection { layout:'editorial'|'diagram'|'split'|'statement'; palette:string[]; visualPrompt:string; }
export interface Card { id:string; role:string; eyebrow:string; headline:string; body:string; accent:string; art:ArtDirection; imageUrl?:string; status:'ready'|'needs-review'; }
export interface Usage { textTokens:number; imageCount:number; estimatedTextCost:number; estimatedImageCost:number; }
export interface Project { id:string; brief:Brief; title:string; strategy:string; cards:Card[]; usage:Usage; createdAt:string; }
export interface Critique { score:number; issues:{cardId:string;severity:'low'|'medium'|'high';message:string}[]; summary:string; }
