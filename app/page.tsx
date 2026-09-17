"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const links = [
  { label: "Investimento", href: "#rentabilidade" },
  { label: "Galeria", href: "#fotos" },
  { label: "Diferenciais", href: "#por-que-investir" },
  { label: "Localização", href: "#localizacao" },
  { label: "Consultora", href: "#consultora" },
];
const investmentDetails = [
  { title: "Rendimento Planejado", description: "Conheça as condições de rendimento previstas em contrato e acompanhe cada etapa do seu investimento." },
  { title: "Patrimônio em seu nome", description: "Unidades com documentação própria e informações claras para você avaliar sua próxima aquisição imobiliária." },
  { title: "Participe da receita hoteleira", description: "Operação profissional, acompanhamento digital e participação no sistema Pool." },
  { title: "Feito para Hóspedes", description: "Hospedagem pensada para viagens de trabalho e lazer." },
  { title: "Conforto Completo", description: "Ambientes bem planejados para receber cada hóspede com conforto e praticidade." },
  { title: "Endereço Estratégico", description: "Uma região conectada aos principais polos de serviços, negócios e mobilidade." },
];
const galleryImages = [
  { src: "/bloco/1.webp", alt: "Terraço com sofás, jardim e vista para a cidade ao pôr do sol" },
  { src: "/bloco/2.webp", alt: "Ambiente integrado com sala de estar, lareira e vista para a piscina" },
  { src: "/bloco/3.webp", alt: "Banheiro com bancada dupla e portas de vidro voltadas para a piscina" },
  { src: "/bloco/4.webp", alt: "Área interna com ilha central, armários de madeira e poltronas" },
  { src: "/bloco/5.webp", alt: "Sala de estar com sofá amplo e vista para o pátio com piscina" },
];
const lineClass = "whitespace-normal min-[801px]:block min-[801px]:whitespace-nowrap";
const inputClass = "h-[42px] min-w-0 w-full rounded border border-white/15 bg-[#eff0ef]/70 px-2.5 text-sm text-[#26342f] placeholder:text-[#525953] placeholder:opacity-100 min-[801px]:h-[31px] min-[801px]:text-xs";

