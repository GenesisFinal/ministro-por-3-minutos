// Eventos de Shock en Tiempo Real (Segundo 120 y Segundo 60)

export const SHOCKS_AT_120 = [
  {
    id: 'sequia_historica',
    triggerTime: 120,
    badge: 'ALERTA CLIMÁTICA Y EXTERNA · MINUTO 02:00',
    title: 'Sequía Histórica en la Zona Núcleo',
    description:
      'Una ola de calor extrema destruye el 40% de la cosecha de soja y maíz. Se desploman las exportaciones del complejo agroindustrial y caen los ingresos fiscales por Retenciones.',
    icon: 'CloudOff',
    severity: 'critical',
    choices: [
      {
        id: 'absorber_sequia',
        label: 'Absorber el Golpe Fiscal',
        subtitle: 'Pierdes 0.60% del PBI en ingresos por Retenciones y -5 de Actividad.',
        effects: {
          fiscalDelta: -0.60,
          pazDelta: 0,
          actividadDelta: -5,
          sliderAdjust: null,
          news: 'URGENTE: La sequía histórica perfora la recaudación de derechos de exportación (-0.60% PBI).',
        },
      },
      {
        id: 'dolar_soja_emergencia',
        label: 'Lanzar "Dólar Agro" de Emergencia',
        subtitle: 'Atenúa la pérdida fiscal a -0.25% PBI, pero la inflación del salto cambiario resta -10 de Paz Social.',
        effects: {
          fiscalDelta: -0.25,
          pazDelta: -10,
          actividadDelta: -2,
          sliderAdjust: null,
          news: 'URGENTE: El Gobierno lanza un tipo de cambio diferencial para el agro; se recalienta el precio de los alimentos.',
        },
      },
    ],
  },
  {
    id: 'fallo_judicial_jubilaciones',
    triggerTime: 120,
    badge: 'REVÉS JUDICIAL · MINUTO 02:00',
    title: 'Fallo de la Corte Suprema por Haberes Jubilatorios',
    description:
      'La Corte Suprema declara inconstitucional el rezago de la fórmula previsional y ordena recomponer de inmediato los haberes jubilatorios en todo el país.',
    icon: 'Scale',
    severity: 'critical',
    choices: [
      {
        id: 'acatar_fallo',
        label: 'Acatar el Fallo y Pagar',
        subtitle: 'Suma +0.40% del PBI al gasto de Jubilaciones (+4 Paz Social).',
        effects: {
          fiscalDelta: 0,
          pazDelta: 4,
          actividadDelta: 2,
          sliderAdjust: { blockId: 'jubilaciones', delta: 0.40 },
          news: 'URGENTE: Economía acata el fallo de la Corte y suma 0.40% del PBI en gasto previsional.',
        },
      },
      {
        id: 'desoir_vetar',
        label: 'Postergar Pago por Decreto de Emergencia',
        subtitle: 'Mantienes la caja intacta, pero pierdes -15 puntos de Paz Social de inmediato.',
        effects: {
          fiscalDelta: 0,
          pazDelta: -15,
          actividadDelta: -2,
          sliderAdjust: null,
          news: 'URGENTE: El Ejecutivo posterga el fallo jubilatorio; cacerolazos y protestas masivas frente a Tribunales.',
        },
      },
    ],
  },
];

export const SHOCKS_AT_60 = [
  {
    id: 'corrida_cambiaria_fmi',
    triggerTime: 60,
    badge: 'CRISIS CAMBIARIA · MINUTO 01:00',
    title: 'Corrida Cambiaria y Ultimátum del FMI',
    description:
      'Se dispara el dólar financiero un 22% en dos ruedas. El staff del FMI condiciona el próximo desembolso a un apretón monetario y fiscal inmediato.',
    icon: 'TrendingDown',
    severity: 'danger',
    choices: [
      {
        id: 'apreton_fmi',
        label: 'Aplicar Súper-Tasa y Apretón Monetario',
        subtitle: 'Secas la plaza de pesos: suma +0.25% de alivio fiscal, pero se hunde -14 puntos la Actividad Económica.',
        effects: {
          fiscalDelta: 0.25,
          pazDelta: -4,
          actividadDelta: -14,
          sliderAdjust: null,
          news: 'URGENTE: Fuerte suba de tasas frena la corrida cambiaria pero congela el crédito productivo.',
        },
      },
      {
        id: 'devaluar_intervenir',
        label: 'Convalidar Salto Cambiario y Licuar',
        subtitle: 'Cae -12 puntos la Paz Social y -8 la Actividad por traslado directo a precios.',
        effects: {
          fiscalDelta: 0.15,
          pazDelta: -12,
          actividadDelta: -8,
          sliderAdjust: null,
          news: 'URGENTE: Salto cambiario desata remarcaciones de precios del 15% en supermercados.',
        },
      },
    ],
  },
  {
    id: 'paro_general_cgt',
    triggerTime: 60,
    badge: 'TENSIÓN SINDICAL · MINUTO 01:00',
    title: 'Paro General por Tiempo Indeterminado',
    description:
      'Las centrales sindicales y el transporte de cargas anuncian un paro nacional con bloqueo de refinerías y puertos ante el ajuste en curso.',
    icon: 'Siren',
    severity: 'danger',
    choices: [
      {
        id: 'mantener_pulso',
        label: 'Mantener el Rumbo sin Concesiones',
        subtitle: 'El paro paraliza la calle: -12 puntos de Paz Social y -10 puntos de Actividad Económica.',
        effects: {
          fiscalDelta: 0,
          pazDelta: -12,
          actividadDelta: -10,
          sliderAdjust: null,
          news: 'URGENTE: País paralizado por huelga general de transporte; tensión en accesos y desabastecimiento parcial.',
        },
      },
      {
        id: 'bono_compensacion',
        label: 'Otorgar Bono y Subsidio al Transporte',
        subtitle: 'Desactivas el paro (+6 Paz Social), pero pierdes -0.45% del PBI en el Resultado Fiscal.',
        effects: {
          fiscalDelta: -0.45,
          pazDelta: 6,
          actividadDelta: 2,
          sliderAdjust: null,
          news: 'URGENTE: El Ministerio cede un bono de emergencia de 0.45% del PBI para levantar el paro general.',
        },
      },
    ],
  },
];
