// effects.js - Efectos visuales y de partículas

// Configuraciones de partículas optimizadas para ser más visibles
const particleConfigs = [
  {
      particles: {
          number: {
              value: 100,
              density: {
                  enable: true,
                  value_area: 800
              }
          },
          color: {
              value: ["#ffffff", "#ff6b6b", "#4ecdc4", "#54a0ff", "#96ceb4", "#ff9ff3"]
          },
          shape: {
              type: "circle",
              stroke: {
                  width: 0,
                  color: "#FFFFFF"
              }
          },
          opacity: {
              value: 0.8,
              random: true,
              anim: {
                  enable: true,
                  speed: 2,
                  opacity_min: 0.3,
                  sync: false
              }
          },
          size: {
              value: 3,
              random: true,
              anim: {
                  enable: true,
                  speed: 3,
                  size_min: 1,
                  sync: false
              }
          },
          line_linked: {
              enable: true,
              distance: 160,
              color: "#ffffff",
              opacity: 0.5,
              width: 1
          },
          move: {
              enable: true,
              speed: 2.5,
              direction: "none",
              random: true,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: {
                  enable: true,
                  rotateX: 600,
                  rotateY: 1200
              }
          }
      },
      interactivity: {
          detect_on: "canvas",
          events: {
              onhover: {
                  enable: true,
                  mode: ["grab", "bubble"]
              },
              onclick: {
                  enable: true,
                  mode: ["push", "repulse"]
              },
              resize: true
          },
          modes: {
              grab: {
                  distance: 180,
                  line_linked: {
                      opacity: 0.7
                  }
              },
              bubble: {
                  distance: 200,
                  size: 6,
                  duration: 1.5,
                  opacity: 0.7
              },
              push: {
                  particles_nb: 6
              },
              repulse: {
                  distance: 150,
                  duration: 0.4
              }
          }
      },
      retina_detect: true
  },
  {
      particles: {
          number: {
              value: 120,
              density: {
                  enable: true,
                  value_area: 800
              }
          },
          color: {
              value: ["#ffffff", "#ff6b6b", "#4ecdc4", "#54a0ff", "#FF69B4"]
          },
          shape: {
              type: ["circle", "triangle", "star"],
              stroke: {
                  width: 0,
                  color: "#FFFFFF"
              }
          },
          opacity: {
              value: 0.9,
              random: true,
              anim: {
                  enable: true,
                  speed: 2.5,
                  opacity_min: 0.4,
                  sync: false
              }
          },
          size: {
              value: 3.5,
              random: true,
              anim: {
                  enable: true,
                  speed: 3.5,
                  size_min: 1.5,
                  sync: false
              }
          },
          line_linked: {
              enable: true,
              distance: 140,
              color: "#ffffff",
              opacity: 0.6,
              width: 1.2
          },
          move: {
              enable: true,
              speed: 3,
              direction: "none",
              random: true,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: {
                  enable: true,
                  rotateX: 800,
                  rotateY: 800
              }
          }
      },
      interactivity: {
          detect_on: "canvas",
          events: {
              onhover: {
                  enable: true,
                  mode: ["bubble", "grab"]
              },
              onclick: {
                  enable: true,
                  mode: ["push", "bubble", "repulse"]
              },
              resize: true
          },
          modes: {
              grab: {
                  distance: 200,
                  line_linked: {
                      opacity: 0.8
                  }
              },
              bubble: {
                  distance: 250,
                  size: 7,
                  duration: 2,
                  opacity: 0.8
              },
              push: {
                  particles_nb: 8
              },
              repulse: {
                  distance: 200,
                  duration: 0.5
              }
          }
      },
      retina_detect: true
  }
];

// Inicializar partículas
function initParticles() {
  if (typeof particlesJS !== 'undefined') {
      particlesJS("particles-js", particleConfigs[0]);
  }
}

