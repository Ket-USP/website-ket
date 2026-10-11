import csv from "./membros.csv?raw";
import type { MemberProfile } from "../components/about/MemberCard";

// Uma linha por membro, na ordem: id, nome, funcao, url_foto, descricao.
export const members: MemberProfile[] = csv.trim().split(/\r?\n/).slice(1).map((line) => {
  // Separa as colunas sem dividir as vírgulas dentro de textos entre aspas.
  const [id, name, role, photo, description] = line
    .split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/)
    .map((value) => value.replace(/^"|"$/g, "").replace(/""/g, '"'));

  return { id, name, role, photo, description };
});
