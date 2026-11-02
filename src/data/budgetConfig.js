export const INITIAL_STATE = {
  timerSeconds: 180,
  basePazSocial: 65,
  baseActividad: 60,
  initialFiscalResult: -4.0,
  initialTotalSpending: 20.5,
  initialTotalRevenue: 16.5,
  structuralSpendingOffset: 1.0, // Garantiza que 19.50% de bloques + 1.00% rígido = 20.50% PBI (Déficit -4.00%)
  lafferFactor: 0.75, // Cada +1.00% de suba nominal de impuestos recauda 0.75% real neto
};

export const SPENDING_BLOCKS = [
  {
    id: 'politica',
    name: 'Cargos Políticos, Choferes y Legislativo',
    shortName: 'La Casta y Política',
    category: 'spending',
    icon: 'Crown',
    initial: 0.15,
    min: 0.02,
    max: 0.30,
    step: 0.01,
    locked: false,
    ruleSummary: 'Recortarlo al mínimo suma +10 de Paz Social, pero apenas mueve la aguja fiscal.',
    computeImpact: (val) => {
      const delta = val - 0.15; // negativo si se recorta
      // Si se recorta de 0.15 a 0.02 (-0.13), Paz Social sube +10 puntos
      const pazDelta = delta < 0 ? (Math.abs(delta) / 0.13) * 10 : -(delta / 0.15) * 12;
      return {
        pazSocial: pazDelta,
        actividad: 0,
      };
    },
    newsOnCut: 'Euforia en redes por recorte de choferes y viáticos en el Congreso, aunque el ahorro fiscal es simbólico.',
    newsOnRaise: 'Indignación ciudadana por aumento del presupuesto para cargos políticos y asesores.',
  },
  {
    id: 'subsidios',
    name: 'Subsidios a Luz, Gas y Transporte',
    shortName: 'Subsidios Tarifarios',
    category: 'spending',
    icon: 'Zap',
    initial: 2.20,
    min: 0.00,
    max: 3.50,
    step: 0.05,
    locked: false,
    ruleSummary: 'Cada 0.50% de recorte: -8 Paz Social y -3 Actividad (caída del ingreso disponible).',
    computeImpact: (val) => {
      const diff = 2.20 - val; // positivo si hay recorte
      return {
        pazSocial: -(diff / 0.50) * 8,
        actividad: -(diff / 0.50) * 3,
      };
    },
    newsOnCut: 'Tarifazo en boletas de luz, gas y boleto de colectivo: cacerolazos y menor consumo en comercios.',
    newsOnRaise: 'Congelamiento tarifario alivia el bolsillo pero dispara el costo energético del Tesoro.',
  },
  {
    id: 'obra_publica',
    name: 'Obra Pública y Giro a Provincias',
    shortName: 'Obra Pública y Provincias',
    category: 'spending',
    icon: 'HardHat',
    initial: 2.20,
    min: 0.10,
    max: 3.50,
    step: 0.05,
    locked: false,
    ruleSummary: 'Cada 0.50% de recorte: -7 Actividad Económica y -5 Paz Social (conflicto con gobernadores).',
    computeImpact: (val) => {
      const diff = 2.20 - val;
      return {
        pazSocial: -(diff / 0.50) * 5,
        actividad: -(diff / 0.50) * 7,
      };
    },
    newsOnCut: 'Rebelión de gobernadores y freno en la construcción por parálisis de obra pública y transferencias.',
    newsOnRaise: 'Gobernadores celebran reactivación de obras viales y giros discrecionales.',
  },
  {
    id: 'empresas',
    name: 'Empresas Públicas y Otros Gastos',
    shortName: 'Empresas Públicas',
    category: 'spending',
    icon: 'Building2',
    initial: 2.40,
    min: 0.50,
    max: 3.50,
    step: 0.05,
    locked: false,
    ruleSummary: 'Cada 0.50% de recorte: -6 Paz Social (paros de transporte y servicios públicos).',
    computeImpact: (val) => {
      const diff = 2.40 - val;
      return {
        pazSocial: -(diff / 0.50) * 6,
        actividad: -(diff / 0.50) * 1.5,
      };
    },
    newsOnCut: 'Gremios ferroviarios y aeronáuticos lanzan paros sorpresivos por recorte en empresas estatales.',
    newsOnRaise: 'Mayores transferencias operativas a empresas estatales contienen conflictos gremiales.',
  },
  {
    id: 'salarios',
    name: 'Salarios Públicos y Funcionamiento',
    shortName: 'Salarios Públicos',
    category: 'spending',
    icon: 'Users',
    initial: 2.45,
    min: 1.50,
    max: 3.50,
    step: 0.05,
    locked: false,
    ruleSummary: 'Cada 0.25% de recorte: -8 Paz Social (huelgas en administración, salud, universidades y seguridad).',
    computeImpact: (val) => {
      const diff = 2.45 - val;
      return {
        pazSocial: -(diff / 0.25) * 8,
        actividad: -(diff / 0.25) * 1.5,
      };
    },
    newsOnCut: 'Paro en dependencias públicas, hospitales y universidades por licuación salarial en el Estado.',
    newsOnRaise: 'Paritarias estatales por encima de la inflación descomprimen la protesta gremial.',
  },
  {
    id: 'sociales',
    name: 'Programas Sociales y Asignaciones',
    shortName: 'Planes y Asignaciones',
    category: 'spending',
    icon: 'HeartHandshake',
    initial: 2.30,
    min: 1.00,
    max: 3.50,
    step: 0.05,
    locked: false,
    ruleSummary: 'Cada 0.25% de recorte: -12 Paz Social (impacto crítico en la calle y piquetes).',
    computeImpact: (val) => {
      const diff = 2.30 - val;
      return {
        pazSocial: -(diff / 0.25) * 12,
        actividad: -(diff / 0.25) * 2,
      };
    },
    newsOnCut: 'Alerta máxima en accesos y Puente Pueyrredón: movimientos sociales cortan rutas por recorte de programas.',
    newsOnRaise: 'Refuerzo en AUH y Tarjeta Alimentar calma la tensión social en el conurbano.',
  },
  {
    id: 'jubilaciones',
    name: 'Jubilaciones y Pensiones',
    shortName: 'Jubilaciones (SIPA)',
    category: 'spending',
    icon: 'HeartPulse',
    initial: 6.20,
    min: 4.50,
    max: 7.50,
    step: 0.05,
    locked: false,
    badge: 'BLOQUE MÁS GRANDE',
    ruleSummary: 'El mayor peso del gasto. Cada 0.25% de recorte: -10 Paz Social y -4 Actividad Económica.',
    computeImpact: (val) => {
      const diff = 6.20 - val;
      return {
        pazSocial: -(diff / 0.25) * 10,
        actividad: -(diff / 0.25) * 4,
      };
    },
    newsOnCut: 'Fuerte caída real de haberes jubilatorios: marchas frente al Congreso y desplome del consumo en farmacias y súper.',
    newsOnRaise: 'Bono y recomposición previsional sostienen el consumo pero presionan la caja de ANSES.',
  },
  {
    id: 'deuda',
    name: 'Intereses de Deuda Soberana',
    shortName: 'Intereses de Deuda',
    category: 'spending',
    icon: 'Landmark',
    initial: 1.60,
    min: 0.00,
    max: 1.60,
    step: 1.60,
    locked: true,
    hasDefaultButton: true,
    ruleSummary: 'Fijo en 1.60% PBI. Declarar Default lleva el gasto a 0.00%, pero hunde -35 Actividad y -20 Paz Social.',
    computeImpact: (val, isDefaulted) => {
      if (isDefaulted) {
        return {
          pazSocial: -20,
          actividad: -35,
        };
      }
      return { pazSocial: 0, actividad: 0 };
    },
    newsOnCut: '¡DEFAULT SOBERANO! Se desploman los bonos, se dispara el Riesgo País a 4.500 puntos y se corta el crédito.',
  },
];

