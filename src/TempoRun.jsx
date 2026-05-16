import runnerVertical from './assets/runner_vertical.png';
import runnerStride from './assets/runner_stride.png';
import runnerLanding from './assets/runner_landing.png';
import runnerOverstride from './assets/runner_overstride.png';
import logoImg from './assets/logo.png';
import tempoRunLogo from './assets/tempo_run_logo.png';
import iconCircle from './assets/icon_circle.png';
import perfilImg from './assets/perfil.png';
import inicioTreino from './assets/inicio_treino.png';
import { useState, useEffect, useRef, useMemo } from "react";

// ─── PALETTE ──────────────────────────────────────────────────────────────────
const C_DARK = {
  bg:"#06071a", bg2:"#080a24", s1:"#0d0f2e", s2:"#10143a", s3:"#161b4a",
  border:"#1e2456", bsub:"#141840",
  violet:"#7c3aed", violetM:"#6d28d9", violetL:"#a855f7", violetB:"#c084fc",
  cyan:"#06b6d4", cyanB:"#22d3ee", cyanL:"#67e8f9",
  amber:"#e8a838", coral:"#e8623a", green:"#22c55e",
  strava:"#fc4c02", garmin:"#007cc3",
  tp:"#f0f4ff", ts:"#8b9ec7", tm:"#5567a0", td:"#3a4a78", tg:"#1e2a50",
};
const C_LIGHT = {
  bg:"#f4f6ff", bg2:"#eef0fb", s1:"#ffffff", s2:"#f0f2fc", s3:"#e8ebf8",
  border:"#d0d6f0", bsub:"#e4e8f8",
  violet:"#7c3aed", violetM:"#6d28d9", violetL:"#6d28d9", violetB:"#7c3aed",
  cyan:"#0891b2", cyanB:"#0891b2", cyanL:"#06b6d4",
  amber:"#d97706", coral:"#dc4e2a", green:"#16a34a",
  strava:"#fc4c02", garmin:"#007cc3",
  tp:"#0f1220", ts:"#374060", tm:"#6b7db3", td:"#9aaad0", tg:"#c8d3ee",
};
// C é definido dentro do componente com base no tema
let C = C_DARK;

// ─── ICONS ────────────────────────────────────────────────────────────────────
function Ic({ n, z=20, c="currentColor", st={} }) {
  const paths = {
    home:     <><path d="M3 10.5L12 3l9 7.5V21h-6v-6H9v6H3V10.5z" stroke={c} strokeWidth="1.7" strokeLinejoin="round" fill="none"/></>,
    run:      <><path d="M15 2.5 Q16.5 2 17.5 3 Q18.5 4.5 17 5.5 Q15 6 14 4.5 Q13.5 3 15 2.5Z" stroke={c} strokeWidth="1.3" fill="none"/><path d="M16 6 Q14.5 8 13.5 10 Q11 13 10 15 Q9 17 10 19 Q11 20.5 13 21" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/><path d="M13.5 10 Q16 11 18 10.5 Q19.5 10 20 8.5" stroke={c} strokeWidth="1.4" strokeLinecap="round" fill="none"/><path d="M10 15 Q8 16.5 7 18.5 Q6.5 20 7.5 21.5" stroke={c} strokeWidth="1.4" strokeLinecap="round" fill="none"/><path d="M13 21 Q14.5 22 16 21.5 Q17 20.5 16.5 19 Q15.5 17 14 16.5" stroke={c} strokeWidth="1.4" strokeLinecap="round" fill="none"/><line x1="2" y1="11" x2="7" y2="11" stroke={c} strokeWidth="1.4" strokeLinecap="round"/><line x1="2.5" y1="13.5" x2="8" y2="13.5" stroke={c} strokeWidth="1.4" strokeLinecap="round"/><line x1="3" y1="16" x2="7.5" y2="16" stroke={c} strokeWidth="1.4" strokeLinecap="round"/></>,
    explore:  <><path d="M2 19l7-12 4 7 3-4 6 9H2z" stroke={c} strokeWidth="1.6" strokeLinejoin="round"/></>,
    studio:   <><rect x="3" y="3" width="8" height="8" rx="1.5" stroke={c} strokeWidth="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5" stroke={c} strokeWidth="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5" stroke={c} strokeWidth="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5" stroke={c} strokeWidth="1.5"/></>,
    science:  <><path d="M8 4C8 4 16 7 16 12C16 17 8 20 8 20M16 4C16 4 8 7 8 12C8 17 16 20 16 20" stroke={c} strokeWidth="1.6" strokeLinecap="round"/><path d="M8.5 8.5h7M8.5 15.5h7" stroke={c} strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/></>,
    report:   <><rect x="4" y="2" width="16" height="20" rx="2" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/><path d="M8 14l3-4 3 3 3-4" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 8h8" stroke={c} strokeWidth="1.3" strokeLinecap="round" opacity="0.45"/></>,
    profile:  <><circle cx="12" cy="7" r="3.5" stroke={c} strokeWidth="1.6"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={c} strokeWidth="1.6" strokeLinecap="round"/></>,
    back:     <><path d="M19 12H5M12 5l-7 7 7 7" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></>,
    share:    <><circle cx="18" cy="5" r="2.5" stroke={c} strokeWidth="1.5"/><circle cx="6" cy="12" r="2.5" stroke={c} strokeWidth="1.5"/><circle cx="18" cy="19" r="2.5" stroke={c} strokeWidth="1.5"/><path d="M8.5 10.5l7-4M8.5 13.5l7 4" stroke={c} strokeWidth="1.4" strokeLinecap="round"/></>,
    save:     <><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" stroke={c} strokeWidth="1.6" strokeLinejoin="round"/><path d="M17 21v-8H7v8M7 3v5h8" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></>,
    warning:  <><path d="M10.3 3.2L1.6 18a2 2 0 0 0 1.7 3h17.4a2 2 0 0 0 1.7-3L13.7 3.2a2 2 0 0 0-3.4 0z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/><path d="M12 9v5M12 17v.5" stroke={c} strokeWidth="2" strokeLinecap="round"/></>,
    check:    <><path d="M20 6L9 17l-5-5" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>,
    injury:   <><path d="M12 22s-8-5-8-11a8 8 0 0 1 16 0c0 6-8 11-8 11z" stroke={c} strokeWidth="1.5"/><path d="M12 8v5M9.5 10.5h5" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></>,
    bars:     <><path d="M4 18V14M8 18V10M12 18V7M16 18V11M20 18V15" stroke={c} strokeWidth="2" strokeLinecap="round"/></>,
    settings: <><circle cx="12" cy="12" r="3" stroke={c} strokeWidth="1.5"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke={c} strokeWidth="1.3"/></>,
    pro:      <><path d="M12 3l3 4H9l3-4z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/><path d="M6 7l3 4H3L6 7zM18 7l3 4h-6l3-4z" stroke={c} strokeWidth="1.5" strokeLinejoin="round" opacity="0.6"/><path d="M3 11l9 10 9-10H3z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/></>,
    bolt:     <><path d="M13 2L5 13h6l-2 9 10-11h-7l3-9z" stroke={c} strokeWidth="1.6" strokeLinejoin="round"/></>,
    bio:      <><circle cx="12" cy="4" r="2" stroke={c} strokeWidth="1.4"/><path d="M12 6v5M9 8l3 3 3-3M12 11l-2.5 4M12 11l2.5 4M9.5 15l-1.5 4M14.5 15l1.5 4" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></>,
    nutrition:<><path d="M8 3C8 3 4 5 4 10c0 3 2.5 5 4 5l1 6h2l1-6c1.5 0 4-2 4-5 0-5-4-7-4-7" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></>,
    sleep:    <><rect x="3" y="10" width="8" height="7" rx="2" stroke={c} strokeWidth="1.5"/><rect x="13" y="10" width="8" height="7" rx="2" stroke={c} strokeWidth="1.5"/><path d="M3 17h18M3 8c2-3 16-3 18 0" stroke={c} strokeWidth="1.4" strokeLinecap="round"/></>,
    flame:    <><path d="M12 22c-4 0-7-3-7-7 0-2.5 1-4.5 2.5-6C9 11 10 13 12 13c0-2 1-5 3-7-1 3 1 5 2 7 .7 1.2 1 2.5 1 4 0 4-3 5-6 5z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/></>,
    streak:   <><path d="M12 3v4M6.3 6.3l2.8 2.8M3 12h4M6.3 17.7l2.8-2.8M12 21v-4M17.7 17.7l-2.8-2.8M21 12h-4M17.7 6.3l-2.8 2.8" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="12" r="3" stroke={c} strokeWidth="1.5"/></>,
    upload:   <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></>,
    video:    <><rect x="2" y="6" width="14" height="12" rx="2" stroke={c} strokeWidth="1.5"/><path d="M16 10l5-3v10l-5-3V10z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/></>,
    chart:    <><path d="M3 3v18h18" stroke={c} strokeWidth="1.6" strokeLinecap="round"/><path d="M7 12l4-4 4 4 4-6" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></>,
    mountain: <><path d="M4 20l5-8 4 4 4-7 4 11" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></>,
    trophy:   <><path d="M8 3h8v8a4 4 0 0 1-8 0V3z" stroke={c} strokeWidth="1.6"/><path d="M8 6H5a2 2 0 0 0 0 4h3M16 6h3a2 2 0 0 1 0 4h-3M12 15v4M8 19h8" stroke={c} strokeWidth="1.4" strokeLinecap="round"/></>,
    star:     <><path d="M12 2l2.8 5.5L21 8.5l-4.5 4.5 1 6.5L12 17 6.5 19.5l1-6.5L3 8.5l6.2-1L12 2z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/></>,
    pin:      <><circle cx="12" cy="9" r="3" stroke={c} strokeWidth="1.6"/><path d="M12 3C8.7 3 6 5.7 6 9c0 5 6 12 6 12s6-7 6-12c0-3.3-2.7-6-6-6z" stroke={c} strokeWidth="1.6"/></>,
    link:     <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></>,
    medal:    <><circle cx="12" cy="14" r="7" stroke={c} strokeWidth="1.5"/><path d="M8 6l4-4 4 4M12 2v5M12 11v3l2 1" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></>,
    photo:    <><rect x="3" y="6" width="18" height="14" rx="2" stroke={c} strokeWidth="1.5"/><circle cx="12" cy="13" r="3" stroke={c} strokeWidth="1.4"/><path d="M9 3h6l1 3H8L9 3z" stroke={c} strokeWidth="1.4" strokeLinejoin="round"/></>,
    bib:      <><rect x="5" y="3" width="14" height="18" rx="2" stroke={c} strokeWidth="1.5"/><path d="M9 8h6M9 12h6M9 16h4" stroke={c} strokeWidth="1.4" strokeLinecap="round"/></>,
    gps:      <><circle cx="12" cy="12" r="3" stroke={c} strokeWidth="1.6"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke={c} strokeWidth="1.4" strokeLinecap="round"/><circle cx="12" cy="12" r="7" stroke={c} strokeWidth="1" opacity="0.4"/></>,
    shoe:     <><path d="M2 16c0 0 3-4 7-4l3 3h7a2 2 0 0 1 0 4H4a2 2 0 0 1-2-2z" stroke={c} strokeWidth="1.6" strokeLinejoin="round"/><path d="M9 12l2-5 2 2 2-3" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></>,
    ai:       <><rect x="7" y="7" width="10" height="10" rx="2" stroke={c} strokeWidth="1.5"/><circle cx="10" cy="10" r="1" fill={c} opacity="0.8"/><circle cx="14" cy="10" r="1" fill={c} opacity="0.8"/><circle cx="12" cy="14" r="1" fill={c} opacity="0.8"/><path d="M7 10H4M7 14H4M17 10h3M17 14h3M10 7V4M14 7V4M10 17v3M14 17v3" stroke={c} strokeWidth="1.2" strokeLinecap="round" opacity="0.45"/></>,
    watch:    <><circle cx="12" cy="13" r="7" stroke={c} strokeWidth="1.5"/><path d="M12 9v4l2.5 2.5" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 3h4M12 3v2" stroke={c} strokeWidth="1.4" strokeLinecap="round"/></>,
    map:      <><path d="M3 5l6 2 6-3 6 3v14l-6-3-6 3-6-3V5z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/><path d="M9 7v14M15 4v14" stroke={c} strokeWidth="1.1" opacity="0.5"/></>,
    heart:    <><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/></>,
    cadence:  <><circle cx="12" cy="12" r="3" stroke={c} strokeWidth="1.5"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke={c} strokeWidth="1.4" strokeLinecap="round"/></>,
  };
  return (
    <svg width={z} height={z} viewBox="0 0 24 24" fill="none" style={st}>
      {paths[n]||<circle cx="12" cy="12" r="4" stroke={c} strokeWidth="1.5"/>}
    </svg>
  );
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function Badge({ text, color }) {
  return <span style={{background:color+"22",color,border:"1px solid "+color+"44",borderRadius:6,padding:"2px 8px",fontSize:11,fontWeight:700,whiteSpace:"nowrap",display:"inline-block"}}>{text}</span>;
}
function Bar({ value, max=100, color }) {
  return (
    <div style={{background:C.s3,borderRadius:99,height:6,overflow:"hidden"}}>
      <div style={{width:Math.min(value/max*100,100)+"%",height:"100%",background:color,borderRadius:99,transition:"width .5s"}}/>
    </div>
  );
}
function SL({ children, mt=0 }) {
  return <p style={{color:C.ts,fontSize:11,fontWeight:700,letterSpacing:0.5,textTransform:"uppercase",margin:`${mt}px 0 10px`,display:"flex",alignItems:"center",gap:6}}>{children}</p>;
}
function Bubble({ m }) {
  const u = m.from==="user";
  return (
    <div style={{marginBottom:9,display:"flex",justifyContent:u?"flex-end":"flex-start"}}>
      <div style={{background:u?"#4c1d95":C.s2,border:u?"none":"1px solid "+C.bsub,borderRadius:u?"14px 14px 4px 14px":"4px 14px 14px 14px",padding:"9px 13px",maxWidth:"82%",color:C.tp,fontSize:13,lineHeight:1.65}}>{m.text}</div>
    </div>
  );
}
function Dots({ color }) {
  return (
    <div style={{display:"flex",gap:4,padding:"8px 2px"}}>
      {[0,1,2].map(k=><div key={k} style={{width:6,height:6,borderRadius:"50%",background:color||C.cyanB,animation:"pulse 1.2s infinite",animationDelay:k*0.2+"s"}}/>)}
    </div>
  );
}
function fmtT(s) {
  const h=Math.floor(s/3600),m=Math.floor((s%3600)/60),sec=s%60;
  if(h>0) return h+":"+String(m).padStart(2,"0")+":"+String(sec).padStart(2,"0");
  return String(m).padStart(2,"0")+":"+String(sec).padStart(2,"0");
}
function calcPace(km,seg) {
  if(km<0.01) return "--:--";
  const s=seg/km,mm=Math.floor(s/60),ss=Math.round(s%60);
  return mm+":"+String(ss).padStart(2,"0");
}
function parsePace(str) {
  const p=str.split(":");if(p.length!==2) return null;
  const m=parseInt(p[0]),s=parseInt(p[1]);
  if(isNaN(m)||isNaN(s)) return null;
  return m*60+s;
}
async function callAI(system,msg,history=[],maxTokens=1400) {
  const msgs=history.map(m=>({role:m.from==="user"?"user":"assistant",content:m.text}));
  msgs.push({role:"user",content:msg});
  const res=await fetch(`${SUPABASE_URL}/functions/v1/ai-proxy`,{
    method:"POST",
    headers:{"Content-Type":"application/json","apikey":SUPABASE_ANON},
    body:JSON.stringify({system,messages:msgs,max_tokens:maxTokens,model:"claude-haiku-4-5-20251001"})
  });
  const d=await res.json();
  return (d.content&&d.content[0]&&d.content[0].text)||"Erro.";
}

const SYS_COACH=`Você é TEMPO, coach de corrida pessoal do TempoRun. Especialista em fisiologia do esporte, biomecânica, nutrição esportiva e prevenção de lesões. Conciso, motivador e científico. Português brasileiro. O perfil do atleta será fornecido no contexto — use-o para personalizar cada resposta. Nunca dê diagnóstico médico; para dor ou lesão, oriente a buscar profissional.`;
const SYS_PLAN=`Você é TEMPO, coach IA do TempoRun. Gere plano semanal personalizado e seguro.
REGRAS GERAIS: nunca aumente volume >10%/semana; mínimo 1-2 dias descanso; pós-lesão: 50% volume 2 semanas.
REGRAS ESPECIAIS GLP-1 (Ozempic/Wegovy/Mounjaro/Saxenda): Se o atleta usa GLP-1, aplique:
- Reduza volume semanal 20-30% (risco de hipoglicemia por déficit calórico).
- Nunca treinos longos em jejum ou com náusea ativa.
- Mínimo 3 dias descanso/semana (STEP trials: 25-40% perda de lean mass).
- Exija carboidrato de fácil digestão 30-45min antes do treino.
- Reduza intensidade de intervalados 10-15% (glicogênio reduzido = bonk precoce).
- Alerte sobre proteína 1.2-1.6g/kg/dia para preservar músculo (ADA 2025, Frontiers 2025).
- Se náusea: substituir corrida por run-walk.
Fontes: STEP trials, PMC 11848261, PMC 12683586, ADA Clinical Diabetes 2025.
TIPOS DE TREINO PERMITIDOS (use EXATAMENTE estes nomes no campo "tipo", nada mais):
- Rodagem Leve | Rodagem Moderada | Rodagem Progressiva
- Longão | Longão Lento | Longão com Ritmo | Longão Progressivo
- Tempo Run | Intervalado | Fartlek
- Subidas | Strides | Descanso | Descanso Ativo
IMPORTANTE: descrições máximo 1 frase curta. resumo_semanal máximo 2 frases. avisos_medicos máximo 3 itens curtos. progressao_segura máximo 1 frase. Seja conciso.
JSON apenas: {"plano":[{"dia":"","tipo":"","distancia_km":0,"pace_alvo":"","descricao":"","alerta_lesao":""}],"resumo_semanal":"","avisos_medicos":[],"progressao_segura":"","alerta_glp1":""}`;

const SYS_PLAN_MACRO=`Você é TEMPO, coach IA do TempoRun. Gere estrutura MACRO de plano de treino.

VOLUMES DE REFERÊNCIA (Daniels Running Formula, BAA, MarathonHandbook 2026):
MARATONA (42k): Iniciante pico 55-65km/sem | Intermediário pico 65-80km/sem | Avançado pico 80-100km/sem
MEIA MARATONA (21k): Iniciante pico 45-55km/sem | Intermediário pico 55-70km/sem | Avançado pico 70-90km/sem
10K: Iniciante pico 35-45km/sem | Intermediário pico 50-60km/sem
5K / VO2max / Base aeróbica: Iniciante pico 25-35km/sem | Intermediário pico 40-55km/sem

REGRAS OBRIGATÓRIAS:
- Use os volumes acima como referência MÍNIMA — NUNCA gere volumes abaixo deles
- Progressão: nunca aumente >10%/semana; a cada 3-4 semanas inserir semana de recuperação (volume -20-30%)
- 80% do volume em intensidade leve/moderada (Z1-Z2); 20% em qualidade
- Longão: 25-30% do volume semanal (máx 35%)
- Taper: últimas 2-3 semanas antes da prova reduzir volume 40-50%, manter intensidade
- Mínimo 1-2 dias descanso/semana
- Seja CONCISO: resumo e treinos_chave curtos (máx 3 palavras cada). Máximo 3 avisos.

Responda APENAS JSON (sem markdown):
{"titulo":"","objetivo":"","semanas":[{"semana":1,"foco":"","volume_km":0,"treinos_chave":[""],"descansos":2,"resumo":"","intensidade":"leve"}],"avisos":[]}`

const SYS_PLAN_WEEK=`Você é TEMPO, coach IA do TempoRun. Expanda UMA semana do plano em dias detalhados.
REGRAS: nunca volume >10%/semana; mínimo 1-2 descansos; descrições curtas (1 frase).
IMPORTANTE: o volume_km total dos 7 dias DEVE igualar o volume_km da semana informado no contexto.
TIPOS DE TREINO PERMITIDOS (use EXATAMENTE estes nomes no campo "tipo", nada mais):
- Rodagem Leve | Rodagem Moderada | Rodagem Progressiva
- Longão | Longão Lento | Longão com Ritmo | Longão Progressivo
- Tempo Run | Intervalado | Fartlek
- Subidas | Strides | Descanso | Descanso Ativo
Responda APENAS JSON — array de 7 dias:
[{"dia":"Seg","tipo":"","distancia_km":0,"pace_alvo":"","descricao":"","alerta_lesao":""}]`
const SYS_SABER=`Você é SABER, especialista em ciência da corrida do TempoRun. Responde com base em evidências científicas atuais. Português brasileiro. Máximo 3 parágrafos objetivos.

BASE DE CONHECIMENTO:
BIOMECÂNICA: Cadência ideal 170-180 spm (Heiderscheit 2011). Overstriding aumenta força de impacto 3x. Oscilação vertical ideal <8cm. Aterrissagem sob o CG reduz lesões. Inclinação anterior 5-10° melhora economia. Fonte: BJSM, Journal of Biomechanics.
FISIOLOGIA: VO2max melhora 5-15% em 8-12 semanas de treino aeróbico. Zonas de treino: Z1<65%FCmax (recuperação), Z2 65-75% (base aeróbica), Z3 75-85% (limiar), Z4 85-92% (anaeróbico), Z5>92% (neuromuscular). Glicogênio muscular dura ~90min em intensidade moderada. Fonte: ACSM Guidelines 2022.
NUTRIÇÃO: Carboidrato 5-7g/kg/dia para corredores recreativos, 7-10g para alto volume. Gel energético a cada 30-45min em corridas >75min. Hidratação: 500-750ml/h em temperatura amena. Proteína 1.4-1.7g/kg/dia para recuperação muscular. Fonte: IOC Consensus 2023, ACSM.
RECUPERAÇÃO: Janela anabólica: proteína+carboidrato em 30-60min pós-treino. Sono 7-9h fundamental para adaptação (crescimento hormonal pico em sono profundo). Foam rolling reduz DOMS 20-40%. Corrida leve 24-48h após esforço máximo acelera recuperação ativa. Fonte: NSCA, Sports Medicine.
LESÕES COMUNS: Síndrome IT band: 8-10% corredores, causada por fraqueza glútea e aumento súbito de volume. Canelite: periostite tibial, excesso de pronação/supinação. Fascite plantar: primeiro passo matinal doloroso, tratamento inclui alongamento e palmilha. Regra: dor >3/10 = parar. Fonte: British Journal Sports Medicine.
TREINOS: Rodagem leve (Z2, 60-70% volume semanal), intervalado (10-15%), fartlek (10%), longão semanal (20-25% volume, não exceder 35% semanal). Progressão máxima 10%/semana (regra dos 10%). Fonte: Daniels Running Formula, ACSM.
GLP-1 (Ozempic/Wegovy/Mounjaro): evidência limitada em atletas. Reduz ingestão calórica 16-39%, risco de perda de massa muscular (STEP trials). Cautela com treinos longos em jejum. Proteína 1.2-1.6g/kg/dia essencial. Fonte: STEP trials, ADA 2025, PMC 11848261.
EQUIPAMENTOS: Troca de tênis a cada 600-800km. Drop alto (>8mm) favorece aterrissagem em calcanhar, drop zero favorece forefoot. Meias de compressão reduzem DOMS em 10-20%. Fonte: BJSM, Journal Strength Cond Research.

NÍVEIS DE RESPOSTA:
🟢 LIVRE: biomecânica, nutrição geral, treinos, equipamentos, recuperação, estratégia de prova.
🟡 COM RESSALVA: GLP-1/medicamentos, suplementos, overtraining, retorno pós-lesão. Responder com orientação + "consulte um profissional para decisões individuais".
🔴 REDIRECIONAR: dor persistente >3 dias, sintomas cardíacos (dor no peito, tontura intensa), lesão com edema/inchaço, qualquer sintoma médico grave. Sempre responder: "Isso requer avaliação de um médico ou fisioterapeuta antes de continuar treinando."`;

function avaliarPace(prop,base) {
  if(!prop||!base) return null;
  const p=parsePace(prop),b=parsePace(base);
  if(!p||!b) return null;
  const pct=((b-p)/b)*100;
  if(pct<=5)  return {nivel:"ok",cor:C.cyanB,msg:"Pace dentro da faixa segura."};
  if(pct<=10) return {nivel:"atencao",cor:C.amber,msg:`Pace ${Math.round(pct)}% mais rápido que o histórico.`};
  if(pct<=18) return {nivel:"risco",cor:C.coral,msg:`Pace ${Math.round(pct)}% acima do ritmo habitual. Alto risco de sobrecarga.`};
  return {nivel:"perigo",cor:"#ef4444",msg:`Pace ${Math.round(pct)}% acima do limite seguro. Risco real de lesão.`};
}

// ─── RUNNER FIGURE ────────────────────────────────────────────────────────────
const RUNNER_IMGS = { vertical: runnerVertical, stride: runnerStride, landing: runnerLanding, overstride: runnerOverstride };
function RunnerFig({ highlight="none", size=80 }) {
  const src = RUNNER_IMGS[highlight] || RUNNER_IMGS["vertical"];
  return (
    <img
      src={src}
      alt={"corredor - " + highlight}
      style={{width:size, height:"auto", objectFit:"contain", display:"block", borderRadius:6}}
    />
  );
}

// ─── MOCK STRAVA ACTIVITIES ───────────────────────────────────────────────────
const STRAVA_MOCK = [
  {
    id:"strava_001", source:"strava",
    nome:"Morning Run", tipo:"Corrida",
    data:"10 mai 25", timestamp:"2025-05-10T07:14:00Z",
    distancia_km:12.4, duracao_seg:4320, pace_medio:"5:48",
    bpm_medio:162, cadencia_media:174, forca_w:null,
    dplus:88, xp_ganho:0,
    polyline:[[0,0],[0.001,0.0008],[0.002,0.0018],[0.003,0.001],[0.004,0.0022],[0.005,0.0015],[0.006,0.003],[0.007,0.0025],[0.008,0.004],[0.009,0.003],[0.01,0.005]],
  },
  {
    id:"strava_002", source:"strava",
    nome:"Interval Training", tipo:"Corrida",
    data:"07 mai 25", timestamp:"2025-05-07T18:30:00Z",
    distancia_km:8.1, duracao_seg:2916, pace_medio:"6:00",
    bpm_medio:171, cadencia_media:178, forca_w:null,
    dplus:42, xp_ganho:0,
    polyline:[[0,0],[0.0008,0.0012],[0.002,0.001],[0.003,0.0022],[0.004,0.0018],[0.006,0.003],[0.007,0.0015],[0.009,0.004],[0.01,0.003]],
  },
  {
    id:"strava_003", source:"strava",
    nome:"Long Run Domingo", tipo:"Corrida",
    data:"04 mai 25", timestamp:"2025-05-04T08:00:00Z",
    distancia_km:21.1, duracao_seg:7200, pace_medio:"5:41",
    bpm_medio:155, cadencia_media:172, forca_w:null,
    dplus:210, xp_ganho:0,
    polyline:[[0,0],[0.002,0.001],[0.004,0.003],[0.006,0.002],[0.008,0.005],[0.01,0.004],[0.012,0.007],[0.014,0.005],[0.016,0.008],[0.018,0.006],[0.02,0.009],[0.018,0.011],[0.015,0.01],[0.012,0.012],[0.009,0.01],[0.006,0.013],[0.003,0.011],[0,0.009]],
  },
  {
    id:"strava_004", source:"strava",
    nome:"Easy Recovery", tipo:"Corrida",
    data:"02 mai 25", timestamp:"2025-05-02T06:45:00Z",
    distancia_km:5.2, duracao_seg:1950, pace_medio:"6:15",
    bpm_medio:142, cadencia_media:168, forca_w:null,
    dplus:22, xp_ganho:0,
    polyline:[[0,0],[0.002,0.001],[0.004,0.0008],[0.005,0.002],[0.006,0.0015],[0.007,0.003]],
  },
];

// ─── MOCK GARMIN ACTIVITIES ───────────────────────────────────────────────────
const GARMIN_MOCK = [
  {
    id:"garmin_001", source:"garmin",
    nome:"Treino estruturado · Tempo Run", tipo:"Corrida",
    data:"11 mai 25", timestamp:"2025-05-11T06:30:00Z",
    distancia_km:10.0, duracao_seg:3000, pace_medio:"5:00",
    bpm_medio:168, cadencia_media:180, forca_w:285,
    dplus:65, xp_ganho:0,
    dispositivo:"Forerunner 965",
    polyline:[[0,0],[0.0015,0.001],[0.003,0.002],[0.0045,0.0015],[0.006,0.003],[0.0075,0.0025],[0.009,0.004],[0.01,0.0035]],
  },
  {
    id:"garmin_002", source:"garmin",
    nome:"Long Run", tipo:"Corrida",
    data:"08 mai 25", timestamp:"2025-05-08T07:00:00Z",
    distancia_km:18.5, duracao_seg:6480, pace_medio:"5:50",
    bpm_medio:152, cadencia_media:174, forca_w:245,
    dplus:178, xp_ganho:0,
    dispositivo:"Forerunner 965",
    polyline:[[0,0],[0.002,0.0015],[0.005,0.002],[0.007,0.004],[0.01,0.0035],[0.013,0.006],[0.016,0.005],[0.018,0.008],[0.016,0.011],[0.012,0.012],[0.008,0.013],[0.004,0.012],[0,0.01]],
  },
  {
    id:"garmin_003", source:"garmin",
    nome:"Trail run · Serra", tipo:"Trail",
    data:"05 mai 25", timestamp:"2025-05-05T15:20:00Z",
    distancia_km:14.2, duracao_seg:5520, pace_medio:"6:29",
    bpm_medio:163, cadencia_media:170, forca_w:312,
    dplus:520, xp_ganho:0,
    dispositivo:"Forerunner 965",
    polyline:[[0,0],[0.001,0.002],[0.003,0.001],[0.005,0.004],[0.004,0.007],[0.007,0.009],[0.01,0.008],[0.012,0.011],[0.009,0.013],[0.005,0.012],[0.002,0.014]],
  },
];

// ─── CORRIDAS DEMO (sempre visíveis para testes) ─────────────────────────────
const CORRIDAS_DEMO = [
  {
    id:"demo_001", source:"temporun",
    nome:"Rodagem Leve · Dún Laoghaire", tipo:"Rodagem Leve",
    data:"15 mai. de 26", timestamp:"2026-05-15T07:30:00Z",
    distancia_km:8.5, duracao_seg:2890, pace_medio:"5:41",
    cadencia_media:174, calorias:552, dplus:38, xp_ganho:382,
    polyline:[
      [-6.1358,53.2944],[-6.1342,53.2950],[-6.1325,53.2958],[-6.1310,53.2964],
      [-6.1295,53.2970],[-6.1278,53.2975],[-6.1262,53.2980],[-6.1248,53.2974],
      [-6.1235,53.2965],[-6.1225,53.2955],[-6.1218,53.2942],[-6.1215,53.2928],
      [-6.1220,53.2915],[-6.1230,53.2905],[-6.1245,53.2898],[-6.1260,53.2895],
      [-6.1275,53.2900],[-6.1290,53.2908],[-6.1305,53.2918],[-6.1318,53.2928],
      [-6.1330,53.2938],[-6.1342,53.2932],[-6.1350,53.2920],[-6.1355,53.2908],
      [-6.1352,53.2895],[-6.1345,53.2885],[-6.1335,53.2878],[-6.1322,53.2875],
      [-6.1308,53.2878],[-6.1295,53.2885],[-6.1282,53.2895],[-6.1275,53.2908],
      [-6.1278,53.2922],[-6.1288,53.2932],[-6.1300,53.2940],[-6.1315,53.2944],
      [-6.1330,53.2944],[-6.1345,53.2944],[-6.1358,53.2944],
    ],
  },
];

// ─── GOOGLE MAPS STATIC + ALTIMETRIA ─────────────────────────────────────────
// Chave pública — substitua por sua API Key do Google Cloud (Maps Static API)
const GMAPS_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

// Converte array [[lat,lng],...] para encoded polyline (Google format)
function encodePolyline(pts) {
  let out = "", prev = [0, 0];
  for (const [lat, lng] of pts) {
    for (const [i, val] of [[0, lat], [1, lng]]) {
      let v = Math.round((val - prev[i]) * 1e5);
      v = v < 0 ? ~(v << 1) : (v << 1);
      prev[i] = val;
      while (v >= 0x20) { out += String.fromCharCode((0x20 | (v & 0x1f)) + 63); v >>= 5; }
      out += String.fromCharCode(v + 63);
    }
  }
  return out;
}

// Gera URL do Google Maps Static API com polyline e markers início/fim
function buildMapUrl(polyline, w=350, h=160) {
  if(!polyline || polyline.length < 2 || GMAPS_KEY === "YOUR_GOOGLE_MAPS_API_KEY") return null;
  const enc = encodePolyline(polyline);
  const start = polyline[0];
  const end   = polyline[polyline.length - 1];
  const params = [
    `size=${w}x${h}`,
    `maptype=roadmap`,
    `style=element:geometry|color:0x0a0f2a`,
    `style=element:labels.text.fill|color:0x8b9ec7`,
    `style=element:labels.text.stroke|color:0x0a0f2a`,
    `style=feature:road|element:geometry|color:0x161b4a`,
    `style=feature:road|element:geometry.stroke|color:0x1e2456`,
    `style=feature:water|element:geometry|color:0x06071a`,
    `style=feature:landscape|element:geometry|color:0x080a24`,
    `path=color:0x22d3eeff|weight:4|enc:${encodeURIComponent(enc)}`,
    `markers=color:0x22d3ee|size:small|${start[0]},${start[1]}`,
    `markers=color:0xe8623a|size:small|${end[0]},${end[1]}`,
    `key=${GMAPS_KEY}`,
  ];
  return `https://maps.googleapis.com/maps/api/staticmap?${params.join("&")}`;
}

// Altimetria SVG a partir de array de elevações mock ou real
function AltimetriaChart({ polyline, dplus=0, color=C.amber }) {
  // Gera elevações simuladas baseadas no dplus real do treino
  const n = Math.min(polyline?.length || 8, 16);
  const pts = Array.from({length:n},(_,i)=>{
    const prog = i/(n-1);
    // curva com subida e descida baseada no dplus
    const hill = Math.sin(prog * Math.PI) * (dplus/2);
    return 100 + hill + Math.sin(prog*Math.PI*3)*10;
  });
  const min = Math.min(...pts), max = Math.max(...pts), range = max-min||1;
  const W=340, H=52, pad=6;
  const x = i => pad + (i/(n-1))*(W-pad*2);
  const y = v => H - pad - ((v-min)/range)*(H-pad*2);
  const d = pts.map((v,i)=>`${i===0?"M":"L"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const area = d + ` L${x(n-1).toFixed(1)},${H} L${x(0).toFixed(1)},${H} Z`;
  return (
    <div style={{padding:"7px 12px 9px",background:C.bg}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
        <div style={{display:"flex",alignItems:"center",gap:5}}><Ic n="mountain" z={13} c={color}/><span style={{color:C.ts,fontSize:10,fontFamily:"monospace",fontWeight:700,textTransform:"uppercase",letterSpacing:0.5}}>Altimetria</span></div>
        <span style={{color:color,fontSize:11,fontWeight:700,fontFamily:"monospace"}}>▲ {dplus}m ganho</span>
      </div>
      <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} style={{display:"block",overflow:"visible"}}>
        <defs>
          <linearGradient id="altG" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.5"/>
            <stop offset="100%" stopColor={color} stopOpacity="0.03"/>
          </linearGradient>
        </defs>
        <path d={area} fill="url(#altG)"/>
        <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        {[0,Math.floor(n/2),n-1].map(i=>(
          <g key={i}>
            <line x1={x(i)} y1={0} x2={x(i)} y2={H} stroke={C.border} strokeWidth="0.5" strokeDasharray="2,3"/>
            <text x={x(i)} y={H-1} textAnchor="middle" fill={C.tg} fontSize="7" fontFamily="monospace">km {((i/(n-1))*(dplus/10||5)).toFixed(1)}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// Mapa para treinos históricos (com polyline real do GPS)
function RunMap({ polyline, color=C.cyanB, dplus=0 }) {
  if(!polyline||polyline.length<2) return null;
  const mapUrl = buildMapUrl(polyline);
  return (
    <div style={{borderRadius:10,overflow:"hidden",background:"#080c20"}}>
      {mapUrl ? (
        <img
          src={mapUrl}
          alt="mapa do percurso"
          style={{width:"100%",height:160,objectFit:"cover",display:"block"}}
          onError={e=>{ e.target.style.display="none"; e.target.nextSibling.style.display="block"; }}
        />
      ) : (
        <RunMapSvgFallback polyline={polyline} color={color}/>
      )}
      {/* Fallback oculto, aparece se a imagem falhar */}
      <div style={{display:"none"}}><RunMapSvgFallback polyline={polyline} color={color}/></div>
      <AltimetriaChart polyline={polyline} dplus={dplus} color={C.amber}/>
    </div>
  );
}

// SVG fallback (quando não há API key ou falha de rede)
function RunMapSvgFallback({ polyline, color=C.cyanB }) {
  const W=300, H=130, pad=18;
  const safe=(polyline||[]).filter(p=>p&&p[0]!==undefined&&p[1]!==undefined);
  if(safe.length<2) return null;
  const lats=safe.map(p=>p[0]), lngs=safe.map(p=>p[1]);
  const minLat=Math.min(...lats), maxLat=Math.max(...lats);
  const minLng=Math.min(...lngs), maxLng=Math.max(...lngs);
  const rLat=maxLat-minLat||0.001, rLng=maxLng-minLng||0.001;
  const scale=Math.min((W-pad*2)/rLng,(H-pad*2)/rLat);
  const tx=lng=>pad+(lng-minLng)*scale;
  const ty=lat=>H-pad-(lat-minLat)*scale;
  const pts=safe.map(p=>`${tx(p[1]).toFixed(1)},${ty(p[0]).toFixed(1)}`).join(" ");
  const last=safe[safe.length-1];
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{display:"block",background:"#080c20",height:130}}>
      <defs>
        <linearGradient id="pgr2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={C.violet}/><stop offset="100%" stopColor={color}/>
        </linearGradient>
        <filter id="pglow2"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {[0.25,0.5,0.75].map((f,i)=><line key={i} x1={pad} y1={pad+f*(H-pad*2)} x2={W-pad} y2={pad+f*(H-pad*2)} stroke="#1a2050" strokeWidth="0.5"/>)}
      <polyline points={pts} fill="none" stroke="url(#pgr2)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" filter="url(#pglow2)"/>
      <circle cx={tx(safe[0][1])} cy={ty(safe[0][0])} r={5} fill={C.cyanB}/><circle cx={tx(safe[0][1])} cy={ty(safe[0][0])} r={9} fill={C.cyanB} opacity="0.2"/>
      <circle cx={tx(last[1])} cy={ty(last[0])} r={5} fill={C.coral}/><circle cx={tx(last[1])} cy={ty(last[0])} r={9} fill={C.coral} opacity="0.2"/>
      <rect x={2} y={H-14} width={72} height={12} rx={3} fill="#06071a" opacity="0.9"/>
      <text x={38} y={H-5} textAnchor="middle" fill={C.td} fontSize="7" fontWeight="700" fontFamily="monospace">sem API key</text>
    </svg>
  );
}

// ─── STREET MAP GPS (ao vivo — usa Google Maps Static centrado na posição atual) ─

// ─── LIVE MAP (canvas ao vivo durante gravação) ───────────────────────────────
// Canvas fallback quando Mapbox não disponível
function LiveMapCanvas({ route=[], gpsStatus="off" }) {
  const canvasRef = useRef(null);
  useEffect(()=>{
    const canvas = canvasRef.current;
    if(!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle = "#080a24"; ctx.fillRect(0,0,W,H);
    ctx.strokeStyle = "#1e245622"; ctx.lineWidth = 1;
    for(let i=0;i<W;i+=20){ctx.beginPath();ctx.moveTo(i,0);ctx.lineTo(i,H);ctx.stroke();}
    for(let i=0;i<H;i+=20){ctx.beginPath();ctx.moveTo(0,i);ctx.lineTo(W,i);ctx.stroke();}
    if(route.length < 2){
      ctx.fillStyle = gpsStatus==="searching"?"#f59e0b":gpsStatus==="active"?"#22d3ee":"#3a4a78";
      ctx.font = "bold 11px monospace"; ctx.textAlign = "center";
      ctx.fillText(gpsStatus==="searching"?"Buscando GPS...":gpsStatus==="active"?"Aguardando movimento...":gpsStatus==="error"?"GPS indisponível":"Inicie para ver o mapa", W/2, H/2);
      return;
    }
    const lats=route.map(p=>p[0]),lngs=route.map(p=>p[1]);
    const minLat=Math.min(...lats),maxLat=Math.max(...lats),minLng=Math.min(...lngs),maxLng=Math.max(...lngs);
    const pad=24,rangeX=maxLng-minLng||0.0001,rangeY=maxLat-minLat||0.0001;
    const scale=Math.min((W-pad*2)/rangeX,(H-pad*2)/rangeY);
    const toX=lng=>pad+(lng-minLng)*scale+(W-pad*2-rangeX*scale)/2;
    const toY=lat=>H-pad-(lat-minLat)*scale-(H-pad*2-rangeY*scale)/2;
    ctx.beginPath(); ctx.moveTo(toX(route[0][1]),toY(route[0][0]));
    for(let i=1;i<route.length;i++) ctx.lineTo(toX(route[i][1]),toY(route[i][0]));
    ctx.strokeStyle="#7c3aed44"; ctx.lineWidth=6; ctx.lineCap="round"; ctx.lineJoin="round"; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(toX(route[0][1]),toY(route[0][0]));
    for(let i=1;i<route.length;i++) ctx.lineTo(toX(route[i][1]),toY(route[i][0]));
    ctx.strokeStyle="#a855f7"; ctx.lineWidth=3; ctx.stroke();
    ctx.beginPath(); ctx.arc(toX(route[0][1]),toY(route[0][0]),5,0,Math.PI*2); ctx.fillStyle="#22c55e"; ctx.fill();
    const last=route[route.length-1];
    ctx.beginPath(); ctx.arc(toX(last[1]),toY(last[0]),8,0,Math.PI*2); ctx.fillStyle="#22d3ee33"; ctx.fill();
    ctx.beginPath(); ctx.arc(toX(last[1]),toY(last[0]),4,0,Math.PI*2); ctx.fillStyle="#22d3ee"; ctx.fill();
    ctx.beginPath(); ctx.arc(toX(last[1]),toY(last[0]),4,0,Math.PI*2); ctx.strokeStyle="#fff"; ctx.lineWidth=1.5; ctx.stroke();
  },[route,gpsStatus]);
  return <canvas ref={canvasRef} width={360} height={160} style={{width:"100%",height:160,display:"block",borderRadius:"0 0 10px 10px"}}/>;
}

function LiveMap({ route=[], gpsStatus="off", accuracy=null, tick=0, height=160, fillContainer=false }) {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const startMarkerRef = useRef(null);
  const [mbLoaded, setMbLoaded] = useState(false);
  const [mbError, setMbError] = useState(false);

  const MB_TOKEN = MAPBOX_TOKEN;

  // Mapbox carregado via index.html — só verifica disponibilidade
  useEffect(()=>{
    if(window.mapboxgl){
      setMbLoaded(true);
    } else {
      // Aguarda até 5s caso o script ainda esteja carregando
      let tries = 0;
      const interval = setInterval(()=>{
        tries++;
        if(window.mapboxgl){ setMbLoaded(true); clearInterval(interval); }
        else if(tries >= 50){ setMbError(true); clearInterval(interval); }
      }, 100);
      return ()=>clearInterval(interval);
    }
  }, []);

  // Inicializa o mapa
  useEffect(()=>{
    if(!mbLoaded || !mapContainer.current || mapRef.current) return;
    if(!MB_TOKEN){ setMbError(true); return; }
    try {
      window.mapboxgl.accessToken = MB_TOKEN;
      const center = route.length > 0 ? [route[route.length-1][1], route[route.length-1][0]] : [-6.2603, 53.3498];
      const map = new window.mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/satellite-streets-v12",
        center,
        zoom: 15,
        attributionControl: false,
        logoPosition: "bottom-left",
        failIfMajorPerformanceCaveat: false,
      });
      mapRef.current = map;
      map.on("error", (e)=>{ console.warn("Mapbox error:", e); });
      map.on("load", ()=>{
        // Source com lineMetrics:true obrigatório para line-gradient
        map.addSource("route", {
          type: "geojson",
          lineMetrics: true,
          data: { type:"Feature", properties:{}, geometry:{ type:"LineString", coordinates:[] }}
        });
        // Sombra da rota
        map.addLayer({ id:"route-shadow", type:"line", source:"route",
          layout:{"line-cap":"round","line-join":"round"},
          paint:{"line-color":"rgba(0,0,0,0.53)","line-width":8,"line-blur":4}
        });
        // Rota com gradiente de pace
        map.addLayer({ id:"route-line", type:"line", source:"route",
          layout:{"line-cap":"round","line-join":"round"},
          paint:{
            "line-width": 4,
            "line-gradient": ["interpolate",["linear"],["line-progress"],
              0,   "#3b82f6",
              0.33,"#22c55e",
              0.66,"#f59e0b",
              1,   "#ef4444"
            ]
          }
        });
        // Marcador posição atual
        const posEl = document.createElement("div");
        posEl.style.cssText = "width:16px;height:16px;border-radius:50%;background:#22d3ee;border:3px solid #fff;box-shadow:0 0 12px #22d3ee99;cursor:default";
        markerRef.current = new window.mapboxgl.Marker({element:posEl,anchor:"center"});
        if(route.length > 0){
          markerRef.current.setLngLat([route[route.length-1][1], route[route.length-1][0]]).addTo(map);
        }
      });
    } catch(e) {
      console.error("Mapbox init error:", e);
      setMbError(true);
    }
    return ()=>{ try{ mapRef.current?.remove(); mapRef.current=null; }catch{} };
  }, [mbLoaded]);

  // Atualiza rota e posição a cada novo ponto GPS
  useEffect(()=>{
    const map = mapRef.current;
    if(!map || !map.isStyleLoaded()) return;
    if(route.length === 0) return;
    const last = [route[route.length-1][1], route[route.length-1][0]];
    // Sempre centraliza no último ponto — mesmo com 1 ponto (pré-aquecimento)
    map.easeTo({ center:last, duration:400 });
    if(markerRef.current) markerRef.current.setLngLat(last).addTo(map);
    // Rota só quando há 2+ pontos
    if(route.length >= 2){
      const coords = route.map(p=>[p[1], p[0]]);
      try {
        map.getSource("route")?.setData({
          type:"Feature", properties:{}, geometry:{ type:"LineString", coordinates:coords }
        });
      } catch{}
      if(!startMarkerRef.current && window.mapboxgl){
        const el = document.createElement("div");
        el.style.cssText = "width:14px;height:14px;border-radius:50%;background:#22c55e;border:2.5px solid #fff;box-shadow:0 0 8px #22c55e88";
        startMarkerRef.current = new window.mapboxgl.Marker({element:el,anchor:"center"})
          .setLngLat([route[0][1], route[0][0]]).addTo(map);
      }
    }
  }, [tick, route.length]);

  // Fallback canvas quando Mapbox não disponível
  if(mbError) return <LiveMapCanvas route={route} gpsStatus={gpsStatus}/>;

  // GPS desligado e sem rota — estado inicial
  if(!mbLoaded && gpsStatus==="off" && route.length===0) return (
    <div style={{width:"100%",height:fillContainer?"100%":height,background:"#080a24",borderRadius:"0 0 10px 10px",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:6}}>
      <div style={{width:8,height:8,borderRadius:"50%",background:"#3a4a78"}}/>
      <span style={{color:"#3a4a78",fontFamily:"monospace",fontSize:10,fontWeight:700}}>Inicie para ver o mapa</span>
    </div>
  );

  // Mapbox carregando
  if(!mbLoaded) return (
    <div style={{width:"100%",height:fillContainer?"100%":height,background:"#080a24",borderRadius:"0 0 10px 10px",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
      <div style={{width:10,height:10,borderRadius:"50%",border:"2px solid #22d3ee",borderTopColor:"transparent",animation:"spin 0.8s linear infinite"}}/>
      <span style={{color:"#22d3ee",fontFamily:"monospace",fontSize:10,fontWeight:700}}>Carregando mapa...</span>
    </div>
  );

  return (
    <div style={{position:"relative",width:"100%",height:fillContainer?"100%":height,borderRadius:"0 0 10px 10px",overflow:"hidden"}}>
      <div ref={mapContainer} style={{width:"100%",height:fillContainer?"100%":height+"px",position:"absolute",top:0,left:0}}/>
      <div style={{position:"absolute",top:8,right:8,background:"#000000bb",borderRadius:6,padding:"3px 8px",backdropFilter:"blur(4px)"}}>
        <span style={{color:"#22d3ee",fontFamily:"monospace",fontSize:9,fontWeight:800}}>
          {gpsStatus==="active"?`● GPS ±${accuracy||"?"}m`:"● AO VIVO"}
        </span>
      </div>
      <div style={{position:"absolute",bottom:8,left:8,background:"#000000bb",borderRadius:6,padding:"3px 8px",backdropFilter:"blur(4px)",display:"flex",alignItems:"center",gap:5}}>
        <span style={{fontSize:9,color:"#aaa",fontFamily:"monospace"}}>lento</span>
        <div style={{width:36,height:3,borderRadius:2,background:"linear-gradient(90deg,#3b82f6,#22c55e,#f59e0b,#ef4444)"}}/>
        <span style={{fontSize:9,color:"#aaa",fontFamily:"monospace"}}>rápido</span>
      </div>
    </div>
  );
}

function StreetMap({ km=0, lat=-23.561, lng=-46.656 }) {
  // Durante a gravação, exibe mapa real centrado no usuário via Static Maps
  const mapUrl = GMAPS_KEY !== "YOUR_GOOGLE_MAPS_API_KEY"
    ? `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=16&size=350x160&maptype=roadmap&style=element:geometry|color:0x0a0f2a&style=element:labels.text.fill|color:0x8b9ec7&style=feature:road|element:geometry|color:0x161b4a&style=feature:water|element:geometry|color:0x06071a&style=feature:landscape|element:geometry|color:0x080a24&markers=color:0x22d3ee|size:mid|${lat},${lng}&key=${GMAPS_KEY}`
    : null;
  const prog=Math.min(km/10,1);
  if(mapUrl) return (
    <div style={{position:"relative",borderRadius:0,overflow:"hidden"}}>
      <img src={mapUrl} alt="mapa ao vivo" style={{width:"100%",height:155,objectFit:"cover",display:"block"}}/>
      {/* overlay GPS dot */}
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>
        <div style={{width:18,height:18,borderRadius:"50%",background:C.cyanB,opacity:0.3,position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}/>
        <div style={{width:10,height:10,borderRadius:"50%",background:C.cyanB,border:"2px solid #fff",position:"relative"}}/>
      </div>
      <div style={{position:"absolute",bottom:8,right:8,background:C.bg+"ee",borderRadius:6,padding:"3px 8px"}}>
        <span style={{color:C.cyanB,fontFamily:"monospace",fontSize:9,fontWeight:800}}>● GPS ATIVO</span>
      </div>
    </div>
  );
  // SVG fallback ao vivo
  return (
    <svg width="100%" height="150" viewBox="0 0 350 150" style={{display:"block"}}>
      <defs>
        <linearGradient id="rG" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor={C.cyanB}/><stop offset="100%" stopColor={C.violetL}/></linearGradient>
        <filter id="rGl"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <clipPath id="rCl"><rect x="0" y="0" width={350*prog} height="150"/></clipPath>
      </defs>
      <rect width="350" height="150" fill="#0a0f2a"/>
      {[18,38,58,78,98,118,138].map(y=><line key={y} x1="0" y1={y} x2="350" y2={y} stroke="#14183a" strokeWidth="4"/>)}
      {[30,62,100,140,180,220,260,300,340].map(x=><line key={x} x1={x} y1="0" x2={x} y2="150" stroke="#14183a" strokeWidth="4"/>)}
      {[[32,20,28,16],[96,20,34,16],[150,20,26,16],[204,20,30,16],[264,20,28,16],[32,42,28,14],[96,42,34,14],[150,42,26,14],[204,42,30,14],[32,62,28,14],[96,62,34,14],[150,62,26,14],[204,62,30,14],[264,62,30,14],[32,100,28,14],[96,100,34,14],[150,100,26,14],[204,100,30,14]].map(([x,y,w,h],i)=><rect key={i} x={x} y={y} width={w} height={h} fill="#0d1130" rx="2" opacity="0.8"/>)}
      <path d="M24,140 Q38,122 62,120 Q86,118 102,101 Q118,84 142,82 Q162,80 178,66 Q193,52 213,50 Q237,48 258,42 Q283,38 308,34 Q328,32 338,24" fill="none" stroke={C.violet} strokeWidth="3" strokeLinecap="round" opacity="0.22" strokeDasharray="6,3"/>
      <path d="M24,140 Q38,122 62,120 Q86,118 102,101 Q118,84 142,82 Q162,80 178,66 Q193,52 213,50 Q237,48 258,42 Q283,38 308,34 Q328,32 338,24" fill="none" stroke="url(#rG)" strokeWidth="4" strokeLinecap="round" filter="url(#rGl)" clipPath="url(#rCl)"/>
      <circle cx={24+prog*314} cy={140-prog*116} r={10} fill={C.cyanB} opacity="0.15"/>
      <circle cx={24+prog*314} cy={140-prog*116} r={6} fill={C.cyanB} opacity="0.3"/>
      <circle cx={24+prog*314} cy={140-prog*116} r={4} fill="#fff"/>
      <circle cx={24+prog*314} cy={140-prog*116} r={2.5} fill={C.cyanB}/>
      <circle cx="24" cy="140" r="5" fill={C.cyanB}/><circle cx="24" cy="140" r="3" fill="#fff"/>
      <rect x="255" y="120" width="87" height="21" rx="6" fill={C.bg} opacity="0.95"/>
      <text x="298" y="134" textAnchor="middle" fill={C.cyanB} fontSize="9" fontWeight="800" fontFamily="monospace">GPS ATIVO</text>
    </svg>
  );
}

// ─── SMOOTH CHART ─────────────────────────────────────────────────────────────
function KmChart({ corridas, slice, setSlice }) {
  const today=new Date();
  const seed=[
    {d:new Date(today-864e5*1),km:10.4},{d:new Date(today-864e5*3),km:22.1},
    {d:new Date(today-864e5*5),km:8.2},{d:new Date(today-864e5*7),km:12.5},
    {d:new Date(today-864e5*10),km:15},{d:new Date(today-864e5*14),km:21},
    {d:new Date(today-864e5*21),km:25},{d:new Date(today-864e5*28),km:18},
    {d:new Date(today-864e5*42),km:28},{d:new Date(today-864e5*65),km:14},
    {d:new Date(today-864e5*90),km:23},{d:new Date(today-864e5*130),km:30},
    {d:new Date(today-864e5*180),km:25},{d:new Date(today-864e5*240),km:20},
    {d:new Date(today-864e5*300),km:22},{d:new Date(today-864e5*360),km:14},
  ];
  const stored=corridas.map(r=>({d:new Date(r.timestamp),km:r.distancia_km}));
  const all=[...seed,...stored].sort((a,b)=>a.d-b.d);
  const sliceDays={"7d":7,"1m":30,"3m":90,"6m":180,"1a":365,"ytd":Math.floor((today-new Date(today.getFullYear(),0,1))/864e5),"max":99999};
  const cutoff=new Date(today-sliceDays[slice]*864e5);
  const pts=all.filter(r=>r.d>=cutoff);
  const W=320,H=90,PL=28,PR=8,PT=10,PB=22,cW=W-PL-PR,cH=H-PT-PB;
  const maxKm=pts.length>0?Math.max(...pts.map(r=>r.km)):30;
  const minT=pts.length>0?pts[0].d.getTime():cutoff.getTime();
  const maxT=today.getTime(),tR=maxT-minT||1;
  const tx=t=>PL+((t-minT)/tR)*cW,ty=km=>PT+cH-(km/(maxKm*1.15))*cH;
  function smooth(pp){
    if(pp.length<2) return pp.length?`M${tx(pp[0].d.getTime())},${ty(pp[0].km)}`:"";
    let d=`M${tx(pp[0].d.getTime()).toFixed(1)},${ty(pp[0].km).toFixed(1)}`;
    for(let i=1;i<pp.length;i++){
      const x0=tx(pp[i-1].d.getTime()),y0=ty(pp[i-1].km),x1=tx(pp[i].d.getTime()),y1=ty(pp[i].km),cx=(x0+x1)/2;
      d+=` C${cx.toFixed(1)},${y0.toFixed(1)} ${cx.toFixed(1)},${y1.toFixed(1)} ${x1.toFixed(1)},${y1.toFixed(1)}`;
    }
    return d;
  }
  const lp=smooth(pts);
  const ap=pts.length?lp+` L${tx(pts[pts.length-1].d.getTime()).toFixed(1)},${PT+cH} L${tx(pts[0].d.getTime()).toFixed(1)},${PT+cH} Z`:"";
  const tot=pts.reduce((a,r)=>a+r.km,0);
  const mxR=pts.length?Math.max(...pts.map(r=>r.km)):0;
  const mxPt=pts.find(r=>r.km===mxR);
  const yL=[0,Math.round(maxKm*0.5),Math.round(maxKm)];
  const sL={"7d":"7d","1m":"1m","3m":"3m","6m":"6m","1a":"1a","ytd":"YTD","max":"Máx"};
  const xL=[];
  if(pts.length){const n=slice==="7d"?7:4;for(let i=0;i<=n;i++){const t=minT+(tR*i/n);const d=new Date(t);xL.push({x:tx(t),l:slice==="7d"?["D","S","T","Q","Q","S","S"][d.getDay()]:d.toLocaleDateString("pt-BR",{day:"2-digit",month:"short"}).slice(0,5)});}}
  return (
    <div style={{background:"linear-gradient(135deg,"+C.s1+","+C.s2+")",borderRadius:16,padding:"13px 13px 10px",marginBottom:14,border:"1px solid "+C.border,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-30,left:"50%",transform:"translateX(-50%)",width:200,height:80,borderRadius:"50%",background:C.violet+"15",filter:"blur(20px)",pointerEvents:"none"}}/>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,position:"relative"}}>
        <SL><Ic n="bars" z={13} c={C.ts}/>Evolução km</SL>
        <div style={{display:"flex",gap:12}}>
          <div style={{textAlign:"right"}}><p style={{color:C.cyanB,fontWeight:800,fontSize:13,margin:0,fontFamily:"'Space Grotesk',sans-serif"}}>{tot.toFixed(1)}</p><p style={{color:C.tg,fontFamily:"monospace",fontSize:8,textTransform:"uppercase",letterSpacing:0.5,margin:0}}>total</p></div>
          <div style={{textAlign:"right"}}><p style={{color:C.amber,fontWeight:800,fontSize:13,margin:0,fontFamily:"'Space Grotesk',sans-serif"}}>{mxR.toFixed(1)}</p><p style={{color:C.tg,fontFamily:"monospace",fontSize:8,textTransform:"uppercase",letterSpacing:0.5,margin:0}}>maior</p></div>
        </div>
      </div>
      <div style={{display:"flex",gap:4,marginBottom:11,position:"relative"}}>
        {Object.entries(sL).map(([k,l])=>(
          <button key={k} onClick={()=>setSlice(k)} style={{flex:1,background:slice===k?"linear-gradient(135deg,"+C.violet+","+C.cyan+")":C.s3,color:slice===k?"#fff":C.td,border:"none",borderRadius:6,padding:"5px 0",fontFamily:"monospace",fontSize:9,fontWeight:700,cursor:"pointer",transition:"all 0.15s"}}>{l}</button>
        ))}
      </div>
      <svg width="100%" height={H} viewBox={"0 0 "+W+" "+H} style={{display:"block",overflow:"visible"}}>
        <defs>
          <linearGradient id="cg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor={C.violet} stopOpacity="0.4"/><stop offset="50%" stopColor={C.cyan} stopOpacity="0.12"/><stop offset="100%" stopColor={C.cyan} stopOpacity="0.01"/></linearGradient>
          <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor={C.violet}/><stop offset="100%" stopColor={C.cyanB}/></linearGradient>
          <filter id="cglow"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        {yL.map((v,i)=><line key={i} x1={PL} y1={ty(v)} x2={W-PR} y2={ty(v)} stroke={C.border} strokeWidth="0.6" strokeDasharray={i>0?"3,4":""}/>)}
        {yL.map((v,i)=><text key={i} x={PL-4} y={ty(v)+3.5} textAnchor="end" fill={C.tg} fontSize="8" fontFamily="monospace">{v}</text>)}
        {xL.map((l,i)=><text key={i} x={l.x} y={H-4} textAnchor="middle" fill={C.tg} fontSize="8" fontFamily="monospace">{l.l}</text>)}
        {ap&&<path d={ap} fill="url(#cg)"/>}
        {lp&&<path d={lp} fill="none" stroke="url(#lg)" strokeWidth="2.5" strokeLinecap="round" filter="url(#cglow)"/>}
        {pts.map((r,i)=>{const x=tx(r.d.getTime()),y=ty(r.km),last=i===pts.length-1;return (<g key={i}>{last&&<circle cx={x} cy={y} r={8} fill={C.cyanB} opacity="0.15"/>}<circle cx={x} cy={y} r={last?3.5:2} fill={last?C.cyanB:"#fff"} stroke={last?"none":C.violet} strokeWidth={last?0:1} opacity={last?1:0.55}/></g>);})}
        {mxPt&&pts.length>2&&<g><rect x={tx(mxPt.d.getTime())-18} y={ty(mxPt.km)-22} width="36" height="13" rx="4" fill={C.amber} opacity="0.92"/><text x={tx(mxPt.d.getTime())} y={ty(mxPt.km)-12} textAnchor="middle" fill="#000" fontSize="8.5" fontWeight="800" fontFamily="monospace">{mxPt.km}km</text></g>}
        {!pts.length&&<text x={W/2} y={H/2} textAnchor="middle" fill={C.td} fontSize="11" fontFamily="monospace">Sem dados neste período</text>}
      </svg>
    </div>
  );
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const RPs_base=[
  {dist:"1K",  tempo:"3:42",   data:"12 mar 25",melhora:"8s",  cor:C.cyanB},
  {dist:"5K",  tempo:"19:54",  data:"2 abr 25", melhora:"1:12",cor:C.cyan},
  {dist:"10K", tempo:"42:18",  data:"18 jan 25",melhora:"2:34",cor:C.cyanL},
  {dist:"21K", tempo:"1:34:07",data:"5 out 24", melhora:"4:21",cor:C.violetL},
  {dist:"42K", tempo:"3:28:44",data:"15 set 24",melhora:null,  cor:C.coral},
];
const atributos=[
  {nome:"Resistência",  val:72,cor:C.cyanB},{nome:"Velocidade",   val:58,cor:C.cyan},
  {nome:"Trail Técnico",val:45,cor:C.amber},{nome:"Recuperação",  val:81,cor:C.cyanL},
];
const missoes=[
  {titulo:"A Serra Chama",    desc:"3 treinos com D+600m esta semana",xp:450,prog:2,total:3,cor:C.amber},
  {titulo:"Cadência Perfeita",desc:"175+ spm por 20min em 2 corridas",xp:200,prog:1,total:2,cor:C.cyanB},
  {titulo:"Madrugador",       desc:"Corra antes das 7h por 5 dias",   xp:300,prog:3,total:5,cor:C.violetL},
];
const saberTopicos=[
  {cat:"Biomecânica",icon:"bio",      cor:C.cyan,   qs:["Qual é o melhor tipo de pisada?","Cadência ideal para corredores","Como melhorar a economia de corrida?"]},
  {cat:"Mitos",      icon:"bolt",     cor:C.coral,  qs:["Corrida machuca os joelhos?","Preciso esticar antes de correr?"]},
  {cat:"Nutrição",   icon:"nutrition",cor:C.cyanB,  qs:["O que comer antes de um longão?","Gel energético: quando usar?"]},
  {cat:"Recuperação",icon:"sleep",    cor:C.violetL,qs:["Banho frio pós-treino funciona?","Sono e performance na corrida"]},
  {cat:"Caneta Emagrecedora & Corrida",icon:"warning",cor:C.amber,qs:["GLP-1 afeta meu desempenho na corrida?","Como treinar usando Ozempic ou Wegovy?","Perco músculo com medicamento GLP-1?","O que comer antes de correr usando GLP-1?"]},
];
const provas_data=[
  {id:"p1",nome:"Granbike Serra Catarinense",data:"18 mai",local:"Lages, SC",       tipo:"Trail",      dist:["21K","42K"],      itra:"2 pts",cor:C.cyanB,ins:"Abertas",link:"https://granbike.com.br"},
  {id:"p2",nome:"Maratona de São Paulo",     data:"1 jun", local:"São Paulo, SP",   tipo:"Rua",        dist:["21K","42K"],      itra:null,   cor:C.cyan, ins:"Abertas",link:"https://maratonasp.com.br"},
  {id:"p3",nome:"Ultra Serra do Mar 80K",    data:"14 jun",local:"Cubatão, SP",     tipo:"Ultra Trail",dist:["30K","80K"],      itra:"4 pts",cor:C.amber,ins:"Abertas",link:"https://ultraserradomar.com.br"},
  {id:"p4",nome:"UTSB Ultra Trail",          data:"28 jun",local:"Poços de Caldas", tipo:"Trail",      dist:["15K","42K","75K"],itra:"3 pts",cor:C.amber,ins:"Em breve",link:"https://utsb.com.br"},
];
const lojaItems=[
  {loja:"Netshoes",     preco:"R$ 849",tipo:"online",       frete:"Grátis",prazo:"2 dias",ok:true},
  {loja:"Centauro",     preco:"R$ 899",tipo:"físico+online",frete:"R$ 12", prazo:"Hoje",  ok:false},
  {loja:"Nike Store SP",preco:"R$ 949",tipo:"físico",       frete:"—",     prazo:"Hoje",  ok:false},
];
const frases=["Cada quilômetro te faz mais forte do que ontem.","O ritmo que importa é o seu.","Subidas constroem quem você vai ser na descida.","Não existe mal tempo. Existe falta de preparo.","Corra pelo processo, não só pelo resultado.","Seu maior adversário é a voz que diz 'para'."];

// ─── RUN DETAIL MODAL ─────────────────────────────────────────────────────────
function RunDetailModal({ run, onClose, onShare }) {
  if(!run) return null;
  const isStrava = run.source==="strava";
  const isGarmin = run.source==="garmin";
  const sourceColor = isStrava?C.strava:isGarmin?C.garmin:C.cyanB;
  const sourceLabel = isStrava?"STRAVA":isGarmin?"GARMIN":null;

  // Mapa via Mapbox Static com polyline real
  const mapboxStaticUrl = (()=>{
    try {
      if(!run.polyline||run.polyline.length<2) return null;
      const sample = run.polyline[0];
      if(!sample||sample[0]===undefined||sample[1]===undefined) return null;
      // Detectar formato: se p[0] é negativo e |p[0]| < 90 → é lng (Dublin: -6.x)
      // Se p[0] > 10 → é lat (Dublin: 53.x). Normalizar para GeoJSON [lng, lat]
      const isLngLat = sample[0] < 0 || (Math.abs(sample[0]) < 10 && Math.abs(sample[1]) > 10);
      const coords = run.polyline
        .filter(p=>p&&p[0]!==undefined&&p[1]!==undefined)
        .map(p => isLngLat ? [p[0], p[1]] : [p[1], p[0]]); // GeoJSON: [lng, lat]
      if(coords.length<2) return null;
      const geoJson = {type:"Feature",properties:{stroke:"#22d3ee","stroke-width":4,"stroke-opacity":1},geometry:{type:"LineString",coordinates:coords}};
      const geoStr = encodeURIComponent(JSON.stringify(geoJson));
      return `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/static/geojson(${geoStr})/auto/390x260@2x?access_token=${MAPBOX_TOKEN}&padding=50`;
    } catch(e) { return null; }
  })();

  // Splits simulados
  const totalKm = run.distancia_km||0;
  const paceStr = (run.pace_medio&&run.pace_medio.includes(":"))?run.pace_medio:"5:30";
  const [pMin,pSec] = paceStr.split(":").map(Number);
  const paceBase = pMin*60+(pSec||0);
  const nKms = Math.max(1,Math.floor(totalKm));
  const splits = Array.from({length:nKms},(_,i)=>{
    const v = (Math.random()-0.5)*18;
    const elev = Math.round((Math.random()-0.3)*12);
    const p = Math.max(240,Math.round(paceBase+v));
    return {km:i+1, pace:Math.floor(p/60)+":"+(p%60<10?"0":"")+p%60, elev, pSec:p};
  });

  // Pace zones
  const pZones = [
    {z:"Z1",label:"Fácil",      pct:paceBase>390?30:12},
    {z:"Z2",label:"Aeróbico",   pct:paceBase>330?38:28},
    {z:"Z3",label:"Limiar",     pct:paceBase>300?20:32},
    {z:"Z4",label:"Anaeróbico", pct:paceBase>270?9:20},
    {z:"Z5",label:"VO2max",     pct:paceBase>240?3:8},
  ];
  const sumPct = pZones.reduce((a,z)=>a+z.pct,0);
  pZones.forEach(z=>z.pct=Math.round(z.pct/sumPct*100));

  const cadBase = run.cadencia_media||174;
  const cadSeries = splits.map(()=>Math.round(cadBase+(Math.random()-0.5)*10));
  const paceSeries = splits.map(s=>s.pSec);
  const paceSeriesMin = Math.min(...paceSeries)-8;
  const paceSeriesMax = Math.max(...paceSeries)+8;
  const calorias = run.calorias||Math.round(run.distancia_km*65);

  const W=340, PH=100, CW=340, CH=80, SPH=90, SPW=50;
  const cMin=Math.min(...cadSeries)-4, cMax=Math.max(...cadSeries)+4;

  const divider = <div style={{width:1,background:C.cyanB,opacity:0.35,alignSelf:"stretch",margin:"0 4px"}}/>;

  return (
    <div style={{position:"absolute",inset:0,background:C.bg,zIndex:200,display:"flex",flexDirection:"column",borderRadius:30,overflow:"hidden"}}>

      {/* MAPA MAPBOX STATIC — fiel ao percurso */}
      <div style={{position:"relative",height:240,flexShrink:0,background:C.s1,overflow:"hidden"}}>
        {mapboxStaticUrl
          ? <img src={mapboxStaticUrl} alt="percurso" style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}
              onError={e=>{e.target.style.display="none";}}/>
          : <RunMapSvgFallback polyline={(run.polyline||[]).filter(p=>p&&p[0]!==undefined&&p[1]!==undefined)} color={C.cyanB}/>
        }
        {/* Header overlay */}
        <div style={{position:"absolute",top:0,left:0,right:0,padding:"14px 16px",background:"linear-gradient(180deg,rgba(6,7,26,0.9) 0%,transparent 100%)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:9}}>
              <button onClick={onClose} style={{background:"rgba(13,15,46,0.75)",border:"1px solid "+C.border,borderRadius:9,padding:"6px 11px",cursor:"pointer",display:"flex",alignItems:"center",backdropFilter:"blur(8px)"}}><Ic n="back" z={14} c="#fff"/></button>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:7}}>
                  <p style={{color:"#fff",fontWeight:800,fontSize:15,margin:0,fontFamily:"'Space Grotesk',sans-serif"}}>{run.nome||"Corrida"}</p>
                  {sourceLabel&&<span style={{background:sourceColor+"33",color:sourceColor,border:"1px solid "+sourceColor+"55",borderRadius:5,padding:"1px 7px",fontSize:10,fontWeight:800}}>{sourceLabel}</span>}
                </div>
                <p style={{color:"rgba(255,255,255,0.65)",fontSize:11,margin:"2px 0 0",fontFamily:"monospace"}}>{run.data}</p>
              </div>
            </div>
            <button onClick={()=>onShare&&onShare(run)} style={{background:"rgba(13,15,46,0.75)",border:"1px solid "+C.border,borderRadius:9,padding:"6px 11px",cursor:"pointer",display:"flex",alignItems:"center",backdropFilter:"blur(8px)"}}><Ic n="share" z={14} c="#fff"/></button>
          </div>
        </div>
      </div>

      {/* CONTEÚDO */}
      <div style={{flex:1,overflowY:"auto",padding:"18px 16px 32px"}}>

        {/* MÉTRICAS — linha fina separadora */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-around",paddingBottom:18,marginBottom:18,borderBottom:"1px solid "+C.border}}>
          {[
            {v:run.distancia_km+" km", l:"Distância",   c:C.cyanB},
            {v:run.pace_medio+"/km",   l:"Pace",        c:C.cyan},
            {v:calorias+" kcal",       l:"Calorias",    c:C.amber},
            {v:(run.cadencia_media||"—")+" spm", l:"Cadência", c:C.violetL},
          ].map((s,i,arr)=>[
            <div key={i} style={{textAlign:"center",flex:1}}>
              <p style={{color:C.td,fontFamily:"monospace",fontWeight:700,fontSize:8,textTransform:"uppercase",letterSpacing:0.8,margin:"0 0 4px"}}>{s.l}</p>
              <p style={{color:s.c,fontFamily:"'Space Grotesk',sans-serif",fontWeight:800,fontSize:18,margin:0,letterSpacing:-0.5,lineHeight:1}}>{s.v}</p>
            </div>,
            i<arr.length-1&&<div key={"d"+i} style={{width:1,background:C.cyanB,opacity:0.35,alignSelf:"stretch",margin:"0 4px"}}/>,
          ])}
        </div>

        {/* SPLITS */}
        {splits.length>0&&(
          <div style={{marginBottom:16,borderTop:"1px solid "+C.cyanB+"33",borderBottom:"1px solid "+C.cyanB+"33",paddingTop:12,paddingBottom:12}}>
            <p style={{color:C.ts,fontFamily:"monospace",fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:0.8,margin:"0 0 10px"}}>Splits por km</p>
            <div style={{display:"grid",gridTemplateColumns:"22px 1fr 44px 32px",gap:5,marginBottom:5}}>
              {["km","","pace","m±"].map((h,i)=><span key={i} style={{color:C.tg,fontSize:8,fontFamily:"monospace",fontWeight:700,textTransform:"uppercase",textAlign:i>1?"right":"left"}}>{h}</span>)}
            </div>
            {splits.map((s,i)=>{
              const fastest=Math.min(...splits.map(x=>x.pSec));
              const slowest=Math.max(...splits.map(x=>x.pSec));
              const barPct=slowest>fastest?100-Math.round((s.pSec-fastest)/(slowest-fastest)*85):75;
              return (
                <div key={i} style={{display:"grid",gridTemplateColumns:"22px 1fr 44px 32px",gap:5,alignItems:"center",marginBottom:5}}>
                  <span style={{color:C.td,fontSize:10,fontFamily:"monospace",fontWeight:700}}>{s.km}</span>
                  <div style={{background:C.s3,borderRadius:3,height:5,overflow:"hidden"}}>
                    <div style={{width:barPct+"%",height:"100%",background:"linear-gradient(90deg,"+C.violet+","+C.cyanB+")",borderRadius:3}}/>
                  </div>
                  <span style={{color:C.tp,fontSize:11,fontFamily:"monospace",fontWeight:700,textAlign:"right"}}>{s.pace}</span>
                  <span style={{color:s.elev>0?C.amber:C.cyanB,fontSize:10,fontFamily:"monospace",textAlign:"right"}}>{s.elev>0?"+":""}{s.elev}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* GRÁFICO PACE */}
        {paceSeries.length>1&&(
          <div style={{marginBottom:16,borderTop:"1px solid "+C.cyanB+"33",borderBottom:"1px solid "+C.cyanB+"33",paddingTop:12,paddingBottom:8}}>
            <p style={{color:C.ts,fontFamily:"monospace",fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:0.8,margin:"0 0 8px"}}>Pace por km</p>
            <svg width="100%" height={PH} viewBox={"0 0 "+W+" "+PH}>
              <defs>
                <linearGradient id="pgFill2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={C.cyanB} stopOpacity="0.25"/>
                  <stop offset="100%" stopColor={C.cyanB} stopOpacity="0.01"/>
                </linearGradient>
              </defs>
              {(()=>{
                const n=paceSeries.length;
                const xs=paceSeries.map((_,i)=>Math.round(i/(Math.max(n-1,1))*(W-24)+12));
                const ys=paceSeries.map(v=>Math.round((1-(v-paceSeriesMin)/(paceSeriesMax-paceSeriesMin))*(PH-24)+12));
                const lineD="M "+xs.map((x,i)=>x+","+ys[i]).join(" L ");
                const fillD=lineD+" L "+xs[xs.length-1]+","+PH+" L "+xs[0]+","+PH+" Z";
                return <>
                  <path d={fillD} fill="url(#pgFill2)"/>
                  <path d={lineD} fill="none" stroke={C.cyanB} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  {xs.map((x,i)=><circle key={i} cx={x} cy={ys[i]} r="3" fill={C.bg} stroke={C.cyanB} strokeWidth="1.5"/>)}
                  {xs.map((x,i)=><text key={i} x={x} y={PH+2} textAnchor="middle" fill={C.td} fontSize="8" fontFamily="monospace">{splits[i]?.km}</text>)}
                </>;
              })()}
            </svg>
          </div>
        )}

        {/* PACE ZONES — barras verticais gradiente */}
        <div style={{marginBottom:16,borderTop:"1px solid "+C.cyanB+"33",borderBottom:"1px solid "+C.cyanB+"33",paddingTop:12,paddingBottom:8}}>
          <p style={{color:C.ts,fontFamily:"monospace",fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:0.8,margin:"0 0 8px"}}>Pace Zones</p>
          <svg width="100%" height={SPH+28} viewBox={"0 0 "+(SPW*5+60)+" "+(SPH+28)}>
            <defs>
              {pZones.map((z,i)=>(
                <linearGradient key={i} id={"pzg"+i} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={C.violet} stopOpacity="1"/>
                  <stop offset="100%" stopColor={C.cyanB} stopOpacity="0.7"/>
                </linearGradient>
              ))}
            </defs>
            {pZones.map((z,i)=>{
              const x=i*(SPW+12)+6;
              const barH=Math.round(z.pct/100*SPH);
              const y=SPH-barH;
              return (
                <g key={i}>
                  <rect x={x} y={y} width={SPW} height={barH} rx="5" fill={"url(#pzg"+i+")"}/>
                  <text x={x+SPW/2} y={y-4} textAnchor="middle" fill={C.cyanB} fontSize="9" fontWeight="700" fontFamily="monospace">{z.pct}%</text>
                  <text x={x+SPW/2} y={SPH+12} textAnchor="middle" fill={C.tm} fontSize="9" fontFamily="monospace">{z.z}</text>
                  <text x={x+SPW/2} y={SPH+22} textAnchor="middle" fill={C.td} fontSize="7" fontFamily="monospace">{z.label}</text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* CADÊNCIA */}
        {cadSeries.length>1&&(
          <div style={{marginBottom:16,borderTop:"1px solid "+C.cyanB+"33",borderBottom:"1px solid "+C.cyanB+"33",paddingTop:12,paddingBottom:8}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <p style={{color:C.ts,fontFamily:"monospace",fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:0.8,margin:0}}>Cadência</p>
              <span style={{color:C.violetL,fontSize:11,fontWeight:700,fontFamily:"monospace"}}>{cadBase} spm</span>
            </div>
            <svg width="100%" height={CH} viewBox={"0 0 "+CW+" "+CH}>
              <defs>
                <linearGradient id="cadFill2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={C.violet} stopOpacity="0.25"/>
                  <stop offset="100%" stopColor={C.violet} stopOpacity="0.01"/>
                </linearGradient>
              </defs>
              {(()=>{
                const n=cadSeries.length;
                const xs=cadSeries.map((_,i)=>Math.round(i/(Math.max(n-1,1))*(CW-24)+12));
                const ys=cadSeries.map(v=>Math.round((1-(v-cMin)/(cMax-cMin))*(CH-16)+8));
                const lineD="M "+xs.map((x,i)=>x+","+ys[i]).join(" L ");
                const fillD=lineD+" L "+xs[xs.length-1]+","+CH+" L "+xs[0]+","+CH+" Z";
                const avgY=Math.round((1-(cadBase-cMin)/(cMax-cMin))*(CH-16)+8);
                return <>
                  <path d={fillD} fill="url(#cadFill2)"/>
                  <path d={lineD} fill="none" stroke={C.violetL} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  {[avgY].map(ay=><line key="avg" x1="12" y1={ay} x2={CW-12} y2={ay} stroke={C.violetL} strokeWidth="1" strokeDasharray="4,3" opacity="0.35"/>)}
                  {xs.map((x,i)=><circle key={i} cx={x} cy={ys[i]} r="3" fill={C.bg} stroke={C.violetL} strokeWidth="1.5"/>)}
                  {xs.map((x,i)=><text key={i} x={x} y={CH+2} textAnchor="middle" fill={C.td} fontSize="8" fontFamily="monospace">{splits[i]?.km}</text>)}
                </>;
              })()}
            </svg>
          </div>
        )}

        {/* Source badge */}
        {(isStrava||isGarmin)&&(
          <div style={{background:sourceColor+"11",border:"1px solid "+sourceColor+"33",borderRadius:12,padding:"10px 13px",display:"flex",gap:9,alignItems:"center"}}>
            {isStrava?<span style={{color:C.strava,fontWeight:900,fontSize:16,fontFamily:"monospace"}}>S</span>:<Ic n="watch" z={18} c={C.garmin}/>}
            <p style={{color:C.ts,fontSize:11,margin:0}}>{isStrava?"Importado do Strava":"Sincronizado com Garmin · "+(run.dispositivo||"Forerunner")}</p>
          </div>
        )}

      </div>
    </div>
  );
}


// ─── GARMIN CONNECT MODAL ─────────────────────────────────────────────────────
function GarminConnectModal({ open, onClose, onConfirm, connected, onDisconnect }) {
  if(!open) return null;
  return (
    <div style={{position:"absolute",inset:0,background:"rgba(2,4,16,0.85)",zIndex:300,display:"flex",flexDirection:"column",justifyContent:"flex-end",borderRadius:30}}>
      <div onClick={onClose} style={{flex:1,cursor:"pointer"}}/>
      <div style={{background:"linear-gradient(180deg,"+C.s1+","+C.bg2+")",borderRadius:"24px 24px 30px 30px",padding:"18px 17px 22px",borderTop:"1px solid "+C.garmin+"44",animation:"fadeIn 0.25s ease",boxShadow:"0 -20px 60px rgba(0,124,195,0.2)"}}>
        <div style={{width:40,height:4,background:C.border,borderRadius:2,margin:"0 auto 14px"}}/>
        <div style={{display:"flex",alignItems:"center",gap:11,marginBottom:14}}>
          <div style={{width:46,height:46,borderRadius:12,background:"linear-gradient(135deg,"+C.garmin+","+C.cyan+")",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:"0 6px 18px "+C.garmin+"55"}}>
            <Ic n="watch" z={26} c="#fff"/>
          </div>
          <div style={{flex:1}}>
            <p style={{color:C.tp,fontWeight:800,fontSize:17,margin:0,fontFamily:"'Space Grotesk',sans-serif"}}>Garmin Connect</p>
            <p style={{color:C.tm,fontSize:11,margin:"3px 0 0"}}>{connected?"Conectado e sincronizando":"Sincronizar com seu relógio"}</p>
          </div>
        </div>

        {!connected ? (
          <>
            <p style={{color:C.ts,fontSize:13,margin:"0 0 12px",lineHeight:1.55}}>Ao conectar, suas corridas do Garmin Connect aparecerão automaticamente no TempoRun com todos os dados avançados do relógio.</p>

            <div style={{background:C.s2,borderRadius:12,padding:"11px 13px",marginBottom:14,border:"1px solid "+C.border}}>
              <p style={{color:C.garmin,fontFamily:"monospace",fontSize:10,fontWeight:700,margin:"0 0 9px",textTransform:"uppercase",letterSpacing:0.5}}>O que será sincronizado</p>
              {[
                {i:"run",     t:"Atividades de corrida",d:"Distância, pace, tempo, mapa GPS"},
                {i:"heart",   t:"Frequência cardíaca",  d:"FC média, máxima e zonas Z1–Z5"},
                {i:"cadence", t:"Cadência e potência",  d:"Running power (W), cadência (spm)"},
                {i:"mountain",t:"Altimetria",           d:"Ganho de elevação total"},
                {i:"upload",  t:"Envio para o relógio", d:"Treinos do app vão pro Garmin Connect"},
              ].map((s,i)=>(
                <div key={i} style={{display:"flex",gap:9,alignItems:"flex-start",marginBottom:i<4?7:0}}>
                  <div style={{width:22,height:22,borderRadius:6,background:C.garmin+"22",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}><Ic n={s.i} z={12} c={C.garmin}/></div>
                  <div style={{flex:1}}>
                    <p style={{color:C.tp,fontWeight:700,fontSize:12,margin:0}}>{s.t}</p>
                    <p style={{color:C.td,fontSize:10,margin:"1px 0 0",lineHeight:1.4}}>{s.d}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{background:C.s1,borderRadius:10,padding:"9px 12px",marginBottom:14,display:"flex",gap:8,alignItems:"flex-start",border:"1px solid "+C.amber+"22"}}>
              <Ic n="warning" z={14} c={C.amber} st={{flexShrink:0,marginTop:1}}/>
              <p style={{color:C.tm,fontSize:11,margin:0,lineHeight:1.5}}>Você será redirecionado para o Garmin Connect para autorizar o TempoRun. Seus dados ficam protegidos e você pode desconectar a qualquer momento.</p>
            </div>

            <button onClick={onConfirm} style={{width:"100%",background:"linear-gradient(135deg,"+C.garmin+","+C.cyan+")",color:"#fff",border:"none",borderRadius:13,padding:"13px 0",fontWeight:800,fontSize:14,cursor:"pointer",fontFamily:"'Space Grotesk',sans-serif",letterSpacing:0.3,boxShadow:"0 4px 20px "+C.garmin+"55",display:"flex",alignItems:"center",justifyContent:"center",gap:9,marginBottom:7}}>
              <Ic n="link" z={16} c="#fff"/>Conectar com Garmin
            </button>
            <button onClick={onClose} style={{width:"100%",background:"transparent",color:C.tm,border:"none",padding:"9px 0",fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>Agora não</button>
          </>
        ) : (
          <>
            <div style={{background:"linear-gradient(135deg,#001120,#001930)",borderRadius:12,padding:"11px 13px",marginBottom:12,border:"1px solid "+C.garmin+"44"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:C.green,boxShadow:"0 0 8px "+C.green}}/>
                <p style={{color:C.green,fontFamily:"monospace",fontSize:10,fontWeight:700,margin:0,textTransform:"uppercase",letterSpacing:0.5}}>Conectado</p>
              </div>
              <p style={{color:C.ts,fontSize:12,margin:0}}>Conta: <span style={{color:C.tp,fontWeight:700}}>michel.costa@email.com</span></p>
              <p style={{color:C.ts,fontSize:12,margin:"3px 0 0"}}>Dispositivo: <span style={{color:C.tp,fontWeight:700}}>Forerunner 965</span></p>
            </div>
            <button onClick={onDisconnect} style={{width:"100%",background:C.s2,color:C.coral,border:"1px solid "+C.coral+"33",borderRadius:12,padding:"11px 0",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"inherit",marginBottom:7}}>Desconectar Garmin</button>
            <button onClick={onClose} style={{width:"100%",background:"transparent",color:C.tm,border:"none",padding:"9px 0",fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>Fechar</button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── RUNS BLOCK ───────────────────────────────────────────────────────────────
function RunsBlock({ allRuns, onRunClick, stravaConnected, onConnectStrava, garminConnected, onConnectGarmin }) {
  const recent = allRuns.slice(0,5);
  return (
    <div style={{marginBottom:14}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:9,gap:6}}>
        <div style={{display:"flex",alignItems:"center",gap:7,flexShrink:0}}>
          <Ic n="trophy" z={14} c={C.cyanB}/>
          <p style={{color:C.ts,fontFamily:"monospace",fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:0.5,margin:0}}>Treinos Concluídos</p>
        </div>
        <div style={{display:"flex",gap:5,flexShrink:0}}>
          {stravaConnected ? (
            <div style={{display:"flex",alignItems:"center",gap:4,background:C.strava+"18",border:"1px solid "+C.strava+"44",borderRadius:7,padding:"3px 7px"}}>
              <div style={{width:5,height:5,borderRadius:"50%",background:C.strava}}/>
              <span style={{color:C.strava,fontSize:9,fontWeight:700,fontFamily:"monospace"}}>Strava</span>
            </div>
          ) : (
            <button onClick={onConnectStrava} title="Conectar Strava" style={{background:C.strava+"18",color:C.strava,border:"1px solid "+C.strava+"44",borderRadius:7,padding:"3px 8px",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:4}}>
              <span style={{fontWeight:900}}>S</span><span style={{fontSize:9}}>Strava</span>
            </button>
          )}
          {garminConnected ? (
            <button onClick={onConnectGarmin} title="Gerenciar Garmin" style={{display:"flex",alignItems:"center",gap:4,background:C.garmin+"18",border:"1px solid "+C.garmin+"44",borderRadius:7,padding:"3px 7px",cursor:"pointer",fontFamily:"inherit"}}>
              <div style={{width:5,height:5,borderRadius:"50%",background:C.garmin,boxShadow:"0 0 4px "+C.garmin}}/>
              <span style={{color:C.garmin,fontSize:9,fontWeight:700,fontFamily:"monospace"}}>Garmin</span>
            </button>
          ) : (
            <button onClick={onConnectGarmin} title="Conectar Garmin" style={{background:C.garmin+"18",color:C.garmin,border:"1px solid "+C.garmin+"44",borderRadius:7,padding:"3px 8px",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:4}}>
              <Ic n="watch" z={11} c={C.garmin}/><span style={{fontSize:9}}>Garmin</span>
            </button>
          )}
        </div>
      </div>

      {recent.length===0?(
        <div style={{background:C.s1,borderRadius:12,padding:"14px",textAlign:"center",border:"1px dashed "+C.border}}>
          <p style={{color:C.ts,fontSize:12,margin:"0 0 3px"}}>Nenhum treino ainda</p>
          <p style={{color:C.tg,fontSize:11,margin:0}}>Finalize seu primeiro treino abaixo</p>
        </div>
      ):(
        <div style={{display:"flex",flexDirection:"column",gap:7}}>
          {recent.map((r,i)=>{
            const isStrava=r.source==="strava";
            const isGarmin=r.source==="garmin";
            const srcColor = isStrava?C.strava:isGarmin?C.garmin:C.cyanB;
            const srcLabel = isStrava?"STRAVA":isGarmin?"GARMIN":null;
            return (
              <button key={r.id||i} onClick={()=>onRunClick(r)} style={{background:"linear-gradient(135deg,"+C.s1+","+C.s2+")",borderRadius:13,padding:"10px 12px",border:"1px solid "+(srcLabel?srcColor+"33":C.border),cursor:"pointer",textAlign:"left",width:"100%",display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:36,height:36,borderRadius:10,background:srcColor+"22",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,border:"1px solid "+srcColor+(srcLabel?"44":"33")}}>
                  {isStrava ? <span style={{color:C.strava,fontWeight:900,fontSize:14,fontFamily:"monospace"}}>S</span>
                  : isGarmin ? <Ic n="watch" z={17} c={C.garmin}/>
                  : <Ic n="run" z={17} c={C.cyanB}/>}
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                    <p style={{color:C.tp,fontWeight:700,fontSize:13,margin:0,fontFamily:"'Space Grotesk',sans-serif",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{r.nome||"Corrida"}</p>
                    {srcLabel&&<span style={{background:srcColor+"22",color:srcColor,borderRadius:4,padding:"0 5px",fontSize:9,fontWeight:800,flexShrink:0}}>{srcLabel}</span>}
                  </div>
                  <div style={{display:"flex",gap:6,alignItems:"center"}}>
                    <span style={{color:srcColor,fontSize:11,fontWeight:700,fontFamily:"monospace"}}>{r.distancia_km} km</span>
                    <span style={{color:C.tg,fontSize:10}}>·</span>
                    <span style={{color:C.tm,fontSize:11,fontFamily:"monospace"}}>{r.pace_medio}/km</span>
                    <span style={{color:C.tg,fontSize:10}}>·</span>
                    <span style={{color:C.td,fontSize:10,fontFamily:"monospace"}}>{r.data}</span>
                  </div>
                </div>
                <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:3,flexShrink:0}}>
                  <span style={{color:C.amber,fontSize:10,fontWeight:700}}>▲{r.dplus||0}m</span>
                  <Ic n="back" z={12} c={C.td} st={{transform:"rotate(180deg)"}}/>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
// ─── SUPABASE CLIENT ──────────────────────────────────────────────────────────
const SUPABASE_URL  = "https://dxfgmzaxplarrwcmbotp.supabase.co";
const MAPBOX_TOKEN  = "pk.eyJ1IjoidGVtcG9ydW4iLCJhIjoiY21wNzkzOW56MGdubDJ0c2ZmZHJqYml0ZiJ9.cRSNnng0vPm94Y-OPsSwDQ";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4ZmdtemF4cGxhcnJ3Y21ib3RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyOTg3MzIsImV4cCI6MjA5Mzg3NDczMn0.UWiDBYUN4_NIxbyLCsuSF2hO6GiSlOkHuBMo8w7gC4g";
const STRIPE_CHECKOUT_FN = SUPABASE_URL + "/functions/v1/create-checkout";
const STRIPE_PORTAL_FN  = SUPABASE_URL + "/functions/v1/customer-portal";

// Strava OAuth
const STRAVA_CLIENT_ID     = "244639";
const STRAVA_CLIENT_SECRET = "a81632ae1af89b86ca1d95643669a653423f030a";
const STRAVA_REDIRECT_URI  = "https://app.temporun.run";
const STRAVA_SCOPES        = "read,activity:read_all,profile:read_all";

// Cliente Supabase mínimo (sem SDK, usa fetch direto para não precisar de npm)
const sb = {
  _url: SUPABASE_URL,
  _key: SUPABASE_ANON,
  _headers: { "apikey": SUPABASE_ANON, "Content-Type": "application/json" },

  async signInEmail(email, password) {
    const r = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method:"POST", headers:this._headers,
      body: JSON.stringify({ email, password })
    });
    return r.json();
  },

  async signUpEmail(email, password) {
    const r = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
      method:"POST", headers:this._headers,
      body: JSON.stringify({ email, password })
    });
    return r.json();
  },

  async signInGoogle() {
    const redirectTo = "https://app.temporun.run";
    window.location.href = `${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(redirectTo)}`;
  },

  async signInApple() {
    const redirectTo = "https://app.temporun.run";
    window.location.href = `${SUPABASE_URL}/auth/v1/authorize?provider=apple&redirect_to=${encodeURIComponent(redirectTo)}`;
  },

  signInStrava() {
    const state = Math.random().toString(36).substring(2);
    sessionStorage.setItem("strava_oauth_state", state);
    const url = `https://www.strava.com/oauth/authorize`
      + `?client_id=${STRAVA_CLIENT_ID}`
      + `&redirect_uri=${encodeURIComponent(STRAVA_REDIRECT_URI)}`
      + `&response_type=code`
      + `&approval_prompt=auto`
      + `&scope=${STRAVA_SCOPES}`
      + `&state=${state}`;
    window.location.href = url;
  },

  // Troca code Strava por token (chamado quando volta do OAuth Strava)
  async exchangeStravaCode(code) {
    const r = await fetch("https://www.strava.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id:     STRAVA_CLIENT_ID,
        client_secret: STRAVA_CLIENT_SECRET,
        code,
        grant_type:    "authorization_code",
      }),
    });
    return r.json();
  },

  // Detecta se voltou do callback Strava (?code=...&scope=...)
  parseStravaCallback() {
    const params = new URLSearchParams(window.location.search);
    const code  = params.get("code");
    const scope = params.get("scope");
    const state = params.get("state");
    const saved = sessionStorage.getItem("strava_oauth_state");
    if(code) {
      window.history.replaceState(null, "", window.location.pathname);
      sessionStorage.removeItem("strava_oauth_state");
      return { code, scope };
    }
    return null;
  },

  async signOut(token) {
    await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
      method:"POST",
      headers: { ...this._headers, "Authorization": `Bearer ${token}` }
    });
  },

  // Envia OTP de 6 dígitos para o email
  async sendOTP(email) {
    const r = await fetch(`${SUPABASE_URL}/auth/v1/otp`, {
      method:"POST", headers:this._headers,
      body: JSON.stringify({ email, create_user: true })
    });
    return r.json();
  },

  // Verifica o OTP digitado pelo usuário
  async verifyOTP(email, token) {
    const r = await fetch(`${SUPABASE_URL}/auth/v1/verify`, {
      method:"POST", headers:this._headers,
      body: JSON.stringify({ email, token, type: "email" })
    });
    return r.json();
  },

  // Verifica se voltou de OAuth (hash com access_token ou query params)
  parseHashSession() {
    // Decode JWT to extract user id
    function jwtUserId(token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g,'+').replace(/_/g,'/')));
        return payload.sub || payload.user_id || "";
      } catch { return ""; }
    }
    // Tenta hash primeiro (#access_token=...)
    const hash = window.location.hash;
    if(hash) {
      const params = new URLSearchParams(hash.replace(/^#/,""));
      const access_token = params.get("access_token");
      if(access_token) {
        const email = params.get("user_email") || "";
        const id = params.get("user_id") || jwtUserId(access_token);
        window.history.replaceState(null,"",window.location.pathname);
        return { access_token, email, id };
      }
    }
    // Tenta query string (?access_token=...)
    const search = window.location.search;
    if(search) {
      const params = new URLSearchParams(search);
      const access_token = params.get("access_token");
      if(access_token) {
        window.history.replaceState(null,"",window.location.pathname);
        return { access_token, email: params.get("email") || "", id: params.get("user_id") || jwtUserId(access_token) };
      }
    }
    return null;
  }
};

// ─── LOGIN SCREEN ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  // Aplica tema salvo na tela de login também
  try {
    const saved = JSON.parse(localStorage.getItem("tr_config")||"{}");
    const isLight = saved.tema==="light" || (saved.tema==="auto" && window.matchMedia?.("(prefers-color-scheme: light)").matches);
    C = isLight ? C_LIGHT : C_DARK;
  } catch { C = C_DARK; }
  const [mode, setMode]       = useState("main"); // main | otp_email | otp_code
  const [email, setEmail]     = useState("");
  const [otp, setOtp]         = useState(["","","","","",""]);
  const [erro, setErro]       = useState("");
  const [loading, setLoading] = useState(false);
  const otpRefs               = [useRef(null),useRef(null),useRef(null),useRef(null),useRef(null),useRef(null)];

  useEffect(()=>{
    const session = sb.parseHashSession();
    if(session) { onLogin(session); return; }

    // Verifica strava code guardado pelo callback handler
    const savedStravaCode = sessionStorage.getItem("strava_code");
    if(savedStravaCode) {
      sessionStorage.removeItem("strava_code");
      setLoading(true);
      sb.exchangeStravaCode(savedStravaCode).then(data=>{
        if(data.access_token) {
          onLogin({ access_token:data.access_token, email:data.athlete?.email||`strava_${data.athlete?.id}@temporun.run`, strava_token:data.access_token, strava_refresh:data.refresh_token, strava_athlete:data.athlete, provider:"strava" });
        } else { setErro("Erro ao conectar com Strava."); setLoading(false); }
      });
      return;
    }

    const strava = sb.parseStravaCallback();
    if(strava) {
      setLoading(true);
      sb.exchangeStravaCode(strava.code).then(data=>{
        if(data.access_token) {
          onLogin({ access_token:data.access_token, email:data.athlete?.email||`strava_${data.athlete?.id}@temporun.run`, strava_token:data.access_token, strava_refresh:data.refresh_token, strava_athlete:data.athlete, provider:"strava" });
        } else { setErro("Erro ao conectar com Strava."); setLoading(false); }
      });
      return;
    }
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if(code) {
      window.history.replaceState(null,"",window.location.pathname);
      fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=pkce`,{method:"POST",headers:{"apikey":SUPABASE_ANON,"Content-Type":"application/json"},body:JSON.stringify({auth_code:code})}).then(r=>r.json()).then(data=>{ if(data.access_token) onLogin({access_token:data.access_token,email:data.user?.email||""}); });
    }
  },[]);

  async function handleSendOTP(e) {
    if(e?.preventDefault) e.preventDefault();
    if(!email||!/\S+@\S+\.\S+/.test(email)) return setErro("Digite um e-mail válido.");
    setLoading(true); setErro("");
    const data = await sb.sendOTP(email);
    setLoading(false);
    if(data.error) { setErro(data.msg||data.error_description||"Erro ao enviar código."); return; }
    setMode("otp_code");
    setTimeout(()=>otpRefs[0].current?.focus(), 200);
  }

  async function verifyCode(code) {
    setLoading(true); setErro("");
    const data = await sb.verifyOTP(email, code);
    setLoading(false);
    if(data.access_token) {
      onLogin({ access_token:data.access_token, email:data.user?.email||email, id:data.user?.id||"" });
    } else {
      setErro("Código inválido ou expirado.");
      setOtp(["","","","","",""]);
      setTimeout(()=>otpRefs[0].current?.focus(), 100);
    }
  }

  function handleOtpChange(val, idx) {
    if(!/^\d*$/.test(val)) return;
    const next=[...otp]; next[idx]=val.slice(-1); setOtp(next);
    if(val && idx<5) otpRefs[idx+1].current?.focus();
    if(next.every(d=>d)) setTimeout(()=>verifyCode(next.join("")), 100);
  }

  function handleOtpKey(e, idx) {
    if(e.key==="Backspace"&&!otp[idx]&&idx>0) otpRefs[idx-1].current?.focus();
  }

  // Tela: digitar email
  if(mode==="otp_email") return (
    <div style={{display:"flex",flexDirection:"column",minHeight:"100%",padding:"22px 17px 18px"}}>
      <button onClick={()=>{setMode("main");setErro("");}} style={{background:C.s2,border:"1px solid "+C.border,borderRadius:9,padding:"6px 11px",cursor:"pointer",display:"flex",alignItems:"center",gap:6,alignSelf:"flex-start",marginBottom:28}}>
        <Ic n="back" z={13} c={C.ts}/><span style={{color:C.ts,fontSize:12}}>Voltar</span>
      </button>
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{width:56,height:56,borderRadius:18,background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",boxShadow:"0 6px 20px "+C.violet+"44"}}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="#fff" strokeWidth="2"/><path d="M3 7l9 7 9-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <h2 style={{color:C.tp,fontFamily:"'Space Grotesk',sans-serif",fontSize:22,margin:"0 0 6px",fontWeight:800}}>Entrar com e-mail</h2>
        <p style={{color:C.tm,fontSize:13,margin:0}}>Enviaremos um código de 6 dígitos</p>
      </div>
      <form onSubmit={handleSendOTP} style={{display:"flex",flexDirection:"column",gap:12}}>
        <div>
          <label style={{color:C.ts,fontSize:11,fontWeight:600,fontFamily:"monospace",textTransform:"uppercase",letterSpacing:0.5,display:"block",marginBottom:6}}>Seu e-mail</label>
          <input type="email" value={email} onChange={e=>{setEmail(e.target.value);setErro("");}} placeholder="seu@email.com" autoFocus style={{width:"100%",background:C.s2,border:"1px solid "+(erro?C.coral:C.border),borderRadius:12,padding:"14px",color:C.tp,fontSize:15,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
        </div>
        {erro&&<p style={{color:C.coral,fontSize:12,margin:0}}>{erro}</p>}
        <button type="submit" disabled={loading} style={{background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",color:"#fff",border:"none",borderRadius:12,padding:"14px 0",fontWeight:800,fontSize:15,cursor:loading?"default":"pointer",fontFamily:"'Space Grotesk',sans-serif",boxShadow:"0 4px 20px "+C.violet+"44",opacity:loading?0.7:1,marginTop:4}}>
          {loading?"Enviando...":"Enviar código"}
        </button>
      </form>
      <p style={{color:C.td,fontSize:11,margin:"16px 0 0",textAlign:"center",lineHeight:1.6}}>Sem senha — só o código de 6 dígitos que enviaremos.</p>
    </div>
  );

  // Tela: digitar código OTP
  if(mode==="otp_code") return (
    <div style={{display:"flex",flexDirection:"column",minHeight:"100%",padding:"22px 17px 18px"}}>
      <button onClick={()=>{setMode("otp_email");setErro("");setOtp(["","","","","",""]);}} style={{background:C.s2,border:"1px solid "+C.border,borderRadius:9,padding:"6px 11px",cursor:"pointer",display:"flex",alignItems:"center",gap:6,alignSelf:"flex-start",marginBottom:28}}>
        <Ic n="back" z={13} c={C.ts}/><span style={{color:C.ts,fontSize:12}}>Voltar</span>
      </button>
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{width:56,height:56,borderRadius:18,background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",boxShadow:"0 6px 20px "+C.violet+"44"}}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="#fff" strokeWidth="2"/><circle cx="12" cy="12" r="3" fill="#fff"/></svg>
        </div>
        <h2 style={{color:C.tp,fontFamily:"'Space Grotesk',sans-serif",fontSize:22,margin:"0 0 6px",fontWeight:800}}>Verifique seu e-mail</h2>
        <p style={{color:C.tm,fontSize:13,margin:"0 0 4px"}}>Código enviado para</p>
        <p style={{color:C.cyanB,fontSize:14,fontWeight:700,margin:0}}>{email}</p>
      </div>

      <div style={{display:"flex",gap:9,justifyContent:"center",marginBottom:20}}>
        {otp.map((d,i)=>(
          <input key={i} ref={otpRefs[i]} type="text" inputMode="numeric" maxLength={1} value={d}
            onChange={e=>handleOtpChange(e.target.value,i)}
            onKeyDown={e=>handleOtpKey(e,i)}
            style={{width:44,height:56,borderRadius:12,background:C.s2,border:"2px solid "+(d?C.cyanB:erro?C.coral:C.border),textAlign:"center",color:C.tp,fontSize:24,fontWeight:800,fontFamily:"monospace",outline:"none",transition:"border 0.15s",caretColor:"transparent"}}
          />
        ))}
      </div>

      {loading&&<div style={{textAlign:"center",marginBottom:12}}><p style={{color:C.ts,fontSize:13}}>Verificando...</p></div>}
      {erro&&<p style={{color:C.coral,fontSize:12,margin:"0 0 12px",textAlign:"center"}}>{erro}</p>}

      <button onClick={()=>verifyCode(otp.join(""))} disabled={loading||otp.some(d=>!d)} style={{background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",color:"#fff",border:"none",borderRadius:12,padding:"14px 0",fontWeight:800,fontSize:15,cursor:(loading||otp.some(d=>!d))?"default":"pointer",fontFamily:"'Space Grotesk',sans-serif",boxShadow:"0 4px 20px "+C.violet+"44",opacity:(loading||otp.some(d=>!d))?0.55:1}}>
        Confirmar
      </button>
      <button onClick={()=>{setOtp(["","","","","",""]);setErro("");handleSendOTP({preventDefault:()=>{}});}} disabled={loading} style={{background:"none",border:"none",color:C.tm,fontSize:12,cursor:"pointer",fontFamily:"inherit",padding:"14px 0",textAlign:"center"}}>
        Não recebi — reenviar código
      </button>
      <p style={{color:C.td,fontSize:11,textAlign:"center",lineHeight:1.6,margin:0}}>O código expira em 10 minutos.</p>
    </div>
  );

  if(loading) return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100%",gap:14}}>
      <div style={{width:44,height:44,borderRadius:"50%",border:"3px solid "+C.border,borderTopColor:C.cyanB,animation:"spin 0.8s linear infinite"}}/>
      <p style={{color:C.ts,fontSize:13}}>Conectando...</p>
    </div>
  );

  // Tela principal
  return (
    <div style={{display:"flex",flexDirection:"column",minHeight:"100%",padding:"22px 17px 18px",alignItems:"center",background:"#000115"}}>
      <div style={{marginTop:16,marginBottom:24,display:"flex",flexDirection:"column",alignItems:"center",width:"100%"}}>
        <img src={logoImg} alt="TempoRun" style={{width:190,height:"auto",objectFit:"contain",marginBottom:8}}/>
        <p style={{color:C.ts,fontSize:13,margin:"0",fontWeight:400,letterSpacing:0.3}}>Conecte-se para continuar</p>
      </div>
      <div style={{width:"100%",display:"flex",flexDirection:"column",gap:11,marginBottom:22}}>
        <button onClick={()=>{setMode("otp_email");setErro("");}} style={{background:"transparent",border:"1px solid "+C.border,borderRadius:14,padding:"15px 18px",cursor:"pointer",display:"flex",alignItems:"center",gap:14,fontFamily:"inherit"}}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{flexShrink:0}}><rect x="3" y="5" width="18" height="14" rx="2" stroke={C.violetL} strokeWidth="1.8"/><path d="M3 7l9 7 9-7" stroke={C.violetL} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span style={{color:C.tp,fontSize:15,fontWeight:600,fontFamily:"'Space Grotesk',sans-serif"}}>Continuar com e-mail</span>
        </button>
        <button onClick={()=>sb.signInApple()} style={{background:"transparent",border:"1px solid "+C.border,borderRadius:14,padding:"15px 18px",cursor:"pointer",display:"flex",alignItems:"center",gap:14,fontFamily:"inherit"}}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{flexShrink:0}}><path d="M17.05 20.28c-.98.95-2.05.86-3.08.41-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.41C2.79 15.25 3.51 7.7 9.05 7.42c1.28.07 2.17.74 2.93.8.89-.19 1.74-.87 3.01-.94 1.61-.09 2.82.63 3.6 1.69-3.24 1.93-2.69 6.17.61 7.35-.49 1.24-1.12 2.46-2.15 3.96zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" fill="#fff"/></svg>
          <span style={{color:C.tp,fontSize:15,fontWeight:600,fontFamily:"'Space Grotesk',sans-serif"}}>Continuar com Apple</span>
        </button>
        <button onClick={()=>sb.signInGoogle()} style={{background:"transparent",border:"1px solid "+C.border,borderRadius:14,padding:"15px 18px",cursor:"pointer",display:"flex",alignItems:"center",gap:14,fontFamily:"inherit"}}>
          <svg width="22" height="22" viewBox="0 0 24 24" style={{flexShrink:0}}><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          <span style={{color:C.tp,fontSize:15,fontWeight:600,fontFamily:"'Space Grotesk',sans-serif"}}>Continuar com Google</span>
        </button>
        <button onClick={()=>sb.signInStrava()} style={{background:"#fc4c0211",border:"1px solid #fc4c0244",borderRadius:14,padding:"15px 18px",cursor:"pointer",display:"flex",alignItems:"center",gap:14,fontFamily:"inherit"}}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#fc4c02" style={{flexShrink:0}}><path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169"/></svg>
          <span style={{color:C.tp,fontSize:15,fontWeight:600,fontFamily:"'Space Grotesk',sans-serif"}}>Continuar com Strava</span>
        </button>
      </div>
      <p style={{color:C.tm,fontSize:12,margin:0,textAlign:"center",lineHeight:1.6,maxWidth:300}}>
        Ao continuar, você concorda com nossos<br/>
        <span style={{color:C.violetL,fontWeight:700}}>Termos de Uso</span>
        <span style={{color:C.tm}}> e </span>
        <span style={{color:C.violetL,fontWeight:700}}>Política de Privacidade</span>
      </p>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
const SESSION_KEY = "temporun_session";

function saveSession(s) {
  try { localStorage.setItem(SESSION_KEY, JSON.stringify({...s, saved_at: Date.now()})); } catch{}
}
function jwtUserId(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g,'+').replace(/_/g,'/')));
    return payload.sub || payload.user_id || "";
  } catch { return ""; }
}

function loadSession() {
  // 1. Verifica hash (#access_token=...) — vem do Google OAuth
  const hash = window.location.hash;
  if(hash) {
    const p = new URLSearchParams(hash.replace(/^#/,""));
    const at = p.get("access_token");
    if(at) {
      window.history.replaceState(null,"",window.location.pathname);
      const s = { access_token:at, email: p.get("user_email")||p.get("email")||"", id: p.get("user_id")||jwtUserId(at) };
      saveSession(s);
      return s;
    }
  }
  // 2. Verifica query string (?access_token=...)
  const search = window.location.search;
  if(search) {
    const p = new URLSearchParams(search);
    const at = p.get("access_token");
    if(at) {
      window.history.replaceState(null,"",window.location.pathname);
      const s = { access_token:at, email: p.get("email")||"", id: p.get("user_id")||jwtUserId(at) };
      saveSession(s);
      return s;
    }
  }
  // 3. Verifica localStorage
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if(!raw) return null;
    const s = JSON.parse(raw);
    if(Date.now() - (s.saved_at||0) > 7 * 24 * 60 * 60 * 1000) {
      localStorage.removeItem(SESSION_KEY); return null;
    }
    return s;
  } catch{ return null; }
}
function clearSession() {
  try { localStorage.removeItem(SESSION_KEY); } catch{}
}

export default function TempoRunApp() {
  const [session, setSession]   = useState(()=>loadSession()); // restaura sessão salva
  const [authLoading, setAuthLoading] = useState(true); // evita flash da tela de login
  const loggedIn = !!session;

  // Trata o callback do Strava — redireciona para raiz com o code
  useEffect(()=>{
    if(window.location.pathname === "/strava-callback") {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const error = params.get("error");
      if(code) {
        // Guarda o code e redireciona para raiz onde o LoginScreen vai processar
        sessionStorage.setItem("strava_code", code);
      }
      window.history.replaceState(null,"","/");
    }
    // Trata pro=success após checkout Stripe
    if(window.location.search.includes("pro=success")) {
      const params = new URLSearchParams(window.location.search);
      const returnTab = params.get("return");
      window.history.replaceState(null,"","/");
      try { localStorage.setItem("tr_force_pro","1"); } catch {}
      // Restaura tela onde estava
      try {
        const pre = localStorage.getItem("tr_pre_checkout");
        if(pre) {
          const s = JSON.parse(pre);
          localStorage.removeItem("tr_pre_checkout");
          localStorage.setItem("tr_restore", JSON.stringify({...s, tab: returnTab||s.tab}));
        } else if(returnTab) {
          localStorage.setItem("tr_restore", JSON.stringify({tab: returnTab}));
        }
      } catch {}
    }
  },[]);

  // Verifica se a sessão salva ainda é válida ao abrir o app
  useEffect(()=>{
    const saved = loadSession();
    if(!saved) { setAuthLoading(false); return; }
    // Tenta validar o token com o Supabase
    fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: { "apikey": SUPABASE_ANON, "Authorization": `Bearer ${saved.access_token}` }
    }).then(r=>r.json()).then(data=>{
      if(data.id) {
        // Token ainda válido — mantém sessão
        setSession(s=>s||saved);
      } else {
        // Token expirado — limpa e pede login
        clearSession(); setSession(null);
      }
    }).catch(()=>{
      // Sem internet — mantém sessão local (app funciona offline)
      setSession(s=>s||saved);
    }).finally(()=>setAuthLoading(false));
  },[]);

  // Busca user.id se não estiver na sessão
  useEffect(()=>{
    if(!session?.access_token) return;
    // Primeiro tenta extrair do JWT localmente (sem chamada de rede)
    const jwtId = jwtUserId(session.access_token);
    if(jwtId && !session.id) {
      const updated = {...session, id: jwtId};
      saveSession(updated);
      setSession(updated);
      return;
    }
    if(session?.id) return;
    // Fallback — busca no Supabase
    fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: { "apikey": SUPABASE_ANON, "Authorization": `Bearer ${session.access_token}` }
    }).then(r=>r.json()).then(data=>{
      if(data?.id) {
        const updated = {...session, id: data.id, email: data.email||session.email};
        saveSession(updated);
        setSession(updated);
      }
    }).catch(()=>{});
  },[session?.access_token]);

  // Restaura tela após retorno do Stripe + força isPro
  useEffect(()=>{
    try {
      const forcePro = localStorage.getItem("tr_force_pro");
      if(forcePro) { setIsPro(true); localStorage.removeItem("tr_force_pro"); }
      const restore = localStorage.getItem("tr_restore");
      if(restore && session?.access_token) {
        const s = JSON.parse(restore);
        localStorage.removeItem("tr_restore");
        if(s.tab) setTab(s.tab);
        if(s.subScreen) setSubScreen(s.subScreen);
        if(s.planScreen) setPlanScreen(s.planScreen);
        if(s.planForm) setPlanForm(s.planForm);
      }
    } catch {}
  },[session?.access_token]);

  // Verifica assinatura Pro ao logar
  useEffect(()=>{
    if(!session?.access_token) return;
    const userId = session.id || "";
    if(!userId) return;

    // Tenta buscar por user_id directo
    fetch(`${SUPABASE_URL}/rest/v1/subscriptions?user_id=eq.${userId}&select=status,plan,current_period_end&limit=1`, {
      headers: { "apikey": SUPABASE_ANON, "Authorization": `Bearer ${session.access_token}` }
    }).then(r=>r.json()).then(data=>{
      if(Array.isArray(data) && data.length > 0) {
        const sub = data[0];
        console.log("Subscription encontrada:", sub.status, "user_id:", userId);
        setProStatus(sub.status);
        // Aceita active, trialing, e também incomplete recente (webhook pode atrasar)
        const isPaid = sub.status === "active" || sub.status === "trialing" || sub.status === "incomplete";
        setIsPro(isPaid);
      } else {
        console.log("Nenhuma subscription para user_id:", userId);
        // Tenta buscar via tabela users (auth_id)
        fetch(`${SUPABASE_URL}/rest/v1/users?auth_id=eq.${userId}&select=id&limit=1`, {
          headers: { "apikey": SUPABASE_ANON, "Authorization": `Bearer ${session.access_token}` }
        }).then(r=>r.json()).then(users=>{
          if(Array.isArray(users) && users.length > 0) {
            const publicId = users[0].id;
            fetch(`${SUPABASE_URL}/rest/v1/subscriptions?user_id=eq.${publicId}&select=status,plan&limit=1`, {
              headers: { "apikey": SUPABASE_ANON, "Authorization": `Bearer ${session.access_token}` }
            }).then(r=>r.json()).then(subs=>{
              if(Array.isArray(subs) && subs.length > 0) {
                console.log("Subscription via public_id:", subs[0].status);
                setProStatus(subs[0].status);
                setIsPro(subs[0].status === "active" || subs[0].status === "trialing" || subs[0].status === "incomplete");
              } else {
                setIsPro(false); setProStatus(null);
              }
            }).catch(()=>{});
          } else {
            setIsPro(false); setProStatus(null);
          }
        }).catch(()=>{});
      }
    }).catch(()=>{});
  },[session?.access_token, session?.id]);
  const [tab, setTab] = useState("home");
  const [subScreen, setSubScreen] = useState(null);
  const [treinoTab, setTreinoTab] = useState("iniciar");
  const [dbReady, setDbReady] = useState(false);
  const [corridas, setCorridas] = useState(CORRIDAS_DEMO);
  const [rpsDb, setRpsDb] = useState({});
  const [xpTotal, setXpTotal] = useState(3240);
  const [novoRP, setNovoRP] = useState(null);
  const [salvando, setSalvando] = useState(false);
  const [savedRun, setSavedRun] = useState(null);
  const [chartSlice, setChartSlice] = useState("1m");
  const [fraseIdx] = useState(()=>Math.floor(Math.random()*frases.length));

  // Strava — auto-conecta se login foi via Strava
  const [stravaConnected, setStravaConnected] = useState(false);
  const [stravaRuns, setStravaRuns] = useState([]);
  const [stravaCardDismissed, setStravaCardDismissed] = useState(()=>{
    try { return localStorage.getItem("strava_card_dismissed")==="1"; } catch{ return false; }
  });
  useEffect(()=>{
    if(session?.provider==="strava" && session?.strava_token) {
      setStravaConnected(true);
      setStravaRuns(STRAVA_MOCK);
    }
  },[session]);

  // Garmin
  const [garminConnected, setGarminConnected] = useState(false);
  const [garminRuns, setGarminRuns] = useState([]);
  const [showGarminModal, setShowGarminModal] = useState(false);

  const [selectedRun, setSelectedRun] = useState(null);

  // Combina corridas locais + Strava + Garmin ordenado por data desc
  const allRuns = useMemo(()=>{
    const local = corridas.map(r=>({
      ...r,
      source: r.source||"local",
      nome: r.nome||"Corrida TempoRun",
      cadencia_media: r.cadencia_media||172,
      polyline: r.polyline||null,
    }));
    const combined = [...local, ...stravaRuns, ...garminRuns];
    combined.sort((a,b)=>new Date(b.timestamp)-new Date(a.timestamp));
    return combined;
  },[corridas, stravaRuns, garminRuns]);

  const [showPerfil, setShowPerfil] = useState(false);
  const [showSaber, setShowSaber]   = useState(false);
  const [showDadosModal, setShowDadosModal]   = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showProModal, setShowProModal]     = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(()=>{
    try { return !localStorage.getItem("tr_onboarding_done"); } catch { return true; }
  });
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState({ objetivos:[], nivel:"", nome:"" });
  const [selectedPlan, setSelectedPlan]     = useState("yearly");
  const [isPro, setIsPro]                   = useState(false);

  // Limites de IA para plano Free
  const AI_LIMITS = { coach: 5, saber: 3, plano: 1 };
  function getAiUsage() {
    try {
      const today = new Date().toDateString();
      const raw = localStorage.getItem("tr_ai_usage");
      const data = raw ? JSON.parse(raw) : {};
      if (data.date !== today) return { date: today, coach: 0, saber: 0, plano: 0 };
      return data;
    } catch { return { date: new Date().toDateString(), coach: 0, saber: 0, plano: 0 }; }
  }
  function incAiUsage(type) {
    try {
      const usage = getAiUsage();
      usage[type] = (usage[type] || 0) + 1;
      localStorage.setItem("tr_ai_usage", JSON.stringify(usage));
    } catch {}
  }
  function checkAiLimit(type) {
    if (isPro) return true;
    try { if(localStorage.getItem("tr_force_pro")) return true; } catch {}
    const usage = getAiUsage();
    return (usage[type] || 0) < AI_LIMITS[type];
  }
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradeReason, setUpgradeReason] = useState("");
  const [proStatus, setProStatus]           = useState(null); // null | "active" | "canceled" | "trialing"
  const [proLoading, setProLoading]         = useState(false);
  const [proError, setProError]             = useState("");
  const [dadosForm, setDadosForm] = useState({nome:"", foto:null, dataNasc:"", sexo:"", pais:"Brasil", cidade:"", altura:"", peso:"", tenis:[], relogios:[], fones:[]});
  const [configForm, setConfigForm] = useState(()=>{
    try {
      const saved = localStorage.getItem("tr_config");
      if(saved) return {...{lembreteTreino:true, rpNotif:true, tema:"dark", vozGenero:"masculina", vozEstilo:"motivacional", mapaOffline:false, mostrarAltimetria:true, rotasSeguras:false, autoPause:true, vibracaoSplit:true, alertasHidratacao:false, cadenciaAlvo:"180", idioma:"pt-BR", assinaturaPro:false, backupSync:true}, ...JSON.parse(saved)};
    } catch {}
    return {lembreteTreino:true, rpNotif:true, tema:"dark", vozGenero:"masculina", vozEstilo:"motivacional", mapaOffline:false, mostrarAltimetria:true, rotasSeguras:false, autoPause:true, vibracaoSplit:true, alertasHidratacao:false, cadenciaAlvo:"180", idioma:"pt-BR", assinaturaPro:false, backupSync:true};
  });
  // Deriva C do tema — atualiza em tempo real
  const tema = configForm.tema==="light" || (configForm.tema==="auto" && typeof window!=="undefined" && window.matchMedia?.("(prefers-color-scheme: light)").matches) ? "light" : "dark";
  C = tema==="light" ? C_LIGHT : C_DARK;
  const [equipDropdown, setEquipDropdown] = useState(null);
  const [equipInput, setEquipInput] = useState("");
  const PAISES = ["Brasil","Irlanda","Alemanha","Angola","Argentina","Austrália","Bélgica","Bolívia","Cabo Verde","Canadá","Chile","China","Colômbia","Coreia do Sul","Dinamarca","Emirados Árabes","Equador","Espanha","Estados Unidos","França","Grécia","Guatemala","Holanda","Hungria","Índia","Itália","Japão","México","Moçambique","Noruega","Nova Zelândia","Paraguai","Peru","Polônia","Portugal","Reino Unido","Rússia","Suécia","Suíça","Turquia","Ucrânia","Uruguai","Venezuela"];
  const CIDADES = {"Brasil":["São Paulo","Rio de Janeiro","Brasília","Salvador","Fortaleza","Belo Horizonte","Manaus","Curitiba","Recife","Porto Alegre","Belém","Goiânia","Florianópolis","São Luís","Maceió","Natal","Teresina","Campo Grande","João Pessoa","Aracaju"],"Irlanda":["Dublin","Cork","Limerick","Galway","Waterford","Drogheda","Dundalk","Swords","Bray","Navan"],"Portugal":["Lisboa","Porto","Braga","Coimbra","Aveiro","Faro","Setúbal","Viseu","Évora","Funchal"],"Estados Unidos":["New York","Los Angeles","Chicago","Houston","Phoenix","Philadelphia","San Antonio","San Diego","Dallas","San Francisco","Boston","Miami","Seattle","Denver","Atlanta"],"Reino Unido":["Londres","Manchester","Birmingham","Leeds","Glasgow","Liverpool","Bristol","Edinburgh","Sheffield","Cardiff"],"Alemanha":["Berlim","Munique","Hamburgo","Frankfurt","Colônia","Stuttgart","Düsseldorf","Leipzig","Dortmund","Essen"],"França":["Paris","Lyon","Marselha","Toulouse","Nice","Bordeaux","Lille","Nantes","Strasbourg","Montpellier"],"Espanha":["Madrid","Barcelona","Valencia","Sevilha","Zaragoza","Málaga","Murcia","Palma","Las Palmas","Bilbao"],"Itália":["Roma","Milão","Nápoles","Turim","Palermo","Gênova","Bologna","Florença","Bari","Veneza"],"Argentina":["Buenos Aires","Córdoba","Rosário","Mendoza","La Plata","Tucumán","Mar del Plata","Salta","Santa Fé","San Juan"]};
  const EQUIPAMENTOS = {tenis:["Nike Vaporfly 3","Nike Alphafly 3","Nike Pegasus 41","Adidas Adizero Adios Pro 3","Adidas Ultraboost 23","ASICS Metaspeed Sky+","ASICS Gel-Kayano 31","ASICS Gel-Nimbus 26","Brooks Ghost 16","Brooks Hyperion Max","Saucony Endorphin Pro 3","Saucony Kinvara 14","Hoka Rocket X 2","Hoka Clifton 9","New Balance FuelCell SC Elite v3","New Balance Fresh Foam 1080","On Cloudboom Echo 3","Mizuno Wave Rider 27","Outro"],relogios:["Garmin Forerunner 965","Garmin Forerunner 265","Garmin Fenix 7","Garmin Epix Pro","Apple Watch Ultra 2","Apple Watch Series 9","Polar Vantage V3","Polar Pacer Pro","Suunto Race","Suunto 9 Peak Pro","Coros Pace 3","Coros Apex 2 Pro","Coros Vertix 2S","Wahoo Elemnt Rival","Outro"],fones:["AirPods Pro 2","AirPods 3","Sony WF-1000XM5","Bose QuietComfort Earbuds II","Jabra Elite 8 Active","Shokz OpenRun Pro 2","Shokz OpenSwim","Beats Fit Pro","Samsung Galaxy Buds 2 Pro","Anker Soundcore Sport X10","Outro"]};
  const [saberTab, setSaberTab]   = useState("explorar");
  const [saberMsgs, setSaberMsgs] = useState([]);
  const [saberIn, setSaberIn]     = useState("");
  const [saberLoad, setSaberLoad] = useState(false);
  const [coachMsgs, setCoachMsgs] = useState([{from:"ai",text:"Olá Michel! Pronto para mais um treino? 🔥"}]);
  const [coachIn, setCoachIn]     = useState("");
  const [coachLoad, setCoachLoad] = useState(false);
  // Plano: detalhe de treino + chat
  const [selectedTreino, setSelectedTreino] = useState(null);
  const [treinoChatMsgs, setTreinoChatMsgs] = useState([]);
  const [treinoChatIn, setTreinoChatIn]     = useState("");
  const [treinoChatLoad, setTreinoChatLoad] = useState(false);
  // Checkboxes e vinculação de treinos do plano
  const [treinosCompletos, setTreinosCompletos] = useState({}); // key: "S1-Seg"
  const [treinosVinculados, setTreinosVinculados] = useState({}); // key: "S1-Seg" → run id
  const [vinculandoKey, setVinculandoKey] = useState(null); // qual treino está sendo vinculado
  const [planScreen, setPlanScreen] = useState("form");
  const [planTipo, setPlanTipo] = useState(null);
  const [paceRef, setPaceRef] = useState({dist:"5k", tempo:""}); // pace de referência por distância // null | "prova" | "objetivo"
  const [planProva, setPlanProva] = useState({distancia:"10k", data_prova:""});
  const [planObjetivo, setPlanObjetivo] = useState({objetivo:"vo2max", semanas:8});
  const [expandedWeeks, setExpandedWeeks] = useState({}); // {weekIdx: {dias:[...]}}
  const [expandingWeek, setExpandingWeek] = useState(null); // loading state
  const [savedPlan, setSavedPlan] = useState(()=>{
    try{ const p=localStorage.getItem("tr_saved_plan"); return p?JSON.parse(p):null; }catch{return null;}
  });
  const [completedWorkouts, setCompletedWorkouts] = useState(()=>{
    try{ const c=localStorage.getItem("tr_completed_workouts"); return c?JSON.parse(c):{}; }catch{return {};}
  });
  function toggleWorkout(idx){
    const key=String(idx);
    const updated={...completedWorkouts,[key]:!completedWorkouts[key]};
    setCompletedWorkouts(updated);
    try{localStorage.setItem("tr_completed_workouts",JSON.stringify(updated));}catch{}
  }
  const [showAddTreino, setShowAddTreino] = useState(false);
  const [addTreinoDia, setAddTreinoDia] = useState(null); // index do dia no plano
  const [addStep, setAddStep] = useState("tipo"); // tipo | subtipo | config
  const [addTipo, setAddTipo] = useState(null);
  const [addSubtipo, setAddSubtipo] = useState(null);
  const [addDistancia, setAddDistancia] = useState(5);
  const [addDuracao, setAddDuracao] = useState(30);
  const [addModo, setAddModo] = useState("dist"); // dist | duracao

  const TIPOS_TREINO = [
    {id:"rodagem",  label:"Rodagem",     emoji:"🏃", color:"#22c55e", desc:"Ritmo confortável, base aeróbica"},
    {id:"intervalado", label:"Intervalado", emoji:"⚡", color:"#f59e0b", desc:"Tiros rápidos com recuperação"},
    {id:"tempo",    label:"Tempo Run",   emoji:"🎯", color:"#3b82f6", desc:"Ritmo de limiar, sustentado"},
    {id:"longao",   label:"Longão",      emoji:"🛣️", color:"#8b5cf6", desc:"Corrida longa, resistência"},
    {id:"subidas",  label:"Subidas",     emoji:"⛰️", color:"#ef4444", desc:"Tiros em aclive, força"},
    {id:"descanso", label:"Descanso",    emoji:"😴", color:"#6b7db3", desc:"Recuperação ativa ou total"},
  ];

  const SUBTREINOS = {
    rodagem:[
      {id:"leve",    label:"Rodagem Leve",     desc:"65-70% FCmax · conversação fácil"},
      {id:"moderada",label:"Rodagem Moderada", desc:"70-75% FCmax · confortável"},
      {id:"progressiva",label:"Progressiva",   desc:"Começa leve e acelera gradualmente"},
    ],
    intervalado:[
      {id:"400m",    label:"Tiros 400m",        desc:"6-10×400m · ritmo de prova 5k"},
      {id:"800m",    label:"Tiros 800m",        desc:"4-6×800m · ritmo de prova 10k"},
      {id:"1km",     label:"Tiros 1km",         desc:"4-5×1km · ritmo de prova 10k"},
      {id:"fartlek", label:"Fartlek",           desc:"Variações livres de ritmo"},
      {id:"piramide",label:"Pirâmide",          desc:"400-800-1200-800-400m"},
    ],
    tempo:[
      {id:"continuo",  label:"Tempo Contínuo", desc:"20-40min no limiar"},
      {id:"cruise",    label:"Cruise Intervals",desc:"3×8min no limiar com 90s recuperação"},
      {id:"race_pace", label:"Race Pace",       desc:"Segmentos no ritmo objetivo de prova"},
    ],
    longao:[
      {id:"lento",   label:"Longão Lento",     desc:"60-65% FCmax · máximo km da semana"},
      {id:"negativo",label:"Split Negativo",   desc:"Segunda metade mais rápida"},
      {id:"maratona",label:"Ritmo Maratona",   desc:"Últimos 30% no pace objetivo"},
    ],
    subidas:[
      {id:"curtas",  label:"Subidas Curtas",   desc:"8-12×30s em aclive forte"},
      {id:"longas",  label:"Subidas Longas",   desc:"4-6×90s em aclive moderado"},
      {id:"ondulado",label:"Percurso Ondulado",desc:"Rota com subidas naturais"},
    ],
    descanso:[
      {id:"total",   label:"Descanso Total",   desc:"Sem atividade física"},
      {id:"ativo",   label:"Descanso Ativo",   desc:"Caminhada leve ou yoga"},
      {id:"natacao", label:"Natação",          desc:"Treino cruzado de baixo impacto"},
    ],
  };
  const [planForm, setPlanForm]     = useState({objetivo:"",dist_semana:"",pace_atual:"5:30",dias_disponiveis:"4",historico_lesoes:"",inatividade_semanas:"0",nivel:"intermediario",glp1:"nao",glp1_nausea:"nao"});
  const [planImport, setPlanImport] = useState(null);
  const [planResult, setPlanResult] = useState(null);
  const [paceCustom, setPaceCustom] = useState("");
  const [paceAlerta, setPaceAlerta] = useState(null);
  const [gStatus, setGStatus] = useState("idle");
  const [gSeg, setGSeg]       = useState(0);
  const [gKm, setGKm]         = useState(0);
  const [gCad, setGCad]       = useState(0);
  const timerRef=useRef(null); const gSR=useRef(0); const gKR=useRef(0); const gBR=useRef(0); const gCR=useRef(0); const isRunningRef=useRef(false);
  const watchRef=useRef(null);        // GPS watchPosition ID
  const lastPosRef=useRef(null);      // última posição GPS {lat,lng,ts}
  const routeRef=useRef([]);          // array de pontos [[lat,lng],...]
  const [gpsStatus, setGpsStatus]=useState("off"); // off|searching|active|error
  const [gpsAccuracy, setGpsAccuracy]=useState(null);
  const [routeTick, setRouteTick]=useState(0);  // força re-render do LiveMap
  const [explTab, setExplTab] = useState("rotas");
  const [studioTab, setStudioTab] = useState("card");
  const [studioRun, setStudioRun] = useState(null);
  const [cardType, setCardType]   = useState("treino");
  const [cardIdx, setCardIdx]     = useState(0);
  const [cardColor, setCardColor] = useState("gradient");
  const [provaAmb, setProvaAmb]       = useState(null);
  const [numPeito, setNumPeito]       = useState("");
  const [buscFotos, setBuscFotos]     = useState(false);
  const [resFotos, setResFotos]       = useState(null);
  const [anStep, setAnStep]     = useState("result");
  const [anVideo, setAnVideo]   = useState({name:"corrida_michel.mp4",duration:28,size:"42.3"});
  const [anInfo, setAnInfo]     = useState({cadencia:"170",pace_medio:"5:30",distancia:"10",lesoes:""});
  const [anData, setAnData]     = useState({indice_tecnica:78,classificacao:"Bom",metricas:[
    {id:1,nome:"Elevação Vertical",valor:"8.6 cm",status:"Regular",ideal:"6-8 cm",descricao:"Oscilação um pouco acima do ideal. Reduzir pode melhorar a economia de corrida e reduzir taxas de carga.",cor_status:"amber"},
    {id:2,nome:"Tamanho da Passada x Pace",valor:"1.22 m",status:"Regular",ideal:"1.00–1.15 m",descricao:"Passada longa demais para o pace atual. Passadas mais curtas e rápidas tendem a ser mais eficientes.",cor_status:"amber"},
    {id:3,nome:"Aterrissagem",valor:"OK",status:"Excelente",ideal:"Abaixo do CG",descricao:"Pé aterrissa próximo ou abaixo do centro de gravidade. Isso reduz o impacto de frenagem.",cor_status:"green"},
    {id:4,nome:"Overstriding",valor:"Alto",status:"Atenção",ideal:"Baixo",descricao:"Pé aterrissando muito à frente do quadril, gerando força de frenagem e aumentando risco de lesões.",cor_status:"coral"},
  ],resumo:"Você tem uma boa base técnica, mas pequenos ajustes podem trazer grandes ganhos. Foque em reduzir a oscilação vertical e a extensão da passada.",
  drills:[
    {nome:"Skipping A",duracao:"2×30s",descricao:"Melhora a mecânica e a frequência de passada."},
    {nome:"Ankling",duracao:"2×30s",descricao:"Ativa o tornozelo e melhora a cadência."},
    {nome:"Quick Steps",duracao:"4×20s",descricao:"Passos curtos e rápidos com leve inclinação para frente."},
    {nome:"Strides",duracao:"6×80m",descricao:"Acelerações progressivas para leveza e técnica."},
  ],
  treino_tecnico:{descricao:"6–8 blocos de 30–45s focando cadência com recuperação leve entre cada bloco. Utilize metrônomo a 175–180 spm.",series:6,duracao_s:40,recuperacao:"60s caminhada"},
  cues:["Pise mais próximo do corpo","Passos rápidos e leves","Reduza o salto vertical","Incline levemente o tronco à frente"],
  plano_4sem:[
    {semana:1,foco:"Cadência",descricao:"2 sessões de 20min. Drills de skipping A e ankling. Foco em frequência de passada."},
    {semana:2,foco:"Passada",descricao:"2 sessões focando encurtar passada. Strides 6×80m com atenção ao ponto de aterrissagem."},
    {semana:3,foco:"Eficiência",descricao:"2 sessões combinando cadência + passada com metrônomo. Corrida de 20min a 175 spm."},
    {semana:4,foco:"Integração",descricao:"2 sessões aplicando técnica em rodagem moderada. Avaliação dos ganhos."},
  ]});
  const [anTab, setAnTab]       = useState("drills");
  const videoRef = useRef(null);

  useEffect(()=>{
    async function load(){
      try{
        const [rc,rp,xp,pa]=await Promise.all([
          window.storage.get("tr5_corridas").catch(()=>null),
          window.storage.get("tr5_rps").catch(()=>null),
          window.storage.get("tr5_xp").catch(()=>null),
          window.storage.get("tr5_prova").catch(()=>null),
        ]);
        if(rc){ const saved=JSON.parse(rc.value); setCorridas([...CORRIDAS_DEMO,...saved.filter(r=>!CORRIDAS_DEMO.find(d=>d.id===r.id))]); } else setCorridas(CORRIDAS_DEMO);
        if(rp) setRpsDb(JSON.parse(rp.value));
        if(xp) setXpTotal(JSON.parse(xp.value));
        if(pa) setProvaAmb(JSON.parse(pa.value));
      }catch(e){}
      setDbReady(true);
    }
    load();
  },[]);

  function connectStrava(){
    setStravaConnected(true);
    setStravaRuns(STRAVA_MOCK);
  }

  function connectGarmin(){
    // Garmin tem fluxo mais explícito — mostra modal antes de conectar
    setShowGarminModal(true);
  }
  function confirmarGarmin(){
    setGarminConnected(true);
    setGarminRuns(GARMIN_MOCK);
    setShowGarminModal(false);
  }
  function disconnectGarmin(){
    setGarminConnected(false);
    setGarminRuns([]);
    setShowGarminModal(false);
  }

  async function salvarCorrida(seg,km,bpm,pace,polyline=[]){
    setSalvando(true);
    const now=new Date();
    // Nome: usa treino selecionado ou "Corrida livre"
    const nomeRun = selectedTreino?.nome || "Corrida livre";
    // Filtrar pontos válidos do polyline
    const validPoly = polyline.filter(p=>Array.isArray(p)&&p.length>=2&&p[0]!==undefined&&p[1]!==undefined);
    const run={
      id:"r"+now.getTime(),
      source:"local",
      nome:nomeRun,
      data:now.toLocaleDateString("pt-BR",{day:"2-digit",month:"short",year:"2-digit"}),
      timestamp:now.toISOString(),
      duracao_seg:seg,
      distancia_km:parseFloat(km.toFixed(2)),
      pace_medio:pace,
      bpm_medio:0,
      cadencia_media:gCR.current||174,
      calorias:Math.round(km*65),
      forca_w:null,
      dplus:Math.round(km*32),
      xp_ganho:Math.round(km*45+seg/60*2),
      polyline:validPoly.length>1 ? validPoly : null,
    };
    const defs=[{key:"1K",min:0.9,max:1.1},{key:"5K",min:4.5,max:5.5},{key:"10K",min:9,max:11},{key:"21K",min:19,max:23},{key:"42K",min:40,max:44}];
    const matched=defs.find(d=>km>=d.min&&km<=d.max);
    const newRps={...rpsDb};let nRP=null;
    if(matched){const prev=newRps[matched.key];if(!prev||seg<prev.seg){const diff=prev?prev.seg-seg:null;newRps[matched.key]={tempoDisplay:fmtT(seg),seg,data:run.data,melhora:diff?fmtT(diff):null};nRP={dist:matched.key,tempo:fmtT(seg),melhora:diff?fmtT(diff):null};}}
    const newC=[run,...corridas],newXp=xpTotal+run.xp_ganho;
    if(provaAmb){const np={...provaAmb,treinos:[run,...(provaAmb.treinos||[])]};setProvaAmb(np);try{await window.storage.set("tr5_prova",JSON.stringify(np));}catch(e){}}
    try{await Promise.all([window.storage.set("tr5_corridas",JSON.stringify(newC)),window.storage.set("tr5_rps",JSON.stringify(newRps)),window.storage.set("tr5_xp",JSON.stringify(newXp))]);}catch(e){}
    setCorridas(newC);setRpsDb(newRps);setXpTotal(newXp);setSavedRun(run);
    if(nRP){setNovoRP(nRP);setTimeout(()=>setNovoRP(null),4500);}
    setSalvando(false);
  }
  async function limparDados(){
    try{await Promise.all([window.storage.delete("tr5_corridas"),window.storage.delete("tr5_rps"),window.storage.delete("tr5_xp"),window.storage.delete("tr5_prova")]);}catch(e){}
    setCorridas([]);setRpsDb({});setXpTotal(3240);setProvaAmb(null);
  }

  const rpsExib=RPs_base.map(r=>{const s=rpsDb[r.dist];return s?{...r,tempo:s.tempoDisplay,data:s.data,melhora:s.melhora}:r;});
  const kmTotal=corridas.reduce((a,c)=>a+c.distancia_km,0);
  const dpTotal=corridas.reduce((a,c)=>a+(c.dplus||0),0);
  // Monta contexto do perfil para injetar nas chamadas de IA
  function buildPerfilCtx(){
    const idade = dadosForm.dataNasc ? Math.floor((Date.now()-new Date(dadosForm.dataNasc))/(1000*60*60*24*365)) : null;
    const kmMes = corridas.filter(r=>new Date(r.timestamp)>new Date(Date.now()-30*24*60*60*1000)).reduce((a,c)=>a+c.distancia_km,0);
    const paceRecente = corridas.length ? corridas[0].pace_medio : null;
    const lesaoRecente = corridas.filter(r=>new Date(r.timestamp)>new Date(Date.now()-7*24*60*60*1000));
    const parts = [];
    if(dadosForm.nome) parts.push(`Nome: ${dadosForm.nome.split(" ")[0]}`);
    if(idade) parts.push(`Idade: ${idade} anos`);
    if(dadosForm.sexo) parts.push(`Sexo: ${dadosForm.sexo}`);
    if(dadosForm.peso) parts.push(`Peso: ${dadosForm.peso}kg`);
    if(dadosForm.altura) parts.push(`Altura: ${dadosForm.altura}cm`);
    if(onboardingData.objetivos?.length) parts.push(`Objetivos: ${onboardingData.objetivos.join(", ")}`);
    if(onboardingData.nivel||planForm.nivel) parts.push(`Nível: ${onboardingData.nivel||planForm.nivel}`);
    if(planForm.pace_atual) parts.push(`Pace atual: ${planForm.pace_atual}/km`);
    if(paceRecente) parts.push(`Pace recente: ${paceRecente}/km`);
    if(kmMes>0) parts.push(`Volume últimos 30 dias: ${kmMes.toFixed(1)}km`);
    if(corridas.length) parts.push(`Total de corridas: ${corridas.length}`);
    if(planForm.glp1==="sim") parts.push(`GLP-1: SIM (${planForm.glp1_nausea==="sim"?"náusea ativa":"sem náusea"})`);
    if(planForm.historico_lesoes) parts.push(`Histórico de lesões: ${planForm.historico_lesoes}`);
    if(dadosForm.relogios?.length) parts.push(`Relógio: ${dadosForm.relogios[0]}`);
    return parts.length ? `

[PERFIL DO ATLETA]
${parts.join(" | ")}` : "";
  }

  function calcStreak(){if(!corridas.length) return 6;const ws=new Set(corridas.map(r=>{const d=new Date(r.timestamp);const m=new Date(d);m.setDate(d.getDate()-d.getDay());return m.toDateString();}));return ws.size;}

  // Haversine — distância entre dois pontos GPS em km
  function haversine(lat1,lon1,lat2,lon2){const R=6371;const dLat=(lat2-lat1)*Math.PI/180;const dLon=(lon2-lon1)*Math.PI/180;const a=Math.sin(dLat/2)**2+Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));}

  function startTimer(){timerRef.current=setInterval(()=>{gSR.current+=1;setGSeg(gSR.current);},1000);}

  function startGPS(){
    if(!navigator.geolocation){setGpsStatus("error");return;}
    if(watchRef.current!==null) return; // já tem watch ativo — reusar
    setGpsStatus("searching");
    watchRef.current=navigator.geolocation.watchPosition(
      (pos)=>{
        const {latitude:lat,longitude:lng,accuracy}=pos.coords;
        setGpsAccuracy(Math.round(accuracy));
        setGpsStatus("active");
        const last=lastPosRef.current;
        if(last && isRunningRef.current){ // só grava distância se a corrida já iniciou
          const dist=haversine(last.lat,last.lng,lat,lng);
          const dt=(Date.now()-last.ts)/1000;
          const speed=dt>0?dist/dt:0;
          if(accuracy<=30&&speed<0.1){
            gKR.current=Math.round((gKR.current+dist)*10000)/10000;
            setGKm(gKR.current);
          }
        }
        // Estimar cadência pela velocidade GPS
        if(last){
          const dt2=(Date.now()-last.ts)/1000;
          const sp2=dt2>0?(haversine(last.lat,last.lng,lat,lng)/dt2):0; // m/s
          if(sp2>0.5){ // mínimo 1.8km/h para calcular
            const paceMin=sp2>0?1000/(sp2*60):0; // min/km
            const cadEst=Math.round(Math.min(200,Math.max(140, 155+(6.0-Math.min(paceMin,8.0))*8)));
            // Suavizar com média móvel
            gCR.current=gCR.current>0?Math.round(gCR.current*0.7+cadEst*0.3):cadEst;
            setGCad(gCR.current);
          }
        }
        // Atualiza posição sempre (para o mapa)
        if(isRunningRef.current) routeRef.current.push([lat,lng]); // só grava rota se corrida ativa
        lastPosRef.current={lat,lng,ts:Date.now()};
        // Centraliza mapa na posição atual sempre
        if(!isRunningRef.current) routeRef.current=[[lat,lng]]; // pré-aquecimento: só posição atual
        setRouteTick(t=>t+1);
      },
      (err)=>{console.warn("GPS:",err.message);setGpsStatus("error");},
      {enableHighAccuracy:true,timeout:15000,maximumAge:10000}
    );
  }

  function stopGPS(){if(watchRef.current!==null){navigator.geolocation.clearWatch(watchRef.current);watchRef.current=null;}setGpsStatus("off");}

  function iniciar(){
    // Reseta só os contadores — NÃO para o GPS (já está ativo do pré-aquecimento)
    isRunningRef.current=true;
    gSR.current=0;gKR.current=0;gCR.current=0;
    const lastPos=lastPosRef.current;
    routeRef.current=lastPos?[[lastPos.lat,lastPos.lng]]:[];
    clearInterval(timerRef.current);
    setGStatus("ativo");setGSeg(0);setGKm(0);setGCad(0);setSavedRun(null);
    startTimer();
    // GPS: só liga se não estiver já ativo
    if(watchRef.current===null) startGPS();
  }
  function pausar(){isRunningRef.current=false;clearInterval(timerRef.current);stopGPS();setGStatus("pausado");}
  function retomar(){isRunningRef.current=true;setGStatus("ativo");startTimer();startGPS();}
  async function finalizar(){clearInterval(timerRef.current);stopGPS();setGStatus("fim");const p=calcPace(gKR.current,gSR.current);await salvarCorrida(gSR.current,gKR.current,gCR.current,p,routeRef.current);}
  function resetGrav(keepGPS=false){isRunningRef.current=false;clearInterval(timerRef.current);if(!keepGPS)stopGPS();setGStatus("idle");setGSeg(0);setGKm(0);setGCad(0);if(!keepGPS){setGpsStatus("off");setGpsAccuracy(null);}setSavedRun(null);gSR.current=0;gKR.current=0;gCR.current=0;routeRef.current=[];if(!keepGPS)lastPosRef.current=null;setRouteTick(0);}
  useEffect(()=>()=>{clearInterval(timerRef.current);stopGPS();},[]);

  // Ouvir evento de share do RunDetailModal
  useEffect(()=>{
    const handler=(e)=>{ setStudioRun(e.detail); };
    window.addEventListener("tr_studio_run", handler);
    return ()=>window.removeEventListener("tr_studio_run", handler);
  },[]);

  // Pré-aquecimento GPS ao entrar na tela de gravação
  useEffect(()=>{
    if(subScreen==="gravacao" && gStatus==="idle"){
      startGPS(); // liga GPS imediatamente — startGPS não duplica se já estiver ativo
    }
    if(subScreen!=="gravacao" && gStatus==="idle"){
      stopGPS();
      setGpsStatus("off");
    }
  }, [subScreen]);

  async function sendCoach(){const msg=coachIn.trim();if(!msg||coachLoad)return;if(!checkAiLimit("coach")){setUpgradeReason(`Você usou suas ${AI_LIMITS.coach} perguntas ao Coach hoje. `);setShowUpgradeModal(true);return;}setCoachIn("");const nxt=[...coachMsgs,{from:"user",text:msg}];setCoachMsgs(nxt);setCoachLoad(true);incAiUsage("coach");try{const r=await callAI(SYS_COACH+buildPerfilCtx(),msg,coachMsgs);setCoachMsgs([...nxt,{from:"ai",text:r}]);}catch{setCoachMsgs([...nxt,{from:"ai",text:"Erro 🔌"}]);}setCoachLoad(false);}
  async function sendSaber(q){const msg=q||saberIn.trim();if(!msg||saberLoad)return;if(!checkAiLimit("saber")){setUpgradeReason(`Você usou suas ${AI_LIMITS.saber} perguntas ao Saber hoje. `);setShowUpgradeModal(true);return;}setSaberIn("");setSaberTab("perguntar");const nxt=[...saberMsgs,{from:"user",text:msg}];setSaberMsgs(nxt);setSaberLoad(true);incAiUsage("saber");try{const r=await callAI(SYS_SABER+buildPerfilCtx(),msg,saberMsgs);setSaberMsgs([...nxt,{from:"ai",text:r}]);}catch{setSaberMsgs([...nxt,{from:"ai",text:"Erro 🔌"}]);}setSaberLoad(false);}

  function openTreino(treino, semana){
    setSelectedTreino({...treino, semana});
    setTreinoChatMsgs([{from:"ai",text:`Estou aqui pra ajudar com o seu ${treino.tipo.toLowerCase()} de hoje! Me pergunte qualquer coisa sobre execução, ritmo ou recuperação. 🏃`}]);
    setTreinoChatIn("");
  }
  async function sendTreinoChat(q){
    const msg=q||treinoChatIn.trim();if(!msg||treinoChatLoad||!selectedTreino)return;
    setTreinoChatIn("");
    const nxt=[...treinoChatMsgs,{from:"user",text:msg}];
    setTreinoChatMsgs(nxt);setTreinoChatLoad(true);
    const ctx=`Contexto do treino: ${selectedTreino.nome} (${selectedTreino.tipo}), ${selectedTreino.km}, ${selectedTreino.dur}, intensidade ${selectedTreino.intensidade}, semana ${selectedTreino.semana}. ${selectedTreino.descricao||""}\n\nPergunta: ${msg}`;
    try{const r=await callAI(SYS_COACH,ctx,treinoChatMsgs);setTreinoChatMsgs([...nxt,{from:"ai",text:r}]);}
    catch{setTreinoChatMsgs([...nxt,{from:"ai",text:"Erro 🔌"}]);}
    setTreinoChatLoad(false);
  }

  async function gerarPlanoMacro() {
    if(!checkAiLimit("plano")){setUpgradeReason(`Você já gerou seu plano gratuito deste mês. `);setShowUpgradeModal(true);return;}
    incAiUsage("plano");
    setPlanScreen("loading");setPlanResult(null);

    const idade=dadosForm.dataNasc?Math.floor((Date.now()-new Date(dadosForm.dataNasc))/(1000*60*60*24*365)):null;
    const nomeAtleta=dadosForm.nome?dadosForm.nome.split(" ")[0]:"Atleta";
    const kmRecente=corridas.filter(r=>new Date(r.timestamp)>new Date(Date.now()-30*24*60*60*1000)).reduce((a,c)=>a+c.distancia_km,0);
    const glp1str=planForm.glp1==="sim"?`\nGLP-1: SIM — aplicar regras especiais`:"\nGLP-1: NÃO";

    let durCtx="";
    if(planTipo==="prova"){
      const hoje=new Date();
      const dataProva=new Date(planProva.data_prova);
      const semanas=Math.max(4,Math.round((dataProva-hoje)/(7*24*60*60*1000)));
      durCtx=`Tipo: PARA PROVA\nDistância da prova: ${planProva.distancia}\nData da prova: ${planProva.data_prova}\nSemanas disponíveis: ${semanas}`;
    } else {
      const objLabels={vo2max:"Melhorar VO2max (8 semanas)",base:"Base aeróbica (6 semanas)",perda:"Perda de peso (12 semanas)",consistencia:"Consistência (4 semanas)",meia:"Preparação meia maratona (16 semanas)",maratona:"Preparação maratona (20 semanas)"};
      durCtx=`Tipo: POR OBJETIVO\nObjetivo: ${objLabels[planObjetivo.objetivo]||planObjetivo.objetivo}\nSemanas: ${planObjetivo.semanas}`;
    }

    const nivel = planForm.nivel||onboardingData.nivel||"iniciante";
    const distProva = planTipo==="prova" ? planProva.distancia : (planObjetivo.objetivo==="maratona"?"maratona":planObjetivo.objetivo==="meia"?"meia_maratona":"outro");
    const volumeFloors = {
      maratona:{iniciante:"pico mínimo 55km/semana",intermediario:"pico mínimo 65km/semana",avancado:"pico mínimo 80km/semana"},
      "42k":{iniciante:"pico mínimo 55km/semana",intermediario:"pico mínimo 65km/semana",avancado:"pico mínimo 80km/semana"},
      meia_maratona:{iniciante:"pico mínimo 45km/semana",intermediario:"pico mínimo 55km/semana",avancado:"pico mínimo 70km/semana"},
      "21k":{iniciante:"pico mínimo 45km/semana",intermediario:"pico mínimo 55km/semana",avancado:"pico mínimo 70km/semana"},
      "10k":{iniciante:"pico mínimo 35km/semana",intermediario:"pico mínimo 50km/semana",avancado:"pico mínimo 60km/semana"},
    };
    const floorKey = ["maratona","42k","42 km","42km"].some(k=>distProva?.toLowerCase()===k) ? "maratona"
                   : ["meia_maratona","21k","21 km","21km","meia maratona"].some(k=>distProva?.toLowerCase()===k) ? "meia_maratona"
                   : ["10k","10 km","10km","10 milhas"].some(k=>distProva?.toLowerCase()===k) ? "10k" : null;
    const nvelKey = nivel.toLowerCase().includes("avan") ? "avancado" : nivel.toLowerCase().includes("inter") ? "intermediario" : "iniciante";
    const volumeInstr = floorKey ? `\nVOLUME MÍNIMO OBRIGATÓRIO para ${distProva} nível ${nivel}: ${(volumeFloors[floorKey]||{})[nvelKey]||"pico mínimo 50km/semana"} — NUNCA gere semanas abaixo deste piso (exceto semanas de recuperação -20% e taper final).` : "";
    const ctx=`ATLETA: ${nomeAtleta}${idade?` | ${idade} anos`:""}${dadosForm.peso?` | ${dadosForm.peso}kg`:""}\nNível: ${nivel}\nPace atual: ${planForm.pace_atual||"5:30"}/km\nDias disponíveis/semana: ${planForm.dias_disponiveis||4}\nVolume recente: ${kmRecente.toFixed(0)}km/mês\nHistórico lesões: ${planForm.historico_lesoes||"Nenhuma"}${glp1str}\n${durCtx}${volumeInstr}`;

    try{
      const r=await callAI(SYS_PLAN_MACRO,ctx,[],4000);
      const clean=r.replace(/```json|```/g,"").trim();
      const macro=JSON.parse(clean);
      // Salva o macro como plano (semanas expandidas vazias)
      const planData={
        tipo:"macro",
        macro,
        plano:[], // será preenchido por semana expandida
        semanas_macro: macro.semanas||[],
        titulo: macro.titulo||"Meu Plano",
        resumo_semanal: macro.objetivo||"",
        avisos_medicos: macro.avisos||[],
      };
      setSavedPlan(planData);
      setExpandedWeeks({});
      try{localStorage.setItem("tr_saved_plan",JSON.stringify(planData));localStorage.removeItem("tr_completed_workouts");}catch{}
      setCompletedWorkouts({});
      setPlanScreen("form");
      setTab("treino");
      setTimeout(()=>setSubScreen("verPlano"),50);
    }catch(e){
      console.error(e);
      setPlanResult({plano:[{dia:"—",tipo:"Erro",distancia_km:0,pace_alvo:"",descricao:"Tente novamente.",alerta_lesao:""}],resumo_semanal:"Erro ao gerar plano.",avisos_medicos:[],progressao_segura:"",alerta_glp1:""});
      setPlanScreen("result");
    }
  }

  async function expandirSemana(semanaIdx, attempt=0) {
    if(expandedWeeks[semanaIdx]) return; // já expandida
    setExpandingWeek(semanaIdx);
    const semMacro = savedPlan?.semanas_macro?.[semanaIdx];
    if(!semMacro){ setExpandingWeek(null); return; }

    const ctx=`Semana ${semanaIdx+1} do plano: "${semMacro.foco}"\nVolume alvo: ${semMacro.volume_km}km\nTreinos chave: ${semMacro.treinos_chave?.join(", ")||""}\nDias descanso: ${semMacro.descansos||2}\nNível atleta: ${planForm.nivel||"intermediario"}\nPace base: ${planForm.pace_atual||"5:30"}/km\nGLP-1: ${planForm.glp1==="sim"?"SIM":"NÃO"}`;

    try{
      const r=await callAI(SYS_PLAN_WEEK,ctx,[],2500);
      const jsonMatch=r.match(/\[[\s\S]*\]/);
      const clean=jsonMatch ? jsonMatch[0] : r.replace(/```json|```/g,"").trim();
      const dias=JSON.parse(clean);
      if(!Array.isArray(dias)||dias.length===0) throw new Error("resposta vazia");
      const updated={...expandedWeeks,[semanaIdx]:dias};
      setExpandedWeeks(updated);
      try{localStorage.setItem("tr_expanded_weeks_"+savedPlan?.macro?.titulo,JSON.stringify(updated));}catch{}
    }catch(e){
      console.error("expandirSemana erro:",e);
      if(attempt<1){
        setExpandingWeek(null);
        setTimeout(()=>expandirSemana(semanaIdx, attempt+1), 800);
        return;
      }
      setExpandedWeeks(prev=>({...prev,[semanaIdx+"_erro"]:true}));
    }
    setExpandingWeek(null);
  }

  async function gerarPlano(){
    if(!checkAiLimit("plano")){setUpgradeReason(`Você já gerou seu plano gratuito deste mês. `);setShowUpgradeModal(true);return;}
    incAiUsage("plano");
    setPlanScreen("loading");setPlanResult(null);
    const glp1str=planForm.glp1==="sim"
      ?`\nUSO DE GLP-1: SIM — APLICAR TODAS AS REGRAS ESPECIAIS GLP-1\nNáusea ativa:${planForm.glp1_nausea}\nMedicamento reduz ingestão calórica 16-39% (PMC 12683586) — risco de glicogênio baixo e perda muscular`
      :"\nUSO DE GLP-1: NÃO";
    const idade=dadosForm.dataNasc?Math.floor((Date.now()-new Date(dadosForm.dataNasc))/(1000*60*60*24*365)):null;
    const nomeAtleta=dadosForm.nome?dadosForm.nome.split(" ")[0]:"Atleta";
    const kmRecente=corridas.filter(r=>new Date(r.timestamp)>new Date(Date.now()-30*24*60*60*1000)).reduce((a,c)=>a+c.distancia_km,0);
    const ctx=`ATLETA: ${nomeAtleta}${idade?` | ${idade} anos`:""}${dadosForm.sexo?` | ${dadosForm.sexo}`:""}${dadosForm.peso?` | ${dadosForm.peso}kg`:""}${dadosForm.altura?` | ${dadosForm.altura}cm`:""}
Objetivo:${planForm.objetivo||onboardingData.objetivos?.join(", ")||""}
Distância:${planForm.dist_semana}km/sem
Pace:${planForm.pace_atual}/km
Dias:${planForm.dias_disponiveis}
Inatividade:${planForm.inatividade_semanas}sem
Lesões:${planForm.historico_lesoes||"Nenhuma"}
Nível:${planForm.nivel||onboardingData.nivel}${kmRecente>0?`
Volume últimos 30 dias: ${kmRecente.toFixed(1)}km`:""}
Total corridas:${corridas.length}${glp1str}${planImport?"\n"+planImport.fonte+":"+planImport.corridas_total+" corridas":""}`;
    try{
      const r=await callAI(SYS_PLAN,ctx,[],4000);
      const clean=r.replace(/```json|```/g,"").trim();
      const p=JSON.parse(clean);
      setPlanResult(p);setPlanScreen("result");
    }
    catch{setPlanResult({plano:[{dia:"—",tipo:"Erro",distancia_km:0,pace_alvo:"",descricao:"Tente novamente.",alerta_lesao:""}],resumo_semanal:"Erro.",avisos_medicos:[],progressao_segura:"",alerta_glp1:""});setPlanScreen("result");}
  }
  function handlePaceCustom(v){setPaceCustom(v);if(!v){setPaceAlerta(null);return;}setPaceAlerta(avaliarPace(v,planForm.pace_atual||"5:30"));}

  function handleVideoUpload(e){
    const file=e.target.files[0];if(!file) return;
    const url=URL.createObjectURL(file);
    const vid=document.createElement("video");vid.src=url;
    vid.onloadedmetadata=()=>{
      if(vid.duration>32){alert("Vídeo muito longo. Envie um vídeo de até 30 segundos.");return;}
      setAnVideo({name:file.name,duration:Math.round(vid.duration),size:(file.size/1024/1024).toFixed(1)});
      setAnStep("info");
    };
  }

  async function gerarAnalise(){
    setAnStep("loading"); setAnData(null);
    await new Promise(r=>setTimeout(r,2000));
    setAnData({
      indice_tecnica:78,
      classificacao:"Bom",
      data_analise: new Date().toLocaleDateString("pt-BR",{day:"2-digit",month:"short",year:"numeric"}),
      video_duracao: anVideo?.duration||32,
      video_nome: anVideo?.name||"corrida_25maio.mp4",
      metricas:[
        {id:1,nome:"Elevação Vertical",valor:"8.6 cm",status:"Regular",ideal:"6-8 cm",descricao:"Oscilação um pouco acima do ideal. Reduzir a elevação vertical pode melhorar a economia de corrida e reduzir taxas de carga.",cor_status:"amber"},
        {id:2,nome:"Tamanho da Passada x Pace",valor:"1.22 m",status:"Regular",ideal:"1.00–1.15 m",descricao:"Sua passada está longa demais para o seu pace atual. Passadas mais curtas e rápidas tendem a ser mais eficientes e seguras.",cor_status:"amber"},
        {id:3,nome:"Aterrissagem",valor:"OK",status:"Excelente",ideal:"Abaixo do CG",descricao:"Seu pé aterrissa próximo ou abaixo do centro de gravidade. Isso reduz o impacto de frenagem e é o ideal biomecânico.",cor_status:"green"},
        {id:4,nome:"Overstriding",valor:"Alto",status:"Atenção",ideal:"Baixo",descricao:"Seu pé está aterrissando muito à frente do quadril. Isso gera força de frenagem e pode aumentar o risco de lesões.",cor_status:"coral"},
      ],
      resumo:"Você tem uma boa base técnica, mas pequenos ajustes podem trazer grandes ganhos. Foque em reduzir a oscilação vertical e a extensão da passada para melhorar sua eficiência e reduzir o risco de lesões.",
      drills:[
        {nome:"Skipping A",duracao:"2×30s",descricao:"Melhora a mecânica e a frequência de passada. Mantenha joelhos altos e pouso suave."},
        {nome:"Ankling",duracao:"2×30s",descricao:"Ativa o tornozelo e melhora a cadência. Foco na elasticidade do tornozelo ao pousar."},
        {nome:"Wall Drill",duracao:"3×20s",descricao:"Trabalha o quadril e a postura. Apoie as mãos na parede e alterne os joelhos em ritmo rápido."},
        {nome:"Quick Steps",duracao:"4×20s",descricao:"Passos curtos e rápidos com leve inclinação. Simula cadência alta em terreno plano."},
        {nome:"Strides",duracao:"6×80m",descricao:"Acelerações progressivas para leveza e técnica. Acelere suavemente até 90% do esforço máximo."},
        {nome:"Corrida com Metrônomo",duracao:"10 min",descricao:"Use app de metrônomo em 175–180 bpm e sincronize os passos. Excelente para fixar a cadência ideal."},
      ],
      treino_tecnico:{descricao:"6 a 8 blocos de 30–45s em cadência alta, foco total na frequência de passada. Recuperação leve entre blocos.",series:6,duracao_s:40,recuperacao:"60s caminhada leve"},
      cues:["Pise mais próximo do corpo","Passos rápidos e leves","Reduza o salto vertical","Incline levemente o tronco à frente","Mantenha os ombros relaxados"],
      plano_4sem:[
        {semana:1,foco:"Cadência",descricao:"2 sessões técnicas de 20min. Drills de skipping A e ankling. Meta: 170 spm."},
        {semana:2,foco:"Passada",descricao:"2 sessões com foco em encurtar passada. Strides 6×80m com metrônomo."},
        {semana:3,foco:"Eficiência",descricao:"2 sessões combinando cadência + passada. Corrida de 20min com metrônomo em 175 bpm."},
        {semana:4,foco:"Integração",descricao:"2 sessões aplicando técnica em rodagem moderada de 30–40min. Consolida os ganhos."},
      ]
    });
    setAnStep("result");
  }

  async function selecionarProva(prova){
    const amb={prova,treinos:[],numeroPeito:"",criadoEm:new Date().toISOString()};
    setProvaAmb(amb);
    try{await window.storage.set("tr5_prova",JSON.stringify(amb));}catch(e){}
    setSubScreen("provaAmbiente");
  }

  async function buscarFotos(){
    if(!numPeito.trim()||!provaAmb) return;
    setBuscFotos(true);setResFotos(null);
    const upd={...provaAmb,numeroPeito:numPeito};setProvaAmb(upd);
    try{await window.storage.set("tr5_prova",JSON.stringify(upd));}catch(e){}
    try{
      const r=await callAI(`Especialista em busca de fotos de corridas. JSON apenas: {"sites":[{"nome":"","url":"","instrucoes":""}],"dica_geral":""}`,`Prova:${provaAmb.prova.nome},${provaAmb.prova.data},${provaAmb.prova.local}. Número de peito:${numPeito}`,[]);
      setResFotos(JSON.parse(r.replace(/```json|```/g,"").trim()));
    }catch{setResFotos({sites:[{nome:"BibTag",url:"https://bibtag.com.br",instrucoes:"Pesquise pelo número "+numPeito},{nome:"FinisherPix",url:"https://finisherpix.com",instrucoes:"Busque pelo número "+numPeito}],dica_geral:"Verifique as redes sociais da organização."});}
    setBuscFotos(false);
  }

  const pace=calcPace(gKm,gSeg);
  const intDone=Math.min(6,Math.floor(gKm/0.8));
  const zC=C.cyanB; const zL=""; const zK="";
  function colorStatus(s){if(s==="green") return C.green;if(s==="amber") return C.amber;if(s==="coral") return C.coral;return C.cyanB;}

  function VCard({ children, extra={} }) {
    return <div style={{background:"linear-gradient(135deg,"+C.s1+","+C.s2+")",borderRadius:16,padding:14,marginBottom:12,border:"1px solid "+C.border,...extra}}>{children}</div>;
  }


  // ── DADOS PESSOAIS MODAL ──────────────────────────────────────────────────────
  function renderDadosModal() {
    const inp = (label,key,type="text",placeholder="",extra={}) => (
      <div style={{marginBottom:13}}>
        <label style={{color:C.ts,fontSize:11,fontWeight:700,letterSpacing:0.5,textTransform:"uppercase",display:"block",marginBottom:5,fontFamily:"monospace"}}>{label}</label>
        <input type={type} value={dadosForm[key]||""} placeholder={placeholder}
          onChange={e=>setDadosForm(p=>({...p,[key]:e.target.value}))}
          style={{width:"100%",background:C.s2,border:"1px solid "+C.border,borderRadius:10,padding:"11px 12px",color:C.tp,fontSize:14,outline:"none",fontFamily:"inherit",boxSizing:"border-box",...extra}}/>
      </div>
    );
    const sel = (label,key,opts) => (
      <div style={{marginBottom:13}}>
        <label style={{color:C.ts,fontSize:11,fontWeight:700,letterSpacing:0.5,textTransform:"uppercase",display:"block",marginBottom:5,fontFamily:"monospace"}}>{label}</label>
        <select value={dadosForm[key]||""} onChange={e=>{const upd={[key]:e.target.value};if(key==="pais")upd.cidade="";setDadosForm(p=>({...p,...upd}));}}
          style={{width:"100%",background:C.s2,border:"1px solid "+C.border,borderRadius:10,padding:"11px 12px",color:dadosForm[key]?C.tp:C.tm,fontSize:14,outline:"none",fontFamily:"inherit",boxSizing:"border-box",appearance:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%235567a0' strokeWidth='1.5' fill='none' strokeLinecap='round'/%3E%3C/svg%3E")`,backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center"}}>
          <option value="" disabled>{label === "Sexo" ? "Selecione..." : "Selecione..."}</option>
          {opts.map(o=><option key={o} value={o}>{o}</option>)}
        </select>
      </div>
    );
    const equipTag = (tipo) => {
      const lista = dadosForm[tipo]||[];
      const label = tipo==="tenis"?"Tênis":tipo==="relogios"?"Relógios":"Fones";
      return (
        <div style={{marginBottom:13}}>
          <label style={{color:C.ts,fontSize:11,fontWeight:700,letterSpacing:0.5,textTransform:"uppercase",display:"block",marginBottom:5,fontFamily:"monospace"}}>{label}</label>
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:6}}>
            {lista.map((item,i)=>(
              <div key={i} style={{background:C.violet+"33",border:"1px solid "+C.violet+"66",borderRadius:20,padding:"4px 10px",display:"flex",alignItems:"center",gap:6}}>
                <span style={{color:C.violetB,fontSize:12,fontWeight:600}}>{item}</span>
                <button onClick={()=>setDadosForm(p=>({...p,[tipo]:p[tipo].filter((_,j)=>j!==i)}))} style={{background:"none",border:"none",color:C.tm,cursor:"pointer",padding:0,fontSize:14,lineHeight:1}}>×</button>
              </div>
            ))}
          </div>
          <div style={{position:"relative"}}>
            <select value="" onChange={e=>{if(e.target.value&&!lista.includes(e.target.value))setDadosForm(p=>({...p,[tipo]:[...p[tipo],e.target.value]}));}}
              style={{width:"100%",background:C.s2,border:"1px solid "+C.border,borderRadius:10,padding:"10px 12px",color:C.tm,fontSize:13,outline:"none",fontFamily:"inherit",boxSizing:"border-box",appearance:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%235567a0' strokeWidth='1.5' fill='none' strokeLinecap='round'/%3E%3C/svg%3E")`,backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center"}}>
              <option value="">+ Adicionar {label.toLowerCase()}...</option>
              {EQUIPAMENTOS[tipo].filter(o=>!lista.includes(o)).map(o=><option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>
      );
    };
    const cidades = CIDADES[dadosForm.pais] || [];
    return (
      <div style={{position:"fixed",inset:0,background:C.bg,zIndex:200,display:"flex",flexDirection:"column",maxWidth:430,margin:"0 auto"}}>
        <div style={{background:C.s1,borderBottom:"1px solid "+C.border,padding:"14px 16px",display:"flex",alignItems:"center",gap:12,flexShrink:0}}>
          <button onClick={()=>setShowDadosModal(false)} style={{background:C.s2,border:"1px solid "+C.border,borderRadius:9,padding:"6px 10px",cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
            <Ic n="back" z={13} c={C.ts}/><span style={{color:C.ts,fontSize:12}}>Voltar</span>
          </button>
          <div style={{flex:1}}>
            <p style={{color:C.tp,fontWeight:800,fontSize:16,margin:0,fontFamily:"'Space Grotesk',sans-serif"}}>Dados Pessoais</p>
          </div>
          <button onClick={()=>{try{localStorage.setItem("tr_dados",JSON.stringify(dadosForm));}catch{}setShowDadosModal(false);}} style={{background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",border:"none",borderRadius:9,padding:"7px 14px",cursor:"pointer",color:"#fff",fontWeight:700,fontSize:12,fontFamily:"inherit"}}>Salvar</button>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"18px 16px 32px"}}>
          <p style={{color:C.violetB,fontSize:11,fontWeight:700,letterSpacing:1,textTransform:"uppercase",margin:"0 0 14px",fontFamily:"monospace"}}>👤 Perfil</p>
          <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:18}}>
            <div style={{width:72,height:72,borderRadius:36,background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,border:"2px solid "+C.violet+"66",overflow:"hidden"}}>
              {dadosForm.foto ? <img src={dadosForm.foto} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <img src={perfilImg} alt="" style={{width:"100%",height:"100%",objectFit:"contain"}}/>}
            </div>
            <div style={{flex:1}}>
              <p style={{color:C.tp,fontSize:13,fontWeight:600,margin:"0 0 8px"}}>Foto de perfil</p>
              <label style={{background:C.s2,border:"1px solid "+C.border,borderRadius:9,padding:"7px 13px",cursor:"pointer",color:C.ts,fontSize:12,fontWeight:600,display:"inline-flex",alignItems:"center",gap:6}}>
                <Ic n="photo" z={13} c={C.ts}/>Alterar foto
                <input type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(f){const r=new FileReader();r.onload=ev=>setDadosForm(p=>({...p,foto:ev.target.result}));r.readAsDataURL(f);}}}/>
              </label>
            </div>
          </div>
          {inp("Nome do corredor","nome","text","Ex: Michel Oliveira")}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <div>{inp("Data de nascimento","dataNasc","date")}</div>
            <div>{sel("Sexo","sexo",["Masculino","Feminino","Outro","Prefiro não dizer"])}</div>
          </div>
          {sel("País","pais",PAISES)}
          {sel("Cidade","cidade", cidades.length ? cidades : ["(selecione um país primeiro)"])}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <div>{inp("Altura (cm)","altura","number","Ex: 175")}</div>
            <div>{inp("Peso (kg)","peso","number","Ex: 68")}</div>
          </div>
          <div style={{height:1,background:C.border,margin:"6px 0 18px"}}/>
          <p style={{color:C.cyanB,fontSize:11,fontWeight:700,letterSpacing:1,textTransform:"uppercase",margin:"0 0 14px",fontFamily:"monospace"}}>🎽 Equipamentos</p>
          {equipTag("tenis")}
          {equipTag("relogios")}
          {equipTag("fones")}
        </div>
      </div>
    );
  }

  // ── CONFIGURAÇÕES MODAL ───────────────────────────────────────────────────────
  function renderConfigModal() {
    const tog = (key,label,desc) => (
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 0",borderBottom:"1px solid "+C.bsub}}>
        <div style={{flex:1,paddingRight:12}}>
          <p style={{color:C.tp,fontSize:13,fontWeight:600,margin:0}}>{label}</p>
          {desc&&<p style={{color:C.tm,fontSize:11,margin:"2px 0 0"}}>{desc}</p>}
        </div>
        <button onClick={()=>setConfigForm(p=>({...p,[key]:!p[key]}))}
          style={{width:44,height:26,borderRadius:13,background:configForm[key]?"linear-gradient(135deg,"+C.violet+","+C.cyan+")":C.s3,border:"1px solid "+(configForm[key]?C.violet:C.border),cursor:"pointer",position:"relative",transition:"all 0.2s",flexShrink:0}}>
          <div style={{width:20,height:20,borderRadius:10,background:"#fff",position:"absolute",top:2,left:configForm[key]?22:2,transition:"left 0.2s",boxShadow:"0 1px 4px #0006"}}/>
        </button>
      </div>
    );
    const radio = (key,opts) => (
      <div style={{display:"flex",gap:6,marginTop:8,marginBottom:4}}>
        {opts.map(o=>(
          <button key={o.v} onClick={()=>setConfigForm(p=>({...p,[key]:o.v}))}
            style={{flex:1,background:configForm[key]===o.v?"linear-gradient(135deg,"+C.violet+"44,"+C.cyan+"22)":C.s3,border:"1px solid "+(configForm[key]===o.v?C.violet:C.border),borderRadius:9,padding:"8px 4px",cursor:"pointer",color:configForm[key]===o.v?C.tp:C.tm,fontSize:12,fontWeight:configForm[key]===o.v?700:500,fontFamily:"inherit"}}>
            {o.l}
          </button>
        ))}
      </div>
    );
    const section = (icon,label,color,children) => (
      <div style={{marginBottom:18}}>
        <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:8}}>
          <div style={{width:26,height:26,borderRadius:8,background:color+"22",display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid "+color+"33"}}><Ic n={icon} z={13} c={color}/></div>
          <p style={{color:color,fontSize:11,fontWeight:700,letterSpacing:1,textTransform:"uppercase",margin:0,fontFamily:"monospace"}}>{label}</p>
        </div>
        <div style={{background:C.s1,borderRadius:13,border:"1px solid "+C.border,padding:"0 14px"}}>
          {children}
        </div>
      </div>
    );
    const inpCfg = (key,label,desc,type="text",placeholder="") => (
      <div style={{padding:"11px 0",borderBottom:"1px solid "+C.bsub}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
          <div style={{flex:1}}>
            <p style={{color:C.tp,fontSize:13,fontWeight:600,margin:0}}>{label}</p>
            {desc&&<p style={{color:C.tm,fontSize:11,margin:"2px 0 0"}}>{desc}</p>}
          </div>
          <input type={type} value={configForm[key]||""} onChange={e=>setConfigForm(p=>({...p,[key]:e.target.value}))} placeholder={placeholder}
            style={{width:70,background:C.s2,border:"1px solid "+C.border,borderRadius:8,padding:"6px 8px",color:C.tp,fontSize:13,outline:"none",fontFamily:"monospace",textAlign:"center"}}/>
        </div>
      </div>
    );
    const selCfg = (key,label,desc,opts) => (
      <div style={{padding:"11px 0",borderBottom:"1px solid "+C.bsub}}>
        <p style={{color:C.tp,fontSize:13,fontWeight:600,margin:"0 0 4px"}}>{label}</p>
        {desc&&<p style={{color:C.tm,fontSize:11,margin:"0 0 7px"}}>{desc}</p>}
        <select value={configForm[key]||""} onChange={e=>setConfigForm(p=>({...p,[key]:e.target.value}))}
          style={{width:"100%",background:C.s2,border:"1px solid "+C.border,borderRadius:9,padding:"9px 12px",color:C.tp,fontSize:13,outline:"none",fontFamily:"inherit",appearance:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%235567a0' strokeWidth='1.5' fill='none' strokeLinecap='round'/%3E%3C/svg%3E")`,backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center"}}>
          {opts.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}
        </select>
      </div>
    );
    return (
      <div style={{position:"fixed",inset:0,background:C.bg,zIndex:200,display:"flex",flexDirection:"column",maxWidth:430,margin:"0 auto"}}>
        <div style={{background:C.s1,borderBottom:"1px solid "+C.border,padding:"14px 16px",display:"flex",alignItems:"center",gap:12,flexShrink:0}}>
          <button onClick={()=>setShowConfigModal(false)} style={{background:C.s2,border:"1px solid "+C.border,borderRadius:9,padding:"6px 10px",cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
            <Ic n="back" z={13} c={C.ts}/><span style={{color:C.ts,fontSize:12}}>Voltar</span>
          </button>
          <div style={{flex:1}}>
            <p style={{color:C.tp,fontWeight:800,fontSize:16,margin:0,fontFamily:"'Space Grotesk',sans-serif"}}>Configurações</p>
          </div>
          <button onClick={()=>{try{localStorage.setItem("tr_config",JSON.stringify(configForm));}catch{}setShowConfigModal(false);}} style={{background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",border:"none",borderRadius:9,padding:"7px 14px",cursor:"pointer",color:"#fff",fontWeight:700,fontSize:12,fontFamily:"inherit"}}>Salvar</button>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"18px 16px 40px"}}>

          {section("streak","Notificações",C.amber,<>
            {tog("lembreteTreino","Lembrete de treino","Aviso diário no horário do treino")}
            {tog("rpNotif","Notificações de RP","Alerta quando bater um recorde pessoal")}
          </>)}

          {section("settings","Tema",C.cyanB,<>
            <div style={{padding:"11px 0"}}>
              <p style={{color:C.tp,fontSize:13,fontWeight:600,margin:"0 0 2px"}}>Aparência</p>
              <p style={{color:C.tm,fontSize:11,margin:"0 0 4px"}}>Escolha o tema do aplicativo</p>
              {(()=>{
              const opts=[{v:"dark",l:"🌙 Dark"},{v:"light",l:"☀️ Light"},{v:"auto",l:"⚙️ Auto"}];
              return <div style={{display:"flex",gap:6}}>
                {opts.map(o=>(
                  <button key={o.v} onClick={()=>{
                    const next={...configForm,tema:o.v};
                    setConfigForm(next);
                    try{localStorage.setItem("tr_config",JSON.stringify(next));}catch{}
                  }}
                    style={{flex:1,background:configForm.tema===o.v?"linear-gradient(135deg,"+C.violet+"44,"+C.cyan+"22)":C.s3,border:"1px solid "+(configForm.tema===o.v?C.violet:C.border),borderRadius:9,padding:"8px 4px",cursor:"pointer",color:configForm.tema===o.v?C.tp:C.tm,fontSize:12,fontWeight:configForm.tema===o.v?700:500,fontFamily:"inherit"}}>
                    {o.l}
                  </button>
                ))}
              </div>;
            })()}
            </div>
          </>)}

          {section("ai","Voz do Coach IA",C.violetL,<>
            <div style={{padding:"11px 0",borderBottom:"1px solid "+C.bsub}}>
              <p style={{color:C.tp,fontSize:13,fontWeight:600,margin:"0 0 2px"}}>Gênero da voz</p>
              {radio("vozGenero",[{v:"masculina",l:"Masculina"},{v:"feminina",l:"Feminina"}])}
            </div>
            <div style={{padding:"11px 0"}}>
              <p style={{color:C.tp,fontSize:13,fontWeight:600,margin:"0 0 2px"}}>Estilo</p>
              {radio("vozEstilo",[{v:"motivacional",l:"🔥 Motivacional"},{v:"tecnica",l:"📊 Técnica"}])}
            </div>
          </>)}

          {section("map","Mapas",C.cyan,<>
            {tog("mapaOffline","Download offline","Salvar mapas para uso sem internet")}
            {tog("mostrarAltimetria","Mostrar altimetria automática","Exibir gráfico de elevação nas corridas")}
            {tog("rotasSeguras","Rotas seguras","Preferir rotas com menos tráfego")}
          </>)}

          {section("run","Corrida",C.green,<>
            {tog("autoPause","Auto pause","Pausar automaticamente ao parar")}
            {tog("vibracaoSplit","Vibração por split","Vibrar ao completar cada km")}
            {tog("alertasHidratacao","Alertas de hidratação/gel","Lembrete de hidratação durante o treino")}
            {inpCfg("cadenciaAlvo","Cadência alvo","Passos por minuto (spm)","number","180")}
          </>)}

          {section("settings","Conta",C.ts,<>
            {selCfg("idioma","Idioma","Idioma do aplicativo",[{v:"pt-BR",l:"🇧🇷 Português (Brasil)"},{v:"en",l:"🇬🇧 English"},{v:"es",l:"🇪🇸 Español"},{v:"fr",l:"🇫🇷 Français"},{v:"de",l:"🇩🇪 Deutsch"}])}
            <div onClick={()=>{setShowConfigModal(false);setShowProModal(true);}} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"11px 0",borderBottom:"1px solid "+C.bsub,cursor:"pointer"}}>
              <div>
                <p style={{color:C.tp,fontSize:13,fontWeight:600,margin:0}}>Assinatura Pro</p>
                <p style={{color:C.tm,fontSize:11,margin:"2px 0 0"}}>{isPro?"Ativa — gerencie sua assinatura":"Treinos avançados, análise ilimitada"}</p>
              </div>
              <div style={{background:isPro?"linear-gradient(135deg,"+C.green+",#16a34a)":"linear-gradient(135deg,"+C.violet+","+C.cyan+")",borderRadius:20,padding:"4px 12px",display:"flex",alignItems:"center",gap:5}}>
                {isPro&&<div style={{width:6,height:6,borderRadius:"50%",background:"#fff"}}/>}
                <span style={{color:"#fff",fontSize:11,fontWeight:700}}>{isPro?"ATIVO":"PRO"}</span>
              </div>
            </div>
            {tog("backupSync","Backup / Sync","Sincronizar dados na nuvem automaticamente")}
            <div style={{padding:"11px 0"}}>
              <button style={{width:"100%",background:"#ef444411",border:"1px solid #ef444433",borderRadius:10,padding:"11px 0",cursor:"pointer",color:"#ef4444",fontWeight:700,fontSize:13,fontFamily:"inherit"}}>
                🗑 Excluir conta
              </button>
            </div>
          </>)}

        </div>
      </div>
    );
  }


  // ── PRO MODAL ─────────────────────────────────────────────────────────────────
  function renderProModal() {

    const PLANS = {
      monthly: { label:"Mensal", priceR:"R$ 19,90", priceE:"€ 4,99", period:"/mês", save:null },
      yearly:  { label:"Anual",  priceR:"R$ 159,90", priceE:"€ 39,99", period:"/ano", save:"Economize 33%" },
    };

    const features = [
      { icon:"ai",      text:"Coach IA ilimitado — perguntas e planos sem limite" },
      { icon:"chart",   text:"Análise biomecânica avançada — histórico completo" },
      { icon:"run",     text:"Planos de treino personalizados com perfil" },
      { icon:"map",     text:"Mapas offline e rotas seguras" },
      { icon:"trophy",  text:"Conquistas exclusivas Pro" },
      { icon:"streak",  text:"Backup e sync automático na nuvem" },
    ];

    async function handleCheckout() {
      // Guarda onde o utilizador está para restaurar após pagamento
      try {
        localStorage.setItem("tr_pre_checkout", JSON.stringify({
          tab: tab,
          subScreen: subScreen,
          planScreen: planScreen,
          planForm: planForm,
        }));
      } catch {}
      if (!session?.access_token) return;
      setProLoading(true); setProError("");
      try {
        const r = await fetch(STRIPE_CHECKOUT_FN, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.access_token}`,
            "apikey": SUPABASE_ANON,
          },
          body: JSON.stringify({
            plan: selectedPlan, // "monthly" | "yearly"
            user_id: session.id,
            email: session.email,
            success_url: `https://app.temporun.run?pro=success&return=${tab}`,
            cancel_url:  `https://app.temporun.run?pro=cancel&return=${tab}`,
          }),
        });
        const data = await r.json();
        if (data?.url) {
          window.location.href = data.url;
        } else {
          setProError(data?.error || "Erro ao iniciar checkout. Tente novamente.");
        }
      } catch(e) {
        setProError("Erro de conexão. Verifique sua internet.");
      }
      setProLoading(false);
    }

    async function handlePortal() {
      if (!session?.access_token) return;
      setProLoading(true);
      try {
        const r = await fetch(STRIPE_PORTAL_FN, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.access_token}`,
            "apikey": SUPABASE_ANON,
          },
          body: JSON.stringify({
            return_url: "https://app.temporun.run",
          }),
        });
        const data = await r.json();
        if (data?.url) window.location.href = data.url;
      } catch(e) {}
      setProLoading(false);
    }

    return (
      <div style={{position:"fixed",inset:0,background:"#00000099",zIndex:300,display:"flex",flexDirection:"column",justifyContent:"flex-end",maxWidth:430,margin:"0 auto"}}>
        <div style={{background:C.bg,borderRadius:"20px 20px 0 0",border:"1px solid "+C.violet+"44",maxHeight:"92vh",overflowY:"auto",animation:"slideUp 0.3s ease"}}>

          {/* header */}
          <div style={{padding:"16px 18px 0",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,background:C.bg,zIndex:1,borderBottom:"1px solid "+C.border,paddingBottom:14}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",borderRadius:10,padding:"6px 10px"}}>
                <Ic n="pro" z={18} c="#fff"/>
              </div>
              <div>
                <p style={{color:C.tp,fontWeight:800,fontSize:17,margin:0,fontFamily:"'Space Grotesk',sans-serif"}}>TempoRun Pro</p>
                <p style={{color:C.tm,fontSize:11,margin:0}}>Desbloqueie o potencial completo</p>
              </div>
            </div>
            <button onClick={()=>setShowProModal(false)} style={{background:C.s2,border:"1px solid "+C.border,borderRadius:8,padding:"6px 10px",cursor:"pointer",color:C.ts,fontSize:18,lineHeight:1}}>×</button>
          </div>

          <div style={{padding:"18px 18px 32px"}}>

            {/* Active subscription state */}
            {isPro && (
              <div style={{background:"linear-gradient(135deg,"+C.violet+"22,"+C.cyan+"11)",border:"1px solid "+C.violet+"44",borderRadius:14,padding:"14px 16px",marginBottom:18,textAlign:"center"}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:6}}>
                  <div style={{width:8,height:8,borderRadius:"50%",background:C.green,boxShadow:"0 0 6px "+C.green}}/>
                  <p style={{color:C.green,fontWeight:700,fontSize:13,margin:0}}>Assinatura ativa</p>
                </div>
                <p style={{color:C.tm,fontSize:12,margin:"0 0 14px"}}>
                  {proStatus === "trialing" ? "Período de avaliação ativo" : "Pro ativo — obrigado pelo apoio! 🙏"}
                </p>
                <button onClick={handlePortal} disabled={proLoading}
                  style={{background:C.s2,border:"1px solid "+C.border,borderRadius:10,padding:"10px 20px",cursor:"pointer",color:C.ts,fontSize:13,fontWeight:600,fontFamily:"inherit"}}>
                  {proLoading ? "Carregando..." : "Gerenciar assinatura"}
                </button>
              </div>
            )}

            {/* Features list */}
            <p style={{color:C.ts,fontSize:11,fontWeight:700,letterSpacing:1,textTransform:"uppercase",margin:"0 0 12px",fontFamily:"monospace"}}>O que você desbloqueia</p>
            <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:22}}>
              {features.map((f,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:11,padding:"9px 12px",background:C.s1,borderRadius:11,border:"1px solid "+C.border}}>
                  <div style={{width:30,height:30,borderRadius:8,background:"linear-gradient(135deg,"+C.violet+"33,"+C.cyan+"22)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <Ic n={f.icon} z={15} c={C.violetB}/>
                  </div>
                  <p style={{color:C.tp,fontSize:13,margin:0,lineHeight:1.4}}>{f.text}</p>
                  <Ic n="check" z={14} c={C.green} st={{flexShrink:0,marginLeft:"auto"}}/>
                </div>
              ))}
            </div>

            {/* Plan selector */}
            {!isPro && (<>
              <p style={{color:C.ts,fontSize:11,fontWeight:700,letterSpacing:1,textTransform:"uppercase",margin:"0 0 10px",fontFamily:"monospace"}}>Escolha seu plano</p>
              <div style={{display:"flex",gap:8,marginBottom:16}}>
                {Object.entries(PLANS).map(([k,v])=>(
                  <button key={k} onClick={()=>setSelectedPlan(k)}
                    style={{flex:1,background:selectedPlan===k?"linear-gradient(135deg,"+C.violet+"22,"+C.cyan+"11)":C.s1,border:"2px solid "+(selectedPlan===k?C.violet:C.border),borderRadius:13,padding:"14px 10px",cursor:"pointer",textAlign:"center",position:"relative",transition:"all 0.15s"}}>
                    {v.save&&<div style={{position:"absolute",top:-9,left:"50%",transform:"translateX(-50%)",background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",borderRadius:10,padding:"2px 8px",whiteSpace:"nowrap"}}>
                      <span style={{color:"#fff",fontSize:9,fontWeight:700}}>{v.save}</span>
                    </div>}
                    <p style={{color:selectedPlan===k?C.tp:C.tm,fontWeight:700,fontSize:13,margin:"0 0 4px",fontFamily:"'Space Grotesk',sans-serif"}}>{v.label}</p>
                    <p style={{color:selectedPlan===k?C.cyanB:C.ts,fontWeight:800,fontSize:18,margin:"0 0 2px",fontFamily:"'Space Grotesk',sans-serif",letterSpacing:-0.5}}>{v.priceR}</p>
                    <p style={{color:C.td,fontSize:10,margin:0}}>{v.priceE} {v.period}</p>
                  </button>
                ))}
              </div>

              {proError && <p style={{color:C.coral,fontSize:12,textAlign:"center",margin:"0 0 12px"}}>{proError}</p>}

              <button onClick={handleCheckout} disabled={proLoading}
                style={{width:"100%",background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",color:"#fff",border:"none",borderRadius:14,padding:"16px 0",fontWeight:800,fontSize:16,cursor:proLoading?"default":"pointer",fontFamily:"'Space Grotesk',sans-serif",boxShadow:"0 6px 24px "+C.violet+"55",opacity:proLoading?0.7:1,marginBottom:10}}>
                {proLoading ? "Redirecionando..." : "Assinar Pro →"}
              </button>
              <p style={{color:C.td,fontSize:11,textAlign:"center",margin:0,lineHeight:1.6}}>
                Cancele a qualquer momento · Pagamento seguro via Stripe
              </p>
            </>)}
          </div>
        </div>
      </div>
    );
  }


  // ── ONBOARDING ────────────────────────────────────────────────────────────────
  function renderOnboarding() {
    const objetivos = [
      { id:"5k",      emoji:"🏃", label:"Correr 5km",        desc:"Começar ou retomar" },
      { id:"10k",     emoji:"🎯", label:"Correr 10km",       desc:"Evoluir a distância" },
      { id:"meia",    emoji:"⚡", label:"Meia maratona",     desc:"21km é o desafio" },
      { id:"maratona",emoji:"🏆", label:"Maratona",          desc:"42km, o sonho grande" },
      { id:"saude",   emoji:"❤️", label:"Saúde e bem-estar", desc:"Correr para viver melhor" },
      { id:"perda",   emoji:"🔥", label:"Perda de peso",     desc:"Correr para emagrecer" },
    ];
    const niveis = [
      { id:"iniciante",    emoji:"🌱", label:"Iniciante",     desc:"Nunca corri ou voltando do zero" },
      { id:"intermediario",emoji:"💪", label:"Intermediário", desc:"Corro há algum tempo, regularmente" },
      { id:"avancado",     emoji:"🚀", label:"Avançado",      desc:"Corro com consistência e volume" },
    ];

    const nomeVal = onboardingData.nome !== undefined ? onboardingData.nome : (dadosForm.nome || "");
    const podeContinuar = nomeVal.trim().length >= 2 && onboardingData.objetivos?.length > 0 && !!onboardingData.nivel;

    function toggleObjetivo(id) {
      setOnboardingData(p => {
        const atual = p.objetivos || [];
        const jatem = atual.includes(id);
        return {...p, objetivos: jatem ? atual.filter(x=>x!==id) : [...atual, id]};
      });
    }

    function finish() {
      try { localStorage.setItem("tr_onboarding_done","1"); } catch {}
      setDadosForm(p=>({...p,
        nome: nomeVal.trim() || p.nome,
        objetivo: onboardingData.objetivos?.[0] || p.objetivo,
        nivel: onboardingData.nivel || p.nivel,
      }));
      setShowOnboarding(false);
    }

    return (
      <div style={{position:"fixed",inset:0,zIndex:400,background:C.bg,display:"flex",flexDirection:"column",maxWidth:430,margin:"0 auto",overflowY:"auto",animation:"obFadeIn 0.5s ease both"}}>
        <style>{`
          @keyframes obFadeIn { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
          @keyframes obSlideUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
          .ob-s1{animation:obSlideUp 0.4s ease 0.05s both}
          .ob-s2{animation:obSlideUp 0.4s ease 0.12s both}
          .ob-s3{animation:obSlideUp 0.4s ease 0.2s both}
          .ob-s4{animation:obSlideUp 0.4s ease 0.28s both}
          .ob-s5{animation:obSlideUp 0.4s ease 0.36s both}
        `}</style>

        <div style={{padding:"48px 22px 32px",display:"flex",flexDirection:"column",gap:28}}>
          <div className="ob-s1" style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:42,height:42,borderRadius:13,background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 20px "+C.violet+"55",flexShrink:0}}>
              <img src={iconCircle} alt="TempoRun" style={{width:28,height:28,objectFit:"contain"}}/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:2}}>
              <img src={tempoRunLogo} alt="TempoRun" style={{width:120,height:"auto",objectFit:"contain",display:"block"}}/>
              <p style={{color:C.tm,fontSize:11,margin:0,fontFamily:"monospace",letterSpacing:0.5}}>SEU COACH COM IA</p>
            </div>
          </div>

          <div className="ob-s2">
            <h1 style={{color:C.tp,fontFamily:"'Space Grotesk',sans-serif",fontSize:26,fontWeight:800,margin:"0 0 6px",letterSpacing:-0.5,lineHeight:1.2}}>
              Vamos configurar<br/>seu perfil 👋
            </h1>
            <p style={{color:C.tm,fontSize:14,margin:0,lineHeight:1.6}}>Leva menos de 1 minuto.</p>
          </div>

          <div className="ob-s3">
            <p style={{color:C.ts,fontSize:11,fontWeight:700,letterSpacing:0.8,textTransform:"uppercase",fontFamily:"monospace",margin:"0 0 8px"}}>Como quer ser chamado?</p>
            <input
              value={nomeVal}
              onChange={e=>setOnboardingData(p=>({...p,nome:e.target.value}))}
              placeholder="Seu primeiro nome"
              autoFocus
              style={{width:"100%",background:C.s2,border:"1.5px solid "+(nomeVal.trim().length>=2?C.violet:C.border),borderRadius:13,padding:"13px 15px",color:C.tp,fontSize:16,outline:"none",fontFamily:"'Space Grotesk',sans-serif",fontWeight:600,transition:"border-color 0.2s",boxSizing:"border-box"}}
            />
          </div>

          <div className="ob-s4">
            <p style={{color:C.ts,fontSize:11,fontWeight:700,letterSpacing:0.8,textTransform:"uppercase",fontFamily:"monospace",margin:"0 0 10px"}}>
              Seus objetivos
              <span style={{color:C.td,fontWeight:500,textTransform:"none",fontSize:11,letterSpacing:0,marginLeft:8}}>pode escolher mais de um</span>
            </p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9}}>
              {objetivos.map(o=>{
                const sel = onboardingData.objetivos?.includes(o.id);
                return (
                  <button key={o.id} onClick={()=>toggleObjetivo(o.id)}
                    style={{background:sel?"linear-gradient(135deg,"+C.violet+"22,"+C.cyan+"11)":C.s1,border:"2px solid "+(sel?C.violet:C.border),borderRadius:13,padding:"13px 10px",cursor:"pointer",textAlign:"left",transition:"all 0.15s",position:"relative"}}>
                    {sel&&<div style={{position:"absolute",top:8,right:8,width:16,height:16,borderRadius:8,background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <Ic n="check" z={9} c="#fff"/>
                    </div>}
                    <span style={{fontSize:22,display:"block",marginBottom:5}}>{o.emoji}</span>
                    <p style={{color:sel?C.tp:C.ts,fontWeight:700,fontSize:12,margin:"0 0 2px",fontFamily:"'Space Grotesk',sans-serif",lineHeight:1.3}}>{o.label}</p>
                    <p style={{color:C.td,fontSize:10,margin:0,lineHeight:1.3}}>{o.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="ob-s5">
            <p style={{color:C.ts,fontSize:11,fontWeight:700,letterSpacing:0.8,textTransform:"uppercase",fontFamily:"monospace",margin:"0 0 10px"}}>Nível atual</p>
            <div style={{display:"flex",flexDirection:"column",gap:9}}>
              {niveis.map(n=>{
                const sel = onboardingData.nivel===n.id;
                return (
                  <button key={n.id} onClick={()=>setOnboardingData(p=>({...p,nivel:n.id}))}
                    style={{background:sel?"linear-gradient(135deg,"+C.violet+"22,"+C.cyan+"11)":C.s1,border:"2px solid "+(sel?C.violet:C.border),borderRadius:14,padding:"14px 15px",cursor:"pointer",display:"flex",alignItems:"center",gap:13,textAlign:"left",transition:"all 0.15s"}}>
                    <span style={{fontSize:28,flexShrink:0}}>{n.emoji}</span>
                    <div style={{flex:1}}>
                      <p style={{color:sel?C.tp:C.ts,fontWeight:700,fontSize:14,margin:"0 0 2px",fontFamily:"'Space Grotesk',sans-serif"}}>{n.label}</p>
                      <p style={{color:C.tm,fontSize:12,margin:0}}>{n.desc}</p>
                    </div>
                    {sel&&<div style={{width:20,height:20,borderRadius:10,background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic n="check" z={11} c="#fff"/></div>}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{paddingBottom:16}}>
            <button onClick={()=>{ if(podeContinuar) finish(); }} disabled={!podeContinuar}
              style={{width:"100%",background:podeContinuar?"linear-gradient(135deg,"+C.violet+","+C.cyan+")":"#1e2456",color:"#fff",border:"none",borderRadius:15,padding:"17px 0",fontWeight:800,fontSize:16,cursor:podeContinuar?"pointer":"default",fontFamily:"'Space Grotesk',sans-serif",opacity:podeContinuar?1:0.45,transition:"all 0.25s",boxShadow:podeContinuar?"0 8px 28px "+C.violet+"55":"none",letterSpacing:0.3}}>
              🚀 Começar a treinar
            </button>
            <button onClick={()=>{try{localStorage.setItem("tr_onboarding_done","1");}catch{}setShowOnboarding(false);}}
              style={{background:"none",border:"none",color:C.td,fontSize:12,cursor:"pointer",fontFamily:"inherit",marginTop:12,padding:"8px 0",width:"100%"}}>
              Pular por agora
            </button>
          </div>
        </div>
      </div>
    );
  }


  // ── UPGRADE MODAL ────────────────────────────────────────────────────────────
  function renderUpgradeModal() {
    const usage = getAiUsage();
    return (
      <div style={{position:"fixed",inset:0,background:"#00000088",zIndex:500,display:"flex",alignItems:"flex-end",justifyContent:"center",maxWidth:430,margin:"0 auto"}} onClick={()=>setShowUpgradeModal(false)}>
        <div onClick={e=>e.stopPropagation()} style={{background:C.bg,borderRadius:"20px 20px 0 0",border:"1px solid "+C.violet+"44",padding:"24px 20px 36px",width:"100%"}}>
          <div style={{display:"flex",justifyContent:"center",marginBottom:16}}>
            <div style={{width:40,height:4,borderRadius:2,background:C.border}}/>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
            <div style={{width:44,height:44,borderRadius:22,background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <Ic n="ai" z={22} c="#fff"/>
            </div>
            <div>
              <p style={{color:C.tp,fontWeight:700,fontSize:16,margin:0,fontFamily:"'Space Grotesk',sans-serif"}}>Limite diário atingido</p>
              <p style={{color:C.tm,fontSize:12,margin:0}}>{upgradeReason}Assine o Pro para uso ilimitado.</p>
            </div>
          </div>

          <div style={{background:C.s1,borderRadius:13,border:"1px solid "+C.border,padding:"12px 14px",marginBottom:16}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
              <p style={{color:C.ts,fontSize:11,fontWeight:700,letterSpacing:0.5,textTransform:"uppercase",fontFamily:"monospace",margin:0}}>Uso hoje</p>
            </div>
            {[
              {label:"Coach IA", key:"coach", limit:AI_LIMITS.coach, icon:"ai"},
              {label:"Saber", key:"saber", limit:AI_LIMITS.saber, icon:"book"},
              {label:"Planos", key:"plano", limit:AI_LIMITS.plano, icon:"run"},
            ].map(item=>{
              const used = usage[item.key]||0;
              const pct = Math.min(100, (used/item.limit)*100);
              return (
                <div key={item.key} style={{marginBottom:8}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                    <span style={{color:C.ts,fontSize:12}}>{item.label}</span>
                    <span style={{color:used>=item.limit?C.coral:C.tm,fontSize:12,fontWeight:600}}>{used}/{item.limit}</span>
                  </div>
                  <div style={{height:4,background:C.s2,borderRadius:2,overflow:"hidden"}}>
                    <div style={{width:pct+"%",height:"100%",background:used>=item.limit?"linear-gradient(90deg,"+C.coral+",#ef4444)":"linear-gradient(90deg,"+C.violet+","+C.cyan+")",borderRadius:2,transition:"width 0.3s"}}/>
                  </div>
                </div>
              );
            })}
          </div>

          <button onClick={()=>{setShowUpgradeModal(false);setShowProModal(true);}}
            style={{width:"100%",background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",color:"#fff",border:"none",borderRadius:14,padding:"15px 0",fontWeight:800,fontSize:15,cursor:"pointer",fontFamily:"'Space Grotesk',sans-serif",boxShadow:"0 6px 20px "+C.violet+"44",marginBottom:10}}>
            🚀 Assinar Pro — Ilimitado
          </button>
          <button onClick={()=>setShowUpgradeModal(false)}
            style={{width:"100%",background:"none",border:"none",color:C.td,fontSize:13,cursor:"pointer",fontFamily:"inherit",padding:"8px 0"}}>
            Continuar com plano gratuito
          </button>
        </div>
      </div>
    );
  }


  // ── ADD TREINO MODAL ─────────────────────────────────────────────────────────
  function renderAddTreinoModal() {
    const tipo = TIPOS_TREINO.find(t=>t.id===addTipo);
    const subs = addTipo ? SUBTREINOS[addTipo]||[] : [];

    function confirmar() {
      if(addTreinoDia===null) return;
      const sub = subs.find(s=>s.id===addSubtipo);
      const novoTreino = {
        tipo: sub ? sub.label : (tipo?.label||"Treino"),
        distancia_km: addModo==="dist" ? addDistancia : 0,
        duracao_min: addModo==="duracao" ? addDuracao : null,
        pace_alvo: "",
        descricao: sub ? sub.desc : "",
        alerta_lesao: "",
        customizado: true,
      };
      // Editar planResult (plano sendo criado) ou savedPlan (plano salvo)
      if(planResult?.plano){
        const novosPlano = [...planResult.plano];
        novosPlano[addTreinoDia] = {...novosPlano[addTreinoDia], ...novoTreino};
        setPlanResult({...planResult, plano:novosPlano});
      } else if(savedPlan?.plano){
        const novosPlano = [...savedPlan.plano];
        novosPlano[addTreinoDia] = {...novosPlano[addTreinoDia], ...novoTreino};
        const updated = {...savedPlan, plano:novosPlano};
        setSavedPlan(updated);
        try{localStorage.setItem("tr_saved_plan",JSON.stringify(updated));}catch{}
      }
      setShowAddTreino(false);
      setAddStep("tipo"); setAddTipo(null); setAddSubtipo(null);
    }

    return (
      <div style={{position:"fixed",inset:0,background:"#00000088",zIndex:500,display:"flex",alignItems:"flex-end",justifyContent:"center",maxWidth:430,margin:"0 auto"}} onClick={()=>{setShowAddTreino(false);setAddStep("tipo");setAddTipo(null);}}>
        <div onClick={e=>e.stopPropagation()} style={{background:C.bg,borderRadius:"20px 20px 0 0",border:"1px solid "+C.border,width:"100%",maxHeight:"85vh",overflowY:"auto",paddingBottom:24}}>
          {/* Handle */}
          <div style={{display:"flex",justifyContent:"center",padding:"12px 0 4px"}}>
            <div style={{width:36,height:4,borderRadius:2,background:C.border}}/>
          </div>

          {/* Step 1 — Escolher tipo */}
          {addStep==="tipo"&&(
            <div style={{padding:"0 16px"}}>
              <p style={{color:C.tp,fontWeight:800,fontSize:17,margin:"4px 0 4px",fontFamily:"'Space Grotesk',sans-serif"}}>Escolher treino</p>
              <p style={{color:C.tm,fontSize:12,margin:"0 0 16px"}}>
                {addTreinoDia!==null&&planResult?.plano[addTreinoDia]?.dia ? planResult.plano[addTreinoDia].dia : ""}
              </p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                {TIPOS_TREINO.map(t=>(
                  <button key={t.id} onClick={()=>{setAddTipo(t.id);setAddStep(t.id==="descanso"?"config":"subtipo");setAddSubtipo(null);}}
                    style={{background:C.s1,border:"2px solid "+C.border,borderRadius:14,padding:"14px 12px",cursor:"pointer",textAlign:"left",transition:"all 0.15s"}}>
                    <span style={{fontSize:26,display:"block",marginBottom:6}}>{t.emoji}</span>
                    <p style={{color:C.tp,fontWeight:700,fontSize:13,margin:"0 0 3px",fontFamily:"'Space Grotesk',sans-serif"}}>{t.label}</p>
                    <p style={{color:C.td,fontSize:11,margin:0,lineHeight:1.3}}>{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 — Escolher subtipo */}
          {addStep==="subtipo"&&tipo&&(
            <div style={{padding:"0 16px"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
                <button onClick={()=>{setAddStep("tipo");setAddTipo(null);}} style={{background:C.s2,border:"1px solid "+C.border,borderRadius:9,padding:"6px 10px",cursor:"pointer",display:"flex",alignItems:"center",gap:4}}>
                  <Ic n="back" z={12} c={C.ts}/>
                </button>
                <div>
                  <p style={{color:C.tp,fontWeight:800,fontSize:16,margin:0,fontFamily:"'Space Grotesk',sans-serif"}}>{tipo.emoji} {tipo.label}</p>
                </div>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {subs.map(s=>(
                  <button key={s.id} onClick={()=>{setAddSubtipo(s.id);setAddStep("config");}}
                    style={{background:addSubtipo===s.id?C.violet+"22":C.s1,border:"1.5px solid "+(addSubtipo===s.id?C.violet:C.border),borderRadius:13,padding:"13px 14px",cursor:"pointer",textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div>
                      <p style={{color:C.tp,fontWeight:700,fontSize:14,margin:"0 0 3px",fontFamily:"'Space Grotesk',sans-serif"}}>{s.label}</p>
                      <p style={{color:C.tm,fontSize:12,margin:0}}>{s.desc}</p>
                    </div>
                    <Ic n="chevron-right" z={16} c={C.td}/>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3 — Config distância/duração */}
          {addStep==="config"&&(
            <div style={{padding:"0 16px"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
                <button onClick={()=>setAddStep(addTipo==="descanso"?"tipo":"subtipo")} style={{background:C.s2,border:"1px solid "+C.border,borderRadius:9,padding:"6px 10px",cursor:"pointer",display:"flex",alignItems:"center",gap:4}}>
                  <Ic n="back" z={12} c={C.ts}/>
                </button>
                <p style={{color:C.tp,fontWeight:800,fontSize:16,margin:0,fontFamily:"'Space Grotesk',sans-serif"}}>
                  {tipo?.emoji} {subs.find(s=>s.id===addSubtipo)?.label || tipo?.label}
                </p>
              </div>

              {addTipo!=="descanso"&&(
                <>
                  {/* Toggle dist/duração */}
                  <div style={{display:"flex",background:C.s2,borderRadius:10,padding:3,marginBottom:16}}>
                    {[{id:"dist",l:"Distância"},{id:"duracao",l:"Duração"}].map(m=>(
                      <button key={m.id} onClick={()=>setAddModo(m.id)} style={{flex:1,background:addModo===m.id?"linear-gradient(135deg,"+C.violet+"55,"+C.cyan+"22)":"transparent",color:addModo===m.id?C.tp:C.tm,border:"none",borderRadius:8,padding:"7px 0",fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>{m.l}</button>
                    ))}
                  </div>

                  {addModo==="dist"&&(
                    <div style={{marginBottom:16}}>
                      <p style={{color:C.tm,fontSize:12,margin:"0 0 8px"}}>Distância</p>
                      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
                        <button onClick={()=>setAddDistancia(d=>Math.max(1,d-1))} style={{width:36,height:36,borderRadius:18,background:C.s2,border:"1px solid "+C.border,color:C.tp,fontSize:20,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                        <p style={{color:C.tp,fontWeight:800,fontSize:32,margin:0,fontFamily:"'Space Grotesk',sans-serif",flex:1,textAlign:"center"}}>{addDistancia}<span style={{fontSize:16,color:C.tm}}> km</span></p>
                        <button onClick={()=>setAddDistancia(d=>Math.min(42,d+1))} style={{width:36,height:36,borderRadius:18,background:C.s2,border:"1px solid "+C.border,color:C.tp,fontSize:20,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                      </div>
                      <div style={{display:"flex",gap:8}}>
                        {[3,5,8,10,15,21].map(d=>(
                          <button key={d} onClick={()=>setAddDistancia(d)} style={{flex:1,background:addDistancia===d?"linear-gradient(135deg,"+C.violet+","+C.cyan+")":C.s2,color:addDistancia===d?"#fff":C.tm,border:"1px solid "+(addDistancia===d?C.violet:C.border),borderRadius:8,padding:"6px 0",fontWeight:700,fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>{d}k</button>
                        ))}
                      </div>
                    </div>
                  )}

                  {addModo==="duracao"&&(
                    <div style={{marginBottom:16}}>
                      <p style={{color:C.tm,fontSize:12,margin:"0 0 8px"}}>Duração</p>
                      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
                        <button onClick={()=>setAddDuracao(d=>Math.max(10,d-5))} style={{width:36,height:36,borderRadius:18,background:C.s2,border:"1px solid "+C.border,color:C.tp,fontSize:20,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                        <p style={{color:C.tp,fontWeight:800,fontSize:32,margin:0,fontFamily:"'Space Grotesk',sans-serif",flex:1,textAlign:"center"}}>{addDuracao}<span style={{fontSize:16,color:C.tm}}> min</span></p>
                        <button onClick={()=>setAddDuracao(d=>Math.min(180,d+5))} style={{width:36,height:36,borderRadius:18,background:C.s2,border:"1px solid "+C.border,color:C.tp,fontSize:20,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                      </div>
                      <div style={{display:"flex",gap:8}}>
                        {[20,30,45,60,90].map(d=>(
                          <button key={d} onClick={()=>setAddDuracao(d)} style={{flex:1,background:addDuracao===d?"linear-gradient(135deg,"+C.violet+","+C.cyan+")":C.s2,color:addDuracao===d?"#fff":C.tm,border:"1px solid "+(addDuracao===d?C.violet:C.border),borderRadius:8,padding:"6px 0",fontWeight:700,fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>{d}'</button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {addTipo==="descanso"&&(
                <div style={{background:C.s2,borderRadius:12,padding:"14px 16px",marginBottom:16,textAlign:"center"}}>
                  <span style={{fontSize:40}}>😴</span>
                  <p style={{color:C.tp,fontWeight:700,fontSize:15,margin:"8px 0 4px"}}>Dia de descanso</p>
                  <p style={{color:C.tm,fontSize:13,margin:0}}>{subs.find(s=>s.id===addSubtipo)?.desc||"Recuperação total"}</p>
                </div>
              )}

              <button onClick={confirmar}
                style={{width:"100%",background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",color:"#fff",border:"none",borderRadius:14,padding:"15px 0",fontWeight:800,fontSize:15,cursor:"pointer",fontFamily:"'Space Grotesk',sans-serif",boxShadow:"0 6px 20px "+C.violet+"44"}}>
                ✓ Adicionar ao plano
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── HOME ─────────────────────────────────────────────────────────────────────
  function renderHome() {
    return (
      <div>
        {novoRP&&(
          <div style={{background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",borderRadius:12,padding:"10px 14px",marginBottom:12,display:"flex",alignItems:"center",gap:10,boxShadow:"0 4px 24px "+C.violet+"55"}}>
            <Ic n="trophy" z={22} c="#fff"/>
            <div><p style={{color:"#fff",fontWeight:800,fontSize:14,margin:0,fontFamily:"'Space Grotesk',sans-serif"}}>Novo Recorde!</p><p style={{color:"#ffffffcc",fontSize:12,margin:0}}>{novoRP.dist} em {novoRP.tempo}{novoRP.melhora?" · ↓"+novoRP.melhora:""}</p></div>
          </div>
        )}

        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:8,paddingBottom:12}}>
          <div style={{textAlign:"left"}}>
            <p style={{color:C.tm,fontSize:13,margin:0}}>Bom dia 🌤</p>
            <h1 style={{color:C.tp,margin:"1px 0 0",fontFamily:"'Space Grotesk',sans-serif",fontSize:22,fontWeight:700}}>{dadosForm.nome?dadosForm.nome.split(" ")[0]:session?.strava_athlete?.firstname||session?.email?.split("@")[0]||"Corredor"} {dadosForm.sexo==="Feminino"?"🏃‍♀️":dadosForm.sexo==="Masculino"?"🏃‍♂️":"👋"}</h1>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <button onClick={()=>{setShowSaber(!showSaber);setShowPerfil(false);}} style={{background:showSaber?"linear-gradient(135deg,"+C.violet+","+C.cyan+")":"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"4px",borderRadius:13}}>
              <div style={{width:44,height:44,borderRadius:22,background:showSaber?"linear-gradient(135deg,"+C.violet+","+C.cyan+")":C.s2,display:"flex",alignItems:"center",justifyContent:"center",border:"2px solid "+(showSaber?C.cyanB+"88":C.border),boxShadow:showSaber?"0 0 14px "+C.violet+"66":"none"}}>
                <Ic n="science" z={20} c={showSaber?"#fff":C.ts}/>
              </div>
              <span style={{color:showSaber?C.cyanB:C.td,fontSize:8,fontWeight:700,fontFamily:"monospace",textTransform:"uppercase",letterSpacing:0.3}}>Saber</span>
            </button>
            <button onClick={()=>{setShowPerfil(!showPerfil);setShowSaber(false);}} style={{background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"4px"}}>
              <div style={{position:"relative"}}>
                <div style={{width:44,height:44,borderRadius:22,background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",display:"flex",alignItems:"center",justifyContent:"center",border:"2px solid "+(showPerfil?C.cyanB+"88":C.violet+"44"),boxShadow:isPro?"0 0 12px "+C.violet+"55":showPerfil?"0 0 14px "+C.violet+"66":"none",overflow:"hidden"}}><img src={dadosForm.foto||perfilImg} alt="perfil" style={{width:"100%",height:"100%",objectFit:dadosForm.foto?"cover":"contain"}}/></div>
                {isPro&&<div style={{position:"absolute",bottom:-2,right:-2,background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",borderRadius:7,padding:"2px 5px",border:"1.5px solid "+C.bg,boxShadow:"0 0 8px "+C.violet+"66"}}><span style={{color:"#fff",fontSize:7,fontWeight:800,letterSpacing:0.5}}>PRO</span></div>}
              </div>
              <span style={{color:showPerfil?C.cyanB:C.td,fontSize:8,fontWeight:700,fontFamily:"monospace",textTransform:"uppercase",letterSpacing:0.3}}>Perfil</span>
            </button>
          </div>
        </div>

        {showSaber&&(
          <div style={{position:"fixed",inset:0,background:C.bg,zIndex:150,display:"flex",flexDirection:"column",maxWidth:430,margin:"0 auto"}}>
            <div style={{background:C.s1,borderBottom:"1px solid "+C.border,padding:"14px 16px",display:"flex",alignItems:"center",gap:12,flexShrink:0}}>
              <button onClick={()=>setShowSaber(false)} style={{background:C.s2,border:"1px solid "+C.border,borderRadius:9,padding:"6px 10px",cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
                <Ic n="back" z={13} c={C.ts}/><span style={{color:C.ts,fontSize:12}}>Voltar</span>
              </button>
              <div style={{flex:1,display:"flex",background:C.s3,borderRadius:10,padding:3}}>
                {[{id:"explorar",l:"Explorar"},{id:"perguntar",l:"Perguntar à IA"}].map(t=>(
                  <button key={t.id} onClick={()=>setSaberTab(t.id)} style={{flex:1,background:saberTab===t.id?"linear-gradient(135deg,"+C.violet+"55,"+C.cyan+"22)":"transparent",color:saberTab===t.id?C.tp:C.tm,border:"none",borderRadius:8,padding:"7px 0",fontWeight:700,fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>{t.l}</button>
                ))}
              </div>
            </div>
            <div style={{flex:1,overflow:"hidden",display:"flex",flexDirection:"column",padding:"14px 16px 0"}}>
            {saberTab==="explorar"&&(
              <div style={{flex:1,overflowY:"auto",paddingBottom:24}}>
                <div style={{background:"linear-gradient(135deg,#0c0830,#0a1430)",border:"1px solid "+C.violet+"33",borderRadius:12,padding:12,marginBottom:10}}>
                  <p style={{color:C.cyanB,fontFamily:"monospace",fontSize:9,fontWeight:700,letterSpacing:0.5,textTransform:"uppercase",margin:"0 0 5px"}}>curiosidade do dia</p>
                  <p style={{color:C.tp,fontWeight:700,fontSize:13,margin:"0 0 6px",lineHeight:1.4}}>Corredores com cadência acima de 170 spm têm 30% menos risco de lesão no joelho</p>
                  <button onClick={()=>sendSaber("Explique sobre cadência e como aumentar a minha")} style={{background:C.violet+"22",color:C.violetL,border:"1px solid "+C.violet+"44",borderRadius:7,padding:"5px 11px",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Saber mais →</button>
                </div>
                <div style={{background:"linear-gradient(135deg,#1a0e00,#1e1500)",border:"1px solid "+C.amber+"55",borderRadius:12,padding:12,marginBottom:10}}>
                  <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:7}}>
                    <div style={{width:24,height:24,borderRadius:7,background:C.amber+"22",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic n="warning" z={13} c={C.amber}/></div>
                    <p style={{color:C.amber,fontFamily:"monospace",fontSize:9,fontWeight:700,margin:0,textTransform:"uppercase",letterSpacing:0.5}}>Caneta Emagrecedora & Corrida</p>
                  </div>
                  <p style={{color:C.tp,fontWeight:700,fontSize:12,margin:"0 0 5px",lineHeight:1.4}}>Ozempic, Wegovy e Mounjaro afetam diretamente o desempenho na corrida</p>
                  <p style={{color:C.ts,fontSize:11,margin:"0 0 8px",lineHeight:1.5}}>Estudos mostram redução de 16–39% na ingestão calórica, perda de 25–40% de massa muscular e risco aumentado de fadiga precoce.</p>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    {["GLP-1 afeta meu desempenho?","Como treinar com Ozempic?","Perco músculo usando GLP-1?"].map((q,i)=>(
                      <button key={i} onClick={()=>sendSaber(q)} style={{background:C.amber+"18",color:C.amber,border:"1px solid "+C.amber+"44",borderRadius:7,padding:"4px 9px",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>{q}</button>
                    ))}
                  </div>
                </div>
                {saberTopicos.map((t,i)=>(
                  <div key={i} style={{marginBottom:9}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}><div style={{width:22,height:22,borderRadius:6,background:t.cor+"22",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic n={t.icon} z={12} c={t.cor}/></div><p style={{color:t.cor,fontFamily:"monospace",fontSize:9,fontWeight:700,margin:0,textTransform:"uppercase",letterSpacing:0.5}}>{t.cat}</p></div>
                    {t.qs.map((q,j)=>(
                      <button key={j} onClick={()=>sendSaber(q)} style={{width:"100%",background:C.s3,border:"1px solid "+t.cor+"22",borderRadius:9,padding:"8px 11px",color:C.ts,fontSize:12,textAlign:"left",cursor:"pointer",fontFamily:"inherit",marginBottom:4,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <span>{q}</span><span style={{color:t.cor,fontSize:14,flexShrink:0}}>›</span>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
            {saberTab==="perguntar"&&(
              <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
                {!saberMsgs.length&&(
                  <div style={{textAlign:"center",padding:"20px 0 14px"}}>
                    <p style={{color:C.tp,fontWeight:700,fontSize:14,margin:"0 0 4px"}}>Pergunte sobre sua corrida</p>
                    <p style={{color:C.td,fontSize:12,margin:"0 0 10px"}}>Biomecânica, nutrição, recuperação, lesões...</p>
                    {(dadosForm.peso||dadosForm.nome||corridas.length>0)&&(
                      <div style={{display:"inline-flex",alignItems:"center",gap:6,background:C.s2,border:"1px solid "+C.violet+"33",borderRadius:20,padding:"5px 12px",marginBottom:4}}>
                        <div style={{width:6,height:6,borderRadius:3,background:C.violetL,flexShrink:0}}/>
                        <p style={{color:C.tm,fontSize:11,margin:0,lineHeight:1.4}}>
                          Respostas baseadas no seu perfil
                          {dadosForm.peso?` · ${dadosForm.peso}kg`:""}
                          {corridas.length>0?` · ${corridas.length} corridas`:""}
                          {corridas.length>0&&corridas[0]?.pace_medio?` · pace ${corridas[0].pace_medio}`:""}
                        </p>
                      </div>
                    )}
                  </div>
                )}
                <div style={{flex:1,overflowY:"auto",marginBottom:8}}>{saberMsgs.map((m,i)=><Bubble key={i} m={m}/>)}{saberLoad&&<Dots color={C.cyan}/>}</div>
                <div style={{display:"flex",gap:7,paddingBottom:"max(20px, env(safe-area-inset-bottom, 20px))",paddingTop:4,paddingLeft:2,paddingRight:2,background:C.bg,flexShrink:0}}>
                  <input value={saberIn} onChange={e=>setSaberIn(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendSaber()} placeholder={isPro?"Sua pergunta...":`Pergunta... (${Math.max(0,AI_LIMITS.saber-(getAiUsage().saber||0))} restantes)`} style={{flex:1,background:C.s3,border:"1px solid "+C.border,borderRadius:12,padding:"11px 13px",color:C.tp,fontSize:13,outline:"none",fontFamily:"inherit"}}/>
                  <button onClick={()=>sendSaber()} disabled={!saberIn.trim()||saberLoad} style={{background:saberIn.trim()&&!saberLoad?"linear-gradient(135deg,"+C.violet+","+C.cyan+")":C.s3,color:"#fff",border:"none",borderRadius:12,width:44,height:44,cursor:saberIn.trim()&&!saberLoad?"pointer":"default",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,opacity:saberIn.trim()&&!saberLoad?1:0.4,transition:"all 0.2s"}}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              </div>
            )}
          </div>
          </div>
        )}

        {showPerfil&&(
          <div style={{background:"linear-gradient(135deg,"+C.s1+","+C.s2+")",borderRadius:18,padding:14,marginBottom:14,border:"1px solid "+C.violet+"44",animation:"fadeIn 0.2s ease",display:"flex",flexDirection:"column",gap:6}}>
            {[
              {id:"config", nome:"Configurações", desc:"Notificações, tema, corrida, conta",  icon:"settings", cor:C.cyanB},
              {id:"dados",  nome:"Dados pessoais", desc:"Perfil, equipamentos, cidade", icon:"profile",  cor:C.violetL},
              {id:"logout", nome:"Logout", desc:"Sair da conta",                icon:"back",     cor:C.coral},
            ].map(opt=>(
              <button key={opt.id} onClick={()=>{
                if(opt.id==="logout"){sb.signOut(session?.access_token);clearSession();try{localStorage.removeItem("tr_onboarding_done");}catch{}setSession(null);setShowPerfil(false);setShowOnboarding(true);setOnboardingStep(0);setTab("home");}
                if(opt.id==="dados"){setShowPerfil(false);setShowDadosModal(true);}
                if(opt.id==="config"){setShowPerfil(false);setShowConfigModal(true);}
              }} style={{background:C.s3,border:"1px solid "+opt.cor+"22",borderRadius:11,padding:"10px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:11,textAlign:"left",fontFamily:"inherit"}}>
                <div style={{width:32,height:32,borderRadius:9,background:opt.cor+"22",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,border:"1px solid "+opt.cor+"33"}}>
                  {opt.id==="strava"
                    ? <svg width="16" height="16" viewBox="0 0 24 24" fill={opt.cor}><path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169"/></svg>
                    : <Ic n={opt.icon} z={16} c={opt.cor}/>}
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <p style={{color:C.tp,fontWeight:700,fontSize:13,margin:0,fontFamily:"'Space Grotesk',sans-serif"}}>{opt.nome}</p>
                  <p style={{color:C.tm,fontSize:11,margin:"2px 0 0"}}>{opt.desc}</p>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
                  <Ic n="back" z={13} c={opt.cor} st={{transform:"rotate(180deg)"}}/>
                </div>
              </button>
            ))}
          </div>
        )}

        {!showPerfil&&!showSaber&&(
          <div>
            {/* Card Strava — aparece uma vez, some ao conectar ou fechar */}
            {!stravaConnected && !stravaCardDismissed && (
              <div style={{background:"linear-gradient(135deg,#1a0800,#200e00)",border:"1px solid "+C.strava+"55",borderRadius:14,padding:"12px 14px",marginBottom:14,position:"relative"}}>
                <button onClick={()=>{setStravaCardDismissed(true);try{localStorage.setItem("strava_card_dismissed","1");}catch{}}} style={{position:"absolute",top:10,right:10,background:"none",border:"none",color:C.td,fontSize:16,cursor:"pointer",lineHeight:1,padding:4}}>×</button>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                  <div style={{width:34,height:34,borderRadius:10,background:C.strava+"22",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,border:"1px solid "+C.strava+"44"}}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill={C.strava}><path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169"/></svg>
                  </div>
                  <div style={{flex:1}}>
                    <p style={{color:C.tp,fontWeight:700,fontSize:13,margin:0,fontFamily:"'Space Grotesk',sans-serif"}}>Conecte seu Strava</p>
                    <p style={{color:C.tm,fontSize:11,margin:"2px 0 0"}}>Importe seus treinos automaticamente</p>
                  </div>
                </div>
                <button onClick={()=>sb.signInStrava()} style={{width:"100%",background:C.strava,color:"#fff",border:"none",borderRadius:10,padding:"10px 0",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"'Space Grotesk',sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169"/></svg>
                  Conectar com Strava
                </button>
              </div>
            )}

            <div style={{background:"linear-gradient(135deg,"+C.violet+"22,"+C.cyan+"11)",border:"1px solid "+C.violet+"33",borderRadius:14,padding:"12px 14px",marginBottom:14,position:"relative",overflow:"hidden"}}>
              <p style={{color:C.violetB,fontFamily:"monospace",fontSize:9,fontWeight:700,letterSpacing:1,textTransform:"uppercase",margin:"0 0 5px",opacity:0.8}}>motivação do dia</p>
              <p style={{color:C.tp,fontSize:14,fontWeight:600,margin:0,lineHeight:1.55,fontStyle:"italic"}}>"{frases[fraseIdx]}"</p>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginBottom:14}}>
              {[
                {v:corridas.length?(kmTotal+247).toFixed(0):"247",u:"km este mês",i:"run",c:C.cyanB,sub:corridas.length?"+"+kmTotal.toFixed(1)+"km":"11 corridas"},
                {v:"5:30/km",u:"pace médio",i:"watch",c:C.amber,sub:"últimas corridas"},
                {v:(98+corridas.length)+"",u:"atividades",i:"flame",c:C.violetL,sub:corridas.length?corridas.length+" este mês":"este ano"},
                {v:calcStreak()+"",u:"semanas ativo",i:"streak",c:C.cyan,sub:"sequência atual 🔥"},
              ].map((s,i)=>(
                <div key={i} style={{background:"linear-gradient(135deg,"+C.s1+","+C.s2+")",borderRadius:14,padding:"13px 12px",border:"1px solid "+s.c+"22",position:"relative",overflow:"hidden"}}>
                  <Ic n={s.i} z={17} c={s.c}/>
                  <p style={{color:s.c,fontFamily:"'Space Grotesk',sans-serif",fontWeight:800,fontSize:22,margin:"6px 0 2px",letterSpacing:-0.5}}>{s.v}</p>
                  <p style={{color:C.tp,fontWeight:600,fontSize:12,margin:"0 0 3px"}}>{s.u}</p>
                  <p style={{color:C.td,fontFamily:"monospace",fontSize:9,fontWeight:600,textTransform:"uppercase",letterSpacing:0.4,margin:0}}>{s.sub}</p>
                </div>
              ))}
            </div>

            <div style={{marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <SL><Ic n="trophy" z={13} c={C.ts}/>Recordes Pessoais</SL>
                <button onClick={()=>setTab("studio")} style={{background:"none",border:"none",color:C.violet,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>Ver todos →</button>
              </div>
              <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4}}>
                {rpsExib.map((r,i)=>(
                  <div key={i} style={{background:"linear-gradient(135deg,"+C.s1+","+C.s2+")",border:"1px solid "+r.cor+"33",borderRadius:13,padding:"11px 10px",flexShrink:0,minWidth:82,textAlign:"center"}}>
                    <p style={{color:r.cor,fontWeight:800,fontSize:11,margin:"0 0 3px"}}>{r.dist}</p>
                    <p style={{color:C.tp,fontWeight:800,fontSize:14,margin:"0 0 2px",fontFamily:"'Space Grotesk',sans-serif",letterSpacing:-0.5}}>{r.tempo}</p>
                    {r.melhora?<p style={{color:C.cyanB,fontSize:10,margin:"0 0 1px",fontWeight:700}}>↓{r.melhora}</p>:<p style={{color:C.td,fontSize:10,margin:"0 0 1px"}}>—</p>}
                    <p style={{color:C.tg,fontSize:9,margin:0,fontFamily:"monospace"}}>{r.data}</p>
                  </div>
                ))}
              </div>
            </div>

            <KmChart corridas={corridas} slice={chartSlice} setSlice={setChartSlice}/>


          </div>
        )}
      </div>
    );
  }
  // ── TREINO ───────────────────────────────────────────────────────────────────
  function renderTreino() {
    // Sub: Plano IA
    if(subScreen==="plano") return (
      <div>
        <div style={{paddingTop:8,paddingBottom:12,display:"flex",alignItems:"center",gap:10}}>
          <button onClick={()=>{if(planTipo){setPlanTipo(null);}else{setSubScreen(null);}}} style={{background:C.s2,border:"1px solid "+C.border,borderRadius:9,padding:"6px 11px",cursor:"pointer",display:"flex",alignItems:"center"}}><Ic n="back" z={13} c={C.ts}/></button>
          <h1 style={{color:C.tp,fontFamily:"'Space Grotesk',sans-serif",fontSize:20,margin:0}}>Plano IA personalizado</h1>
        </div>
        {planScreen==="form"&&(
          <div>
            <div style={{background:"linear-gradient(135deg,#0c0830,#0a1430)",border:"1px solid "+C.violet+"44",borderRadius:15,padding:13,marginBottom:14,display:"flex",gap:10,alignItems:"flex-start"}}>
              <Ic n="ai" z={26} c={C.cyanB}/>
              <div><p style={{color:C.cyanB,fontWeight:700,fontSize:13,margin:"0 0 4px",fontFamily:"'Space Grotesk',sans-serif"}}>Coach TEMPO</p><p style={{color:C.ts,fontSize:12,margin:0,lineHeight:1.6}}>Vamos montar um plano completo e personalizado para você.</p></div>
            </div>

            {/* Tipo de plano */}
            {!planTipo&&(
              <div>
                <p style={{color:C.ts,fontFamily:"monospace",fontSize:10,fontWeight:700,margin:"0 0 12px",textTransform:"uppercase",letterSpacing:0.5}}>Qual é o seu objetivo?</p>
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  <button onClick={()=>setPlanTipo("prova")} style={{background:C.s1,border:"1px solid "+C.border,borderRadius:14,padding:"16px 14px",cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:12}}>
                    <div style={{width:44,height:44,borderRadius:12,background:"linear-gradient(135deg,"+C.coral+"33,"+C.amber+"22)",border:"1px solid "+C.coral+"44",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <span style={{fontSize:22}}>🏁</span>
                    </div>
                    <div>
                      <p style={{color:C.tp,fontWeight:700,fontSize:15,margin:"0 0 3px",fontFamily:"'Space Grotesk',sans-serif"}}>Preparar para uma prova</p>
                      <p style={{color:C.tm,fontSize:12,margin:0}}>5k, 10k, meia maratona, maratona · com data definida</p>
                    </div>
                  </button>
                  <button onClick={()=>setPlanTipo("objetivo")} style={{background:C.s1,border:"1px solid "+C.border,borderRadius:14,padding:"16px 14px",cursor:"pointer",textAlign:"left",display:"flex",alignItems:"center",gap:12}}>
                    <div style={{width:44,height:44,borderRadius:12,background:"linear-gradient(135deg,"+C.violet+"33,"+C.cyan+"22)",border:"1px solid "+C.violet+"44",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <span style={{fontSize:22}}>🎯</span>
                    </div>
                    <div>
                      <p style={{color:C.tp,fontWeight:700,fontSize:15,margin:"0 0 3px",fontFamily:"'Space Grotesk',sans-serif"}}>Melhorar por objetivo</p>
                      <p style={{color:C.tm,fontSize:12,margin:0}}>VO2max, base aeróbica, consistência · sem data fixa</p>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Formulário Prova */}
            {planTipo==="prova"&&(
              <div>
                <button onClick={()=>setPlanTipo(null)} style={{background:"none",border:"none",color:C.tm,cursor:"pointer",fontSize:12,marginBottom:14,display:"flex",alignItems:"center",gap:5,padding:0,fontFamily:"inherit"}}>
                  <Ic n="back" z={12} c={C.tm}/> Voltar
                </button>
                <p style={{color:C.ts,fontFamily:"monospace",fontSize:10,fontWeight:700,margin:"0 0 8px",textTransform:"uppercase",letterSpacing:0.5}}>Distância da prova</p>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:14}}>
                  {[
                    {id:"5k",    l:"5km"},
                    {id:"8k",    l:"8km"},
                    {id:"10k",   l:"10km"},
                    {id:"10miles",l:"10 milhas"},
                    {id:"15k",   l:"15km"},
                    {id:"meia",  l:"21km"},
                    {id:"30k",   l:"30km"},
                    {id:"maratona",l:"42km"},
                    {id:"ultra", l:"Ultra"},
                  ].map(d=>(
                    <button key={d.id} onClick={()=>setPlanProva(p=>({...p,distancia:d.id}))} style={{background:planProva.distancia===d.id?"linear-gradient(135deg,"+C.violet+","+C.cyan+")":C.s2,color:planProva.distancia===d.id?"#fff":C.tm,border:"1px solid "+(planProva.distancia===d.id?C.violet:C.border),borderRadius:11,padding:"10px 0",fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"'Space Grotesk',sans-serif"}}>{d.l}</button>
                  ))}
                </div>
                <p style={{color:C.ts,fontFamily:"monospace",fontSize:10,fontWeight:700,margin:"0 0 5px",textTransform:"uppercase",letterSpacing:0.5}}>Data da prova</p>
                <input type="date" value={planProva.data_prova} onChange={e=>setPlanProva(p=>({...p,data_prova:e.target.value}))} min={new Date().toISOString().split("T")[0]} style={{width:"100%",background:C.s2,border:"1px solid "+C.border,borderRadius:11,padding:"10px 12px",color:C.tp,fontSize:13,outline:"none",fontFamily:"inherit",boxSizing:"border-box",marginBottom:14}}/>
                {planProva.data_prova&&(()=>{
                  const semanas=Math.max(4,Math.round((new Date(planProva.data_prova)-new Date())/(7*24*60*60*1000)));
                  return <div style={{background:C.violet+"11",border:"1px solid "+C.violet+"33",borderRadius:10,padding:"8px 12px",marginBottom:14,display:"flex",alignItems:"center",gap:8}}>
                    <Ic n="calendar" z={14} c={C.violetL}/>
                    <p style={{color:C.violetL,fontSize:12,margin:0,fontWeight:600}}>{semanas} semanas de preparação</p>
                  </div>;
                })()}
              </div>
            )}

            {/* Formulário Objetivo */}
            {planTipo==="objetivo"&&(
              <div>
                <button onClick={()=>setPlanTipo(null)} style={{background:"none",border:"none",color:C.tm,cursor:"pointer",fontSize:12,marginBottom:14,display:"flex",alignItems:"center",gap:5,padding:0,fontFamily:"inherit"}}>
                  <Ic n="back" z={12} c={C.tm}/> Voltar
                </button>
                <p style={{color:C.ts,fontFamily:"monospace",fontSize:10,fontWeight:700,margin:"0 0 8px",textTransform:"uppercase",letterSpacing:0.5}}>Objetivo</p>
                <div style={{display:"flex",flexDirection:"column",gap:7,marginBottom:14}}>
                  {[
                    {id:"vo2max",   l:"🫁 Melhorar VO2max",        s:"8 semanas · melhora de 5-15%"},
                    {id:"base",     l:"🏃 Construir base aeróbica", s:"6 semanas · Z2 e volume"},
                    {id:"perda",    l:"⚖️ Perda de peso",           s:"12 semanas · volume moderado"},
                    {id:"consistencia",l:"📅 Consistência",          s:"4 semanas · hábito de correr"},
                    {id:"meia",     l:"🥈 Preparar meia maratona",  s:"16 semanas · progressão completa"},
                    {id:"maratona", l:"🏅 Preparar maratona",       s:"20 semanas · periodização completa"},
                  ].map(o=>{
                    const semMap={vo2max:8,base:6,perda:12,consistencia:4,meia:16,maratona:20};
                    const selected=planObjetivo.objetivo===o.id;
                    return (
                      <button key={o.id} onClick={()=>setPlanObjetivo({objetivo:o.id,semanas:semMap[o.id]})} style={{background:selected?"linear-gradient(135deg,"+C.violet+"22,"+C.cyan+"11)":C.s1,border:"1.5px solid "+(selected?C.violet:C.border),borderRadius:12,padding:"11px 14px",cursor:"pointer",textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <div>
                          <p style={{color:selected?C.tp:C.tm,fontWeight:700,fontSize:13,margin:"0 0 2px",fontFamily:"'Space Grotesk',sans-serif"}}>{o.l}</p>
                          <p style={{color:C.td,fontSize:11,margin:0}}>{o.s}</p>
                        </div>
                        {selected&&<Ic n="check" z={16} c={C.violetL}/>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Campos comuns */}
            {planTipo&&(
              <div>
                {[{label:"Dias disponíveis/semana",k:"dias_disponiveis",ph:"Ex: 4"},{label:"Distância semanal atual (km)",k:"dist_semana",ph:"Ex: 25"},{label:"Histórico de lesões",k:"historico_lesoes",ph:"Nenhuma ou ex: tendinite joelho"}].map((f,i)=>(
                  <div key={i} style={{marginBottom:11}}>
                    <p style={{color:C.ts,fontFamily:"monospace",fontSize:10,fontWeight:700,margin:"0 0 5px",textTransform:"uppercase",letterSpacing:0.3}}>{f.label}</p>
                    <input value={planForm[f.k]} onChange={e=>setPlanForm(p=>({...p,[f.k]:e.target.value}))} placeholder={f.ph} style={{width:"100%",background:C.s2,border:"1px solid "+C.border,borderRadius:11,padding:"10px 12px",color:C.tp,fontSize:13,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
                  </div>
                ))}

                {/* Tempo de referência (RP) */}
                <div style={{marginBottom:13}}>
                  <p style={{color:C.ts,fontFamily:"monospace",fontSize:10,fontWeight:700,margin:"0 0 8px",textTransform:"uppercase",letterSpacing:0.3}}>Tempo de referência (Record Pessoal)</p>
                  <div style={{display:"flex",gap:6,marginBottom:10}}>
                    {[{id:"5k",l:"5km"},{id:"10k",l:"10km"},{id:"21k",l:"Meia"},{id:"42k",l:"Maratona"}].map(d=>(
                      <button key={d.id} onClick={()=>setPaceRef(p=>({...p,dist:d.id}))} style={{flex:1,background:paceRef.dist===d.id?"linear-gradient(135deg,"+C.violet+","+C.cyan+")":C.s2,color:paceRef.dist===d.id?"#fff":C.tm,border:"1px solid "+(paceRef.dist===d.id?C.violet:C.border),borderRadius:9,padding:"7px 0",fontWeight:700,fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>{d.l}</button>
                    ))}
                  </div>
                  <input value={paceRef.tempo} onChange={e=>setPaceRef(p=>({...p,tempo:e.target.value}))}
                    placeholder={paceRef.dist==="5k"?"Ex: 25:30":paceRef.dist==="10k"?"Ex: 52:00":paceRef.dist==="21k"?"Ex: 1:55:00":"Ex: 4:10:00"}
                    style={{width:"100%",background:C.s2,border:"1px solid "+C.border,borderRadius:11,padding:"10px 12px",color:C.tp,fontSize:13,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
                  <p style={{color:C.td,fontSize:10,margin:"5px 0 0"}}>Tempo total da prova · usado para calcular paces de treino</p>
                </div>
                <div style={{marginBottom:13}}>
                  <p style={{color:C.ts,fontFamily:"monospace",fontSize:10,fontWeight:700,margin:"0 0 8px",textTransform:"uppercase",letterSpacing:0.3}}>Nível</p>
                  <div style={{display:"flex",gap:7}}>{["iniciante","intermediario","avancado"].map(n=><button key={n} onClick={()=>setPlanForm(p=>({...p,nivel:n}))} style={{flex:1,background:planForm.nivel===n?"linear-gradient(135deg,"+C.violet+","+C.cyan+")":C.s2,color:planForm.nivel===n?"#fff":C.tm,border:"none",borderRadius:10,padding:"9px 0",fontWeight:700,fontSize:11,cursor:"pointer",fontFamily:"inherit",textTransform:"capitalize"}}>{n}</button>)}</div>
                </div>
                <div style={{background:"linear-gradient(135deg,#1a0e00,#221500)",border:"1px solid "+C.amber+"55",borderRadius:14,padding:14,marginBottom:13}}>
                  <div style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:11}}>
                    <div style={{width:32,height:32,borderRadius:10,background:C.amber+"22",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic n="warning" z={17} c={C.amber}/></div>
                    <div>
                      <p style={{color:C.amber,fontWeight:700,fontSize:13,margin:"0 0 3px",fontFamily:"'Space Grotesk',sans-serif"}}>Usa caneta emagrecedora?</p>
                      <p style={{color:C.ts,fontSize:11,margin:0,lineHeight:1.5}}>Ozempic · Wegovy · Mounjaro · Saxenda</p>
                    </div>
                  </div>
                  <div style={{display:"flex",gap:8,marginBottom:planForm.glp1==="sim"?12:0}}>
                    {["nao","sim"].map(v=>(
                      <button key={v} onClick={()=>setPlanForm(p=>({...p,glp1:v}))} style={{flex:1,background:planForm.glp1===v?(v==="sim"?"linear-gradient(135deg,"+C.amber+","+C.coral+")":"linear-gradient(135deg,"+C.violet+","+C.cyan+")"):"linear-gradient(135deg,"+C.s2+","+C.s3+")",color:planForm.glp1===v?"#fff":C.tm,border:"1px solid "+(planForm.glp1===v?(v==="sim"?C.amber:C.violet):C.border),borderRadius:10,padding:"10px 0",fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"'Space Grotesk',sans-serif"}}>
                        {v==="sim"?"✓ Sim, uso":"✗ Não uso"}
                      </button>
                    ))}
                  </div>
                  {planForm.glp1==="sim"&&(
                    <div>
                      <p style={{color:C.ts,fontFamily:"monospace",fontSize:10,fontWeight:700,margin:"0 0 7px",textTransform:"uppercase",letterSpacing:0.3}}>Náusea ativa hoje?</p>
                      <div style={{display:"flex",gap:8}}>
                        {["nao","sim"].map(v=>(
                          <button key={v} onClick={()=>setPlanForm(p=>({...p,glp1_nausea:v}))} style={{flex:1,background:planForm.glp1_nausea===v?(v==="sim"?C.coral+"33":C.green+"22"):C.s3,color:planForm.glp1_nausea===v?(v==="sim"?C.coral:C.green):C.tm,border:"1px solid "+(planForm.glp1_nausea===v?(v==="sim"?C.coral+"55":C.green+"55"):C.border),borderRadius:9,padding:"8px 0",fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>
                            {v==="sim"?"Com náusea":"Sem náusea"}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <button onClick={gerarPlanoMacro} style={{width:"100%",background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",color:"#fff",border:"none",borderRadius:13,padding:"14px 0",fontWeight:800,fontSize:15,cursor:"pointer",fontFamily:"'Space Grotesk',sans-serif",letterSpacing:0.3,display:"flex",alignItems:"center",justifyContent:"center",gap:10,boxShadow:"0 4px 20px "+C.violet+"44"}}>
                  <Ic n="ai" z={18} c="#fff"/>GERAR MEU PLANO
                </button>
              </div>
            )}
          </div>
        )}
        {planScreen==="loading"&&(
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:380,gap:18}}>
            <div style={{width:60,height:60,borderRadius:18,background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 30px "+C.violet+"44"}}><Ic n="ai" z={32} c="#fff"/></div>
            <div style={{textAlign:"center"}}><p style={{color:C.tp,fontWeight:700,fontSize:16,fontFamily:"'Space Grotesk',sans-serif",margin:"0 0 6px"}}>Analisando seus dados...</p><Dots color={C.cyanB}/></div>
          </div>
        )}
        {planScreen==="result"&&planResult&&(
          <div>
            <div style={{background:"linear-gradient(135deg,#0c0830,#0a1430)",border:"1px solid "+C.cyanB+"44",borderRadius:15,padding:13,marginBottom:13,display:"flex",gap:9,alignItems:"flex-start"}}>
              <Ic n="ai" z={22} c={C.cyanB}/>
              <div>
                <p style={{color:C.cyanB,fontWeight:700,fontSize:13,margin:"0 0 5px",fontFamily:"'Space Grotesk',sans-serif"}}>Plano gerado</p>
                <p style={{color:C.ts,fontSize:12,margin:0,lineHeight:1.6}}>{planResult.resumo_semanal}</p>
              </div>
            </div>
            {planResult.plano?.map((d,i)=>{
              const isDescanso = d.tipo==="Descanso"||d.tipo==="Descanso Total"||d.tipo==="Descanso Ativo";
              const tipoInfo = TIPOS_TREINO.find(t=>d.tipo?.toLowerCase().includes(t.id)||d.tipo?.toLowerCase().includes(t.label?.toLowerCase()));
              const dotColor = isDescanso?C.td:tipoInfo?.color||C.cyanB;
              return (
                <div key={i} style={{borderRadius:13,marginBottom:7,overflow:"hidden",border:"1px solid "+(d.alerta_lesao?C.amber+"44":d.customizado?C.violet+"44":C.border)}}>
                  {/* Day header */}
                  <div style={{background:"linear-gradient(135deg,"+C.s1+","+C.s2+")",padding:"11px 13px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:d.descricao?6:0}}>
                      <div style={{display:"flex",alignItems:"center",gap:10}}>
                        <div style={{width:4,height:36,borderRadius:2,background:dotColor,flexShrink:0}}/>
                        <div>
                          <p style={{color:C.ts,fontFamily:"monospace",fontSize:10,fontWeight:700,letterSpacing:0.5,textTransform:"uppercase",margin:"0 0 3px"}}>{d.dia}</p>
                          <div style={{display:"flex",gap:5,flexWrap:"wrap",alignItems:"center"}}>
                            {d.tipo&&<span style={{color:isDescanso?C.td:C.tp,fontWeight:700,fontSize:13,fontFamily:"'Space Grotesk',sans-serif"}}>{d.tipo}</span>}
                            {d.distancia_km>0&&<Badge text={d.distancia_km+"km"} color={C.cyan}/>}
                            {d.duracao_min>0&&<Badge text={d.duracao_min+"min"} color={C.cyanL}/>}
                            {d.pace_alvo&&<Badge text={d.pace_alvo+"/km"} color={C.cyanL}/>}
                            {d.customizado&&<Badge text="editado" color={C.violet}/>}
                          </div>
                        </div>
                      </div>
                      <button onClick={()=>{setAddTreinoDia(i);setAddStep("tipo");setAddTipo(null);setAddSubtipo(null);setShowAddTreino(true);}}
                        style={{background:C.s3,border:"1px solid "+C.border,borderRadius:9,padding:"5px 10px",cursor:"pointer",display:"flex",alignItems:"center",gap:5,flexShrink:0}}>
                        <Ic n="edit" z={12} c={C.ts}/>
                        <span style={{color:C.tm,fontSize:11,fontWeight:600}}>Editar</span>
                      </button>
                    </div>
                    {d.descricao&&<p style={{color:C.tm,fontSize:12,margin:"4px 0 0 14px",lineHeight:1.5,paddingLeft:4}}>{d.descricao}</p>}
                    {d.alerta_lesao&&<p style={{color:C.amber,fontSize:11,margin:"6px 0 0",display:"flex",alignItems:"center",gap:5}}>⚠️ {d.alerta_lesao}</p>}
                  </div>
                </div>
              );
            })}
            <div style={{display:"flex",gap:8,marginTop:13}}>
              <button onClick={()=>setPlanScreen("form")} style={{flex:1,background:C.s2,color:C.ts,border:"1px solid "+C.border,borderRadius:12,padding:"11px 0",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>Refazer</button>
              <button onClick={()=>{
                setSavedPlan(planResult);
                try{localStorage.setItem("tr_saved_plan",JSON.stringify(planResult));}catch{}
                setPlanScreen("form");
                setTab("treino");
                setTimeout(()=>setSubScreen("verPlano"),50);
              }} style={{flex:2,background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",color:"#fff",border:"none",borderRadius:12,padding:"11px 0",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"'Space Grotesk',sans-serif",letterSpacing:0.3}}>✓ Usar este plano</button>
            </div>
          </div>
        )}
      </div>
    );

    // Sub: Gravação
    if(subScreen==="gravacao") {
      if(gStatus==="fim") return (
        <div>
          <div style={{paddingTop:10,paddingBottom:8,display:"flex",alignItems:"center",gap:10}}>
            <button onClick={()=>{resetGrav();setGStatus("idle");setSubScreen(null);}} style={{background:C.s2,border:"1px solid "+C.border,borderRadius:9,padding:"6px 11px",cursor:"pointer",display:"flex",alignItems:"center",gap:5}}><Ic n="back" z={13} c={C.ts}/></button>
            <h1 style={{color:C.tp,fontFamily:"'Space Grotesk',sans-serif",fontSize:20,margin:0}}>{salvando?"Salvando...":"Treino concluído"}</h1>
          </div>
          {!salvando&&savedRun&&<div style={{background:"linear-gradient(135deg,#06180e,#08201a)",border:"1px solid "+C.cyanB+"55",borderRadius:12,padding:"10px 14px",marginBottom:11,display:"flex",alignItems:"center",gap:10}}><Ic n="save" z={17} c={C.cyanB}/><div><p style={{color:C.cyanB,fontWeight:700,fontSize:13,margin:0}}>Corrida salva</p><p style={{color:C.tm,fontSize:11,margin:"2px 0 0"}}>+{savedRun.xp_ganho} XP · aparece nos Treinos Concluídos</p></div></div>}
          {novoRP&&<div style={{background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",borderRadius:12,padding:"11px 13px",marginBottom:11,display:"flex",alignItems:"center",gap:10,boxShadow:"0 4px 20px "+C.violet+"44"}}><Ic n="trophy" z={22} c="#fff"/><div><p style={{color:"#fff",fontWeight:800,fontSize:14,margin:0}}>Novo Recorde!</p><p style={{color:"#ffffffcc",fontSize:12,margin:0}}>{novoRP.dist} em {novoRP.tempo}</p></div></div>}
          <div style={{background:"linear-gradient(135deg,"+C.s1+","+C.s2+")",border:"1px solid "+C.cyanB+"44",borderRadius:17,padding:16,marginBottom:12}}>
            <p style={{color:C.cyanB,fontFamily:"monospace",fontSize:9,fontWeight:700,letterSpacing:1,textTransform:"uppercase",margin:"0 0 11px"}}>resumo</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:13}}>
              {[{v:gKm.toFixed(2)+" km",l:"distância",c:C.cyanB},{v:fmtT(gSeg),l:"tempo",c:C.cyan},{v:pace+"/km",l:"pace médio",c:C.cyanL},{v:gCad>0?gCad+" spm":"-- spm",l:"cadência",c:C.cyanB}].map((s,i)=>(
                <div key={i} style={{background:C.s3,borderRadius:11,padding:"11px 12px",border:"1px solid "+s.c+"22"}}><p style={{color:s.c,fontFamily:"monospace",fontWeight:700,fontSize:8,textTransform:"uppercase",letterSpacing:1.2,margin:"0 0 4px",opacity:0.8}}>{s.l}</p><p style={{color:s.c,fontFamily:"'Space Grotesk',sans-serif",fontWeight:800,fontSize:20,margin:0,letterSpacing:-0.5}}>{s.v}</p></div>
              ))}
            </div>
            <button onClick={()=>{if(savedRun){setSelectedRun(savedRun);}}} style={{width:"100%",background:"transparent",border:"none",color:C.cyanB,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"'Space Grotesk',sans-serif",padding:"4px 0",textAlign:"center",textDecoration:"underline",letterSpacing:0.2}}>Ver dados completos →</button>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>{setTab("studio");setStudioTab("card");setSubScreen(null);}} style={{flex:1,background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",color:"#fff",border:"none",borderRadius:12,padding:"12px 0",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"'Space Grotesk',sans-serif",letterSpacing:0.3}}>Criar card</button>
            <button onClick={()=>{setSubScreen(null);resetGrav();setGStatus("idle");}} style={{flex:1,background:C.s2,color:C.ts,border:"1px solid "+C.border,borderRadius:12,padding:"12px 0",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>Voltar</button>
          </div>
        </div>
      );
      return (
        <div style={{display:"flex",flexDirection:"column",height:"calc(100vh - 160px)",maxHeight:620,gap:0}}>

          {/* Header — só título do treino se houver */}
          {selectedTreino?.nome && (
            <div style={{paddingTop:10,paddingBottom:4}}>
              <p style={{color:gStatus==="pausado"?C.amber:C.coral,fontFamily:"monospace",fontSize:8,fontWeight:700,textTransform:"uppercase",letterSpacing:1,margin:"0 0 1px"}}>{gStatus==="pausado"?"PAUSADO":"● AO VIVO"}</p>
              <p style={{color:C.ts,fontSize:13,fontWeight:600,margin:0,fontFamily:"'Space Grotesk',sans-serif"}}>{selectedTreino.nome}</p>
            </div>
          )}

          {/* Tempo — sem card, direto */}
          <div style={{textAlign:"center",paddingTop:selectedTreino?.nome?4:14,paddingBottom:4}}>
            <p style={{color:C.tp,fontFamily:"'Space Grotesk',sans-serif",fontSize:62,fontWeight:800,margin:0,letterSpacing:-2,lineHeight:1}}>{fmtT(gSeg)}</p>
            <p style={{color:C.cyanB,fontSize:10,fontWeight:600,margin:"2px 0 0",fontFamily:"monospace",letterSpacing:1,textTransform:"uppercase"}}>{gStatus==="ativo"?"em andamento":gStatus==="pausado"?"pausado":"pronto"}</p>
          </div>

          {/* Métricas — sem card, só texto */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",paddingBottom:10,borderBottom:"1px solid "+C.border}}>
            {[{v:gKm.toFixed(2),u:"km",c:C.cyanB,l:"distância"},{v:pace,u:"/km",c:C.cyan,l:"pace"},{v:gCad>0?""+gCad:"--",u:"spm",c:C.cyanB,l:"cadência"}].map((m,i)=>(
              <div key={i} style={{textAlign:"center",padding:"6px 4px"}}>
                <p style={{color:C.td,fontFamily:"monospace",fontWeight:700,fontSize:8,textTransform:"uppercase",letterSpacing:1,margin:"0 0 3px"}}>{m.l}</p>
                <p style={{color:m.c,fontFamily:"'Space Grotesk',sans-serif",fontWeight:800,fontSize:22,margin:0,letterSpacing:-0.5,lineHeight:1}}>{m.v}</p>
                <p style={{color:C.td,fontSize:9,fontWeight:600,textTransform:"uppercase",letterSpacing:0.4,margin:"2px 0 0",fontFamily:"monospace"}}>{m.u}</p>
              </div>
            ))}
          </div>

          {/* Mapa — ocupa até a borda inferior */}
          <div style={{borderRadius:15,overflow:"hidden",margin:"10px 0 0",flex:1,minHeight:200,position:"relative"}}>
            <LiveMap route={[...routeRef.current]} gpsStatus={gpsStatus} accuracy={gpsAccuracy} tick={routeTick} height={999} fillContainer/>
          </div>

          {/* Botões */}
          <div style={{display:"flex",gap:8,paddingTop:8,paddingBottom:4}}>
            {gStatus==="ativo"
              ?(<><button onClick={pausar} style={{flex:1,background:C.s2,color:C.amber,border:"2px solid "+C.amber+"44",borderRadius:13,padding:"13px 0",fontWeight:800,fontSize:14,cursor:"pointer",fontFamily:"'Space Grotesk',sans-serif"}}>PAUSAR</button><button onClick={finalizar} style={{flex:1,background:"linear-gradient(135deg,#7f1d1d,"+C.coral+")",color:"#fff",border:"none",borderRadius:13,padding:"13px 0",fontWeight:800,fontSize:14,cursor:"pointer",fontFamily:"'Space Grotesk',sans-serif"}}>FINALIZAR</button></>)
              :gStatus==="pausado"
                ?(<><button onClick={retomar} style={{flex:2,background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",color:"#fff",border:"none",borderRadius:13,padding:"13px 0",fontWeight:800,fontSize:14,cursor:"pointer",fontFamily:"'Space Grotesk',sans-serif"}}>RETOMAR</button><button onClick={finalizar} style={{flex:1,background:C.s2,color:C.coral,border:"2px solid "+C.coral+"44",borderRadius:13,padding:"13px 0",fontWeight:800,fontSize:13,cursor:"pointer",fontFamily:"'Space Grotesk',sans-serif"}}>FIM</button></>)
              :(<button onClick={()=>iniciar()} style={{flex:1,background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",color:"#fff",border:"none",borderRadius:13,padding:"13px 0",fontWeight:800,fontSize:15,cursor:"pointer",fontFamily:"'Space Grotesk',sans-serif",boxShadow:"0 4px 20px "+C.violet+"44"}}>INICIAR</button>)}
          </div>

        </div>
      );
    }

    // Sub: Ver Plano semanal
    if(subScreen==="verPlano") {
      // Se tem plano guardado (macro ou legacy)
      if(savedPlan && (savedPlan.semanas_macro?.length>0 || savedPlan.plano?.length>0)) {
        const intCor2 = (tipo) => {
          if(!tipo) return C.tg;
          const t = tipo.toLowerCase();
          if(t.includes("descanso")||t.includes("rest")) return C.tg;
          if(t.includes("interval")||t.includes("forte")||t.includes("tiro")||t.includes("fartlek")||t.includes("pirâmide")||t.includes("subida")) return C.coral;
          if(t.includes("longo")||t.includes("long")) return C.amber;
          if(t.includes("tempo")||t.includes("limiar")) return C.violetL;
          return C.cyanB;
        };

        const isMacro = savedPlan.tipo==="macro" && savedPlan.semanas_macro?.length>0;
        const semanas_macro = savedPlan.semanas_macro||[];
        const totalSemanas = isMacro ? semanas_macro.length : Math.ceil((savedPlan.plano?.length||7)/7);
        const totalFeitos = Object.values(completedWorkouts).filter(Boolean).length;

        // For legacy 7-day plans
        const plano = savedPlan.plano||[];
        const semanas_legacy = [];
        for(let i=0;i<plano.length;i+=7) semanas_legacy.push(plano.slice(i,i+7));
        const totalTreinos = isMacro
          ? semanas_macro.reduce((a,s)=>a+(s.treinos_chave?.length||0),0)
          : plano.filter(d=>d.distancia_km>0||!d.tipo?.toLowerCase().includes("descanso")).length;
        const progPct = totalTreinos>0?Math.min(100,Math.round(totalFeitos/totalTreinos*100)):0;
        const focos = ["Base aeróbica","Progressão de volume","Velocidade de limiar","Semana de recuperação"];

        return (
          <div>
            <div style={{paddingTop:8,paddingBottom:12,display:"flex",alignItems:"center",gap:10}}>
              <button onClick={()=>{setSubScreen(null);if(gStatus==="fim"){resetGrav();setGStatus("idle");}}} style={{background:C.s2,border:"1px solid "+C.border,borderRadius:9,padding:"6px 11px",cursor:"pointer",display:"flex",alignItems:"center",gap:5}}><Ic n="back" z={13} c={C.ts}/></button>
              <div style={{flex:1}}>
                <h1 style={{color:C.tp,fontFamily:"'Space Grotesk',sans-serif",fontSize:18,margin:0}}>{savedPlan.titulo||"Meu Plano IA"}</h1>
                <p style={{color:C.tm,fontSize:12,margin:"2px 0 0"}}>{isMacro?semanas_macro.length+" semanas":totalSemanas+" semanas"} · personalizado</p>
              </div>
              <button onClick={()=>{setPlanScreen("form");setPlanTipo(null);setSubScreen("plano");}} style={{background:C.s2,border:"1px solid "+C.border,borderRadius:9,padding:"6px 10px",cursor:"pointer",fontSize:11,color:C.tm,fontFamily:"inherit"}}>Novo plano</button>
              <button onClick={()=>{if(window.confirm("Excluir plano?")){{setSavedPlan(null);try{localStorage.removeItem("tr_saved_plan");localStorage.removeItem("tr_completed_workouts");}catch{}setCompletedWorkouts({});setSubScreen(null);}}} } style={{background:C.coral+"11",border:"1px solid "+C.coral+"33",borderRadius:9,padding:"6px 8px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Ic n="trash" z={14} c={C.coral}/>
              </button>
            </div>

            {/* Resumo */}
            {savedPlan.resumo_semanal&&typeof savedPlan.resumo_semanal==="string"&&(
              <div style={{background:"linear-gradient(135deg,#0c0830,#0a1430)",border:"1px solid "+C.cyanB+"44",borderRadius:13,padding:12,marginBottom:12,display:"flex",gap:9,alignItems:"flex-start"}}>
                <Ic n="ai" z={18} c={C.cyanB}/>
                <p style={{color:C.ts,fontSize:12,margin:0,lineHeight:1.6}}>{savedPlan.resumo_semanal}</p>
              </div>
            )}

            {/* Barra de progresso */}
            <div style={{background:C.s1,borderRadius:12,padding:"12px 14px",marginBottom:12,border:"1px solid "+C.border}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7}}>
                <span style={{color:C.ts,fontFamily:"monospace",fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:0.5}}>Progresso do plano</span>
                <span style={{color:C.cyanB,fontSize:12,fontWeight:700}}>{totalFeitos} treinos concluídos</span>
              </div>
              <div style={{height:5,background:C.s3,borderRadius:3,overflow:"hidden"}}>
                <div style={{width:progPct+"%",height:"100%",background:"linear-gradient(90deg,"+C.violet+","+C.cyan+")",borderRadius:3,transition:"width 0.4s"}}/>
              </div>
            </div>

            {/* Legenda */}
            <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:12}}>
              {[{label:"Leve",color:C.cyanB},{label:"Moderado",color:C.amber},{label:"Forte",color:C.coral},{label:"Descanso",color:C.tg}].map(l=>(
                <div key={l.label} style={{display:"flex",alignItems:"center",gap:4}}>
                  <div style={{width:7,height:7,borderRadius:"50%",background:l.color}}/>
                  <span style={{color:C.tm,fontSize:11}}>{l.label}</span>
                </div>
              ))}
            </div>

            {/* Avisos médicos */}
            {savedPlan.avisos_medicos?.length>0&&(
              <div style={{background:C.amber+"11",border:"1px solid "+C.amber+"33",borderRadius:12,padding:"10px 13px",marginBottom:12}}>
                <p style={{color:C.amber,fontWeight:700,fontSize:11,margin:"0 0 6px",fontFamily:"monospace",textTransform:"uppercase",letterSpacing:0.5}}>⚠️ Avisos Médicos</p>
                {savedPlan.avisos_medicos.slice(0,3).map((a,i)=>(
                  <p key={i} style={{color:C.tm,fontSize:11,margin:"0 0 4px",lineHeight:1.4}}>{typeof a==="string"?a:JSON.stringify(a)}</p>
                ))}
              </div>
            )}

            {/* Semanas */}
            {isMacro ? (
              // Macro plan — semanas com expansão sob demanda
              semanas_macro.map((sem,si)=>{
                const isExpanded = !!expandedWeeks[si];
                const isExpanding = expandingWeek===si;
                const hasErro = !!expandedWeeks[si+"_erro"];
                const dias = expandedWeeks[si]||[];
                const intensCor = sem.intensidade==="forte"?C.coral:sem.intensidade==="moderado"?C.amber:C.cyanB;
                return (
                  <div key={si} style={{marginBottom:12,border:"1px solid "+(hasErro?C.coral+"55":C.border),borderRadius:14,overflow:"hidden"}}>
                    {/* Cabeçalho da semana */}
                    <div style={{background:"linear-gradient(135deg,"+C.s1+","+C.s2+")",padding:"12px 14px",display:"flex",alignItems:"center",gap:10,cursor:isExpanded?"default":"pointer"}} onClick={()=>{if(!isExpanded&&!isExpanding){if(hasErro){const e={...expandedWeeks};delete e[si+"_erro"];setExpandedWeeks(e);}expandirSemana(si);}}}>
                      <div style={{width:28,height:28,borderRadius:8,background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                        <span style={{color:"#fff",fontWeight:800,fontSize:11,fontFamily:"monospace"}}>S{si+1}</span>
                      </div>
                      <div style={{flex:1}}>
                        <p style={{color:C.tp,fontWeight:700,fontSize:14,margin:"0 0 2px",fontFamily:"'Space Grotesk',sans-serif"}}>{sem.foco}</p>
                        <div style={{display:"flex",gap:6,alignItems:"center"}}>
                          <span style={{background:intensCor+"22",color:intensCor,border:"1px solid "+intensCor+"44",borderRadius:6,padding:"1px 7px",fontSize:10,fontWeight:700}}>{sem.volume_km}km</span>
                          <span style={{color:C.td,fontSize:11}}>{sem.resumo}</span>
                        </div>
                      </div>
                      {!isExpanded&&!isExpanding&&!hasErro&&<div style={{background:C.violet+"22",borderRadius:8,padding:"5px 10px"}}><span style={{color:C.violetL,fontSize:11,fontWeight:700}}>Ver dias</span></div>}
                      {isExpanding&&<div style={{width:16,height:16,borderRadius:"50%",border:"2px solid "+C.violet,borderTopColor:"transparent",animation:"spin 0.8s linear infinite"}}/>}
                      {hasErro&&!isExpanding&&<div style={{background:C.coral+"22",borderRadius:8,padding:"5px 10px"}}><span style={{color:C.coral,fontSize:11,fontWeight:700}}>↺ Tentar novamente</span></div>}
                    </div>

                    {/* Treinos chave resumidos (antes de expandir) */}
                    {!isExpanded&&!isExpanding&&(
                      <div style={{padding:"8px 14px 12px",display:"flex",gap:6,flexWrap:"wrap"}}>
                        {hasErro&&<span style={{background:C.coral+"11",color:C.coral,border:"1px solid "+C.coral+"33",borderRadius:7,padding:"3px 8px",fontSize:11}}>Erro ao carregar — toque para tentar novamente</span>}
                        {!hasErro&&sem.treinos_chave?.map((t,ti)=>(
                          <span key={ti} style={{background:C.s2,color:C.tm,border:"1px solid "+C.border,borderRadius:7,padding:"3px 8px",fontSize:11}}>{t}</span>
                        ))}
                        {!hasErro&&<span style={{background:C.s2,color:C.td,border:"1px solid "+C.border,borderRadius:7,padding:"3px 8px",fontSize:11}}>{sem.descansos||2} descansos</span>}
                      </div>
                    )}

                    {/* Dias expandidos */}
                    {isExpanded&&dias.map((d,di)=>{
                      const globalIdx=si*7+di;
                      const isDone=!!completedWorkouts[String(globalIdx)];
                      const isDescanso=d.distancia_km===0||d.tipo?.toLowerCase().includes("descanso");
                      const cor=intCor2(d.tipo);
                      if(isDescanso) return (
                        <div key={di} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 14px",borderTop:"1px solid "+C.border+"44"}}>
                          <div onClick={()=>toggleWorkout(globalIdx)} style={{width:22,height:22,borderRadius:6,border:"1.5px solid "+C.border,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,cursor:"pointer",background:isDone?"#22c55e22":"transparent"}}>
                            {isDone&&<Ic n="check" z={11} c="#22c55e"/>}
                          </div>
                          <span style={{color:C.ts,fontFamily:"monospace",fontSize:10,fontWeight:700,textTransform:"uppercase",minWidth:28}}>{d.dia?.slice(0,3)}</span>
                          <div style={{width:6,height:6,borderRadius:3,background:C.tg,flexShrink:0}}/>
                          <span style={{color:C.td,fontSize:12,fontStyle:"italic"}}>{d.tipo||"Descanso"}</span>
                        </div>
                      );
                      return (
                        <div key={di} style={{borderTop:"1px solid "+C.border+"44",background:isDone?"#22c55e06":"transparent"}}>
                          <div style={{display:"flex",alignItems:"stretch"}}>
                            <div style={{width:3,background:isDone?"#22c55e":cor,flexShrink:0}}/>
                            <div style={{flex:1,padding:"9px 12px"}}>
                              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                                <div style={{flex:1}}>
                                  <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:3}}>
                                    <span style={{color:C.ts,fontFamily:"monospace",fontSize:10,fontWeight:700,textTransform:"uppercase"}}>{d.dia?.slice(0,3)}</span>
                                    <span style={{color:isDone?C.td:C.tp,fontWeight:700,fontSize:13,fontFamily:"'Space Grotesk',sans-serif",textDecoration:isDone?"line-through":"none"}}>{d.tipo}</span>
                                  </div>
                                  <div style={{display:"flex",gap:5}}>
                                    {d.distancia_km>0&&<span style={{background:cor+"22",color:cor,border:"1px solid "+cor+"44",borderRadius:6,padding:"2px 7px",fontSize:11,fontWeight:700}}>{d.distancia_km}km</span>}
                                    {d.pace_alvo&&d.pace_alvo!=="—"&&<span style={{background:C.s2,color:C.tm,border:"1px solid "+C.border,borderRadius:6,padding:"2px 7px",fontSize:11}}>{d.pace_alvo}</span>}
                                  </div>
                                </div>
                                <div onClick={()=>toggleWorkout(globalIdx)} style={{width:22,height:22,borderRadius:6,border:"1.5px solid "+(isDone?"#22c55e":C.border),display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",background:isDone?"#22c55e":"transparent",flexShrink:0,marginLeft:8}}>
                                  {isDone&&<Ic n="check" z={11} c="#fff"/>}
                                </div>
                              </div>
                              {d.descricao&&<p style={{color:C.tm,fontSize:11,margin:"4px 0 0",lineHeight:1.4}}>{d.descricao}</p>}
                              {d.alerta_lesao&&d.alerta_lesao!=="Nenhum."&&<p style={{color:C.amber,fontSize:11,margin:"4px 0 0"}}>⚠️ {d.alerta_lesao}</p>}
                              {!isDone&&<button onClick={()=>{
                                setSelectedTreino({
                                  nome:d.tipo,tipo:d.tipo,
                                  km:d.distancia_km+"km",
                                  dur:d.duracao_min?d.duracao_min+"min":"—",
                                  intensidade:"moderada",semana:si+1,
                                  descricao:d.descricao||""
                                });
                                setSubScreen("gravacao");
                              }} style={{marginTop:7,background:"linear-gradient(135deg,"+C.violet+"22,"+C.cyan+"11)",border:"1px solid "+C.violet+"44",borderRadius:8,padding:"6px 12px",cursor:"pointer",color:C.violetL,fontSize:11,fontWeight:700,fontFamily:"'Space Grotesk',sans-serif",display:"flex",alignItems:"center",gap:5,width:"100%",justifyContent:"center"}}>
                                ▶ Iniciar treino
                              </button>}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })
            ) : (
              // Legacy 7-day plan
              semanas_legacy.map((semana,si)=>{
                const foco = focos[si]||("Semana "+(si+1));
                return (
                  <div key={si} style={{marginBottom:16}}>
                    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                      <div style={{width:28,height:28,borderRadius:8,background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                        <span style={{color:"#fff",fontWeight:800,fontSize:11,fontFamily:"monospace"}}>S{si+1}</span>
                      </div>
                      <div style={{flex:1,height:1,background:C.border}}/>
                      <span style={{color:C.td,fontFamily:"monospace",fontSize:9,fontWeight:700,letterSpacing:1,textTransform:"uppercase"}}>{foco}</span>
                    </div>
                    {semana.map((d,di)=>{
                      const globalIdx=si*7+di;
                      const isDone=!!completedWorkouts[String(globalIdx)];
                      const isDescanso=d.distancia_km===0||d.tipo?.toLowerCase().includes("descanso");
                      const cor=intCor2(d.tipo);
                      if(isDescanso) return (
                        <div key={di} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 2px",borderBottom:"1px solid "+C.border+"44"}}>
                          <div style={{width:24,height:24,borderRadius:6,border:"1.5px solid "+C.border,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,cursor:"pointer",background:isDone?"#22c55e22":"transparent"}} onClick={()=>toggleWorkout(globalIdx)}>
                            {isDone&&<Ic n="check" z={12} c="#22c55e"/>}
                          </div>
                          <span style={{color:C.ts,fontFamily:"monospace",fontSize:11,fontWeight:700,textTransform:"uppercase",minWidth:30}}>{d.dia?.slice(0,3)}</span>
                          <div style={{width:6,height:6,borderRadius:3,background:C.tg}}/>
                          <span style={{color:C.td,fontSize:13,fontStyle:"italic"}}>{d.tipo||"Descanso completo"}</span>
                        </div>
                      );
                      return (
                        <div key={di} style={{borderRadius:12,marginBottom:6,border:"1px solid "+(isDone?"#22c55e33":d.alerta_lesao?C.amber+"33":C.border),overflow:"hidden",background:isDone?"#22c55e08":C.s1}}>
                          <div style={{display:"flex",alignItems:"stretch",gap:0}}>
                            <div style={{width:4,background:isDone?"#22c55e":cor,flexShrink:0}}/>
                            <div style={{flex:1,padding:"10px 12px"}}>
                              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:d.descricao?5:0}}>
                                <div style={{flex:1}}>
                                  <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:3}}>
                                    <span style={{color:C.ts,fontFamily:"monospace",fontSize:10,fontWeight:700,textTransform:"uppercase"}}>{d.dia?.slice(0,3)}</span>
                                    <span style={{color:isDone?C.td:C.tp,fontWeight:700,fontSize:14,fontFamily:"'Space Grotesk',sans-serif",textDecoration:isDone?"line-through":"none"}}>{d.tipo}</span>
                                  </div>
                                  <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                                    {d.distancia_km>0&&<span style={{background:cor+"22",color:cor,border:"1px solid "+cor+"44",borderRadius:6,padding:"2px 8px",fontSize:11,fontWeight:700}}>{d.distancia_km}km</span>}
                                    {d.pace_alvo&&d.pace_alvo!=="—"&&<span style={{background:C.s2,color:C.tm,border:"1px solid "+C.border,borderRadius:6,padding:"2px 8px",fontSize:11}}>{d.pace_alvo}</span>}
                                  </div>
                                </div>
                                <div onClick={()=>toggleWorkout(globalIdx)} style={{width:24,height:24,borderRadius:6,border:"1.5px solid "+(isDone?"#22c55e":C.border),display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,cursor:"pointer",background:isDone?"#22c55e":"transparent",marginLeft:8}}>
                                  {isDone&&<Ic n="check" z={12} c="#fff"/>}
                                </div>
                              </div>
                              {d.descricao&&<p style={{color:C.tm,fontSize:11,margin:"5px 0 0",lineHeight:1.4}}>{d.descricao}</p>}
                              {d.alerta_lesao&&d.alerta_lesao!=="Nenhum."&&d.alerta_lesao!=="Nenhum"&&(
                                <p style={{color:C.amber,fontSize:11,margin:"5px 0 0",lineHeight:1.4}}>⚠️ {d.alerta_lesao}</p>
                              )}
                              {!isDone&&<button onClick={()=>{
                                setSelectedTreino({
                                  nome:d.tipo,tipo:d.tipo,
                                  km:d.distancia_km+"km",
                                  dur:d.duracao_min?d.duracao_min+"min":"—",
                                  intensidade:"moderada",semana:si+1,
                                  descricao:d.descricao||""
                                });
                                setSubScreen("gravacao");
                              }} style={{marginTop:7,background:"linear-gradient(135deg,"+C.violet+"22,"+C.cyan+"11)",border:"1px solid "+C.violet+"44",borderRadius:8,padding:"6px 12px",cursor:"pointer",color:C.violetL,fontSize:11,fontWeight:700,fontFamily:"'Space Grotesk',sans-serif",display:"flex",alignItems:"center",gap:5,width:"100%",justifyContent:"center"}}>
                                ▶ Iniciar treino
                              </button>}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })
            )}
          </div>
        );
      }

      // Sem plano IA guardado — mostra CTA
      return (
        <div>
          <div style={{paddingTop:8,paddingBottom:12,display:"flex",alignItems:"center",gap:10}}>
            <button onClick={()=>{setSubScreen(null);if(gStatus==="fim"){resetGrav();setGStatus("idle");}}} style={{background:C.s2,border:"1px solid "+C.border,borderRadius:9,padding:"6px 11px",cursor:"pointer",display:"flex",alignItems:"center",gap:5}}><Ic n="back" z={13} c={C.ts}/></button>
            <h1 style={{color:C.tp,fontFamily:"'Space Grotesk',sans-serif",fontSize:18,margin:0}}>Meu Plano</h1>
          </div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:380,padding:"32px 24px",textAlign:"center"}}>
            <div style={{width:72,height:72,borderRadius:36,background:"linear-gradient(135deg,"+C.violet+"33,"+C.cyan+"22)",border:"1px solid "+C.violet+"44",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:20}}>
              <Ic n="run" z={32} c={C.violetL}/>
            </div>
            <p style={{color:C.tp,fontWeight:800,fontSize:20,margin:"0 0 10px",fontFamily:"'Space Grotesk',sans-serif"}}>Que tal criarmos um plano personalizado?</p>
            <p style={{color:C.tm,fontSize:14,margin:"0 0 28px",lineHeight:1.6,maxWidth:280}}>A IA vai montar uma semana de treinos baseada no seu perfil, objetivo e histórico de corridas.</p>
            <button onClick={()=>{setPlanScreen("form");setPlanTipo(null);setSubScreen("plano");}}
              style={{background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",color:"#fff",border:"none",borderRadius:14,padding:"15px 28px",fontWeight:800,fontSize:15,cursor:"pointer",fontFamily:"'Space Grotesk',sans-serif",boxShadow:"0 6px 24px "+C.violet+"55"}}>
              ✨ Criar meu plano com IA
            </button>
          </div>
        </div>
      );
    }
    // Sub: Gravação
    if(subScreen==="gravacao") {
      if(gStatus==="fim") return (
        <div>
          <div style={{paddingTop:10,paddingBottom:8,display:"flex",alignItems:"center",gap:10}}>
            <button onClick={()=>{setSubScreen(null);if(gStatus==="fim"){resetGrav();setGStatus("idle");}}} style={{background:C.s2,border:"1px solid "+C.border,borderRadius:9,padding:"6px 11px",cursor:"pointer",display:"flex",alignItems:"center",gap:5}}><Ic n="back" z={13} c={C.ts}/></button>
            <h1 style={{color:C.tp,fontFamily:"'Space Grotesk',sans-serif",fontSize:20,margin:0}}>{salvando?"Salvando...":"Treino concluído"}</h1>
          </div>
          {!salvando&&savedRun&&<div style={{background:"linear-gradient(135deg,#06180e,#08201a)",border:"1px solid "+C.cyanB+"55",borderRadius:12,padding:"10px 14px",marginBottom:11,display:"flex",alignItems:"center",gap:10}}><Ic n="save" z={17} c={C.cyanB}/><div><p style={{color:C.cyanB,fontWeight:700,fontSize:13,margin:0}}>Corrida salva</p><p style={{color:C.tm,fontSize:11,margin:"2px 0 0"}}>+{savedRun.xp_ganho} XP · aparece nos Treinos Concluídos</p></div></div>}
          {novoRP&&<div style={{background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",borderRadius:12,padding:"11px 13px",marginBottom:11,display:"flex",alignItems:"center",gap:10,boxShadow:"0 4px 20px "+C.violet+"44"}}><Ic n="trophy" z={22} c="#fff"/><div><p style={{color:"#fff",fontWeight:800,fontSize:14,margin:0}}>Novo Recorde!</p><p style={{color:"#ffffffcc",fontSize:12,margin:0}}>{novoRP.dist} em {novoRP.tempo}</p></div></div>}
          <div style={{background:"linear-gradient(135deg,"+C.s1+","+C.s2+")",border:"1px solid "+C.cyanB+"44",borderRadius:17,padding:16,marginBottom:12}}>
            <p style={{color:C.cyanB,fontFamily:"monospace",fontSize:9,fontWeight:700,letterSpacing:1,textTransform:"uppercase",margin:"0 0 11px"}}>resumo</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:13}}>
              {[{v:gKm.toFixed(2)+" km",l:"distância",c:C.cyanB},{v:fmtT(gSeg),l:"tempo",c:C.cyan},{v:pace+"/km",l:"pace médio",c:C.cyanL},{v:gCad>0?gCad+" spm":"-- spm",l:"cadência",c:C.cyanB}].map((s,i)=>(
                <div key={i} style={{background:C.s3,borderRadius:11,padding:"11px 12px",border:"1px solid "+s.c+"22"}}><p style={{color:s.c,fontFamily:"monospace",fontWeight:700,fontSize:8,textTransform:"uppercase",letterSpacing:1.2,margin:"0 0 4px",opacity:0.8}}>{s.l}</p><p style={{color:s.c,fontFamily:"'Space Grotesk',sans-serif",fontWeight:800,fontSize:20,margin:0,letterSpacing:-0.5}}>{s.v}</p></div>
              ))}
            </div>
            <div style={{display:"flex",gap:5}}>{[1,2,3,4,5,6].map(n=><div key={n} style={{flex:1,height:27,borderRadius:7,background:n<=intDone?"linear-gradient(135deg,"+C.violet+","+C.cyan+")":C.s3,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:n<=intDone?"#fff":C.tg,fontSize:11,fontWeight:800,fontFamily:"'Space Grotesk',sans-serif"}}>{n}</span></div>)}</div>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>{setTab("studio");setStudioTab("card");setSubScreen(null);}} style={{flex:1,background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",color:"#fff",border:"none",borderRadius:12,padding:"12px 0",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"'Space Grotesk',sans-serif",letterSpacing:0.3}}>Criar card</button>
            <button onClick={()=>{setSubScreen(null);resetGrav();setGStatus("idle");}} style={{flex:1,background:C.s2,color:C.ts,border:"1px solid "+C.border,borderRadius:12,padding:"12px 0",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>Voltar</button>
          </div>
        </div>
      );
      return (
        <div style={{display:"flex",flexDirection:"column",minHeight:565}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:10,paddingBottom:6}}>
            <div><p style={{color:gStatus==="pausado"?C.amber:C.coral,fontFamily:"monospace",fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:1,margin:0}}>{gStatus==="pausado"?"PAUSADO":"● AO VIVO"}</p><p style={{color:C.ts,fontSize:12,margin:"2px 0 0"}}>Intervalado 6×800m</p></div>
            <div style={{display:"flex",gap:6}}>
              <div style={{background:gpsStatus==="active"?C.cyanB+"22":gpsStatus==="searching"?C.amber+"22":C.coral+"22",border:"1px solid "+(gpsStatus==="active"?C.cyanB+"44":gpsStatus==="searching"?C.amber+"44":C.coral+"44"),borderRadius:8,padding:"4px 9px",display:"flex",flexDirection:"column",alignItems:"center"}}>
                <span style={{color:gpsStatus==="active"?C.cyanB:gpsStatus==="searching"?C.amber:C.coral,fontFamily:"monospace",fontSize:7,fontWeight:700,letterSpacing:1,textTransform:"uppercase",lineHeight:1}}>gps</span>
                <span style={{color:gpsStatus==="active"?C.cyanB:gpsStatus==="searching"?C.amber:C.coral,fontWeight:800,fontSize:11,fontFamily:"'Space Grotesk',sans-serif"}}>{gpsStatus==="active"?`±${gpsAccuracy||"?"}m`:gpsStatus==="searching"?"...":"off"}</span>
              </div>
              <div style={{background:zC+"22",border:"1px solid "+zC+"44",borderRadius:8,padding:"4px 9px",display:"flex",flexDirection:"column",alignItems:"center"}}><span style={{color:zC,fontFamily:"monospace",fontSize:7,fontWeight:700,letterSpacing:1,textTransform:"uppercase",lineHeight:1}}>fc</span><span style={{color:zC,fontWeight:800,fontSize:11,fontFamily:"'Space Grotesk',sans-serif"}}>{gCad}</span></div>
            </div>
          </div>
          <div style={{background:"linear-gradient(160deg,#06071a,#0c0830)",borderRadius:20,padding:"20px 18px",marginBottom:11,border:"1px solid "+C.violet+"22",textAlign:"center",position:"relative",overflow:"hidden"}}>
            <p style={{color:C.tm,fontFamily:"monospace",fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:1.5,margin:"0 0 5px",position:"relative"}}>tempo de corrida</p>
            <p style={{color:C.tp,fontFamily:"'Space Grotesk',sans-serif",fontSize:50,fontWeight:800,margin:"0 0 3px",letterSpacing:-2,lineHeight:1,position:"relative"}}>{fmtT(gSeg)}</p>
            <p style={{color:C.cyanB,fontSize:12,fontWeight:600,margin:0,position:"relative"}}>{gStatus==="ativo"?"Em andamento":gStatus==="pausado"?"Pausado":"Pronto"}</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:10}}>
            {[{v:gKm.toFixed(2),u:"km",c:C.cyanB,l:"distância"},{v:pace,u:"/km",c:C.cyan,l:"pace"},{v:gCad>0?""+gCad:"--",u:"spm",c:C.cyanB,l:"cadência"}].map((m,i)=>(
              <div key={i} style={{background:"linear-gradient(135deg,"+C.s1+","+C.s2+")",borderRadius:12,padding:"10px 8px",textAlign:"center",border:"1px solid "+m.c+"22"}}>
                <p style={{color:m.c,fontFamily:"monospace",fontWeight:700,fontSize:8,textTransform:"uppercase",letterSpacing:1.1,margin:"0 0 4px",opacity:0.8}}>{m.l}</p>
                <p style={{color:m.c,fontFamily:"'Space Grotesk',sans-serif",fontWeight:800,fontSize:18,margin:"0 0 1px",letterSpacing:-0.5}}>{m.v}</p>
                <p style={{color:C.td,fontSize:9,fontWeight:600,textTransform:"uppercase",letterSpacing:0.4,margin:0,fontFamily:"monospace"}}>{m.u}</p>
              </div>
            ))}
          </div>
          <div style={{background:C.s1,borderRadius:15,overflow:"hidden",marginBottom:10,border:"1px solid "+C.violet+"33"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 11px 6px"}}>
              <p style={{color:gpsStatus==="active"?C.cyanB:gpsStatus==="searching"?C.amber:C.ts,fontFamily:"monospace",fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:1.2,margin:0}}>{gpsStatus==="active"?`GPS · ±${gpsAccuracy||"?"}m`:gpsStatus==="searching"?"GPS · buscando sinal...":gpsStatus==="error"?"GPS · sem sinal":"GPS · mapa ao vivo"}</p>
            </div>
            <LiveMap route={[...routeRef.current]} gpsStatus={gpsStatus} accuracy={gpsAccuracy} tick={routeTick}/>
          </div>
          <div style={{display:"flex",gap:8,marginTop:"auto"}}>
            {gStatus==="ativo"?(<><button onClick={pausar} style={{flex:1,background:C.s2,color:C.amber,border:"2px solid "+C.amber+"44",borderRadius:13,padding:"13px 0",fontWeight:800,fontSize:14,cursor:"pointer",fontFamily:"'Space Grotesk',sans-serif"}}>PAUSAR</button><button onClick={finalizar} style={{flex:1,background:"linear-gradient(135deg,#7f1d1d,"+C.coral+")",color:"#fff",border:"none",borderRadius:13,padding:"13px 0",fontWeight:800,fontSize:14,cursor:"pointer",fontFamily:"'Space Grotesk',sans-serif"}}>FINALIZAR</button></>)
            :gStatus==="pausado"?(<><button onClick={retomar} style={{flex:2,background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",color:"#fff",border:"none",borderRadius:13,padding:"13px 0",fontWeight:800,fontSize:14,cursor:"pointer",fontFamily:"'Space Grotesk',sans-serif"}}>RETOMAR</button><button onClick={finalizar} style={{flex:1,background:C.s2,color:C.coral,border:"2px solid "+C.coral+"44",borderRadius:13,padding:"13px 0",fontWeight:800,fontSize:13,cursor:"pointer",fontFamily:"'Space Grotesk',sans-serif"}}>FIM</button></>)
            :(<button onClick={()=>iniciar()} style={{flex:1,background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",color:"#fff",border:"none",borderRadius:13,padding:"13px 0",fontWeight:800,fontSize:15,cursor:"pointer",fontFamily:"'Space Grotesk',sans-serif",boxShadow:"0 4px 20px "+C.violet+"44"}}>INICIAR</button>)}
          </div>
        </div>
      );
    }

    // Tela principal do Treino
    return (
      <div>
        {/* Header */}
        <div style={{paddingTop:8,paddingBottom:12,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <h1 style={{color:C.tp,fontFamily:"'Space Grotesk',sans-serif",fontSize:22,margin:0,fontWeight:800}}>Treino</h1>
          <span style={{background:C.s2,border:"1px solid "+C.border,borderRadius:10,padding:"4px 10px",color:C.tm,fontSize:12,fontWeight:600,fontFamily:"monospace"}}>
            {new Date().toLocaleDateString("pt-BR",{weekday:"short",day:"numeric",month:"short"}).replace(".","")}
          </span>
        </div>

        {/* Treinos Concluídos */}
        <div style={{background:C.s1,borderRadius:14,marginBottom:10,border:"1px solid "+C.border,overflow:"hidden"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px 10px"}}>
            <div style={{display:"flex",alignItems:"center",gap:7}}>
              <Ic n="trophy" z={13} c={C.ts}/>
              <span style={{color:C.ts,fontFamily:"monospace",fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:0.5}}>Treinos Concluídos</span>
            </div>
            <div style={{display:"flex",gap:6}}>
              <button onClick={()=>{setShowStravaModal&&setShowStravaModal(true);}} style={{background:stravaConnected?"#fc4c0222":"#fc4c0211",border:"1px solid #fc4c0244",borderRadius:8,padding:"4px 9px",cursor:"pointer",display:"flex",alignItems:"center",gap:4}}>
                <div style={{width:6,height:6,borderRadius:3,background:stravaConnected?"#fc4c02":C.td}}/>
                <span style={{color:stravaConnected?"#fc4c02":C.td,fontSize:11,fontWeight:700}}>Strava</span>
              </button>
              <button onClick={()=>setShowGarminModal(true)} style={{background:garminConnected?"#009CDE22":"#1a1f4a",border:"1px solid "+(garminConnected?"#009CDE44":C.border),borderRadius:8,padding:"4px 9px",cursor:"pointer",display:"flex",alignItems:"center",gap:4}}>
                <Ic n="watch" z={11} c={garminConnected?"#009CDE":C.td}/>
                <span style={{color:garminConnected?"#009CDE":C.td,fontSize:11,fontWeight:700}}>Garmin</span>
              </button>
            </div>
          </div>
          {corridas.length===0&&stravaRuns.length===0?(
            <div style={{textAlign:"center",padding:"14px 14px 18px"}}>
              <p style={{color:C.tm,fontSize:13,margin:"0 0 3px"}}>Nenhum treino ainda</p>
              <p style={{color:C.td,fontSize:11,margin:0}}>Finalize seu primeiro treino abaixo</p>
            </div>
          ):(
            <div style={{paddingBottom:8}}>
              {[...corridas,...stravaRuns].sort((a,b)=>new Date(b.timestamp)-new Date(a.timestamp)).slice(0,5).map((r,i)=>(
                <div key={i} onClick={()=>setSelectedRun&&setSelectedRun(r)} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 14px",borderTop:i>0?"1px solid "+C.border:"none",cursor:"pointer"}}>
                  <div style={{width:34,height:34,borderRadius:10,background:r.source==="strava"?"#fc4c0222":C.violet+"22",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <span style={{color:r.source==="strava"?"#fc4c02":C.violetL,fontWeight:800,fontSize:12,fontFamily:"'Space Grotesk',sans-serif"}}>S</span>
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                      <p style={{color:C.tp,fontWeight:700,fontSize:13,margin:0,fontFamily:"'Space Grotesk',sans-serif",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.nome}</p>
                      {r.source==="strava"&&<span style={{color:"#fc4c02",fontSize:9,fontWeight:800,fontFamily:"monospace",letterSpacing:0.5}}>STRAVA</span>}
                    </div>
                    <p style={{color:C.tm,fontSize:11,margin:0}}>{r.distancia_km}km · {r.pace_medio}/km · {r.data}</p>
                  </div>
                  <div style={{textAlign:"right",flexShrink:0}}>
                    <p style={{color:C.ts,fontSize:11,margin:"0 0 2px"}}>▲{r.dplus||0}m</p>
                    <Ic n="chevron-right" z={13} c={C.td}/>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Ver Plano Completo */}
        <div onClick={()=>setSubScreen("verPlano")} style={{background:"linear-gradient(135deg,"+C.s1+","+C.s2+")",borderRadius:14,padding:"14px 16px",marginBottom:10,border:"1px solid "+C.violet+"33",cursor:"pointer",display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:42,height:42,borderRadius:12,background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <Ic n="report" z={20} c="#fff"/>
          </div>
          <div style={{flex:1}}>
            <p style={{color:C.tp,fontWeight:700,fontSize:15,margin:"0 0 2px",fontFamily:"'Space Grotesk',sans-serif"}}>Ver Plano Completo</p>
            <p style={{color:C.tm,fontSize:12,margin:0}}>{savedPlan?.tipo==="macro"?(savedPlan.titulo||"Meu Plano")+" · "+(savedPlan.semanas_macro?.length||0)+" semanas":savedPlan?.plano?.length?(savedPlan.titulo||"Plano IA")+" · "+savedPlan.plano.length+" dias":"Crie um plano personalizado"}</p>
          </div>
          <Ic n="chevron-right" z={18} c={C.td}/>
        </div>

        {/* Treino do dia */}
        {(()=>{
          const hoje = new Date();
          const diasSemana = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"];
          const diaHoje = diasSemana[hoje.getDay()];
          const abrev = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"][hoje.getDay()];
          const dataStr = hoje.toLocaleDateString("pt-BR",{weekday:"long",day:"numeric",month:"long"});
          const treino = savedPlan?.plano?.find(d=>
            d.dia?.toLowerCase().includes(abrev.toLowerCase())||
            d.dia?.toLowerCase().includes(diaHoje.toLowerCase().slice(0,3))
          );
          const isDescanso = !treino||treino.distancia_km===0||treino.tipo?.toLowerCase().includes("descanso");
          const tipoColor = isDescanso?C.td:
            treino?.tipo?.toLowerCase().includes("interval")||treino?.tipo?.toLowerCase().includes("tiro")?C.coral:
            treino?.tipo?.toLowerCase().includes("longo")||treino?.tipo?.toLowerCase().includes("long")?C.amber:
            treino?.tipo?.toLowerCase().includes("tempo")?C.violetL:C.cyanB;
          return (
            <div style={{background:C.s1,borderRadius:14,marginBottom:10,overflow:"hidden",border:"1px solid "+C.border}}>
              <div style={{padding:"10px 14px 8px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <p style={{color:C.ts,fontFamily:"monospace",fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:0.5,margin:0}}>Treino de hoje</p>
                <p style={{color:C.td,fontSize:11,margin:0}}>{dataStr.charAt(0).toUpperCase()+dataStr.slice(1)}</p>
              </div>
              {isDescanso?(
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 14px 14px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:12}}>
                    <div style={{width:4,height:44,borderRadius:2,background:C.td,flexShrink:0}}/>
                    <div>
                      <p style={{color:C.tm,fontWeight:700,fontSize:16,margin:"0 0 3px",fontFamily:"'Space Grotesk',sans-serif"}}>😴 Descanso</p>
                      <p style={{color:C.td,fontSize:12,margin:0}}>Recuperação ativa ou repouso total</p>
                    </div>
                  </div>
                  <button onClick={()=>{const idx=savedPlan?.plano?.findIndex(d=>d.dia?.toLowerCase().includes(abrev.toLowerCase())||d.dia?.toLowerCase().includes(diaHoje.toLowerCase().slice(0,3)));setAddTreinoDia(idx>=0?idx:0);setAddStep("tipo");setAddTipo(null);setAddSubtipo(null);setShowAddTreino(true);}} style={{background:C.s2,border:"1px solid "+C.border,borderRadius:10,padding:"7px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:5,flexShrink:0}}>
                    <Ic n="plus" z={13} c={C.tm}/>
                    <span style={{color:C.tm,fontSize:12,fontWeight:600}}>Adicionar</span>
                  </button>
                </div>
              ):(
                <div style={{padding:"0 14px 14px"}}>
                  <div style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom:10}}>
                    <div style={{width:4,borderRadius:2,background:tipoColor,flexShrink:0,alignSelf:"stretch",minHeight:44}}/>
                    <div style={{flex:1}}>
                      <p style={{color:C.tp,fontWeight:800,fontSize:18,margin:"0 0 3px",fontFamily:"'Space Grotesk',sans-serif"}}>{treino.tipo}</p>
                      {treino.descricao&&<p style={{color:C.tm,fontSize:12,margin:"0 0 7px",lineHeight:1.4}}>{treino.descricao}</p>}
                      <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                        {treino.distancia_km>0&&<span style={{background:tipoColor+"22",color:tipoColor,border:"1px solid "+tipoColor+"44",borderRadius:8,padding:"3px 9px",fontSize:12,fontWeight:700}}>{treino.distancia_km}km</span>}
                        {treino.pace_alvo&&treino.pace_alvo!=="—"&&<span style={{background:C.s2,color:C.tm,border:"1px solid "+C.border,borderRadius:8,padding:"3px 9px",fontSize:12,fontWeight:600}}>{treino.pace_alvo}</span>}
                      </div>
                    </div>
                    <div style={{width:22,height:22,borderRadius:6,border:"1.5px solid "+C.border,flexShrink:0,marginTop:2}}/>
                  </div>
                  <button onClick={()=>{
                    setSelectedTreino({
                      nome: treino.tipo,
                      tipo: treino.tipo,
                      km: treino.distancia_km+"km",
                      dur: treino.duracao_min?treino.duracao_min+"min":"—",
                      intensidade: treino.tipo?.toLowerCase().includes("interval")||treino.tipo?.toLowerCase().includes("forte")?"alta":"moderada",
                      semana: 1,
                      descricao: treino.descricao||""
                    });
                    setSubScreen("gravacao");
                  }} style={{width:"100%",background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",color:"#fff",border:"none",borderRadius:11,padding:"12px 0",fontWeight:800,fontSize:14,cursor:"pointer",fontFamily:"'Space Grotesk',sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:8,boxShadow:"0 4px 16px "+C.violet+"44"}}>
                    ▶ Iniciar este treino
                  </button>
                </div>
              )}
            </div>
          );
        })()}

        {/* Coach Tempo */}
        <div style={{background:"linear-gradient(135deg,#0c0830,#0a1430)",borderRadius:14,padding:"14px 16px",marginBottom:10,border:"1px solid "+C.cyanB+"33"}}>
          <p style={{color:C.cyanB,fontFamily:"monospace",fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:0.5,margin:"0 0 6px"}}>Coach Tempo</p>
          <p style={{color:C.ts,fontSize:13,margin:"0 0 10px",lineHeight:1.5}}>Hoje focamos em velocidade de limiar. Execute em ~5:10/km.</p>
          <button onClick={()=>{setPlanScreen("form");setSubScreen("plano");}} style={{width:"100%",background:C.s2,color:C.cyanB,border:"1px solid "+C.cyanB+"33",borderRadius:10,padding:"10px 0",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginBottom:8}}>
            <Ic n="ai" z={14} c={C.cyanB}/>Criar plano com IA
          </button>
          <button onClick={()=>setSubScreen("gravacao")} style={{width:"100%",background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",color:"#fff",border:"none",borderRadius:10,padding:"12px 0",fontWeight:800,fontSize:15,cursor:"pointer",fontFamily:"'Space Grotesk',sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:8,boxShadow:"0 4px 20px "+C.violet+"44",letterSpacing:0.3}}>
            <Ic n="run" z={18} c="#fff"/>Treino livre
          </button>
        </div>

        {/* Chat com Coach */}
        <div style={{background:C.s1,borderRadius:14,padding:"14px 16px",border:"1px solid "+C.border}}>
          <p style={{color:C.ts,fontFamily:"monospace",fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:0.5,margin:"0 0 8px"}}>Chat com Coach Tempo</p>
          {coachMsgs.slice(-2).map((m,i)=>(
            <div key={i} style={{marginBottom:6,textAlign:m.from==="user"?"right":"left"}}>
              <span style={{background:m.from==="user"?"linear-gradient(135deg,"+C.violet+","+C.cyan+")":C.s2,color:C.tp,fontSize:12,padding:"6px 10px",borderRadius:10,display:"inline-block",maxWidth:"85%",lineHeight:1.4}}>{m.text}</span>
            </div>
          ))}
          <div style={{display:"flex",gap:7,marginTop:8}}>
            <input value={coachIn} onChange={e=>setCoachIn(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendCoach()} placeholder="Pergunta ao Coach..." style={{flex:1,background:C.s3,border:"1px solid "+C.border,borderRadius:10,padding:"9px 11px",color:C.tp,fontSize:13,outline:"none",fontFamily:"inherit"}}/>
            <button onClick={sendCoach} style={{background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",color:"#fff",border:"none",borderRadius:10,width:40,height:40,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic n="send" z={15} c="#fff"/></button>
          </div>
        </div>
      </div>
    );
  }

  // ── ANÁLISE ─────────────────────────────────────────────────────────────────
  function renderAnalise() {
    if(anStep==="upload") return (
      <div>
        <div style={{paddingTop:8,paddingBottom:12}}>
          <Badge text="ANÁLISE TÉCNICA · IA" color={C.violet}/>
          <h1 style={{color:C.tp,margin:"7px 0 3px",fontFamily:"'Space Grotesk',sans-serif",fontSize:21}}>Análise biomecânica</h1>
          <p style={{color:C.tm,fontSize:12,margin:0}}>Envie um vídeo de até 30 segundos da sua corrida</p>
        </div>
        <div style={{background:"linear-gradient(135deg,#0c0830,#0a1430)",border:"1px solid "+C.violet+"44",borderRadius:15,padding:13,marginBottom:14,display:"flex",gap:10,alignItems:"flex-start"}}>
          <div style={{width:32,height:32,borderRadius:10,background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic n="ai" z={17} c="#fff"/></div>
          <div>
            <p style={{color:C.cyanB,fontFamily:"monospace",fontSize:10,margin:"0 0 5px",fontWeight:700,textTransform:"uppercase",letterSpacing:0.5}}>Coach TEMPO</p>
            <p style={{color:C.ts,fontSize:13,margin:0,lineHeight:1.5}}>Filme sua corrida de lado, em terreno plano e bem iluminado. Capture pelo menos 8 ciclos de passada.</p>
          </div>
        </div>
        <label style={{display:"block",background:"linear-gradient(135deg,"+C.s1+","+C.s2+")",border:"2px dashed "+C.violet+"66",borderRadius:14,padding:"24px 20px",textAlign:"center",cursor:"pointer",marginBottom:11}}>
          <input type="file" accept="video/*" onChange={handleVideoUpload} style={{display:"none"}}/>
          <Ic n="upload" z={32} c={C.violet}/>
          <p style={{color:C.tp,fontWeight:700,fontSize:14,margin:"9px 0 4px",fontFamily:"'Space Grotesk',sans-serif"}}>Toque para enviar vídeo</p>
          <p style={{color:C.tm,fontSize:11,margin:0}}>MP4, MOV · até 30 segundos · max 100MB</p>
        </label>
        <div style={{background:C.s1,borderRadius:12,padding:13,border:"1px solid "+C.border}}>
          <p style={{color:C.ts,fontFamily:"monospace",fontSize:10,fontWeight:700,margin:"0 0 8px",textTransform:"uppercase",letterSpacing:0.5}}>O que será avaliado</p>
          {[
            {n:"Elevação Vertical",d:"Oscilação do tronco durante a corrida"},
            {n:"Tamanho da Passada × Pace",d:"Relação entre comprimento e ritmo"},
            {n:"Aterrissagem em relação ao CG",d:"Como o pé toca o solo"},
            {n:"Overstriding",d:"Pé aterrissando à frente do quadril"},
          ].map((m,i)=>(
            <div key={i} style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:6}}>
              <div style={{width:18,height:18,borderRadius:5,background:C.cyanB+"22",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}><Ic n="check" z={11} c={C.cyanB}/></div>
              <div><p style={{color:C.tp,fontWeight:600,fontSize:12,margin:0}}>{m.n}</p><p style={{color:C.td,fontSize:11,margin:"1px 0 0"}}>{m.d}</p></div>
            </div>
          ))}
        </div>
      </div>
    );
    if(anStep==="info") return (
      <div>
        <div style={{paddingTop:8,paddingBottom:12,display:"flex",alignItems:"center",gap:10}}>
          <button onClick={()=>setAnStep("upload")} style={{background:C.s2,border:"1px solid "+C.border,borderRadius:9,padding:"6px 11px",cursor:"pointer",display:"flex",alignItems:"center"}}><Ic n="back" z={13} c={C.ts}/></button>
          <h1 style={{color:C.tp,fontFamily:"'Space Grotesk',sans-serif",fontSize:20,margin:0}}>Dados complementares</h1>
        </div>
        <div style={{background:"linear-gradient(135deg,"+C.s1+","+C.s2+")",border:"1px solid "+C.violet+"33",borderRadius:13,padding:12,marginBottom:14,display:"flex",gap:10,alignItems:"center"}}>
          <div style={{width:32,height:32,borderRadius:9,background:C.violet+"22",display:"flex",alignItems:"center",justifyContent:"center"}}><Ic n="video" z={17} c={C.violet}/></div>
          <div style={{flex:1,minWidth:0}}>
            <p style={{color:C.tp,fontWeight:700,fontSize:12,margin:0,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{anVideo.name}</p>
            <p style={{color:C.tm,fontSize:11,margin:"2px 0 0",fontFamily:"monospace"}}>{anVideo.duration}s · {anVideo.size}MB</p>
          </div>
        </div>
        {[{label:"Cadência média (spm)",k:"cadencia",ph:"Ex: 170"},{label:"Pace médio (min:seg/km)",k:"pace_medio",ph:"Ex: 5:30"},{label:"Distância (km)",k:"distancia",ph:"Ex: 10"},{label:"Lesões recentes (opcional)",k:"lesoes",ph:"Ex: tendinite no joelho"}].map((f,i)=>(
          <div key={i} style={{marginBottom:11}}>
            <p style={{color:C.ts,fontFamily:"monospace",fontSize:10,fontWeight:700,margin:"0 0 5px",textTransform:"uppercase",letterSpacing:0.3}}>{f.label}</p>
            <input value={anInfo[f.k]} onChange={e=>setAnInfo(p=>({...p,[f.k]:e.target.value}))} placeholder={f.ph} style={{width:"100%",background:C.s2,border:"1px solid "+C.border,borderRadius:11,padding:"10px 12px",color:C.tp,fontSize:13,outline:"none",fontFamily:"inherit",boxSizing:"border-box"}}/>
          </div>
        ))}
        <button onClick={gerarAnalise} style={{width:"100%",background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",color:"#fff",border:"none",borderRadius:13,padding:"14px 0",fontWeight:800,fontSize:15,cursor:"pointer",fontFamily:"'Space Grotesk',sans-serif",letterSpacing:0.3,display:"flex",alignItems:"center",justifyContent:"center",gap:10,boxShadow:"0 4px 20px "+C.violet+"44",marginTop:6}}><Ic n="ai" z={18} c="#fff"/>ANALISAR VÍDEO</button>
      </div>
    );
    if(anStep==="loading") return (
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:520,gap:20}}>
        <div style={{width:70,height:70,borderRadius:20,background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 10px 35px "+C.violet+"66"}}><Ic n="ai" z={38} c="#fff"/></div>
        <div style={{textAlign:"center"}}>
          <p style={{color:C.tp,fontWeight:700,fontSize:17,fontFamily:"'Space Grotesk',sans-serif",margin:"0 0 6px"}}>Analisando biomecânica...</p>
          <p style={{color:C.tm,fontSize:12,margin:"0 0 12px"}}>Avaliando 4 métricas técnicas</p>
          <Dots color={C.cyanB}/>
        </div>
      </div>
    );
    if(anStep==="result"&&anData) return (
      <div>
        <div style={{paddingTop:8,paddingBottom:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <Badge text="ANÁLISE TÉCNICA" color={C.violet}/>
            <h1 style={{color:C.tp,margin:"7px 0 3px",fontFamily:"'Space Grotesk',sans-serif",fontSize:20}}>Relatório biomecânico</h1>
          </div>
          <button onClick={()=>setAnStep("upload")} style={{background:C.s2,border:"1px solid "+C.border,borderRadius:9,padding:"6px 11px",cursor:"pointer",display:"flex",alignItems:"center",gap:5}}><Ic n="upload" z={13} c={C.ts}/></button>
        </div>

        <div style={{background:"linear-gradient(135deg,#0c0830,#0a1430)",border:"1px solid "+C.violet+"44",borderRadius:17,padding:"18px 16px",marginBottom:13,textAlign:"center",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:-30,left:"50%",transform:"translateX(-50%)",width:200,height:80,borderRadius:"50%",background:C.violet+"22",filter:"blur(25px)",pointerEvents:"none"}}/>
          <p style={{color:C.cyanB,fontFamily:"monospace",fontSize:10,fontWeight:700,letterSpacing:1,textTransform:"uppercase",margin:"0 0 7px",position:"relative"}}>Índice Técnico</p>
          <div style={{display:"flex",justifyContent:"center",alignItems:"baseline",gap:6,position:"relative",marginBottom:5}}>
            <span style={{color:C.tp,fontFamily:"'Space Grotesk',sans-serif",fontSize:54,fontWeight:800,letterSpacing:-2,lineHeight:1}}>{anData.indice_tecnica}</span>
            <span style={{color:C.tm,fontSize:18,fontWeight:600}}>/100</span>
          </div>
          <Badge text={anData.classificacao} color={C.cyanB}/>
        </div>

        <SL><Ic n="bars" z={13} c={C.ts}/>Métricas avaliadas</SL>
        {anData.metricas.map((m)=>{
          const cor = colorStatus(m.cor_status);
          const fig = m.id===1?"vertical":m.id===2?"stride":m.id===3?"landing":"overstride";
          return (
            <div key={m.id} style={{background:"linear-gradient(135deg,"+C.s1+","+C.s2+")",border:"1px solid "+cor+"33",borderRadius:13,padding:12,marginBottom:9}}>
              <div style={{display:"flex",gap:11,alignItems:"flex-start"}}>
                <div style={{flexShrink:0,background:cor+"11",borderRadius:8,padding:4,border:"1px solid "+cor+"22"}}>
                  <RunnerFig highlight={fig} size={50}/>
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4,gap:8}}>
                    <p style={{color:C.tp,fontWeight:700,fontSize:13,margin:0,fontFamily:"'Space Grotesk',sans-serif",lineHeight:1.3}}>{m.nome}</p>
                    <Badge text={m.status} color={cor}/>
                  </div>
                  <div style={{display:"flex",gap:8,marginBottom:5}}>
                    <span style={{color:cor,fontWeight:800,fontSize:13,fontFamily:"'Space Grotesk',sans-serif"}}>{m.valor}</span>
                    <span style={{color:C.tg,fontSize:11,fontFamily:"monospace"}}>ideal: {m.ideal}</span>
                  </div>
                  <p style={{color:C.tm,fontSize:11,margin:0,lineHeight:1.55}}>{m.descricao}</p>
                </div>
              </div>
            </div>
          );
        })}

        <div style={{background:"linear-gradient(135deg,"+C.s1+","+C.s2+")",borderRadius:13,padding:13,marginBottom:12,border:"1px solid "+C.cyanB+"33"}}>
          <p style={{color:C.cyanB,fontFamily:"monospace",fontSize:10,fontWeight:700,margin:"0 0 7px",textTransform:"uppercase",letterSpacing:0.5}}>Resumo do TEMPO</p>
          <p style={{color:C.ts,fontSize:13,margin:0,lineHeight:1.6}}>{anData.resumo}</p>
        </div>

        <div style={{display:"flex",background:C.s2,borderRadius:10,padding:3,marginBottom:12,gap:2}}>
          {[{id:"drills",l:"Drills"},{id:"treino",l:"Treino"},{id:"cues",l:"Cues"},{id:"plano",l:"Plano 4 sem"}].map(t=>(
            <button key={t.id} onClick={()=>setAnTab(t.id)} style={{flex:1,background:anTab===t.id?"linear-gradient(135deg,"+C.violet+"44,"+C.cyan+"22)":"transparent",color:anTab===t.id?C.tp:C.tm,border:"none",borderRadius:8,padding:"7px 0",fontWeight:700,fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>{t.l}</button>
          ))}
        </div>

        {anTab==="drills"&&(
          <div>
            {anData.drills.map((d,i)=>(
              <div key={i} style={{background:"linear-gradient(135deg,"+C.s1+","+C.s2+")",borderRadius:12,padding:"10px 12px",marginBottom:7,border:"1px solid "+C.border}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:3,gap:8}}>
                  <p style={{color:C.tp,fontWeight:700,fontSize:13,margin:0}}>{d.nome}</p>
                  <Badge text={d.duracao} color={C.cyanB}/>
                </div>
                <p style={{color:C.tm,fontSize:11,margin:0,lineHeight:1.5}}>{d.descricao}</p>
              </div>
            ))}
          </div>
        )}

        {anTab==="treino"&&anData.treino_tecnico&&(
          <div style={{background:"linear-gradient(135deg,"+C.s1+","+C.s2+")",borderRadius:13,padding:14,border:"1px solid "+C.violet+"33"}}>
            <p style={{color:C.violetL,fontFamily:"monospace",fontSize:10,fontWeight:700,margin:"0 0 8px",textTransform:"uppercase",letterSpacing:0.5}}>Treino Técnico Sugerido</p>
            <p style={{color:C.tp,fontSize:13,margin:"0 0 12px",lineHeight:1.6}}>{anData.treino_tecnico.descricao}</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:7,marginBottom:11}}>
              {[{l:"Séries",v:anData.treino_tecnico.series,c:C.violetL},{l:"Duração",v:anData.treino_tecnico.duracao_s+"s",c:C.cyanB},{l:"Recup.",v:"60s",c:C.amber}].map((s,i)=>(
                <div key={i} style={{background:C.s3,borderRadius:9,padding:"9px 8px",textAlign:"center",border:"1px solid "+s.c+"22"}}>
                  <p style={{color:s.c,fontFamily:"monospace",fontWeight:700,fontSize:8,textTransform:"uppercase",letterSpacing:0.8,margin:"0 0 3px",opacity:0.8}}>{s.l}</p>
                  <p style={{color:s.c,fontFamily:"'Space Grotesk',sans-serif",fontWeight:800,fontSize:18,margin:0,letterSpacing:-0.5}}>{s.v}</p>
                </div>
              ))}
            </div>
            <p style={{color:C.tm,fontSize:11,margin:0,fontStyle:"italic"}}>Recuperação: {anData.treino_tecnico.recuperacao}</p>
          </div>
        )}

        {anTab==="cues"&&(
          <div>
            {anData.cues.map((c,i)=>(
              <div key={i} style={{background:"linear-gradient(135deg,"+C.s1+","+C.s2+")",borderRadius:12,padding:"11px 13px",marginBottom:7,border:"1px solid "+C.border,display:"flex",alignItems:"center",gap:11}}>
                <div style={{width:24,height:24,borderRadius:7,background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <span style={{color:"#fff",fontWeight:800,fontSize:12,fontFamily:"'Space Grotesk',sans-serif"}}>{i+1}</span>
                </div>
                <p style={{color:C.tp,fontSize:13,margin:0,fontWeight:600,lineHeight:1.4,flex:1}}>{c}</p>
              </div>
            ))}
          </div>
        )}

        {anTab==="plano"&&(
          <div>
            {anData.plano_4sem.map((s)=>(
              <div key={s.semana} style={{background:"linear-gradient(135deg,"+C.s1+","+C.s2+")",borderRadius:12,padding:12,marginBottom:8,border:"1px solid "+C.border}}>
                <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:6}}>
                  <div style={{background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",borderRadius:8,padding:"3px 9px"}}>
                    <span style={{color:"#fff",fontWeight:800,fontSize:11,fontFamily:"'Space Grotesk',sans-serif"}}>S{s.semana}</span>
                  </div>
                  <span style={{color:C.cyanB,fontWeight:700,fontSize:13,fontFamily:"'Space Grotesk',sans-serif"}}>{s.foco}</span>
                </div>
                <p style={{color:C.tm,fontSize:12,margin:0,lineHeight:1.55}}>{s.descricao}</p>
              </div>
            ))}
          </div>
        )}

        <div style={{background:C.s1,border:"1px solid "+C.amber+"33",borderRadius:11,padding:"10px 12px",margin:"14px 0 6px",display:"flex",gap:9,alignItems:"flex-start"}}>
          <Ic n="warning" z={16} c={C.amber} st={{flexShrink:0,marginTop:2}}/>
          <p style={{color:C.tm,fontSize:11,margin:0,lineHeight:1.5}}>Esta análise é educativa e não substitui avaliação presencial de um fisioterapeuta esportivo ou profissional habilitado.</p>
        </div>
      </div>
    );
    return null;
  }

  // ── EXPLORAR ────────────────────────────────────────────────────────────────
  function renderExplorar() {
    if(subScreen==="provaAmbiente"&&provaAmb) return (
      <div>
        <div style={{paddingTop:8,paddingBottom:12,display:"flex",alignItems:"center",gap:10}}>
          <button onClick={()=>setSubScreen(null)} style={{background:C.s2,border:"1px solid "+C.border,borderRadius:9,padding:"6px 11px",cursor:"pointer",display:"flex",alignItems:"center"}}><Ic n="back" z={13} c={C.ts}/></button>
          <div style={{flex:1,minWidth:0}}>
            <Badge text="MINHA PROVA" color={provaAmb.prova.cor}/>
            <p style={{color:C.tp,fontWeight:700,fontSize:14,margin:"5px 0 0",fontFamily:"'Space Grotesk',sans-serif",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{provaAmb.prova.nome}</p>
          </div>
        </div>

        <div style={{background:"linear-gradient(135deg,"+C.s1+","+C.s2+")",borderRadius:14,padding:13,marginBottom:13,border:"1px solid "+provaAmb.prova.cor+"33"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:11}}>
            <div style={{flex:1}}>
              <p style={{color:C.tp,fontWeight:700,fontSize:15,margin:0,fontFamily:"'Space Grotesk',sans-serif"}}>{provaAmb.prova.data} · {provaAmb.prova.local}</p>
              <p style={{color:C.tm,fontSize:11,margin:"3px 0 0"}}>{provaAmb.prova.tipo} · {provaAmb.prova.dist.join(", ")}</p>
            </div>
            <a href={provaAmb.prova.link} target="_blank" rel="noopener noreferrer" style={{background:provaAmb.prova.cor+"22",border:"1px solid "+provaAmb.prova.cor+"55",borderRadius:9,padding:"7px 10px",display:"flex",alignItems:"center",gap:5,textDecoration:"none"}}>
              <Ic n="link" z={13} c={provaAmb.prova.cor}/>
              <span style={{color:provaAmb.prova.cor,fontSize:11,fontWeight:700}}>Inscrição</span>
            </a>
          </div>
        </div>

        <SL><Ic n="bib" z={13} c={C.ts}/>Após a prova: encontre suas fotos</SL>
        <div style={{background:"linear-gradient(135deg,"+C.s1+","+C.s2+")",borderRadius:13,padding:13,marginBottom:13,border:"1px solid "+C.cyanB+"33"}}>
          <p style={{color:C.tm,fontSize:12,margin:"0 0 9px",lineHeight:1.5}}>Digite seu número de peito para a IA buscar suas fotos nos principais sites.</p>
          <div style={{display:"flex",gap:7}}>
            <input value={numPeito} onChange={e=>setNumPeito(e.target.value)} placeholder="Número de peito" style={{flex:1,background:C.s3,border:"1px solid "+C.border,borderRadius:10,padding:"10px 12px",color:C.tp,fontSize:14,fontFamily:"monospace",outline:"none",letterSpacing:1}}/>
            <button onClick={buscarFotos} disabled={buscFotos||!numPeito.trim()} style={{background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",color:"#fff",border:"none",borderRadius:10,padding:"10px 14px",fontWeight:700,fontSize:13,cursor:numPeito.trim()?"pointer":"not-allowed",fontFamily:"'Space Grotesk',sans-serif",opacity:buscFotos||!numPeito.trim()?0.5:1,display:"flex",alignItems:"center",gap:6}}>
              {buscFotos?<Dots color="#fff"/>:<><Ic n="photo" z={13} c="#fff"/>Buscar</>}
            </button>
          </div>
          {resFotos&&(
            <div style={{marginTop:11}}>
              {resFotos.sites?.map((s,i)=>(
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" style={{display:"flex",gap:9,padding:"9px 11px",background:C.s3,borderRadius:9,marginBottom:6,textDecoration:"none",alignItems:"center",border:"1px solid "+C.border}}>
                  <div style={{width:30,height:30,borderRadius:7,background:C.violet+"22",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic n="photo" z={15} c={C.violet}/></div>
                  <div style={{flex:1,minWidth:0}}><p style={{color:C.tp,fontWeight:700,fontSize:12,margin:0}}>{s.nome}</p><p style={{color:C.tm,fontSize:10,margin:"2px 0 0"}}>{s.instrucoes}</p></div>
                  <Ic n="link" z={13} c={C.cyanB}/>
                </a>
              ))}
              {resFotos.dica_geral&&<p style={{color:C.tg,fontSize:11,margin:"9px 0 0",fontStyle:"italic",lineHeight:1.5}}>💡 {resFotos.dica_geral}</p>}
            </div>
          )}
        </div>

        <SL><Ic n="run" z={13} c={C.ts}/>Treinos para esta prova ({provaAmb.treinos?.length||0})</SL>
        {provaAmb.treinos?.length?provaAmb.treinos.map((t,i)=>(
          <div key={i} style={{background:C.s1,borderRadius:11,padding:"10px 12px",marginBottom:6,border:"1px solid "+C.border,display:"flex",alignItems:"center",gap:11}}>
            <div style={{width:30,height:30,borderRadius:8,background:C.cyanB+"22",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic n="run" z={15} c={C.cyanB}/></div>
            <div style={{flex:1,minWidth:0}}>
              <p style={{color:C.tp,fontWeight:700,fontSize:12,margin:0,fontFamily:"'Space Grotesk',sans-serif"}}>{t.distancia_km}km · {t.pace_medio}/km</p>
              <p style={{color:C.tm,fontSize:10,margin:"2px 0 0",fontFamily:"monospace"}}>{t.data}</p>
            </div>
          </div>
        )):(
          <div style={{background:C.s1,borderRadius:11,padding:13,textAlign:"center",border:"1px dashed "+C.border}}>
            <p style={{color:C.tm,fontSize:12,margin:0}}>Nenhum treino vinculado ainda</p>
            <p style={{color:C.td,fontSize:11,margin:"3px 0 0"}}>Inicie um treino para vincular automaticamente</p>
          </div>
        )}
      </div>
    );

    return (
      <div>
        <div style={{paddingTop:8,paddingBottom:12}}>
          <Badge text="DESCOBRIR" color={C.cyan}/>
          <h1 style={{color:C.tp,margin:"7px 0 3px",fontFamily:"'Space Grotesk',sans-serif",fontSize:21}}>Explorar</h1>
          <p style={{color:C.tm,fontSize:12,margin:0}}>Rotas, provas e equipamentos</p>
        </div>
        <div style={{display:"flex",background:C.s2,borderRadius:11,padding:4,marginBottom:14,gap:3}}>
          {[{id:"rotas",l:"Rotas",i:"pin"},{id:"provas",l:"Provas",i:"trophy"},{id:"gear",l:"TempoShop",i:"shoe"}].map(t=>(
            <button key={t.id} onClick={()=>setExplTab(t.id)} style={{flex:1,background:explTab===t.id?"linear-gradient(135deg,"+C.violet+"44,"+C.cyan+"22)":"transparent",color:explTab===t.id?C.tp:C.tm,border:explTab===t.id?"1px solid "+C.violet+"44":"1px solid transparent",borderRadius:8,padding:"8px 0",fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"'Space Grotesk',sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
              <Ic n={t.i} z={13} c={explTab===t.id?C.cyanB:C.tm}/>{t.l}
            </button>
          ))}
        </div>

        {explTab==="rotas"&&(
          <div>
            {[
              {nome:"Trilha do Pico Agudo",local:"Bocaina, SP",dist:"14,5 km",dplus:"720 m",dif:"Forte",cor:C.amber,desc:"Single track técnico com vistas espetaculares no topo."},
              {nome:"Volta do Parque Ibirapuera",local:"São Paulo, SP",dist:"6,3 km",dplus:"32 m",dif:"Fácil",cor:C.cyanB,desc:"Asfalto plano, ideal para velocidade e tempo runs."},
              {nome:"Pico do Olho d'Água",local:"Brumadinho, MG",dist:"18,2 km",dplus:"950 m",dif:"Extremo",cor:C.coral,desc:"Trail técnico com longa subida final e descida íngreme."},
            ].map((r,i)=>(
              <div key={i} style={{background:"linear-gradient(135deg,"+C.s1+","+C.s2+")",borderRadius:13,padding:12,marginBottom:9,border:"1px solid "+r.cor+"33"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                  <div style={{flex:1,minWidth:0}}>
                    <p style={{color:C.tp,fontWeight:700,fontSize:14,margin:0,fontFamily:"'Space Grotesk',sans-serif",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{r.nome}</p>
                    <p style={{color:C.tm,fontSize:11,margin:"2px 0 0"}}>📍 {r.local}</p>
                  </div>
                  <Badge text={r.dif} color={r.cor}/>
                </div>
                <p style={{color:C.tm,fontSize:11,margin:"0 0 8px",lineHeight:1.5}}>{r.desc}</p>
                <div style={{display:"flex",gap:6}}>
                  <Badge text={r.dist} color={C.cyanB}/>
                  <Badge text={"▲ "+r.dplus} color={C.amber}/>
                </div>
              </div>
            ))}
          </div>
        )}

        {explTab==="provas"&&(
          <div>
            {provas_data.map((p)=>(
              <div key={p.id} style={{background:"linear-gradient(135deg,"+C.s1+","+C.s2+")",borderRadius:13,padding:12,marginBottom:9,border:"1px solid "+p.cor+"33"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6,gap:8}}>
                  <div style={{flex:1,minWidth:0}}>
                    <p style={{color:C.tp,fontWeight:700,fontSize:14,margin:0,fontFamily:"'Space Grotesk',sans-serif",lineHeight:1.3}}>{p.nome}</p>
                    <p style={{color:C.tm,fontSize:11,margin:"3px 0 0"}}>📅 {p.data} · 📍 {p.local}</p>
                  </div>
                  {p.itra&&<Badge text={"ITRA "+p.itra} color={C.amber}/>}
                </div>
                <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:9}}>
                  <Badge text={p.tipo} color={p.cor}/>
                  {p.dist.map((d,j)=><Badge key={j} text={d} color={C.cyan}/>)}
                </div>
                <div style={{display:"flex",gap:7}}>
                  <button onClick={()=>selecionarProva(p)} style={{flex:1,background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",color:"#fff",border:"none",borderRadius:10,padding:"9px 0",fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"'Space Grotesk',sans-serif"}}>
                    Treinar para esta prova
                  </button>
                  <a href={p.link} target="_blank" rel="noopener noreferrer" style={{background:C.s3,border:"1px solid "+C.border,borderRadius:10,padding:"9px 12px",display:"flex",alignItems:"center",textDecoration:"none"}}>
                    <Ic n="link" z={14} c={C.cyanB}/>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {explTab==="gear"&&(
          <div>
            <div style={{background:"linear-gradient(135deg,"+C.s1+","+C.s2+")",borderRadius:13,padding:13,marginBottom:11,border:"1px solid "+C.border}}>
              <div style={{display:"flex",gap:11,alignItems:"flex-start",marginBottom:11}}>
                <div style={{width:60,height:60,borderRadius:11,background:C.cyanB+"22",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,border:"1px solid "+C.cyanB+"33"}}>
                  <Ic n="shoe" z={32} c={C.cyanB}/>
                </div>
                <div style={{flex:1}}>
                  <Badge text="RECOMENDADO" color={C.cyanB}/>
                  <p style={{color:C.tp,fontWeight:700,fontSize:14,margin:"5px 0 2px",fontFamily:"'Space Grotesk',sans-serif"}}>Nike Pegasus 40</p>
                  <p style={{color:C.tm,fontSize:11,margin:0,lineHeight:1.4}}>Tênis daily trainer com excelente custo-benefício para o seu volume.</p>
                </div>
              </div>
              <SL><Ic n="link" z={13} c={C.ts}/>Onde comprar</SL>
              {lojaItems.map((l,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:9,padding:"9px 11px",background:C.s3,borderRadius:9,marginBottom:5,border:"1px solid "+(l.ok?C.cyanB+"33":C.border)}}>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",alignItems:"center",gap:5}}>
                      <p style={{color:C.tp,fontWeight:700,fontSize:12,margin:0}}>{l.loja}</p>
                      {l.ok&&<Badge text="Melhor" color={C.cyanB}/>}
                    </div>
                    <p style={{color:C.tm,fontSize:10,margin:"2px 0 0",fontFamily:"monospace"}}>{l.tipo} · {l.frete} · {l.prazo}</p>
                  </div>
                  <p style={{color:l.ok?C.cyanB:C.tp,fontWeight:800,fontSize:13,margin:0,fontFamily:"'Space Grotesk',sans-serif"}}>{l.preco}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }



  // ── CARD CAROUSEL ────────────────────────────────────────────────────────────
  function CardCarousel({ run, C, fmtT, traceStroke="#811df2", isGradient=true }) {
    const [cardIndex, setCardIndex] = useState(0);
    const canvasRef1 = useRef(null); // small map for card 1
    const canvasRef2 = useRef(null); // full map for card 2
    const TOTAL = 5;

    const dist  = run ? run.distancia_km.toFixed(1) : "10.4";
    const pace  = run?.pace_medio  || "5:30";
    const dur   = run ? fmtT(run.duracao_seg) : "54:00";
    const bpm   = run?.bpm_medio   ? run.bpm_medio + "" : "158";
    const dplus = run?.dplus       ? run.dplus + "m"    : "128m";
    const data  = run?.data        || "Hoje";

    const NEON = { route:"#a855f7", glow:"#7c3aed", bg:"#1a1a2edd", street:"#16213e", pin:"#c084fc", dot:"#22d3ee" };

    // URL do Mapbox Static para os cards
    const mapboxCardUrl = (w, h) => {
      try {
        if(!run?.polyline||run.polyline.length<2) return null;
        const sample = run.polyline[0];
        if(!sample||sample[0]===undefined||sample[1]===undefined) return null;
        const isLngLat = sample[0] < 0 || (Math.abs(sample[0]) < 10 && Math.abs(sample[1]) > 10);
        const all = run.polyline.filter(p=>p&&p[0]!==undefined&&p[1]!==undefined)
          .map(p => isLngLat ? [p[0], p[1]] : [p[1], p[0]]);
        if(all.length<2) return null;
        const step = Math.max(1, Math.floor(all.length/60));
        const coords = all.filter((_,i)=>i%step===0||i===all.length-1);
        const geoJson = {type:"Feature",properties:{stroke:"#a855f7","stroke-width":4,"stroke-opacity":1},geometry:{type:"LineString",coordinates:coords}};
        const geoStr = encodeURIComponent(JSON.stringify(geoJson));
        const url = `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/static/geojson(${geoStr})/auto/${w}x${h}@2x?access_token=${MAPBOX_TOKEN}&padding=30`;
        return url.length > 7500 ? null : url;
      } catch(e) { return null; }
    };
    const mapUrl1 = mapboxCardUrl(356, 130);
    const mapUrl2 = mapboxCardUrl(356, 468);

    function drawMap(canvas, small=false) {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // bg
      ctx.fillStyle = NEON.bg;
      ctx.fillRect(0, 0, W, H);

      // city grid
      ctx.globalAlpha = 0.5;
      ctx.strokeStyle = NEON.street;
      ctx.lineWidth = 0.8;
      for (let y = 15; y < H; y += 18 + Math.sin(y)*5) {
        ctx.beginPath(); ctx.moveTo(0, y);
        for (let x=0; x<=W; x+=8) ctx.lineTo(x, y + Math.sin(x*0.05+y*0.02)*1.5);
        ctx.stroke();
      }
      for (let x = 15; x < W; x += 22 + Math.cos(x)*4) {
        ctx.beginPath(); ctx.moveTo(x, 0);
        for (let y=0; y<=H; y+=8) ctx.lineTo(x + Math.sin(y*0.05+x*0.02)*1.2, y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // Generate raw points first, then normalize to fill canvas
      let rawPts = [];
      if (run?.polyline && run.polyline.length > 2) {
        rawPts = run.polyline.map(p=>({ x: p[1], y: -p[0] })); // lng, -lat
      } else {
        const seed = run ? run.distancia_km : 10;
        let rx=0, ry=0; rawPts=[{x:rx,y:ry}];
        for(let i=0;i<28;i++){
          rx += Math.sin(i*1.3+seed)*0.003 + 0.002;
          ry += Math.cos(i*0.9+seed)*0.0025;
          rawPts.push({x:rx,y:ry});
        }
      }

      // Normalize to canvas with padding — centers route
      const pad = small ? 18 : 36;
      const minX = Math.min(...rawPts.map(p=>p.x));
      const maxX = Math.max(...rawPts.map(p=>p.x));
      const minY = Math.min(...rawPts.map(p=>p.y));
      const maxY = Math.max(...rawPts.map(p=>p.y));
      const rangeX = maxX - minX || 1;
      const rangeY = maxY - minY || 1;
      // Keep aspect ratio
      const scaleX = (W - pad*2) / rangeX;
      const scaleY = (H - pad*2) / rangeY;
      const scale  = Math.min(scaleX, scaleY);
      const offX = (W - rangeX*scale) / 2;
      const offY = (H - rangeY*scale) / 2;
      const pts = rawPts.map(p=>({
        x: offX + (p.x - minX) * scale,
        y: offY + (p.y - minY) * scale,
      }));

      if (pts.length < 2) return;

      // glow
      ctx.shadowColor=NEON.glow; ctx.shadowBlur=small?10:18;
      ctx.strokeStyle=NEON.glow+"55"; ctx.lineWidth=small?4:7;
      ctx.lineJoin="round"; ctx.lineCap="round";
      ctx.beginPath(); ctx.moveTo(pts[0].x,pts[0].y);
      pts.slice(1).forEach(p=>ctx.lineTo(p.x,p.y)); ctx.stroke();

      // main line
      ctx.shadowBlur=small?5:8; ctx.shadowColor=NEON.route;
      ctx.strokeStyle=NEON.route; ctx.lineWidth=small?1.8:2.5;
      ctx.beginPath(); ctx.moveTo(pts[0].x,pts[0].y);
      pts.slice(1).forEach(p=>ctx.lineTo(p.x,p.y)); ctx.stroke();
      ctx.shadowBlur=0;

      if (!small) {
        // km dots + labels
        const tot=pts.length;
        [1,2,3].forEach(i=>{
          const p=pts[Math.min(i*Math.floor(tot/4),tot-1)];
          const lbl=run?((run.distancia_km/4)*i).toFixed(1)+"km":(i*2.5)+"km";
          ctx.beginPath(); ctx.arc(p.x,p.y,4,0,Math.PI*2);
          ctx.fillStyle="#0d0f2e"; ctx.fill();
          ctx.strokeStyle=NEON.dot; ctx.lineWidth=1.8; ctx.stroke();
          const tw=ctx.measureText(lbl).width+12;
          const bx=Math.min(Math.max(p.x-tw/2, 4), W-tw-4);
          const by=Math.max(p.y-22, 4);
          ctx.fillStyle="#0d0f2ecc"; ctx.strokeStyle=NEON.dot+"77"; ctx.lineWidth=0.8;
          ctx.beginPath(); ctx.roundRect(bx,by,tw,15,4); ctx.fill(); ctx.stroke();
          ctx.fillStyle=NEON.dot; ctx.font="bold 8px monospace"; ctx.textAlign="center";
          ctx.fillText(lbl,p.x,by+10);
        });
      }

      // start dot
      const s=pts[0];
      ctx.shadowColor=NEON.pin; ctx.shadowBlur=10;
      ctx.fillStyle=NEON.pin; ctx.beginPath(); ctx.arc(s.x,s.y,small?4:6,0,Math.PI*2); ctx.fill();
      ctx.shadowBlur=0; ctx.fillStyle="#fff"; ctx.beginPath(); ctx.arc(s.x,s.y,small?1.5:2.2,0,Math.PI*2); ctx.fill();

      // end pin
      const e=pts[pts.length-1];
      ctx.shadowColor=NEON.dot; ctx.shadowBlur=10;
      ctx.fillStyle=NEON.dot;
      ctx.beginPath(); ctx.arc(e.x,e.y-2,small?4:6,0,Math.PI*2); ctx.fill();
      if(!small){ctx.beginPath();ctx.moveTo(e.x-3,e.y+3);ctx.lineTo(e.x,e.y+9);ctx.lineTo(e.x+3,e.y+3);ctx.fill();}
      ctx.shadowBlur=0; ctx.fillStyle="#fff"; ctx.beginPath(); ctx.arc(e.x,e.y-2,small?1.5:2,0,Math.PI*2); ctx.fill();
    }

    useEffect(()=>{ drawMap(canvasRef1.current, true);  }, [run, cardIndex]);
    useEffect(()=>{ drawMap(canvasRef2.current, false); }, [run, cardIndex]);

    const cardRef = useRef(null);
    const exportCanvasRef = useRef(null);
    const touchStartX = useRef(null);
    const [copied, setCopied] = useState(false);

    async function handleCopy() {
      // Gerar o canvas igual ao handleSave mas copiar para clipboard
      // Só disponível para cards 1 e 4 (fundo transparente com traçado)
      const W = 356, SCALE = 3, CARD_H = 480;
      const off = document.createElement("canvas");
      off.width = W * SCALE; off.height = CARD_H * SCALE;
      const ctx = off.getContext("2d", {alpha: true});
      ctx.clearRect(0, 0, W * SCALE, CARD_H * SCALE); // limpar antes do scale
      ctx.scale(SCALE, SCALE);

      const logoImg = new Image();
      logoImg.crossOrigin = "anonymous";
      logoImg.src = tempoRunLogo;
      logoImg.onload = async () => {
        const logoAR = logoImg.naturalWidth / logoImg.naturalHeight;
        // Reusar a mesma lógica de desenho do card atual
        // Chamar handleSave internamente mas copiar em vez de download
        const drawCard = (cardIdx) => {
          const poly = run?.polyline?.filter(p=>p&&p[0]!==undefined&&p[1]!==undefined)||[];
          let rawPts=[];
          if(poly.length>2){
            const s=poly[0];
            const isLL=s[0]<0||(Math.abs(s[0])<10&&Math.abs(s[1])>10);
            rawPts=poly.map(p=>({x:isLL?p[0]:p[1],y:isLL?-p[1]:-p[0]}));
          } else {
            const seed=run?run.distancia_km:10; let rx=0,ry=0; rawPts=[{x:rx,y:ry}];
            for(let i=0;i<28;i++){rx+=Math.sin(i*1.3+seed)*0.003+0.002;ry+=Math.cos(i*0.9+seed)*0.0025;rawPts.push({x:rx,y:ry});}
          }
          const pad=cardIdx===0?28:60;
          const trH=cardIdx===0?160:CARD_H-80;
          const trY=cardIdx===0?(CARD_H-trH-48):40;
          const minX=Math.min(...rawPts.map(p=>p.x)),maxX=Math.max(...rawPts.map(p=>p.x));
          const minY=Math.min(...rawPts.map(p=>p.y)),maxY=Math.max(...rawPts.map(p=>p.y));
          const rX=maxX-minX||1,rY=maxY-minY||1;
          const sc=Math.min((W-pad*2)/rX,(trH-pad)/rY);
          const oX=(W-rX*sc)/2,oY=trY+(trH-rY*sc)/2;
          const pts=rawPts.map(p=>({x:oX+(p.x-minX)*sc,y:oY+(p.y-minY)*sc}));
          if((cardIdx===0||cardIdx===3)&&pts.length>1){
            ctx.shadowColor="#7c3aed"; ctx.shadowBlur=16;
            ctx.strokeStyle="#7c3aed33"; ctx.lineWidth=10; ctx.lineCap="round"; ctx.lineJoin="round";
            ctx.beginPath(); ctx.moveTo(pts[0].x,pts[0].y);
            pts.slice(1).forEach(p=>ctx.lineTo(p.x,p.y)); ctx.stroke();
            const gr=ctx.createLinearGradient(pts[0].x,pts[0].y,pts[pts.length-1].x,pts[pts.length-1].y);
            gr.addColorStop(0,"#7c3aed"); gr.addColorStop(0.5,"#a855f7"); gr.addColorStop(1,"#22d3ee");
            ctx.shadowBlur=6; ctx.strokeStyle=gr; ctx.lineWidth=4;
            ctx.beginPath(); ctx.moveTo(pts[0].x,pts[0].y);
            pts.slice(1).forEach(p=>ctx.lineTo(p.x,p.y)); ctx.stroke();
            ctx.shadowBlur=0;
            ctx.fillStyle="#22c55e"; ctx.beginPath(); ctx.arc(pts[0].x,pts[0].y,7,0,Math.PI*2); ctx.fill();
            ctx.fillStyle="#22d3ee"; ctx.beginPath(); ctx.arc(pts[pts.length-1].x,pts[pts.length-1].y,7,0,Math.PI*2); ctx.fill();
          }
          // Logo (só cards 1 e 4)
          if(cardIdx===0||cardIdx===3){
            const lW=cardIdx===0?50:80, lH=lW/logoAR;
            const lY=cardIdx===0?CARD_H-lH-10:14;
            ctx.globalAlpha=cardIdx===0?0.25:0.8;
            ctx.drawImage(logoImg,W/2-lW/2,lY,lW,lH);
            ctx.globalAlpha=1;
          }
          if(cardIdx===0){
            let y=16;
            const lW2=80,lH2=lW2/logoAR;
            ctx.drawImage(logoImg,W/2-lW2/2,y,lW2,lH2); y+=lH2+10;
            ctx.fillStyle="#ffffff55"; ctx.font="bold 8px monospace"; ctx.textAlign="center";
            ctx.fillText((run?.data||"Hoje").toUpperCase(),W/2,y); y+=20;
            ctx.fillStyle="#f0f4ff"; ctx.font="bold 42px 'Space Grotesk',sans-serif";
            ctx.fillText(dist+" km",W/2,y+38); y+=58;
            ctx.fillStyle="#f0f4ff"; ctx.font="bold 26px 'Space Grotesk',sans-serif";
            ctx.fillText(pace+" /km",W/2,y+26); y+=44;
            ctx.fillStyle="#f0f4ff"; ctx.font="bold 26px 'Space Grotesk',sans-serif";
            ctx.fillText(dur,W/2,y+26);
          } else if(cardIdx===2){
            // Card 3: logo + data + 3 stats horizontais, fundo transparente
            let y=CARD_H/2-80;
            const lW3=72,lH3=lW3/logoAR;
            ctx.globalAlpha=1;
            ctx.drawImage(logoImg,W/2-lW3/2,y,lW3,lH3); y+=lH3+16;
            ctx.fillStyle="#ffffff44"; ctx.font="bold 8px monospace"; ctx.textAlign="center";
            ctx.fillText((run?.data||"Hoje").toUpperCase(),W/2,y); y+=28;
            const cols=[{v:dist,u:"km",c:"#a855f7"},{v:pace,u:"/km",c:"#7c3aed"},{v:dur,u:"tempo",c:"#22d3ee"}];
            const cw3=(W-40)/3;
            cols.forEach((col,i)=>{
              const cx=20+i*(cw3+6);
              ctx.fillStyle=col.c+"88"; ctx.fillRect(cx,y,cw3,1.5);
              ctx.fillStyle="#f0f4ff"; ctx.font="bold 28px 'Space Grotesk',sans-serif"; ctx.textAlign="left";
              ctx.fillText(col.v,cx,y+38);
              ctx.fillStyle="#ffffff55"; ctx.font="bold 8px monospace";
              ctx.fillText(col.u.toUpperCase(),cx,y+54);
            });
          }
        };
        drawCard(cardIndex);
        try {
          off.toBlob(async (blob)=>{
            await navigator.clipboard.write([new ClipboardItem({"image/png":blob})]);
            setCopied(true);
            setTimeout(()=>setCopied(false),2000);
          },"image/png");
        } catch(e){ alert("Clipboard não suportado neste browser"); }
      };
    }

    function onTouchStart(e){ touchStartX.current = e.touches[0].clientX; }
    function onTouchEnd(e){
      if(touchStartX.current===null) return;
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      touchStartX.current = null;
      if(Math.abs(dx) < 40) return;
      if(dx < 0) {
        // swipe left → próximo card (não faz nada no último)
        if(cardIndex === TOTAL-1) return;
        setCardIndex(i=>i+1);
      } else {
        // swipe right → card anterior (não faz nada no primeiro)
        if(cardIndex === 0) return;
        setCardIndex(i=>i-1);
      }
    }

    function handleSave() {
      const W = 356, SCALE = 3, CARD_H = 480;
      const off = document.createElement("canvas");
      off.width = W * SCALE;
      off.height = CARD_H * SCALE;
      const ctx = off.getContext("2d");
      ctx.scale(SCALE, SCALE);
      // Fundo transparente para todos os cards
      ctx.clearRect(0, 0, W, CARD_H);

      const mapCanvas = cardIndex === 0 ? canvasRef1.current : cardIndex === 1 ? canvasRef2.current : null;

      const logoImg = new Image();
      logoImg.crossOrigin = "anonymous";
      logoImg.src = tempoRunLogo;
      logoImg.onload = () => {
        const logoAR = logoImg.naturalWidth / logoImg.naturalHeight;
        const cardH = CARD_H;

        if (cardIndex === 0) {
          // CARD 1: logo + dados + traçado minimalista (fundo transparente)
          let y = 16;
          const logoW = 80, logoH = logoW / logoAR;
          ctx.drawImage(logoImg, W/2 - logoW/2, y, logoW, logoH);
          y += logoH + 10;
          ctx.fillStyle="#ffffff55"; ctx.font="bold 8px monospace"; ctx.textAlign="center";
          ctx.fillText((run?.data||"Hoje").toUpperCase(), W/2, y); y += 20;
          ctx.fillStyle="#f0f4ff"; ctx.font="bold 42px 'Space Grotesk',sans-serif"; ctx.textAlign="center";
          ctx.fillText(dist+" km", W/2, y+38); y += 58;
          ctx.fillStyle="#f0f4ff"; ctx.font="bold 26px 'Space Grotesk',sans-serif";
          ctx.fillText(pace+" /km", W/2, y+26); y += 44;
          ctx.fillStyle="#f0f4ff"; ctx.font="bold 26px 'Space Grotesk',sans-serif";
          ctx.fillText(dur, W/2, y+26); y += 44;
          // Traçado minimalista
          const poly1e = run?.polyline?.filter(p=>p&&p[0]!==undefined&&p[1]!==undefined)||[];
          let raw1e=[];
          if(poly1e.length>2){
            const se=poly1e[0];
            const isLL1e=se[0]<0||(Math.abs(se[0])<10&&Math.abs(se[1])>10);
            raw1e=poly1e.map(p=>({x:isLL1e?p[0]:p[1],y:isLL1e?-p[1]:-p[0]}));
          } else {
            const seed=run?run.distancia_km:10; let rx=0,ry=0; raw1e=[{x:rx,y:ry}];
            for(let i=0;i<28;i++){rx+=Math.sin(i*1.3+seed)*0.003+0.002;ry+=Math.cos(i*0.9+seed)*0.0025;raw1e.push({x:rx,y:ry});}
          }
          const trH=160, trPad=28;
          const minX1e=Math.min(...raw1e.map(p=>p.x)),maxX1e=Math.max(...raw1e.map(p=>p.x));
          const minY1e=Math.min(...raw1e.map(p=>p.y)),maxY1e=Math.max(...raw1e.map(p=>p.y));
          const rX1e=maxX1e-minX1e||1,rY1e=maxY1e-minY1e||1;
          const sc1e=Math.min((W-trPad*2)/rX1e,(trH-trPad)/rY1e);
          const oX1e=(W-rX1e*sc1e)/2, oY1e=y+(trH-rY1e*sc1e)/2;
          const pts1e=raw1e.map(p=>({x:oX1e+(p.x-minX1e)*sc1e,y:oY1e+(p.y-minY1e)*sc1e}));
          if(pts1e.length>1){
            // Glow
            ctx.shadowColor="#7c3aed"; ctx.shadowBlur=12;
            ctx.strokeStyle="#7c3aed33"; ctx.lineWidth=8; ctx.lineCap="round"; ctx.lineJoin="round";
            ctx.beginPath(); ctx.moveTo(pts1e[0].x,pts1e[0].y);
            pts1e.slice(1).forEach(p=>ctx.lineTo(p.x,p.y)); ctx.stroke();
            // Gradiente roxo→cyan
            const gr1e=ctx.createLinearGradient(pts1e[0].x,pts1e[0].y,pts1e[pts1e.length-1].x,pts1e[pts1e.length-1].y);
            gr1e.addColorStop(0,"#7c3aed"); gr1e.addColorStop(0.5,"#a855f7"); gr1e.addColorStop(1,"#22d3ee");
            ctx.shadowBlur=5; ctx.strokeStyle=gr1e; ctx.lineWidth=3;
            ctx.beginPath(); ctx.moveTo(pts1e[0].x,pts1e[0].y);
            pts1e.slice(1).forEach(p=>ctx.lineTo(p.x,p.y)); ctx.stroke();
            ctx.shadowBlur=0;
            // Dots início/fim
            ctx.fillStyle="#22c55e"; ctx.beginPath(); ctx.arc(pts1e[0].x,pts1e[0].y,6,0,Math.PI*2); ctx.fill();
            ctx.fillStyle="#22d3ee"; ctx.beginPath(); ctx.arc(pts1e[pts1e.length-1].x,pts1e[pts1e.length-1].y,6,0,Math.PI*2); ctx.fill();
          }
          y += trH;
          // Logo watermark
          const wLogoW = 50, wLogoH = wLogoW / logoAR;
          ctx.globalAlpha = 0.25;
          ctx.drawImage(logoImg, W/2 - wLogoW/2, y+6, wLogoW, wLogoH);
          ctx.globalAlpha = 1;

        } else if (cardIndex === 1) {
          // CARD 2: estilo Garmin — fundo transparente + dados
          // Logo
          const lWg=90, lHg=lWg/logoAR;
          ctx.drawImage(logoImg, W/2-lWg/2, 20, lWg, lHg);
          // Barra lateral
          const barG=ctx.createLinearGradient(0,0,0,cardH);
          barG.addColorStop(0,"#811df2"); barG.addColorStop(0.4,"#a855f7");
          barG.addColorStop(0.8,"#22d3ee"); barG.addColorStop(1,"rgba(34,211,238,0)");
          ctx.fillStyle=barG; ctx.fillRect(0,0,5,cardH);
          // Faixa fundo dados
          const dG=ctx.createLinearGradient(0,0,W*0.7,0);
          dG.addColorStop(0,"rgba(10,8,32,0.95)"); dG.addColorStop(0.55,"rgba(10,8,32,0.8)"); dG.addColorStop(1,"rgba(10,8,32,0)");
          ctx.fillStyle=dG; ctx.fillRect(0,cardH-240,W,240);
          // Dados
          const mG=[{v:dist,u:"km",l:"DISTÂNCIA"},{v:pace,u:"/km",l:"PACE MÉDIO"},{v:dur,u:"",l:"TEMPO TOTAL"}];
          let yG=cardH-220;
          mG.forEach((m,i)=>{
            ctx.fillStyle="#ffffff"; ctx.font="bold 36px 'Space Grotesk',sans-serif"; ctx.textAlign="left";
            ctx.fillText(m.v+(m.u?" "+m.u:""), 20, yG+34);
            ctx.fillStyle="rgba(255,255,255,0.4)"; ctx.font="bold 9px monospace";
            ctx.fillText(m.l, 20, yG+50); yG+=76;
          });
          // Data
          ctx.fillStyle="rgba(255,255,255,0.3)"; ctx.font="bold 9px monospace"; ctx.textAlign="right";
          ctx.fillText((run?.data||"Hoje").toUpperCase(), W-16, cardH-14);

        } else if (cardIndex === 2) {
          // CARD 3: mapa neon
          if (mapCanvas) { ctx.drawImage(mapCanvas, 0, 0, W, cardH); }
          const lW = 90, lH = lW / logoAR;
          ctx.drawImage(logoImg, W/2 - lW/2, 12, lW, lH);

        } else if (cardIndex === 3) {
          // CARD 4: logo centered + date + 3 col horizontal stats
          let y = 24;
          const lW = 72, lH = lW / logoAR;
          ctx.drawImage(logoImg, W/2 - lW/2, y, lW, lH);
          y += lH + 16;
          ctx.fillStyle="#ffffff44"; ctx.font="bold 8px monospace"; ctx.textAlign="center";
          ctx.fillText((run?.data||"Hoje").toUpperCase(), W/2, y); y += 28;
          const cols = [{v:dist,u:"km",bc:"#a855f7"},{v:pace,u:"/km",bc:"#7c3aed"},{v:dur,u:"tempo",bc:"#22d3ee"}];
          const cw3 = (W-40)/3;
          cols.forEach((col,i)=>{
            const cx = 20 + i*(cw3+6);
            ctx.fillStyle=col.bc+"88"; ctx.fillRect(cx, y, cw3, 1.5);
            ctx.fillStyle="#f0f4ff"; ctx.font="bold 28px 'Space Grotesk',sans-serif"; ctx.textAlign="left";
            ctx.fillText(col.v, cx, y+38);
            ctx.fillStyle="#ffffff55"; ctx.font="bold 8px monospace";
            ctx.fillText(col.u.toUpperCase(), cx, y+54);
          });
        }

        // CARD 4: export separado com fundo transparente
        if(cardIndex === 4) {
          // Novo canvas sem fundo
          const off4 = document.createElement("canvas");
          off4.width = W * SCALE; off4.height = cardH * SCALE;
          const ctx4 = off4.getContext("2d");
          ctx4.scale(SCALE, SCALE);
          // Fundo transparente — não preencher
          // Desenhar traçado SVG via canvas
          const poly = run?.polyline?.filter(p=>p&&p[0]!==undefined&&p[1]!==undefined)||[];
          let rawPts4=[];
          if(poly.length>2){
            const s4=poly[0];
            const isLL=s4[0]<0||(Math.abs(s4[0])<10&&Math.abs(s4[1])>10);
            rawPts4=poly.map(p=>({x:isLL?p[0]:p[1],y:isLL?-p[1]:-p[0]}));
          } else {
            const seed=run?run.distancia_km:10;
            let rx=0,ry=0;rawPts4=[{x:rx,y:ry}];
            for(let i=0;i<32;i++){rx+=Math.sin(i*1.3+seed)*0.003+0.002;ry+=Math.cos(i*0.9+seed)*0.0025;rawPts4.push({x:rx,y:ry});}
          }
          const pad4=60;
          const minX4=Math.min(...rawPts4.map(p=>p.x)),maxX4=Math.max(...rawPts4.map(p=>p.x));
          const minY4=Math.min(...rawPts4.map(p=>p.y)),maxY4=Math.max(...rawPts4.map(p=>p.y));
          const rX4=maxX4-minX4||1,rY4=maxY4-minY4||1;
          const sc4=Math.min((W-pad4*2)/rX4,(cardH-pad4*2)/rY4);
          const oX4=(W-rX4*sc4)/2,oY4=(cardH-rY4*sc4)/2;
          const pts4=rawPts4.map(p=>({x:oX4+(p.x-minX4)*sc4,y:oY4+(p.y-minY4)*sc4}));
          if(pts4.length>1){
            // Glow
            ctx4.shadowColor="#7c3aed"; ctx4.shadowBlur=16;
            ctx4.strokeStyle="#7c3aed44"; ctx4.lineWidth=10;
            ctx4.lineCap="round"; ctx4.lineJoin="round";
            ctx4.beginPath(); ctx4.moveTo(pts4[0].x,pts4[0].y);
            pts4.slice(1).forEach(p=>ctx4.lineTo(p.x,p.y)); ctx4.stroke();
            // Main gradient line
            const grad4=ctx4.createLinearGradient(pts4[0].x,pts4[0].y,pts4[pts4.length-1].x,pts4[pts4.length-1].y);
            grad4.addColorStop(0,"#7c3aed"); grad4.addColorStop(0.5,"#a855f7"); grad4.addColorStop(1,"#22d3ee");
            ctx4.shadowBlur=6; ctx4.shadowColor="#a855f7";
            ctx4.strokeStyle=grad4; ctx4.lineWidth=4;
            ctx4.beginPath(); ctx4.moveTo(pts4[0].x,pts4[0].y);
            pts4.slice(1).forEach(p=>ctx4.lineTo(p.x,p.y)); ctx4.stroke();
            ctx4.shadowBlur=0;
            // Start dot
            ctx4.fillStyle="#22c55e"; ctx4.beginPath(); ctx4.arc(pts4[0].x,pts4[0].y,7,0,Math.PI*2); ctx4.fill();
            ctx4.fillStyle="#fff"; ctx4.beginPath(); ctx4.arc(pts4[0].x,pts4[0].y,3,0,Math.PI*2); ctx4.fill();
            // End dot
            ctx4.fillStyle="#22d3ee"; ctx4.beginPath(); ctx4.arc(pts4[pts4.length-1].x,pts4[pts4.length-1].y,7,0,Math.PI*2); ctx4.fill();
            ctx4.fillStyle="#fff"; ctx4.beginPath(); ctx4.arc(pts4[pts4.length-1].x,pts4[pts4.length-1].y,3,0,Math.PI*2); ctx4.fill();
          }
          // Logo centralizada no topo
          const lW4=80,lH4=lW4/logoAR;
          ctx4.globalAlpha=0.8;
          ctx4.drawImage(logoImg,W/2-lW4/2,14,lW4,lH4);
          ctx4.globalAlpha=1;
          const link4=document.createElement("a");
          link4.download="temporun_trace.png";
          link4.href=off4.toDataURL("image/png");
          link4.click();
          return;
        }

        const link = document.createElement("a");
        link.download = `temporun_card${cardIndex+1}.png`;
        link.href = off.toDataURL("image/png");
        link.click();
      };
      // If image fails to load, still export without logo
      logoImg.onerror = () => {
        const link = document.createElement("a");
        link.download = `temporun_card${cardIndex+1}.png`;
        link.href = off.toDataURL("image/png");
        link.click();
      };
    }

    const statRow = (label, value, large=false) => (
      <div style={{borderBottom:"1px solid #ffffff18",padding:"10px 0",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{color:"#8b9ec7",fontSize:11,fontWeight:700,fontFamily:"monospace",letterSpacing:0.8,textTransform:"uppercase"}}>{label}</span>
        <span style={{color:"#f0f4ff",fontSize:large?22:15,fontWeight:800,fontFamily:"'Space Grotesk',sans-serif",letterSpacing:large?-0.5:0}}>{value}</span>
      </div>
    );

    const cardBg = "linear-gradient(160deg,#0c0830,#0a1430)";
    const traceColor1 = "#811df2";
    const traceColor2 = "#22d3ee";
    const cardBorder = "1px solid #a855f744";
    const cardShadow = "0 8px 32px rgba(0,0,0,0.6)";

    // ── CARD 1: logo + stats + traçado minimalista ──
    const Card1 = (()=>{
      const W1=356, H1=480, pad1=28;
      const poly1 = run?.polyline?.filter(p=>p&&p[0]!==undefined&&p[1]!==undefined)||[];
      let raw1=[];
      if(poly1.length>2){
        const s1=poly1[0];
        const isLL1=s1[0]<0||(Math.abs(s1[0])<10&&Math.abs(s1[1])>10);
        raw1=poly1.map(p=>({x:isLL1?p[0]:p[1],y:isLL1?-p[1]:-p[0]}));
      } else {
        const seed=run?run.distancia_km:10;
        let rx=0,ry=0;raw1=[{x:rx,y:ry}];
        for(let i=0;i<28;i++){rx+=Math.sin(i*1.3+seed)*0.003+0.002;ry+=Math.cos(i*0.9+seed)*0.0025;raw1.push({x:rx,y:ry});}
      }
      const traceH=160, traceY=H1-traceH-48;
      const minX1=Math.min(...raw1.map(p=>p.x)),maxX1=Math.max(...raw1.map(p=>p.x));
      const minY1=Math.min(...raw1.map(p=>p.y)),maxY1=Math.max(...raw1.map(p=>p.y));
      const rX1=maxX1-minX1||1,rY1=maxY1-minY1||1;
      const sc1=Math.min((W1-pad1*2)/rX1,(traceH-pad1)/rY1);
      const oX1=(W1-rX1*sc1)/2,oY1=traceY+(traceH-rY1*sc1)/2;
      const pts1=raw1.map(p=>({x:oX1+(p.x-minX1)*sc1,y:oY1+(p.y-minY1)*sc1}));
      const pathD1=pts1.length>1?"M "+pts1.map(p=>`${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" L "):"";
      const g1id="c1grad",gw1id="c1glow";
      return (
        <div style={{background:cardBg,borderRadius:17,overflow:"hidden",border:cardBorder,boxShadow:cardShadow,height:H1,position:"relative"}}>
          <svg width="100%" height={H1} viewBox={`0 0 ${W1} ${H1}`} style={{position:"absolute",top:0,left:0}}>
            <defs>
              <linearGradient id={g1id} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={isGradient?traceColor1:traceStroke}/>
                <stop offset="50%" stopColor={isGradient?"#a855f7":traceStroke}/>
                <stop offset="100%" stopColor={isGradient?traceColor2:traceStroke}/>
              </linearGradient>
              <filter id={gw1id}><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>
            {pathD1&&<path d={pathD1} fill="none" stroke={isGradient?traceColor1:traceStroke} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" opacity="0.2"/>}
            {pathD1&&<path d={pathD1} fill="none" stroke={`url(#${g1id})`} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" filter={`url(#${gw1id})`}/>}
            {pts1.length>0&&<><circle cx={pts1[0].x} cy={pts1[0].y} r="5" fill="#06071a" stroke="#22c55e" strokeWidth="2"/><circle cx={pts1[0].x} cy={pts1[0].y} r="2.5" fill="#22c55e"/></>}
            {pts1.length>1&&<><circle cx={pts1[pts1.length-1].x} cy={pts1[pts1.length-1].y} r="5" fill="#06071a" stroke="#22d3ee" strokeWidth="2"/><circle cx={pts1[pts1.length-1].x} cy={pts1[pts1.length-1].y} r="2.5" fill="#22d3ee"/></>}
          </svg>
          {/* Conteúdo por cima */}
          <div style={{position:"relative",zIndex:1,padding:"16px 16px 0",textAlign:"center"}}>
            <img src={tempoRunLogo} alt="TempoRun" style={{width:80,height:"auto",objectFit:"contain",display:"block",margin:"0 auto 10px"}}/>
            <p style={{color:"#ffffff55",fontFamily:"monospace",fontSize:9,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",margin:"0 0 4px"}}>{data}</p>
            <div style={{borderBottom:"1px solid #ffffff18",padding:"10px 0"}}>
              <p style={{color:"#f0f4ff",fontSize:42,fontWeight:800,fontFamily:"'Space Grotesk',sans-serif",letterSpacing:-1.5,lineHeight:1,margin:0}}>{dist}<span style={{fontSize:18,opacity:0.6,fontWeight:600}}> km</span></p>
            </div>
            <div style={{borderBottom:"1px solid #ffffff18",padding:"10px 0"}}>
              <p style={{color:"#f0f4ff",fontSize:26,fontWeight:800,fontFamily:"'Space Grotesk',sans-serif",letterSpacing:-0.5,margin:0}}>{pace}<span style={{fontSize:12,opacity:0.6,fontWeight:600}}> /km</span></p>
            </div>
            <div style={{padding:"10px 0"}}>
              <p style={{color:"#f0f4ff",fontSize:26,fontWeight:800,fontFamily:"'Space Grotesk',sans-serif",letterSpacing:-0.5,margin:0}}>{dur}</p>
            </div>
          </div>
          <div style={{position:"absolute",bottom:10,left:0,right:0,textAlign:"center",zIndex:1}}>
            <img src={tempoRunLogo} alt="" style={{width:50,height:"auto",objectFit:"contain",opacity:0.25}}/>
          </div>
        </div>
      );
    })();

    // ── CARD 2: estilo Garmin — fundo transparente, dados + barra gradiente ──
    const Card2 = (()=>{
      const metrics2 = [
        {v:dist,  u:"km",  l:"DISTÂNCIA"},
        {v:pace,  u:"/km", l:"PACE MÉDIO"},
        {v:dur,   u:"",    l:"TEMPO TOTAL"},
      ];
      return (
        <div style={{position:"relative",borderRadius:17,overflow:"hidden",height:480,border:"1px solid #7c3aed33",boxShadow:cardShadow}}>
          {/* Fundo xadrez — indica transparência */}
          <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(45deg,#12122a 25%,transparent 25%),linear-gradient(-45deg,#12122a 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#12122a 75%),linear-gradient(-45deg,transparent 75%,#12122a 75%)",backgroundSize:"22px 22px",backgroundPosition:"0 0,0 11px,11px -11px,-11px 0",opacity:0.5}}/>
          {/* Barra lateral gradiente */}
          <div style={{position:"absolute",left:0,top:0,bottom:0,width:5,background:"linear-gradient(180deg,#811df2 0%,#a855f7 40%,#22d3ee 80%,transparent 100%)",zIndex:2}}/>
          {/* Logo centralizada no topo */}
          <div style={{position:"absolute",top:20,left:0,right:0,display:"flex",justifyContent:"center",zIndex:2}}>
            <img src={tempoRunLogo} alt="TempoRun" style={{width:90,height:"auto",objectFit:"contain",filter:"drop-shadow(0 0 10px #7c3aed99)"}}/>
          </div>
          {/* Faixa dos dados — gradiente que desbota para a direita */}
          <div style={{position:"absolute",bottom:0,left:0,right:0,height:240,zIndex:2}}>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,rgba(10,8,32,0.95) 0%,rgba(10,8,32,0.8) 55%,transparent 100%)"}}/>
            <div style={{position:"relative",padding:"20px 20px 20px 20px"}}>
              {metrics2.map((m,i)=>(
                <div key={i} style={{marginBottom:i<2?22:0}}>
                  <div style={{display:"flex",alignItems:"baseline",gap:6}}>
                    <span style={{color:"#ffffff",fontFamily:"'Space Grotesk',sans-serif",fontWeight:800,fontSize:36,lineHeight:1,letterSpacing:-1}}>{m.v}</span>
                    {m.u&&<span style={{color:"rgba(255,255,255,0.55)",fontFamily:"'Space Grotesk',sans-serif",fontWeight:600,fontSize:15}}>{m.u}</span>}
                  </div>
                  <p style={{color:"rgba(255,255,255,0.4)",fontFamily:"monospace",fontWeight:700,fontSize:9,letterSpacing:1.5,textTransform:"uppercase",margin:"3px 0 0"}}>{m.l}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Data canto inferior direito */}
          <div style={{position:"absolute",bottom:16,right:16,zIndex:3}}>
            <p style={{color:"rgba(255,255,255,0.3)",fontFamily:"monospace",fontSize:9,fontWeight:700,letterSpacing:1,textTransform:"uppercase",margin:0}}>{data}</p>
          </div>
        </div>
      );
    })();

    // ── CARD 3: full neon map + logo centered top ──
    const Card3 = (
      <div style={{background:"#1a1a2e",borderRadius:17,overflow:"hidden",border:"1px solid #a855f733",boxShadow:cardShadow,position:"relative",height:480}}>
        {mapUrl2 ? <img src={mapUrl2} alt="mapa" style={{width:"100%",height:480,objectFit:"cover",display:"block"}} onError={e=>{e.target.style.display="none";}} /> : <canvas ref={canvasRef2} width={356} height={480} style={{width:"100%",display:"block"}}/>}
        <div style={{position:"absolute",top:12,left:"50%",transform:"translateX(-50%)"}}>
          <img src={tempoRunLogo} alt="TempoRun" style={{width:64,height:"auto",objectFit:"contain",filter:"drop-shadow(0 0 8px #7c3aed88)"}}/>
        </div>
      </div>
    );

    // ── CARD 4: logo centered + horizontal stats only ──
    const Card4 = (
      <div style={{background:cardBg,borderRadius:17,padding:"24px 20px 28px",border:cardBorder,boxShadow:cardShadow,textAlign:"center",height:480,display:"flex",flexDirection:"column",justifyContent:"center"}}>
        <img src={tempoRunLogo} alt="TempoRun" style={{width:72,height:"auto",objectFit:"contain",display:"block",margin:"0 auto 20px"}}/>
        <p style={{color:"#ffffff44",fontFamily:"monospace",fontSize:9,fontWeight:700,letterSpacing:2,textTransform:"uppercase",margin:"0 0 20px"}}>{data}</p>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",gap:8,textAlign:"left"}}>
          <div style={{flex:1,borderTop:"1px solid #a855f744",paddingTop:10}}>
            <p style={{color:"#f0f4ff",fontSize:32,fontWeight:800,fontFamily:"'Space Grotesk',sans-serif",letterSpacing:-1,margin:0,lineHeight:1}}>{dist}</p>
            <p style={{color:"#ffffff44",fontSize:9,fontWeight:700,fontFamily:"monospace",letterSpacing:1,textTransform:"uppercase",margin:"4px 0 0"}}>km</p>
          </div>
          <div style={{flex:1,borderTop:"1px solid #7c3aed44",paddingTop:10}}>
            <p style={{color:"#f0f4ff",fontSize:32,fontWeight:800,fontFamily:"'Space Grotesk',sans-serif",letterSpacing:-1,margin:0,lineHeight:1}}>{pace}</p>
            <p style={{color:"#ffffff44",fontSize:9,fontWeight:700,fontFamily:"monospace",letterSpacing:1,textTransform:"uppercase",margin:"4px 0 0"}}>/km</p>
          </div>
          <div style={{flex:1,borderTop:"1px solid #22d3ee44",paddingTop:10}}>
            <p style={{color:"#f0f4ff",fontSize:32,fontWeight:800,fontFamily:"'Space Grotesk',sans-serif",letterSpacing:-1,margin:0,lineHeight:1}}>{dur}</p>
            <p style={{color:"#ffffff44",fontSize:9,fontWeight:700,fontFamily:"monospace",letterSpacing:1,textTransform:"uppercase",margin:"4px 0 0"}}>tempo</p>
          </div>
        </div>
      </div>
    );

    // ── CARD 5: traçado minimalista — só a linha da rota ──
    const Card5 = (()=>{
      const W=356, H=480, pad=48;
      const poly = run?.polyline?.filter(p=>p&&p[0]!==undefined&&p[1]!==undefined)||[];
      // Gera pontos sintéticos se não há polyline
      let rawPts = [];
      if(poly.length>2){
        const sample=poly[0];
        const isLngLat=sample[0]<0||(Math.abs(sample[0])<10&&Math.abs(sample[1])>10);
        rawPts=poly.map(p=>({x:isLngLat?p[0]:p[1], y:isLngLat?-p[1]:-p[0]}));
      } else {
        const seed=run?run.distancia_km:10;
        let rx=0,ry=0; rawPts=[{x:rx,y:ry}];
        for(let i=0;i<32;i++){rx+=Math.sin(i*1.3+seed)*0.003+0.002;ry+=Math.cos(i*0.9+seed)*0.0025;rawPts.push({x:rx,y:ry});}
      }
      const minX=Math.min(...rawPts.map(p=>p.x));
      const maxX=Math.max(...rawPts.map(p=>p.x));
      const minY=Math.min(...rawPts.map(p=>p.y));
      const maxY=Math.max(...rawPts.map(p=>p.y));
      const rangeX=maxX-minX||1, rangeY=maxY-minY||1;
      const scale=Math.min((W-pad*2)/rangeX,(H-pad*2)/rangeY);
      const offX=(W-rangeX*scale)/2, offY=(H-rangeY*scale)/2;
      const pts=rawPts.map(p=>({x:offX+(p.x-minX)*scale, y:offY+(p.y-minY)*scale}));
      const pathD=pts.length>1?"M "+pts.map(p=>`${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" L "):"";
      const gradId="traceGrad"+cardIndex;
      const glowId="traceGlow"+cardIndex;
      return (
        <div style={{background:"#06071a",borderRadius:17,overflow:"hidden",border:"1px solid #7c3aed44",boxShadow:cardShadow,position:"relative"}}>
          <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} style={{display:"block"}}>
            <defs>
              <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={isGradient?traceColor1:traceStroke}/>
                <stop offset="50%" stopColor={isGradient?"#a855f7":traceStroke}/>
                <stop offset="100%" stopColor={isGradient?traceColor2:traceStroke}/>
              </linearGradient>
              <filter id={glowId}>
                <feGaussianBlur stdDeviation="3" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            {/* Glow layer */}
            {pathD&&<path d={pathD} fill="none" stroke={isGradient?traceColor1:traceStroke} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" opacity="0.25"/>}
            {/* Main trace */}
            {pathD&&<path d={pathD} fill="none" stroke={`url(#${gradId})`} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" filter={`url(#${glowId})`}/>}
            {/* Start dot */}
            {pts.length>0&&<><circle cx={pts[0].x} cy={pts[0].y} r="7" fill="#06071a" stroke="#22c55e" strokeWidth="2.5"/><circle cx={pts[0].x} cy={pts[0].y} r="3" fill="#22c55e"/></>}
            {/* End dot */}
            {pts.length>1&&<><circle cx={pts[pts.length-1].x} cy={pts[pts.length-1].y} r="7" fill="#06071a" stroke="#22d3ee" strokeWidth="2.5"/><circle cx={pts[pts.length-1].x} cy={pts[pts.length-1].y} r="3" fill="#22d3ee"/></>}
          </svg>
          {/* Logo e dados sobrepostos */}
          <div style={{position:"absolute",top:16,left:0,right:0,display:"flex",justifyContent:"center",alignItems:"center"}}>
            <img src={tempoRunLogo} alt="TempoRun" style={{width:56,height:"auto",objectFit:"contain",opacity:0.75,filter:"drop-shadow(0 0 8px #7c3aed88)"}}/>
          </div>

        </div>
      );
    })();

    const CARDS = [Card1, Card2, Card3, Card4, Card5];
    const LABELS = ["Card 1 de 5","Card 2 de 5","Card 3 de 5","Card 4 de 5","Card 5 de 5"];

    return (
      <div>
        {/* card + arrows */}
        <div style={{position:"relative",marginBottom:14}}>
          <div ref={cardRef} onTouchStart={(e)=>{e.stopPropagation();onTouchStart(e);}} onTouchEnd={(e)=>{e.stopPropagation();onTouchEnd(e);}} style={{touchAction:"pan-y",userSelect:"none"}}>
            {CARDS[cardIndex]}
          </div>
          {/* left arrow */}
          <button onClick={()=>setCardIndex(i=>(i-1+TOTAL)%TOTAL)}
            style={{position:"absolute",top:"50%",left:-14,transform:"translateY(-50%)",width:32,height:32,borderRadius:16,background:C.s2,border:"1px solid "+C.border,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 12px #00000066"}}>
            <Ic n="back" z={15} c={C.ts}/>
          </button>
          {/* right arrow */}
          <button onClick={()=>setCardIndex(i=>(i+1)%TOTAL)}
            style={{position:"absolute",top:"50%",right:-14,transform:"translateY(-50%)",width:32,height:32,borderRadius:16,background:C.s2,border:"1px solid "+C.border,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 12px #00000066"}}>
            <Ic n="back" z={15} c={C.ts} st={{transform:"rotate(180deg)"}}/>
          </button>
        </div>

        {/* dots indicator */}
        <div style={{display:"flex",justifyContent:"center",gap:6,marginBottom:16}}>
          {Array.from({length:TOTAL}).map((_,i)=>(
            <div key={i} onClick={()=>setCardIndex(i)} style={{width:i===cardIndex?20:6,height:6,borderRadius:3,background:i===cardIndex?"linear-gradient(90deg,"+C.violet+","+C.cyan+")":C.border,cursor:"pointer",transition:"none"}}/>
          ))}
        </div>

        {/* actions */}
        <div style={{display:"flex",gap:8}}>
          <button onClick={handleSave} style={{flex:1,background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",color:"#fff",border:"none",borderRadius:12,padding:"12px 0",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"'Space Grotesk',sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:7}}>
            <Ic n="save" z={15} c="#fff"/>PNG
          </button>
          {(cardIndex===0||cardIndex===1||cardIndex===3||cardIndex===4)&&(
            <button onClick={handleCopy} style={{flex:1,background:copied?"#22c55e22":C.s2,color:copied?"#22c55e":C.cyanB,border:"1px solid "+(copied?"#22c55e44":C.cyanB+"44"),borderRadius:12,padding:"12px 0",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"'Space Grotesk',sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:7}}>
              <Ic n="save" z={15} c={copied?"#22c55e":C.cyanB}/>{copied?"Copiado ✓":"Copiar"}
            </button>
          )}
          <button style={{background:C.s2,color:C.cyanB,border:"1px solid "+C.cyanB+"44",borderRadius:12,padding:"12px 13px",cursor:"pointer",display:"flex",alignItems:"center"}}>
            <Ic n="share" z={15} c={C.cyanB}/>
          </button>
        </div>
      </div>
    );
  }

  // ── MAPA ARTE ────────────────────────────────────────────────────────────────
  function MapaArte({ corrida, allRuns, C, fmtT }) {
    const canvasRef = useRef(null);
    const [selectedRun, setSelectedRunMapa] = useState(null);
    const [mapaStyle, setMapaStyle] = useState("neon"); // neon | minimal | cyan
    const [exported, setExported] = useState(false);

    const run = selectedRun || corrida || allRuns?.[0] || null;

    const STYLES = {
      neon:    { name:"Neon",    routeColor:"#a855f7", glowColor:"#7c3aed", bgCity:"#1a1a2e", bgStreet:"#16213e", pinColor:"#c084fc", dotColor:"#22d3ee" },
      minimal: { name:"Minimal", routeColor:"#e2e8f0", glowColor:"#94a3b8", bgCity:"#0f0f0f", bgStreet:"#1a1a1a", pinColor:"#f1f5f9", dotColor:"#cbd5e1" },
      cyan:    { name:"Cyan",    routeColor:"#22d3ee", glowColor:"#06b6d4", bgCity:"#001a24", bgStreet:"#002a38", pinColor:"#67e8f9", dotColor:"#a855f7" },
    };

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      const W = canvas.width, H = canvas.height;
      const st = STYLES[mapaStyle];

      ctx.clearRect(0, 0, W, H);

      // Background — semi transparent dark
      ctx.fillStyle = st.bgCity + "dd";
      ctx.fillRect(0, 0, W, H);

      // City grid — subtle streets behind
      ctx.strokeStyle = st.bgStreet;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.6;
      // horizontal streets
      for (let y = 20; y < H; y += 22 + Math.sin(y) * 8) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        // wavy city streets
        for (let x = 0; x <= W; x += 10) {
          ctx.lineTo(x, y + Math.sin(x * 0.04 + y * 0.02) * 2);
        }
        ctx.stroke();
      }
      // vertical streets
      for (let x = 20; x < W; x += 28 + Math.cos(x) * 6) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        for (let y = 0; y <= H; y += 10) {
          ctx.lineTo(x + Math.sin(y * 0.04 + x * 0.02) * 1.5, y);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // Generate or use polyline
      let pts = [];
      if (run?.polyline && run.polyline.length > 2) {
        // normalize polyline to canvas
        const lats = run.polyline.map(p => p[0]);
        const lngs = run.polyline.map(p => p[1]);
        const minLat = Math.min(...lats), maxLat = Math.max(...lats);
        const minLng = Math.min(...lngs), maxLng = Math.max(...lngs);
        const pad = 40;
        pts = run.polyline.map(p => ({
          x: pad + ((p[1] - minLng) / (maxLng - minLng || 1)) * (W - pad * 2),
          y: H - pad - ((p[0] - minLat) / (maxLat - minLat || 1)) * (H - pad * 2),
        }));
      } else {
        // Generate demo route
        const seed = run ? run.distancia_km : 10;
        let x = W * 0.25, y = H * 0.55;
        pts = [{x, y}];
        for (let i = 0; i < 28; i++) {
          x += (Math.sin(i * 1.3 + seed) * 22) + 8;
          y += (Math.cos(i * 0.9 + seed) * 16);
          x = Math.max(30, Math.min(W - 30, x));
          y = Math.max(30, Math.min(H - 30, y));
          pts.push({x, y});
        }
      }

      if (pts.length < 2) return;

      // Glow outer pass
      ctx.shadowColor = st.glowColor;
      ctx.shadowBlur = 18;
      ctx.strokeStyle = st.glowColor + "66";
      ctx.lineWidth = 6;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      pts.slice(1).forEach(p => ctx.lineTo(p.x, p.y));
      ctx.stroke();

      // Main route line
      ctx.shadowBlur = 8;
      ctx.shadowColor = st.routeColor;
      ctx.strokeStyle = st.routeColor;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      pts.slice(1).forEach(p => ctx.lineTo(p.x, p.y));
      ctx.stroke();

      ctx.shadowBlur = 0;

      // Km split dots
      const total = pts.length;
      const splitInterval = Math.floor(total / 4);
      [1, 2, 3].forEach(i => {
        const p = pts[Math.min(i * splitInterval, total - 1)];
        const kmLabel = run ? ((run.distancia_km / 4) * i).toFixed(1) + "km" : (i * 2.5) + "km";
        // dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#0d0f2e";
        ctx.fill();
        ctx.strokeStyle = st.dotColor;
        ctx.lineWidth = 2;
        ctx.stroke();
        // label bubble
        const tw = ctx.measureText(kmLabel).width + 14;
        const bx = Math.min(p.x - tw / 2, W - tw - 4);
        const by = p.y - 26;
        ctx.fillStyle = "#0d0f2ecc";
        ctx.strokeStyle = st.dotColor + "88";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(bx, by, tw, 18, 5);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = st.dotColor;
        ctx.font = "bold 9px monospace";
        ctx.textAlign = "center";
        ctx.fillText(kmLabel, p.x, by + 12);
      });

      // Start pin
      const s = pts[0];
      ctx.fillStyle = st.pinColor;
      ctx.shadowColor = st.pinColor;
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(s.x, s.y, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(s.x, s.y, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // End pin — SVG-style pin drawn on canvas
      const e = pts[pts.length - 1];
      ctx.shadowColor = st.dotColor;
      ctx.shadowBlur = 12;
      ctx.fillStyle = st.dotColor;
      ctx.beginPath();
      ctx.arc(e.x, e.y - 2, 7, 0, Math.PI * 2);
      ctx.fill();
      // pin tail
      ctx.beginPath();
      ctx.moveTo(e.x - 4, e.y + 3);
      ctx.lineTo(e.x, e.y + 10);
      ctx.lineTo(e.x + 4, e.y + 3);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(e.x, e.y - 2, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Stats overlay bottom
      const dist = run ? run.distancia_km.toFixed(1) + " km" : "10.4 km";
      const pace = run?.pace_medio || "5:30";
      const dur  = run ? fmtT(run.duracao_seg) : "54:00";
      const bpm  = run?.bpm_medio ? run.bpm_medio + " bpm" : "158 bpm";

      ctx.fillStyle = "#06071acc";
      ctx.beginPath();
      ctx.roundRect(10, H - 44, W - 20, 34, 8);
      ctx.fill();
      ctx.strokeStyle = st.routeColor + "44";
      ctx.lineWidth = 1;
      ctx.stroke();

      const stats = [{l:"Dist", v:dist},{l:"Pace", v:pace},{l:"Tempo", v:dur},{l:"BPM", v:bpm}];
      const sw = (W - 20) / stats.length;
      stats.forEach((s, i) => {
        const cx = 10 + sw * i + sw / 2;
        ctx.fillStyle = "#8b9ec7";
        ctx.font = "7px monospace";
        ctx.textAlign = "center";
        ctx.fillText(s.l.toUpperCase(), cx, H - 32);
        ctx.fillStyle = "#f0f4ff";
        ctx.font = "bold 10px 'Space Grotesk', sans-serif";
        ctx.fillText(s.v, cx, H - 20);
      });

      // TempoRun watermark
      ctx.fillStyle = st.routeColor + "55";
      ctx.font = "bold 8px monospace";
      ctx.textAlign = "right";
      ctx.fillText("TEMPORUN", W - 12, 16);

    }, [run, mapaStyle]);

    function handleExport() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const link = document.createElement("a");
      link.download = "temporun_mapa.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
      setExported(true);
      setTimeout(() => setExported(false), 2000);
    }

    return (
      <div>
        <SL><Ic n="map" z={13} c={C.ts}/>Mapa da Corrida</SL>

        {/* Run selector */}
        {allRuns && allRuns.length > 1 && (
          <div style={{marginBottom:12}}>
            <select value={selectedRun?.id||""} onChange={e=>setSelectedRunMapa(allRuns.find(r=>r.id===e.target.value)||null)}
              style={{width:"100%",background:C.s2,border:"1px solid "+C.border,borderRadius:10,padding:"9px 12px",color:C.tp,fontSize:13,outline:"none",fontFamily:"inherit",appearance:"none"}}>
              <option value="">Última corrida</option>
              {allRuns.slice(0,10).map(r=>(
                <option key={r.id} value={r.id}>{r.nome||r.data} — {r.distancia_km?.toFixed(1)}km</option>
              ))}
            </select>
          </div>
        )}

        {/* Canvas */}
        <div style={{borderRadius:14,overflow:"hidden",border:"1px solid "+STYLES[mapaStyle].routeColor+"33",marginBottom:12,boxShadow:"0 8px 32px #00000066"}}>
          <canvas ref={canvasRef} width={356} height={240} style={{width:"100%",display:"block"}}/>
        </div>

        {/* Style picker */}
        <SL><Ic n="star" z={13} c={C.ts}/>Estilo</SL>
        <div style={{display:"flex",gap:7,marginBottom:14}}>
          {Object.entries(STYLES).map(([k,v])=>(
            <button key={k} onClick={()=>setMapaStyle(k)}
              style={{flex:1,background:mapaStyle===k?v.routeColor+"22":C.s2,border:"1px solid "+(mapaStyle===k?v.routeColor+"66":C.border),borderRadius:10,padding:"9px 0",cursor:"pointer",color:mapaStyle===k?v.routeColor:C.tm,fontWeight:700,fontSize:11,fontFamily:"inherit"}}>
              {v.name}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div style={{display:"flex",gap:8}}>
          <button onClick={handleExport} style={{flex:1,background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",color:"#fff",border:"none",borderRadius:12,padding:"12px 0",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"'Space Grotesk',sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:7}}>
            <Ic n="save" z={15} c="#fff"/>{exported?"Salvo!":"Salvar PNG"}
          </button>
          <button style={{background:C.s2,color:C.cyanB,border:"1px solid "+C.cyanB+"44",borderRadius:12,padding:"12px 13px",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:6}}>
            <Ic n="share" z={15} c={C.cyanB}/>
          </button>
        </div>
      </div>
    );
  }

  // ── STUDIO ──────────────────────────────────────────────────────────────────
  function renderStudio() {
    const CARD_STYLES = [
      {name:"Minimal",bg:"linear-gradient(135deg,#0c0830,#0a1430)"},
      {name:"Bold",bg:"linear-gradient(135deg,"+C.violet+","+C.cyan+")"},
      {name:"Trail",bg:"linear-gradient(135deg,#1a0e00,#221500)"},
    ];
    const COLOR_PALETTE = {
      gradient: {accent:"#811df2", label:"Gradiente", stroke:"gradient"},
      violet:   {accent:"#811df2", label:"Roxo",      stroke:"#811df2"},
      cyan:     {accent:"#22d3ee", label:"Cyan",      stroke:"#22d3ee"},
      white:    {accent:"#ffffff", label:"Branco",    stroke:"#ffffff"},
    };
    const lastRun = studioRun || corridas[0] || {distancia_km:10.4, pace_medio:"5:30", duracao_seg:3120, dplus:128, bpm_medio:158, data:"Hoje"};
    const accent = COLOR_PALETTE[cardColor].accent;
    const traceStroke = COLOR_PALETTE[cardColor].stroke;
    const isGradient = traceStroke === "gradient";
    const traceColor1 = "#811df2";
    const traceColor2 = "#22d3ee";
    return (
      <div>
        <div style={{paddingTop:8,paddingBottom:12}}>
          <Badge text="STUDIO" color={C.violetL}/>
          <h1 style={{color:C.tp,margin:"7px 0 3px",fontFamily:"'Space Grotesk',sans-serif",fontSize:21}}>Compartilhar</h1>
          <p style={{color:C.tm,fontSize:12,margin:0}}>Crie cards e gere conteúdo</p>
        </div>
        <div style={{display:"flex",background:C.s2,borderRadius:11,padding:4,marginBottom:14,gap:3}}>
          {[{id:"card",l:"Card"},{id:"rps",l:"RPs"},{id:"efeitos",l:"Efeitos"}].map(t=>(
            <button key={t.id} onClick={()=>setStudioTab(t.id)} style={{flex:1,background:studioTab===t.id?"linear-gradient(135deg,"+C.violet+"44,"+C.cyan+"22)":"transparent",color:studioTab===t.id?C.tp:C.tm,border:studioTab===t.id?"1px solid "+C.violet+"44":"1px solid transparent",borderRadius:8,padding:"8px 0",fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"'Space Grotesk',sans-serif"}}>
              {t.l}
            </button>
          ))}
        </div>

        {studioTab==="card"&&(
          <div>
            <CardCarousel run={lastRun} C={C} fmtT={fmtT} traceStroke={traceStroke} isGradient={isGradient}/>
            {/* toggle de cor do traçado */}
            <div style={{display:"flex",gap:6,justifyContent:"center",alignItems:"center",marginTop:12}}>
              {Object.entries(COLOR_PALETTE).map(([key,val])=>{
                const isSelected = cardColor===key;
                const previewBg = key==="gradient"?"linear-gradient(135deg,#811df2,#22d3ee)":key==="white"?"#e0e0e0":key==="cyan"?"#22d3ee":"#811df2";
                return (
                  <button key={key} onClick={()=>setCardColor(key)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,background:"transparent",border:"none",cursor:"pointer",padding:"4px 8px"}}>
                    <div style={{width:26,height:26,borderRadius:"50%",background:previewBg,border:isSelected?"2.5px solid #fff":"2px solid #ffffff33",boxShadow:isSelected?"0 0 8px #ffffff66":"none"}}/>
                    <span style={{color:isSelected?C.tp:C.td,fontSize:8,fontFamily:"monospace",fontWeight:700,textTransform:"uppercase",letterSpacing:0.5}}>{val.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {studioTab==="rps"&&(
          <div>
            <div style={{background:"linear-gradient(135deg,#0c0830,#0a1430)",borderRadius:17,padding:18,marginBottom:14,border:"1px solid "+C.violet+"44"}}>
              <div style={{textAlign:"center",marginBottom:14}}>
                <p style={{color:"#ffffffaa",fontFamily:"monospace",fontSize:9,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",margin:"0 0 5px"}}>Meus Recordes Pessoais</p>
                <p style={{color:"#fff",fontWeight:800,fontSize:18,margin:0,fontFamily:"'Space Grotesk',sans-serif"}}>{dadosForm.nome||session?.strava_athlete?.firstname||"Corredor"}</p>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
                {rpsExib.map((r,i)=>(
                  <div key={i} style={{background:"#ffffff10",border:"1px solid "+r.cor+"55",borderRadius:11,padding:"10px 11px",textAlign:"center"}}>
                    <p style={{color:r.cor,fontWeight:800,fontSize:12,margin:"0 0 3px"}}>{r.dist}</p>
                    <p style={{color:"#fff",fontWeight:800,fontSize:16,margin:0,fontFamily:"'Space Grotesk',sans-serif",letterSpacing:-0.5}}>{r.tempo}</p>
                    {r.melhora&&<p style={{color:C.cyanB,fontSize:9,margin:"3px 0 0",fontWeight:700}}>↓{r.melhora}</p>}
                  </div>
                ))}
              </div>
            </div>
            <button style={{width:"100%",background:"linear-gradient(135deg,"+C.violet+","+C.cyan+")",color:"#fff",border:"none",borderRadius:12,padding:"12px 0",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"'Space Grotesk',sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:7}}><Ic n="share" z={15} c="#fff"/>Compartilhar RPs</button>
          </div>
        )}

        {studioTab==="efeitos"&&(
          <div>
            <SL><Ic n="bolt" z={13} c={C.ts}/>Efeitos especiais</SL>
            {[
              {nome:"Trail Mode",desc:"Filtro com tons terrosos e fontes manuscritas",cor:C.amber},
              {nome:"Night Run",desc:"Visual noturno com neon e contraste forte",cor:C.violetL},
              {nome:"Classic",desc:"Estilo minimalista preto e branco",cor:C.ts},
            ].map((e,i)=>(
              <div key={i} style={{background:"linear-gradient(135deg,"+C.s1+","+C.s2+")",borderRadius:12,padding:"11px 13px",marginBottom:8,border:"1px solid "+e.cor+"33",display:"flex",alignItems:"center",gap:11}}>
                <div style={{width:32,height:32,borderRadius:9,background:e.cor+"22",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic n="bolt" z={17} c={e.cor}/></div>
                <div style={{flex:1}}>
                  <p style={{color:C.tp,fontWeight:700,fontSize:13,margin:0}}>{e.nome}</p>
                  <p style={{color:C.tm,fontSize:11,margin:"2px 0 0",lineHeight:1.4}}>{e.desc}</p>
                </div>
                <Ic n="back" z={14} c={C.td} st={{transform:"rotate(180deg)"}}/>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ── FINAL RENDER ─────────────────────────────────────────────────────────────
  const screenKey = tab+(subScreen||"");
  return (
    <div style={{fontFamily:"'DM Sans',system-ui,sans-serif",background:tema==="light"?"#e8ebf8":"#030410",minHeight:"100vh",display:"flex",justifyContent:"center",alignItems:"center",padding:16,transition:"background 0.3s"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@600;700;800&display=swap');
        *{box-sizing:border-box;transition:background-color 0.25s,border-color 0.25s,color 0.15s}
        ::-webkit-scrollbar{width:3px;height:3px} ::-webkit-scrollbar-track{background:transparent} ::-webkit-scrollbar-thumb{background:${tema==="light"?"#c8d3ee":"#1e2456"};border-radius:2px}
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.35}}
        .sc{animation:fadeIn 0.2s ease}
        button{transition:all 0.15s} button:active{opacity:0.7}
        input::placeholder{color:${tema==="light"?"#9aaad0":"#3a4a78"}}
        a:hover{opacity:0.85}
      `}</style>

      <div style={{width:390,background:C.bg2,borderRadius:30,overflow:"hidden",boxShadow:"0 30px 80px rgba(0,0,50,.8), 0 0 0 1px "+C.violet+"22",border:"1px solid "+C.border,position:"relative"}}>
        <div style={{background:C.bg,padding:"11px 22px 7px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{color:C.tp,fontSize:13,fontWeight:600,fontFamily:"'Space Grotesk',sans-serif"}}>9:41</span>
          <span style={{color:C.td,fontFamily:"monospace",fontSize:9,letterSpacing:0.8}}>GPS · WiFi · BAT</span>
        </div>

        <div className="sc" key={loggedIn?screenKey:"login"} style={{height:615,overflowY:"auto",padding:loggedIn?"0 17px 13px":"0",position:"relative"}}
          onTouchStart={e=>{if(!loggedIn)return;window._swipeX=e.touches[0].clientX;window._swipeY=e.touches[0].clientY;}}
          onTouchEnd={e=>{
            if(!loggedIn||!window._swipeX)return;
            const dx=e.changedTouches[0].clientX-window._swipeX;
            const dy=Math.abs(e.changedTouches[0].clientY-(window._swipeY||0));
            if(Math.abs(dx)<60||dy>Math.abs(dx))return;
            const TABS=["home","explorar","treino","analise","studio"];
            const cur=TABS.indexOf(tab);
            if(dx<-60&&cur<TABS.length-1) setTab(TABS[cur+1]);
            if(dx>60&&cur>0) setTab(TABS[cur-1]);
            window._swipeX=null;
          }}>
          {authLoading ? (
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",gap:16}}>
              <img src={logoImg} alt="TempoRun" style={{width:120,height:"auto",objectFit:"contain",filter:"drop-shadow(0 0 20px "+C.violet+"66)",opacity:0.9}}/>
              <div style={{width:36,height:36,borderRadius:"50%",border:"3px solid "+C.border,borderTopColor:C.cyanB,animation:"spin 0.8s linear infinite"}}/>
            </div>
          ) : (
            <>
              {!loggedIn && <LoginScreen onLogin={s=>{ saveSession(s); setSession(s); }} tab={tab} setTab={setTab}/>}
              {loggedIn && showOnboarding && renderOnboarding()}
              {loggedIn && showDadosModal && renderDadosModal()}
              {loggedIn && showConfigModal && renderConfigModal()}
              {loggedIn && showProModal && renderProModal()}
              {loggedIn && showUpgradeModal && renderUpgradeModal()}
              {loggedIn && showAddTreino && renderAddTreinoModal()}
              {loggedIn && tab==="home"     && renderHome()}
              {loggedIn && tab==="explorar" && renderExplorar()}
              {loggedIn && tab==="treino"   && renderTreino()}
              {loggedIn && tab==="analise"  && renderAnalise()}
              {loggedIn && tab==="studio"   && renderStudio()}
            </>
          )}
        </div>

        <div style={{background:C.bg,borderTop:"1px solid "+C.border,padding:"7px 4px 12px",display:"flex",alignItems:"center",position:"relative"}}>
          {[
            {id:"home",   n:"home",   l:"Início"},
            {id:"explorar",n:"explore",l:"Explorar"},
          ].map(t=>{
            const active = loggedIn ? tab===t.id : t.id==="home";
            const disabled = !loggedIn && t.id!=="home";
            return (
              <button key={t.id} disabled={disabled} onClick={()=>{if(!disabled){setTab(t.id);setSubScreen(null);}}} style={{flex:1,background:"none",border:"none",cursor:disabled?"default":"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"4px 0",opacity:disabled?0.55:1}}>
                <Ic n={t.n} z={19} c={active?C.cyanB:C.tg}/>
                <span style={{fontSize:8.5,fontWeight:700,color:active?C.tp:C.tg,letterSpacing:0.2,fontFamily:"monospace",textTransform:"uppercase"}}>{t.l}</span>
                {active&&<div style={{width:12,height:3,borderRadius:2,background:"linear-gradient(90deg,"+C.violet+","+C.cyan+")"}}/>}
              </button>
            );
          })}
          <button disabled={!loggedIn} onClick={()=>{if(loggedIn){if(gStatus==="fim"){resetGrav();setGStatus("idle");}setTab("treino");setSubScreen(null);}}} style={{background:"none",border:"none",cursor:loggedIn?"pointer":"default",display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"0 10px",opacity:loggedIn?1:0.85}}>
            <div style={{width:52,height:52,borderRadius:16,background:loggedIn&&tab==="treino"?"linear-gradient(135deg,"+C.violet+","+C.cyan+")":"linear-gradient(135deg,"+C.s2+","+C.s3+")",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:loggedIn&&tab==="treino"?"0 4px 22px "+C.violet+"55":"none",border:"1px solid "+(loggedIn&&tab==="treino"?C.violet+"66":C.border),marginTop:subScreen==="gravacao"?0:-20}}>
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Cabeça */}
                <circle cx="16" cy="3.5" r="2.2" fill={loggedIn&&tab==="treino"?"#fff":"#6b7db3"}/>
                {/* Torso inclinado */}
                <line x1="15" y1="5.5" x2="11" y2="13" stroke={loggedIn&&tab==="treino"?"#fff":"#6b7db3"} strokeWidth="2" strokeLinecap="round"/>
                {/* Braço direito (para frente) */}
                <line x1="14" y1="8" x2="18" y2="12" stroke={loggedIn&&tab==="treino"?"#fff":"#6b7db3"} strokeWidth="1.8" strokeLinecap="round"/>
                {/* Braço esquerdo (para trás) */}
                <line x1="13" y1="8.5" x2="9" y2="11" stroke={loggedIn&&tab==="treino"?"#fff":"#6b7db3"} strokeWidth="1.8" strokeLinecap="round"/>
                {/* Perna direita (para frente-baixo) */}
                <line x1="11" y1="13" x2="14" y2="19" stroke={loggedIn&&tab==="treino"?"#fff":"#6b7db3"} strokeWidth="2" strokeLinecap="round"/>
                <line x1="14" y1="19" x2="18" y2="22" stroke={loggedIn&&tab==="treino"?"#fff":"#6b7db3"} strokeWidth="1.8" strokeLinecap="round"/>
                {/* Perna esquerda (para trás-cima) */}
                <line x1="11" y1="13" x2="8" y2="18" stroke={loggedIn&&tab==="treino"?"#fff":"#6b7db3"} strokeWidth="2" strokeLinecap="round"/>
                <line x1="8" y1="18" x2="5" y2="16" stroke={loggedIn&&tab==="treino"?"#fff":"#6b7db3"} strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </div>
            <span style={{fontSize:8.5,fontWeight:700,color:loggedIn&&tab==="treino"?C.tp:C.tg,letterSpacing:0.2,fontFamily:"monospace",textTransform:"uppercase",marginTop:2}}>Treino</span>
          </button>
          {[
            {id:"analise",n:"report",l:"Análise"},
            {id:"studio", n:"studio",l:"Studio"},
          ].map(t=>{
            const active = loggedIn && tab===t.id;
            const disabled = !loggedIn;
            return (
              <button key={t.id} disabled={disabled} onClick={()=>{if(!disabled){setTab(t.id);setSubScreen(null);}}} style={{flex:1,background:"none",border:"none",cursor:disabled?"default":"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"4px 0",opacity:disabled?0.55:1}}>
                <Ic n={t.n} z={19} c={active?C.cyanB:C.tg}/>
                <span style={{fontSize:8.5,fontWeight:700,color:active?C.tp:C.tg,letterSpacing:0.2,fontFamily:"monospace",textTransform:"uppercase"}}>{t.l}</span>
                {active&&<div style={{width:12,height:3,borderRadius:2,background:"linear-gradient(90deg,"+C.violet+","+C.cyan+")"}}/>}
              </button>
            );
          })}
        </div>

        {selectedRun&&(
          <RunDetailModal run={selectedRun} onClose={()=>setSelectedRun(null)} onShare={(r)=>{setSelectedRun(null);setTab("studio");setStudioTab("card");setTimeout(()=>{const ev=new CustomEvent("tr_studio_run",{detail:r});window.dispatchEvent(ev);},100);}}/>
        )}

        <GarminConnectModal
          open={showGarminModal}
          connected={garminConnected}
          onClose={()=>setShowGarminModal(false)}
          onConfirm={confirmarGarmin}
          onDisconnect={disconnectGarmin}
        />
      </div>
    </div>
  );
}