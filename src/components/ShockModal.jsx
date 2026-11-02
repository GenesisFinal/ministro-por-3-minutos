import React from 'react';
import {
  AlertOctagon,
  CloudOff,
  Scale,
  TrendingDown,
  TrendingUp,
  Siren,
  Wheat,
  Zap,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

const SHOCK_ICONS = {
  CloudOff,
  Scale,
  TrendingDown,
  TrendingUp,
  Siren,
  Wheat,
  Zap,
  Sparkles,
};

export default function ShockModal({ shock, onSelectChoice }) {
  if (!shock) return null;

  const isPositive = shock.type === 'positive';
  const IconComponent = SHOCK_ICONS[shock.icon] || (isPositive ? Sparkles : AlertOctagon);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div
        className={`relative w-full max-w-lg rounded-2xl bg-slate-900 border-2 overflow-hidden ${
          isPositive
            ? 'border-emerald-500/80 shadow-[0_0_50px_rgba(16,185,129,0.4)]'
            : 'border-rose-500/80 shadow-[0_0_50px_rgba(225,29,72,0.45)]'
        }`}
      >
        {/* Top Banner */}
        <div
          className={`px-4 py-2 flex items-center justify-between text-white ${
            isPositive ? 'bg-emerald-600' : 'bg-rose-600'
          }`}
        >
          <div className="flex items-center gap-2">
            {isPositive ? (
              <Sparkles className="w-5 h-5 animate-spin" />
            ) : (
              <AlertOctagon className="w-5 h-5 animate-bounce" />
            )}
            <span className="font-mono text-xs sm:text-sm font-black tracking-wider uppercase">
              {isPositive
                ? '¡VIENTO DE COLA EXTERNO! · RELOJ EN PAUSA'
                : 'ALERTA DE ÚLTIMO MOMENTO · RELOJ EN PAUSA'}
            </span>
          </div>
          <span
            className={`text-[11px] font-mono px-2 py-0.5 rounded font-bold ${
              isPositive ? 'bg-emerald-950/60' : 'bg-rose-950/60'
            }`}
          >
            {isPositive ? 'OPORTUNIDAD' : 'DECISIÓN URGENTE'}
          </span>
        </div>

        <div className="p-5 sm:p-6">
          {/* Shock Header */}
          <div className="flex items-start gap-3.5 mb-4">
            <div
              className={`p-3 rounded-xl border shrink-0 ${
                isPositive
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                  : 'bg-rose-500/15 border-rose-500/40 text-rose-400'
              }`}
            >
              <IconComponent className="w-7 h-7" />
            </div>
            <div>
              <span
                className={`inline-block text-[11px] font-mono font-bold uppercase tracking-wider mb-0.5 ${
                  isPositive ? 'text-emerald-400' : 'text-amber-400'
                }`}
              >
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
              {isPositive
                ? '¿Cómo aprovecharás este shock positivo?'
                : 'Elige tu respuesta ante la crisis:'}
            </p>
            {shock.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => onSelectChoice(choice)}
                className={`w-full text-left p-3.5 sm:p-4 rounded-xl bg-slate-950 hover:bg-slate-800/90 border border-slate-700/80 transition-all group cursor-pointer ${
                  isPositive ? 'hover:border-emerald-400' : 'hover:border-amber-400'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`font-bold text-sm sm:text-base text-slate-100 transition-colors ${
                      isPositive ? 'group-hover:text-emerald-300' : 'group-hover:text-amber-300'
                    }`}
                  >
                    {choice.label}
                  </span>
                  <ArrowRight
                    className={`w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-all shrink-0 ${
                      isPositive ? 'group-hover:text-emerald-400' : 'group-hover:text-amber-400'
                    }`}
                  />
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
