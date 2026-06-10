import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("O email é obrigatório.")
    .email("Digite um email válido."),

  password: yup
    .string()
    .required("A palavra-passe é obrigatória.")
    .min(8, "A palavra-passe deve ter pelo menos 8 caracteres."),
});