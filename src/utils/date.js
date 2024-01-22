export function getTimeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diff = now - date;
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 30 * 12));

  if (minutes < 2) {
    return "1분전 ";
  } else if (minutes <= 59) {
    return `${minutes}분전`;
  } else if (hours < 1) {
    return "1시간전";
  } else if (hours <= 23) {
    return `${hours}시간전`;
  } else if (days < 1) {
    return "1일전";
  } else if (days <= 30) {
    return `${days}일전`;
  } else if (months < 1) {
    return "1개월전";
  } else if (months <= 11) {
    return `${months}개월전`;
  } else if (years < 1) {
    return "1년전";
  } else {
    return `${years}년전`;
  }
}
