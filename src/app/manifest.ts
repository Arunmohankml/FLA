import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Foreign Language Academy",
    short_name: "FLA",
    description:
      "Foreign Language Academy Chennai offers online, offline, and hybrid language courses with certification-focused training.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#F5FAFF",
    theme_color: "#0c2847",
    icons: [
      {
        src: "/brand/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/brand/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
