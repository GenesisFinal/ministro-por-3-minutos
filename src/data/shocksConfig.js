// Pool de Eventos de Shock Externos (Positivos y Negativos) en tiempos aleatorios

export const ALL_SHOCKS = [
  // ================= SHOCKS NEGATIVOS =================
  {
    id: 'sequia_historica',
    type: 'negative',
    badge: 'SHOCK EXTERNO NEGATIVO · CLIMA',
    title: 'Sequía Histórica en la Zona Núcleo',
    description:
      'Una ola de calor extrema destruye el 40% de la cosecha de soja y maíz. Se desploman las exportaciones del complejo agroindustrial y caen los ingresos fiscales por Retenciones.',
    icon: 'CloudOff',
    choices: [
      {
        id: 'absorber_sequia',
        label: 'Absorber el Golpe Fiscal',
        subtitle: 'Pierdes -0.60% del PBI en ingresos por Retenciones y -5 de Actividad.',
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
    type: 'negative',
    badge: 'SHOCK INTERNO NEGATIVO · JUSTICIA',
    title: 'Fallo de la Corte Suprema por Haberes Jubilatorios',
    description:
      'La Corte Suprema declara inconstitucional el rezago de la fórmula previsional y ordena recomponer de inmediato los haberes jubilatorios en todo el país.',
    icon: 'Scale',
    choices: [
      {
        id: 'acatar_fallo',
        label: 'Acatar el Fallo y Recomponer Haberes',
        subtitle: 'Suma +0.40% del PBI al gasto de Jubilaciones, pero ganas +5 de Paz Social.',
        effects: {
          fiscalDelta: 0,
          pazDelta: 5,
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
  {
    id: 'corrida_cambiaria_fmi',
    type: 'negative',
    badge: 'SHOCK FINANCIERO NEGATIVO · MERCADOS',
    title: 'Corrida Cambiaria y Ultimátum del FMI',
    description:
      'Se dispara el dólar financiero un 22% en dos ruedas. El staff del FMI condiciona el próximo desembolso a un apretón monetario y fiscal inmediato.',
    icon: 'TrendingDown',
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
    type: 'negative',
    badge: 'SHOCK SOCIAL NEGATIVO · SINDICATOS',
    title: 'Paro General por Tiempo Indeterminado',
    description:
      'Las centrales sindicales y el transporte de cargas anuncian un paro nacional con bloqueo de refinerías y puertos ante el ajuste en curso.',
    icon: 'Siren',
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

  // ================= SHOCKS POSITIVOS (VIENTO DE COLA) =================
  {
    id: 'boom_soja_commodities',
    type: 'positive',
    badge: 'SHOCK EXTERNO POSITIVO · VIENTO DE COLA',
    title: 'Boom de Commodities: "Súper Soja" a USD 600',
    description:
      'Se disparan los precios internacionales de los granos en Chicago junto a una cosecha récord en la Pampa Húmeda. Ingresa una lluvia extraordinaria de divisas y recaudación.',
    icon: 'Wheat',
    choices: [
      {
        id: 'blindar_tesoro',
        label: 'Ahorrar Todo el Excedente en el Tesoro',
        subtitle: 'Mejora +0.65% del PBI el Resultado Fiscal y suma +4 puntos de Actividad Económica.',
        effects: {
          fiscalDelta: 0.65,
          pazDelta: 2,
          actividadDelta: 4,
          sliderAdjust: null,
          news: 'VIENTO DE COLA: Récord de liquidación agroexportadora inyecta +0.65% del PBI directo a las arcas del Tesoro.',
        },
      },
      {
        id: 'alivio_consumo_agro',
        label: 'Repartir Dividendo Social y Crédito Productivo',
        subtitle: 'Suma +0.30% del PBI al Resultado Fiscal, +10 de Paz Social y +8 de Actividad.',
        effects: {
          fiscalDelta: 0.30,
          pazDelta: 10,
          actividadDelta: 8,
          sliderAdjust: null,
          news: 'VIENTO DE COLA: El boom exportador financia líneas de crédito y alivio en alimentos, impulsando calle y actividad.',
        },
      },
    ],
  },
  {
    id: 'boom_vaca_muerta_litio',
    type: 'positive',
    badge: 'SHOCK ENERGÉTICO POSITIVO · SUPERÁVIT',
    title: 'Hito en Vaca Muerta y Boom de Litio',
    description:
      'Se inaugura antes de plazo el nuevo gasoducto troncal y entran en producción tres plantas de litio en el NOA. Se desploma la importación de energía y crecen las regalías.',
    icon: 'Zap',
    choices: [
      {
        id: 'capturar_renta_energetica',
        label: 'Capturar Ahorro Fiscal y Regalías',
        subtitle: 'Suma +0.55% del PBI al Resultado Fiscal y +7 puntos de Actividad Económica.',
        effects: {
          fiscalDelta: 0.55,
          pazDelta: 2,
          actividadDelta: 7,
          sliderAdjust: null,
          news: 'HITO ENERGÉTICO: La balanza energética pasa a fuerte superávit y ahorra 0.55% del PBI en divisas y subsidios.',
        },
      },
      {
        id: 'abaratar_tarifa_industrial',
        label: 'Bonificar Tarifas a Hogares e Industria',
        subtitle: 'Suma +0.25% del PBI al Resultado Fiscal, +11 de Actividad y +9 de Paz Social.',
        effects: {
          fiscalDelta: 0.25,
          pazDelta: 9,
          actividadDelta: 11,
          sliderAdjust: null,
          news: 'HITO ENERGÉTICO: El gas de Vaca Muerta abarata costos industriales y alivia las boletas residenciales.',
        },
      },
    ],
  },
  {
    id: 'baja_tasas_fed_inversiones',
    type: 'positive',
    badge: 'SHOCK FINANCIERO POSITIVO · MERCADOS',
    title: 'La FED Baja Tasas y Caen 400 bps el Riesgo País',
    description:
      'La Reserva Federal de EE.UU. recorta tasas de interés y se desata una ola de euforia hacia mercados emergentes. Caen los rendimientos de la deuda y entran capitales frescos.',
    icon: 'TrendingUp',
    choices: [
      {
        id: 'canje_deuda_alivio',
        label: 'Ejecutar Canje Voluntario de Deuda',
        subtitle: 'Descomprime intereses: +0.50% del PBI en Resultado Fiscal, +6 Actividad y +4 Paz Social.',
        effects: {
          fiscalDelta: 0.50,
          pazDelta: 4,
          actividadDelta: 6,
          sliderAdjust: null,
          news: 'EUFORIA EN BONOS: Exitoso canje de deuda despeja vencimientos y ahorra 0.50% del PBI al Tesoro.',
        },
      },
      {
        id: 'credito_hipotecario_pyme',
        label: 'Fondear Boom de Crédito Privado y Obras',
        subtitle: 'Suma +0.20% del PBI Fiscal y dispara +14 puntos la Actividad Económica y +6 la Paz Social.',
        effects: {
          fiscalDelta: 0.20,
          pazDelta: 6,
          actividadDelta: 14,
          sliderAdjust: null,
          news: 'LLUVIA DE INVERSIONES: El desplome del Riesgo País reactiva el crédito bancario y la inversión privada.',
        },
      },
    ],
  },
  {
    id: 'acuerdo_pacto_fiscal',
    type: 'positive',
    badge: 'SHOCK INSTITUCIONAL POSITIVO · CONSENSO',
    title: 'Acuerdo Bipartidista y Digitalización del Estado',
    description:
      'Una auditoría tecnológica detecta filtraciones y compras duplicadas mientras el Congreso aprueba por amplia mayoría un paquete de simplificación tributaria y formalización.',
    icon: 'Sparkles',
    choices: [
      {
        id: 'podar_filtraciones',
        label: 'Eliminar Compras Duplicadas y Filtraciones',
        subtitle: 'Ahorro limpio sin costo social: +0.45% del PBI Fiscal y +9 puntos de Paz Social.',
        effects: {
          fiscalDelta: 0.45,
          pazDelta: 9,
          actividadDelta: 3,
          sliderAdjust: null,
          news: 'AUDITORÍA HISTÓRICA: La digitalización de compras públicas ahorra 0.45% del PBI con fuerte apoyo ciudadano.',
        },
      },
      {
        id: 'blanqueo_formalizacion',
        label: 'Lanzar Moratoria y Formalización PyME',
        subtitle: 'Recaudación rápida y oxígeno productivo: +0.35% del PBI Fiscal y +11 de Actividad.',
        effects: {
          fiscalDelta: 0.35,
          pazDelta: 5,
          actividadDelta: 11,
          sliderAdjust: null,
          news: 'RÉCORD DE FORMALIZACIÓN: El pacto fiscal suma contribuyentes y oxigena la actividad comercial.',
        },
      },
    ],
  },
];

/**
 * Genera 3 momentos aleatorios de shock durante los 180 segundos de partida,
 * mezclando shocks positivos y negativos sin repetición.
 */
export function generateRandomShockSchedule() {
  // Tres ventanas temporales aleatorias para mantener tensión impredecible:
  // 1er shock entre seg 150 y 118
  // 2do shock entre seg 102 y 68
  // 3er shock entre seg 52 y 22
  const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const times = [
    randInt(118, 150),
    randInt(68, 102),
    randInt(22, 52),
  ];

  const positives = ALL_SHOCKS.filter((s) => s.type === 'positive').sort(() => Math.random() - 0.5);
  const negatives = ALL_SHOCKS.filter((s) => s.type === 'negative').sort(() => Math.random() - 0.5);

  // Garantizamos que en cada partida haya al menos 1 shock positivo y 1 negativo,
  // y el 3ro sea completamente aleatorio (50% positivo / 50% negativo), luego desordenamos el orden.
  const picked = [
    positives[0],
    negatives[0],
    Math.random() < 0.5 ? positives[1] : negatives[1],
  ].sort(() => Math.random() - 0.5);

  return times.map((triggerTime, idx) => ({
    triggerTime,
    triggered: false,
    shock: picked[idx],
  }));
}
