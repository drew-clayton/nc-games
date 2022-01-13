const ErrorPage = (props) => {
  return (
    <>
      <h1>ErrorPage</h1>
      {Object.entries(props).length !== 0 ? (
        <p>{props.message}</p>
      ) : (
        <p>404 wrong path</p>
      )}
    </>
  );
};

export default ErrorPage;
