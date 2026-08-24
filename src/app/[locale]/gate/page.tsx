"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "@/lib/navigation";

const PASSWORD = "EU2026";
const AUTH_KEY = "kimi-os-gate";

function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Orbs — large drifting light sources
    type Orb = { x: number; y: number; vx: number; vy: number; r: number; phase: number; cyan: boolean };
    const ORBS: Orb[] = Array.from({ length: 7 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: 180 + Math.random() * 220,
      phase: (i / 7) * Math.PI * 2,
      cyan: i % 3 !== 0,
    }));

    // Nodes — small bright dots
    type Node = { x: number; y: number; vx: number; vy: number; r: number; pulse: number; cyan: boolean };
    const NODES: Node[] = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.5 + 0.8,
      pulse: Math.random() * Math.PI * 2,
      cyan: Math.random() > 0.35,
    }));

    const CONNECT_DIST = 130;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ── Additive blending layer (orbs glow) ─────────────────
      ctx.globalCompositeOperation = "lighter";

      for (const orb of ORBS) {
        orb.x += orb.vx;
        orb.y += orb.vy;
        if (orb.x < -orb.r) orb.x = canvas.width + orb.r;
        if (orb.x > canvas.width + orb.r) orb.x = -orb.r;
        if (orb.y < -orb.r) orb.y = canvas.height + orb.r;
        if (orb.y > canvas.height + orb.r) orb.y = -orb.r;
        orb.phase += 0.004;

        const breath = 0.75 + Math.sin(orb.phase) * 0.25;
        const g = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r * breath);
        if (orb.cyan) {
          g.addColorStop(0,   "rgba(0,200,255,0.055)");
          g.addColorStop(0.4, "rgba(0,180,240,0.028)");
          g.addColorStop(1,   "transparent");
        } else {
          g.addColorStop(0,   "rgba(168,85,247,0.048)");
          g.addColorStop(0.4, "rgba(140,60,220,0.022)");
          g.addColorStop(1,   "transparent");
        }
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r * breath, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      // ── Node connections (normal blending) ──────────────────
      ctx.globalCompositeOperation = "source-over";

      for (let i = 0; i < NODES.length; i++) {
        for (let j = i + 1; j < NODES.length; j++) {
          const dx = NODES[i].x - NODES[j].x;
          const dy = NODES[i].y - NODES[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const a = (1 - dist / CONNECT_DIST) * 0.14;
            const gr = ctx.createLinearGradient(NODES[i].x, NODES[i].y, NODES[j].x, NODES[j].y);
            gr.addColorStop(0, `rgba(0,212,255,${a})`);
            gr.addColorStop(1, `rgba(168,85,247,${a})`);
            ctx.beginPath();
            ctx.moveTo(NODES[i].x, NODES[i].y);
            ctx.lineTo(NODES[j].x, NODES[j].y);
            ctx.strokeStyle = gr;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // ── Nodes with additive glow ─────────────────────────────
      ctx.globalCompositeOperation = "lighter";

      for (const n of NODES) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        n.pulse += 0.025;

        const glow = (Math.sin(n.pulse) + 1) / 2;
        const glowR = n.r * (8 + glow * 6);

        const rg = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
        if (n.cyan) {
          rg.addColorStop(0,   `rgba(0,230,255,${0.22 + glow * 0.18})`);
          rg.addColorStop(0.3, `rgba(0,180,255,${0.06 + glow * 0.06})`);
          rg.addColorStop(1,   "transparent");
        } else {
          rg.addColorStop(0,   `rgba(185,100,255,${0.18 + glow * 0.16})`);
          rg.addColorStop(0.3, `rgba(150,70,240,${0.05 + glow * 0.05})`);
          rg.addColorStop(1,   "transparent");
        }
        ctx.beginPath();
        ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = rg;
        ctx.fill();

        // Bright core
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.cyan
          ? `rgba(180,240,255,${0.6 + glow * 0.4})`
          : `rgba(220,160,255,${0.5 + glow * 0.4})`;
        ctx.fill();
      }

      // ── Central ambient glow behind card ────────────────────
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 340);
      cg.addColorStop(0,   "rgba(0,180,255,0.028)");
      cg.addColorStop(0.5, "rgba(140,60,220,0.016)");
      cg.addColorStop(1,   "transparent");
      ctx.beginPath();
      ctx.arc(cx, cy, 340, 0, Math.PI * 2);
      ctx.fillStyle = cg;
      ctx.fill();

      // ── Restore + vignette ───────────────────────────────────
      ctx.globalCompositeOperation = "source-over";
      const vig = ctx.createRadialGradient(cx, cy, canvas.height * 0.18, cx, cy, canvas.height * 0.9);
      vig.addColorStop(0, "transparent");
      vig.addColorStop(1, "rgba(3,7,14,0.78)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

export default function GatePage() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // If already authenticated, skip to cockpit
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem(AUTH_KEY) === "1") {
      router.replace("/");
    }
  }, [router]);

  const attempt = useCallback(() => {
    if (value === PASSWORD) {
      setUnlocking(true);
      localStorage.setItem(AUTH_KEY, "1");
      setTimeout(() => router.replace("/"), 900);
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setTimeout(() => setError(false), 2000);
      setValue("");
      inputRef.current?.focus();
    }
  }, [value, router]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") attempt();
  };

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center select-none"
      style={{ background: "#05090f", zIndex: 1 }}
    >
      <NeuralCanvas />

      {/* Top scanning line */}
      <div
        className="fixed top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.6) 50%, transparent 100%)",
          animation: "scan 4s linear infinite",
          zIndex: 2,
        }}
      />

      {/* Card */}
      <div
        className="relative flex flex-col items-center text-center px-10 py-12 rounded-2xl"
        style={{
          zIndex: 10,
          background: "rgba(8,14,28,0.82)",
          border: "1px solid rgba(0,212,255,0.18)",
          boxShadow: "0 0 80px rgba(0,212,255,0.07), 0 0 0 1px rgba(0,212,255,0.06)",
          backdropFilter: "blur(20px)",
          minWidth: 340,
          maxWidth: 420,
          transform: shake ? undefined : "none",
          animation: shake ? "shake 0.5s cubic-bezier(.36,.07,.19,.97)" : undefined,
        }}
      >
        {/* Kimi mark */}
        <div className="mb-6">
          <div
            className="mx-auto mb-3"
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, rgba(0,212,255,0.15) 0%, rgba(168,85,247,0.15) 100%)",
              border: "1px solid rgba(0,212,255,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 30px rgba(0,212,255,0.15)",
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                background: "linear-gradient(135deg, #00d4ff 0%, #a855f7 100%)",
                borderRadius: 7,
                opacity: 0.9,
              }}
            />
          </div>
          <div
            className="text-xs font-bold tracking-[0.25em] uppercase"
            style={{ color: "#00d4ff", letterSpacing: "0.3em" }}
          >
            MOONSHOT AI
          </div>
          <div
            className="text-xs mt-0.5 tracking-widest"
            style={{ color: "rgba(120,145,180,0.7)", letterSpacing: "0.15em" }}
          >
            KIMI EU STRATEGY OS
          </div>
        </div>

        {/* Divider */}
        <div
          className="w-full mb-7"
          style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.25), transparent)" }}
        />

        {/* Title */}
        <div
          className="text-xl font-bold mb-1"
          style={{ color: "#e8eef8", letterSpacing: "-0.01em" }}
        >
          Restricted Access
        </div>
        <div
          className="text-xs mb-8 leading-relaxed"
          style={{ color: "rgba(120,145,180,0.75)", maxWidth: 260 }}
        >
          Confidential strategy analysis prepared for Moonshot AI. Enter your access code to continue.
        </div>

        {/* Input */}
        <div className="w-full mb-4">
          <input
            ref={inputRef}
            type="password"
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(false); }}
            onKeyDown={onKey}
            placeholder="Access code"
            autoComplete="off"
            autoFocus
            className="w-full text-center text-sm font-mono rounded-xl px-4 py-3 outline-none transition-all"
            style={{
              background: error ? "rgba(239,68,68,0.07)" : "rgba(0,212,255,0.04)",
              border: error
                ? "1px solid rgba(239,68,68,0.45)"
                : "1px solid rgba(0,212,255,0.2)",
              color: error ? "#ef4444" : "#e8eef8",
              boxShadow: error
                ? "0 0 16px rgba(239,68,68,0.12)"
                : "0 0 0 transparent",
              letterSpacing: "0.2em",
              caretColor: "#00d4ff",
            }}
          />
          {error && (
            <div
              className="mt-2 text-xs text-center"
              style={{ color: "rgba(239,68,68,0.8)" }}
            >
              Incorrect access code
            </div>
          )}
        </div>

        {/* Button */}
        <button
          onClick={attempt}
          disabled={unlocking}
          className="w-full py-3 rounded-xl text-sm font-semibold tracking-wide transition-all"
          style={{
            background: unlocking
              ? "linear-gradient(135deg, rgba(0,212,255,0.3) 0%, rgba(168,85,247,0.3) 100%)"
              : "linear-gradient(135deg, rgba(0,212,255,0.18) 0%, rgba(168,85,247,0.18) 100%)",
            border: "1px solid rgba(0,212,255,0.3)",
            color: "#00d4ff",
            boxShadow: "0 0 20px rgba(0,212,255,0.08)",
            letterSpacing: "0.08em",
          }}
        >
          {unlocking ? "UNLOCKING ···" : "ENTER"}
        </button>

        {/* Footer */}
        <div
          className="mt-8 text-xs"
          style={{ color: "rgba(90,110,145,0.6)", letterSpacing: "0.05em" }}
        >
          Prepared by Thomas Zijlstra · August 2026
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes shake {
          10%, 90% { transform: translateX(-2px); }
          20%, 80% { transform: translateX(4px); }
          30%, 50%, 70% { transform: translateX(-6px); }
          40%, 60% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}
