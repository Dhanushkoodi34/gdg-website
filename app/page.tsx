import Image from 'next/image'
import { GlassBackdrop, GlassAction } from '@/components/liquid-surface'
import { RegistrationForm } from '@/components/registration-form'

const agenda = [
  { time: '09:00', end: '09:45', title: 'Doors open & coffee', detail: 'Check in, meet your people, settle in.' },
  { time: '10:00', end: '11:30', title: 'Ideas on the main stage', detail: 'Fresh perspectives on AI, web, and the cloud.' },
  { time: '11:45', end: '14:30', title: 'Build something real', detail: 'Hands-on sessions with room to experiment.' },
  { time: '15:00', end: '17:00', title: 'Show, share & connect', detail: 'Demos, conversations, and what comes next.' },
]

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span className="brand-blue" /><span className="brand-red" /><span className="brand-yellow" /><span className="brand-green" />
    </span>
  )
}

export default function Home() {
  return (
    <main>
      <section id="top" className="hero relative isolate flex min-h-[100dvh] flex-col overflow-hidden bg-[#0a111a]">
        <Image src="/images/hero-conference.jpg" alt="Attendees listening together at a developer conference" fill loading="eager" fetchPriority="high" sizes="100vw" className="hero-image object-cover object-[60%_center]" />
        <div className="hero-shade pointer-events-none absolute inset-0" />
        <div className="hero-color pointer-events-none absolute inset-0" />

        <header className="relative z-[2] mx-auto flex w-full max-w-[1440px] items-center justify-between gap-5 px-5 py-5 sm:px-8 lg:px-12 lg:py-7">
          <a href="#top" className="flex min-w-0 items-center gap-3 rounded-md text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8ab4f8]" aria-label="Developer Day, back to top">
            <BrandMark />
            <span className="min-w-0 text-[15px] font-extrabold tracking-[-0.04em] sm:text-[17px]">developer<span className="font-medium text-white/80">day</span><span className="ml-2 hidden text-[11px] font-medium tracking-normal text-white/55 sm:inline">/ GDG COMMUNITY</span></span>
          </a>
          <nav aria-label="Main navigation" className="nav-glass hidden items-center gap-8 rounded-full px-7 py-3.5 text-[13px] font-semibold text-white/80 md:flex">
            <a href="#about" className="transition-opacity duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-[#8ab4f8]">The event</a>
            <a href="#agenda" className="transition-opacity duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-[#8ab4f8]">Agenda</a>
            <a href="#register" className="transition-opacity duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-[#8ab4f8]">Location & RSVP</a>
          </nav>
          <a href="#register" className="nav-register flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-[12px] font-bold text-white transition-opacity duration-200 hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8ab4f8] sm:px-5 sm:text-[13px]">Register now <span aria-hidden="true">↗</span></a>
        </header>

        <div className="relative z-[1] mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-5 pb-8 pt-12 sm:px-8 md:pb-24 lg:px-12 lg:pt-6">
          <div className="max-w-[850px] hero-copy">
            <div className="mb-7 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.21em] text-white/80 sm:text-[11px]">
              <span className="h-px w-7 bg-[#8ab4f8]" aria-hidden="true" />
              Developer Day 2026 · Coimbatore
            </div>
            <h1 className="max-w-[850px] text-[clamp(3.55rem,8vw,7.5rem)] font-extrabold leading-[0.99] tracking-[-0.075em] text-white">Build what&apos;s<br />next<span className="text-[#8ab4f8]">.</span></h1>
            <p className="mt-7 max-w-[510px] text-[15px] font-medium leading-[1.8] text-white/85 sm:text-[17px]">A day to explore bold ideas, build together, and find your people in tech.</p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <GlassAction href="#register"><span>Register now</span><span aria-hidden="true" className="text-[20px] leading-none">↗</span></GlassAction>
              <a href="#agenda" className="inline-flex items-center gap-2 rounded-md py-3 text-[13px] font-bold text-white/90 underline decoration-white/35 underline-offset-[7px] transition-opacity duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8ab4f8]">Explore the agenda <span aria-hidden="true">↘</span></a>
            </div>
          </div>

          <div className="hero-date-card relative mt-12 w-full max-w-[310px] overflow-hidden rounded-2xl border border-white/[0.16] bg-white/[0.05] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] sm:max-w-[345px] lg:absolute lg:right-12 lg:bottom-14 lg:mt-0 lg:p-6">
            <GlassBackdrop />
            <div className="relative z-[1]">
              <div className="flex gap-1.5" aria-hidden="true"><span className="h-1 w-7 rounded-full bg-[#4285f4]" /><span className="h-1 w-7 rounded-full bg-[#ea4335]" /><span className="h-1 w-7 rounded-full bg-[#fbbc04]" /><span className="h-1 w-7 rounded-full bg-[#34a853]" /></div>
              <div className="mt-5 flex items-end gap-4 border-b border-white/20 pb-5">
                <span className="text-[72px] font-extrabold leading-[0.82] tracking-[-0.09em] text-white lg:text-[82px]">12</span>
                <span className="pb-1 text-[15px] font-extrabold uppercase leading-tight tracking-[0.08em] text-white">Dec<br /><span className="text-[11px] font-medium tracking-[0.16em] text-white/70">Saturday · 2026</span></span>
              </div>
              <div className="mt-4 flex items-center justify-between gap-3 text-[12px] font-semibold text-white/90"><span>Coimbatore, Tamil Nadu</span><span className="text-white/55">In person ↗</span></div>
            </div>
          </div>
        </div>
        <div className="relative z-[1] hidden border-t border-white/15 bg-[#0a111a]/35 px-8 py-4 backdrop-blur-xl md:block lg:px-12">
          <div className="mx-auto flex max-w-[1344px] items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60"><span>For the curious. For the builders.</span><span>Scroll to explore ↓</span></div>
        </div>
      </section>

      <section id="about" className="relative overflow-hidden bg-[#0b111b] py-20 sm:py-24 lg:py-32">
        <div className="section-ambient pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-[1344px] px-5 sm:px-8 lg:px-12">
          <div className="grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-12 lg:gap-24">
            <div>
              <h2 className="max-w-[590px] text-[clamp(2.7rem,5vw,5.3rem)] font-extrabold leading-[1.06] tracking-[-0.065em] text-white">Made for the <span className="text-[#8ab4f8]">makers.</span></h2>
              <p className="mt-7 max-w-[480px] text-[15px] font-medium leading-[1.9] text-[#b9c4d3] sm:text-[17px]">Whether you&apos;re shipping your first project or shaping what&apos;s next, this is your space to learn, make, and connect.</p>
              <a href="#agenda" className="mt-8 inline-flex items-center gap-3 rounded-md py-2 text-[13px] font-bold text-white underline decoration-white/40 underline-offset-[7px] transition-opacity duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8ab4f8]">See how the day unfolds <span aria-hidden="true">↗</span></a>
            </div>
            <div className="relative min-h-[360px] overflow-hidden rounded-[24px] border border-white/10 sm:min-h-[470px]">
              <Image src="/images/stage-conference.jpg" alt="Microphone waiting on stage for a community speaker" fill sizes="(max-width: 768px) 100vw, 55vw" className="object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08101a]/75 via-transparent to-transparent" />
              <div className="relative flex h-full min-h-[360px] items-end p-5 sm:min-h-[470px] sm:p-8">
                <div className="relative max-w-[270px] overflow-hidden rounded-2xl border border-white/20 bg-white/[0.10] px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-[24px]">
                  <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-white/75">The best part?</span>
                  <span className="mt-2 block text-[20px] font-extrabold leading-tight tracking-[-0.04em] text-white">The people you&apos;ll meet.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-8 border-t border-white/15 pt-9 sm:grid-cols-3 sm:gap-6 lg:mt-24 lg:pt-12">
            <div className="border-l-2 border-[#4285f4] pl-5"><h3 className="text-[17px] font-extrabold tracking-[-0.03em] text-white">Learn something new.</h3><p className="mt-2 max-w-[280px] text-[13px] font-medium leading-[1.75] text-[#b9c4d3]">Hear fresh ideas from people building with today&apos;s tools.</p></div>
            <div className="border-l-2 border-[#fbbc04] pl-5"><h3 className="text-[17px] font-extrabold tracking-[-0.03em] text-white">Make it hands-on.</h3><p className="mt-2 max-w-[280px] text-[13px] font-medium leading-[1.75] text-[#b9c4d3]">Go beyond the talk and try things out for yourself.</p></div>
            <div className="border-l-2 border-[#34a853] pl-5"><h3 className="text-[17px] font-extrabold tracking-[-0.03em] text-white">Find your community.</h3><p className="mt-2 max-w-[280px] text-[13px] font-medium leading-[1.75] text-[#b9c4d3]">Meet developers who love asking the same big questions.</p></div>
          </div>
        </div>
      </section>

      <section id="agenda" className="relative bg-[#0d1521] py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-[1344px] px-5 sm:px-8 lg:px-12">
          <div className="mb-12 flex flex-col gap-4 sm:mb-16">
            <h2 className="max-w-[750px] text-[clamp(2.7rem,5.4vw,5.5rem)] font-extrabold leading-[1.05] tracking-[-0.065em] text-white">One day. A lot of possibility.</h2>
            <p className="max-w-[540px] text-[15px] font-medium leading-[1.8] text-[#b9c4d3]">A little inspiration, a lot of building, and plenty of time to connect.</p>
          </div>
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
            <div className="border-t border-white/20">
              {agenda.map((item, index) => (
                <div key={item.time} className="group grid grid-cols-[72px_1fr] gap-4 border-b border-white/15 py-6 sm:grid-cols-[110px_1fr] sm:gap-8 sm:py-8">
                  <div className="pt-1 font-mono text-[12px] font-medium text-[#a7d3ff] sm:text-[13px]">{item.time}<span className="block pt-1 text-[11px] text-white/45">{item.end}</span></div>
                  <div className="flex items-start justify-between gap-4"><div><h3 className="text-[19px] font-extrabold tracking-[-0.04em] text-white sm:text-[23px]">{item.title}</h3><p className="mt-2 text-[13px] font-medium leading-[1.7] text-[#b9c4d3] sm:text-[14px]">{item.detail}</p></div><span className="hidden font-mono text-[11px] text-white/30 sm:block">0{index + 1}</span></div>
                </div>
              ))}
              <p className="mt-5 text-[11px] font-medium text-white/55">Sample agenda. Session details may change.</p>
            </div>
            <div className="relative min-h-[380px] overflow-hidden rounded-[24px] border border-white/10 lg:min-h-full">
              <Image src="/images/hero-conference.jpg" alt="Community members gathered for a conference session" fill sizes="(max-width: 1024px) 100vw, 35vw" className="object-cover object-[65%_center]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07101a] via-[#07101a]/35 to-[#07101a]/10" />
              <div className="relative flex h-full min-h-[380px] flex-col justify-between p-6 sm:p-8">
                <div className="w-fit rounded-full border border-white/20 bg-white/[0.10] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-2xl">Saturday · 12 December</div>
                <div><div className="mb-5 flex gap-1.5" aria-hidden="true"><span className="size-2 rounded-full bg-[#4285f4]" /><span className="size-2 rounded-full bg-[#ea4335]" /><span className="size-2 rounded-full bg-[#fbbc04]" /><span className="size-2 rounded-full bg-[#34a853]" /></div><p className="max-w-[330px] text-[30px] font-extrabold leading-[1.14] tracking-[-0.055em] text-white sm:text-[36px]">Good things happen when we build together.</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="register" className="register-section relative isolate overflow-hidden bg-[#080f19] py-20 sm:py-24 lg:py-32">
        <div className="register-ambient pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid max-w-[1344px] items-center gap-12 px-5 sm:px-8 md:grid-cols-[0.9fr_1.1fr] md:gap-12 lg:gap-24 lg:px-12">
          <div>
            <div className="mb-6 flex gap-1.5" aria-hidden="true"><span className="h-1 w-9 rounded-full bg-[#4285f4]" /><span className="h-1 w-9 rounded-full bg-[#ea4335]" /><span className="h-1 w-9 rounded-full bg-[#fbbc04]" /><span className="h-1 w-9 rounded-full bg-[#34a853]" /></div>
            <h2 className="max-w-[580px] text-[clamp(2.9rem,5.3vw,5.7rem)] font-extrabold leading-[1.04] tracking-[-0.07em] text-white">Your next big idea starts <span className="text-[#8ab4f8]">here.</span></h2>
            <p className="mt-7 max-w-[480px] text-[15px] font-medium leading-[1.85] text-[#b9c4d3] sm:text-[17px]">Come curious. Leave inspired, connected, and ready to make something new.</p>
            <div className="mt-10 flex flex-col gap-5 border-t border-white/15 pt-7 text-[13px] font-semibold text-white/90 sm:flex-row sm:gap-9">
              <div><span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.15em] text-[#a7d3ff]">When</span>12 December 2026 · 9 AM – 5 PM</div>
              <div><span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.15em] text-[#a7d3ff]">Where</span>Info Institute of Engineering · Coimbatore, Tamil Nadu</div>
            </div>
          </div>
          <RegistrationForm />
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#080e17] px-5 pb-8 pt-12 text-white sm:px-8 lg:px-12 lg:pt-16">
        <div className="mx-auto max-w-[1344px]">
          <div className="flex flex-col justify-between gap-10 border-b border-white/10 pb-12 md:flex-row md:items-start">
            <div><a href="#top" className="inline-flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8ab4f8]"><BrandMark /><span className="text-[20px] font-extrabold tracking-[-0.05em]">developer<span className="font-medium text-white/75">day</span></span></a><p className="mt-4 max-w-[310px] text-[13px] font-medium leading-[1.8] text-[#acb9ca]">A space for ideas, code, and the people behind it all.</p></div>
            <div className="flex flex-wrap gap-x-10 gap-y-4 text-[13px] font-semibold text-white/80"><a href="#about" className="hover:text-white focus-visible:outline-2 focus-visible:outline-[#8ab4f8]">The event</a><a href="#agenda" className="hover:text-white focus-visible:outline-2 focus-visible:outline-[#8ab4f8]">Agenda</a><a href="#register" className="hover:text-white focus-visible:outline-2 focus-visible:outline-[#8ab4f8]">Register now</a><a href="https://developers.google.com/community/gdg" target="_blank" rel="noopener noreferrer" className="hover:text-white focus-visible:outline-2 focus-visible:outline-[#8ab4f8]">About GDG ↗</a></div>
          </div>
          <div className="flex flex-col justify-between gap-4 pt-7 text-[11px] font-medium text-white/55 sm:flex-row sm:items-center"><span>© 2026 Developer Day. Community event template.</span><span>Sample event details. Not an official Google event page.</span></div>
        </div>
      </footer>
    </main>
  )
}
