import React, { useState, useEffect, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  TrendingDown,
  TrendingUp,
  Scissors,
  Landmark,
  AlertCircle,
  CheckCircle2,
  ShieldAlert,
  Sparkles,
  Layers,
} from 'lucide-react';
import {
  INITIAL_STATE,
  SPENDING_BLOCKS,
  REVENUE_BLOCKS,
} from './data/budgetConfig';
import { SHOCKS_AT_120, SHOCKS_AT_60 } from './data/shocksConfig';
import StickyCrisisHeader from './components/StickyCrisisHeader';
import BudgetSliderCard from './components/BudgetSliderCard';
import ShockModal from './components/ShockModal';
import EndGameModal from './components/EndGameModal';
import IntroModal from './components/IntroModal';
import { soundFX } from './utils/soundEffects';

const buildInitialValues = () => {
  const map = {};
  SPENDING_BLOCKS.forEach((b) => {
    map[b.id] = b.initial;
  });
  REVENUE_BLOCKS.forEach((b) => {
    map[b.id] = b.initial;
  });
  return map;
};

export default function App() {
  const [gameStatus, setGameStatus] = useState('intro'); // 'intro' | 'playing' | 'won' | 'lost'
  const [lossReason, setLossReason] = useState(null); // 'paz_social' | 'actividad' | 'timeout'
  const [timeLeft, setTimeLeft] = useState(INITIAL_STATE.timerSeconds);
  const [values, setValues] = useState(buildInitialValues);
  const [isDefaulted, setIsDefaulted] = useState(false);

  // Shocks state
  const [activeShock, setActiveShock] = useState(null);
  const [triggered120, setTriggered120] = useState(false);
  const [triggered60, setTriggered60] = useState(false);
  const [shockModifiers, setShockModifiers] = useState({
    fiscal: 0,
    paz: 0,
    actividad: 0,
  });
  const [shockHistory, setShockHistory] = useState([]);

  // Mobile filter tab: 'all' | 'spending' | 'revenue'
  const [activeTab, setActiveTab] = useState('all');
  const [muted, setMuted] = useState(false);
  const [latestNews, setLatestNews] = useState(
    'ASUNCIÓN EN HACIENDA: El mercado espera señales inmediatas para revertir el déficit del -4.00% del PBI.'
  );

  // Compute all macroeconomic & social indicators
  const metrics = useMemo(() => {
    // 1. Total Spending (% GDP)
    const adjustableSpending = SPENDING_BLOCKS.reduce(
      (acc, block) => acc + (values[block.id] ?? block.initial),
      0
    );
    const totalSpending =
      adjustableSpending + INITIAL_STATE.structuralSpendingOffset;

    // 2. Total Revenue (% GDP) with Laffer Effect (each +1.00% tax hike yields +0.75% net)
    let totalRevenueNominal = 0;
    let totalRevenueReal = 0;

    REVENUE_BLOCKS.forEach((block) => {
      const currentVal = values[block.id] ?? block.initial;
      totalRevenueNominal += currentVal;
      const diff = currentVal - block.initial;
      if (diff > 0) {
        totalRevenueReal += block.initial + diff * INITIAL_STATE.lafferFactor;
      } else {
        totalRevenueReal += currentVal;
      }
    });

    const effectiveRevenue = totalRevenueReal + shockModifiers.fiscal;
    const fiscalResult = Number((effectiveRevenue - totalSpending).toFixed(2));

    // 3. Paz Social & Actividad Económica
    let pazDeltaTotal = shockModifiers.paz;
    let actDeltaTotal = shockModifiers.actividad;

    SPENDING_BLOCKS.forEach((block) => {
      const impact = block.computeImpact(
        values[block.id] ?? block.initial,
        block.id === 'deuda' ? isDefaulted : false
      );
      pazDeltaTotal += impact.pazSocial;
      actDeltaTotal += impact.actividad;
    });

    REVENUE_BLOCKS.forEach((block) => {
      const impact = block.computeImpact(values[block.id] ?? block.initial);
      pazDeltaTotal += impact.pazSocial;
      actDeltaTotal += impact.actividad;
    });

    const pazSocial = Math.max(
      0,
      Math.min(100, INITIAL_STATE.basePazSocial + pazDeltaTotal)
    );
    const actividad = Math.max(
      0,
      Math.min(100, INITIAL_STATE.baseActividad + actDeltaTotal)
    );

    return {
      totalSpending,
      totalRevenueNominal,
      totalRevenueReal: effectiveRevenue,
      fiscalResult,
      pazSocial,
      actividad,
    };
  }, [values, isDefaulted, shockModifiers]);

  // Trigger Victory Confetti
  const triggerVictory = useCallback(() => {
    setGameStatus('won');
    soundFX.playVictory();
    try {
      confetti({
        particleCount: 110,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch {
      // Ignore confetti errors
    }
  }, []);

  // Immediate Game Over checks when Paz Social or Actividad hit 0%
  useEffect(() => {
    if (gameStatus !== 'playing') return;

    if (metrics.pazSocial <= 0) {
      setLossReason('paz_social');
      setGameStatus('lost');
      setActiveShock(null);
      soundFX.playDefeat();
    } else if (metrics.actividad <= 0) {
      setLossReason('actividad');
      setGameStatus('lost');
      setActiveShock(null);
      soundFX.playDefeat();
    }
  }, [metrics.pazSocial, metrics.actividad, gameStatus]);

  // 180-second Countdown & Real-Time Shock Dispatcher (120s and 60s)
  useEffect(() => {
    if (gameStatus !== 'playing' || activeShock !== null) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // Evaluate at 00:00
          if (
            metrics.fiscalResult >= -0.001 &&
            metrics.pazSocial > 0 &&
            metrics.actividad > 0
          ) {
            triggerVictory();
          } else {
            setLossReason('timeout');
            setGameStatus('lost');
            soundFX.playDefeat();
          }
          return 0;
        }
        const nextTime = prev - 1;
        if (nextTime <= 15) {
          soundFX.playTick(760, 0.03, 0.05);
        }
        return nextTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStatus, activeShock, metrics, triggerVictory]);

  // Trigger Shocks at 120s and 60s
  useEffect(() => {
    if (gameStatus !== 'playing') return;

    if (timeLeft === 120 && !triggered120) {
      setTriggered120(true);
      const randomShock =
        SHOCKS_AT_120[Math.floor(Math.random() * SHOCKS_AT_120.length)];
      setActiveShock(randomShock);
      soundFX.playShockAlert();
    } else if (timeLeft === 60 && !triggered60) {
      setTriggered60(true);
      const randomShock =
        SHOCKS_AT_60[Math.floor(Math.random() * SHOCKS_AT_60.length)];
      setActiveShock(randomShock);
      soundFX.playShockAlert();
    }
  }, [timeLeft, triggered120, triggered60, gameStatus]);

  // Handlers
  const handleSliderChange = (blockId, newValue) => {
    if (gameStatus !== 'playing') return;

    const allBlocks = [...SPENDING_BLOCKS, ...REVENUE_BLOCKS];
    const block = allBlocks.find((b) => b.id === blockId);
    const prevValue = values[blockId];

    setValues((prev) => ({
      ...prev,
      [blockId]: newValue,
    }));

    soundFX.playTick(480 + newValue * 30, 0.02, 0.03);

    if (block) {
      if (newValue < prevValue && block.newsOnCut) {
        setLatestNews(block.newsOnCut);
      } else if (newValue > prevValue && block.newsOnRaise) {
        setLatestNews(block.newsOnRaise);
      }
    }
  };

  const handleDeclareDefault = () => {
    if (gameStatus !== 'playing' || isDefaulted) return;
    soundFX.playDefaultSiren();
    setIsDefaulted(true);
    setValues((prev) => ({
      ...prev,
      deuda: 0.0,
    }));
    const deudaBlock = SPENDING_BLOCKS.find((b) => b.id === 'deuda');
    if (deudaBlock?.newsOnCut) {
      setLatestNews(deudaBlock.newsOnCut);
    }
  };

  const handleSelectShockChoice = (choice) => {
    if (!activeShock) return;
    const { fiscalDelta, pazDelta, actividadDelta, sliderAdjust, news } =
      choice.effects;

    setShockModifiers((prev) => ({
      fiscal: prev.fiscal + (fiscalDelta || 0),
      paz: prev.paz + (pazDelta || 0),
      actividad: prev.actividad + (actividadDelta || 0),
    }));

    if (sliderAdjust) {
      const targetBlock = [...SPENDING_BLOCKS, ...REVENUE_BLOCKS].find(
        (b) => b.id === sliderAdjust.blockId
      );
      if (targetBlock) {
        setValues((prev) => {
          const updated = Math.min(
            targetBlock.max,
            Math.max(
              targetBlock.min,
              Number((prev[sliderAdjust.blockId] + sliderAdjust.delta).toFixed(2))
            )
          );
          return { ...prev, [sliderAdjust.blockId]: updated };
        });
      }
    }

    if (news) {
      setLatestNews(news);
    }

    setShockHistory((prev) => [
      ...prev,
      {
        shockTitle: activeShock.title,
        choiceLabel: choice.label,
        time: timeLeft,
      },
    ]);

    soundFX.playTick(620, 0.05, 0.07);
    setActiveShock(null);
  };

  const handleRestart = () => {
    soundFX.playTick(600, 0.04, 0.05);
    setValues(buildInitialValues());
    setIsDefaulted(false);
    setTimeLeft(INITIAL_STATE.timerSeconds);
    setTriggered120(false);
    setTriggered60(false);
    setActiveShock(null);
    setShockModifiers({ fiscal: 0, paz: 0, actividad: 0 });
    setShockHistory([]);
    setLossReason(null);
    setLatestNews(
      'NUEVA GESTIÓN EN MARCHA: Tienes 180 segundos para llevar el déficit de -4.00% a 0.00% del PBI.'
    );
    setGameStatus('playing');
  };

  const handleToggleMute = () => {
    const next = !muted;
    setMuted(next);
    soundFX.setMuted(next);
  };

  const isGoalMet =
    metrics.fiscalResult >= -0.001 &&
    metrics.pazSocial > 0 &&
    metrics.actividad > 0;

  return (
    <div className="min-h-screen flex flex-col pb-24">
      <div className="scanline-overlay" />

      {/* Sticky Master Header */}
      <StickyCrisisHeader
        timeLeft={timeLeft}
        fiscalResult={metrics.fiscalResult}
        totalRevenueReal={metrics.totalRevenueReal}
        totalSpending={metrics.totalSpending}
        pazSocial={metrics.pazSocial}
        actividad={metrics.actividad}
        latestNews={latestNews}
        muted={muted}
        onToggleMute={handleToggleMute}
        onReset={handleRestart}
        onConfirmVictory={triggerVictory}
        gameStatus={gameStatus}
      />

      {/* Main Dashboard Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 pt-4">
        {/* Mobile Tab Switcher */}
        <div className="flex lg:hidden rounded-xl bg-slate-900/90 p-1 border border-slate-800 mb-4">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center justify-center gap-1 ${
              activeTab === 'all'
                ? 'bg-slate-800 text-amber-400 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Todo</span>
          </button>
          <button
            onClick={() => setActiveTab('spending')}
            className={`flex-1 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center justify-center gap-1 ${
              activeTab === 'spending'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Scissors className="w-3.5 h-3.5" />
            <span>Gastos ({metrics.totalSpending.toFixed(2)}%)</span>
          </button>
          <button
            onClick={() => setActiveTab('revenue')}
            className={`flex-1 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all flex items-center justify-center gap-1 ${
              activeTab === 'revenue'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            <span>Impuestos ({metrics.totalRevenueReal.toFixed(2)}%)</span>
          </button>
        </div>

        {/* Shock History Pills (if any occurred) */}
        {shockHistory.length > 0 && (
          <div className="mb-4 flex flex-wrap items-center gap-2 p-2.5 rounded-xl bg-rose-950/30 border border-rose-500/30">
            <span className="text-[11px] font-mono font-bold uppercase text-rose-300 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              Shocks Enfrentados:
            </span>
            {shockHistory.map((item, idx) => (
              <span
                key={idx}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900/90 text-slate-300 border border-slate-700"
              >
                {item.shockTitle}: <strong className="text-amber-300">{item.choiceLabel}</strong>
              </span>
            ))}
          </div>
        )}

        {/* Two-Column War Room Layout on Desktop / Tabbed on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* COLUMN A: BLOQUES DE GASTO (7 cols on lg) */}
          <section
            className={`lg:col-span-7 space-y-3 ${
              activeTab === 'revenue' ? 'hidden lg:block' : 'block'
            }`}
          >
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-rose-500/30">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-rose-500/15 text-rose-400">
                  <TrendingDown className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-100">
                    A. Bloques de Gasto Público
                  </h2>
                  <p className="text-[11px] text-slate-400">
                    Base OPC Sector Público Nacional (Incluye 1.00% PBI de transferencias rígidas)
                  </p>
                </div>
              </div>
              <div className="text-right font-mono">
                <span className="text-sm sm:text-base font-black text-rose-400">
                  {metrics.totalSpending.toFixed(2)}% PBI
                </span>
                <span className="block text-[10px] text-slate-500">
                  Inicial: 20.50% PBI
                </span>
              </div>
            </div>

            <div className="space-y-2.5">
              {SPENDING_BLOCKS.map((block) => (
                <BudgetSliderCard
                  key={block.id}
                  block={block}
                  value={values[block.id]}
                  isDefaulted={isDefaulted}
                  onChange={handleSliderChange}
                  onDeclareDefault={handleDeclareDefault}
                  disabled={gameStatus !== 'playing'}
                />
              ))}
            </div>
          </section>

          {/* COLUMN B: BLOQUES DE INGRESOS / IMPUESTOS (5 cols on lg) */}
          <section
            className={`lg:col-span-5 space-y-3 ${
              activeTab === 'spending' ? 'hidden lg:block' : 'block'
            }`}
          >
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-sky-500/30">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-sky-500/15 text-sky-400">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-100">
                    B. Bloques de Ingresos / Impuestos
                  </h2>
                  <p className="text-[11px] text-slate-400">
                    Efecto Laffer: cada +1.00% de suba recauda +0.75% real neto
                  </p>
                </div>
              </div>
              <div className="text-right font-mono">
                <span className="text-sm sm:text-base font-black text-sky-400">
                  {metrics.totalRevenueReal.toFixed(2)}% PBI
                </span>
                <span className="block text-[10px] text-slate-500">
                  Inicial: 16.50% PBI
                </span>
              </div>
            </div>

            <div className="space-y-2.5">
              {REVENUE_BLOCKS.map((block) => (
                <BudgetSliderCard
                  key={block.id}
                  block={block}
                  value={values[block.id]}
                  isDefaulted={false}
                  onChange={handleSliderChange}
                  onDeclareDefault={() => {}}
                  disabled={gameStatus !== 'playing'}
                />
              ))}
            </div>

            {/* Macroeconomic Advisor Hint Box */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-1.5">
              <div className="flex items-center gap-1.5 text-amber-400 font-mono font-bold uppercase text-[11px]">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Informe Reservado del Viceministro</span>
              </div>
              <p className="leading-relaxed text-slate-400">
                La motosierra sobre <strong className="text-slate-200">Cargos Políticos</strong> te da aire en la opinión pública (+10 Paz Social), pero solo ahorra 0.13% del PBI. Para cerrar la brecha de <strong className="text-rose-400">-4.00%</strong> deberás combinar recortes estructurales sin apagar el motor productivo.
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* Floating Victory Call-to-Action Footer when Goal is Met */}
      {isGoalMet && gameStatus === 'playing' && (
        <div className="fixed bottom-0 inset-x-0 z-40 p-3 bg-slate-950/95 border-t border-emerald-500/50 backdrop-blur-lg shadow-[0_-10px_30px_rgba(16,185,129,0.2)]">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-emerald-300 text-xs sm:text-sm font-medium">
              <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 animate-spin" />
              <span>
                ¡Alcanzaste el equilibrio fiscal (
                <strong className="font-mono">
                  {metrics.fiscalResult > 0
                    ? `+${metrics.fiscalResult.toFixed(2)}%`
                    : `${metrics.fiscalResult.toFixed(2)}%`}{' '}
                  PBI
                </strong>
                )! Puedes firmar el decreto ahora o seguir optimizando.
              </span>
            </div>
            <button
              onClick={triggerVictory}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(16,185,129,0.6)] transition-all cursor-pointer shrink-0"
            >
              <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
              <span>Consolidar Equilibrio y Ganar</span>
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      {gameStatus === 'intro' && (
        <IntroModal
          onStart={() => {
            soundFX.playTick(660, 0.06, 0.08);
            setGameStatus('playing');
          }}
        />
      )}

      <ShockModal
        shock={activeShock}
        onSelectChoice={handleSelectShockChoice}
      />

      <EndGameModal
        gameStatus={gameStatus}
        lossReason={lossReason}
        fiscalResult={metrics.fiscalResult}
        pazSocial={metrics.pazSocial}
        actividad={metrics.actividad}
        timeLeft={timeLeft}
        isDefaulted={isDefaulted}
        totalSpending={metrics.totalSpending}
        totalRevenueReal={metrics.totalRevenueReal}
        onRestart={handleRestart}
      />
    </div>
  );
}
