import { createFileRoute } from "@tanstack/react-router";

import { TempleScene } from "@/components/3d/TempleScene";
import { Countdown } from "@/components/Countdown";
import { Engagement } from "@/components/Engagement";
import { FinalCTA } from "@/components/FinalCTA";
import { Hero } from "@/components/Hero";
import { LoveStory } from "@/components/LoveStory";
import { MemoryGallery } from "@/components/MemoryGallery";
import { Navbar } from "@/components/Navbar";

const title = "Sreekarrthikeyan & prashantini — Two Hearts, One Beautiful Journey";
const description =
  "A cinematic temple engagement invitation: our love story, memories, the ring, and a countdown to forever.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <TempleScene />
      <Navbar />
      <Hero />
      <LoveStory />
      <Engagement />
      <MemoryGallery />
      <Countdown />
      <FinalCTA />
    </main>
  );
}
