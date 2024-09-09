export const changeInputState = (setState, operation, index = undefined) => {
  return (e) => {
    if (index === undefined) {
      setState((oldState) => operation(e, oldState));
    } else {
      setState((oldState) => operation(e, oldState, index));
    }
  };
};

export const objectInputOperation = (event, oldState) => {
  const { value, type, name, checked } = event.target;
  const formObject = {
    ...oldState,
    [name]: type === 'checkbox' ? checked : value,
  };
  return formObject;
};

export const formsInputOperation = (event, oldState, index) => {
  const { value, type, name, checked } = event.target;
  const newObj = oldState.map((el, i) =>
    i === index ? { ...el, [name]: type === 'checkbox' ? checked : value } : el
  );
  return newObj;
};
