// Simple PRNG
function xmur3(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
}

function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const COLORS = [
  '#FFAD08', '#EDD75A', '#73B06F', '#0C8F8F', '#405059',
  '#FF9F1C', '#FFBF69', '#CBF3F0', '#2EC4B6',
  '#264653', '#2A9D8F', '#E9C46A', '#F4A261', '#E76F51',
  '#FFCDB2', '#FFB4A2', '#E5989B', '#B5838D', '#6D6875',
  '#8ECAE6', '#219EBC', '#023047', '#FFB703', '#FB8500',
  '#CDB4DB', '#FFC8DD', '#FFAFCC', '#BDE0FE', '#A2D2FF',
  '#F94144', '#F3722C', '#F8961E', '#F9C74F', '#90BE6D', '#43AA8B', '#577590'
];

function generateAvatarSvg(seed, size = 100, square = false, animated = true) {
  const seedNum = xmur3(seed)();
  const rand = mulberry32(seedNum);

  const pick = (arr) => arr[Math.floor(rand() * arr.length)];

  const bgColor = pick(COLORS);
  let headColor = pick(COLORS);
  while (headColor === bgColor) headColor = pick(COLORS);
  let detailColor = pick(COLORS);
  while (detailColor === bgColor || detailColor === headColor) detailColor = pick(COLORS);

  const headShape = pick(['circle', 'squircle', 'blob', 'triangle', 'hexagon']);
  const ears = pick(['none', 'cat', 'bear', 'bunny', 'alien']);
  const eyes = pick(['normal', 'happy', 'sleepy', 'cyclops', 'glasses', 'three']);
  const mouth = pick(['smile', 'openSmile', 'frown', 'cat', 'vampire', 'o', 'zigzag']);
  const accessory = pick(['none', 'none', 'freckles', 'blush', 'mustache']);

  let svg = `<svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">`;

  if (animated) {
    svg += `
      <style>
        @keyframes quirksBreathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05) translateY(-3px); }
        }
        @keyframes quirksBlink {
          0%, 94%, 100% { transform: scaleY(1); }
          96% { transform: scaleY(0.01); }
        }
        @keyframes quirksTwitch {
          0%, 90%, 100% { transform: rotate(0deg); }
          93% { transform: rotate(8deg); }
          96% { transform: rotate(-8deg); }
        }
        @keyframes quirksSmile {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px) scale(1.1); }
        }
        @keyframes quirksFrown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        @keyframes quirksTalk {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.3); }
        }
        .quirks-breathe { animation: quirksBreathe 4s infinite ease-in-out; transform-origin: 50px 50px; }
        .quirks-blink { animation: quirksBlink 4s infinite; transform-origin: 50px 45px; }
        .quirks-twitch { animation: quirksTwitch 5s infinite ease-in-out; transform-origin: 50px 50px; }
        .quirks-smile { animation: quirksSmile 3s infinite ease-in-out; transform-origin: 50px 70px; }
        .quirks-frown { animation: quirksFrown 4s infinite ease-in-out; transform-origin: 50px 70px; }
        .quirks-talk { animation: quirksTalk 0.5s infinite alternate; transform-origin: 50px 70px; }
      </style>
    `;
  }

  // Background
  svg += `<rect width="100" height="100" fill="${bgColor}" rx="${square ? 0 : 50}" />`;

  // Ears
  svg += `<g class="quirks-twitch">`;
  if (ears === 'cat') {
    svg += `<polygon points="15,45 10,10 45,15" fill="${headColor}" />
            <polygon points="85,45 90,10 55,15" fill="${headColor}" />`;
  } else if (ears === 'bear') {
    svg += `<circle cx="20" cy="25" r="18" fill="${headColor}" />
            <circle cx="80" cy="25" r="18" fill="${headColor}" />`;
  } else if (ears === 'bunny') {
    svg += `<ellipse cx="30" cy="15" rx="10" ry="30" fill="${headColor}" />
            <ellipse cx="70" cy="15" rx="10" ry="30" fill="${headColor}" />`;
  } else if (ears === 'alien') {
    svg += `<line x1="30" y1="30" x2="15" y2="10" stroke="${headColor}" stroke-width="4" stroke-linecap="round" />
            <circle cx="15" cy="10" r="6" fill="${detailColor}" />
            <line x1="70" y1="30" x2="85" y2="10" stroke="${headColor}" stroke-width="4" stroke-linecap="round" />
            <circle cx="85" cy="10" r="6" fill="${detailColor}" />`;
  }
  svg += `</g>`;

  svg += `<g class="quirks-breathe">`;
  // Head
  if (headShape === 'circle') {
    svg += `<circle cx="50" cy="50" r="35" fill="${headColor}" />`;
  } else if (headShape === 'squircle') {
    svg += `<rect x="15" y="15" width="70" height="70" rx="25" fill="${headColor}" />`;
  } else if (headShape === 'blob') {
    svg += `<path d="M 50 15 C 75 15 85 35 85 50 C 85 75 70 85 50 85 C 25 85 15 70 15 50 C 15 25 25 15 50 15 Z" fill="${headColor}" />`;
  } else if (headShape === 'triangle') {
    svg += `<polygon points="50,20 85,80 15,80" fill="${headColor}" />`;
  } else if (headShape === 'hexagon') {
    svg += `<polygon points="50,15 80,32 80,68 50,85 20,68 20,32" fill="${headColor}" />`;
  }

  // Eyes
  svg += `<g class="quirks-blink">`;
  if (eyes === 'normal') {
    svg += `<circle cx="35" cy="45" r="6" fill="#111" />
            <circle cx="65" cy="45" r="6" fill="#111" />`;
  } else if (eyes === 'happy') {
    svg += `<path d="M 25 45 Q 35 35 45 45" stroke="#111" stroke-width="4" stroke-linecap="round" fill="none" />
            <path d="M 55 45 Q 65 35 75 45" stroke="#111" stroke-width="4" stroke-linecap="round" fill="none" />`;
  } else if (eyes === 'sleepy') {
    svg += `<path d="M 25 45 Q 35 55 45 45" stroke="#111" stroke-width="4" stroke-linecap="round" fill="none" />
            <path d="M 55 45 Q 65 55 75 45" stroke="#111" stroke-width="4" stroke-linecap="round" fill="none" />`;
  } else if (eyes === 'cyclops') {
    svg += `<circle cx="50" cy="40" r="14" fill="#fff" />
            <circle cx="50" cy="40" r="6" fill="#111" />`;
  } else if (eyes === 'glasses') {
    svg += `<rect x="20" y="35" width="26" height="18" rx="4" fill="none" stroke="#111" stroke-width="4" />
            <rect x="54" y="35" width="26" height="18" rx="4" fill="none" stroke="#111" stroke-width="4" />
            <line x1="46" y1="44" x2="54" y2="44" stroke="#111" stroke-width="4" />
            <circle cx="33" cy="44" r="4" fill="#111" />
            <circle cx="67" cy="44" r="4" fill="#111" />`;
  } else if (eyes === 'three') {
    svg += `<circle cx="50" cy="35" r="5" fill="#111" />
            <circle cx="30" cy="50" r="5" fill="#111" />
            <circle cx="70" cy="50" r="5" fill="#111" />`;
  }
  svg += `</g>`;

  // Mouth
  if (mouth === 'smile') {
    svg += `<g class="quirks-smile"><path d="M 35 65 Q 50 80 65 65" stroke="#111" stroke-width="4" stroke-linecap="round" fill="none" /></g>`;
  } else if (mouth === 'openSmile') {
    svg += `<g class="quirks-talk"><path d="M 30 60 Q 50 85 70 60 Z" fill="#111" />
            <path d="M 40 70 Q 50 75 60 70 Q 50 65 40 70" fill="#ff6b6b" /></g>`;
  } else if (mouth === 'frown') {
    svg += `<g class="quirks-frown"><path d="M 35 75 Q 50 60 65 75" stroke="#111" stroke-width="4" stroke-linecap="round" fill="none" /></g>`;
  } else if (mouth === 'cat') {
    svg += `<g class="quirks-twitch"><path d="M 35 65 Q 42.5 75 50 65 Q 57.5 75 65 65" stroke="#111" stroke-width="4" stroke-linecap="round" fill="none" /></g>`;
  } else if (mouth === 'vampire') {
    svg += `<g class="quirks-smile"><path d="M 35 65 Q 50 80 65 65" stroke="#111" stroke-width="4" stroke-linecap="round" fill="none" />
            <polygon points="40,68 45,69 42.5,75" fill="#fff" />
            <polygon points="60,68 55,69 57.5,75" fill="#fff" /></g>`;
  } else if (mouth === 'o') {
    svg += `<g class="quirks-talk"><circle cx="50" cy="70" r="8" fill="#111" /></g>`;
  } else if (mouth === 'zigzag') {
    svg += `<g class="quirks-frown"><polyline points="35,65 42.5,70 50,65 57.5,70 65,65" stroke="#111" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" /></g>`;
  }

  // Accessory
  if (accessory === 'freckles') {
    svg += `<circle cx="25" cy="55" r="2" fill="#111" opacity="0.3" />
            <circle cx="30" cy="58" r="2" fill="#111" opacity="0.3" />
            <circle cx="20" cy="58" r="2" fill="#111" opacity="0.3" />
            <circle cx="75" cy="55" r="2" fill="#111" opacity="0.3" />
            <circle cx="70" cy="58" r="2" fill="#111" opacity="0.3" />
            <circle cx="80" cy="58" r="2" fill="#111" opacity="0.3" />`;
  } else if (accessory === 'blush') {
    svg += `<ellipse cx="25" cy="55" rx="8" ry="5" fill="#ff6b6b" opacity="0.5" />
            <ellipse cx="75" cy="55" rx="8" ry="5" fill="#ff6b6b" opacity="0.5" />`;
  } else if (accessory === 'mustache') {
    svg += `<path d="M 30 60 Q 50 50 70 60 Q 60 65 50 62 Q 40 65 30 60 Z" fill="#111" />`;
  }
  svg += `</g>`;

  svg += `</svg>`;
  return svg;
}
