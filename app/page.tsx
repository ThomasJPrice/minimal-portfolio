import NowPlaying from "@/components/NowPlaying";
import StatsThisYear from "@/components/StatsThisYear";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section>
        <h1>hi, i'm thomas</h1>
        <p>I'm an aspiring Software Engineer with a strong passion for building web applications with great user experiences.</p>
      </section>

      <NowPlaying />

      {/* summary */}
      <section className="mt-12">
        <h2>tl;dr</h2>

        <p>i love making things - mostly websites, but also a bit of everything tech.</p>
        <p>Music is a big part of my life, as well as lighting and sound design for theatre and live events, bringing emotion and impact in a technical way.</p>
        <p>basically, i'm into creating cool things that work well and (hopefully) look nice.</p>
      </section>

      {/* projects */}
      <section className="mt-12">
        <h2>Projects</h2>
        <ul>
          <li>
            (25) <Link href='https://babyblueitconsulting.com/' target='_blank'>Baby Blue IT</Link> - IT consulting website
          </li>
          <li>
            (25) <Link href='https://5secondsong.tech/' target='_blank'>5 Second Song</Link> - fun little game where you guess the song in 5 seconds (mine)
          </li>
          <li>
            (24) <Link href='https://paapo.co.uk/' target='_blank'>Paapo</Link> - Financial stability + help website
          </li>
          <li>
            (24) <Link href='https://stampp.it/' target='_blank'>Stampp.it</Link> - Digital loyalty card saas (mine)
          </li>
          <li>
            (24) <Link href='https://perranbeachhouse.com/' target='_blank'>Perran Beach House</Link> - Booking system for a holiday home
          </li>
          <li>
            (23) <Link href='https://houseofhandsomebedford.co.uk/' target='_blank'>House of Handsome</Link> - Barbershop website
          </li>
          <li>
            (23) <Link href='https://song-squad.co.uk/' target='_blank'>Song Squad</Link> - Website for a performing arts club
          </li>
        </ul>
      </section>

      <StatsThisYear />

      {/* elsewhere */}
      <section className="mt-12">
        <h2>Elsewhere</h2>
        <ul>
          <li>
            <Link href='/lab'>/lab</Link> - Experiments, half-ideas and micro-projects
          </li>
          <li>
            <Link href='/now'>/now</Link> - What i'm currently working on
          </li>
          <li>
            <Link href='/vault'>/vault</Link> - design, dev tools and inspiration
          </li>
          <li>
            <Link href='/cv'>/cv</Link> - text cv
          </li>
          <li>
            <Link href='/blog'>/blog</Link> - occasional posts
          </li>
        </ul>
      </section>

    </main>
  );
}
