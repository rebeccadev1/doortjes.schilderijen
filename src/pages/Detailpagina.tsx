import { useParams, Navigate } from "react-router-dom";
import { schilderijen } from "../data/schilderijen";
import { SchilderijDetail } from "../components/SchilderijDetail";

export function Detailpagina() {
  const { id } = useParams<{ id: string }>();
  const schilderij = schilderijen.find((s) => s.id === id);

  if (!schilderij) {
    return <Navigate to="/" replace />;
  }

  return <SchilderijDetail schilderij={schilderij} />;
}
