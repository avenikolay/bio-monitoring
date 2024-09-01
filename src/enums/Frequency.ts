export enum Frequency {
  DAILY = 'DAILY',
  EVERY_OTHER_DAY = 'EVERY_OTHER_DAY',
  EVERY_THREE_DAYS = 'EVERY_THREE_DAYS',
  WEEKLY = 'WEEKLY',
  EVERY_TEN_DAYS = 'EVERY_TEN_DAYS',
  EVERY_TWO_WEEKS = 'EVERY_TWO_WEEKS'
}
export const FrequencyDescriptions: Record<Frequency, string> = {
  [Frequency.DAILY]: 'Ежедневно',
  [Frequency.EVERY_OTHER_DAY]: 'Через день',
  [Frequency.EVERY_THREE_DAYS]: 'Каждые три дня',
  [Frequency.WEEKLY]: 'Еженедельно',
  [Frequency.EVERY_TEN_DAYS]: 'Каждые десять дней',
  [Frequency.EVERY_TWO_WEEKS]: 'Каждые две недели'
};

export const FrequencyOptions = Object.keys(Frequency).map((key) => ({
  label: FrequencyDescriptions[Frequency[key as keyof typeof Frequency]],
  value: Frequency[key as keyof typeof Frequency]
}));
