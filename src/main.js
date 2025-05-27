import * as THREE from 'three';

// 1. シーン／カメラ／レンダラーをセットアップ
const scene    = new THREE.Scene();
const camera   = new THREE.PerspectiveCamera(
  75,                                // 画角
  window.innerWidth / window.innerHeight, // アスペクト比
  0.1,                               // ニアクリップ
  1000                               // ファークリップ
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 2. ジオメトリとマテリアルでメッシュ（立方体）を作成
const geometry = new THREE.BoxGeometry(1, 1, 1);
const materialFront = new THREE.MeshBasicMaterial({ color: 0x8e44ad });
const materialOther = new THREE.MeshBasicMaterial({ color: 0x1abc9c });
const materials = [
  materialFront, materialOther,
  materialOther, materialOther,
  materialOther, materialOther
];
const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);

// 3. カメラを少し後ろに下げる
camera.position.z = 3;

// 4. リサイズ対応
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// 5. アニメーションループ
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
