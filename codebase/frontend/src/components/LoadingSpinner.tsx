export const LoadingSpinner: React.FC<{ message?: string }> = ({ message = "Loading..." }) => {
  // TODO Add a loading spinner
  return <div data-testid="loading-spinner">{message}</div>;
};
