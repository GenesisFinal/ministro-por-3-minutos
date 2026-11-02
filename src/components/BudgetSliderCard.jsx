import React from 'react';
import {
  Crown,
  Zap,
  HardHat,
  Building2,
  Users,
  HeartHandshake,
  HeartPulse,
  Landmark,
  ShoppingCart,
  Wheat,
  Briefcase,
  Receipt,
  ShieldCheck,
  Lock,
  Skull,
  RotateCcw,
  Minus,
  Plus,
} from 'lucide-react';
import { INITIAL_STATE } from '../data/budgetConfig';

const ICON_MAP = {
  Crown,
  Zap,
  HardHat,
  Building2,
  Users,
  HeartHandshake,
  HeartPulse,
  Landmark,
  ShoppingCart,
  Wheat,
  Briefcase,
  Receipt,
  ShieldCheck,
};

export default function BudgetSliderCard({
  block,
  value,
  isDefaulted,
  onChange,
  onDeclareDefault,
  disabled,
}) {
  const IconComponent = ICON_MAP[block.icon] || Landmark;
  const isSpending = block.category === 'spending';

  const nominalDelta = value - block.initial;
  const isModified = Math.abs(nominalDelta) > 0.004 || (block.hasDefaultButton && isDefaulted);

  // Fiscal effect of this block's change:
  // Spending cut (nominalDelta < 0) => improves fiscal result (-nominalDelta)
  // Tax hike (nominalDelta > 0) => improves fiscal result by nominalDelta * 0.75 (Laffer effect)
  // Tax cut (nominalDelta < 0) => reduces fiscal result by nominalDelta * 0.75
  let fiscalEffect = 0;
  if (isSpending) {
    fiscalEffect = -nominalDelta;
  } else {
    fiscalEffect = nominalDelta >= 0 ? nominalDelta * INITIAL_STATE.lafferFactor : nominalDelta;
  }

  const impact = block.computeImpact(value, isDefaulted);
  const pazImpact = Math.round(impact.pazSocial * 10) / 10;
  const actImpact = Math.round(impact.actividad * 10) / 10;

  // Slider percentage fill
  const percent =
    block.max > block.min
      ? Math.max(0, Math.min(100, ((value - block.min) / (block.max - block.min)) * 100))
      : 100;

  const initialPercent =
    block.max > block.min
      ? Math.max(0, Math.min(100, ((block.initial - block.min) / (block.max - block.min)) * 100))
      : 100;

  const trackColor = isSpending ? '#f43f5e' : '#38bdf8';

  const handleStep = (dir) => {
    if (disabled || block.locked) return;
    const next = Math.max(
      block.min,
      Math.min(block.max, Number((value + dir * block.step).toFixed(2)))
    );
    onChange(block.id, next);
  };

  return (
    <div
      className={`relative rounded-xl p-3.5 sm:p-4 transition-all border ${
        isModified
          ? isSpending
            ? 'bg-slate-900/95 border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.06)]'
            : 'bg-slate-900/95 border-sky-500/40 shadow-[0_0_20px_rgba(56,189,248,0.06)]'
          : 'bg-slate-900/70 border-slate-800/90 hover:border-slate-700'
      }`}
    >
      {/* Card Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-start gap-2.5 min-w-0">
          <div
            className={`p-2 rounded-lg shrink-0 mt-0.5 border ${
              isSpending
                ? 'bg-rose-500/10 border-rose-500/25 text-rose-400'
                : 'bg-sky-500/10 border-sky-500/25 text-sky-400'
            }`}
          >
            <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="text-sm sm:text-base font-bold text-slate-100 leading-tight">
                {block.name}
              </h3>
              {block.badge && (
                <span className="px-1.5 py-0.5 text-[10px] font-mono font-extrabold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded">
                  {block.badge}
                </span>
              )}
              {block.locked && !block.hasDefaultButton && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono font-bold uppercase bg-slate-800 text-slate-400 border border-slate-700 rounded">
                  <Lock className="w-3 h-3" /> FIJO
                </span>
              )}
            </div>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 leading-snug">
              {block.ruleSummary}
            </p>
          </div>
        </div>

        {/* Current % GDP Readout */}
        <div className="text-right shrink-0">
          <div className="font-mono text-base sm:text-xl font-black text-slate-100 tabular-nums">
            {value.toFixed(2)}%
            <span className="text-[10px] font-normal text-slate-400 ml-1">PBI</span>
          </div>
          <div className="text-[10px] font-mono text-slate-500">
            Base: {block.initial.toFixed(2)}%
          </div>
        </div>
      </div>

      {/* Default Button Special Case (Block 8: Intereses de Deuda) */}
      {block.hasDefaultButton ? (
        <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Lock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              {isDefaulted
                ? '¡DEFAULT DECLARADO! Ahorraste 1.60% PBI pero destruiste el crédito y la calle.'
                : 'Compromiso rígido. Solo puedes eliminarlo entrando en cesación de pagos.'}
            </span>
          </div>

          {!isDefaulted ? (
            <button
              type="button"
              disabled={disabled}
              onClick={onDeclareDefault}
              className="flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/50 font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(225,29,72,0.25)] hover:shadow-[0_0_20px_rgba(225,29,72,0.7)] shrink-0 cursor-pointer"
            >
              <Skull className="w-4 h-4" />
              <span>Declarar Default (0.00% PBI)</span>
            </button>
          ) : (
            <span className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950 border border-rose-500 text-rose-300 font-mono font-bold text-xs uppercase">
              <Skull className="w-4 h-4 text-rose-400 animate-bounce" />
              EN DEFAULT (-35 ACT / -20 PAZ)
            </span>
          )}
        </div>
      ) : !block.locked ? (
        /* Interactive Range Slider + Step Controls */
        <div className="mt-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={disabled || value <= block.min}
              onClick={() => handleStep(-1)}
              className="w-8 h-8 rounded-lg bg-slate-800/90 hover:bg-slate-700 disabled:opacity-30 flex items-center justify-center text-slate-200 border border-slate-700 transition-colors shrink-0"
              aria-label="Disminuir"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>

            <div className="relative flex-1 flex items-center py-2">
              {/* Initial baseline tick marker */}
              <div
                className="absolute top-0.5 bottom-0.5 w-0.5 bg-slate-400/70 z-10 pointer-events-none"
                style={{ left: `${initialPercent}%` }}
                title={`Valor inicial: ${block.initial.toFixed(2)}%`}
              />
              <input
                type="range"
                min={block.min}
                max={block.max}
                step={block.step}
                value={value}
                disabled={disabled}
                onChange={(e) => onChange(block.id, parseFloat(e.target.value))}
                className="crisis-slider relative z-20"
                style={{
                  background: `linear-gradient(to right, ${trackColor} 0%, ${trackColor} ${percent}%, #1e293b ${percent}%, #1e293b 100%)`,
                }}
              />
            </div>

            <button
              type="button"
              disabled={disabled || value >= block.max}
              onClick={() => handleStep(1)}
              className="w-8 h-8 rounded-lg bg-slate-800/90 hover:bg-slate-700 disabled:opacity-30 flex items-center justify-center text-slate-200 border border-slate-700 transition-colors shrink-0"
              aria-label="Aumentar"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Min / Initial / Max Labels */}
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mt-0.5 px-9">
            <span>Mín: {block.min.toFixed(2)}%</span>
            <span>Inicial: {block.initial.toFixed(2)}%</span>
            <span>Máx: {block.max.toFixed(2)}%</span>
          </div>
        </div>
      ) : null}

      {/* Live Impact Badges Footer (Only shown when modified) */}
      {isModified && (
        <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-1.5">
          <div className="flex items-center flex-wrap gap-1.5">
            {/* Fiscal Impact Badge */}
            {Math.abs(fiscalEffect) > 0.004 && (
              <span
                className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold border ${
                  fiscalEffect > 0
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                    : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                }`}
              >
                Caja Fiscal: {fiscalEffect > 0 ? `+${fiscalEffect.toFixed(2)}%` : `${fiscalEffect.toFixed(2)}%`} PBI
                {!isSpending && nominalDelta > 0 ? ' (Neto Laffer)' : ''}
              </span>
            )}

            {/* Paz Social Impact Badge */}
            {Math.abs(pazImpact) >= 0.5 && (
              <span
                className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold border ${
                  pazImpact > 0
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                    : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                }`}
              >
                Paz Social: {pazImpact > 0 ? `+${pazImpact}` : pazImpact} pts
              </span>
            )}

            {/* Actividad Impact Badge */}
            {Math.abs(actImpact) >= 0.5 && (
              <span
                className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold border ${
                  actImpact > 0
                    ? 'bg-sky-500/15 text-sky-300 border-sky-500/30'
                    : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                }`}
              >
                Actividad: {actImpact > 0 ? `+${actImpact}` : actImpact} pts
              </span>
            )}
          </div>

          {!block.hasDefaultButton && (
            <button
              type="button"
              disabled={disabled}
              onClick={() => onChange(block.id, block.initial)}
              className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-slate-200 px-1.5 py-0.5 rounded bg-slate-800/70 hover:bg-slate-800 transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          )}
        </div>
      )}
    </div>
  );
}
