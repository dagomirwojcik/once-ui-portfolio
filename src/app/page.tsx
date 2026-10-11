import {
  Heading,
  Flex,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  LetterFx,
  Pulse,
} from "@once-ui-system/core";
import { StructuredData } from "@/components/seo/StructuredData";
import { homePageSchemas } from "@/lib/pageSchemas";
import { home, about, person, newsletter, baseURL } from "@/resources";
import { Mailchimp, LatestItems, FaviconQuoteCard } from "@/components";
import { RunningWorkoutsPanel } from "@/components/RunningWorkoutsPanel";
import { CertificationsCloud } from "@/components/CertificationsCloud";
import homeStyles from "./Home.module.scss";
import { getPosts } from "@/app/utils/utils";
import { getLatestGalleryAlbum } from "@/data/galleryData";

export default function Home() {
  const posts = getPosts(["src", "app", "blog", "posts"]);
  const projects = getPosts(["src", "app", "work", "projects"]);
  const latestBlog =
    posts.length > 0
      ? posts.sort(
          (a, b) =>
            new Date(b.metadata.publishedAt).getTime() -
            new Date(a.metadata.publishedAt).getTime(),
        )[0]
      : null;

  const latestProject =
    projects.length > 0
      ? projects.sort(
          (a, b) =>
            new Date(b.metadata.publishedAt).getTime() -
            new Date(a.metadata.publishedAt).getTime(),
        )[0]
      : null;

  const latestGallery = getLatestGalleryAlbum();

  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      <StructuredData data={homePageSchemas()} />

      <Column fillWidth paddingY="24" gap="m">
        <RevealFx
          speed="fast"
          fillWidth
          horizontal="start"
          paddingTop="16"
          paddingBottom="32"
          paddingLeft="12"
        >
          {home.featured && (
            <Badge
              background="brand-alpha-weak"
              paddingX="12"
              paddingY="4"
              onBackground="neutral-strong"
              textVariant="label-default-s"
              arrow={false}
              href={home.featured.href}
            >
              <Row paddingY="2" gap="4" vertical="center">
                <Pulse />
                {home.featured.title}
              </Row>
            </Badge>
          )}
        </RevealFx>
        <RevealFx speed="fast" translateY="4" fillWidth horizontal="start" paddingBottom="16">
          <Heading wrap="balance" variant="display-strong-l">
            <RevealFx speed="slow">{home.headline}</RevealFx>
          </Heading>
        </RevealFx>
        <RevealFx
          speed="fast"
          translateY="8"
          delay={0.2}
          fillWidth
          horizontal="start"
          paddingBottom="32"
        >
          <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
            <LetterFx speed="medium" trigger="instant" charset={[..."X$@aHz0y#?*01+"]}>
              {home.subline}
            </LetterFx>
          </Text>
        </RevealFx>
        <RevealFx speed="fast" paddingTop="12" delay={0.4} horizontal="start" paddingLeft="12">
          <Button
            id="about"
            data-border="rounded"
            href={about.path}
            variant="secondary"
            size="m"
            weight="default"
            arrowIcon
          >
            <Flex gap="8" vertical="center" paddingRight="4">
              {about.avatar.display && (
                <Avatar
                  marginRight="8"
                  style={{ marginLeft: "-0.75rem" }}
                  src={person.avatar}
                  size="m"
                />
              )}
              {about.title}
            </Flex>
          </Button>
        </RevealFx>
      </Column>

      <div className={homeStyles.quoteAndCountdown}>
        <FaviconQuoteCard
          faviconSrc="/favicon.ico"
          faviconAlt="Favicon"
          faviconWidth={16}
          faviconHeight={16}
          quote="'There's nothing to be gained from underestimating ourselves...'"
          author={{
            name: "Dagomir (2022)",
            avatar: "/images/avatar.jpg",
          }}
          link={{
            href: "https://www.linkedin.com/in/dagomir-wojcik",
            label: "LinkedIn",
          }}
          subline="We all have our own strengths."
          disableHover
        />

        <div className={homeStyles.countdownPair}>
          <CertificationsCloud disableHover />
          <RunningWorkoutsPanel title={home.stats.runningTitle} disableHover />
        </div>
      </div>

      {(latestProject || latestBlog || latestGallery) && (
        <RevealFx speed="fast" translateY="4" delay={0.8} fillWidth horizontal="center">
          <LatestItems
            latestProject={latestProject}
            latestBlog={latestBlog}
            latestGallery={latestGallery}
          />
        </RevealFx>
      )}

      {newsletter.display && (
        <RevealFx speed="fast" translateY="4" delay={1.0} fillWidth horizontal="center">
          <Mailchimp newsletter={newsletter} />
        </RevealFx>
      )}
    </Column>
  );
}