// Cambiar patrón de partículas
function changeParticlePattern() {
  if (typeof particlesJS !== 'undefined') {
      const currentConfig = document.body.dataset.particleConfig || "0";
      const newConfig = (parseInt(currentConfig) + 1) % particleConfigs.length;
      document.body.dataset.particleConfig = newConfig;
      particlesJS("particles-js", particleConfigs[newConfig]);
  }
}

// Crear efecto de partículas adicionales al hacer clic
function createClickParticleEffect(x, y) {
  const colors = ["#ff6b6b", "#4ecdc4", "#54a0ff", "#96ceb4", "#FF69B4", "#a78bfa"];
  const particle = document.createElement('div');
  particle.className = 'custom-particle';
  particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  particle.style.left = x + 'px';
  particle.style.top = y + 'px';
  particle.style.boxShadow = `0 0 15px ${colors[Math.floor(Math.random() * colors.length)]}`;
  
  document.body.appendChild(particle);
  
  // Animar partícula
  const angle = Math.random() * Math.PI * 2;
  const distance = 100 + Math.random() * 150;
  const duration = 1500 + Math.random() * 1000;
  
  particle.animate([
      { 
          transform: `translate(0, 0) scale(1) rotate(0deg)`,
          opacity: 0.9
      },
      { 
          transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(2) rotate(360deg)`,
          opacity: 0
      }
  ], {
      duration: duration,
      easing: 'ease-out'
  });
  
  // Eliminar partícula después de la animación
  setTimeout(() => {
      particle.remove();
  }, duration);
}



// Aplicar efecto de aparición suave
function applyFadeInEffect(selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element, index) => {
      element.style.animationDelay = `${index * 0.1}s`;
      element.classList.add('fade-in');
  });
}

// Aplicar efecto de pulso
function applyPulseEffect(selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(element => {
      element.classList.add('pulse');
  });
}

// Aplicar efecto de brillo
function applyGlowEffect(selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(element => {
      element.classList.add('glow');
  });
}

// Aplicar efecto metálico a elementos específicos
function applyMetallicEffect(selector) {
  console.log('Buscando elementos con selector:', selector);
  const elements = document.querySelectorAll(selector);
  console.log('Elementos encontrados:', elements.length);
  elements.forEach(element => {
      console.log('Aplicando efecto metálico a:', element);
      element.classList.add('metallic-effect');
      console.log('Clases del elemento:', element.classList);
  });
}

// Inicializar efectos cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar partículas
  initParticles();
  
  // Aplicar efecto metálico a elementos específicos
  console.log('Intentando aplicar efecto metálico...');
  applyMetallicEffect('.iris-text');
  applyMetallicEffect('h1.display-4.fw-bold'); // Aplicar a títulos principales
  applyMetallicEffect('h1'); // Aplicar a todos los h1
  applyMetallicEffect('h2'); // Aplicar a todos los h2
  applyMetallicEffect('h3'); // Aplicar a todos los h3
  console.log('Efecto metálico aplicado.');
  
  // Aplicar efectos visuales a elementos específicos
  applyFadeInEffect('.fade-in-element');
  applyPulseEffect('.pulse-element');
  applyGlowEffect('.glow-element');
  
  // Evento de clic para crear efecto de partículas
  document.addEventListener('click', function(e) {
      // No crear partículas si se hace clic en botones flotantes
      if (!e.target.closest('.floating-btn')) {
          createClickParticleEffect(e.clientX, e.clientY);
      }
  });
  
  // Asegurar que las partículas se redimensionen con la ventana
  window.addEventListener('resize', function() {
      if (typeof particlesJS !== 'undefined') {
          const currentConfig = document.body.dataset.particleConfig || "0";
          particlesJS("particles-js", particleConfigs[parseInt(currentConfig)]);
      }
  });
});

// Exportar funciones para usar en otros archivos
window.DVSEffects = {
  initParticles,
  changeParticlePattern,
  applyMetallicEffect,
  applyFadeInEffect,
  applyPulseEffect,
  applyGlowEffect
};