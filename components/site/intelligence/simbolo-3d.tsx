"use client";

import { useEffect, useRef, useState } from "react";

/**
 * O símbolo da Nexo reconstruído em 3D: os três nós e as três arestas do logo,
 * nas mesmas proporções do SVG (viewBox 40×40, nós r=5.5, traço 2.5).
 * O three.js só é baixado no cliente, depois da primeira pintura.
 */

// Coordenadas do logo (logo.tsx) centralizadas no baricentro e divididas por 10.
const CY = (8 + 30 + 30) / 3;
const NOS_2D = [
  { x: 20, y: 8, cor: "#2ee88f" }, // superior, menta
  { x: 9, y: 30, cor: "#2ee88f" }, // inferior esquerdo, menta
  { x: 31, y: 30, cor: "#ffc53d" }, // inferior direito, sol
] as const;
const ARESTAS_2D = [
  { de: 0, para: 1, cor: "#2ee88f" },
  { de: 0, para: 2, cor: "#ffc53d" },
  { de: 1, para: 2, cor: "#f4f6ff" },
] as const;
const RAIO_NO = 0.55;
const RAIO_ARESTA = 0.13;
// O baricentro fica abaixo do centro da caixa do triângulo; a câmera mira o centro visual.
const CENTRO_Y = 0.36;

type Estado = "carregando" | "pronto" | "sem-webgl";

function temWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Versão estática (poster enquanto carrega e fallback sem WebGL). */
export function SimboloPlano({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <defs>
        {NOS_2D.map((n, i) => (
          <radialGradient key={i} id={`no-plano-${i}`} cx="38%" cy="32%" r="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="35%" stopColor={n.cor} />
            <stop offset="100%" stopColor={n.cor} stopOpacity="0.85" />
          </radialGradient>
        ))}
      </defs>
      {ARESTAS_2D.map((a, i) => (
        <line
          key={i}
          x1={NOS_2D[a.de].x}
          y1={NOS_2D[a.de].y}
          x2={NOS_2D[a.para].x}
          y2={NOS_2D[a.para].y}
          stroke={a.cor}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      ))}
      {NOS_2D.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r="5.5" fill={`url(#no-plano-${i})`} />
      ))}
    </svg>
  );
}

