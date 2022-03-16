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

function dateToISOLikeButLocal(isoFormat) {
  let date = new Date(isoFormat);
  const offsetMs = date.getTimezoneOffset() * 60 * 1000;
  const msLocal = date.getTime() - offsetMs;
  const dateLocal = new Date(msLocal);
  const iso = dateLocal.toISOString();
  const isoLocal = iso.slice(0, 19);
  return isoLocal;
}

export function IsoToForm(isoFormat) {
  const local = dateToISOLikeButLocal(isoFormat);
  return local.substring(0, 16);
}

export function getCurrentDate() {
  return new Date().toISOString();
}

export function maksKarakter(str, num = "15") {
  const body = str.length > num ? str.substring(0, num) : str;
  const ekstensi = str.length > num ? str.slice(-4) : null;
  return `${body} . . . ${ekstensi}`;
}

export function namaCase(str) {
  const splitStr = str.toLowerCase().split(" ");
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
}
