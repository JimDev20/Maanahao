import { createFileRoute } from "@tanstack/react-router";
import Hero from "../components/Hero";
import QuickStats from "../components/QuickStats";
import Announcements from "../components/Announcements";
import Services from "../components/Services";
import Gallery from "../components/Gallery";
import Projects from "../components/Projects";
import Officials from "../components/Officials";
import MapLocation from "../components/MapLocation";
import FAQ from "../components/FAQ";
import EmergencyHotlines from "../components/EmergencyHotlines";
import Contact from "../components/Contact";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  return (
    <>
      <Hero />
      <QuickStats />
      <Announcements />
      <Services />
      <Gallery />
      <Projects />
      <Officials />
      <MapLocation />
      <FAQ />
      <EmergencyHotlines />
      <Contact />
    </>
  );
}
