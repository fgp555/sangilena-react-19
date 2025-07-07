import { Link } from "react-router";
import "./HomePage.scss";

const HomePage = () => {
  return (
    <div className="home-page">
      <h1 className="title">Por favor escanee el QR</h1>

      <div className="link-container">
        <Link to="/feedback/sangilena-bga" className="qr-link">
          Ir a Sangilena BGA
        </Link>
        <Link to="/feedback/sangilena-campestre" className="qr-link">
          Ir a Sangilena Campestre
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
