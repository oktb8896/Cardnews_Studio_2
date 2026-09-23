import { randomUUID } from 'node:crypto';
import type { Brief, Card, Critique, Project } from '../domain/cardnews.js';
import type { CreativeDirector, ImageArtist, VisualCritic } from '../application/ports.js';
const flows={
 'study-strategy':['공감 훅','문제 진단','오해 뒤집기','핵심 원리','실행 1','실행 2','저장 CTA'],
 'problem-solving':['문제 훅','조건 번역','막히는 지점','생각의 전환','풀이 연결','재사용 규칙','도전 CTA'],
 'concept-strategy':['개념 훅','왜 어려운가','핵심 정의','시각적 연결','대표 적용','실수 방지','복습 CTA'],
 'academy-story':['철학 훅','현장 문제','우리의 관찰','수업 방식','피드백 방식','변화 장면','상담 CTA'],
 'student-growth':['변화 훅','출발점','첫 전환','훈련 과정','작은 증거','현재 변화','응원 CTA']
} as const;
const palettes=[['#15152a','#8b5cf6','#f6f0ff'],['#071b18','#15b987','#f4fffb'],['#20140b','#ff8a3d','#fff8ef']];
export class DemoCreativeDirector implements CreativeDirector{
 async direct(b:Brief){const roles=flows[b.type]; const palette=palettes[Math.abs(b.topic.length)%palettes.length];
 const headlines=[`“${b.topic}”\n결과를 바꾸는 한 가지`,`열심히 하는데\n왜 그대로일까?`,`먼저 바꿔야 할 건\n공부량이 아닙니다`,`조건을 읽고\n생각의 순서를 세우세요`,`오늘은 딱 15분,\n이 한 가지만`,`맞힌 문제보다\n막힌 순간을 기록하세요`,`다음 공부 전에\n저장해 두세요`];
 const bodies=[`${b.audience}에게 필요한 건 더 많은 정보가 아니라, 다시 꺼내 쓸 수 있는 생각의 구조입니다.`,`풀이를 많이 봐도 낯선 표현에서 멈춘다면 지식이 아니라 해석의 연결이 끊긴 것입니다.`,`문장을 읽자마자 계산하지 말고, 주어진 조건이 어떤 개념을 호출하는지 먼저 번역합니다.`,`핵심 조건 → 연결 개념 → 적용 순서. 문제의 말이 달라도 이 순서는 남습니다.`,`오늘 푼 문제 하나에서 조건·근거·다음 행동을 한 줄씩 적어 보세요.`,`오답은 답을 고치는 시간이 아니라, 내 생각이 갈라진 지점을 찾는 시간입니다.`,`${b.academyName}은 학생이 스스로 생각을 재현할 수 있게 가르칩니다.`];
 return {brief:b,title:`${b.topic} · 7장 인사이트`,strategy:'한 가지 강한 관점에서 시작해 공감-전환-실행으로 이어지는 저장형 카드뉴스',cards:roles.map((role,i)=>({id:randomUUID(),role,eyebrow:`0${i+1} / INSIGHT`,headline:headlines[i],body:bodies[i],accent:i===0?'생각의 구조':i===3?'핵심 전환':'',art:{layout:(['statement','split','editorial','diagram','editorial','split','statement'] as const)[i],palette,visualPrompt:`premium Korean education editorial, ${b.topic}, ${role}, no text`},status:'ready' as const}))}; }
 async redesign(_b:Brief,c:Card,instruction?:string):Promise<Card>{const layout:Card['art']['layout']=c.art.layout==='diagram'?'editorial':'diagram';return {...c,id:c.id,headline:instruction?c.headline:`${c.headline}\n다르게 바라보기`,art:{...c.art,layout},status:'ready'};}
}
export class DemoImageArtist implements ImageArtist{async create(c:Card,_b?:Brief){if(c.art.layout==='statement')return undefined; const [bg,accent]=c.art.palette; const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350"><defs><radialGradient id="g"><stop stop-color="${accent}" stop-opacity=".68"/><stop offset="1" stop-color="${bg}" stop-opacity="0"/></radialGradient></defs><rect width="1080" height="1350" fill="${bg}"/><circle cx="760" cy="500" r="440" fill="url(#g)"/><path d="M120 980 C330 730 710 1190 980 840" fill="none" stroke="${accent}" stroke-width="12" opacity=".7"/><circle cx="280" cy="330" r="120" fill="none" stroke="white" stroke-width="2" opacity=".35"/></svg>`; return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;}}
export class DemoVisualCritic implements VisualCritic{async critique(p:Project,_previews?:string[]):Promise<Critique>{const issues=p.cards.filter(c=>c.headline.length>52).map(c=>({cardId:c.id,severity:'medium' as const,message:'모바일에서 제목 줄 수가 많습니다. 핵심 문장을 더 압축하세요.'}));return {score:issues.length?84:92,issues,summary:issues.length?'전체 흐름은 좋지만 일부 제목의 시선 집중도를 높일 수 있습니다.':'스토리 흐름, 대비, 가독성이 게시 가능한 수준입니다.'};}}
