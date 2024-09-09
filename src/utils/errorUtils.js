export const handleError = (setErrorMessage, setIsLoading) => {
  return (error) => {
    if (error.response) {
      setErrorMessage(error.response.data.err);
    } else {
      setErrorMessage('There Was An Error ');
    }
    setIsLoading(false);
  };
};
