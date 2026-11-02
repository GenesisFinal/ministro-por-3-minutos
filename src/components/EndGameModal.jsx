import React, { useState } from 'react';
import {
  Trophy,
  Skull,
  Clock,
  Share2,
  RotateCcw,
  Check,
  Flame,
  TrendingUp,
  Scale,
  Award,
} from 'lucide-react';

export default function EndGameModal({
  gameStatus,
  lossReason,
  fiscalResult,
  pazSocial,
  actividad,
  timeLeft,
  isDefaulted,
  totalSpending,
  totalRevenueReal,
  onRestart,
}) {
  const [copied, setCopied] = useState(false);

  if (gameStatus !== 'won' && gameStatus !== 'lost') return null;

  const isVictory = gameStatus === 'won';
  const timeUsed = 180 - timeLeft;
  const minUsed = Math.floor(timeUsed / 60);
  const secUsed = String(timeUsed % 60).padStart(2, '0');

  // Determine Minister Archetype
  const getArchetype = () => {
    if (!isVictory) {
      if (lossReason === 'paz_social') {
        return {
          title: 'Ministro Eyectado en Helicóptero',
          desc: 'Cerraste los números en el Excel sin mirar la calle. El estallido social forzó tu renuncia antes de firmar el decreto.',
        };
      }
      if (lossReason === 'actividad') {
        return {
          title: 'Arquitecto del Frenazo Total',
          desc: 'Asfixiaste la economía con impuestos y recortes productivos hasta provocar una depresión con derrumbe de recaudación.',
        };
      }
      return {
        title: 'Ministro Gradualista sin Tiempo',
        desc: 'Se agotaron los 180 segundos sin llegar al equilibrio fiscal. El mercado te soltó la mano y se disparó el Riesgo País.',
      };
    }

    if (isDefaulted) {
      return {
        title: 'Reestructurador de Trincheras',
        desc: 'Lograste el equilibrio fiscal pateando el tablero con un Default soberano y sobreviviendo al terremoto posterior.',
      };
    }
    if (totalSpending <= 16.6 && totalRevenueReal <= 16.6) {
      return {
        title: 'Cirujano de Motosierra Ortodoxa',
        desc: 'Eliminaste el déficit recortando el gasto público sin subir impuestos, manteniendo a flote la gobernabilidad.',
      };
    }
    if (pazSocial >= 50 && actividad >= 45) {
      return {
        title: 'Equilibrista Clínico de Estado',
        desc: 'Alcanzaste el déficit cero calibrando gastos e ingresos con bisturí quirúrgico y alta estabilidad macroeconómica.',
      };
    }
    return {
      title: 'Domador de Tormentas Fiscales',
      desc: 'Cruzaste la meta del equilibrio fiscal al límite de la resistencia social y productiva.',
    };
  };

  const archetype = getArchetype();

  const handleShare = async () => {
    const statusEmoji = isVictory ? '🟢 ¡SUPERÁVIT / EQUILIBRIO LOGRADO!' : '🔴 RENUNCIA FORZADA';
    const text = [
      `🏛️ MINISTRO POR 3 MINUTOS`,
      `${statusEmoji}`,
      `🎖️ Perfil: ${archetype.title}`,
      `📊 Resultado Fiscal: ${fiscalResult > 0 ? `+${fiscalResult.toFixed(2)}` : fiscalResult.toFixed(2)}% PBI`,
      `🔥 Paz Social: ${Math.round(pazSocial)}% | 📈 Actividad: ${Math.round(actividad)}%`,
      `⏱️ Tiempo: ${minUsed}m ${secUsed}s`,
      `¿Puedes eliminar el déficit de -4.00% sin que estalle el país?`,
    ].join('\n');

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Ministro por 3 Minutos',
          text,
        });
      } else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      }
    } catch {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } catch {
        // Ignore
      }
    }
  };

  const getLossHeadline = () => {
    if (lossReason === 'paz_social') {
      return 'Te pidieron la renuncia por caos en la calle';
    }
    if (lossReason === 'actividad') {
      return 'Frenazo económico total y caída de recaudación';
    }
    return 'Se agotó el tiempo y no llegaste al Déficit Cero';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-lg overflow-y-auto">
      <div
        className={`relative w-full max-w-lg rounded-2xl bg-slate-900 border-2 p-5 sm:p-6 shadow-2xl my-auto ${
          isVictory
            ? 'border-emerald-500/80 shadow-[0_0_60px_rgba(16,185,129,0.3)]'
            : 'border-rose-500/80 shadow-[0_0_60px_rgba(225,29,72,0.35)]'
        }`}
      >
        {/* Top Icon & Status */}
        <div className="flex flex-col items-center text-center">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center border mb-3 ${
              isVictory
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                : 'bg-rose-500/15 border-rose-500/40 text-rose-400'
            }`}
          >
            {isVictory ? (
              <Trophy className="w-9 h-9" />
            ) : lossReason === 'timeout' ? (
              <Clock className="w-9 h-9" />
            ) : (
              <Skull className="w-9 h-9" />
            )}
          </div>

          <span
            className={`px-2.5 py-0.5 rounded-full font-mono text-xs font-black uppercase tracking-wider border ${
              isVictory
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
            }`}
          >
            {isVictory ? '¡MISIÓN CUMPLIDA · EQUILIBRIO FISCAL!' : 'FIN DE LA GESTIÓN · CRISIS TERMINAL'}
          </span>

          <h2 className="mt-2 text-xl sm:text-2xl font-black text-slate-100">
            {isVictory ? '¡Estabilizaste las Cuentas Públicas!' : getLossHeadline()}
          </h2>
        </div>

        {/* Archetype Badge */}
        <div className="mt-4 p-3.5 rounded-xl bg-slate-950/90 border border-slate-800">
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase mb-1">
            <Award className="w-4 h-4" />
            <span>Rango de Gestión: {archetype.title}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {archetype.desc}
          </p>
        </div>

        {/* Final Metrics Grid */}
        <div className="mt-4 grid grid-cols-3 gap-2.5">
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
            <div className="flex items-center justify-center gap-1 text-[10px] font-mono uppercase text-slate-400">
              <Scale className="w-3 h-3 text-emerald-400" />
              <span>Fiscal</span>
            </div>
            <div
              className={`mt-1 font-mono text-base sm:text-xl font-black ${
                fiscalResult >= -0.001 ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {fiscalResult > 0 ? `+${fiscalResult.toFixed(2)}%` : `${fiscalResult.toFixed(2)}%`}
            </div>
            <div className="text-[10px] font-mono text-slate-500">Meta: 0.00%</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
            <div className="flex items-center justify-center gap-1 text-[10px] font-mono uppercase text-slate-400">
              <Flame className="w-3 h-3 text-amber-400" />
              <span>Paz Social</span>
            </div>
            <div
              className={`mt-1 font-mono text-base sm:text-xl font-black ${
                pazSocial > 0 ? 'text-amber-400' : 'text-rose-500'
              }`}
            >
              {Math.round(pazSocial)}%
            </div>
            <div className="text-[10px] font-mono text-slate-500">Inició: 65%</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
            <div className="flex items-center justify-center gap-1 text-[10px] font-mono uppercase text-slate-400">
              <TrendingUp className="w-3 h-3 text-sky-400" />
              <span>Actividad</span>
            </div>
            <div
              className={`mt-1 font-mono text-base sm:text-xl font-black ${
                actividad > 0 ? 'text-sky-400' : 'text-rose-500'
              }`}
            >
              {Math.round(actividad)}%
            </div>
            <div className="text-[10px] font-mono text-slate-500">Inició: 60%</div>
          </div>
        </div>

        {/* Summary Sub-bar */}
        <div className="mt-3 px-3 py-2 rounded-lg bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Gasto Final: {totalSpending.toFixed(2)}% PBI</span>
          <span>Ingresos Netos: {totalRevenueReal.toFixed(2)}% PBI</span>
          <span>Tiempo: {minUsed}m {secUsed}s</span>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm uppercase tracking-wide transition-all cursor-pointer shadow-lg"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>¡Resultado Copiado!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>Compartir mi Resultado</span>
              </>
            )}
          </button>

          <button
            onClick={onRestart}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-sm uppercase tracking-wide border border-slate-700 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Intentar de Nuevo</span>
          </button>
        </div>
      </div>
    </div>
  );
}
