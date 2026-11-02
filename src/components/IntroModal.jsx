import React from 'react';
import { Scale, Flame, TrendingUp, Clock, Play, AlertTriangle } from 'lucide-react';

export default function IntroModal({ onStart }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700/80 shadow-[0_0_60px_rgba(0,0,0,0.8)] overflow-hidden my-auto">
        <div className="bg-gradient-to-r from-rose-600 via-amber-500 to-emerald-500 h-1.5 w-full" />

        <div className="p-5 sm:p-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 font-mono text-[11px] font-bold uppercase mb-3">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            Simulador de Emergencia Económica
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
            Ministro por <span className="text-amber-400">3 Minutos</span>
          </h1>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            Acabas de jurar en el Palacio de Hacienda en medio de una crisis terminal. Tienes{' '}
            <strong className="text-amber-300 font-mono">180 segundos</strong> para llevar el{' '}
            <strong className="text-rose-400 font-mono">Déficit Fiscal de -4.00% del PBI a 0.00%</strong>{' '}
            (o superávit) sin que estalle la calle ni se frene por completo la economía.
          </p>

          {/* 3 Rules Summary */}
          <div className="mt-4 space-y-2.5">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <Scale className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300">
                <strong className="text-slate-100 block">1. Meta Fiscal: de -4.00% a 0.00% del PBI</strong>
                Recorta entre 8 bloques de Gasto (20.50% PBI) o sube Impuestos (16.50% PBI). Cuidado con el{' '}
                <span className="text-sky-300 font-semibold">Efecto Laffer</span>: cada 1.00% de suba impositiva solo recauda 0.75% real neto.
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <Flame className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300">
                <strong className="text-slate-100 block">2. Paz Social (Inicia en 65%)</strong>
                Recortar jubilaciones, planes, subsidios o salarios incendia la calle. Si llega a{' '}
                <span className="text-rose-400 font-mono font-bold">0%</span>, te piden la renuncia de inmediato.
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <TrendingUp className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300">
                <strong className="text-slate-100 block">3. Actividad Económica (Inicia en 60%)</strong>
                Subir impuestos, frenar obra pública o declarar el Default hunde la producción. Si llega a{' '}
                <span className="text-rose-400 font-mono font-bold">0%</span>, colapsa la recaudación y pierdes.
              </div>
            </div>
          </div>

          <div className="mt-4 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center gap-2 text-xs text-amber-200">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Shocks Imprevistos:</strong> En momentos aleatorios caerán shocks externos tanto{' '}
              <span className="text-emerald-300 font-semibold">positivos (viento de cola)</span> como{' '}
              <span className="text-rose-300 font-semibold">negativos (crisis)</span>.
            </span>
          </div>

          <button
            onClick={onStart}
            className="mt-5 w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm sm:text-base uppercase tracking-wider shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all cursor-pointer"
          >
            <Play className="w-5 h-5 fill-slate-950" />
            <span>Jurar como Ministro (Iniciar 03:00)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
