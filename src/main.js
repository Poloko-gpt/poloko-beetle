import * as THREE from 'three';

const sceneRoot = document.querySelector('#scene');

const moodNode = document.querySelector('#mood');
const energyNode = document.querySelector('#energy');
const hungerNode = document.querySelector('#hunger');
const loveNode = document.querySelector('#love');
const feedButton = document.querySelector('#feed');
const petButton = document.querySelector('#pet');
const sleepButton = document.querySelector('#sleep');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xa9d7ff);
scene.fog = new THREE.Fog(0xa9d7ff, 14, 38);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 2.8, 9.5);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
sceneRoot.appendChild(renderer.domElement);

const ambient = new THREE.HemisphereLight(0xf3fbff, 0x3a5f2d, 1.35);
scene.add(ambient);

const sun = new THREE.DirectionalLight(0xfff2c6, 1.35);
sun.position.set(5, 8, 6);
sun.castShadow = true;
sun.shadow.mapSize.width = 1024;
sun.shadow.mapSize.height = 1024;
scene.add(sun);

const ground = new THREE.Mesh(
  new THREE.CircleGeometry(9, 64),
  new THREE.MeshStandardMaterial({ color: 0x79c56a, roughness: 0.9, metalness: 0.05 })
);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -1.2;
ground.receiveShadow = true;
scene.add(ground);

const sparkleGroup = new THREE.Group();
scene.add(sparkleGroup);

for (let i = 0; i < 26; i += 1) {
  const orb = new THREE.Mesh(
    new THREE.SphereGeometry(0.08, 12, 12),
    new THREE.MeshStandardMaterial({
      color: i % 2 === 0 ? 0xfff3b0 : 0xa7ef8d,
      emissive: i % 2 === 0 ? 0xffd870 : 0x74d4a2,
      emissiveIntensity: 0.32,
    })
  );
  orb.position.set(
    (Math.random() - 0.5) * 12,
    0.8 + Math.random() * 4,
    (Math.random() - 0.5) * 12
  );
  orb.userData = {
    offset: Math.random() * Math.PI * 2,
    speed: 0.8 + Math.random() * 1.5,
    distance: 0.5 + Math.random() * 1.2,
  };
  sparkleGroup.add(orb);
}

const littleFlower = (x, z, color) => {
  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.02, 0.02, 0.5, 8),
    new THREE.MeshStandardMaterial({ color: 0x2b8a3e })
  );
  stem.position.set(x, -0.95, z);

  const bloom = new THREE.Mesh(
    new THREE.SphereGeometry(0.14, 16, 16),
    new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.18 })
  );
  bloom.position.set(x, -0.65, z);
  bloom.scale.set(1.4, 1.1, 1.4);

  scene.add(stem, bloom);
};

['#f7c35c', '#ff8ea7', '#b1f0ff', '#a7ef8d'].forEach((color, i) => {
  littleFlower(-2.5 + i * 1.6, 2.2 + (i % 2 ? 0.8 : -0.6), color);
});

const beetle = new THREE.Group();
beetle.position.y = 0.2;
scene.add(beetle);

const shellMaterial = new THREE.MeshStandardMaterial({
  color: 0x2b2d31,
  roughness: 0.72,
  metalness: 0.18,
});

const shellTop = new THREE.Mesh(new THREE.SphereGeometry(1.35, 32, 32), shellMaterial);
shellTop.scale.set(1.8, 1.2, 1.35);
shellTop.position.y = 0.8;
shellTop.castShadow = true;
beetle.add(shellTop);

const shellBottom = new THREE.Mesh(new THREE.SphereGeometry(1.05, 24, 24), shellMaterial);
shellBottom.scale.set(1.2, 0.7, 1.5);
shellBottom.position.y = 0.1;
shellBottom.rotation.x = Math.PI / 2;
shellBottom.castShadow = true;
beetle.add(shellBottom);

const body = new THREE.Mesh(
  new THREE.SphereGeometry(1, 28, 28),
  new THREE.MeshStandardMaterial({ color: 0x3a4b58, roughness: 0.7, metalness: 0.18 })
);
body.scale.set(1.65, 1.2, 1.25);
body.position.set(0, 0.1, 0);
body.castShadow = true;
beetle.add(body);

const head = new THREE.Mesh(
  new THREE.SphereGeometry(0.55, 20, 20),
  new THREE.MeshStandardMaterial({ color: 0x2d2d35, roughness: 0.7 })
);
head.position.set(1.35, 0.5, 0);
head.scale.set(1.2, 0.9, 1.0);
head.castShadow = true;
beetle.add(head);

const hornMaterial = new THREE.MeshStandardMaterial({ color: 0xf6d95d, roughness: 0.6, metalness: 0.12 });

const leftHorn = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.42, 12), hornMaterial);
leftHorn.position.set(1.85, 1.08, -0.18);
leftHorn.rotation.z = -0.6;
beetle.add(leftHorn);

const rightHorn = leftHorn.clone();
rightHorn.position.z = 0.18;
rightHorn.rotation.z = 0.6;
beetle.add(rightHorn);

const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0xf7fafd, emissive: 0xffffff, emissiveIntensity: 0.2 });
const leftEye = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), eyeMaterial);
leftEye.position.set(1.85, 0.6, -0.14);
beetle.add(leftEye);

