export type ContentType='study-strategy'|'problem-solving'|'concept-strategy'|'academy-story'|'student-growth';
export interface Brief{topic:string;type:ContentType;tone:'student-friendly'|'teacher-expert'|'parent-friendly';academyName:string;audience:string}
export interface Card{id:string;role:string;eyebrow:string;headline:string;body:string;accent:string;art:{layout:string;palette:string[];visualPrompt:string};imageUrl?:string;status:string}
export interface Project{id:string;brief:Brief;title:string;strategy:string;cards:Card[];usage:{textTokens:number;imageCount:number;estimatedTextCost:number;estimatedImageCost:number};createdAt:string}
export interface Critique{score:number;issues:{cardId:string;severity:string;message:string}[];summary:string}
