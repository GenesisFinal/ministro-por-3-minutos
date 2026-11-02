import React from 'react';
import {
  AlertOctagon,
  CloudOff,
  Scale,
  TrendingDown,
  Siren,
  ArrowRight,
} from 'lucide-react';

const SHOCK_ICONS = {
  CloudOff,
  Scale,
  TrendingDown,
  Siren,
};

export default function ShockModal({ shock, onSelectChoice }) {
  if (!shock) return null;

  const IconComponent = SHOCK_ICONS[shock.icon] || AlertOctagon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border-2 border-rose-500/80 shadow-[0_0_50px_rgba(225,29,72,0.45)] overflow-hidden">
        {/* Top Flashing Red Banner */}
        <div className="bg-rose-600 px-4 py-2 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 animate-bounce" />
            <span className="font-mono text-xs sm:text-sm font-black tracking-wider uppercase">
              ALERTA DE ÚLTIMO MOMENTO · RELOJ EN PAUSA
            </span>
          </div>
          <span className="text-[11px] font-mono bg-rose-950/60 px-2 py-0.5 rounded font-bold">
            DECISIÓN OBLIGATORIA
          </span>
        </div>

        <div className="p-5 sm:p-6">
          {/* Shock Header */}
          <div className="flex items-start gap-3.5 mb-4">
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-400 shrink-0">
              <IconComponent className="w-7 h-7" />
            </div>
            <div>
              <span className="inline-block text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400 mb-0.5">
                {shock.badge}
              </span>
              <h2 className="text-lg sm:text-xl font-black text-slate-100 leading-snug">
                {shock.title}
              </h2>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 mb-5">
            {shock.description}
          </p>

          {/* Decision Options */}
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              Elige tu respuesta como Ministro:
            </p>
            {shock.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => onSelectChoice(choice)}
                className="w-full text-left p-3.5 sm:p-4 rounded-xl bg-slate-950 hover:bg-slate-800/90 border border-slate-700/80 hover:border-amber-400 transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-sm sm:text-base text-slate-100 group-hover:text-amber-300 transition-colors">
                    {choice.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all shrink-0" />
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-snug">
                  {choice.subtitle}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
