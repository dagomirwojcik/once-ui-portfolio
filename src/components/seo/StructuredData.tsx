import type { SchemaObject } from "@/lib/structuredData";

interface StructuredDataProps {
  data: SchemaObject | SchemaObject[];
}

function schemaKey(item: SchemaObject, index: number): string {
  if (typeof item["@id"] === "string") return item["@id"];
  if (typeof item["@type"] === "string") return `${item["@type"]}-${index}`;
  return `schema-${index}`;
}

export function StructuredData({ data }: StructuredDataProps) {
  const graphs = Array.isArray(data) ? data : [data];

  return (
    <>
      {graphs.map((item, index) => (
        <script
          key={schemaKey(item, index)}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
