export const formatDate = dateString => {
  if (!dateString) {
    return '';
  }

  const date = new Date(dateString);

  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();

  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
};
