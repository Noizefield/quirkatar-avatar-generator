/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Avatar } from './lib/avatar';
import { RefreshCw, Copy, Check, Github } from 'lucide-react';

function generateRandomSeed() {
  return Math.random().toString(36).substring(2, 10);
}

export default function App() {
  const [seed, setSeed] = useState('hello-world');
  const [copied, setCopied] = useState(false);
  const [gridSeeds, setGridSeeds] = useState<string[]>([]);

  useEffect(() => {
    setGridSeeds(Array.from({ length: 24 }, () => generateRandomSeed()));
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(`<Avatar seed="${seed}" size={120} />`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-stone-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation */}
      <nav className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3 font-bold text-xl tracking-tight">
          <Avatar seed="logo" size={32} square className="rounded-lg shadow-sm" />
          <span>Quirkatar</span>
        </div>
        <a href="#" className="text-stone-500 hover:text-stone-900 transition-colors flex items-center gap-2 font-medium">
          <Github size={20} />
          <span>GitHub</span>
        </a>
      </nav>

      {/* Hero Section */}
      <header className="max-w-4xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
        <div className="relative mb-12 group">
          <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-20 group-hover:opacity-30 transition-opacity rounded-full"></div>
          <Avatar seed={seed} size={180} className="relative shadow-2xl rounded-full border-4 border-white" />
          <button
            onClick={() => setSeed(generateRandomSeed())}
            className="absolute -bottom-2 -right-2 bg-white p-4 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all text-indigo-600 border border-stone-100"
            aria-label="Regenerate avatar"
          >
            <RefreshCw size={24} />
          </button>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-stone-900">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Quirkatar</span> Generator
        </h1>
        
        <h2 className="text-xl text-stone-500 max-w-2xl mb-12 leading-relaxed font-normal">
          A free, lightweight, zero-dependency <strong>procedural avatar generator</strong> for React.
          Generates unique, fun, and quirky profile pictures based on a simple string seed.
        </h2>

        {/* Playground */}
        <div className="w-full max-w-lg bg-white p-2 rounded-2xl shadow-sm border border-stone-200 flex items-center gap-2 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-300 transition-all">
          <div className="pl-4 text-stone-400 font-mono text-sm">seed=</div>
          <input
            type="text"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            className="flex-1 bg-transparent py-3 outline-none text-lg font-medium text-stone-700"
            placeholder="Type anything..."
          />
          <button
            onClick={handleCopy}
            className="bg-stone-900 hover:bg-stone-800 text-white px-5 py-3 rounded-xl font-medium flex items-center gap-2 transition-colors"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </header>

      {/* SEO Content Section */}
      <section className="border-t border-stone-200 bg-stone-50">
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-6 text-stone-900">Why use Quirkatar Avatar Generator?</h2>
          <p className="text-lg text-stone-600 mb-8 max-w-2xl mx-auto">
            Whether you're building a new SaaS, a community forum, or a multiplayer game, giving your users a unique identity is crucial. Quirkatar is the perfect <strong>random avatar generator</strong> for developers who want a drop-in, lightweight solution without relying on external image APIs.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-left mt-12">
            <div>
              <h3 className="font-bold text-stone-900 mb-2">Zero Dependencies</h3>
              <p className="text-stone-600 text-sm">Built entirely with React and SVG. No heavy libraries, no external network requests. Just pure, fast rendering.</p>
            </div>
            <div>
              <h3 className="font-bold text-stone-900 mb-2">Deterministic Seeds</h3>
              <p className="text-stone-600 text-sm">The same seed string will always generate the exact same avatar. Perfect for hashing user IDs or email addresses.</p>
            </div>
            <div>
              <h3 className="font-bold text-stone-900 mb-2">Infinite Combinations</h3>
              <p className="text-stone-600 text-sm">With various head shapes, eyes, mouths, ears, and a carefully curated color palette, the possibilities are endless.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="border-t border-stone-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Infinite Possibilities</h2>
              <p className="text-stone-500">Click any avatar to use its seed.</p>
            </div>
            <button
              onClick={() => setGridSeeds(Array.from({ length: 24 }, () => generateRandomSeed()))}
              className="text-stone-600 bg-stone-100 hover:bg-stone-200 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              <RefreshCw size={18} />
              Regenerate Grid
            </button>
          </div>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-6 gap-y-10">
            {gridSeeds.map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-3 group">
                <button 
                  onClick={() => {
                    setSeed(s);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="relative transition-transform group-hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 rounded-full"
                >
                  <Avatar seed={s} size={80} className="shadow-sm rounded-full border border-stone-100" />
                </button>
                <span className="text-xs text-stone-400 font-mono truncate w-full text-center px-2">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12 text-center">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-4">
          <Avatar seed="footer-logo" size={48} className="opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
          <p className="font-medium text-stone-300">Quirkatar - Free Random Avatar Generator</p>
          <p className="text-sm">Open source and lightweight. Built for fun.</p>
        </div>
      </footer>
    </div>
  );
}
