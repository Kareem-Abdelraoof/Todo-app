export const groupInputHandler = (inputs) => {
  return inputs.map((input, i) => {
    const { Component, data } = input;
    return <Component key={i} {...data} />;
  });
};
