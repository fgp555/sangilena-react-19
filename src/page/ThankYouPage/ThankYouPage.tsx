// import { useNavigate } from "react-router";
import "./ThankYouPage.scss";

const ThankYouPage = () => {
//   const navigate = useNavigate();

  return (
    <div className="thankyou-container">
      <div className="thankyou-content">
        <img src="https://cdn-icons-png.flaticon.com/512/3159/3159066.png" alt="Gracias" className="thankyou-icon" />
        <h1>¡Gracias por tu opinión!</h1>
        <p>Apreciamos mucho que te hayas tomado el tiempo para darnos tu feedback.</p>
        {/* <button onClick={() => navigate("/")}>Volver al inicio</button> */}
      </div>
    </div>
  );
};

export default ThankYouPage;
