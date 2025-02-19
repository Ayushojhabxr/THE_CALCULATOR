  // Theme toggle
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const themeText = document.getElementById('themeText');
  const toggleThumb = document.querySelector('.toggle-thumb');
  
  themeToggle.addEventListener('click', () => {
      body.classList.toggle('light-theme');
      if (body.classList.contains('light-theme')) {
          themeText.textContent = 'Light Mode';
          toggleThumb.textContent = '☀️';
      } else {
          themeText.textContent = 'Dark Mode';
          toggleThumb.textContent = '🌙';
      }
  });
  
  // Create floating particles
  function createParticles() {
      const particlesContainer = document.getElementById('particles');
      const particleCount = 50;
      
      for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement('div');
          particle.className = 'particle';
          
          // Random position
          const posX = Math.random() * 100;
          const posY = Math.random() * 100;
          
          // Random size
          const size = Math.random() * 5 + 1;
          
          // Random opacity
          const opacity = Math.random() * 0.5 + 0.1;
          
          // Set styles
          particle.style.left = `${posX}%`;
          particle.style.top = `${posY}%`;
          particle.style.width = `${size}px`;
          particle.style.height = `${size}px`;
          particle.style.opacity = opacity;
          
          // Animation duration and delay
          const duration = Math.random() * 50 + 10;
          const delay = Math.random() * 5;
          
          // Set animation
          particle.style.animation = `float ${duration}s ${delay}s infinite linear`;
          
          // Add particle to container
          particlesContainer.appendChild(particle);
          
          // Add floating animation
          setTimeout(() => {
              moveParticle(particle);
          }, delay * 1000);
      }
  }
  
  function moveParticle(particle) {
      const moveX = (Math.random() - 0.5) * 50;
      const moveY = (Math.random() - 0.5) * 50;
      const duration = Math.random() * 15 + 5;
      
      particle.style.transition = `transform ${duration}s linear`;
      particle.style.transform = `translate(${moveX}vw, ${moveY}vh)`;
      
      setTimeout(() => {
          moveParticle(particle);
      }, duration * 1000);
  }
  
  // Calculator logic
  class Calculator {
      constructor(historyElement, currentElement) {
          this.historyElement = historyElement;
          this.currentElement = currentElement;
          this.clear();
      }
      
      clear() {
          this.current = '0';
          this.history = '';
          this.operation = undefined;
          this.shouldResetCurrent = false;
          this.updateDisplay();
      }
      
      delete() {
          if (this.current === '0' || this.current.length === 1) {
              this.current = '0';
          } else {
              this.current = this.current.slice(0, -1);
          }
          this.updateDisplay();
      }
      
      appendNumber(number) {
          if (number === '.' && this.current.includes('.')) return;
          if (this.shouldResetCurrent) {
              this.current = '';
              this.shouldResetCurrent = false;
          }
          if (this.current === '0' && number !== '.') {
              this.current = number;
          } else {
              this.current += number;
          }
          this.updateDisplay();
      }
      
      chooseOperation(operation) {
          if (this.current === '') return;
          
          if (this.history !== '') {
              this.calculate();
          }
          
          this.operation = operation;
          this.history = `${this.current} ${this.operation}`;
          this.shouldResetCurrent = true;
          this.updateDisplay();
      }
      
      calculate() {
          let computation;
          const prev = parseFloat(this.history.split(' ')[0]);
          const current = parseFloat(this.current);
          
          if (isNaN(prev) || isNaN(current)) return;
          
          switch (this.operation) {
              case '+':
                  computation = prev + current;
                  break;
              case '-':
                  computation = prev - current;
                  break;
              case '×':
                  computation = prev * current;
                  break;
              case '÷':
                  if (current === 0) {
                      this.current = 'Error';
                      this.history = '';
                      this.updateDisplay();
                      return;
                  }
                  computation = prev / current;
                  break;
              case '%':
                  computation = prev % current;
                  break;
              default:
                  return;
          }
          
          // Format the result
          if (computation % 1 !== 0) {
              // For decimal numbers
              computation = computation.toFixed(8).replace(/\.?0+$/, '');
          }
          
          this.history = `${this.history} ${this.current} =`;
          this.current = computation.toString();
          this.operation = undefined;
          this.shouldResetCurrent = true;
          this.updateDisplay();
      }
      
      updateDisplay() {
          this.currentElement.textContent = this.current;
          this.historyElement.textContent = this.history;
      }
  }
  
  // DOM Elements
  const landing = document.getElementById('landing');
  const enterButton = document.getElementById('enterButton');
  const calculatorContainer = document.getElementById('calculatorContainer');
  const historyElement = document.getElementById('history');
  const currentElement = document.getElementById('current');
  const numberButtons = document.querySelectorAll('[data-number]');
  const operatorButtons = document.querySelectorAll('[data-action="operator"]');
  const equalsButton = document.querySelector('[data-action="calculate"]');
  const clearButton = document.querySelector('[data-action="clear"]');
  const deleteButton = document.querySelector('[data-action="delete"]');
  
  // Initialize calculator
  const calculator = new Calculator(historyElement, currentElement);
  
  // Add event listeners
  numberButtons.forEach(button => {
      button.addEventListener('click', () => {
          calculator.appendNumber(button.getAttribute('data-number'));
          button.classList.add('active');
          setTimeout(() => button.classList.remove('active'), 100);
      });
  });
  
  operatorButtons.forEach(button => {
      button.addEventListener('click', () => {
          calculator.chooseOperation(button.textContent);
          button.classList.add('active');
          setTimeout(() => button.classList.remove('active'), 100);
      });
  });
  
  equalsButton.addEventListener('click', () => {
      calculator.calculate();
      equalsButton.classList.add('active');
      setTimeout(() => equalsButton.classList.remove('active'), 100);
  });
  
  clearButton.addEventListener('click', () => {
      calculator.clear();
      clearButton.classList.add('active');
      setTimeout(() => clearButton.classList.remove('active'), 100);
  });
  
  deleteButton.addEventListener('click', () => {
      calculator.delete();
      deleteButton.classList.add('active');
      setTimeout(() => deleteButton.classList.remove('active'), 100);
  });
  
  // Enter button transitions
  enterButton.addEventListener('click', () => {
      landing.classList.add('hide');
      setTimeout(() => {
          calculatorContainer.classList.add('show');
      }, 400);
  });
  
  // Keyboard support
  document.addEventListener('keydown', (e) => {
      if (landing.classList.contains('hide')) {
          if (/[0-9.]/.test(e.key)) {
              calculator.appendNumber(e.key);
              highlightButton(`[data-number="${e.key}"]`);
          } else if (['+', '-'].includes(e.key)) {
              calculator.chooseOperation(e.key);
              highlightButton(`[data-action="operator"]:nth-of-type(${e.key === '+' ? 4 : 3})`);
          } else if (e.key === '*') {
              calculator.chooseOperation('×');
              highlightButton('[data-action="operator"]:nth-of-type(2)');
          } else if (e.key === '/') {
              calculator.chooseOperation('÷');
              highlightButton('[data-action="operator"]:nth-of-type(1)');
          } else if (e.key === '%') {
              calculator.chooseOperation('%');
              highlightButton('[data-action="operator"]');
          } else if (e.key === 'Enter' || e.key === '=') {
              calculator.calculate();
              highlightButton('[data-action="calculate"]');
          } else if (e.key === 'Escape') {
              calculator.clear();
              highlightButton('[data-action="clear"]');
          } else if (e.key === 'Backspace') {
              calculator.delete();
              highlightButton('[data-action="delete"]');
          }
      } else if (e.key === 'Enter') {
          enterButton.click();
      }
  });
  
  function highlightButton(selector) {
      const button = document.querySelector(selector);
      if (button) {
          button.classList.add('active');
          setTimeout(() => button.classList.remove('active'), 100);
      }
  }
  
  // Initialize particles
  createParticles();
  
  // Add CSS for floating particles
  const style = document.createElement('style');
  style.textContent = `
      @keyframes float {
          0%, 100% {
              transform: translateY(0) translateX(0);
          }
          25% {
              transform: translateY(-20px) translateX(10px);
          }
          50% {
              transform: translateY(0) translateX(20px);
          }
          75% {
              transform: translateY(20px) translateX(10px);
          }
      }
      
      .particle {
          animation: float 20s infinite ease-in-out;
      }
      
      .button.active {
          transform: translateZ(0) scale(0.95);
          opacity: 0.8;
      }
  `;
  document.head.appendChild(style);

