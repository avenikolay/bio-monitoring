export enum Dosage {
  QUARTER = 'QUARTER',
  HALF = 'HALF',
  TWO_THIRDS = 'TWO_THIRDS',
  FULL = 'FULL'
}

export const DosageDescriptions: Record<Dosage, string> = {
  [Dosage.QUARTER]: '1/4 таблетки',
  [Dosage.HALF]: '1/2 таблетки',
  [Dosage.TWO_THIRDS]: '2/3 таблетки',
  [Dosage.FULL]: 'Целая таблетка'
};
export const DosageOptions = Object.keys(Dosage).map((key) => ({
  label: DosageDescriptions[Dosage[key as keyof typeof Dosage]],
  value: Dosage[key as keyof typeof Dosage]
}));
