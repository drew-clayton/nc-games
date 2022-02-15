const ErrorPage = (props) => {
  return (
    <>
      <p className="text-red-500 text-center p-10">Something has gone wrong</p>
      {Object.entries(props).length !== 0 ? (
        <p className="text-red-500 text-center p-10">{props.message}</p>
      ) : (
        <p className="text-red-500 text-center p-10">404 wrong path</p>
      )}
    </>
  );
};

export default ErrorPage;
