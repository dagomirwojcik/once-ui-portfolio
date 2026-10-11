import { Meta } from "@once-ui-system/core";
import { StructuredData } from "@/components/seo/StructuredData";
import { contactPageSchemas } from "@/lib/pageSchemas";
import { baseURL, contact } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: contact.title,
    description: contact.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(contact.title)}&description=${encodeURIComponent(contact.description)}&type=contact`,
    path: contact.path,
  });
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData data={contactPageSchemas()} />
      {children}
    </>
  );
}
