"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import type { SiteContent } from "@/lib/content-schema";
import { iconOptions } from "@/lib/content-schema";
import { saveContentAction } from "@/app/admin/contenido/actions";
import { Field, TextAreaField, SelectField } from "./Field";
import { ImageFieldEditor } from "./ImageFieldEditor";
import { ListEditor } from "./ListEditor";
import { Section } from "./Section";

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

export default function ContentEditor({ initialContent }: { initialContent: SiteContent }) {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function set<K extends keyof SiteContent>(key: K, patch: Partial<SiteContent[K]>) {
    setContent((c) => ({ ...c, [key]: { ...c[key], ...patch } }));
  }

  function handleSave() {
    setStatus("idle");
    startTransition(async () => {
      const res = await saveContentAction(content);
      if (res.ok) {
        setStatus("saved");
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        setErrorMsg(res.error ?? "Error desconocido");
      }
    });
  }

  const { global, hero, empresas, servicios, ctaBand, enfoque, sobreMi, comunidad, eventos, banner, testimonios, contacto, footer } = content;

  return (
    <div className="pb-32">
      {/* Barra de guardado, fija arriba */}
      <div className="sticky top-0 z-20 -mx-5 mb-6 border-b border-[color:var(--navy-line)] bg-navy/95 px-5 py-4 backdrop-blur-md md:-mx-8 md:px-8">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="flex items-center gap-1.5 rounded-full border border-[color:var(--navy-line)] px-3.5 py-2 text-sm text-white/60 transition-colors hover:text-white hover:border-white/30"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M19 12H5M11 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Consultas
            </Link>
            <div>
              <h1 className="font-display text-xl text-ivory">Editar contenido</h1>
              <p className="text-xs text-white/40">Los cambios se publican al instante al guardar.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {status === "saved" && <span className="text-sm text-emerald-400">✓ Guardado</span>}
            {status === "error" && <span className="text-sm text-[#e0a4a4]">{errorMsg}</span>}
            <button
              type="button"
              onClick={handleSave}
              disabled={pending}
              className="rounded-full bg-gold px-6 py-2.5 text-sm font-medium text-[#1a1206] transition-colors hover:bg-gold-2 disabled:opacity-50"
            >
              {pending ? "Guardando…" : "Guardar cambios"}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl space-y-4">
        {/* GLOBAL */}
        <Section title="Datos generales" description="WhatsApp usado en toda la web" defaultOpen>
          <Field label="Número de WhatsApp (sin +, con código de país)" value={global.whatsappNumber} onChange={(v) => set("global", { whatsappNumber: v })} placeholder="5491136830740" />
          <TextAreaField label="Mensaje por defecto de WhatsApp" value={global.whatsappDefaultMessage} onChange={(v) => set("global", { whatsappDefaultMessage: v })} rows={2} />
        </Section>

        {/* HERO */}
        <Section title="Portada (Hero)" description="Lo primero que se ve al entrar">
          <ImageFieldEditor label="Foto de fondo" value={hero.background} onChange={(v) => set("hero", { background: v })} />
          <Field label="Título — línea 1" value={hero.titleLine1} onChange={(v) => set("hero", { titleLine1: v })} />
          <Field label="Título — línea 2 (dorada)" value={hero.titleLine2} onChange={(v) => set("hero", { titleLine2: v })} />
          <TextAreaField label="Texto antes del número animado" value={hero.introText} onChange={(v) => set("hero", { introText: v })} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Número destacado" value={hero.statNumber} onChange={(v) => set("hero", { statNumber: v })} />
          </div>
          <div>
            <span className="mb-1.5 block text-xs font-medium text-white/50">Palabras que rotan (una por línea)</span>
            <TextAreaField
              label=""
              rows={3}
              value={hero.statWords.join("\n")}
              onChange={(v) => set("hero", { statWords: v.split("\n").map((s) => s.trim()).filter(Boolean) })}
            />
          </div>
          <TextAreaField label="Texto después del número animado" value={hero.outroText} onChange={(v) => set("hero", { outroText: v })} />
          <Field label="Texto del botón" value={hero.ctaText} onChange={(v) => set("hero", { ctaText: v })} />

          <div>
            <p className="mb-3 text-sm font-medium text-ivory">Roles (Coach, Mentor, etc.)</p>
            <ListEditor
              items={hero.roles}
              onChange={(roles) => set("hero", { roles })}
              newItem={() => ({ id: uid(), titulo: "Nuevo rol", descripcion: "" })}
              addLabel="Agregar rol"
              minItems={1}
              renderItem={(item, update) => (
                <>
                  <Field label="Título" value={item.titulo} onChange={(v) => update({ titulo: v })} />
                  <TextAreaField label="Descripción" value={item.descripcion} onChange={(v) => update({ descripcion: v })} />
                </>
              )}
            />
          </div>
        </Section>

        {/* EMPRESAS */}
        <Section title="Empresas que confían en mí" description="Marquee de logos">
          <Field label="Título de la sección" value={empresas.titulo} onChange={(v) => set("empresas", { titulo: v })} />
          <ListEditor
            items={empresas.logos}
            onChange={(logos) => set("empresas", { logos })}
            newItem={() => ({ id: uid(), nombre: "Nueva empresa", logo: { mediaId: null, fallbackSrc: "", alt: "" } })}
            addLabel="Agregar empresa"
            renderItem={(item, update) => (
              <>
                <Field label="Nombre" value={item.nombre} onChange={(v) => update({ nombre: v })} />
                <ImageFieldEditor label="Logo" value={item.logo} onChange={(v) => update({ logo: v })} />
              </>
            )}
          />
        </Section>

        {/* SERVICIOS */}
        <Section title="Servicios">
          <Field label="Título" value={servicios.titulo} onChange={(v) => set("servicios", { titulo: v })} />
          <TextAreaField label="Descripción" value={servicios.descripcion} onChange={(v) => set("servicios", { descripcion: v })} />
          <Field label="Texto del botón final" value={servicios.ctaText} onChange={(v) => set("servicios", { ctaText: v })} />
          <ListEditor
            items={servicios.items}
            onChange={(items) => set("servicios", { items })}
            minItems={1}
            newItem={() => ({ id: uid(), numero: "0" + (servicios.items.length + 1), titulo: "Nuevo servicio", descripcion: "", tag: "", imagen: { mediaId: null, fallbackSrc: "", alt: "" } })}
            addLabel="Agregar servicio"
            renderItem={(item, update) => (
              <>
                <div className="grid grid-cols-[80px_1fr] gap-3">
                  <Field label="N°" value={item.numero} onChange={(v) => update({ numero: v })} />
                  <Field label="Tag corto" value={item.tag} onChange={(v) => update({ tag: v })} />
                </div>
                <Field label="Título" value={item.titulo} onChange={(v) => update({ titulo: v })} />
                <TextAreaField label="Descripción" value={item.descripcion} onChange={(v) => update({ descripcion: v })} />
                <ImageFieldEditor label="Imagen" value={item.imagen} onChange={(v) => update({ imagen: v })} />
              </>
            )}
          />
        </Section>

        {/* CTA BAND */}
        <Section title="Banda '¿Tu liderazgo llegó a un techo?'">
          <Field label="Título" value={ctaBand.titulo} onChange={(v) => set("ctaBand", { titulo: v })} />
          <TextAreaField label="Descripción" value={ctaBand.descripcion} onChange={(v) => set("ctaBand", { descripcion: v })} />
          <Field label="Texto del botón" value={ctaBand.ctaText} onChange={(v) => set("ctaBand", { ctaText: v })} />
          <ImageFieldEditor label="Imagen" value={ctaBand.imagen} onChange={(v) => set("ctaBand", { imagen: v })} />
          <TextAreaField label="Testimonio flotante — texto" value={ctaBand.testimonioTexto} onChange={(v) => set("ctaBand", { testimonioTexto: v })} />
          <Field label="Testimonio flotante — autor" value={ctaBand.testimonioAutor} onChange={(v) => set("ctaBand", { testimonioAutor: v })} />
        </Section>

        {/* ENFOQUE */}
        <Section title="El método (Enfoque)">
          <Field label="Título" value={enfoque.titulo} onChange={(v) => set("enfoque", { titulo: v })} />
          <TextAreaField label="Descripción" value={enfoque.descripcion} onChange={(v) => set("enfoque", { descripcion: v })} />
          <Field label="Texto del botón" value={enfoque.ctaText} onChange={(v) => set("enfoque", { ctaText: v })} />
          <ImageFieldEditor label="Imagen de fondo (sutil)" value={enfoque.imagenFondo} onChange={(v) => set("enfoque", { imagenFondo: v })} />
          <div>
            <p className="mb-3 text-sm font-medium text-ivory">Tarjetas del método</p>
            <ListEditor
              items={enfoque.items}
              onChange={(items) => set("enfoque", { items })}
              minItems={1}
              newItem={() => ({ id: uid(), titulo: "Nueva tarjeta", descripcion: "", icono: "star" as const })}
              addLabel="Agregar tarjeta"
              renderItem={(item, update) => (
                <>
                  <Field label="Título" value={item.titulo} onChange={(v) => update({ titulo: v })} />
                  <TextAreaField label="Descripción" value={item.descripcion} onChange={(v) => update({ descripcion: v })} />
                  <SelectField
                    label="Ícono"
                    value={item.icono}
                    onChange={(v) => update({ icono: v as typeof item.icono })}
                    options={iconOptions.map((o) => ({ value: o.key, label: o.label }))}
                  />
                </>
              )}
            />
          </div>
        </Section>

        {/* SOBRE MI */}
        <Section title="Sobre mí">
          <ImageFieldEditor label="Foto" value={sobreMi.foto} onChange={(v) => set("sobreMi", { foto: v })} />
          <Field label="Título" value={sobreMi.titulo} onChange={(v) => set("sobreMi", { titulo: v })} />
          <TextAreaField label="Párrafo 1" value={sobreMi.parrafo1} onChange={(v) => set("sobreMi", { parrafo1: v })} rows={4} />
          <TextAreaField label="Párrafo 2" value={sobreMi.parrafo2} onChange={(v) => set("sobreMi", { parrafo2: v })} rows={4} />
          <Field label="Texto del botón" value={sobreMi.ctaText} onChange={(v) => set("sobreMi", { ctaText: v })} />

          <div>
            <p className="mb-3 text-sm font-medium text-ivory">Certificaciones</p>
            <ListEditor
              items={sobreMi.certificaciones}
              onChange={(certificaciones) => set("sobreMi", { certificaciones })}
              newItem={() => ({ id: uid(), titulo: "Nueva certificación", descripcion: "" })}
              addLabel="Agregar certificación"
              renderItem={(item, update) => (
                <>
                  <Field label="Título" value={item.titulo} onChange={(v) => update({ titulo: v })} />
                  <TextAreaField label="Descripción" value={item.descripcion} onChange={(v) => update({ descripcion: v })} />
                </>
              )}
            />
          </div>

          <div>
            <p className="mb-3 text-sm font-medium text-ivory">Otras acreditaciones</p>
            <ListEditor
              items={sobreMi.otrasAcreditaciones}
              onChange={(otrasAcreditaciones) => set("sobreMi", { otrasAcreditaciones })}
              newItem={() => ({ id: uid(), texto: "" })}
              addLabel="Agregar acreditación"
              renderItem={(item, update) => (
                <TextAreaField label="Texto" value={item.texto} onChange={(v) => update({ texto: v })} />
              )}
            />
          </div>

          <div className="rounded-xl border border-[color:var(--gold)]/25 p-4">
            <p className="mb-3 text-sm font-medium text-gold-2">Credencial destacada — Certificado CIC</p>
            <div className="space-y-3">
              <ImageFieldEditor
                label="Foto del certificado"
                value={sobreMi.certificadoCIC.imagen}
                onChange={(v) => set("sobreMi", { certificadoCIC: { ...sobreMi.certificadoCIC, imagen: v } })}
              />
              <Field label="Texto del badge" value={sobreMi.certificadoCIC.badgeText} onChange={(v) => set("sobreMi", { certificadoCIC: { ...sobreMi.certificadoCIC, badgeText: v } })} />
              <Field label="Título" value={sobreMi.certificadoCIC.titulo} onChange={(v) => set("sobreMi", { certificadoCIC: { ...sobreMi.certificadoCIC, titulo: v } })} />
              <Field label="Subtítulo (dorado)" value={sobreMi.certificadoCIC.subtitulo} onChange={(v) => set("sobreMi", { certificadoCIC: { ...sobreMi.certificadoCIC, subtitulo: v } })} />
              <TextAreaField label="Descripción" value={sobreMi.certificadoCIC.descripcion} onChange={(v) => set("sobreMi", { certificadoCIC: { ...sobreMi.certificadoCIC, descripcion: v } })} />
              <div>
                <p className="mb-3 text-sm font-medium text-ivory">Datos (Credencial, Código, Vigencia, Sede…)</p>
                <ListEditor
                  items={sobreMi.certificadoCIC.datos}
                  onChange={(datos) => set("sobreMi", { certificadoCIC: { ...sobreMi.certificadoCIC, datos } })}
                  newItem={() => ({ id: uid(), etiqueta: "Etiqueta", valor: "Valor" })}
                  addLabel="Agregar dato"
                  renderItem={(item, update) => (
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Etiqueta" value={item.etiqueta} onChange={(v) => update({ etiqueta: v })} />
                      <Field label="Valor" value={item.valor} onChange={(v) => update({ valor: v })} />
                    </div>
                  )}
                />
              </div>
              <div>
                <p className="mb-3 text-sm font-medium text-ivory">Redes y asociaciones (carrusel de logos)</p>
                <Field
                  label="Título del carrusel"
                  value={sobreMi.certificadoCIC.asociacionesTitulo}
                  onChange={(v) => set("sobreMi", { certificadoCIC: { ...sobreMi.certificadoCIC, asociacionesTitulo: v } })}
                />
                <div className="mt-3">
                  <ListEditor
                    items={sobreMi.certificadoCIC.asociaciones}
                    onChange={(asociaciones) => set("sobreMi", { certificadoCIC: { ...sobreMi.certificadoCIC, asociaciones } })}
                    newItem={() => ({ id: uid(), nombre: "Nueva asociación", logo: { mediaId: null, fallbackSrc: "", alt: "" } })}
                    addLabel="Agregar asociación"
                    renderItem={(item, update) => (
                      <>
                        <Field label="Nombre" value={item.nombre} onChange={(v) => update({ nombre: v })} />
                        <ImageFieldEditor label="Logo" value={item.logo} onChange={(v) => update({ logo: v })} />
                      </>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* COMUNIDAD */}
        <Section title="Comunidad de coaches">
          <ImageFieldEditor label="Foto" value={comunidad.foto} onChange={(v) => set("comunidad", { foto: v })} />
          <Field label="Frase antes del número" value={comunidad.headingPrefix} onChange={(v) => set("comunidad", { headingPrefix: v })} />
          <Field label="Número destacado" value={comunidad.statNumber} onChange={(v) => set("comunidad", { statNumber: v })} />
          <TextAreaField
            label="Palabras que rotan (una por línea)"
            rows={4}
            value={comunidad.statWords.join("\n")}
            onChange={(v) => set("comunidad", { statWords: v.split("\n").map((s) => s.trim()).filter(Boolean) })}
          />
          <TextAreaField label="Descripción" value={comunidad.descripcion} onChange={(v) => set("comunidad", { descripcion: v })} />
          <Field label="Texto del botón" value={comunidad.ctaText} onChange={(v) => set("comunidad", { ctaText: v })} />
          <div>
            <p className="mb-3 text-sm font-medium text-ivory">Beneficios (con check)</p>
            <ListEditor
              items={comunidad.features}
              onChange={(features) => set("comunidad", { features })}
              newItem={() => ({ id: uid(), texto: "" })}
              addLabel="Agregar beneficio"
              renderItem={(item, update) => <Field label="Texto" value={item.texto} onChange={(v) => update({ texto: v })} />}
            />
          </div>
        </Section>

        {/* EVENTOS */}
        <Section title="Eventos e invitados">
          <Field label="Título" value={eventos.titulo} onChange={(v) => set("eventos", { titulo: v })} />
          <TextAreaField label="Descripción" value={eventos.descripcion} onChange={(v) => set("eventos", { descripcion: v })} />
          <Field label="Texto del botón" value={eventos.ctaText} onChange={(v) => set("eventos", { ctaText: v })} />
          <Field label="Título de la lista de invitados" value={eventos.referentesTitulo} onChange={(v) => set("eventos", { referentesTitulo: v })} />
          <div>
            <p className="mb-3 text-sm font-medium text-ivory">Invitados / marcas del marquee</p>
            <ListEditor
              items={eventos.referentes}
              onChange={(referentes) => set("eventos", { referentes })}
              newItem={() => ({ id: uid(), nombre: "Nuevo invitado" })}
              addLabel="Agregar invitado"
              renderItem={(item, update) => <Field label="Nombre" value={item.nombre} onChange={(v) => update({ nombre: v })} />}
            />
          </div>
          <div>
            <p className="mb-3 text-sm font-medium text-ivory">Fotos del collage</p>
            <ListEditor
              items={eventos.fotos}
              onChange={(fotos) => set("eventos", { fotos })}
              minItems={1}
              newItem={() => ({ id: uid(), imagen: { mediaId: null, fallbackSrc: "", alt: "" }, ratio: "square" as const })}
              addLabel="Agregar foto"
              renderItem={(item, update) => (
                <>
                  <ImageFieldEditor label="Foto" value={item.imagen} onChange={(v) => update({ imagen: v })} />
                  <SelectField
                    label="Formato"
                    value={item.ratio}
                    onChange={(v) => update({ ratio: v as "wide" | "square" })}
                    options={[
                      { value: "wide", label: "Ancha (la primera suele ser así)" },
                      { value: "square", label: "Cuadrada" },
                    ]}
                  />
                </>
              )}
            />
          </div>
        </Section>

        {/* BANNER */}
        <Section title="Banner de estadísticas">
          <ImageFieldEditor label="Foto (recorte)" value={banner.imagen} onChange={(v) => set("banner", { imagen: v })} />
          <Field label="Título — parte normal" value={banner.tituloNormal} onChange={(v) => set("banner", { tituloNormal: v })} />
          <Field label="Título — parte dorada" value={banner.tituloAcento} onChange={(v) => set("banner", { tituloAcento: v })} />
          <Field label="Número destacado" value={banner.statNumber} onChange={(v) => set("banner", { statNumber: v })} />
          <TextAreaField
            label="Palabras que rotan (una por línea)"
            rows={4}
            value={banner.statWords.join("\n")}
            onChange={(v) => set("banner", { statWords: v.split("\n").map((s) => s.trim()).filter(Boolean) })}
          />
          <Field label="Texto del botón" value={banner.ctaText} onChange={(v) => set("banner", { ctaText: v })} />
        </Section>

        {/* TESTIMONIOS */}
        <Section title="Testimonios">
          <Field label="Título" value={testimonios.titulo} onChange={(v) => set("testimonios", { titulo: v })} />
          <TextAreaField label="Descripción" value={testimonios.descripcion} onChange={(v) => set("testimonios", { descripcion: v })} />
          <ListEditor
            items={testimonios.items}
            onChange={(items) => set("testimonios", { items })}
            minItems={1}
            newItem={() => ({ id: uid(), cita: "", autor: "", rol: "" })}
            addLabel="Agregar testimonio"
            renderItem={(item, update) => (
              <>
                <TextAreaField label="Cita" value={item.cita} onChange={(v) => update({ cita: v })} />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Autor" value={item.autor} onChange={(v) => update({ autor: v })} />
                  <Field label="Rol / empresa" value={item.rol} onChange={(v) => update({ rol: v })} />
                </div>
              </>
            )}
          />
        </Section>

        {/* CONTACTO */}
        <Section title="Sección de contacto">
          <Field label="Título" value={contacto.titulo} onChange={(v) => set("contacto", { titulo: v })} />
          <TextAreaField label="Descripción" value={contacto.descripcion} onChange={(v) => set("contacto", { descripcion: v })} />
        </Section>

        {/* FOOTER */}
        <Section title="Pie de página (Footer)">
          <TextAreaField label="Biografía corta" value={footer.bio} onChange={(v) => set("footer", { bio: v })} />
          <Field label="Ubicación" value={footer.ubicacion} onChange={(v) => set("footer", { ubicacion: v })} />
          <ImageFieldEditor label="Sello CIC" value={footer.cicImagen} onChange={(v) => set("footer", { cicImagen: v })} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Sello — línea 1" value={footer.cicBadgeLinea1} onChange={(v) => set("footer", { cicBadgeLinea1: v })} />
            <Field label="Sello — línea 2" value={footer.cicBadgeLinea2} onChange={(v) => set("footer", { cicBadgeLinea2: v })} />
          </div>
        </Section>
      </div>
    </div>
  );
}
