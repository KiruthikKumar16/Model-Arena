import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useRouteMusic } from '../presentation/hooks/useRouteMusic';

// Declare the global VANTA object
declare global {
  interface Window {
    VANTA: {
      DOTS: (options: any) => any;
    };
  }
}

const Landing = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState({ hours: '03', minutes: '15', seconds: '22' });
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoverCard, setHoverCard] = useState<number | null>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  useRouteMusic();

  // Featured games data
  const gameModesList = [
    { key: 'playground', icon: '🎮', label: 'Playground', desc: 'Practice and experiment with AI models in a sandbox environment.' },
    { key: 'hvm', icon: '⚡', label: 'HVM Arena', desc: 'Challenge high-performance models in competitive matches.' },
    { key: 'tournament', icon: '🏆', label: 'Tournament', desc: 'Compete in organized tournaments with top AI models.' },
  ];

  const featuredGames = [
    {
      title: "Tic Tac Toe",
      image: "/games/tictactoe-3d.png",
      availableModes: ['playground', 'hvm', 'tournament'],
    },
    {
      title: "Rock Paper Scissors",
      image: "/games/rps.png",
      availableModes: ['playground', 'hvm', 'tournament'],
    },
    {
      title: "Chess",
      image: "/games/chess.png",
      availableModes: [],
    },
    {
      title: "Checkers",
      image: "/games/checkers.png",
      availableModes: [],
    }
  ];

  // Top models data
  const topModels = [
    {
      name: "AlphaZero",
      eth: "9.456",
      change: "+18%",
      avatar: "/profile/profile5.png"
    },
    {
      name: "DeepMind",
      eth: "5.891",
      change: "+11%",
      avatar: "/profile/profile6.png"
    },
    {
      name: "NeuralNet",
      eth: "4.029",
      change: "+13%",
      avatar: "/profile/profile7.png"
    }
  ];

  // Add Game Modes data
  const gameModes = [
    {
      title: "Playground",
      description: "Create and test your AI models in a sandbox environment where you can make them play against each other",
      icon: "🎮",
      features: ["Model vs Model testing", "Custom model training", "Performance analytics", "No competitive pressure"]
    },
    {
      title: "Human vs Model",
      description: "Challenge your own AI models directly in head-to-head matches",
      icon: "👤",
      features: ["Direct model testing", "Real-time feedback", "Model improvement insights", "Personal leaderboards"]
    },
    {
      title: "Arena",
      description: "Compete in the global competitive scene where models battle for supremacy",
      icon: "🏆",
      features: ["Global rankings", "ELO rating system", "Tournament participation", "Model reputation"]
    }
  ];

  useEffect(() => {
    if (!vantaEffect && vantaRef.current && window.VANTA) {
      setIsTransitioning(true);
      setVantaEffect(
        window.VANTA.DOTS({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          backgroundColor: 0x13002A,
          color: 0xFF3CBD,
          color2: 0x00F2A9,
          size: 3,
          spacing: 35,
          showLines: true
        })
      );
      // Add a small delay to ensure smooth transition
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  useEffect(() => {
    setIsLoaded(true);
    const timer = setInterval(() => {
      // Update countdown logic here
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Parallax and header glow effect
  useEffect(() => {
    const handleScroll = () => {
      // Header glow
      if (headerRef.current) {
        if (window.scrollY > 10) {
          headerRef.current.classList.add('header-glow');
        } else {
          headerRef.current.classList.remove('header-glow');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`relative min-h-screen overflow-hidden ${isTransitioning ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
      {/* Vanta.js Background */}
      <div ref={vantaRef} className="fixed inset-0 w-full h-full -z-10" />

      {/* Content Container */}
      <div className={`relative z-10 min-h-screen bg-transparent text-white pt-24 ${isTransitioning ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
        {/* Header */}
        <header ref={headerRef} className="w-full px-6 py-3 flex justify-between items-center glass-effect-strong fixed top-0 left-0 z-50 transition-all duration-300">
          <div className="flex items-center gap-1">
            <img src="/logo.png" alt="Model Arena Logo" className="h-10 w-10 align-middle" />
            <div className="text-xl font-bold bg-gradient-to-r from-[#FF3CBD] to-[#FF85E1] text-transparent bg-clip-text font-pixel align-middle">
              Model Arena
            </div>
          </div>
          <nav className="flex gap-8 items-center">
            <a 
              href="/" 
              className="text-gray-300 hover:text-[#00F2A9] transition-colors"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }}
            >
              Home
            </a>
            <a href="/about" className="text-gray-300 hover:text-[#00F2A9] transition-colors">
              About
            </a>
            <a href="/games" className="text-gray-300 hover:text-[#00F2A9] transition-colors">
              Games
            </a>
            <a href="#" className="text-gray-300 hover:text-[#00F2A9] transition-colors">
              Models
            </a>
            <Button className="glass-button px-6 py-2 text-white font-semibold hover:scale-105 transform transition-all duration-300 border-[#FF3CBD] hover:border-[#00F2A9] bg-gradient-to-r from-[#FF3CBD]/20 to-[#00F2A9]/20 hover:from-[#FF3CBD]/40 hover:to-[#00F2A9]/40 backdrop-blur-sm font-pixel">
              Get Started
            </Button>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="relative pt-12 pb-32 px-6">
          <div className="relative z-10 max-w-6xl mx-auto">
            <h1 className="text-7xl font-bold text-center mb-4 cyberpunk-text font-pixel">
              <span className="bg-gradient-to-r from-[#FF3CBD] to-[#FF85E1] text-transparent bg-clip-text">
                BUILD. BATTLE. DOMINATE.
              </span>
            </h1>
            <p className="text-center text-gray-400 text-xl mb-10 max-w-2xl mx-auto font-script">
              Unleash your creativity—build and train custom AI models for classic and modern strategy games.
            </p>
            <div className="flex justify-center gap-8 mb-12 ml-8 mt-16">
              <div className="glass-card p-8 text-center rounded-lg">
                <div className="text-4xl font-bold text-[#FF3CBD] font-pixel">3</div>
                <div className="text-gray-400 font-pixel">Game Modes</div>
              </div>
              <div className="glass-card p-8 text-center rounded-lg">
                <div className="text-4xl font-bold text-[#00F2A9] font-pixel">AI vs AI</div>
                <div className="text-gray-400 font-pixel">Real-Time Matches</div>
              </div>
              <div className="glass-card p-8 text-center rounded-lg">
                <div className="text-4xl font-bold text-[#FF3CBD] font-pixel">5+</div>
                <div className="text-gray-400 font-pixel">Strategy Games</div>
              </div>
            </div>
            <div className="flex justify-center mt-32">
              <Button 
                onClick={() => navigate('/games')}
                className="glass-button px-12 py-6 text-2xl font-bold text-white hover:scale-105 transform transition-all duration-300 border-[#FF3CBD] hover:border-[#00F2A9] bg-gradient-to-r from-[#FF3CBD]/20 to-[#00F2A9]/20 hover:from-[#FF3CBD]/40 hover:to-[#00F2A9]/40 backdrop-blur-sm group font-pixel"
              >
                Start Playing
                <span className="absolute inset-0 glass-effect-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></span>
              </Button>
            </div>
          </div>
        </section>

        {/* Add this section before the Featured Games section */}
        <section className="py-20 px-6 relative">
          <div className="max-w-6xl mx-auto">
            <div className="glass-effect-strong p-12 rounded-2xl backdrop-blur-2xl">
              <h2 className="text-4xl font-bold mb-8 text-center font-pixel">
                <span className="text-[#FF3CBD]">Game</span>
                <span className="text-[#00F2A9]"> Modes</span>
              </h2>
              <div className="grid grid-cols-3 gap-8">
                {gameModes.map((mode, index) => (
                  <div 
                    key={index}
                    className="glass-card p-8 rounded-xl text-center transform hover:scale-105 transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="text-4xl mb-4">{mode.icon}</div>
                    <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-[#FF3CBD] to-[#00F2A9] text-transparent bg-clip-text font-pixel">
                      {mode.title}
                    </h3>
                    <p className="text-gray-300 mb-6 flex-grow">{mode.description}</p>
                    <ul className="space-y-2 mb-6">
                      {mode.features.map((feature, i) => (
                        <li key={i} className="text-sm text-gray-400 flex items-center justify-center">
                          <span className="w-2 h-2 bg-[#FF3CBD] rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="glass-button w-full mt-auto hover:scale-105 transform transition-all duration-300 border-[#FF3CBD] hover:border-[#00F2A9] bg-gradient-to-r from-[#FF3CBD]/20 to-[#00F2A9]/20 hover:from-[#FF3CBD]/40 hover:to-[#00F2A9]/40 backdrop-blur-sm font-pixel">
                      Enter {mode.title}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Update Featured Games section */}
        <section className="py-20 px-6 relative">
          <div className="max-w-6xl mx-auto">
            <div className="glass-effect-strong p-12 rounded-2xl backdrop-blur-2xl">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-4xl font-bold font-pixel">
                  <span className="text-[#FF3CBD]">Top Games</span>
                  <span className="text-[#00F2A9]"> Collection</span>
                </h2>
                <Button 
                  onClick={() => navigate('/games')}
                  className="glass-button hover:scale-105 transform transition-all duration-300 border-[#FF3CBD] hover:border-[#00F2A9] bg-gradient-to-r from-[#FF3CBD]/20 to-[#00F2A9]/20 hover:from-[#FF3CBD]/40 hover:to-[#00F2A9]/40 backdrop-blur-sm font-pixel"
                >
                  Show All
                </Button>
              </div>
              <div className="grid grid-cols-4 gap-6">
                {featuredGames.map((game, index) => (
                  <div 
                    key={index} 
                    className="glass-card rounded-xl p-4 transform hover:scale-105 transition-all duration-300 relative"
                    onMouseEnter={() => setHoverCard(index)}
                    onMouseLeave={() => setHoverCard(null)}
                  >
                    <div className="relative mb-4">
                      <img 
                        src={game.image} 
                        alt={game.title} 
                        className={`w-full h-48 object-cover rounded-lg ${game.title !== 'Tic Tac Toe' && game.title !== 'Rock Paper Scissors' ? 'filter blur-sm brightness-75' : ''}`} 
                      />
                      {game.title !== 'Tic Tac Toe' && game.title !== 'Rock Paper Scissors' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="bg-[#13002A]/80 text-white text-lg font-bold px-4 py-2 rounded-full border-2 border-[#FF3CBD] shadow-lg">Coming Soon</span>
                        </div>
                      )}
                      {hoverCard === index && (game.title === 'Tic Tac Toe' || game.title === 'Rock Paper Scissors') && (
                        <div className="absolute inset-0 glass-effect-strong flex items-end justify-center p-4 rounded-lg">
                          <Button 
                            onClick={() => navigate(game.title === 'Tic Tac Toe' ? '/games/tictactoe' : '/games/rock-paper-scissors')}
                            className="glass-button w-full hover:scale-105 transform transition-all duration-300 border-[#FF3CBD] hover:border-[#00F2A9] bg-gradient-to-r from-[#FF3CBD]/20 to-[#00F2A9]/20 hover:from-[#FF3CBD]/40 hover:to-[#00F2A9]/40 backdrop-blur-sm font-pixel"
                          >
                            Play Now
                          </Button>
                        </div>
                      )}
                    </div>
                    <h3 className={`text-xl font-bold mb-4 ${game.title !== 'Tic Tac Toe' && game.title !== 'Rock Paper Scissors' ? 'filter blur-sm text-gray-400' : ''}`}>{game.title}</h3>
                    <div className="flex justify-center gap-4 mb-2">
                      {gameModesList.map((mode) => (
                        <span
                          key={mode.key}
                          className={`relative text-2xl cursor-pointer group transition-transform duration-200 ${game.availableModes.includes(mode.key) ? 'hover:scale-125 hover:text-[#FF3CBD] focus:text-[#00F2A9] neon-glow' : 'opacity-30 grayscale'}`}
                          title={mode.label}
                        >
                          <span className="inline-block transition-transform duration-200 group-hover:scale-125 group-hover:animate-bounce">{mode.icon}</span>
                          {game.availableModes.includes(mode.key) && (
                            <span className="absolute left-1/2 top-full mt-2 z-20 hidden group-hover:flex flex-col items-center w-max">
                              <span className="glass-effect-strong px-3 py-1 rounded-md text-xs text-white shadow-xl border border-[#FF3CBD] animate-fade-in flex flex-col items-center gap-1 min-w-[120px]">
                                <span className="font-bold text-[#FF3CBD]">{mode.label}</span>
                                <span className="text-gray-300 truncate w-full text-center">{mode.desc}</span>
                              </span>
                            </span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Update Tournament section */}
        <section className="py-20 px-6 relative">
          <div className="max-w-6xl mx-auto relative">
            {/* Overlay label */}
            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
              <span className="bg-[#13002A]/80 text-white text-2xl font-bold px-8 py-4 rounded-full border-2 border-[#FF3CBD] shadow-lg">Tournaments Coming Soon</span>
            </div>
            <div className="glass-effect-strong p-12 rounded-2xl backdrop-blur-2xl filter blur-sm opacity-60 pointer-events-none select-none">
              <h2 className="text-4xl font-bold mb-4 text-center font-pixel">
                <span className="text-[#FF3CBD]">Special Tournament</span>
                <span className="text-[#00F2A9]"> Coming Soon</span>
              </h2>
              <div className="text-2xl font-mono mb-12 flex justify-center gap-4">
                {Object.entries(countdown).map(([unit, value]) => (
                  <div key={unit} className="glass-card p-8 rounded-xl min-w-[120px]">
                    <div className="text-4xl font-bold text-[#00F2A9]">{value}</div>
                    <div className="text-sm text-gray-400">{unit}</div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <Button className="glass-button px-12 py-4 text-xl font-pixel">
                  Register Now
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Update Leaderboard section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto relative">
            {/* Overlay label */}
            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
              <span className="bg-[#13002A]/80 text-white text-2xl font-bold px-8 py-4 rounded-full border-2 border-[#FF3CBD] shadow-lg">Model Leaderboards Coming Soon</span>
            </div>
            <div className="glass-effect-strong p-12 rounded-2xl backdrop-blur-2xl filter blur-sm opacity-60 pointer-events-none select-none">
              <h2 className="text-4xl font-bold mb-12 font-pixel">
                <span className="text-[#FF3CBD]">Top Models</span>
                <span className="text-[#00F2A9]"> Leaderboard</span>
              </h2>
              <div className="space-y-4">
                {topModels.map((model, index) => (
                  <div 
                    key={index} 
                    className="glass-card p-6 rounded-xl flex items-center justify-between transform hover:scale-102 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img 
                          src={model.avatar} 
                          alt={model.name} 
                          className="w-12 h-12 rounded-full border-2 border-[#FF3CBD]" 
                        />
                        <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full glass-effect flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-[#FF3CBD]">{model.name}</div>
                        <div className="text-[#00F2A9]">{model.eth} Win Rate</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-[#00F2A9] text-xl font-bold">{model.change}</div>
                      <Button className="glass-button font-pixel">
                        Challenge
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Update Newsletter section */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto relative">
            {/* Overlay label */}
            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
              <span className="bg-[#13002A]/80 text-white text-2xl font-bold px-8 py-4 rounded-full border-2 border-[#FF3CBD] shadow-lg">Community Coming Soon</span>
            </div>
            <div className="glass-effect-strong p-12 rounded-2xl backdrop-blur-2xl filter blur-sm opacity-60 pointer-events-none select-none text-center">
              <h2 className="text-4xl font-bold mb-6 font-pixel">
                <span className="text-[#FF3CBD]">Join Our</span>
                <span className="text-[#00F2A9]"> Community</span>
              </h2>
              <p className="text-gray-300 mb-8 text-lg font-script">
                Get updates about new models, tournaments, and exclusive events.
              </p>
              <div className="flex gap-4 justify-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="glass-input px-6 py-4 rounded-full w-96 text-lg focus:outline-none font-script"
                />
                <Button className="glass-button px-8 py-4 text-lg font-script">
                  Join Now
                </Button>
              </div>
              <div className="mt-8 flex justify-center gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FF3CBD]">10K+</div>
                  <div className="text-gray-400">Community Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#00F2A9]">24/7</div>
                  <div className="text-gray-400">Active Support</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FF3CBD]">100+</div>
                  <div className="text-gray-400">Daily Tournaments</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="glass-effect-strong py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-1">
                <img src="/logo.png" alt="Model Arena Logo" className="h-12 w-12 align-middle" />
                <div className="text-2xl font-bold bg-gradient-to-r from-[#FF3CBD] to-[#FF85E1] text-transparent bg-clip-text font-pixel align-middle">
                  Model Arena
                </div>
              </div>
              <div className="flex gap-8">
                {['Home', 'About', 'Games', 'Models'].map((item) => (
                  <a 
                    key={item} 
                    href={item === 'About' ? '/about' : '#'} 
                    className="text-gray-400 hover:text-[#FF3CBD] transition-colors"
                    onClick={(e) => {
                      if (item === 'Home') {
                        e.preventDefault();
                        window.scrollTo({
                          top: 0,
                          behavior: 'smooth'
                        });
                      }
                    }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center pt-8 border-t border-[#FF3CBD]/20">
              <div className="text-gray-400">© 2024 Model Arena. All rights reserved.</div>
              <div className="flex gap-4">
                {['twitter', 'discord', 'github'].map((platform) => (
                  <a key={platform} href="#" className="text-gray-400 hover:text-[#FF3CBD] transition-colors">
                    <i className={`fab fa-${platform}`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Loading Indicator */}
      {!isLoaded && (
        <div className="fixed inset-0 glass-effect-strong flex items-center justify-center z-50">
          <div className="cyber-loader"></div>
        </div>
      )}
    </div>
  );
};

export default Landing; 