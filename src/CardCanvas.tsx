import{forwardRef}from'react';import type{Card}from'./types';
export const CardCanvas=forwardRef<HTMLDivElement,{card:Card,index:number,total:number,academy:string}>(({card,index,total,academy},ref)=>{const[p0,p1,p2]=card.art.palette;return <div ref={ref} className={`card-canvas layout-${card.art.layout}`} style={{'--bg':p0,'--accent':p1,'--paper':p2} as React.CSSProperties}>
 {card.imageUrl&&<img className="card-art" src={card.imageUrl} alt=""/>}<div className="grain"/><div className="card-top"><span>{card.eyebrow}</span><span>{String(index+1).padStart(2,'0')} / {String(total).padStart(2,'0')}</span></div>
 <div className="card-copy">{card.accent&&<span className="accent-pill">{card.accent}</span>}<h2>{card.headline}</h2><p>{card.body}</p></div>
 <div className="brand"><span className="brand-mark">{academy.slice(0,1)}</span><b>{academy}</b><span>THINK · GROW · REPEAT</span></div></div>});
CardCanvas.displayName='CardCanvas';
