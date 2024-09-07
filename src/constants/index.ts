export const getMaxValue = async (): Promise<number> => {
  const response = await fetch("/data.json");
  const data = await response.json();
  return data.max;
};

export const updateMaxValue = (newMax: number) => {
  localStorage.setItem("maxValue", newMax.toString());
};

export const getStoredMaxValue = (): number | null => {
  const storedMax = localStorage.getItem("maxValue");
  return storedMax ? parseInt(storedMax, 10) : null;
};

interface Withdrawal {
  id: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  amount: string;
  date: string;
}

export const getTransactions = async (): Promise<Withdrawal[]> => {
  const response = await fetch("/data.json");
  const data = await response.json();
  return data.transactions;
};

export const updateTransactions = (transactions: Withdrawal[]) => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
};

export const getStoredTransactions = (): Withdrawal[] | null => {
  const storedTransactions = localStorage.getItem("transactions");
  return storedTransactions ? JSON.parse(storedTransactions) : null;
};
