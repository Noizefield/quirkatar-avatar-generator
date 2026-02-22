document.addEventListener('DOMContentLoaded', () => {
    function randomString() {
        return Math.random().toString(36).substring(2, 10);
    }

    let currentSeed = randomString();
    const mainAvatarEl = document.getElementById('main-avatar');
    const footerLogoEl = document.getElementById('footer-logo');
    const seedInput = document.getElementById('seed-input');
    const avatarGrid = document.getElementById('avatar-grid');
    const refreshMainBtn = document.getElementById('refresh-main-btn');
    const copyBtn = document.getElementById('copy-btn');
    const regenGridBtn = document.getElementById('regenerate-grid-btn');

    const copyIcon = document.getElementById('copy-icon');
    const checkIcon = document.getElementById('check-icon');
    const copyText = document.getElementById('copy-text');

    function renderMainAvatar() {
        mainAvatarEl.classList.add('morphing');

        setTimeout(() => {
            mainAvatarEl.innerHTML = generateAvatarSvg(currentSeed, 180);
            seedInput.value = currentSeed;
            mainAvatarEl.classList.remove('morphing');
        }, 300); // Wait for fade out
    }

    function setSeed(seed) {
        currentSeed = seed;
        renderMainAvatar();
    }

    // Auto-change every 3 seconds
    setInterval(() => {
        // Only auto-change if the input isn't actively being focused
        if (document.activeElement !== seedInput) {
            setSeed(randomString());
        }
    }, 3000);

    function handleCopy() {
        const code = `<svg ...>${generateAvatarSvg(currentSeed, 120)}</svg>`; // Not copying actual code since plain JS, just copying snippet like the original React app did. The original React app copied `<Avatar seed="${seed}" size={120} />`. We can just copy the seed, or the img tag? Let's just follow the original and copy the seed logic snippet, or just the seed. But wait! The user wanted pure HTML and JS. So maybe copy an `<img src="...">`? Actually, since it's client side JS, maybe just copying the seed or the SVG code is best. Let's just copy the raw SVG string.
        navigator.clipboard.writeText(generateAvatarSvg(currentSeed, 120)).then(() => {
            copyIcon.style.display = 'none';
            checkIcon.style.display = 'inline-block';
            copyText.textContent = 'Copied';

            setTimeout(() => {
                copyIcon.style.display = 'inline-block';
                checkIcon.style.display = 'none';
                copyText.textContent = 'Copy';
            }, 2000);
        });
    }

    function generateGrid() {
        avatarGrid.innerHTML = '';
        for (let i = 0; i < 24; i++) {
            const seed = randomString();
            const div = document.createElement('div');
            div.className = 'grid-item';

            const svgContainer = document.createElement('div');
            svgContainer.className = 'grid-item-avatar';
            svgContainer.innerHTML = generateAvatarSvg(seed, 80, false, false); // Turn off animations for the grid items to save CPU

            const seedText = document.createElement('span');
            seedText.className = 'grid-item-seed';
            seedText.textContent = seed;

            div.appendChild(svgContainer);
            div.appendChild(seedText);

            div.addEventListener('click', () => {
                setSeed(seed);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            avatarGrid.appendChild(div);
        }
    }

    // Event Listeners
    seedInput.addEventListener('input', (e) => {
        currentSeed = e.target.value;
        renderMainAvatar();
    });

    refreshMainBtn.addEventListener('click', () => {
        setSeed(randomString());
    });

    copyBtn.addEventListener('click', handleCopy);

    regenGridBtn.addEventListener('click', generateGrid);

    // Initialize
    seedInput.value = currentSeed;
    renderMainAvatar();
    generateGrid();

    // Footer Logo
    footerLogoEl.innerHTML = generateAvatarSvg('footer-logo', 48);
});
