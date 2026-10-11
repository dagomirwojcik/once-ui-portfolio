"use client";

import {
  Background,
  type Opacity,
  type SpacingToken,
} from "@once-ui-system/core";
import { effects } from "../resources";

export function PageBackground() {
  return (
    <Background
      position="fixed"
      mask={{
        x: effects.mask.x,
        y: effects.mask.y,
        radius: effects.mask.radius,
        cursor: effects.mask.cursor,
      }}
      gradient={{
        display: effects.gradient.display,
        opacity: effects.gradient.opacity as Opacity,
        x: effects.gradient.x,
        y: effects.gradient.y,
        width: effects.gradient.width,
        height: effects.gradient.height,
        tilt: effects.gradient.tilt,
        colorStart: effects.gradient.colorStart,
        colorEnd: effects.gradient.colorEnd,
      }}
      dots={{
        display: effects.dots.display,
        opacity: effects.dots.opacity as Opacity,
        size: effects.dots.size as SpacingToken,
        color: effects.dots.color,
      }}
      grid={{
        display: effects.grid.display,
        opacity: effects.grid.opacity as Opacity,
        color: effects.grid.color,
        width: effects.grid.width,
        height: effects.grid.height,
      }}
      lines={{
        display: effects.lines.display,
        opacity: effects.lines.opacity as Opacity,
        size: effects.lines.size as SpacingToken,
        thickness: effects.lines.thickness,
        angle: effects.lines.angle,
        color: effects.lines.color,
      }}
    />
  );
}
