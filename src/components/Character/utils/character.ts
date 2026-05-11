import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc?v=2",
          "MyCharacter12"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;

                // Customize character appearance for Tushar's unique look
                if (mesh.material) {
                  // Professional shirt in tech blue
                  if (mesh.name === "BODY.SHIRT") {
                    const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                    newMat.color = new THREE.Color("#1e40af"); // Professional blue
                    newMat.roughness = 0.3; // Slightly glossy professional look
                    newMat.metalness = 0.1;
                    mesh.material = newMat;
                  } 
                  // Dark professional pants
                  else if (mesh.name === "Pant") {
                    const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                    newMat.color = new THREE.Color("#1f2937"); // Dark gray professional
                    newMat.roughness = 0.4;
                    mesh.material = newMat;
                  }
                  // Add shoes customization
                  else if (mesh.name.includes("shoe") || mesh.name.includes("Shoe")) {
                    const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                    newMat.color = new THREE.Color("#0f172a"); // Professional black shoes
                    newMat.roughness = 0.2;
                    newMat.metalness = 0.3; // Slight shine
                    mesh.material = newMat;
                  }
                  // Skin tone adjustment for more realistic look
                  else if (mesh.name.includes("skin") || mesh.name.includes("face") || mesh.name.includes("hand")) {
                    const newMat = (mesh.material as THREE.Material).clone() as THREE.MeshStandardMaterial;
                    newMat.roughness = 0.6; // Natural skin texture
                    newMat.metalness = 0.0;
                    mesh.material = newMat;
                  }
                }

                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            // Adjust character stance for confident professional posture
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            
            // Add subtle character positioning adjustments
            if (character!.getObjectByName("spine")) {
              character!.getObjectByName("spine")!.rotation.x += 0.02; // Slight forward lean (confident)
            }
            
            // Adjust hand positioning for a more relaxed professional stance
            const leftHand = character!.getObjectByName("handL");
            const rightHand = character!.getObjectByName("handR");
            if (leftHand) leftHand.rotation.z += 0.1;
            if (rightHand) rightHand.rotation.z -= 0.1;

            // Monitor scale is handled by GsapScroll.ts animations

            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
