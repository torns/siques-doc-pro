export default (window) => {
  const canvas = document.getElementById('canv')
  const ctx = canvas.getContext('2d')

  const RESOLUTION = 1

  let w = (canvas.width = window.innerWidth * RESOLUTION)
  let h = (canvas.height = window.innerHeight * RESOLUTION - 200)

  const PARTICLE_COUNT = 150
  let CONNECT_DISTANCE = w * 0.05
  let FORCE_DISTANCE = w * 0.1

  if (w < 500) {
    CONNECT_DISTANCE = w * 0.17
    FORCE_DISTANCE = w * 0.3
  }
  const r = (n = 1) => Math.random() * n
  const PI = Math.PI
  const TAU = PI * 2

  let time = new Date()

  const lerp = (start, end, amt) => {
    return (1 - amt) * start + amt * end
  }

  const distance = (x1, y1, x2, y2) => {
    const a = x1 - x2
    const b = y1 - y2
    return Math.sqrt(a * a + b * b)
  }

  const angle = (cx, cy, ex, ey) => {
    return Math.atan2(ey - cy, ex - cx)
  }

  const particlePrototype = () => ({
    x: w * 0.5 + Math.cos(r(TAU)) * r(w * 0.5),
    y: h * 0.5 + Math.sin(r(TAU)) * r(h * 0.5),
    angle: r(TAU),
    speed: r(0.15),
    normalSpeed: r(0.15),
    oscAmplitudeX: r(2),
    oscSpeedX: 0.001 + r(0.008),
    oscAmplitudeY: r(2),
    oscSpeedY: 0.001 + r(0.008),
    connectDistance: r(CONNECT_DISTANCE),
    color: {
      r: Math.round(200 + r(55)),
      g: Math.round(150 + r(105)),
      b: Math.round(200 + r(55))
    }
  })

  const particles = new Array(PARTICLE_COUNT).fill({}).map(particlePrototype)

  const update = () => {
    particles.forEach((p1) => {
      p1.x += (Math.cos(p1.angle) + Math.cos(time * p1.oscSpeedX) * p1.oscAmplitudeX) * p1.speed
      p1.y += (Math.sin(p1.angle) + Math.cos(time * p1.oscSpeedY) * p1.oscAmplitudeY) * p1.speed

      p1.speed = lerp(p1.speed, p1.normalSpeed * RESOLUTION, 0.1)

      if (p1.x > w || p1.x < 0) {
        p1.angle = PI - p1.angle
      }
      if (p1.y > h || p1.y < 0) {
        p1.angle = -p1.angle
      }

      if (r() < 0.005) p1.oscAmplitudeX = r(2)
      if (r() < 0.005) p1.oscSpeedX = 0.001 + r(0.008)
      if (r() < 0.005) p1.oscAmplitudeY = r(2)
      if (r() < 0.005) p1.oscSpeedY = 0.001 + r(0.008)

      p1.x = Math.max(-0.01, Math.min(p1.x, w + 0.01))
      p1.y = Math.max(-0.01, Math.min(p1.y, h + 0.01))
    })
  }

  const render = () => {
    ctx.clearRect(0, 0, w, h)

    particles.map((p1) => {
      particles
        .filter((p2) => {
          if (p1 === p2) return false
          if (distance(p1.x, p1.y, p2.x, p2.y) > p1.connectDistance) return false
          return true
        })
        .map((p2) => {
          const dist = distance(p1.x, p1.y, p2.x, p2.y)
          p1.speed = lerp(p1.speed, p1.speed + (0.05 / p1.connectDistance) * dist, 0.2)
          return {
            p1,
            p2,
            color: p1.color,
            opacity: Math.floor((100 / p1.connectDistance) * (p1.connectDistance - dist)) / 100
          }
        })
        .forEach((line, i) => {
          const colorSwing = Math.sin(time * line.p1.oscSpeedX)
          ctx.beginPath()
          ctx.globalAlpha = line.opacity
          ctx.moveTo(line.p1.x, line.p1.y)
          ctx.lineTo(line.p2.x, line.p2.y)
          ctx.strokeStyle = `rgb(
					${Math.floor(line.color.r * colorSwing)},
					${Math.floor(line.color.g * 0.5 + line.color.g * 0.5 * colorSwing)},
					${line.color.b}
				)`
          ctx.lineWidth = line.opacity * 4
          ctx.stroke()
          ctx.closePath()
        })
    })
  }

  const loop = () => {
    time = new Date()
    update()
    render()
    const stop = window.requestAnimationFrame(loop)

    const canvas = document.getElementById('canv')
    if (canvas == null) cancelAnimationFrame(stop)
  }

  loop()

  window.addEventListener('mousemove', (e) => {
    const mouseX = e.layerX * RESOLUTION
    const mouseY = e.layerY * RESOLUTION

    particles.forEach((p) => {
      const dist = distance(mouseX, mouseY, p.x, p.y)

      if (dist < FORCE_DISTANCE && dist > 0) {
        p.angle = angle(mouseX, mouseY, p.x, p.y)
        const force = (FORCE_DISTANCE - dist) * 0.1
        p.speed = lerp(p.speed, force, 0.2)
      }
    })
  })

  window.addEventListener('resize', (e) => {
    w = canvas.width = window.innerWidth * RESOLUTION
    h = canvas.height = window.innerHeight * RESOLUTION - 200
  })
}