function InvestmentDetail({ title, description }: { title: string; description: string }) {
  const anchor = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 639px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let animation: Animation | null = null;
    function update() {
      frame = 0;
      if (!anchor.current || !cardRef.current) return;
      if (!mobile.matches || reducedMotion.matches) {
        animation?.cancel();
        animation = null;
        return;
      }
      if (!animation) {
        animation = cardRef.current.animate([
          { opacity: 0, transform: "translateY(48px)", offset: 0 },
          { opacity: 1, transform: "translateY(0)", offset: 0.3 },
          { opacity: 1, transform: "translateY(0)", offset: 0.7 },
          { opacity: 0, transform: "translateY(-48px)", offset: 1 },
        ], { duration: 1000, fill: "both", easing: "linear" });
        animation.pause();
      }
      // Each card follows its own passage through the viewport, in either direction.
      const bounds = anchor.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      // Animate entry at the bottom and exit at the top independently for each card.
      const entrance = Math.max(0, Math.min(1, (viewportHeight * 0.94 - bounds.top) / (viewportHeight * 0.28)));
      const exit = Math.max(0, Math.min(1, (viewportHeight * 0.28 - bounds.bottom) / (viewportHeight * 0.24)));
      const progress = entrance < 1 ? entrance * 0.3 : 0.7 + exit * 0.3;
      animation.currentTime = progress * 1000;
    }
    function schedule() { if (!frame) frame = window.requestAnimationFrame(update); }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    mobile.addEventListener("change", schedule);
    reducedMotion.addEventListener("change", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      animation?.cancel();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      mobile.removeEventListener("change", schedule);
      reducedMotion.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <div ref={anchor} className="min-w-0 snap-start">
      <article ref={cardRef} className="h-full min-h-[142px] rounded-[18px] border border-[#65c4bd] bg-[#efefed] px-6 py-6 text-[#092b23]">
        <h3 className="flex items-start gap-2.5 font-serif text-[22px] leading-[1.25] font-bold italic">
          <span aria-hidden="true" className="shrink-0 font-sans text-[32px] leading-none font-semibold text-[#22bdbb]">↗</span>
          {title}
        </h3>
        <p className="mt-2 text-[13px] leading-[1.65] text-[#616763]">{description}</p>
      </article>
    </div>
  );
}
function InvestmentDecoration({ side, src, inTitleGap = false }: { side: "left" | "right"; src: string; inTitleGap?: boolean }) {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = imageRef.current;
    const section = element?.closest("section");
    if (!element || !section) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const direction = side === "left" ? -1 : 1;
    const animation = element.animate([
      { transform: `translateX(${direction * 65}%) rotate(${direction * 45}deg)`, filter: "blur(24px)" },
      { transform: "translateX(0%) rotate(0deg)", filter: "blur(0px)" },
    ], { duration: 1000, fill: "both", easing: "linear" });
    animation.pause();
    let frame = 0;
    function update() {
      frame = 0;
      if (!section) return;
      const top = section.getBoundingClientRect().top;
      const progress = reducedMotion.matches ? 1 : Math.max(0, Math.min(1, (window.innerHeight * 0.9 - top) / (window.innerHeight * 0.8)));
      animation.currentTime = progress * 1000;
    }
    function schedule() { if (!frame) frame = window.requestAnimationFrame(update); }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reducedMotion.addEventListener("change", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      animation.cancel();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", schedule);
    };
  }, [side]);

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute w-[80px] select-none ${side === "right" ? "z-30" : "z-0"} sm:w-[130px] xl:w-[190px] 2xl:w-[240px] ${inTitleGap ? "-left-4 top-0" : side === "left" ? "hidden left-1 sm:top-[14%] sm:block" : "right-0 bottom-0 translate-y-4 sm:right-1 sm:bottom-[3%] sm:translate-y-0"}`}>
      <div ref={imageRef}>
        <Image src={src} alt="" width={1080} height={1350} sizes="(min-width: 1536px) 240px, (min-width: 1280px) 190px, (min-width: 640px) 130px, 80px" draggable={false} className={`h-auto w-full animate-decoration-float sm:animate-decoration-float-desktop motion-reduce:animate-none ${side === "right" ? "[animation-delay:-2.5s]" : ""}`} />
      </div>
    </div>
  );
}
function ContactArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-5 shrink-0 -rotate-45 transition-transform duration-200 ease-out group-hover/cta:rotate-0 group-focus-visible/cta:rotate-0 group-active/cta:rotate-0 motion-reduce:transition-none">
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; scroll: number } | null>(null);
  const interacted = useRef(false);
  const [dragging, setDragging] = useState(false);
  const [activePhoto, setActivePhoto] = useState(0);
  function finishDrag() {
    drag.current = null;
    setDragging(false);
    const gallery = galleryRef.current;
    if (!gallery) return;
    const step = (gallery.firstElementChild as HTMLElement).offsetWidth + 28;
    gallery.scrollTo({ left: Math.round(gallery.scrollLeft / step) * step, behavior: "smooth" });
  }
  useEffect(() => {
    const timer = window.setInterval(() => {
      const gallery = galleryRef.current;
      if (!gallery || interacted.current || document.hidden || !window.matchMedia("(max-width: 639px)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const step = (gallery.firstElementChild as HTMLElement).offsetWidth + 28;
      gallery.scrollTo({ left: gallery.scrollLeft >= gallery.scrollWidth - gallery.clientWidth - 2 ? 0 : gallery.scrollLeft + step, behavior: "smooth" });
    }, 4000);
    return () => window.clearInterval(timer);
  }, []);
  const detailsRef = useRef<HTMLDivElement>(null);
  function scrollDetails(direction: number) {
    const container = detailsRef.current;
    if (!container) return;
    const card = container.firstElementChild as HTMLElement | null;
    container.scrollBy({ left: direction * ((card?.offsetWidth ?? 300) + 16), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return (
    <>
    <main id="inicio" className="[&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-[#078b8b] [&_button]:cursor-pointer [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-4 [&_button:focus-visible]:outline-[#078b8b] [&_input:focus-visible]:outline-2 [&_input:focus-visible]:outline-offset-4 [&_input:focus-visible]:outline-[#078b8b]">
      <section className="relative min-h-[728px] overflow-hidden min-[1500px]:min-h-[calc(100svh-34px)]" aria-labelledby="hero-title">
        {/* Fotografia de fundo do hero. */}
        <Image src="/back.webp" alt="" fill sizes="100vw" preload className="object-cover object-center" />
        <header className="relative z-30 mx-auto mt-3.5 flex h-[66px] w-[calc(100%-32px)] max-w-[1064px] items-center gap-[15px] rounded-[7px] border border-white/45 bg-[#f5f7f3]/40 px-4 py-2.5 shadow-[0_2px_3px_#243a352b] backdrop-blur-[16px] min-[801px]:h-[70px] min-[801px]:w-[calc(100%-64px)] min-[801px]:px-5 min-[1101px]:gap-[30px] min-[1101px]:pl-[30px]">
          <a className="flex shrink-0 items-center gap-[5px] font-serif leading-[.88]" href="#inicio" aria-label="PRIME REALTY — início">
            <svg className="h-10 w-[35px] text-[#219c9c] min-[801px]:h-[46px] min-[801px]:w-[42px]" viewBox="0 0 44 48" fill="none" aria-hidden="true">
              <path d="M5 43V23l11-6v26M16 36V9l11-6v30M27 29V14l11 5v24H5" stroke="currentColor" strokeWidth="3" />
              <path d="M2 40c9-13 22-19 40-20" stroke="currentColor" strokeWidth="3" />
            </svg>
            <span className="grid text-[19px] min-[801px]:text-[22px]"><strong className="text-[#219c9c]">PRIME</strong><span className="tracking-[1px] text-[#58605a]">REALTY</span></span>
          </a>

          <nav id="navigation" className={`${menuOpen ? "grid" : "hidden"} absolute inset-x-0 top-[74px] rounded-[7px] border border-white/60 bg-[#e8eee9] p-3 shadow-[0_8px_20px_#243a351a] min-[801px]:static min-[801px]:ml-auto min-[801px]:flex min-[801px]:items-center min-[801px]:rounded-none min-[801px]:border-0 min-[801px]:bg-transparent min-[801px]:p-0 min-[801px]:shadow-none`} aria-label="Navegação principal">
            {links.map((link) => <a className="border-t border-[#cad5ce] p-[13px] text-xs leading-3 whitespace-nowrap uppercase first:border-0 hover:text-[#078b8b] min-[801px]:border-t-0 min-[801px]:border-l min-[801px]:border-[#68716b] min-[801px]:px-[11px] min-[801px]:py-0 min-[801px]:text-[10px] min-[1101px]:px-[18px] min-[1101px]:text-[11px]" key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>)}
          </nav>
          <a href="https://www.instagram.com/tzolkinsites/" target="_blank" rel="noopener noreferrer" className="ml-auto grid size-[33px] shrink-0 min-[801px]:ml-0 place-items-center rounded-full bg-[#303733] text-[#eef2ee]" aria-label="Instagram da empresa">
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="5" /><circle cx="12" cy="12" r="3.5" /><circle cx="17" cy="7" r=".8" fill="currentColor" stroke="none" /></svg>
          </a>
          <button className="flex size-11 shrink-0 items-center justify-center bg-transparent text-[#303733] min-[801px]:hidden" type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} aria-controls="navigation" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d={menuOpen ? "M6 6l12 12M6 18L18 6" : "M3 5h18M3 12h18M3 19h18"} />
            </svg>
          </button>
        </header>

        <div className="relative mx-auto mt-12 w-[calc(100%-40px)] max-w-[1064px] min-[801px]:mt-[78px] min-[801px]:min-h-[566px] min-[801px]:w-[calc(100%-64px)] min-[1500px]:mt-[100px] min-[1500px]:min-h-[calc(100svh-218px)]">
          <div className="relative z-20 mx-auto w-full max-w-[560px] min-[801px]:mx-0 min-[801px]:w-[560px]">
            <div className="relative isolate flow-root">
              <div aria-hidden="true" className="pointer-events-none absolute -inset-x-8 -top-10 -bottom-6 -z-10 bg-white/60 backdrop-blur-[14px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_72%)] min-[801px]:-inset-x-14" />
            <h1 id="hero-title" className="font-serif text-[clamp(34px,6.5vw,46px)] leading-[1.28] font-normal tracking-[-1px] text-[#171c19] min-[801px]:text-[48px] min-[801px]:leading-[1.35] min-[801px]:tracking-[-1.5px]"><span className={lineClass}>Tenha <em className="font-bold text-[#22bdbb]">Seu Patrimônio</em> em</span>{" "}<span className={lineClass}>Hotel de Luxo em MG</span></h1>
            <p className="relative isolate mt-4 mb-5 max-w-[460px] before:pointer-events-none before:absolute before:-inset-x-8 before:-inset-y-7 before:-z-10 before:bg-white/65 before:backdrop-blur-[14px] before:[mask-image:radial-gradient(ellipse,black_45%,transparent_75%)] before:content-[''] text-base leading-[1.23] tracking-[.05px] text-[#39413c] min-[801px]:mt-2 min-[801px]:mb-[15px] min-[801px]:max-w-[490px] min-[801px]:text-[17px] min-[801px]:tracking-[-.25px]"><span className={lineClass}>Com a PRIME REALTY você encontra <strong>novas formas de investir</strong></span>{" "}<span className={lineClass}><strong>em hotelaria</strong> com suporte para escolher,</span>{" "}<span className={lineClass}>planejar, acompanhar e diversificar.</span></p>
            </div>
            <form id="contato" className="w-full max-w-[360px] scroll-mt-6 rounded-[7px] border border-white/65 bg-[#f2f5f2]/16 p-5 shadow-[0_2px_3px_#243a3529] backdrop-blur-[12px] min-[801px]:px-[22px] min-[801px]:pt-[18px] min-[801px]:pb-[22px]" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
              <h2 className="text-center font-serif text-[24px] leading-[1.3] font-bold italic min-[801px]:text-[26px]">Converse com Julia</h2>
              <p className="my-2.5 text-center text-[11px] text-[#4c5650]">Deixe seus dados e conheça oportunidades para seu próximo investimento.</p>
              <div className="grid gap-2">
                <label className="sr-only" htmlFor="name">Nome</label>
                <input className={inputClass} id="name" name="name" autoComplete="name" placeholder="Nome" required />
                <label className="sr-only" htmlFor="email">E-mail</label>
                <input className={inputClass} id="email" name="email" type="email" autoComplete="email" placeholder="E-mail" required />
                <label className="sr-only" htmlFor="phone">DDD + WhatsApp</label>
                <input className={inputClass} id="phone" name="phone" type="tel" autoComplete="tel" placeholder="DDD + WhatsApp" required />
                <button className="group/cta flex min-h-[43px] items-center justify-center gap-2.5 rounded-md border border-[#169a9c]/35 bg-[linear-gradient(100deg,#219fa3,#16cdd5)] text-xs text-[#133c3b] uppercase shadow-[0_2px_2px_#243a353b] hover:brightness-106 min-[801px]:min-h-[35px]" type="submit">Quero conhecer <ContactArrow /></button>
              </div>
              {submitted && <p className="mt-2.5 text-center text-[11px] leading-normal text-[#4c5650]" role="status">Este formulário está em demonstração. Para conversar com Julia, utilize o WhatsApp disponível no rodapé.</p>}
            </form>
          </div>
          <div className="pointer-events-none relative mx-auto mt-[30px] h-[420px] w-full max-w-[560px] min-[801px]:absolute min-[801px]:right-0 min-[801px]:bottom-0 min-[801px]:m-0 min-[801px]:h-[640px] min-[801px]:w-[43%] min-[1101px]:right-10 min-[1101px]:w-[48%] min-[1500px]:h-full min-[1500px]:min-h-[640px]">
            <Image src="/mulher.png" alt="Mulher em destaque na apresentação do PRIME REALTY" fill sizes="(max-width: 800px) 100vw, 520px" preload className="object-contain object-bottom" />
          </div>
        </div>
      </section>
      <div className="h-[34px] overflow-hidden border-t border-white/50 bg-[#cbdcd2] text-[#274638]" aria-label="Participe da receita hoteleira">
        <div className="flex w-max animate-marquee font-serif text-base leading-[34px] font-bold italic motion-reduce:animate-none min-[801px]:text-lg" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 whitespace-nowrap">
              {Array.from({ length: 8 }, (_, index) => <span key={index}>Participe da receita hoteleira <b className="px-2">•</b> </span>)}
            </div>
          ))}
        </div>
      </div>
      <section id="rentabilidade" aria-labelledby="investment-title" className="relative isolate overflow-hidden bg-[#031e19] px-5 pt-12 pb-16 text-[#eef1ed] sm:px-8 sm:pt-14 sm:pb-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_90%,rgba(37,83,64,0.25),transparent_60%),repeating-linear-gradient(12deg,transparent_0px,transparent_55px,rgba(76,119,91,0.035)_65px,transparent_90px)]" />
        <InvestmentDecoration side="left" src="/animate/feliz.png" />
        <InvestmentDecoration side="right" src="/animate/surpresa.png" />
        <div className="relative z-10 mx-auto max-w-[1064px]">
          <h2 id="investment-title" className="mx-auto max-w-[900px] text-center font-serif text-[30px] leading-[1.3] tracking-[-.6px] sm:text-[40px] lg:text-[48px]">
            Conheça um novo caminho para <em className="font-bold text-[#22bdbb]">seu patrimônio</em>{" "}
            <span className="min-[801px]:block">com a PRIME REALTY</span>
          </h2>

          <div className="relative h-[100px] sm:hidden">
            <InvestmentDecoration side="left" src="/animate/feliz.png" inTitleGap />
          </div>
          <div className="mx-auto mt-2 flex max-w-[980px] sm:mt-10 flex-col items-center min-[801px]:mt-11 min-[801px]:flex-row">
            <div className="w-full rounded-2xl border border-[#89c8bf] bg-[#d5d3d3] px-6 py-7 font-serif text-[#092b23] shadow-[0_8px_24px_#00000020] sm:px-8 min-[801px]:w-[48%] min-[801px]:shrink-0 min-[801px]:py-8">
              <p className="text-[25px] leading-tight sm:text-[29px]">Investimentos a partir de</p>
              <p className="mt-1 flex flex-wrap items-baseline gap-x-2 leading-[1.15]">
                <span className="text-[30px] font-bold italic sm:text-[38px]">R$</span>
                <strong className="text-[50px] font-bold tracking-[-2px] italic sm:text-[60px]">270mil</strong>
                <span className="text-[25px] sm:text-[29px]">à vista</span>
              </p>
              <p className="mt-2 text-[18px] leading-snug sm:text-[22px]">Entrada de R$ 140mil e restante com parcelamento</p>
            </div>

            <div className="relative z-10 -mt-2 w-full rounded-2xl border border-[#89c8bf] bg-[#dedfdd] px-5 py-8 text-center font-serif text-[#092b23] shadow-[-5px_6px_16px_#00000020] sm:px-7 min-[801px]:-mt-0 min-[801px]:-ml-3 min-[801px]:flex-1 min-[801px]:py-10">
              <p className="text-[23px] leading-snug sm:text-[29px]">Estimativa de rendimento mensal de</p>
              <p className="mt-3 flex flex-wrap items-baseline justify-center gap-x-2 leading-[1.1]">
                <span className="text-[30px] font-bold text-[#22bdbb] italic sm:text-[40px]">R$</span>
                <strong className="text-[48px] font-bold tracking-[-2px] text-[#22bdbb] italic sm:text-[68px]">4.570,00</strong>
                <span className="text-[23px] sm:text-[27px]">A.M.</span>
              </p>
              <p className="mt-4 text-[25px] leading-tight sm:text-[29px]">Consulte as condições</p>
            </div>
          </div>

          <a href="#contato" className="group/cta mx-auto mt-9 flex min-h-[58px] w-full max-w-[452px] items-center justify-center gap-3 rounded-lg border border-[#169a9c]/35 bg-[linear-gradient(100deg,#219fa3,#16cdd5)] px-6 py-3 text-sm font-medium text-[#133c3b] uppercase shadow-[0_3px_2px_#ffffff35] transition-[filter] hover:brightness-110 sm:text-base">
            Quero conhecer <ContactArrow />
          </a>
        </div>
      </section>
      <section id="por-que-investir" aria-labelledby="details-title" className="relative isolate overflow-hidden bg-[#031e19] px-5 pt-2 pb-16 sm:px-8 sm:pb-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_0%,rgba(37,83,64,0.25),transparent_60%)]" />
        <div className="mx-auto max-w-[1064px]">
          <div className="mb-6 flex items-end gap-5 sm:gap-8">
            <div className="shrink-0">
              <p className="text-sm text-[#b7c5bf] sm:text-lg">Conheça os diferenciais deste novo</p>
              <h2 id="details-title" className="font-serif text-[36px] leading-[1.15] font-bold text-[#22bdbb] italic sm:text-[46px]">Patrimônio!</h2>
            </div>
            <div aria-hidden="true" className="mb-5 hidden h-px flex-1 bg-[#22bdbb] sm:block" />
            <div className="mb-2 ml-auto hidden shrink-0 gap-3 sm:flex lg:hidden">
              <button type="button" aria-label="Ver detalhes anteriores" aria-controls="investment-details" onClick={() => scrollDetails(-1)} className="grid size-9 place-items-center rounded-full border border-[#22bdbb] bg-white text-2xl text-[#20aaa8] transition-colors hover:bg-[#d4f4ee]">←</button>
              <button type="button" aria-label="Ver próximos detalhes" aria-controls="investment-details" onClick={() => scrollDetails(1)} className="grid size-9 place-items-center rounded-full border border-[#22bdbb] bg-white text-2xl text-[#20aaa8] transition-colors hover:bg-[#d4f4ee]">→</button>
            </div>
          </div>
          <div id="investment-details" ref={detailsRef} tabIndex={0} aria-label="Detalhes do investimento" className="grid grid-cols-1 gap-4 pb-3 sm:auto-cols-[48%] sm:grid-flow-col sm:grid-cols-none sm:grid-rows-2 sm:overflow-x-auto sm:snap-x sm:snap-mandatory focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#22bdbb] sm:auto-cols-[48%] lg:grid-flow-row lg:grid-cols-3 lg:overflow-visible lg:pb-0">
            {investmentDetails.map((detail) => (
              <InvestmentDetail key={detail.title} title={detail.title} description={detail.description} />
            ))}
          </div>
        </div>
      </section>
      <section aria-labelledby="hotel-title" className="bg-[#031e19] px-5 pt-8 pb-16 sm:px-8 min-[901px]:pt-28 min-[901px]:pb-20">
        <div className="relative mx-auto max-w-[1064px]">
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-2 top-20 bottom-2 z-[5] rounded-[20px] border-2 border-[#249f9f]/80 min-[901px]:-top-3 min-[901px]:-right-3 min-[901px]:bottom-3 min-[901px]:left-3" />
          <div className="relative grid min-[901px]:grid-cols-[44%_56%]">
            <div className="relative mx-auto -mb-4 w-full max-w-[500px] min-[901px]:mb-0 min-[901px]:max-w-none">
              <Image src="/predio.png" alt="Perspectiva do edifício com terraço na cobertura e vista da cidade" width={1223} height={1286} sizes="(max-width: 900px) 100vw, 510px" className="relative z-10 block h-auto w-full min-[901px]:absolute min-[901px]:bottom-0 min-[901px]:left-[-6%] min-[901px]:w-[112%] min-[901px]:max-w-none min-[901px]:[clip-path:inset(0_10%_0_0)]" />
            </div>
            <div className="relative z-10 rounded-2xl bg-[#dce0dd] px-7 py-9 text-[#092b23] min-[901px]:-ml-12 min-[901px]:rounded-l-none min-[901px]:px-12 min-[901px]:py-9">
              <div className="border-l-4 border-[#22bdbb] pl-3">
                <p className="text-xs tracking-[5px] uppercase sm:text-base">Hotel alto padrão</p>
                <h2 id="hotel-title" className="flex flex-wrap items-baseline gap-x-3 font-serif italic">
                  <span className="text-[48px] leading-[1.15] font-bold sm:text-[58px]">Motto</span>
                  <span className="text-[27px] sm:text-[31px]">by Hilton</span>
                </h2>
              </div>
              <p className="mt-4 text-sm leading-[1.8]">Conheça o Motto by Hilton em São Paulo, uma proposta de hospedagem urbana em Moema, próxima ao Parque do Ibirapuera e ao Aeroporto de Congonhas. Seus ambientes combinam conforto, soluções contemporâneas e <strong>espaços para aproveitar a cidade</strong> com praticidade. A PRIME REALTY apresenta os detalhes do empreendimento para você avaliar essa oportunidade com clareza. Uma alternativa para quem procura hotelaria com <strong>boa estrutura, endereço estratégico e uma operação voltada à experiência dos hóspedes.</strong></p>
              <a href="#contato" className="group/cta mt-5 flex min-h-12 w-full max-w-[340px] items-center justify-center gap-3 rounded-lg border border-[#169a9c]/35 bg-[linear-gradient(100deg,#219fa3,#16cdd5)] px-5 py-3 text-sm font-medium text-[#133c3b] uppercase shadow-[0_2px_2px_#243a353b] hover:brightness-110">Quero conhecer <ContactArrow /></a>
            </div>
          </div>
        </div>
      </section>
      <section id="fotos" aria-labelledby="gallery-title" className="bg-[#031e19] px-5 pt-2 pb-8 text-[#eef1ed] sm:px-8 sm:pb-10">
        <div className="mx-auto max-w-[1064px]">
          <h2 id="gallery-title" className="text-center font-serif text-[28px] leading-[1.3] sm:text-[38px]">
            Explore os ambientes e conheça cada novo detalhe
            <em className="block font-bold text-[#22bdbb]">do seu patrimônio</em>
          </h2>
                    <div
            ref={galleryRef} id="photo-gallery" onScroll={(event) => {
              const step = (event.currentTarget.firstElementChild as HTMLElement).offsetWidth + 28;
              setActivePhoto(Math.round(event.currentTarget.scrollLeft / step));
            }} tabIndex={0} role="region" aria-roledescription="carrossel"
            aria-label="Fotos do investimento. Arraste ou use as setas do teclado para navegar."
            onFocus={() => { interacted.current = true; }}
            onPointerDown={(event) => {
              interacted.current = true;
              if (event.pointerType !== "mouse" || event.button !== 0) return;
              drag.current = { x: event.clientX, scroll: event.currentTarget.scrollLeft };
              event.currentTarget.setPointerCapture(event.pointerId);
              setDragging(true);
            }}
            onPointerMove={(event) => { if (drag.current) event.currentTarget.scrollLeft = drag.current.scroll - (event.clientX - drag.current.x); }}
            onPointerUp={() => { if (drag.current) finishDrag(); }}
            onPointerCancel={() => { if (drag.current) finishDrag(); }}
            onLostPointerCapture={() => { if (drag.current) finishDrag(); }}
            onKeyDown={(event) => {
              if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
              event.preventDefault();
              const step = (event.currentTarget.firstElementChild as HTMLElement).offsetWidth + 28;
              event.currentTarget.scrollBy({ left: event.key === "ArrowRight" ? step : -step, behavior: "smooth" });
            }}
            className={`mt-9 flex gap-7 overflow-x-auto overscroll-x-contain rounded-xl select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#22bdbb] sm:mt-11 ${dragging ? "cursor-grabbing snap-none" : "cursor-grab snap-x snap-mandatory"}`}
          >
            {galleryImages.map((photo) => (
              <div key={photo.src} className="relative aspect-[3/2] w-full shrink-0 snap-start overflow-hidden rounded-xl border border-white/15 bg-[#27463d] sm:w-[calc((100%-28px)/2)]">
                <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1128px) calc((100vw - 92px) / 2), 518px" draggable={false} className="pointer-events-none object-cover" />
              </div>
            ))}
          </div>
          <div className="my-3 flex items-center justify-center gap-1" aria-label="Posição na galeria">
            {Array.from({ length: galleryImages.length }, (_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Ver imagem ${index + 1}`}
                aria-controls="photo-gallery"
                onClick={() => {
                  const gallery = galleryRef.current;
                  if (!gallery) return;
                  interacted.current = true;
                  const step = (gallery.firstElementChild as HTMLElement).offsetWidth + 28;
                  gallery.scrollTo({ left: index * step, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
                }}
                className={`flex h-8 items-center justify-center ${index % 2 ? "sm:hidden" : ""}`}
              >
                <span aria-hidden="true" className={`h-[3px] transition-[width,background-color] motion-reduce:transition-none ${activePhoto === index ? "w-7 bg-[#d6e2dc]" : "w-3 bg-[#164137]"} ${(activePhoto >= 3 ? 2 : Math.floor(activePhoto / 2)) === index / 2 ? "sm:w-12 sm:bg-[#d6e2dc]" : "sm:w-5 sm:bg-[#164137]"}`} />
              </button>
            ))}
          </div>
          <a href="#contato" className="group/cta mx-auto mt-2 flex min-h-11 w-full max-w-[310px] items-center justify-center gap-2 rounded-md border border-[#169a9c]/35 bg-[linear-gradient(100deg,#219fa3,#16cdd5)] px-6 py-3 text-xs font-medium text-[#133c3b] uppercase shadow-[0_2px_2px_#ffffff35] hover:brightness-110">
            Quero conhecer <ContactArrow />
          </a>
        </div>
      </section>

      <section id="localizacao" aria-labelledby="location-title" className="bg-[#dce1da] px-5 py-9 text-[#092b23] sm:px-8 sm:py-11">
        <div className="mx-auto max-w-[1024px]">
          <h2 id="location-title" className="text-center font-serif text-[28px] leading-[1.3] sm:text-[38px]">
            Uma Localização Conectada ao
            <em className="block font-bold">Ritmo da cidade</em>
          </h2>
          <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 5 }, (_, index) => (
              <figure key={index} className={`relative aspect-square overflow-hidden rounded-md bg-[#b9c9bd] ${index === 4 ? "hidden sm:block" : "block"}`}>
                <Image src={`/predio/predio-${index + 1}.png`} alt={`Vista arquitetônica ${index + 1} da galeria de localização`} fill sizes="(max-width: 639px) calc((100vw - 56px) / 2), (max-width: 1023px) 30vw, 192px" className="object-cover" />
              </figure>
            ))}
          </div>
        </div>
      </section>
      <section id="consultora" aria-labelledby="broker-title" className="relative isolate overflow-hidden bg-[#031e19] px-5 pt-12 pb-0 text-[#d6dfd9] sm:px-8 sm:pt-16 min-[801px]:pb-16 min-[801px]:min-h-[620px] min-[801px]:bg-[url(/mulher2.png)] min-[801px]:bg-cover min-[801px]:bg-center">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[#031e19] min-[801px]:bg-transparent min-[801px]:bg-[linear-gradient(90deg,rgba(1,20,16,0.94)_0%,rgba(1,20,16,0.8)_32%,rgba(1,20,16,0.15)_58%,transparent_75%)]" />
        <div className="mx-auto max-w-[1064px]">
          <div className="max-w-[450px] min-[801px]:w-[44%] min-[801px]:py-6">
            <p className="text-[11px] tracking-[6px] text-[#acbab0] uppercase">PRIME REALTY</p>
            <h2 id="broker-title" className="mt-1 font-serif text-[40px] leading-[1.15] font-bold text-[#eef1ed] italic sm:text-[50px]">Julia Cristina</h2>
            <div className="mt-4 space-y-5 text-[13px] leading-[1.8] sm:text-sm [&_strong]:font-bold [&_strong]:text-[#22bdbb]">
              <p>Na PRIME REALTY, Julia Cristina aproxima você de <strong>novas oportunidades</strong> em hotelaria. Seu trabalho conecta objetivos pessoais a opções de suítes em São Paulo, com atenção aos detalhes de cada empreendimento. A proposta é apresentar informações de forma clara e acompanhar sua análise com <strong>escuta próxima, orientação personalizada e foco no seu planejamento patrimonial.</strong></p>
              <p>Cada atendimento começa entendendo seu momento, suas prioridades e o que você espera de um investimento. Com <strong>proximidade, transparência e atenção em cada etapa</strong>, Julia apresenta características, condições e possibilidades de cada projeto. Assim, você pode comparar alternativas com tranquilidade e construir uma decisão alinhada ao seu perfil e aos seus planos.</p>
            </div>
            <a href="#contato" className="group/cta mt-5 flex min-h-11 w-full max-w-[310px] items-center justify-center gap-2 rounded-md border border-[#169a9c]/35 bg-[linear-gradient(100deg,#219fa3,#16cdd5)] px-6 py-3 text-xs font-medium text-[#133c3b] uppercase hover:brightness-110">Quero conhecer <ContactArrow /></a>
          </div>

        </div>
        <div className="relative -mx-5 mt-6 sm:-mx-8 min-[801px]:hidden">
          <Image src="/mob.png" alt="Corretora sentada em uma poltrona" width={901} height={1744} sizes="(max-width: 800px) 100vw, 1px" className="block h-auto w-full" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,#031e19_0%,rgba(3,30,25,0.8)_5%,rgba(3,30,25,0.3)_12%,transparent_22%,transparent_88%,#001b17_100%)]" />
        </div>
      </section>
    </main>
    <footer className="bg-[#001b17] px-5 py-10 text-[#cbd7d2] sm:px-8 sm:py-16 [&_a]:transition-colors [&_a:hover]:text-[#22bdbb] [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-[#22bdbb]">
      <div className="mx-auto grid max-w-[1064px] grid-cols-1 items-center justify-items-center gap-0 min-[901px]:gap-y-0 min-[901px]:grid-cols-[1fr_auto_1fr] min-[901px]:gap-16">
        <div className="grid w-full min-w-0 max-w-[310px] gap-1 text-[13px] sm:text-base min-[901px]:w-auto min-[901px]:max-w-none min-[901px]:gap-3 min-[901px]:justify-self-start">
          <a href="https://wa.me/553182354127" target="_blank" rel="noopener noreferrer" className="flex min-h-11 min-w-0 items-center gap-3 min-[901px]:min-h-0" aria-label="WhatsApp: +55 31 8235-4127">
            <svg className="size-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-4.7a8.5 8.5 0 1 1 16.3-3.8Z" /><path d="m8 7 2 3-1 1c1 2 2 3 4 4l1-1 3 1c-1 4-5 2-8-1S5 8 8 7Z" /></svg>
            +55 31 8235-4127
          </a>
          <a href="tel:+553182354127" className="flex min-h-11 min-w-0 items-center gap-3 min-[901px]:min-h-0" aria-label="Telefone: +55 31 8235-4127">
            <svg className="size-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="m7 6 3 3-1.5 1.5a10 10 0 0 0 5 5L15 14l3 3c-1 3-4 2-8-2S5 7 7 6Z" /></svg>
            +55 31 8235-4127
          </a>
        </div>
        <a href="#inicio" aria-label="PRIME REALTY — voltar ao início" className="order-first mb-7 flex items-center gap-2 font-serif leading-[.88] min-[901px]:order-none min-[901px]:mb-0">
          <svg className="h-[66px] w-[60px] text-[#219c9c]" viewBox="0 0 44 48" fill="none" aria-hidden="true"><path d="M5 43V23l11-6v26M16 36V9l11-6v30M27 29V14l11 5v24H5" stroke="currentColor" strokeWidth="3" /><path d="M2 40c9-13 22-19 40-20" stroke="currentColor" strokeWidth="3" /></svg>
          <span className="grid text-[30px]"><strong className="text-[#219c9c]">PRIME</strong><span className="tracking-[1px] text-[#99aaa0]">REALTY</span></span>
        </a>
        <div className="mt-1 grid w-full min-w-0 max-w-[310px] gap-1 text-[13px] sm:text-base min-[901px]:mt-0 min-[901px]:w-auto min-[901px]:max-w-none min-[901px]:gap-3 min-[901px]:justify-self-end">
          <a href="https://www.instagram.com/tzolkinsites/" target="_blank" rel="noopener noreferrer" className="flex min-h-11 min-w-0 items-center gap-3 min-[901px]:min-h-0">
            <svg className="size-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
            @tzolkinsites
          </a>
          <a href="https://wa.me/553182354127" target="_blank" rel="noopener noreferrer" className="flex min-h-11 min-w-0 items-center gap-3 min-[901px]:min-h-0" aria-label="Conversar no WhatsApp: +55 31 8235-4127">
            <svg className="size-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-4.7a8.5 8.5 0 1 1 16.3-3.8Z" /><path d="m8 7 2 3-1 1c1 2 2 3 4 4l1-1 3 1c-1 4-5 2-8-1S5 8 8 7Z" /></svg>
            +55 31 8235-4127
          </a>

        </div>
      </div>
    </footer>
    </>
  );
}













































