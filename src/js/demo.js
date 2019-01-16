(function() {

    const arrOpts = [
        {},
        {
            type: 'triangle',
            easing: 'easeOutSine',
            size: 3,
            duration: 800,
            particlesAmountCoefficient: 7,
            speed: 3,
            oscillationCoefficient: 1
        }
    ];
    
    const items = document.querySelectorAll('.grid__item');
    items.forEach((el, pos) => {
        const bttn = el.querySelector('button.particles-button');
    
        let particlesOpts = arrOpts[pos];
        const particles = new Particles(bttn, particlesOpts);
        
        let buttonVisible = true;
        bttn.addEventListener('click', () => {
            if ( !particles.isAnimating() ) {
                particles.disintegrate();
            }
        });
    });

})();
