//Initial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

//Variables
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};

//Event Listeners
addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

const gravity = 0.01;
const friction = 0.99;

function Particle(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
}

Object.prototype.draw = function () {
    c.save();
    c.globalAlpha = this.alpha;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
    c.restore();
}

Object.prototype.update = function () {
    this.draw();
    this.velocity.x *= friction;
    this.velocity.y *= friction;
    this.velocity.y += gravity;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.005;
}

//Implementation
let particles;

function init() {
    particles = [];
}

//Animation loop
function animate() {
    requestAnimationFrame(animate);

    c.fillStyle = 'rgba(0,0,0,0.1)'
    c.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle,index) => {
        if(particle.alpha > 0){
            particle.update();
        }else{
            particles.splice(index,1);
        }
    });
}

init();
animate();

let firePower = 20;
let audio = new Audio('./firework.mp3');

addEventListener('click', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    const particleCount = 500;
    const angleIncrement = (Math.PI * 2) / particleCount;

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(mouse.x, mouse.y, (Math.random() * (3 - 1)) + 1, `hsl(${Math.random() * 360},50%,50%)`, {
            x: Math.cos(angleIncrement * i) * Math.random() * firePower,
            y: Math.sin(angleIncrement * i) * Math.random() * firePower
        }));
    }
    audio.play();
})
