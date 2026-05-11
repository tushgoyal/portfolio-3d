import * as THREE from "three";
import { RGBELoader } from "three-stdlib";
import { gsap } from "gsap";

const setLighting = (scene: THREE.Scene) => {
  // Enhanced directional lighting for professional appearance
  const directionalLight = new THREE.DirectionalLight(0x6366f1, 0); // Modern indigo tone
  directionalLight.intensity = 0;
  directionalLight.position.set(-0.3, -0.2, -1.2); // Adjusted for better face lighting
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2048; // Higher quality shadows
  directionalLight.shadow.mapSize.height = 2048;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 50;
  directionalLight.shadow.bias = -0.0001; // Reduce shadow acne
  scene.add(directionalLight);

  // Accent lighting with tech-inspired colors
  const pointLight = new THREE.PointLight(0x3b82f6, 0, 100, 2.5); // Tech blue accent
  pointLight.position.set(3, 12, 4);
  pointLight.castShadow = true;
  scene.add(pointLight);
  
  // Add rim lighting for professional edge lighting effect
  const rimLight = new THREE.DirectionalLight(0x8b5cf6, 0.3); // Purple rim light
  rimLight.position.set(2, 8, -5);
  rimLight.intensity = 0;
  scene.add(rimLight);

  new RGBELoader()
    .setPath("/models/")
    .load("char_enviorment.hdr?v=2", function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
      scene.environmentIntensity = 0;
      scene.environmentRotation.set(5.76, 85.85, 1);
    });

  function setPointLight(screenLight: any) {
    if (screenLight.material.opacity > 0.9) {
      pointLight.intensity = screenLight.material.emissiveIntensity * 20;
    } else {
      pointLight.intensity = 0;
    }
  }
  const duration = 2;
  const ease = "power2.inOut";
  function turnOnLights() {
    gsap.to(scene, {
      environmentIntensity: 0.7, // Slightly brighter environment
      duration: duration,
      ease: ease,
    });
    gsap.to(directionalLight, {
      intensity: 1.2, // Brighter main light for professional look
      duration: duration,
      ease: ease,
    });
    // Animate rim light for dramatic effect
    gsap.to(rimLight, {
      intensity: 0.4,
      duration: duration * 1.5,
      ease: ease,
      delay: 0.5,
    });
    gsap.to(".character-rim", {
      y: "55%",
      opacity: 1,
      delay: 0.2,
      duration: 2,
    });
  }

  return { setPointLight, turnOnLights, rimLight };
};

export default setLighting;