export function Simbolo3D({ className }: { className?: string }) {
  const hospedeiro = useRef<HTMLDivElement>(null);
  const [estado, setEstado] = useState<Estado>("carregando");

  useEffect(() => {
    const el = hospedeiro.current;
    if (!el) return;
    let cancelado = false;
    let limpar: (() => void) | undefined;

    (async () => {
      await Promise.resolve();
      if (cancelado) return;
      if (!temWebGL()) {
        setEstado("sem-webgl");
        return;
      }
      let THREE: typeof import("three");
      let RoomEnvironment: typeof import("three/examples/jsm/environments/RoomEnvironment.js").RoomEnvironment;
      try {
        THREE = await import("three");
        ({ RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js"));
      } catch {
        if (!cancelado) setEstado("sem-webgl");
        return;
      }
      if (cancelado) return;

      const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const toque = window.matchMedia("(hover: none)").matches;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      } catch {
        setEstado("sem-webgl");
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.NeutralToneMapping;
      renderer.toneMappingExposure = 1.05;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.domElement.setAttribute("aria-hidden", "true");
      renderer.domElement.style.display = "block";
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      el.appendChild(renderer.domElement);

      const cena = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      const ambiente = new RoomEnvironment();
      const envMap = pmrem.fromScene(ambiente, 0.04).texture;
      cena.environment = envMap;
      cena.environmentIntensity = 0.8;

      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
      const CAMERA_Z = 9.2;
      camera.position.set(0, 0, reduzir ? CAMERA_Z : CAMERA_Z + 3);

      // Luzes: chave que segue o cursor, contorno cobalto por trás, preenchimento frio.
      const chave = new THREE.DirectionalLight("#ffffff", 2.4);
      chave.position.set(3, 4, 6);
      chave.castShadow = true;
      chave.shadow.mapSize.set(1024, 1024);
      chave.shadow.radius = 6;
      chave.shadow.bias = -0.0004;
      chave.shadow.camera.left = -4;
      chave.shadow.camera.right = 4;
      chave.shadow.camera.top = 4;
      chave.shadow.camera.bottom = -4;
      cena.add(chave);

      const contorno = new THREE.DirectionalLight("#5b78ff", 3.2);
      contorno.position.set(-4, 2, -5);
      cena.add(contorno);

      const cursorLuz = new THREE.PointLight("#dfe6ff", 14, 12, 2);
      cursorLuz.position.set(0, 0, 4);
      cena.add(cursorLuz);

      cena.add(new THREE.HemisphereLight("#b9c8ff", "#060c33", 0.35));

      const grupo = new THREE.Group();
      const pivo = new THREE.Group(); // recebe a rotação do cursor
      pivo.add(grupo);
      cena.add(pivo);

      const pontos = NOS_2D.map((n) => new THREE.Vector3((n.x - 20) / 10, -(n.y - CY) / 10, 0));

      const geoNo = new THREE.SphereGeometry(RAIO_NO, 96, 64);
      const materiais: import("three").Material[] = [];
      const geometrias: import("three").BufferGeometry[] = [geoNo];

      const nos = NOS_2D.map((n, i) => {
        const mat = new THREE.MeshPhysicalMaterial({
          color: n.cor,
          roughness: 0.2,
          metalness: 0.38,
          clearcoat: 1,
          clearcoatRoughness: 0.06,
          specularIntensity: 1,
          emissive: new THREE.Color(n.cor),
          emissiveIntensity: 0.0,
        });
        materiais.push(mat);
        const malha = new THREE.Mesh(geoNo, mat);
        malha.position.copy(pontos[i]);
        malha.castShadow = true;
        malha.receiveShadow = true;
        malha.scale.setScalar(reduzir ? 1 : 0.0001);
        grupo.add(malha);
        return malha;
      });

      const arestas = ARESTAS_2D.map((a) => {
        const inicio = pontos[a.de];
        const fim = pontos[a.para];
        const direcao = new THREE.Vector3().subVectors(fim, inicio);
        const comprimento = direcao.length();
        const geo = new THREE.CylinderGeometry(RAIO_ARESTA, RAIO_ARESTA, comprimento, 40, 1, false);
        geo.translate(0, comprimento / 2, 0); // cresce a partir do nó de origem
        geometrias.push(geo);
        const mat = new THREE.MeshPhysicalMaterial({
          color: a.cor,
          roughness: 0.18,
          metalness: 0.55,
          clearcoat: 1,
          clearcoatRoughness: 0.2,
        });
        materiais.push(mat);
        const malha = new THREE.Mesh(geo, mat);
        malha.position.copy(inicio);
        malha.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direcao.normalize());
        malha.castShadow = true;
        malha.receiveShadow = true;
        malha.scale.set(1, reduzir ? 1 : 0.0001, 1);
        grupo.add(malha);
        return malha;
      });

      // Estado de interação, sempre interpolado (nada salta).
      const alvo = { x: 0, y: 0, perto: 0 };
      const atual = { x: 0, y: 0, perto: 0 };
      let noSobre = -1;
      const raycaster = new THREE.Raycaster();
      const ponteiroNDC = new THREE.Vector2(9, 9);

      function aoMoverJanela(e: PointerEvent) {
        alvo.x = (e.clientX / window.innerWidth) * 2 - 1;
        alvo.y = -((e.clientY / window.innerHeight) * 2 - 1);
        const r = el!.getBoundingClientRect();
        const dentro = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
        alvo.perto = dentro ? 1 : 0;
        ponteiroNDC.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
        if (reduzir) desenhar();
      }
      function aoSairJanela() {
        alvo.x = 0;
        alvo.y = 0;
        alvo.perto = 0;
        ponteiroNDC.set(9, 9);
      }
      window.addEventListener("pointermove", aoMoverJanela, { passive: true });
      document.documentElement.addEventListener("pointerleave", aoSairJanela);

      function redimensionar() {
        const { width, height } = el!.getBoundingClientRect();
        if (width === 0 || height === 0) return;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        // Em telas estreitas a câmera recua para o símbolo caber inteiro.
        camera.updateProjectionMatrix();
        if (reduzir) desenhar();
      }
      const ro = new ResizeObserver(redimensionar);
      ro.observe(el);
      redimensionar();

      const inicioTempo = performance.now();
      const easeSaida = (t: number) => 1 - Math.pow(2, -10 * Math.min(1, Math.max(0, t)));
      const easeVolta = (t: number) => {
        const c = Math.min(1, Math.max(0, t));
        const s = 1.4;
        return 1 + (s + 1) * Math.pow(c - 1, 3) + s * Math.pow(c - 1, 2);
      };

      let ultimo = performance.now();
      function desenhar() {
        const agora = performance.now();
        const dt = Math.min(0.05, (agora - ultimo) / 1000);
        ultimo = agora;
        const t = (agora - inicioTempo) / 1000;

        // Entrada: nós surgem em sequência, arestas crescem a partir deles, câmera se aproxima.
        if (!reduzir) {
          nos.forEach((m, i) => m.scale.setScalar(Math.max(0.0001, easeVolta((t - 0.15 - i * 0.12) / 0.7))));
          arestas.forEach((m, i) => m.scale.set(1, Math.max(0.0001, easeSaida((t - 0.6 - i * 0.1) / 0.9)), 1));
        }

        const k = 1 - Math.pow(0.0015, dt); // amortecimento independente de fps
        atual.x += (alvo.x - atual.x) * k;
        atual.y += (alvo.y - atual.y) * k;
        atual.perto += (alvo.perto - atual.perto) * k * 0.8;

        const forca = reduzir ? 0.35 : 1;
        const deriva = toque && !reduzir ? Math.sin(t * 0.35) * 0.35 : 0;
        pivo.rotation.y = (atual.x * 0.6 + deriva) * forca;
        pivo.rotation.x = -atual.y * 0.38 * forca;
        pivo.position.x = atual.x * 0.18 * forca;
        pivo.position.y = atual.y * 0.12 * forca + (reduzir ? 0 : Math.sin(t * 0.9) * 0.06);
        grupo.rotation.z = reduzir ? 0 : Math.sin(t * 0.6) * 0.02;

        const entradaCamera = reduzir ? 1 : easeSaida(t / 1.8);
        camera.position.z = CAMERA_Z + 3 * (1 - entradaCamera) - atual.perto * 0.7;
        camera.position.y = CENTRO_Y;
        camera.lookAt(0, CENTRO_Y, 0);

        cursorLuz.position.set(atual.x * 4.5, atual.y * 3.2, 3.6);
        chave.position.set(3 + atual.x * 1.5, 4 + atual.y, 6);

        // Nó sob o cursor ganha volume e um brilho contido.
        raycaster.setFromCamera(ponteiroNDC, camera);
        const acerto = raycaster.intersectObjects(nos, false)[0];
        noSobre = acerto ? nos.indexOf(acerto.object as (typeof nos)[number]) : -1;
        if (!reduzir && t > 1.2) {
          nos.forEach((m, i) => {
            const desejado = i === noSobre ? 1.12 : 1;
            m.scale.setScalar(m.scale.x + (desejado - m.scale.x) * k);
          });
        }
        nos.forEach((m, i) => {
          const mat = m.material as import("three").MeshPhysicalMaterial;
          const desejado = i === noSobre ? 0.16 : 0;
          mat.emissiveIntensity += (desejado - mat.emissiveIntensity) * k;
        });

        renderer.render(cena, camera);
      }

      let raf = 0;
      let visivel = true;
      let abaVisivel = !document.hidden;
      function laco() {
        desenhar();
        raf = requestAnimationFrame(laco);
      }
      function sincronizarLaco() {
        cancelAnimationFrame(raf);
        raf = 0;
        if (!reduzir && visivel && abaVisivel) {
          ultimo = performance.now();
          raf = requestAnimationFrame(laco);
        }
      }
      const io = new IntersectionObserver(([entrada]) => {
        visivel = entrada.isIntersecting;
        sincronizarLaco();
      });
      io.observe(el);
      function aoMudarAba() {
        abaVisivel = !document.hidden;
        sincronizarLaco();
      }
      document.addEventListener("visibilitychange", aoMudarAba);

      desenhar();
      sincronizarLaco();
      setEstado("pronto");

      limpar = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        window.removeEventListener("pointermove", aoMoverJanela);
        document.documentElement.removeEventListener("pointerleave", aoSairJanela);
        document.removeEventListener("visibilitychange", aoMudarAba);
        geometrias.forEach((g) => g.dispose());
        materiais.forEach((m) => m.dispose());
        envMap.dispose();
        pmrem.dispose();
        ambiente.traverse((o) => {
          const malha = o as import("three").Mesh;
          if (malha.geometry) malha.geometry.dispose();
          const mat = malha.material as import("three").Material | import("three").Material[] | undefined;
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat?.dispose();
        });
        renderer.dispose();
        renderer.forceContextLoss();
        renderer.domElement.remove();
      };
    })();

    return () => {
      cancelado = true;
      limpar?.();
    };
  }, []);

  return (
    <div
      className={`relative ${className ?? ""}`}
      role="img"
      aria-label="Símbolo da Nexo em três dimensões: três nós conectados em triângulo"
    >
      <SimboloPlano
        className={`absolute left-1/2 top-1/2 h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 ${
          estado === "pronto" ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        ref={hospedeiro}
        className={`absolute inset-0 transition-opacity duration-700 ${estado === "pronto" ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
