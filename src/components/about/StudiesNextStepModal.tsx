"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Dialog, Text, Column } from "@once-ui-system/core";
import { about } from "@/resources";

const QUERY_PARAM = "next-step";

export function StudiesNextStepModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get(QUERY_PARAM) !== "1") {
      return;
    }

    setIsOpen(true);

    const scrollToStudies = () => {
      document.getElementById(about.studies.title)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    const timeout = window.setTimeout(scrollToStudies, 100);
    return () => window.clearTimeout(timeout);
  }, [searchParams]);

  const handleClose = () => {
    setIsOpen(false);
    router.replace(about.path, { scroll: false });
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} title="The Next Step">
      <Column gap="m" paddingTop="8">
        <Text variant="body-default-m" onBackground="neutral-weak">
          From September 2026 I will be returning to Birmingham City University to study a
          Master&apos;s in Artificial Intelligence (2026–2027).
        </Text>
        <Text variant="body-default-s" onBackground="neutral-weak">
          More details about modules, focus areas, and next steps will be added to the Studies
          section on this page soon.
        </Text>
      </Column>
    </Dialog>
  );
}
