import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/auth";
import { getContent } from "@/lib/content";
import ContentEditor from "@/components/admin/ContentEditor";

export const metadata: Metadata = {
  title: "Editar contenido — Panel",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function ContenidoPage() {
  if (!(await isAuthed())) redirect("/admin/login");

  const content = await getContent();

  return (
    <main className="min-h-screen bg-navy text-ivory">
      <div className="px-5 py-6 md:px-8 md:py-8">
        <ContentEditor initialContent={content} />
      </div>
    </main>
  );
}
