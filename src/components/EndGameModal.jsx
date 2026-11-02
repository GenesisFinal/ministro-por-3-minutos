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
  Download,
  Copy,
  Image as ImageIcon,
} from 'lucide-react';

const GH_PAGES_BASE = 'https://genesisfinal.github.io/ministro-por-3-minutos/assets/clay';
const LOCAL_BASE = './assets/clay';

export const CLAY_PROFILE_IMAGES = {
  motosierra_ortodoxa: {
    remote: `${GH_PAGES_BASE}/motosierra_ortodoxa.jpg`,
    local: `${LOCAL_BASE}/motosierra_ortodoxa.jpg`,
  },
  equilibrista_clinico: {
    remote: `${GH_PAGES_BASE}/equilibrista_clinico.jpg`,
    local: `${LOCAL_BASE}/equilibrista_clinico.jpg`,
  },
  reestructurador_trincheras: {
    remote: `${GH_PAGES_BASE}/reestructurador_trincheras.jpg`,
    local: `${LOCAL_BASE}/reestructurador_trincheras.jpg`,
  },
  domador_tormentas: {
    remote: `${GH_PAGES_BASE}/domador_tormentas.jpg`,
    local: `${LOCAL_BASE}/domador_tormentas.jpg`,
  },
  fracaso_crisis: {
    remote: `${GH_PAGES_BASE}/fracaso_crisis.jpg`,
    local: `${LOCAL_BASE}/fracaso_crisis.jpg`,
  },
};

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function loadImageForCanvas(remoteUrl, localUrl) {
  return new Promise((resolve) => {
    const tryRemote = new Image();
    tryRemote.crossOrigin = 'anonymous';
    tryRemote.onload = () => resolve(tryRemote);
    tryRemote.onerror = () => {
      const tryLocal = new Image();
      tryLocal.onload = () => resolve(tryLocal);
      tryLocal.onerror = () => resolve(null);
      tryLocal.src = localUrl;
    };
    // Prefer local when served over http/https on same domain, remote when opened via file://
    if (typeof window !== 'undefined' && window.location.protocol === 'file:') {
      tryRemote.src = remoteUrl;
    } else {
      tryRemote.src = localUrl;
    }
  });
}

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
  const [copiedText, setCopiedText] = useState(false);
  const [sharingImage, setSharingImage] = useState(false);
  const [imageFeedback, setImageFeedback] = useState('');
  const [imgSrcMode, setImgSrcMode] = useState('local');

  if (gameStatus !== 'won' && gameStatus !== 'lost') return null;

  const isVictory = gameStatus === 'won';
  const timeUsed = 180 - timeLeft;
  const minUsed = Math.floor(timeUsed / 60);
  const secUsed = String(timeUsed % 60).padStart(2, '0');

  // Determine Minister Archetype & fixed claymation image ID
  const getArchetype = () => {
    if (!isVictory) {
      if (lossReason === 'paz_social') {
        return {
          id: 'fracaso_crisis',
          title: 'Ministro Eyectado en Helicóptero',
          desc: 'Cerraste los números en el Excel sin mirar la calle. El estallido social forzó tu renuncia antes de firmar el decreto.',
        };
      }
      if (lossReason === 'actividad') {
        return {
          id: 'fracaso_crisis',
          title: 'Arquitecto del Frenazo Total',
          desc: 'Asfixiaste la economía con impuestos y recortes productivos hasta provocar una depresión con derrumbe de recaudación.',
        };
      }
      return {
        id: 'fracaso_crisis',
        title: 'Ministro Gradualista sin Tiempo',
        desc: 'Se agotaron los 180 segundos sin llegar al equilibrio fiscal. El mercado te soltó la mano y se disparó el Riesgo País.',
      };
    }

    if (isDefaulted) {
      return {
        id: 'reestructurador_trincheras',
        title: 'Reestructurador de Trincheras',
        desc: 'Lograste el equilibrio fiscal pateando el tablero con un Default soberano y sobreviviendo al terremoto posterior.',
      };
    }
    if (totalSpending <= 16.6 && totalRevenueReal <= 16.6) {
      return {
        id: 'motosierra_ortodoxa',
        title: 'Cirujano de Motosierra Ortodoxa',
        desc: 'Eliminaste el déficit recortando el gasto público sin subir impuestos, manteniendo a flote la gobernabilidad.',
      };
    }
    if (pazSocial >= 50 && actividad >= 45) {
      return {
        id: 'equilibrista_clinico',
        title: 'Equilibrista Clínico de Estado',
        desc: 'Alcanzaste el déficit cero calibrando gastos e ingresos con bisturí quirúrgico y alta estabilidad macroeconómica.',
      };
    }
    return {
      id: 'domador_tormentas',
      title: 'Domador de Tormentas Fiscales',
      desc: 'Cruzaste la meta del equilibrio fiscal al límite de la resistencia social y productiva.',
    };
  };

  const archetype = getArchetype();
  const clayAsset = CLAY_PROFILE_IMAGES[archetype.id] || CLAY_PROFILE_IMAGES.fracaso_crisis;
  const displayImgUrl = imgSrcMode === 'local' ? clayAsset.local : clayAsset.remote;

  const getLossHeadline = () => {
    if (lossReason === 'paz_social') {
      return 'Te pidieron la renuncia por caos en la calle';
    }
    if (lossReason === 'actividad') {
      return 'Frenazo económico total y caída de recaudación';
    }
    return 'Se agotó el tiempo y no llegaste al Déficit Cero';
  };

  const buildShareText = () => {
    const statusEmoji = isVictory ? '🟢 ¡SUPERÁVIT / EQUILIBRIO LOGRADO!' : '🔴 RENUNCIA FORZADA';
    return [
      `🏛️ MINISTRO POR 3 MINUTOS`,
      `${statusEmoji}`,
      `🎖️ Perfil: ${archetype.title}`,
      `📊 Resultado Fiscal: ${fiscalResult > 0 ? `+${fiscalResult.toFixed(2)}` : fiscalResult.toFixed(2)}% PBI`,
      `🔥 Paz Social: ${Math.round(pazSocial)}% | 📈 Actividad: ${Math.round(actividad)}%`,
      `⏱️ Tiempo: ${minUsed}m ${secUsed}s`,
      `¿Puedes eliminar el déficit de -4.00% sin que estalle el país?`,
      `👉 https://genesisfinal.github.io/ministro-por-3-minutos/`,
    ].join('\n');
  };

  // Generate Composite PNG Blob with Claymation Caricature + Metrics
  const generateShareCardBlob = async () => {
    const canvas = document.createElement('canvas');
    const W = 1200;
    const H = 920;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, W, H);

    // Draw 16:9 Claymation Image in top section (1200 x 640)
    const imgH = 640;
    const loadedImg = await loadImageForCanvas(clayAsset.remote, clayAsset.local);
    if (loadedImg) {
      const scale = Math.max(W / loadedImg.width, imgH / loadedImg.height);
      const drawW = loadedImg.width * scale;
      const drawH = loadedImg.height * scale;
      const dx = (W - drawW) / 2;
      const dy = (imgH - drawH) / 2;
      ctx.drawImage(loadedImg, dx, dy, drawW, drawH);
    } else {
      const fallbackGrad = ctx.createLinearGradient(0, 0, W, imgH);
      fallbackGrad.addColorStop(0, isVictory ? '#064e3b' : '#4c0519');
      fallbackGrad.addColorStop(1, '#0f172a');
      ctx.fillStyle = fallbackGrad;
      ctx.fillRect(0, 0, W, imgH);
    }

    // Top-left Branding Pill
    ctx.save();
    roundRect(ctx, 32, 28, 390, 48, 24);
    ctx.fillStyle = 'rgba(2, 6, 23, 0.85)';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = isVictory ? '#10b981' : '#f43f5e';
    ctx.stroke();
    ctx.fillStyle = '#f8fafc';
    ctx.font = '900 20px "JetBrains Mono", monospace';
    ctx.fillText('🏛️ MINISTRO POR 3 MINUTOS', 54, 59);
    ctx.restore();

    // Top-right Status Pill
    ctx.save();
    const statusText = isVictory ? '¡EQUILIBRIO FISCAL LOGRADO!' : 'CRISIS TERMINAL · RENUNCIA';
    ctx.font = '900 19px "JetBrains Mono", monospace';
    const pillW = ctx.measureText(statusText).width + 48;
    roundRect(ctx, W - pillW - 32, 28, pillW, 48, 24);
    ctx.fillStyle = isVictory ? 'rgba(6, 78, 59, 0.92)' : 'rgba(136, 19, 55, 0.92)';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = isVictory ? '#34d399' : '#fb7185';
    ctx.stroke();
    ctx.fillStyle = isVictory ? '#a7f3d0' : '#fecdd3';
    ctx.fillText(statusText, W - pillW - 8, 59);
    ctx.restore();

    // Smooth dark gradient transition over bottom of clay image
    const grad = ctx.createLinearGradient(0, imgH - 180, 0, imgH + 10);
    grad.addColorStop(0, 'rgba(2, 6, 23, 0)');
    grad.addColorStop(0.75, 'rgba(2, 6, 23, 0.92)');
    grad.addColorStop(1, '#020617');
    ctx.fillStyle = grad;
    ctx.fillRect(0, imgH - 180, W, 195);

    // Archetype Title & Subtitle over transition
    ctx.fillStyle = '#fbbf24';
    ctx.font = '800 20px "JetBrains Mono", monospace';
    ctx.fillText('PERFIL DE GESTIÓN MINISTERIAL', 44, imgH - 68);

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 42px "Inter", system-ui, sans-serif';
    ctx.fillText(archetype.title, 44, imgH - 20);

    // Description line
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '500 20px "Inter", system-ui, sans-serif';
    const descText = archetype.desc.length > 105 ? archetype.desc.slice(0, 102) + '...' : archetype.desc;
    ctx.fillText(descText, 44, imgH + 24);

    // 4 Metric Cards Row
    const cardsY = imgH + 52;
    const cardH = 148;
    const gap = 20;
    const totalCardsW = W - 88;
    const cardW = (totalCardsW - gap * 3) / 4;

    const fiscalFormatted = fiscalResult > 0 ? `+${fiscalResult.toFixed(2)}%` : `${fiscalResult.toFixed(2)}%`;
    const cards = [
      {
        label: 'RESULTADO FISCAL',
        value: fiscalFormatted,
        sub: 'Meta: 0.00% PBI',
        color: fiscalResult >= -0.001 ? '#34d399' : '#fb7185',
      },
      {
        label: 'PAZ SOCIAL',
        value: `${Math.round(pazSocial)}%`,
        sub: 'Inició en 65%',
        color: pazSocial > 25 ? '#fbbf24' : '#f43f5e',
      },
      {
        label: 'ACTIVIDAD ECON.',
        value: `${Math.round(actividad)}%`,
        sub: 'Inició en 60%',
        color: actividad > 25 ? '#38bdf8' : '#f43f5e',
      },
      {
        label: 'TIEMPO GESTIÓN',
        value: `${minUsed}m ${secUsed}s`,
        sub: `Gasto: ${totalSpending.toFixed(1)}% PBI`,
        color: '#e2e8f0',
      },
    ];

    cards.forEach((c, idx) => {
      const cx = 44 + idx * (cardW + gap);
      roundRect(ctx, cx, cardsY, cardW, cardH, 18);
      ctx.fillStyle = '#0f172a';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#1e293b';
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '700 15px "JetBrains Mono", monospace';
      ctx.fillText(c.label, cx + 22, cardsY + 36);

      ctx.fillStyle = c.color;
      ctx.font = '900 44px "JetBrains Mono", monospace';
      ctx.fillText(c.value, cx + 22, cardsY + 92);

      ctx.fillStyle = '#64748b';
      ctx.font = '600 15px "JetBrains Mono", monospace';
      ctx.fillText(c.sub, cx + 22, cardsY + 125);
    });

    // Footer bar
    ctx.fillStyle = '#64748b';
    ctx.font = '600 16px "JetBrains Mono", monospace';
    ctx.fillText('Juega gratis en: genesisfinal.github.io/ministro-por-3-minutos', 44, H - 24);

    return new Promise((resolve) => {
      try {
        canvas.toBlob((blob) => resolve(blob), 'image/png', 0.95);
      } catch {
        resolve(null);
      }
    });
  };

  // Classic text share / copy
  const handleShareText = async () => {
    const text = buildShareText();
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Ministro por 3 Minutos',
          text,
        });
      } else {
        await navigator.clipboard.writeText(text);
        setCopiedText(true);
        setTimeout(() => setCopiedText(false), 3000);
      }
    } catch {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedText(true);
        setTimeout(() => setCopiedText(false), 3000);
      } catch {
        // Ignore
      }
    }
  };

  // Share or Copy Visual Claymation Card + Text
  const handleShareVisualCard = async () => {
    if (sharingImage) return;
    setSharingImage(true);
    setImageFeedback('Generando tarjeta...');
    try {
      const text = buildShareText();
      const blob = await generateShareCardBlob();

      if (blob) {
        const fileName = `ministro-3-minutos-${archetype.id}.png`;
        const file = new File([blob], fileName, { type: 'image/png' });

        // 1. Mobile / Web Share API with files
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'Ministro por 3 Minutos',
            text,
          });
          setImageFeedback('¡Tarjeta compartida!');
          setTimeout(() => setImageFeedback(''), 3000);
          setSharingImage(false);
          return;
        }

        // 2. Desktop Clipboard API (copy image directly to clipboard) + trigger download
        let copiedImg = false;
        if (navigator.clipboard && window.ClipboardItem) {
          try {
            await navigator.clipboard.write([
              new window.ClipboardItem({ 'image/png': blob }),
            ]);
            copiedImg = true;
          } catch {
            copiedImg = false;
          }
        }

        // Also trigger file download so user always gets the PNG
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        setImageFeedback(
          copiedImg
            ? '¡Imagen copiada y descargada!'
            : '¡Tarjeta PNG descargada!'
        );
        setTimeout(() => setImageFeedback(''), 3500);
      } else {
        await handleShareText();
        setImageFeedback('Texto copiado');
        setTimeout(() => setImageFeedback(''), 3000);
      }
    } catch {
      setImageFeedback('');
    } finally {
      setSharingImage(false);
    }
  };

  // Direct PNG Download
  const handleDownloadCard = async () => {
    if (sharingImage) return;
    setSharingImage(true);
    try {
      const blob = await generateShareCardBlob();
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ministro-3-minutos-${archetype.id}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setImageFeedback('¡Imagen descargada!');
        setTimeout(() => setImageFeedback(''), 3000);
      }
    } finally {
      setSharingImage(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-lg overflow-y-auto">
      <div
        className={`relative w-full max-w-lg rounded-2xl bg-slate-900 border-2 p-4 sm:p-5 shadow-2xl my-auto ${
          isVictory
            ? 'border-emerald-500/80 shadow-[0_0_60px_rgba(16,185,129,0.3)]'
            : 'border-rose-500/80 shadow-[0_0_60px_rgba(225,29,72,0.35)]'
        }`}
      >
        {/* Claymation Caricature Hero Banner */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-inner mb-4">
          <img
            src={displayImgUrl}
            alt={archetype.title}
            crossOrigin="anonymous"
            onError={() => {
              if (imgSrcMode === 'local') setImgSrcMode('remote');
            }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />

          {/* Status Pill Top Left */}
          <div className="absolute top-2.5 left-2.5">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10px] sm:text-xs font-black uppercase tracking-wider border backdrop-blur-md ${
                isVictory
                  ? 'bg-emerald-950/85 text-emerald-300 border-emerald-500/50'
                  : 'bg-rose-950/85 text-rose-300 border-rose-500/50'
              }`}
            >
              {isVictory ? (
                <Trophy className="w-3.5 h-3.5 text-emerald-400" />
              ) : lossReason === 'timeout' ? (
                <Clock className="w-3.5 h-3.5 text-rose-400" />
              ) : (
                <Skull className="w-3.5 h-3.5 text-rose-400" />
              )}
              {isVictory ? '¡EQUILIBRIO FISCAL LOGRADO!' : 'CRISIS TERMINAL · RENUNCIA'}
            </span>
          </div>

          {/* Bottom Title Overlay */}
          <div className="absolute bottom-2.5 left-3 right-3">
            <div className="flex items-center gap-1.5 text-amber-400 font-mono text-[10px] sm:text-xs font-bold uppercase drop-shadow">
              <Award className="w-3.5 h-3.5 shrink-0" />
              <span>Perfil: {archetype.title}</span>
            </div>
            <h2 className="text-base sm:text-xl font-black text-white leading-tight drop-shadow">
              {isVictory ? '¡Estabilizaste las Cuentas Públicas!' : getLossHeadline()}
            </h2>
          </div>
        </div>

        {/* Archetype Description */}
        <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {archetype.desc}
          </p>
        </div>

        {/* Final Metrics Grid */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
            <div className="flex items-center justify-center gap-1 text-[10px] font-mono uppercase text-slate-400">
              <Scale className="w-3 h-3 text-emerald-400" />
              <span>Fiscal</span>
            </div>
            <div
              className={`mt-0.5 font-mono text-base sm:text-lg font-black ${
                fiscalResult >= -0.001 ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {fiscalResult > 0 ? `+${fiscalResult.toFixed(2)}%` : `${fiscalResult.toFixed(2)}%`}
            </div>
            <div className="text-[10px] font-mono text-slate-500">Meta: 0.00%</div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
            <div className="flex items-center justify-center gap-1 text-[10px] font-mono uppercase text-slate-400">
              <Flame className="w-3 h-3 text-amber-400" />
              <span>Paz Social</span>
            </div>
            <div
              className={`mt-0.5 font-mono text-base sm:text-lg font-black ${
                pazSocial > 0 ? 'text-amber-400' : 'text-rose-500'
              }`}
            >
              {Math.round(pazSocial)}%
            </div>
            <div className="text-[10px] font-mono text-slate-500">Inició: 65%</div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
            <div className="flex items-center justify-center gap-1 text-[10px] font-mono uppercase text-slate-400">
              <TrendingUp className="w-3 h-3 text-sky-400" />
              <span>Actividad</span>
            </div>
            <div
              className={`mt-0.5 font-mono text-base sm:text-lg font-black ${
                actividad > 0 ? 'text-sky-400' : 'text-rose-500'
              }`}
            >
              {Math.round(actividad)}%
            </div>
            <div className="text-[10px] font-mono text-slate-500">Inició: 60%</div>
          </div>
        </div>

        {/* Summary Sub-bar */}
        <div className="mt-2.5 px-3 py-1.5 rounded-lg bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>Gasto: {totalSpending.toFixed(2)}% PBI</span>
          <span>Ingresos: {totalRevenueReal.toFixed(2)}% PBI</span>
          <span>Tiempo: {minUsed}m {secUsed}s</span>
        </div>

        {/* Expanded Share Section */}
        <div className="mt-4 space-y-2">
          {/* Primary Button: Share/Download Claymation Card + Metrics */}
          <div className="flex gap-2">
            <button
              onClick={handleShareVisualCard}
              disabled={sharingImage}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wide transition-all cursor-pointer shadow-lg"
            >
              {imageFeedback ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>{imageFeedback}</span>
                </>
              ) : (
                <>
                  <ImageIcon className="w-4 h-4" />
                  <span>Compartir Tarjeta con Caricatura</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadCard}
              disabled={sharingImage}
              title="Descargar Imagen PNG"
              className="flex items-center justify-center gap-1.5 px-3.5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 font-mono text-xs font-bold transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">PNG</span>
            </button>
          </div>

          {/* Secondary Row: Share Text Only (like before) + Play Again */}
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleShareText}
              className="flex-1 flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 font-bold text-xs uppercase tracking-wide border border-slate-700 transition-all cursor-pointer"
            >
              {copiedText ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">¡Texto Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Compartir Solo Texto</span>
                </>
              )}
            </button>

            <button
              onClick={onRestart}
              className="flex-1 flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-100 font-bold text-xs uppercase tracking-wide border border-slate-700 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Intentar de Nuevo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
