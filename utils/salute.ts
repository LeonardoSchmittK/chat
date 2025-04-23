type Salutations = "bom dia" | "boa tarde" | "boa noite";

function salute(): Salutations {
  const hours = new Date().getHours();

  if (hours >= 0 && hours <= 11) return "bom dia";
  if (hours >= 12 && hours <= 18) return "boa tarde";
  return "boa noite"; 
}

export default salute
