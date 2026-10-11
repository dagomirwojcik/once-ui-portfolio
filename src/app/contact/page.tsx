"use client";

import { contact } from "@/resources/content";
import { Column, Text, Heading } from "@once-ui-system/core";
import ContactForm from "./ContactForm";

export default function ContactPage() {
  return (
    <Column maxWidth="xl" gap="xl" horizontal="center">
      <div className={require("@/components/gallery/Gallery.module.scss").heroSection}>
        <Column gap="m" style={{ textAlign: "center", padding: "80px 24px" }}>
          <Heading as="h1" variant="heading-strong-xl" wrap="balance">
            {contact.headline}
          </Heading>
          <Text variant="body-default-l" onBackground="neutral-weak" wrap="balance">
            {contact.subline}
          </Text>
        </Column>
      </div>

      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <ContactForm />
      </div>
    </Column>
  );
}
