import { Flex, IconButton, SmartLink, Text } from "@once-ui-system/core";
import type { IconName } from "@once-ui-system/core";
import { person, social } from "@/resources";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Flex
      as="footer"
      fillWidth
      direction="row"
      paddingY="8"
      paddingX="16"
      horizontal="center"
      vertical="center"
      className={styles.footerContainer}
    >
      <Text variant="body-default-s" onBackground="neutral-strong" className={styles.copyrightText}>
        <Text onBackground="neutral-weak">© {currentYear} /</Text>
        <Text paddingX="4">{person.name}</Text>
        <Text onBackground="neutral-weak">
          {/* Usage of this template requires attribution. Please don't remove the link to Once UI. */}
          / Build your portfolio with{" "}
          <SmartLink
            href="https://once-ui.com/products/magic-portfolio"
          >
            Once UI
          </SmartLink>
        </Text>
      </Text>
      <Flex gap="16" className={styles.socialIcons}>
        {social.map(
          (item) =>
            item.link && (
              <IconButton
                key={item.name}
                href={item.link}
                icon={item.icon as IconName}
                tooltip={item.name}
                size="s"
                variant="ghost"
              />
            ),
        )}
      </Flex>
    </Flex>
  );
};
