import {
  Avatar,
  Button,
  Column,
  Flex,
  Heading,
  Icon,
  IconButton,
  Media,
  Tag,
  Text,
  Meta,
  Line,
} from "@once-ui-system/core";
import type { IconName } from "@once-ui-system/core";
import { StructuredData } from "@/components/seo/StructuredData";
import { aboutPageSchemas } from "@/lib/pageSchemas";
import { baseURL, about, person, social } from "@/resources";
import TableOfContents from "@/components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";
import React, { Suspense } from "react";
import TickerVertical from "@/components/about/TickerVertical";
import CVDownloadBanner from "@/components/about/CVDownloadBanner";
import { StudiesNextStepModal } from "@/components/about/StudiesNextStepModal";
import { FoldingAtHomeStatsBox } from "@/components/about/FoldingAtHomeStatsBox";

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}&description=${encodeURIComponent(about.description)}&type=about`,
    path: about.path,
  });
}

export default function About() {
  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => ({
        label: experience.tocLabel ?? experience.company,
        id: experience.id ?? experience.company,
      })),
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => ({
        label: institution.tocLabel ?? institution.name,
        id: institution.id ?? institution.name,
      })),
    },
    {
      title: about.volunteering.title,
      display: about.volunteering.display,
      items: about.volunteering.experiences.map((experience) => experience.organization),
    },
  ];
  // Get today's date in DD/MM/YYYY format
  const today = new Date();
  const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth()+1).toString().padStart(2, '0')}/${today.getFullYear()}`;
  return (
    <Column maxWidth="m">
      <StructuredData data={aboutPageSchemas()} />
      <Suspense fallback={null}>
        <StudiesNextStepModal />
      </Suspense>
      {about.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          className={styles.tableOfContents}
        >
          <TableOfContents structure={structure} about={about} />
        </Column>
      )}
      <Flex fillWidth direction="row" horizontal="center" gap="xl" className={styles.mainContainer}>
        {about.avatar.display && (
          <Column
            className={styles.avatar}
            position="sticky"
            minWidth="160"
            paddingX="l"
            paddingBottom="xl"
            gap="m"
            flex={3}
            horizontal="center"
          >
            <Avatar src={person.avatar} size="xl" />
            <Flex gap="8" vertical="center">
              <Icon onBackground="accent-weak" name="globe" />
              {person.location}
            </Flex>
            {person.languages.length > 0 && (
              <Flex wrap gap="8">
                {person.languages.map((language, index) => (
                  <Tag
                    key={language}
                    size="l"
                    style={{
                      borderRadius: 'var(--radius-s)',
                      border: '2px solid var(--glass-tag-border)',
                      background: 'var(--glass-tag-bg)',
                      backdropFilter: 'var(--glass-backdrop)',
                      WebkitBackdropFilter: 'var(--glass-backdrop)',
                      zIndex: 'var(--glass-z-index)'
                    }}
                  >
                    {language}
                  </Tag>
                ))}
              </Flex>
            )}
          </Column>
        )}
        <Column className={styles.blockAlign} flex={9} maxWidth={40}>
          <Heading className={`${styles.textAlign} ${styles.mobileNameSpacing}`} variant="display-strong-xl">
            {person.name}
          </Heading>
          <Text
            className={`${styles.textAlign} ${styles.mobileTitleSpacing}`}
            variant="display-default-xs"
            onBackground="neutral-weak"
          >
            {person.role}
          </Text>
          {/* Banner for CV download + social links */}
          <Column fillWidth gap="8">
            <CVDownloadBanner />
            {social.length > 0 && (
            <Column fillWidth paddingTop="12" paddingBottom="8" gap="8">
              <Flex className={styles.desktopSocialRow} gap="8" wrap horizontal="center" fitWidth data-border="rounded">
                {shuffle([...social]).map(
                  (item) =>
                    item.link && (
                      <Button
                        key={item.name}
                        href={item.link}
                        prefixIcon={item.icon as IconName}
                        label={item.name}
                        size="s"
                        weight="default"
                        variant="secondary"
                        style={{
                          borderRadius: 'var(--radius-s)',
                          border: '2px solid var(--glass-button-border)',
                          background: 'var(--glass-button-bg)',
                          backdropFilter: 'var(--glass-backdrop)',
                          WebkitBackdropFilter: 'var(--glass-backdrop)',
                          color: 'var(--glass-button-text)',
                          zIndex: 'var(--glass-z-index)'
                        }}
                      />
                    ),
                )}
              </Flex>
              <Flex className={styles.mobileSocialRow} gap="8" wrap horizontal="center" fitWidth data-border="rounded">
                {shuffle([...social]).map(
                  (item) =>
                    item.link && (
                      <IconButton
                        size="l"
                        key={`${item.name}-icon`}
                        href={item.link}
                        icon={item.icon as IconName}
                        variant="secondary"
                        style={{
                          borderRadius: 'var(--radius-s)',
                          border: '2px solid var(--glass-button-border)',
                          background: 'var(--glass-button-bg)',
                          backdropFilter: 'var(--glass-backdrop)',
                          WebkitBackdropFilter: 'var(--glass-backdrop)',
                          color: 'var(--glass-button-text)',
                          zIndex: 'var(--glass-z-index)'
                        }}
                      />
                    ),
                )}
              </Flex>
            </Column>
            )}
          </Column>

          {about.intro.display && (
            <Column className={styles.mobileIntroSpacing} textVariant="body-default-l" fillWidth gap="m" marginBottom="xl" style={{ textAlign: 'left' }}>
              {about.intro.description}
            </Column>
          )}

          {about.work.display && (
            <>
              <Heading as="h2" id={about.work.title} variant="display-strong-s" marginBottom="m">
                {about.work.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.work.experiences.map((experience, index) => (
                  <React.Fragment key={experience.id ?? `${experience.company}-${experience.role}-${index}`}>
                    <Column fillWidth>
                      <Flex fillWidth horizontal="between" vertical="end" marginBottom="4">
                        <Flex vertical="center" gap="12">
                          {experience.logo && (
                            <Avatar
                              src={experience.logo}
                              size="l"
                            />
                          )}
                          <Column>
                            <Text id={experience.id ?? experience.company} variant="heading-strong-l" style={{ marginBottom: 0 }}>
                              {experience.company}
                            </Text>
                            <Text variant="body-default-s" onBackground="brand-weak" style={{ marginBottom: 0 }}>
                              {experience.role}
                            </Text>
                          </Column>
                        </Flex>
                        <Text variant="heading-default-xs" onBackground="neutral-weak">
                          {experience.timeframe}
                        </Text>
                      </Flex>
                      <Column as="ul" gap="16">
                        {experience.achievements.map((achievement: string, index: number) => (
                          <Text
                            as="li"
                            variant="body-default-m"
                            key={`${experience.id ?? experience.company}-${index}`}
                          >
                            {achievement}
                          </Text>
                        ))}
                      </Column>
                      {experience.skills && experience.skills.length > 0 && (
                        <Flex gap="8" paddingTop="8" wrap horizontal="center">
                          {experience.skills.map((skill, idx) => (
                            <Tag key={skill + idx} size="m" style={{
                              borderRadius: 'var(--radius-s)',
                              border: '2px solid var(--glass-tag-border)',
                              background: 'var(--glass-tag-bg)',
                              backdropFilter: 'var(--glass-backdrop)',
                              WebkitBackdropFilter: 'var(--glass-backdrop)',
                              zIndex: 'var(--glass-z-index)'
                            }}>{skill}</Tag>
                          ))}
                        </Flex>
                      )}
                      {experience.images.length > 0 && (
                        <Flex fillWidth paddingTop="m" paddingLeft="40" gap="12" wrap className={styles.experienceImagesRow}>
                          {experience.images.map((image, index) => (
                            <Flex
                              key={index}
                              border="neutral-medium"
                              radius="m"
                              className={styles.experienceImageWrapper}
                              //@ts-ignore
                              minWidth={image.width}
                              //@ts-ignore
                              height={image.height}
                            >
                              <Media
                                enlarge
                                radius="m"
                                className={styles.experienceImage}
                                //@ts-ignore
                                sizes={image.width.toString()}
                                //@ts-ignore
                                alt={image.alt}
                                //@ts-ignore
                                src={image.src}
                              />
                            </Flex>
                          ))}
                        </Flex>
                      )}
                    </Column>
                    {/* Add a Line between companies, except after the last one */}
                    {index < about.work.experiences.length - 1 && <Line marginY="s" />}
                  </React.Fragment>
                ))}
              </Column>
              <div style={{height: 40}} />
            </>
          )}

          {about.studies.display && (
            <>
              <Heading as="h2" id={about.studies.title} variant="display-strong-s" marginBottom="m">
                {about.studies.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.studies.institutions.map((institution, index) => (
                  <React.Fragment key={institution.id ?? `${institution.name}-${index}`}>
                    <Column fillWidth>
                      <Flex fillWidth horizontal="between" vertical="end" marginBottom="4">
                        <Flex vertical="center" gap="12">
                          {institution.logo && (
                            <Avatar
                              src={institution.logo}
                              size="l"
                            />
                          )}
                          <Column>
                            <Text id={institution.id ?? institution.name} variant="heading-strong-l" style={{ marginBottom: 0 }}>
                              {institution.name}
                            </Text>
                            <Text variant="body-default-s" onBackground="brand-weak" style={{ marginBottom: 0 }}>
                              {institution.description}
                            </Text>
                          </Column>
                        </Flex>
                        {institution.timeframe && (
                          <Text variant="heading-default-xs" onBackground="neutral-weak">
                            {institution.timeframe}
                          </Text>
                        )}
                      </Flex>
                      {/* Place Ticker for modules above achievements */}
                      {institution.modules && institution.modules.length > 0 && (
                        <div
                          className={styles.tickerBox}
                          style={{
                            borderRadius: '10px',
                            background: 'transparent',
                            display: 'flex',
                            gap: '1em',
                            padding: '0.5em 0.75em',
                            marginBottom: '1.2em',
                            justifyContent: 'center',
                          }}
                        >
                          <TickerVertical items={shuffle(institution.modules)} visibleCount={3} direction="up" itemAlign="center" />
                        </div>
                      )}
                      {institution.name === "USP College - Palmer's Campus " && (
                        <div
                          className={styles.tickerBox}
                          style={{
                            borderRadius: '10px',
                            background: 'transparent',
                            display: 'flex',
                            gap: '1em',
                            padding: '0.5em 0.75em',
                            marginTop: '0',
                            marginBottom: '1.2em',
                            justifyContent: 'center',
                          }}
                        >
                          <TickerVertical
                            items={shuffle([
                              "Creating Systems to Manage Information",
                              "Using Social Media in Business",
                              "Programming",
                              "Data Modelling",
                              "Website Development",
                              "Computer Games Development",
                              "IT Project Management",
                              "Cyber Security and Incident Management",
                              "Software Testing",
                              "IT Service Delivery",
                              "Digital Animation and Effects."
                            ])}
                            visibleCount={3}
                            direction="up"
                            itemAlign="center"
                          />
                        </div>
                      )}
                      {/* Achievements list follows below */}
                      {institution.achievements && institution.achievements.length > 0 && (
                        <Column as="ul" gap="16">
                          {institution.achievements.map((achievement: string, idx: number) => (
                            <Text
                              as="li"
                              variant="body-default-m"
                              key={`${institution.name}-achievement-${idx}`}
                            >
                              {achievement}
                            </Text>
                          ))}
                        </Column>
                      )}
                      {institution.images && institution.images.length > 0 && (
                        <Flex fillWidth paddingTop="m" paddingLeft="40" gap="12" wrap>
                          {institution.images.map((image, idx) => (
                            <Flex
                              key={idx}
                              border="neutral-medium"
                              radius="m"
                              //@ts-ignore
                              minWidth={image.width}
                              //@ts-ignore
                              height={image.height}
                            >
                              <Media
                                enlarge
                                radius="m"
                                //@ts-ignore
                                sizes={image.width.toString()}
                                //@ts-ignore
                                alt={image.alt}
                                //@ts-ignore
                                src={image.src}
                              />
                            </Flex>
                          ))}
                        </Flex>
                      )}
                    </Column>
                    {/* Add a Line between institutions, except after the last one */}
                    {index < about.studies.institutions.length - 1 && <Line marginY="xs" />}
                  </React.Fragment>
                ))}
              </Column>
              <div style={{height: 40}} />
            </>
          )}

          {about.volunteering.display && (
            <>
              <Heading as="h2" id={about.volunteering.title} variant="display-strong-s" marginBottom="m">
                {about.volunteering.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.volunteering.experiences.map((experience, index) => (
                  <React.Fragment key={`${experience.organization}-${experience.role}-${index}`}>
                    <Column fillWidth>
                      <Flex fillWidth horizontal="between" vertical="end" marginBottom="4">
                        <Flex vertical="center" gap="12">
                          {experience.logo && (
                            <Avatar
                              src={experience.logo}
                              size="l"
                            />
                          )}
                          <Column>
                            <Text id={experience.organization} variant="heading-strong-l" style={{ marginBottom: 0 }}>
                              {experience.organization}
                            </Text>
                            <Text variant="body-default-s" onBackground="brand-weak" style={{ marginBottom: 0 }}>
                              {experience.role}
                            </Text>
                          </Column>
                        </Flex>
                        <Text variant="heading-default-xs" onBackground="neutral-weak">
                          {experience.timeframe}
                        </Text>
                      </Flex>
                      {experience.statsBox && experience.statsBox.source === "foldingathome" ? (
                        <FoldingAtHomeStatsBox
                          fallbackContent={experience.statsBox.content}
                          showUpdated={experience.statsBox.showUpdated}
                        />
                      ) : experience.statsBox ? (
                        <div
                          className={experience.statsBox.foldingStyle ? styles.foldingBox : undefined}
                          style={{
                            borderRadius: '10px',
                            padding: '0.5em 0.75em',
                            marginTop: '0.3em',
                            marginBottom: '1em',
                            fontSize: '1rem',
                            lineHeight: '1.7',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <div>{experience.statsBox.content}</div>
                          {experience.statsBox.showUpdated && (
                            <div>{`Updated: ${formattedDate}`}</div>
                          )}
                        </div>
                      ) : null}
                      <Column as="ul" gap="16">
                        {experience.achievements.map((achievement: string, index: number) => (
                          <Text
                            as="li"
                            variant="body-default-m"
                            key={`${experience.organization}-${index}`}
                          >
                            {achievement}
                          </Text>
                        ))}
                      </Column>
                      {experience.images.length > 0 && (
                        <Flex fillWidth paddingTop="m" paddingLeft="40" gap="12" wrap>
                          {experience.images.map((image, index) => (
                            <Flex
                              key={index}
                              border="neutral-medium"
                              radius="m"
                              //@ts-ignore
                              minWidth={image.width}
                              //@ts-ignore
                              height={image.height}
                            >
                              <Media
                                enlarge
                                radius="m"
                                //@ts-ignore
                                sizes={image.width.toString()}
                                //@ts-ignore
                                alt={image.alt}
                                //@ts-ignore
                                src={image.src}
                              />
                            </Flex>
                          ))}
                        </Flex>
                      )}
                    </Column>
                    {/* Add a Line between experiences, except after the last one */}
                    {index < about.volunteering.experiences.length - 1 && <Line marginY="xs" />}
                  </React.Fragment>
                ))}
              </Column>
            </>
          )}
        </Column>
      </Flex>
    </Column>
  );
}
