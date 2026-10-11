import { Column, Heading, Text } from "@once-ui-system/core";
import { StructuredData } from "@/components/seo/StructuredData";
import { notFoundSchemas } from "@/lib/pageSchemas";

export default function NotFound() {
  return (
    <div>
      <StructuredData data={notFoundSchemas()} />
      <Column as="section" fill center paddingBottom="160">
        <Text marginBottom="s" variant="display-strong-xl">
          404
        </Text>
        <Heading marginBottom="l" variant="display-default-xs">
          Page Not Found
        </Heading>
        <Text onBackground="neutral-weak">The page you are looking for does not exist.</Text>
      </Column>
    </div>
  );
}
