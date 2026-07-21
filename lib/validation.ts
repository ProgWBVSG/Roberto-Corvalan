import { z } from "zod";

export const leadSchema = z.object({
  nombre: z.string().trim().min(1, "Nombre requerido").max(120),
  email: z.string().trim().email("Email inválido").max(200),
  perfil: z.string().trim().min(1, "Perfil requerido").max(200),
  mensaje: z.string().trim().min(1, "Mensaje requerido").max(2000),
  // honeypot anti-spam: se valida en el route (si viene con texto, se descarta silenciosamente)
  website: z.string().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
