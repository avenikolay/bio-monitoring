export default function updateScheduleData(schedule, data) {
  if (data && Object.keys(data).length > 0) {
    schedule.startDate = data.startDate || schedule.startDate;
    schedule.endDate = data.endDate || schedule.endDate;

    Object.keys(data.medications).forEach((medicationKey) => {
      const medicationData = data.medications[medicationKey];
      if (schedule.medications[medicationKey]) {
        schedule.medications[medicationKey].dosage = medicationData.dosage || Dosage.FULL;
        schedule.medications[medicationKey].frequency = medicationData.frequency || Frequency.DAILY;
      }
    });
  }
}
