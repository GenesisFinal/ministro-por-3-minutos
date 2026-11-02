import React from 'react';
import {
  Clock,
  Flame,
  TrendingUp,
  Scale,
  Volume2,
  VolumeX,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Radio,
} from 'lucide-react';

export default function StickyCrisisHeader({
  timeLeft,
  fiscalResult,
  totalRevenueReal,
  totalSpending,
  pazSocial,
  actividad,
  latestNews,
  muted,
  onToggleMute,
  onReset,
  onConfirmVictory,
  gameStatus,
}) {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  const isLowTime = timeLeft <= 30 && gameStatus === 'playing';
  const isGoalMet = fiscalResult >= -0.001 && pazSocial > 0 && actividad > 0;

  // Progress bar for Fiscal Result (-4.00% to 0.00%)
  // At -4.00 => 20%, at -5.00 => 0%, at 0.00 => 100%
  const fiscalProgress = Math.max(
    0,
    Math.min(100, ((fiscalResult + 4.5) / 4.5) * 100)
  );

  const getSemaphoreColor = (val) => {
    if (val >= 50) {
      return {
        bar: 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]',
        text: 'text-emerald-400',
        border: 'border-emerald-500/30',
        badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
        status: 'ESTABLE',
      };
    }
    if (val >= 25) {
      return {
        bar: 'bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.5)]',
        text: 'text-amber-400',
        border: 'border-amber-500/40',
        badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
        status: 'TENSIÓN',
      };
    }
    return {
      bar: 'bg-rose-600 animate-pulse shadow-[0_0_15px_rgba(225,29,72,0.8)]',
      text: 'text-rose-400 animate-pulse',
      border: 'border-rose-500/60',
      badge: 'bg-rose-500/20 text-rose-300 border-rose-500/50 animate-pulse',
      status: 'CRÍTICO',
    };
  };

  const pazStyle = getSemaphoreColor(pazSocial);
  const actStyle = getSemaphoreColor(actividad);

  const fiscalColor =
    fiscalResult >= -0.001
      ? 'text-emerald-400'
      : fiscalResult >= -1.5
      ? 'text-amber-400'
      : 'text-rose-400';

  const fiscalBarColor =
    fiscalResult >= -0.001
      ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]'
      : fiscalResult >= -1.5
      ? 'bg-amber-500'
      : 'bg-rose-500';

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/90 shadow-2xl">
      {/* Top Bar: Brand + Timer + Quick Actions */}
      <div className="max-w-5xl mx-auto px-3 sm:px-6 pt-2.5 pb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-rose-500/15 border border-rose-500/40 text-rose-400">
            <Scale className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-black tracking-tight uppercase text-slate-100">
                Ministro <span className="text-amber-400">x 3 Minutos</span>
              </h1>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-800 text-slate-300 rounded border border-slate-700">
                SALA DE SITUACIÓN · MECON
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Misión: Eliminar el déficit (-4.00% PBI → 0.00%) sin colapsar la calle ni la economía
            </p>
          </div>
        </div>

        {/* Countdown Clock & Controls */}
        <div className="flex items-center gap-2">
          {isGoalMet && gameStatus === 'playing' && (
            <button
              onClick={onConfirmVictory}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-[0_0_20px_rgba(16,185,129,0.6)] animate-bounce transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
              <span>¡FIRMAR PRESUPUESTO!</span>
            </button>
          )}

          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono font-bold text-base sm:text-lg tabular-nums transition-colors ${
              isLowTime
                ? 'bg-rose-950/90 border-rose-500 text-rose-300 animate-pulse shadow-[0_0_15px_rgba(225,29,72,0.5)]'
                : 'bg-slate-900 border-slate-700/80 text-amber-400'
            }`}
          >
            <Clock className={`w-4 h-4 ${isLowTime ? 'text-rose-400 animate-spin' : 'text-amber-400'}`} />
            <span>
              {minutes}:{seconds}
            </span>
          </div>

          <button
            onClick={onToggleMute}
            title={muted ? 'Activar sonido' : 'Silenciar'}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
          >
            {muted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>

          <button
            onClick={onReset}
            title="Reiniciar partida"
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Master 3 Crisis Gauges */}
      <div className="max-w-5xl mx-auto px-3 sm:px-6 pb-2.5 grid grid-cols-3 gap-2 sm:gap-3">
        {/* 1. RESULTADO FISCAL */}
        <div
          className={`rounded-xl p-2 sm:p-3 bg-slate-900/90 border transition-all ${
            isGoalMet ? 'border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.15)]' : 'border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 truncate">
              1. Resultado Fiscal
            </span>
            <span
              className={`hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                isGoalMet
                  ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                  : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
              }`}
            >
              {fiscalResult >= -0.001 ? 'META LOGRADA' : 'META: 0.00%'}
            </span>
          </div>

          <div className="flex items-baseline justify-between gap-1">
            <span className={`font-mono text-lg sm:text-2xl font-black tabular-nums ${fiscalColor}`}>
              {fiscalResult > 0 ? `+${fiscalResult.toFixed(2)}` : fiscalResult.toFixed(2)}%
            </span>
            <span className="text-[10px] font-mono text-slate-400 hidden md:inline">
              Ing {totalRevenueReal.toFixed(2)}% · Gas {totalSpending.toFixed(2)}%
            </span>
          </div>

          <div className="mt-1.5 w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div
              className={`h-full transition-all duration-300 rounded-full ${fiscalBarColor}`}
              style={{ width: `${fiscalProgress}%` }}
            />
          </div>
        </div>

        {/* 2. PAZ SOCIAL */}
        <div className={`rounded-xl p-2 sm:p-3 bg-slate-900/90 border transition-all ${pazStyle.border}`}>
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 truncate">
              <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0 hidden sm:inline" />
              <span>2. Paz Social</span>
            </span>
            <span className={`hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded border ${pazStyle.badge}`}>
              {pazStyle.status}
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <span className={`font-mono text-lg sm:text-2xl font-black tabular-nums ${pazStyle.text}`}>
              {Math.round(pazSocial)}%
            </span>
            <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">
              {pazSocial < 25 ? '¡CAOS EN CALLE!' : 'Base 65%'}
            </span>
          </div>

          <div className="mt-1.5 w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div
              className={`h-full transition-all duration-300 rounded-full ${pazStyle.bar}`}
              style={{ width: `${Math.max(0, Math.min(100, pazSocial))}%` }}
            />
          </div>
        </div>

        {/* 3. ACTIVIDAD ECONÓMICA */}
        <div className={`rounded-xl p-2 sm:p-3 bg-slate-900/90 border transition-all ${actStyle.border}`}>
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 truncate">
              <TrendingUp className="w-3.5 h-3.5 text-sky-400 shrink-0 hidden sm:inline" />
              <span>3. Actividad</span>
            </span>
            <span className={`hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded border ${actStyle.badge}`}>
              {actStyle.status}
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <span className={`font-mono text-lg sm:text-2xl font-black tabular-nums ${actStyle.text}`}>
              {Math.round(actividad)}%
            </span>
            <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">
              {actividad < 25 ? '¡DEPRESIÓN!' : 'Base 60%'}
            </span>
          </div>

          <div className="mt-1.5 w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div
              className={`h-full transition-all duration-300 rounded-full ${actStyle.bar}`}
              style={{ width: `${Math.max(0, Math.min(100, actividad))}%` }}
            />
          </div>
        </div>
      </div>

      {/* Live Crisis Ticker */}
      <div className="bg-slate-900/90 border-t border-slate-800/80 px-3 sm:px-6 py-1.5">
        <div className="max-w-5xl mx-auto flex items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono text-[10px] font-bold uppercase shrink-0">
            <Radio className="w-3 h-3 animate-pulse text-amber-400" />
            CABLE EN VIVO
          </span>
          <p className="text-slate-300 font-medium truncate text-[11px] sm:text-xs">
            {latestNews}
          </p>
        </div>
      </div>
    </header>
  );
}
