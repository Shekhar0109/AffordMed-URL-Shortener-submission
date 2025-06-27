const logs = [];

const logEvent = (type, message, data = {}) => {
  const timestamp = new Date().toISOString();
  const entry = { timestamp, type, message, ...data };
  logs.push(entry);

  // Store in localStorage
  let history = JSON.parse(localStorage.getItem('log-history') || '[]');
  history.push(entry);
  localStorage.setItem('log-history', JSON.stringify(history));
};

const Logger = {
  info: (message, data) => logEvent('INFO', message, data),
  warn: (message, data) => logEvent('WARN', message, data),
  error: (message, data) => logEvent('ERROR', message, data),
  getLogs: () => logs,
};

export default Logger;
