import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Reubin | RSS for the future",
    short_name: "Reubin",
    description: "Reubin is a RSS reader for the future",
    start_url: "/",
  };
}
