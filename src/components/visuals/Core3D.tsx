"use client";

import { useEffect, useRef } from "react";

/**
 * Real WebGL 3D core for the hero: a glowing blue energy sphere inside a
 * rotating wireframe icosahedron shell, wrapped by tilted orbit rings with
 * traveling sparks and a surrounding particle field. Built with vanilla
 * three.js (lazy-loaded so it never blocks first paint), transparent canvas,
 * mouse parallax, pauses offscreen, and renders a single static frame for
 * users who prefer reduced motion.
 */
export function Core3D({ className = "" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const THREE = await import("three");
      if (disposed || !mountRef.current) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      /* lighter scene on touch / small screens so phones hold a steady frame rate */
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      const lowPower = coarse || window.innerWidth < 768;
      const accent = new THREE.Color("#1e88e8");
      const accentBright = new THREE.Color("#46a4ff");

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lowPower ? 1.5 : 2));
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);
      renderer.domElement.style.display = "block";
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
      camera.position.set(0, 0, 7.2);

      /* everything lives in one group so mouse parallax tilts the whole rig */
      const rig = new THREE.Group();
      scene.add(rig);

      /* lights */
      scene.add(new THREE.AmbientLight(0xffffff, 0.55));
      const keyLight = new THREE.PointLight(accentBright, 28, 30);
      keyLight.position.set(3, 3, 4);
      scene.add(keyLight);
      const rimLight = new THREE.PointLight(0xffffff, 8, 30);
      rimLight.position.set(-3, -2, 2);
      scene.add(rimLight);

      /* inner energy core */
      const coreGeo = new THREE.IcosahedronGeometry(1.05, lowPower ? 3 : 4);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x0c2f55,
        emissive: accent,
        emissiveIntensity: 0.55,
        metalness: 0.35,
        roughness: 0.3,
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      rig.add(core);

      /* wireframe shells */
      const shellGeo = new THREE.IcosahedronGeometry(1.65, 1);
      const shellMat = new THREE.MeshBasicMaterial({
        color: accent,
        wireframe: true,
        transparent: true,
        opacity: 0.32,
      });
      const shell = new THREE.Mesh(shellGeo, shellMat);
      rig.add(shell);

      const shell2Geo = new THREE.IcosahedronGeometry(1.38, 0);
      const shell2Mat = new THREE.MeshBasicMaterial({
        color: accentBright,
        wireframe: true,
        transparent: true,
        opacity: 0.16,
      });
      const shell2 = new THREE.Mesh(shell2Geo, shell2Mat);
      rig.add(shell2);

      /* soft glow halo behind the core (radial-gradient sprite) */
      const glowCanvas = document.createElement("canvas");
      glowCanvas.width = glowCanvas.height = 128;
      const gctx = glowCanvas.getContext("2d")!;
      const grad = gctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, "rgba(70, 164, 255, 0.55)");
      grad.addColorStop(0.45, "rgba(30, 136, 232, 0.22)");
      grad.addColorStop(1, "rgba(30, 136, 232, 0)");
      gctx.fillStyle = grad;
      gctx.fillRect(0, 0, 128, 128);
      const glowTex = new THREE.CanvasTexture(glowCanvas);
      const glowMat = new THREE.SpriteMaterial({
        map: glowTex,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const glow = new THREE.Sprite(glowMat);
      glow.scale.setScalar(5.6);
      rig.add(glow);

      /* tilted orbit rings with traveling sparks */
      type Ring = { group: typeof rig; sparks: { mesh: InstanceType<typeof THREE.Mesh>; offset: number }[]; radius: number; speed: number };
      const rings: Ring[] = [];
      const ringDefs = [
        { radius: 2.2, tiltX: 1.15, tiltZ: 0.25, speed: 0.35, sparks: 3 },
        { radius: 2.65, tiltX: -0.95, tiltZ: -0.45, speed: -0.25, sparks: 2 },
      ];
      const sparkGeo = new THREE.SphereGeometry(0.05, 12, 12);
      const sparkMat = new THREE.MeshBasicMaterial({ color: accentBright });
      for (const def of ringDefs) {
        const group = new THREE.Group();
        group.rotation.set(def.tiltX, 0, def.tiltZ);

        const pts: InstanceType<typeof THREE.Vector3>[] = [];
        for (let i = 0; i <= 96; i++) {
          const a = (i / 96) * Math.PI * 2;
          pts.push(new THREE.Vector3(Math.cos(a) * def.radius, 0, Math.sin(a) * def.radius));
        }
        const ringGeo = new THREE.BufferGeometry().setFromPoints(pts);
        const ringMat = new THREE.LineBasicMaterial({
          color: accent,
          transparent: true,
          opacity: 0.35,
        });
        group.add(new THREE.Line(ringGeo, ringMat));

        const sparks: Ring["sparks"] = [];
        for (let s = 0; s < def.sparks; s++) {
          const mesh = new THREE.Mesh(sparkGeo, sparkMat);
          group.add(mesh);
          sparks.push({ mesh, offset: (s / def.sparks) * Math.PI * 2 });
        }
        rig.add(group);
        rings.push({ group, sparks, radius: def.radius, speed: def.speed });
      }

      /* ambient particle field on a spherical shell */
      const particleCount = lowPower ? 180 : 320;
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        const r = 2.4 + Math.random() * 1.3;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
      }
      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const particleMat = new THREE.PointsMaterial({
        color: accentBright,
        size: 0.035,
        transparent: true,
        opacity: 0.75,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const particles = new THREE.Points(particleGeo, particleMat);
      rig.add(particles);

      /* sizing */
      const resize = () => {
        const w = mount.clientWidth || 1;
        const h = mount.clientHeight || 1;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(mount);

      /* mouse parallax (whole window so it feels alive without hovering);
         touch devices get an autonomous sway instead since there is no cursor */
      const target = { x: 0, y: 0 };
      const onPointer = (e: PointerEvent) => {
        target.x = (e.clientX / window.innerWidth - 0.5) * 2;
        target.y = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      if (!coarse) window.addEventListener("pointermove", onPointer, { passive: true });

      /* pause rendering when the canvas scrolls out of view */
      let visible = true;
      const io = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
        },
        { threshold: 0 }
      );
      io.observe(mount);

      let raf = 0;
      const clock = new THREE.Clock();
      const renderFrame = () => {
        const t = clock.getElapsedTime();

        core.rotation.y = t * 0.25;
        core.rotation.x = Math.sin(t * 0.3) * 0.15;
        const pulse = 1 + Math.sin(t * 1.6) * 0.04;
        core.scale.setScalar(pulse);
        coreMat.emissiveIntensity = 0.5 + Math.sin(t * 1.6) * 0.18;
        glow.scale.setScalar(5.6 * (1 + Math.sin(t * 1.6) * 0.05));

        shell.rotation.y = -t * 0.12;
        shell.rotation.x = t * 0.08;
        shell2.rotation.y = t * 0.2;
        shell2.rotation.z = -t * 0.1;

        particles.rotation.y = t * 0.04;
        particles.rotation.x = Math.sin(t * 0.1) * 0.1;

        for (const ring of rings) {
          ring.group.rotation.y = t * ring.speed;
          for (const spark of ring.sparks) {
            const a = t * ring.speed * 2.2 + spark.offset;
            spark.mesh.position.set(
              Math.cos(a) * ring.radius,
              0,
              Math.sin(a) * ring.radius
            );
          }
        }

        if (coarse) {
          target.x = Math.sin(t * 0.22) * 0.7;
          target.y = Math.cos(t * 0.17) * 0.5;
        }

        /* ease the rig toward the pointer (or the autonomous sway target) */
        rig.rotation.y += (target.x * 0.35 - rig.rotation.y) * 0.04;
        rig.rotation.x += (target.y * 0.25 - rig.rotation.x) * 0.04;

        renderer.render(scene, camera);
      };

      const tick = () => {
        if (visible) renderFrame();
        raf = requestAnimationFrame(tick);
      };

      if (reduce) {
        /* static, but still a fully lit 3D frame */
        renderFrame();
      } else {
        tick();
      }

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        window.removeEventListener("pointermove", onPointer);
        scene.traverse((obj) => {
          if (obj instanceof THREE.Mesh || obj instanceof THREE.Points || obj instanceof THREE.Line) {
            obj.geometry.dispose();
            const mat = obj.material;
            if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
            else mat.dispose();
          }
        });
        glowTex.dispose();
        glowMat.dispose();
        sparkGeo.dispose();
        sparkMat.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return <div ref={mountRef} aria-hidden className={`pointer-events-none ${className}`} />;
}
