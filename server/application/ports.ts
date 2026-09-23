import type { Brief, Card, Critique, Project } from '../domain/cardnews.js';
export interface CreativeDirector { direct(brief:Brief):Promise<Omit<Project,'id'|'createdAt'|'usage'>>; redesign(brief:Brief,card:Card,instruction?:string):Promise<Card>; }
export interface VisualCritic { critique(project:Project, previews?:string[]):Promise<Critique>; }
export interface ImageArtist { create(card:Card,brief:Brief):Promise<string|undefined>; }
