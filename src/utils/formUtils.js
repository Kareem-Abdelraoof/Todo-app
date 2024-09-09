export const errorCatcher = (apiFn, errorFn = () => {}) => {
  return (event) => {
    apiFn(event).catch((err) => {
      errorFn(err);
    });
  };
};
