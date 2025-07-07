import { Route, Routes, Navigate } from "react-router";
import FeedbackPage from "./page/FeedbackPage/FeedbackPage";
import HomePage from "./page/HomePage/HomePage";
import ExternalRedirect from "./components/ExternalRedirect/ExternalRedirect"; // ajusta la ruta según tu estructura

const googleSheetUrl =
  "https://docs.google.com/spreadsheets/d/1pbmxwQ5FNMJoaVHiFBlx1VVz4HCvulGZ8M6l-kes6es/edit?gid=1905374567#gid=1905374567";

const RoutesComp = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/feedback/:sede" element={<FeedbackPage />} />
      <Route path="/feedback-sangilena-bga" element={<Navigate to="/feedback/sangilena-bga" replace />} />
      <Route path="/feedback-sangilena-campestre" element={<Navigate to="/feedback/sangilena-campestre" replace />} />
      <Route path="/sheet" element={<ExternalRedirect to={googleSheetUrl} />} />
    </Routes>
  );
};

export default RoutesComp;
