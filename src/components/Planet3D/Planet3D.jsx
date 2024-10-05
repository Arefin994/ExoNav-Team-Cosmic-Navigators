import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import PropTypes from 'prop-types';

const Planet3D = ({ textureUrl, size, sphereRadius }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    // Set the size of the renderer dynamically from props
    renderer.setSize(size, size);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(sphereRadius, 32, 32); // Use the sphereRadius from props
    const textureLoader = new THREE.TextureLoader();

    textureLoader.load(
      textureUrl,
      (texture) => {
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
      },
      undefined, // onProgress callback
      (error) => {
        console.error('An error occurred while loading the texture.', error);
      }
    );

    camera.position.z = 3;

    const animate = () => {
      requestAnimationFrame(animate);
      // Rotate the sphere if it exists in the scene
      const sphere = scene.children[0]; // Assuming the sphere is the first child
      if (sphere) {
        sphere.rotation.y += 0.01;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Resize the renderer on window resize
    const handleResize = () => {
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call it once to set the initial size

    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener('resize', handleResize);
      renderer.dispose(); // Clean up the renderer
    };
  }, [textureUrl, size, sphereRadius]);

  return <div ref={mountRef} style={{ width: '100%'}} />;
};

// Adding PropTypes validation
Planet3D.propTypes = {
  textureUrl: PropTypes.string.isRequired, // Validating that textureUrl is a required string
  size: PropTypes.number,                 // Size for the renderer
  sphereRadius: PropTypes.number          // Radius of the sphere
};

Planet3D.defaultProps = {
  size: 500,          // Default size for the renderer
  sphereRadius: 1     // Default radius for the sphere
};

export default Planet3D;