export default function updateCheckupsData(checkups, data) {
  if (data && Object.keys(data).length > 0) {
    Object.keys(data.hormonesData).forEach((hormoneKey) => {
      const hormoneData = data.hormonesData[hormoneKey];
      if (checkups[hormoneKey]) {
        checkups[hormoneKey].target = hormoneData.target || 0;
        checkups[hormoneKey].initial = hormoneData.initial || 0;
        checkups[hormoneKey].monthlyReadings = hormoneData.monthlyReadings || {};
      }
    });
  }
}
