import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="text-center mm-auto ">
      <h1 className="mfs-5">404</h1>
      <p className="fs-4">Check your internet connection</p>
      <Link to="/">Go Back</Link>
    </div>
  );
}

export default Error;
