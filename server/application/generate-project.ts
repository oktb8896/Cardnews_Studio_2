import { randomUUID } from 'node:crypto';
import type { Brief, Project } from '../domain/cardnews.js';
import type { CreativeDirector, ImageArtist } from './ports.js';
export class GenerateProject {
  constructor(private director:CreativeDirector, private artist:ImageArtist){}
  async execute(brief:Brief,onProgress?:(value:number,label:string)=>void):Promise<Project>{
    onProgress?.(8,'브리프 해석');
    const directed=await this.director.direct(brief); onProgress?.(42,'7장 스토리와 아트디렉션 완성');
    const cards=[];
    for(let i=0;i<directed.cards.length;i++){
      const card=directed.cards[i]; const imageUrl=await this.artist.create(card,brief);
      cards.push({...card,imageUrl}); onProgress?.(45+Math.round(((i+1)/directed.cards.length)*45),`${i+1}번째 비주얼 완성`);
    }
    onProgress?.(96,'한국어·브랜드 합성 검수');
    return { ...directed,cards,id:randomUUID(),createdAt:new Date().toISOString(),usage:{textTokens:1900,imageCount:cards.filter(c=>c.imageUrl).length,estimatedTextCost:18,estimatedImageCost:cards.filter(c=>c.imageUrl).length*55} };
  }
}
