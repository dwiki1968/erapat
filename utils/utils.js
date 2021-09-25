export function IsoToLocalDate(isoFormat) {
  let date = new Date(isoFormat);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let hari = date.toLocaleDateString("id-ID", options);

  return hari;
}

export function IsoToLocalTime(isoFormat) {
  let date = new Date(isoFormat);

  let jam = date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return jam;
}

export function IsoToForm(isoFormat) {
  return isoFormat.substring(0, 16);
}

export function getCurrentDate() {
  return new Date().toISOString();
}
