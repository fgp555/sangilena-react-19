import { useParams, Navigate } from "react-router";
import FeedbackForm from "../../components/FeedbackForm/FeedbackForm";

// Lista de sedes válidas
const sedesDisponibles = ["sangilena-bga", "sangilena-campestre"] as const;
type Sede = (typeof sedesDisponibles)[number];

export default function FeedbackPage() {
  const { sede } = useParams<{ sede: string }>();
  console.log("sede", sede);

  if (!sede || !sedesDisponibles.includes(sede as Sede)) {
    // Redirecciona a 404 si la sede no es válida
    return <Navigate to="/404" replace />;
  }

  return <FeedbackForm sede={sede as Sede} />;
}
