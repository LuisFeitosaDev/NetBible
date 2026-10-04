"use client";

/**
 * Fundo sonoro do momento guiado, feito na hora com Web Audio: sem arquivo de
 * áudio para baixar e sem música de terceiros para licenciar.
 *
 * - "ambiente": acordes longos e quentes que mudam devagar (um a cada ~14 s),
 *   com sinos esparsos de uma escala pentatônica, tudo passando por um reverb.
 *   Os sinos são sorteados, então a trilha nunca se repete igual.
 * - "chuva": ruído filtrado, com o volume oscilando de leve, como chuva fina.
 *
 * Tudo entra e sai em fade; volume e escolha ficam com quem chama.
 */

export type Ambiente = "silencio" | "ambiente" | "chuva";

export type Trilha = { volume: (v: number) => void; parar: () => void };

/** Resposta de impulso sintética: ruído que decai, um salão de ~4 s. */
function reverb(ctx: AudioContext) {
  const dur = 4;
  const n = Math.floor(ctx.sampleRate * dur);
  const ir = ctx.createBuffer(2, n, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = ir.getChannelData(c);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 3);
  }
  const conv = ctx.createConvolver();
  conv.buffer = ir;
  return conv;
}

const nota = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);

/** Quatro acordes em Ré maior, voz grave aberta: I, vi, IV, V sus. */
const ACORDES = [
  [50, 57, 62, 66, 69], // Ré
  [47, 54, 59, 62, 66], // Si menor
  [43, 50, 55, 59, 62], // Sol
  [45, 52, 57, 62, 64], // Lá sus
];
const SINOS = [74, 76, 78, 81, 83, 86]; // pentatônica de Ré, oitava de cima

function ambiente(ctx: AudioContext, saida: AudioNode) {
  const sala = reverb(ctx);
  const molhado = ctx.createGain();
  molhado.gain.value = 0.55;
  sala.connect(molhado).connect(saida);

  const filtro = ctx.createBiquadFilter();
  filtro.type = "lowpass";
  filtro.frequency.value = 900;
  filtro.Q.value = 0.4;
  // O filtro respira devagar: a trilha não fica parada.
  const lfo = ctx.createOscillator();
  const lfoGanho = ctx.createGain();
  lfo.frequency.value = 0.05;
  lfoGanho.gain.value = 350;
  lfo.connect(lfoGanho).connect(filtro.frequency);
  lfo.start();
  filtro.connect(saida);
  filtro.connect(sala);

  let vivos: OscillatorNode[] = [];
  let indice = 0;
  const DUR = 14;

  const tocarAcorde = () => {
    const t = ctx.currentTime;
    const acorde = ACORDES[indice++ % ACORDES.length];
    const novos: OscillatorNode[] = [];
    for (const m of acorde) {
      for (const [tipo, desafino, vol] of [
        ["sine", 0, 0.05],
        ["triangle", 6, 0.018],
      ] as const) {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = tipo;
        o.frequency.value = nota(m);
        o.detune.value = desafino;
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(vol, t + 5);
        g.gain.setValueAtTime(vol, t + DUR - 1);
        g.gain.linearRampToValueAtTime(0, t + DUR + 5);
        o.connect(g).connect(filtro);
        o.start(t);
        o.stop(t + DUR + 5.5);
        novos.push(o);
      }
    }
    vivos = novos;
  };

  const tocarSino = () => {
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.value = nota(SINOS[Math.floor(Math.random() * SINOS.length)]);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.035, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 5);
    o.connect(g);
    g.connect(sala);
    g.connect(saida);
    o.start(t);
    o.stop(t + 5.2);
  };

  tocarAcorde();
  const relogioAcordes = setInterval(tocarAcorde, DUR * 1000);
  let relogioSino: ReturnType<typeof setTimeout>;
  const agendarSino = () => {
    relogioSino = setTimeout(() => {
      tocarSino();
      agendarSino();
    }, 3500 + Math.random() * 6000);
  };
  agendarSino();

  return () => {
    clearInterval(relogioAcordes);
    clearTimeout(relogioSino);
    lfo.stop(ctx.currentTime + 4);
    vivos.forEach((o) => {
      try {
        o.stop(ctx.currentTime + 4);
      } catch {
        /* já parou */
      }
    });
  };
}

function chuva(ctx: AudioContext, saida: AudioNode) {
  // Ruído rosado aproximado, em loop de 4 s.
  const n = ctx.sampleRate * 4;
  const buf = ctx.createBuffer(2, n, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = buf.getChannelData(c);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < n; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.997 * b0 + w * 0.029;
      b1 = 0.985 * b1 + w * 0.032;
      b2 = 0.95 * b2 + w * 0.048;
      d[i] = (b0 + b1 + b2 + w * 0.04) * 0.6;
    }
  }
  const fonte = ctx.createBufferSource();
  fonte.buffer = buf;
  fonte.loop = true;
  const passa = ctx.createBiquadFilter();
  passa.type = "bandpass";
  passa.frequency.value = 1400;
  passa.Q.value = 0.5;
  const g = ctx.createGain();
  g.gain.value = 0.5;
  // Rajadas suaves, como chuva que aperta e alivia.
  const lfo = ctx.createOscillator();
  const lfoGanho = ctx.createGain();
  lfo.frequency.value = 0.08;
  lfoGanho.gain.value = 0.12;
  lfo.connect(lfoGanho).connect(g.gain);
  fonte.connect(passa).connect(g).connect(saida);
  fonte.start();
  lfo.start();
  return () => {
    fonte.stop(ctx.currentTime + 4);
    lfo.stop(ctx.currentTime + 4);
  };
}

/** Começa a trilha com fade de 3 s. `parar` faz o fade de saída e desliga. */
export function tocarAmbiente(ctx: AudioContext, tipo: Exclude<Ambiente, "silencio">, volume: number): Trilha {
  const mestre = ctx.createGain();
  mestre.gain.setValueAtTime(0, ctx.currentTime);
  mestre.gain.linearRampToValueAtTime(volume, ctx.currentTime + 3);
  mestre.connect(ctx.destination);
  const desligar = tipo === "ambiente" ? ambiente(ctx, mestre) : chuva(ctx, mestre);
  return {
    volume: (v) => mestre.gain.setTargetAtTime(v, ctx.currentTime, 0.3),
    parar: () => {
      mestre.gain.cancelScheduledValues(ctx.currentTime);
      mestre.gain.setTargetAtTime(0, ctx.currentTime, 0.8);
      desligar();
      setTimeout(() => mestre.disconnect(), 4500);
    },
  };
}
