import type { SVGProps } from "react";

/**
 * Inline SVG icon set.
 *
 * Replaces the Material Symbols icon font used by the Stitch export so the
 * app has no icon-font network dependency. All glyphs are drawn on a 24x24
 * grid with a consistent 1.6px stroke so they sit evenly next to the
 * Geist / Geist Mono type system.
 */
export type IconName =
  | "alternate_email"
  | "architecture"
  | "arrow_forward"
  | "arrow_outward"
  | "auto_stories"
  | "badge"
  | "balance"
  | "bolt"
  | "calendar_today"
  | "check"
  | "check_circle"
  | "cloud_sync"
  | "code_blocks"
  | "commit"
  | "content_copy"
  | "cottage"
  | "devices"
  | "dark_mode"
  | "download"
  | "edit_note"
  | "expand_more"
  | "hub"
  | "location_on"
  | "light_mode"
  | "mail"
  | "mark_email_unread"
  | "memory"
  | "model_training"
  | "person"
  | "psychology"
  | "psychology_alt"
  | "refresh"
  | "robot_2"
  | "rocket_launch"
  | "schedule"
  | "school"
  | "security"
  | "send"
  | "shield"
  | "shield_person"
  | "smart_toy"
  | "speed"
  | "tag"
  | "terminal"
  | "verified"
  | "verified_user"
  | "videocam";

