import "./FeedbackForm.scss";
import { ModalComp } from "../../components/ModalComp/ModalComp";
import { useState } from "react";
import { validateField } from "./validate.feedback";
import axiosInstance from "../../lib/axios";

type Props = {
  sede: string;
};

const FeedbackForm = ({ sede }: Props) => {
  const logoImage =
    sede === "sangilena-bga"
      ? "https://i.postimg.cc/CL8VVqtL/sangilena.webp"
      : "https://i.postimg.cc/fRhQWbn7/campestre.webp";
  const bgImage =
    sede === "sangilena-bga"
      ? "https://i.postimg.cc/ZR4NnjRb/rest-bg-1.webp"
      : "https://i.postimg.cc/C17qqDBj/rest-bg-2.webp";

  const urlReview =
    sede === "sangilena-bga" ? "https://g.page/r/CW6s94gTIOZKEBM/review" : "https://g.page/r/CYzuw0E_HOJtEBE/review";

  const [socialSource, setSocialSource] = useState<string[]>([]);
  const [howMet, setHowMet] = useState("");
  const [rating, setRating] = useState(0);
  const [showImprovementBox, setShowImprovementBox] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState(
    "¡Formulario enviado correctamente! Revisa tu correo y carpeta de spam."
  );

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSocialSelect = (source: string) => {
    setSocialSource((prev) => (prev.includes(source) ? prev.filter((item) => item !== source) : [...prev, source]));
  };

  const handleRating = (value: number) => {
    setRating(value);
    setShowImprovementBox(value < 5);
    setErrors((prev) => ({ ...prev, rating: value ? "" : "Por favor califica tu experiencia." }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    const data = Object.fromEntries(formData.entries());

    const payload = {
      ...data,
      branchVisited: sede,
      howDidYouKnowUs: howMet,
      socialMediaSource: howMet === "anuncio" ? socialSource : "",
      experienceRating: rating,
      acceptTerms: !!formData.get("acceptTerms"),
    };

    // Validar campos requeridos
    const fieldsToValidate = ["name", "email", "whatsapp", "birthday", "rating"];
    const newErrors: Record<string, string> = {};
    fieldsToValidate.forEach((field) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const value = field === "rating" ? rating.toString() : (data as any)[field];
      const error = validateField(field, value);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // ✅ Activar loading solo si pasa la validación
    setIsLoading(true);

    try {
      setShowModal(true);
      await axiosInstance.post("/feedback", payload);
      setErrors({});

      if (rating >= 4) {
        window.location.href = urlReview;
      } else {
        setModalMessage("¡Gracias por tu opinión! Trabajaremos para mejorar tu experiencia.");
        setShowModal(true);
        window.location.href = "/gracias";
      }
    } catch (err) {
      alert("Error al enviar el formulario.");
      console.error(err);
    } finally {
      setIsLoading(false);
      setShowModal(false);
    }
  };

  return (
    <div className="form-container" style={{ backgroundImage: `url(${bgImage})` }}>
      <img className="logo" src={logoImage} alt="logo" />
      <div className="bgImageContainer">
        <img className="bgImage" src={bgImage} alt="bgImage" />
        <img className="bgImage" src={bgImage} alt="bgImage" />
      </div>
      <form onSubmit={handleSubmit}>
        <aside>
          <h1>QUEREMOS SABER TU OPINIÓN</h1>
          <p className="welcome">
            ¡Gracias por enriquecer nuestra experiencia con tu opinión!
            <br />
            Esta encuesta solo tomará 30 segundos. Tus comentarios son muy importantes para seguir mejorando nuestros
            procesos y hacer de tu visita algo inolvidable. 🪄🪄
            <br />
            Como agradecimiento, te enviaremos un pequeño detalle a tu correo. 🎁🎁
          </p>
        </aside>
        <div>
          <hr className="line" />
        </div>
        <div>
          <label>Nombre</label>
          <input type="text" name="name" onBlur={handleBlur} />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" onBlur={handleBlur} />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        <div>
          <label>WhatsApp</label>
          <input type="text" name="whatsapp" onBlur={handleBlur} />
          {errors.whatsapp && <span className="error-message">{errors.whatsapp}</span>}
        </div>
        <div>
          <label>¿Cuál es tu fecha de cumpleaños?</label>
          <input type="date" name="birthday" onBlur={handleBlur} />
          {errors.birthday && <span className="error-message">{errors.birthday}</span>}
        </div>
        <div>
          <label>¿Recuerdas el nombre del Meser@ que te atendió durante la visita?</label>
          <input type="text" name="waiterName" onBlur={handleBlur} />
        </div>
        <br />
        <div>
          <label>¿Cómo nos conociste?</label>
          <div className="howMet">
            {["recomendacion", "anuncio", "camino", "cliente"].map((opt) => (
              <label key={opt}>
                <input type="radio" name="howMet" value={opt} required onChange={() => setHowMet(opt)} />
                {opt === "recomendacion"
                  ? "Recomendación de alguien"
                  : opt === "anuncio"
                  ? "Vi un anuncio publicitario en redes sociales"
                  : opt === "camino"
                  ? "Los ví mientras caminaba y entré"
                  : "Ya los conocía, soy cliente"}
              </label>
            ))}
          </div>
        </div>
        <br />
        <div>
          {howMet === "anuncio" && (
            <div className="social-buttons">
              <strong>¿Dónde viste el anuncio?</strong>
              {["facebook", "instagram", "tiktok"].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleSocialSelect(s)}
                  className={socialSource.includes(s) ? "active" : ""}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          )}
          <input type="hidden" name="socialMediaSource" value={socialSource.join(",")} />
        </div>
        <br />
        <div>
          <label>¿Cómo calificarías tu experiencia?</label>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((val) => (
              <i
                key={val}
                className={`fas fa-star ${val <= rating ? "selected" : ""}`}
                onClick={() => handleRating(val)}
              />
            ))}
          </div>
          <input type="hidden" name="rating" value={rating} />
          {errors.rating && <span className="error-message">{errors.rating}</span>}
        </div>
        <br />
        <div>
          {showImprovementBox && (
            <div>
              <label>Por favor indícanos cómo podemos mejorar 👇</label>
              <textarea name="improvementSuggestions" rows={3} onBlur={handleBlur}></textarea>
            </div>
          )}
        </div>
        <br />
        <div>
          <label>
            <input type="checkbox" name="acceptTerms" required />
            Acepto los términos y condiciones de la empresa. Al proporcionar mi número de WhatsApp acepto recibir
            promociones esporádicas.
          </label>
        </div>

        <div className="button-spinner-container">
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Enviando..." : "Continuar"}
          </button>
        </div>

        <br />

        <p className="disclaimer">
          ¿Te gustaría una encuesta así para tu negocio?
          <br />
          Contáctanos:&nbsp;
          <a
            href="https://wa.me/573114396143?text=Hola%20Systered%2C%20estoy%20interesado%20en%20una%20encuesta%20para%20mi%20negocio"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.systered.com
          </a>
        </p>
      </form>

      <ModalComp isOpen={showModal} onClose={() => setShowModal(false)} title="Mensaje">
        {/* <p>¡Formulario enviado correctamente! Revisa tu correo y carpeta de spam.</p> */}
        <p>{modalMessage}</p>
        <div className="button-spinner-container">{isLoading ? <span className="spinner"></span> : ""}</div>
      </ModalComp>
    </div>
  );
};

export default FeedbackForm;
