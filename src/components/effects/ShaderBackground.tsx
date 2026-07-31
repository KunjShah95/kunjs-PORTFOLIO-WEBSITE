import { useEffect, useRef } from 'react'
import { clsx } from 'clsx'

/**
 * ShaderBackground — a real WebGL fragment shader.
 *
 * Domain-warped fBm noise produces a slow aurora/flow field, tinted toward the
 * site accent over the paper background. Colors are read live from the CSS
 * design tokens (--accent / --bg-paper / --bg-elevated), so the same shader
 * adapts to light and dark themes without any prop wiring.
 *
 * Guardrails:
 *  - honors prefers-reduced-motion (renders one static frame, no rAF loop)
 *  - pauses when the section scrolls out of view (IntersectionObserver)
 *  - pauses when the tab is hidden (visibilitychange)
 *  - device-pixel-ratio capped at 1.5 to protect mobile GPUs
 *  - graceful no-op if WebGL is unavailable (CSS fallback shows through)
 *
 * Runs entirely outside React state — no re-renders per frame.
 */

interface ShaderBackgroundProps {
  className?: string
  /** Overall strength of the effect, 0–1. Kept low in light mode for contrast. */
  intensity?: number
}

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

const FRAG = `
precision mediump float;

uniform vec2  u_res;
uniform float u_time;
uniform vec3  u_accent;
uniform vec3  u_paper;
uniform vec3  u_elevated;
uniform float u_intensity;

// --- value noise + fbm ------------------------------------------------------
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 5; i++) {
    v += amp * noise(p);
    p *= 2.02;
    amp *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  // aspect-correct so blobs stay round
  vec2 p = uv;
  p.x *= u_res.x / u_res.y;

  float t = u_time * 0.04;

  // domain warp — two fbm layers feeding a third gives the flowing aurora look
  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, -t)));
  vec2 r = vec2(fbm(p + 1.5 * q + vec2(1.7, 9.2) + 0.15 * t),
                fbm(p + 1.5 * q + vec2(8.3, 2.8) - 0.12 * t));
  float f = fbm(p + 2.0 * r);

  // shape the field into soft bands
  float band = smoothstep(0.15, 0.95, f);

  // base is the paper, lifted slightly toward elevated in the brighter zones
  vec3 col = mix(u_paper, u_elevated, band * 0.6);

  // accent glow concentrated in the upper field, feathered by the warp
  float glow = pow(band, 1.6) * smoothstep(1.15, 0.15, uv.y);
  col = mix(col, u_accent, glow * u_intensity);

  // faint second accent vein from r for depth
  float vein = smoothstep(0.55, 0.9, r.x + r.y) * 0.5;
  col = mix(col, u_accent, vein * u_intensity * 0.4);

  // radial vignette so edges settle back into the page
  vec2 c = uv - 0.5;
  float vig = smoothstep(0.9, 0.35, length(c));
  col = mix(u_paper, col, 0.35 + 0.65 * vig);

  gl_FragColor = vec4(col, 1.0);
}
`

function readToken(styles: CSSStyleDeclaration, name: string): [number, number, number] {
  // tokens are stored as "r g b" (space separated, 0–255)
  const raw = styles.getPropertyValue(name).trim()
  const parts = raw.split(/[\s,]+/).map(Number)
  if (parts.length >= 3 && parts.every((n) => !Number.isNaN(n))) {
    return [parts[0] / 255, parts[1] / 255, parts[2] / 255]
  }
  return [0, 0, 0]
}

export function ShaderBackground({ className, intensity = 0.5 }: ShaderBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl =
      (canvas.getContext('webgl', { antialias: false, alpha: true, premultipliedAlpha: false }) as WebGLRenderingContext | null) ||
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null)
    if (!gl) return // no WebGL → CSS fallback shows through

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // --- compile ------------------------------------------------------------
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
    gl.useProgram(prog)

    // fullscreen triangle
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const u_res = gl.getUniformLocation(prog, 'u_res')
    const u_time = gl.getUniformLocation(prog, 'u_time')
    const u_accent = gl.getUniformLocation(prog, 'u_accent')
    const u_paper = gl.getUniformLocation(prog, 'u_paper')
    const u_elevated = gl.getUniformLocation(prog, 'u_elevated')
    const u_intensity = gl.getUniformLocation(prog, 'u_intensity')

    const pushColors = () => {
      const styles = getComputedStyle(document.documentElement)
      gl.uniform3fv(u_accent, readToken(styles, '--accent'))
      gl.uniform3fv(u_paper, readToken(styles, '--bg-paper'))
      gl.uniform3fv(u_elevated, readToken(styles, '--bg-elevated'))
      gl.uniform1f(u_intensity, intensity)
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const resize = () => {
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr))
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
      gl.uniform2f(u_res, w, h)
    }

    let raf = 0
    let start = performance.now()
    let visible = true
    let running = false

    const frame = (now: number) => {
      resize()
      gl.uniform1f(u_time, (now - start) / 1000)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      raf = requestAnimationFrame(frame)
    }

    const renderOnce = () => {
      resize()
      pushColors()
      gl.uniform1f(u_time, 8.0) // frozen but interesting frame
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const play = () => {
      if (running || reduce) return
      running = true
      start = performance.now()
      raf = requestAnimationFrame(frame)
    }
    const pause = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    pushColors()

    if (reduce) {
      renderOnce()
    } else {
      play()
    }

    // pause when scrolled out of view
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible && !document.hidden) play()
        else pause()
      },
      { threshold: 0 },
    )
    io.observe(canvas)

    // pause when tab hidden
    const onVis = () => {
      if (document.hidden) pause()
      else if (visible) play()
    }
    document.addEventListener('visibilitychange', onVis)

    // re-read tokens on theme flip
    const themeObserver = new MutationObserver(() => {
      pushColors()
      if (reduce || !running) renderOnce()
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    const onResize = () => resize()
    window.addEventListener('resize', onResize)

    return () => {
      pause()
      io.disconnect()
      themeObserver.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('resize', onResize)
      gl.deleteProgram(prog)
      gl.deleteBuffer(buf)
    }
  }, [intensity])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={clsx('absolute inset-0 h-full w-full pointer-events-none', className)}
    />
  )
}
