export enum MedicationNames {
  CLOSTILBEGIT = 'CLOSTILBEGIT',
  ANASTROZOLE = 'ANASTROZOLE',
  DOSTINEX = 'DOSTINEX'
}

export const MedicationDescriptions: Record<MedicationNames, string> = {
  [MedicationNames.CLOSTILBEGIT]: 'Клостилбегит',
  [MedicationNames.ANASTROZOLE]: 'Анастразол',
  [MedicationNames.DOSTINEX]: 'Достинекс'
};

// export enum MedicationNames {
//   CLOSTILBEGIT = 'Клостилбегит',
//   ANASTROZOLE = 'Анастразол',
//   DOSTINEX = 'Достинекс'
// }
