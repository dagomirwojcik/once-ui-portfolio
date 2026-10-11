import { Column, Meta, WeatherFx } from "@once-ui-system/core";
import { StructuredData } from "@/components/seo/StructuredData";
import { changelogPageSchemas } from "@/lib/pageSchemas";
import { baseURL, person } from "@/resources";
import pageStyles from "./Changelog.module.scss";
import ChangelogTimeline from "./ChangelogTimeline";
import { changelogEntries } from "./data";

export async function generateMetadata() {
  return Meta.generate({
    title: `${person.name} » Changelog`,
    description: "Recent updates and changes to the portfolio",
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent("Changelog")}&description=${encodeURIComponent("Recent updates and changes")}&type=page`,
    path: "/changelog",
  });
}

export default async function ChangelogPage() {
  return (
    <>
      <WeatherFx
        fill
        height={20}
        type="leaves"
        colors={["warning-solid-strong", "danger-solid-strong"]}
        intensity={40}
        speed={0.7}
        duration={3}
        className={pageStyles.changelogWeather}
      />
      <Column
        maxWidth="m"
        gap="xl"
        className={pageStyles.changelogRoot}
        style={{ position: "relative", zIndex: 1 }}
      >
        <StructuredData data={changelogPageSchemas(changelogEntries)} />
        <ChangelogTimeline entries={changelogEntries} />
      </Column>
    </>
  );
}
