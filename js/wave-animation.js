// Advanced Digital Wave Animation
class DigitalWaveAnimation {
    constructor(canvasId, options = {}) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.waves = [];
        this.particles = [];
        this.time = 0;
        
        // Configuration
        this.config = {
            waveCount: options.waveCount || 4,
            amplitude: options.amplitude || 80,
            frequency: options.frequency || 0.02,
            speed: options.speed || 0.005,
            particleCount: options.particleCount || 150,
            primaryColor: options.primaryColor || [68, 203, 228],
            secondaryColor: options.secondaryColor || [155, 81, 224],
            ...options
        };
        
        this.setupCanvas();
        this.initializeWaves();
        this.initializeParticles();
        this.animate();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.setupCanvas();
        });
    }
    
    setupCanvas() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width * window.devicePixelRatio;
        this.canvas.height = rect.height * window.devicePixelRatio;
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        
        this.width = rect.width;
        this.height = rect.height;
    }
    
    initializeWaves() {
        this.waves = [];
        for (let i = 0; i < this.config.waveCount; i++) {
            this.waves.push({
                amplitude: this.config.amplitude * (0.5 + Math.random() * 0.5),
                frequency: this.config.frequency * (0.8 + Math.random() * 0.4),
                phase: Math.random() * Math.PI * 2,
                speed: this.config.speed * (0.7 + Math.random() * 0.6),
                yOffset: this.height * (0.2 + i * 0.2),
                opacity: 0.3 + Math.random() * 0.4,
                lineWidth: 1 + Math.random() * 2
            });
        }
    }
    
    initializeParticles() {
        this.particles = [];
        for (let i = 0; i < this.config.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.6 + 0.2,
                color: Math.random() > 0.5 ? this.config.primaryColor : this.config.secondaryColor,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: 0.02 + Math.random() * 0.03
            });
        }
    }
    
    drawWave(wave) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = `rgba(${this.config.primaryColor.join(',')}, ${wave.opacity})`;
        this.ctx.lineWidth = wave.lineWidth;
        this.ctx.lineCap = 'round';
        
        // Create gradient stroke
        const gradient = this.ctx.createLinearGradient(0, 0, this.width, 0);
        gradient.addColorStop(0, `rgba(${this.config.primaryColor.join(',')}, 0)`);
        gradient.addColorStop(0.2, `rgba(${this.config.primaryColor.join(',')}, ${wave.opacity})`);
        gradient.addColorStop(0.5, `rgba(${this.config.secondaryColor.join(',')}, ${wave.opacity * 1.2})`);
        gradient.addColorStop(0.8, `rgba(${this.config.primaryColor.join(',')}, ${wave.opacity})`);
        gradient.addColorStop(1, `rgba(${this.config.primaryColor.join(',')}, 0)`);
        this.ctx.strokeStyle = gradient;
        
        // Draw the wave
        for (let x = 0; x <= this.width; x += 2) {
            const y = wave.yOffset + 
                     Math.sin(x * wave.frequency + wave.phase + this.time * wave.speed) * wave.amplitude +
                     Math.sin(x * wave.frequency * 2.1 + wave.phase + this.time * wave.speed * 1.3) * wave.amplitude * 0.3;
            
            if (x === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
        
        this.ctx.stroke();
        
        // Add glow effect
        this.ctx.shadowColor = `rgba(${this.config.primaryColor.join(',')}, 0.8)`;
        this.ctx.shadowBlur = 10;
        this.ctx.stroke();
        this.ctx.shadowBlur = 0;
    }
    
    drawParticle(particle) {
        const pulseSize = particle.size + Math.sin(particle.pulse + this.time * particle.pulseSpeed) * 0.5;
        const alpha = particle.opacity + Math.sin(particle.pulse + this.time * particle.pulseSpeed * 0.7) * 0.2;
        
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(${particle.color.join(',')}, ${alpha})`;
        this.ctx.fill();
        
        // Add small glow
        this.ctx.shadowColor = `rgba(${particle.color.join(',')}, 0.6)`;
        this.ctx.shadowBlur = 5;
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around screen edges
            if (particle.x < 0) particle.x = this.width;
            if (particle.x > this.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.height;
            if (particle.y > this.height) particle.y = 0;
            
            // Update pulse
            particle.pulse += particle.pulseSpeed;
        });
    }
    
    drawConnections() {
        this.ctx.strokeStyle = `rgba(${this.config.primaryColor.join(',')}, 0.1)`;
        this.ctx.lineWidth = 0.5;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const opacity = (100 - distance) / 100 * 0.1;
                    this.ctx.strokeStyle = `rgba(${this.config.primaryColor.join(',')}, ${opacity})`;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Draw particles and connections
        this.drawConnections();
        this.particles.forEach(particle => this.drawParticle(particle));
        
        // Draw waves
        this.waves.forEach(wave => this.drawWave(wave));
        
        // Update animations
        this.updateParticles();
        this.time += 1;
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // First slide animation
    const wave1 = new DigitalWaveAnimation('waveCanvas1', {
        waveCount: 5,
        amplitude: 60,
        frequency: 0.015,
        speed: 0.008,
        particleCount: 120,
        primaryColor: [68, 203, 228],
        secondaryColor: [155, 81, 224]
    });
    
    // Second slide animation with different parameters
    const wave2 = new DigitalWaveAnimation('waveCanvas2', {
        waveCount: 4,
        amplitude: 80,
        frequency: 0.02,
        speed: 0.006,
        particleCount: 100,
        primaryColor: [155, 81, 224],
        secondaryColor: [68, 203, 228]
    });
});
