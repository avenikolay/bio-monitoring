export enum Hormones {
  LH = 'LH',
  TESTOSTERONE = 'TESTOSTERONE',
  ESTRADIOL = 'ESTRADIOL',
  PROLACTIN = 'PROLACTIN',
  SHBG = 'SHBG'
}

export const HormoneNames: Record<Hormones, string> = {
  [Hormones.LH]: 'ЛГ',
  [Hormones.TESTOSTERONE]: 'Тестостерон',
  [Hormones.ESTRADIOL]: 'Эстрадиол',
  [Hormones.PROLACTIN]: 'Пролактин',
  [Hormones.SHBG]: 'ГСПГ'
};