export const REVENUE_BLOCKS = [
  {
    id: 'iva',
    name: 'IVA (Impuesto al Consumo)',
    shortName: 'IVA (Consumo)',
    category: 'revenue',
    icon: 'ShoppingCart',
    initial: 5.20,
    min: 3.50,
    max: 6.50,
    step: 0.05,
    locked: false,
    ruleSummary: 'Cada +0.50% de suba: -10 Paz Social y -8 Actividad. (Efecto Laffer: recauda 75% neto).',
    computeImpact: (val) => {
      const diff = val - 5.20; // positivo si sube el impuesto
      if (diff >= 0) {
        return {
          pazSocial: -(diff / 0.50) * 10,
          actividad: -(diff / 0.50) * 8,
        };
      } else {
        // Bajar el IVA mejora paz social y actividad
        const cut = Math.abs(diff);
        return {
          pazSocial: (cut / 0.50) * 7,
          actividad: (cut / 0.50) * 6,
        };
      }
    },
    newsOnRaise: 'Suba del IVA impacta de lleno en la canasta básica: se derrumba el consumo masivo.',
    newsOnCut: 'Rebaja del IVA en alimentos impulsa las ventas minoristas pero resigna recaudación inmediata.',
  },
  {
    id: 'retenciones',
    name: 'Retenciones (Derechos de Exportación)',
    shortName: 'Retenciones al Campo',
    category: 'revenue',
    icon: 'Wheat',
    initial: 1.30,
    min: 0.00,
    max: 2.50,
    step: 0.05,
    locked: false,
    ruleSummary: 'Subir (+0.50%): -12 Actividad y -6 Paz Social (paro agro). Bajar (-0.50%): +8 Actividad.',
    computeImpact: (val) => {
      const diff = val - 1.30;
      if (diff >= 0) {
        return {
          pazSocial: -(diff / 0.50) * 6,
          actividad: -(diff / 0.50) * 12,
        };
      } else {
        const cut = Math.abs(diff);
        return {
          pazSocial: (cut / 0.50) * 2,
          actividad: (cut / 0.50) * 8,
        };
      }
    },
    newsOnRaise: 'Tractorazo y cese de comercialización de granos en rutas por suba de Retenciones al agro.',
    newsOnCut: 'Baja de Retenciones acelera liquidación de divisas y venta de maquinaria agrícola.',
  },
  {
    id: 'ganancias',
    name: 'Impuesto a las Ganancias y Renta',
    shortName: 'Ganancias y Renta',
    category: 'revenue',
    icon: 'Briefcase',
    initial: 2.50,
    min: 1.50,
    max: 4.00,
    step: 0.05,
    locked: false,
    ruleSummary: 'Cada +0.50% de suba: -7 Paz Social y -5 Actividad Económica.',
    computeImpact: (val) => {
      const diff = val - 2.50;
      if (diff >= 0) {
        return {
          pazSocial: -(diff / 0.50) * 7,
          actividad: -(diff / 0.50) * 5,
        };
      } else {
        const cut = Math.abs(diff);
        return {
          pazSocial: (cut / 0.50) * 5,
          actividad: (cut / 0.50) * 4,
        };
      }
    },
    newsOnRaise: 'Sindicatos industriales y bancarios en pie de guerra por reversión del Impuesto a las Ganancias.',
    newsOnCut: 'Alivio en el mínimo no imponible de Ganancias sostiene el poder adquisitivo de la clase media.',
  },
  {
    id: 'cheque',
    name: 'Impuesto al Cheque y Otros Tributos',
    shortName: 'Impuesto al Cheque / PAIS',
    category: 'revenue',
    icon: 'Receipt',
    initial: 3.40,
    min: 1.50,
    max: 4.50,
    step: 0.05,
    locked: false,
    ruleSummary: 'Cada +0.50% de suba: -9 Actividad Económica (asfixia financiera a PyMEs y formalidad).',
    computeImpact: (val) => {
      const diff = val - 3.40;
      if (diff >= 0) {
        return {
          pazSocial: -(diff / 0.50) * 2,
          actividad: -(diff / 0.50) * 9,
        };
      } else {
        const cut = Math.abs(diff);
        return {
          pazSocial: (cut / 0.50) * 1,
          actividad: (cut / 0.50) * 6,
        };
      }
    },
    newsOnRaise: 'Cámaras PyME advierten por cierre de comercios e informalidad tras suba de impuestos distorsivos.',
    newsOnCut: 'Reducción del Impuesto al Cheque abarata el crédito comercial y oxigena a las PyMEs.',
  },
  {
    id: 'aportes',
    name: 'Aportes y Contribuciones Seguridad Social',
    shortName: 'Aportes Seguridad Social',
    category: 'revenue',
    icon: 'ShieldCheck',
    initial: 4.10,
    min: 4.10,
    max: 4.10,
    step: 0.10,
    locked: true,
    ruleSummary: 'Fijo en 4.10% del PBI. Recursos afectados directamente al sistema previsional.',
    computeImpact: () => ({ pazSocial: 0, actividad: 0 }),
  },
];