const PATHS: Record<IconName, string> = {
  alternate_email:
    "M3.5 6.5h17v11h-17zM3.8 7.2l8.2 5.9 8.2-5.9",
  architecture:
    "M4 4.5h16v15h-16zM4 9h16M9 9v10.5M12.5 13h5M12.5 16h5",
  arrow_forward: "M4 12h14M12.5 6l6 6-6 6",
  arrow_outward: "M7.5 16.5 16.5 7.5M9.5 7.5h7v7",
  auto_stories:
    "M4 5.5h5.5a2.5 2.5 0 0 1 2.5 2.5v11a2.5 2.5 0 0 0-2.5-2.5H4zM20 5.5h-5.5A2.5 2.5 0 0 0 12 8v11a2.5 2.5 0 0 1 2.5-2.5H20z",
  badge: "M12 12m-5 0a5 5 0 1 0 10 0a5 5 0 1 0-10 0M9 16.3 7.4 21l4.6-2.3L16.6 21 15 16.3",
  balance:
    "M12 5v15M7.5 20h9M4 8h16M4 8 1.8 13.2h4.4zM20 8l-2.2 5.2h4.4z",
  bolt: "M13.5 3 6 13.5h5L10.5 21 18 10.5h-5z",
  calendar_today:
    "M4.5 6.5h15v13h-15zM4.5 10.5h15M8.5 4v4M15.5 4v4M8 14h2M14 14h2",
  check: "M5 12.5l5 5L19 7",
  check_circle:
    "M12 12m-8.5 0a8.5 8.5 0 1 0 17 0a8.5 8.5 0 1 0-17 0M8 12.2l2.8 2.8L16 9.5",
  cloud_sync:
    "M7 18.5a4 4 0 0 1-.4-8 5.5 5.5 0 0 1 10.4-1.2 3.9 3.9 0 0 1 .6 9.2M9.8 15.5l1.7 1.7 1.7-1.7M14.2 12.5l-1.7-1.7-1.7 1.7",
  code_blocks: "M7.5 7 4 12l3.5 5M16.5 7 20 12l-3.5 5M13.8 4.5l-3.6 15",
  commit: "M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0M2.5 12h6.5M15 12h6.5",
  content_copy: "M9 9h10v11H9zM15 9V4.5H5V15h4",
  cottage: "M3.5 11.2 12 4.5l8.5 6.7M6 9.7V19.5h12V9.7M10.5 19.5v-5h3v5",
  devices: "M3.5 5.5h12v9h-12zM6 17.5h7M16 9.5h4.5v9H16zM18.25 16.5h.01",
  dark_mode: "M20.5 14.8A8.8 8.8 0 0 1 9.2 3.5a8.8 8.8 0 1 0 11.3 11.3z",
  download: "M12 4v10M8 10.5l4 4 4-4M4.5 19.5h15",
  edit_note:
    "M4.5 19.5l.8-3.2L15 6.6a1.6 1.6 0 0 1 2.3 0l.6.6a1.6 1.6 0 0 1 0 2.3l-9.7 9.7-3.3.3zM13.8 7.8l2.4 2.4",
  expand_more: "M6 9.5l6 6 6-6",
  hub: "M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0M12 9V4.5M14.6 10.4 18 8.6M14.6 13.6 18 15.4",
  location_on:
    "M12 21c4-4.6 6-7.6 6-10a6 6 0 1 0-12 0c0 2.4 2 5.4 6 10zM12 13.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  light_mode:
    "M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4",
  mail: "M3.5 6h17v12h-17zM3.8 6.6l8.2 5.9 8.2-5.9",
  mark_email_unread:
    "M3.5 17.5h12v3.5h-12zM3.5 17.5 5 6.5h14l-1.5 11M3.5 8.5h17M18.5 5h.01",
  memory:
    "M8 8h8v8H8zM9.5 4.5v3M14.5 4.5v3M9.5 16.5v3M14.5 16.5v3M4.5 9.5h3M4.5 14.5h3M16.5 9.5h3M16.5 14.5h3",
  model_training:
    "M6.5 7.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM14 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18.5 7.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM6.5 16.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM14 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM18.5 16.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7.4 9.3l3.4 3.4M16.6 9.3l-3.4 3.4M7.4 16.3l3.4-3.2M16.6 16.3l-3.4-3.2",
  person:
    "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM5 20a7 7 0 0 1 14 0",
  psychology:
    "M13 4a7.5 7.5 0 0 0-7 9.8l-1.5 3.7h5.5v2a2 2 0 0 0 2 2H14v-3.5M17.5 6.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z",
  psychology_alt:
    "M13 4a7 7 0 0 0-6.5 9.6L5 17h5v2.5a2 2 0 0 0 2 2H14v-3M16.5 4.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z",
  refresh:
    "M20 12a8 8 0 1 1-2.4-5.7M20 4v4.5h-4.5",
  robot_2:
    "M6.5 11.5h11a1.5 1.5 0 0 1 1.5 1.5v4a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 17v-4a1.5 1.5 0 0 1 1.5-1.5zM12 11.5V7M12 5.5h.01M9.5 15h.01M14.5 15h.01M10.5 17.5h3M3.5 14v2M20.5 14v2",
  rocket_launch:
    "M12 3c3 1.5 5 4.5 5 8v3H7v-3c0-3.5 2-6.5 5-8zM7 14l-2.5 2.5V19H7M17 14l2.5 2.5V19H17M12 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM10 18l2 3 2-3",
  schedule:
    "M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0-16 0M12 7.5V12l3 2",
  school:
    "M12 4 2.5 9 12 14l9.5-5zM6.5 11v4.5c0 1.5 2.5 2.5 5.5 2.5s5.5-1 5.5-2.5V11M21 9.5V15",
  security:
    "M12 3l7 3v5.5c0 4.4-3 8.2-7 9.5-4-1.3-7-5.1-7-9.5V6zM9 12l2 2 4-4",
  send: "M21 3.5 2.5 10.5l7.5 3 3 7.5zM21 3.5 10 13.5",
  shield:
    "M12 3l7 3v5.5c0 4.4-3 8.2-7 9.5-4-1.3-7-5.1-7-9.5V6z",
  shield_person:
    "M12 3l7 3v5.5c0 4.4-3 8.2-7 9.5-4-1.3-7-5.1-7-9.5V6zM12 8.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM9 15.5a3.2 3.2 0 0 1 6 0",
  smart_toy:
    "M5.5 10.5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2zM12 8.5V5.5M9 13.5h.01M15 13.5h.01M10 16.5h4M3 12.5v3M21 12.5v3",
  speed: "M4 17a8 8 0 1 1 16 0M12 17l4-5.5M12 17h.01",
  tag: "M11.5 3.5h9v9L13 20 3.5 10.5zM16.5 8h.01",
  terminal: "M4 5.5h16v13H4zM7.5 10l2.5 2-2.5 2M12.5 14.5h4",
  verified:
    "M12 12m-5 0a5 5 0 1 0 10 0a5 5 0 1 0-10 0M9.8 12.2l1.6 1.6 2.8-3M9 16.3 7.4 21l4.6-2.3L16.6 21 15 16.3",
  verified_user:
    "M9.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 19.5a6.5 6.5 0 0 1 13 0M14.5 18.5l2 2 4-4.5",
  videocam: "M3.5 7.5h9v9h-9zM12.5 11l5-3v8l-5-3",
};

type IconProps = Omit<SVGProps<SVGSVGElement>, "name"> & {
  name: IconName;
  /** Rendered font size. Icons scale to the current font size by default. */
  size?: number;
};

export function Icon({ name, size = 20, className, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      {...props}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
