'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { ArrowRight, BarChart2, Globe, Calendar, Route, Shield, Swords, ChevronRight, CheckCircle2, XCircle, Lightbulb } from 'lucide-react';
import { COMMERCIALIZATION_HYPOTHESES } from '@/data/strategy';

export default function IntroPage() {
  const locale = useLocale();

  const NAV_CARDS = [
    {
      icon: BarChart2,
      title: 'Market Sizing',
      href: `/${locale}/market`,
      desc: 'How I sized the €31.5B EU AI TAM and derived a €550M 2030 revenue target — with every assumption labelled.',
      color: '#00d4ff',
    },
    {
      icon: Globe,
      title: 'Country Strategy',
      href: `/${locale}/countries`,
      desc: 'Why UK first, Netherlands as hub, Germany for enterprise — and how I score and sequence all 21 EU markets.',
      color: '#a855f7',
    },
    {
      icon: Calendar,
      title: '90-Day Plan',
      href: `/${locale}/90-days`,
      desc: 'What I would personally do in the first 90 days: stakeholder mapping, design-partner LOIs, legal entity, board case.',
      color: '#10b981',
    },
    {
      icon: Route,
      title: 'GTM & Ecosystem',
      href: `/${locale}/gtm`,
      desc: 'The 10 go-to-market motions I would run — developer-led, partner-led, enterprise-direct — and how they interact.',
      color: '#f59e0b',
    },
    {
      icon: Shield,
      title: 'Regulatory & Trust',
      href: `/${locale}/regulation`,
      desc: 'The EU AI Act compliance architecture that turns a liability into a competitive moat. 20 workstreams, 5 stage gates.',
      color: '#00d4ff',
    },
    {
      icon: Swords,
      title: 'Competitive Position',
      href: `/${locale}/competition`,
      desc: 'Why the moat is not raw capability — it is EU trust architecture and open-weight ecosystem depth.',
      color: '#a855f7',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{ background: 'var(--lunar-bg)', color: 'var(--lunar-text-primary)' }}
    >
      {/* HERO */}
      <div
        className="relative overflow-hidden hero-animated-border"
        style={{
          background: 'linear-gradient(135deg, #070b14 0%, #0d1a2e 50%, #070b14 100%)',
        }}
      >
        {/* Glow effect */}
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)',
            transform: 'translate(-50%, -40%)',
          }}
          aria-hidden="true"
        />

        <div className="max-w-5xl mx-auto px-8 py-20">
          <div className="flex items-start justify-between gap-12">
            {/* Left: text */}
            <div className="flex-1">
              {/* Moonshot AI mark */}
              <div className="flex items-center gap-3 mb-12">
                <div
                  className="w-7 h-7 rounded-full"
                  style={{ boxShadow: 'inset -7px 0 0 2px #00d4ff', transform: 'rotate(-20deg)' }}
                  aria-hidden="true"
                />
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--lunar-text-muted)' }}>
                  Moonshot AI · Kimi EU Strategy
                </span>
              </div>

              {/* Main headline */}
              <h1
                className="text-5xl font-bold leading-tight mb-6 headline-glow-anim"
                style={{ color: 'var(--lunar-text-primary)', maxWidth: '700px' }}
              >
                How I would build Kimi&apos;s European API revenue —
                <span style={{ color: 'var(--lunar-cyan)' }}> from zero.</span>
              </h1>

              <p className="text-lg mb-10" style={{ color: 'var(--lunar-text-secondary)', maxWidth: '560px' }}>
                An interactive strategy analysis by{' '}
                <span className="font-semibold" style={{ color: 'var(--lunar-text-primary)' }}>Thomas Zijlstra</span>
                {' '}— prepared for Moonshot AI, August 2026.
              </p>

              <div className="flex items-center gap-4 flex-wrap">
                <Link
                  href={`/${locale}/`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all cta-pulse-btn"
                  style={{
                    background: 'var(--lunar-cyan)',
                    color: '#000',
                  }}
                >
                  Enter the strategy
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* Right: profile photo */}
            <div className="hidden lg:flex flex-col items-center gap-3 flex-shrink-0">
              <div
                style={{
                  width: 160,
                  height: 160,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid rgba(0,212,255,0.3)',
                  boxShadow: '0 0 32px rgba(0,212,255,0.15)',
                }}
              >
                <Image
                  src="/profile-bw.png"
                  alt="Thomas Zijlstra"
                  width={160}
                  height={160}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                />
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold" style={{ color: 'var(--lunar-text-primary)' }}>Thomas Zijlstra</div>
                <div className="text-xs" style={{ color: 'var(--lunar-text-muted)' }}>CFA · Strategy &amp; BD</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* THE QUESTION */}
      <div className="max-w-5xl mx-auto px-8 py-12">
        <div
          className="p-6 rounded-xl mb-12"
          style={{
            background: 'rgba(245,158,11,0.06)',
            border: '1px solid rgba(245,158,11,0.2)',
            borderLeft: '4px solid #f59e0b',
          }}
        >
          <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#f59e0b' }}>
            The questions you asked
          </div>
          <blockquote className="text-xl font-medium italic mb-2" style={{ color: 'var(--lunar-text-primary)' }}>
            &ldquo;How much revenue could you bring in, and how would you navigate the European market?&rdquo;
          </blockquote>
          <blockquote className="text-base italic mb-3" style={{ color: 'var(--lunar-text-secondary)' }}>
            &ldquo;If it were you — where would you open the first breakthrough?&rdquo;
          </blockquote>
          <div className="text-xs" style={{ color: 'var(--lunar-text-muted)' }}>
            — Moonshot AI · Job description &amp; HR Interview, August 2026 · This dashboard answers both.
          </div>
        </div>

        {/* MY ANSWER — 3 numbers */}
        <div className="mb-6">
          <div className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: 'var(--lunar-text-muted)' }}>
            My answer — in three numbers
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { value: '€18M', label: 'ARR by end 2027', desc: 'UK developers + 3 design-partner pilots', color: '#00d4ff' },
              { value: '€75M', label: 'ARR by end 2028', desc: 'Germany enterprise + Nordics + partners', color: '#a855f7' },
              { value: '€550M', label: 'ARR by 2030', desc: 'Full EU build-out across 9 priority markets', color: '#10b981' },
            ].map(s => (
              <div
                key={s.value}
                className="p-6 rounded-xl"
                style={{
                  background: 'var(--lunar-surface)',
                  border: `1px solid ${s.color}35`,
                  borderTop: `4px solid ${s.color}`,
                  boxShadow: `0 4px 24px ${s.color}12`,
                }}
              >
                <div className="text-5xl font-bold font-mono mb-2 leading-none" style={{ color: s.color }}>
                  {s.value}
                </div>
                <div className="text-sm font-bold mb-1.5" style={{ color: 'var(--lunar-text-primary)' }}>
                  {s.label}
                </div>
                <div className="text-xs" style={{ color: 'var(--lunar-text-muted)' }}>
                  {s.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Thesis statement */}
          <div
            className="p-6 rounded-xl"
            style={{
              background: 'rgba(0,212,255,0.04)',
              border: '1px solid rgba(0,212,255,0.12)',
            }}
          >
            <p className="text-lg font-medium leading-relaxed" style={{ color: 'var(--lunar-text-primary)' }}>
              &ldquo;Start with UK developers, anchor in the Netherlands, scale through German enterprise — and build an EU trust architecture that no US hyperscaler or Chinese competitor can match.&rdquo;
            </p>
            <div className="mt-2 text-xs" style={{ color: 'var(--lunar-text-muted)' }}>
              — Thomas Zijlstra, strategic thesis
            </div>
          </div>
        </div>

        {/* THE FIRST BREAKTHROUGH */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--lunar-text-muted)' }}>
              The first breakthrough
            </div>
            <div
              className="text-xs px-2 py-0.5 rounded font-mono font-bold"
              style={{ background: 'rgba(245,158,11,0.12)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.25)' }}
            >
              ASSUMPTION
            </div>
          </div>
          <p className="text-sm mb-8 max-w-2xl" style={{ color: 'var(--lunar-text-secondary)' }}>
            These are not plans — they are bets I would stake early resources on, with explicit criteria for proving or killing each one.
            Sequenced deliberately: H1 validates developer demand before H2 scales into enterprise. H3 only makes sense once H1 and H2 have produced real LOIs.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            {COMMERCIALIZATION_HYPOTHESES.map((h) => (
              <div
                key={h.id}
                className="p-5 rounded-xl flex flex-col gap-3"
                style={{
                  background: 'var(--lunar-surface)',
                  border: `1px solid ${h.color}25`,
                  borderTop: `3px solid ${h.color}`,
                }}
              >
                {/* Header */}
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs font-mono font-bold px-1.5 py-0.5 rounded"
                    style={{ background: `${h.color}18`, color: h.color, border: `1px solid ${h.color}30` }}
                  >
                    {h.id}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--lunar-text-muted)' }}>
                    {h.label}
                  </span>
                </div>
                <div className="text-sm font-bold" style={{ color: 'var(--lunar-text-primary)' }}>
                  {h.title}
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--lunar-text-secondary)' }}>
                  {h.thesis}
                </p>
                {/* Proof metric */}
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={12} className="mt-0.5 flex-shrink-0" style={{ color: '#10b981' }} />
                  <div>
                    <div className="text-xs font-semibold mb-0.5" style={{ color: '#10b981' }}>Proves it</div>
                    <div className="text-xs leading-snug" style={{ color: 'var(--lunar-text-muted)' }}>{h.proofMetric}</div>
                  </div>
                </div>
                {/* Kill signal */}
                <div className="flex items-start gap-2">
                  <XCircle size={12} className="mt-0.5 flex-shrink-0" style={{ color: '#ef4444' }} />
                  <div>
                    <div className="text-xs font-semibold mb-0.5" style={{ color: '#ef4444' }}>Exit signal</div>
                    <div className="text-xs leading-snug" style={{ color: 'var(--lunar-text-muted)' }}>{h.killSignal}</div>
                  </div>
                </div>
                {/* Non-standard angle */}
                <div className="flex items-start gap-2 pt-1" style={{ borderTop: `1px solid ${h.color}15` }}>
                  <Lightbulb size={12} className="mt-0.5 flex-shrink-0" style={{ color: '#f59e0b' }} />
                  <div>
                    <div className="text-xs font-semibold mb-0.5" style={{ color: '#f59e0b' }}>Non-standard angle</div>
                    <div className="text-xs leading-snug" style={{ color: 'var(--lunar-text-muted)' }}>{h.nonStandardAngle}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WHAT THIS DASHBOARD SHOWS */}
        <div className="mt-16">
          <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--lunar-text-muted)' }}>
            How this analysis is structured
          </div>
          <p className="text-sm mb-8" style={{ color: 'var(--lunar-text-secondary)' }}>
            Six sections. Each one is a strategic recommendation I would stake my name on.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {NAV_CARDS.map(card => (
              <Link
                key={card.href}
                href={card.href}
                className="group p-5 rounded-xl nav-card-glow"
                style={{
                  background: 'var(--lunar-surface)',
                  border: `1px solid ${card.color}25`,
                  display: 'block',
                  ['--card-glow' as string]: `${card.color}28`,
                } as React.CSSProperties}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: `${card.color}15`, border: `1px solid ${card.color}30` }}
                  >
                    <card.icon size={16} style={{ color: card.color }} />
                  </div>
                  <span className="font-semibold text-sm" style={{ color: 'var(--lunar-text-primary)' }}>
                    {card.title}
                  </span>
                  <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: card.color }} />
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--lunar-text-muted)' }}>
                  {card.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* HOW I THINK */}
        <div
          className="mt-16 p-8 rounded-xl"
          style={{ background: 'var(--lunar-surface)', border: '1px solid var(--lunar-border-subtle)' }}
        >
          <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--lunar-text-muted)' }}>
            About this analysis
          </div>
          <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--lunar-text-secondary)' }}>
            I built this interactive tool to demonstrate not just <em>what</em> I think, but <em>how</em> I think.
            Every number carries an evidence badge — <span className="font-mono text-xs px-1 rounded" style={{ background: 'rgba(0,212,255,0.1)', color: '#00d4ff' }}>FACT</span>,{' '}
            <span className="font-mono text-xs px-1 rounded" style={{ background: 'rgba(168,85,247,0.1)', color: '#a855f7' }}>MODEL</span>,{' '}
            <span className="font-mono text-xs px-1 rounded" style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b' }}>ASSUMPTION</span> — so you can interrogate the logic rather than accept conclusions.
            The 90-day plan is what I would personally execute on Day 1, not a theoretical framework.
          </p>
          <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--lunar-text-secondary)' }}>
            I built this tool — the entire interactive app — in parallel with writing the strategy content, using AI as a co-builder throughout.
            This is what AI-native work looks like: faster synthesis, instant iteration, systematic source-checking.
            It is not a slide deck generated by ChatGPT. Every hypothesis has a kill criterion. Every number has a badge.
            Every structural decision was made deliberately.
            If this is how I work <em>before</em> joining, it gives you a signal of what I would build <em>after</em>.
          </p>
          <p className="text-xs" style={{ color: 'var(--lunar-text-muted)' }}>
            This analysis does not represent Moonshot AI&apos;s internal views. It is a strategic proposal prepared independently for interview purposes. Market data sourced from public reports; all estimates clearly labelled as models or assumptions.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 flex items-center justify-between text-xs" style={{ color: 'var(--lunar-text-muted)', borderTop: '1px solid var(--lunar-border-subtle)' }}>
          <div>Thomas Zijlstra · EU Business Builder · August 2026</div>
          <div className="flex items-center gap-4">
            <Link href={`/${locale}/`} className="hover:opacity-70 transition-opacity" style={{ color: 'var(--lunar-cyan)' }}>
              Enter strategy →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
