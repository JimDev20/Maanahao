import { createFileRoute } from "@tanstack/react-router";
import Hero from "../components/Hero";
import QuickStats from "../components/QuickStats";
import Announcements from "../components/Announcements";
import Services from "../components/Services";
import Officials from "../components/Officials";
import MapLocation from "../components/MapLocation";
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
      <Officials />
      <MapLocation />
      <EmergencyHotlines />
      <Contact />
    </>
  );
}
