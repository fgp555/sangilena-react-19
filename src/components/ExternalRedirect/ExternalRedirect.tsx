import { useEffect } from "react";

type Props = {
  to: string;
};

const ExternalRedirect = ({ to }: Props) => {
  useEffect(() => {
    window.location.href = to;
  }, [to]);

  return null; // Nada que renderizar
};

export default ExternalRedirect;
