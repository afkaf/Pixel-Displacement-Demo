fetch('config.json' + '?v=' + Date.now()).then(resp => resp.json()).then(config => {
  // Populate the select element with the image names from the config
  const selectElement = document.getElementById('image-select');
  for (const imageName in config.images) {
    const optionElement = document.createElement('option');
    optionElement.value = imageName;
    optionElement.textContent = imageName;
    selectElement.appendChild(optionElement);
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 0.42;
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const loader = new THREE.TextureLoader();

  let mesh;
  let material;

  // Function to load and display an image
  const loadImage = imageName => {
    const imageTexture = loader.load('images/'+imageName + config.images[imageName].extension);
    const depthTexture = loader.load('images/'+imageName + '_depth' + config.images[imageName].depth_extension);

    Promise.all([
      fetch('vertexShader.glsl' + '?v=' + Date.now()).then(resp => resp.text()),
      fetch('fragmentShader.glsl' + '?v=' + Date.now()).then(resp => resp.text())
    ]).then(([vertexShader, fragmentShader]) => {
      const aspectRatio = window.innerWidth / window.innerHeight;
      const geometry = aspectRatio >= 16 / 9 ? new THREE.PlaneGeometry(aspectRatio, aspectRatio / (16 / 9)) : new THREE.PlaneGeometry(16 / 9, 1);
      material = new THREE.ShaderMaterial({
        uniforms: {
          image: { value: imageTexture },
          depthMap: { value: depthTexture },
          mouse: { value: new THREE.Vector2() },
          depthMultiplier: { value: config.images[imageName].depthMultiplier }
        },
        vertexShader,
        fragmentShader: fragmentShader.replace('DEPTH_MULTIPLIER', config.images[imageName].depthMultiplier),
      });

      if (mesh) {
        scene.remove(mesh);
      }

      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
    });
  };

  // Load the initial image
  loadImage(config.imageName);

  // Reload the image when the selection changes
  selectElement.addEventListener('change', () => {
    loadImage(selectElement.value);
  });

  // Code to handle mouse movement and window resize events, and animate the scene
  document.addEventListener('mousemove', event => {
    const mouseX = (event.clientX / window.innerWidth) - 0.5;
    const mouseY = (event.clientY / window.innerHeight) - 0.5;

    material.uniforms.mouse.value.set(mouseX, -mouseY);

    gsap.to(scene.rotation, {
      duration: 1,
      x: mouseY / 8,
      y: mouseX / 8,
      onUpdate: () => renderer.render(scene, camera),
    });
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    const aspectRatio = window.innerWidth / window.innerHeight;
    mesh.geometry = aspectRatio >= 16 / 9 ? new THREE.PlaneGeometry(aspectRatio, aspectRatio / (16 / 9)) : new THREE.PlaneGeometry(16 / 9, 1);
  });

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
});