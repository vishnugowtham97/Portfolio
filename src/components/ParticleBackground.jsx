import { useEffect, useRef } from "react";
import config from "../config/particles-config.json";

const ParticleBackground = (containerRef) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mousePosition = useRef({ x: null, y: null });
  const animationFrameId = useRef(null);

  useEffect(() => {
  if (!containerRef || !containerRef.current ) return ;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const opts = config.particles;

    // Set canvas size to container's size
  const setCanvasSize = () => {
  const rect = containerRef.current.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
  canvas.style.position = "absolute";
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = -1;
};

    setCanvasSize();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = opts.size.random ? Math.random() * opts.size.value : opts.size.value;
        this.color = opts.color.value;
        this.opacity = opts.opacity.value;
        this.speedX = (Math.random() - 0.5) * opts.move.speed;
        this.speedY = (Math.random() - 0.5) * opts.move.speed;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
    }

    if (particlesRef.current.length === 0) {
      for (let i = 0; i < opts.number.value; i++) {
        particlesRef.current.push(new Particle());
      }
    }

    const drawLine = (x1, y1, x2, y2, color, opacity, width) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = color;
      ctx.globalAlpha = opacity;
      ctx.lineWidth = width;
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;

      particles.forEach((p, i) => {
        p.update();
        p.draw();

        if (opts.line_linked.enable) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < opts.line_linked.distance) {
              drawLine(p.x, p.y, p2.x, p2.y, opts.line_linked.color, opts.line_linked.opacity, opts.line_linked.width);
            }
          }
        }

        if (mousePosition.current.x !== null && mousePosition.current.y !== null) {
          const distMouse = Math.hypot(p.x - mousePosition.current.x, p.y - mousePosition.current.y);
          const grabDistance = 150;
          if (distMouse < grabDistance) {
            drawLine(p.x, p.y, mousePosition.current.x, mousePosition.current.y, opts.line_linked.color, 1, opts.line_linked.width);
          }
        }
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    // Mouse events relative to container
    const onMouseMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      mousePosition.current.x = e.clientX - rect.left;
      mousePosition.current.y = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mousePosition.current.x = null;
      mousePosition.current.y = null;
    };

    const onClick = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      for (let i = 0; i < 4; i++) {
        const p = new Particle();
        p.x = e.clientX - rect.left + (Math.random() * 20 - 10);
        p.y = e.clientY - rect.top + (Math.random() * 20 - 10);
        particlesRef.current.push(p);
      }
    };

    const onResize = () => {
      setCanvasSize();
    };

    const container = containerRef.current;

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);
    container.addEventListener("click", onClick);
    window.addEventListener("resize", onResize);

    return () => {
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      container.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [containerRef]);

  return <canvas ref={canvasRef} />;
};

export default ParticleBackground;
