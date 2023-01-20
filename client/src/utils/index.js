import moment from "moment/moment.js";

export function formatFromNow(props) {
  return moment(props).fromNow();
}

export function formatDate(props) {
  return moment(props).format("DD.MM.YYYY");
}

export const average = (arr) => {
  if (arr) {
    return arr.map((m) => Number(m.value))?.reduce((p, c) => p + c, 0 / arr.length);
  }
};