const rightEye = leftEye.clone();
rightEye.position.z = 0.14;
beetle.add(rightEye);

const pupilMaterial = new THREE.MeshStandardMaterial({ color: 0x1d1b24 });
const leftPupil = new THREE.Mesh(new THREE.SphereGeometry(0.04, 12, 12), pupilMaterial);
leftPupil.position.set(1.92, 0.6, -0.14);
beetle.add(leftPupil);

const rightPupil = leftPupil.clone();
rightPupil.position.z = 0.14;
beetle.add(rightPupil);

const antennaGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.5, 8);
const leftAntenna = new THREE.Mesh(antennaGeometry, new THREE.MeshStandardMaterial({ color: 0x4f5d75 }));
leftAntenna.position.set(1.65, 1.25, -0.12);
leftAntenna.rotation.z = -0.7;
beetle.add(leftAntenna);

const rightAntenna = leftAntenna.clone();
rightAntenna.position.z = 0.12;
rightAntenna.rotation.z = 0.7;
beetle.add(rightAntenna);

const legMaterial = new THREE.MeshStandardMaterial({ color: 0x3d4652 });
const legs = [];
for (let i = 0; i < 6; i += 1) {
  const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.9, 8), legMaterial);
  leg.position.set(-0.35 + (i % 3) * 0.35, -0.35, (i < 3 ? -0.55 : 0.55));
  leg.rotation.z = i < 3 ? 0.6 : -0.6;
  leg.rotation.x = -0.4;
  leg.castShadow = true;
  beetle.add(leg);
  legs.push(leg);
}

const frontLegs = legs.slice(0, 2);
const middleLegs = legs.slice(2, 4);
const backLegs = legs.slice(4, 6);

const state = {
  mood: 'Contento',
  energy: 78,
  hunger: 65,
  love: 75,
};

const determineMood = () => {
  if (state.energy > 70 && state.hunger > 50 && state.love > 60) return 'Contento';
  if (state.energy < 35 || state.hunger < 25) return 'Cansado';
  if (state.love < 30) return 'Triste';
  return 'Somnoliento';
};

const updateHud = () => {
  state.mood = determineMood();
  moodNode.textContent = state.mood;
  energyNode.textContent = `${Math.round(state.energy)}%`;
  hungerNode.textContent = `${Math.round(state.hunger)}%`;
  loveNode.textContent = `${Math.round(state.love)}%`;
};

feedButton.addEventListener('click', () => {
  state.hunger = Math.min(100, state.hunger + 25);
  state.energy = Math.min(100, state.energy + 8);
  state.love = Math.min(100, state.love + 5);
  updateHud();
  beetle.scale.set(1.08, 1.08, 1.08);
  setTimeout(() => beetle.scale.set(1, 1, 1), 180);
});

petButton.addEventListener('click', () => {
  state.love = Math.min(100, state.love + 22);
  state.energy = Math.min(100, state.energy + 6);
  updateHud();
  beetle.rotation.z = 0.2;
  setTimeout(() => (beetle.rotation.z = 0), 180);
});

sleepButton.addEventListener('click', () => {
  state.energy = Math.min(100, state.energy + 24);
  state.hunger = Math.max(0, state.hunger - 18);
  state.love = Math.min(100, state.love + 8);
  updateHud();
  beetle.rotation.x = 0.3;
  setTimeout(() => (beetle.rotation.x = 0), 500);
});

let clock = new THREE.Clock();

function animate() {
  const elapsed = clock.getElapsedTime();

  state.energy = Math.max(0, state.energy - 0.08);
  state.hunger = Math.max(0, state.hunger - 0.12);
  state.love = Math.max(0, state.love - 0.06);

  beetle.position.y = 0.25 + Math.sin(elapsed * 2.2) * 0.28;
  beetle.rotation.y = elapsed * 0.45;
  beetle.rotation.x = Math.sin(elapsed * 1.6) * 0.12;

  shellTop.rotation.z = Math.sin(elapsed * 2.5) * 0.16;
  body.rotation.z = Math.sin(elapsed * 2.2) * 0.2;

  frontLegs.forEach((leg, idx) => {
    leg.rotation.x = -0.4 + Math.sin(elapsed * 5 + idx) * 0.45;
  });
  middleLegs.forEach((leg, idx) => {
    leg.rotation.x = -0.35 + Math.sin(elapsed * 5 + idx + 2) * 0.4;
  });
  backLegs.forEach((leg, idx) => {
    leg.rotation.x = -0.45 + Math.sin(elapsed * 5 + idx + 4) * 0.35;
  });

  leftAntenna.rotation.x = Math.sin(elapsed * 6) * 0.25;
  rightAntenna.rotation.x = Math.sin(elapsed * 6 + 1) * 0.25;

  sparkleGroup.children.forEach((orb, index) => {
    const { offset, speed, distance } = orb.userData;
    orb.position.y = 1 + Math.sin(elapsed * speed + offset) * distance + index * 0.03;
    orb.position.x += Math.sin(elapsed * 1.5 + offset) * 0.0025;
    orb.position.z += Math.cos(elapsed * 1.7 + offset) * 0.0025;
  });

  if (state.love > 85) {
    leftEye.scale.y = 0.75;
    rightEye.scale.y = 0.75;
  } else {
    leftEye.scale.y = 1;
    rightEye.scale.y = 1;
  }

  updateHud();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
