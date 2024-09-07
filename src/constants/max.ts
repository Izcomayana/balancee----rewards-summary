export const getMaxValue = async (): Promise<number> => {
  const response = await fetch('/data.json');
  const data = await response.json();
  return data.max;
};

export const updateMaxValue = (newMax: number) => {
  localStorage.setItem('maxValue', newMax.toString());
};

export const getStoredMaxValue = (): number | null => {
  const storedMax = localStorage.getItem('maxValue');
  return storedMax ? parseInt(storedMax, 10) : null;
};
