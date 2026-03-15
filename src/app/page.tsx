'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Game {
  id: number;
  name: string;
  background_image: string;
  released: string;
  rating: number;
}

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null);  
  
  const [searchTerm, setSearchTerm] = useState('');

  const fetchGames = async (search: string = '') => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/games?search=${search}`);
      setGames(response.data.results);
    } catch (err) {
      setError('Vaya, parece que los servidores están descansando. Intenta de nuevo más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchGames(searchTerm);
  };

  return (
    <main className="min-h-screen p-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-gray-900 to-black text-slate-200 font-sans selection:bg-cyan-500 selection:text-white">
      <div className="max-w-7xl mx-auto">
        
        <h1 className="text-5xl font-extrabold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)] tracking-tight">
          Mi Catálogo Gamer (SOA)
        </h1>
        <form onSubmit={handleSearch} className="mb-12 flex justify-center max-w-2xl mx-auto">
          <div className="relative flex w-full group">
            <input 
              type="text" 
              placeholder="Explora nuevos mundos..." 
              className="w-full bg-slate-800/50 backdrop-blur-md border border-slate-600 text-white rounded-l-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all placeholder-slate-400 shadow-inner"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
              type="submit" 
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold px-8 py-4 rounded-r-2xl transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)]"
            >
              Buscar
            </button>
          </div>
        </form>
        {error && (
          <div className="bg-red-900/40 border border-red-500/50 text-red-200 p-5 rounded-2xl text-center mb-10 max-w-2xl mx-auto backdrop-blur-sm flex items-center justify-center gap-3">
            <span className="text-2xl">⚠️</span>
            <p className="font-medium">{error}</p>
          </div>
        )}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="bg-slate-800/40 border border-slate-700/50 rounded-2xl h-80 animate-pulse flex flex-col overflow-hidden backdrop-blur-sm">
                <div className="h-48 bg-slate-700/50 w-full"></div>
                <div className="p-5 flex-1 space-y-4">
                  <div className="h-5 bg-slate-600/50 rounded-md w-3/4"></div>
                  <div className="flex justify-between mt-4">
                    <div className="h-4 bg-slate-600/50 rounded-md w-1/3"></div>
                    <div className="h-4 bg-slate-600/50 rounded-md w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {games.length === 0 && !error ? (
               <div className="col-span-full py-20 text-center">
                 <p className="text-2xl text-slate-400 font-medium">No se encontraron juegos con ese nombre.</p>
                 <p className="text-slate-500 mt-2">Intenta con otros términos de búsqueda.</p>
               </div>
            ) : (
              games.map((game) => (
                <div key={game.id} className="group bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden backdrop-blur-sm hover:-translate-y-2 hover:border-cyan-500/50 transition-all duration-300 shadow-xl hover:shadow-[0_10px_30px_rgba(34,211,238,0.15)] flex flex-col">
                  <div className="relative h-52 overflow-hidden bg-slate-900">
                    {game.background_image ? (
                      <img 
                        src={game.background_image} 
                        alt={game.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-600 font-medium">Sin imagen</div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h2 className="text-xl font-bold mb-4 text-white line-clamp-2 leading-tight group-hover:text-cyan-400 transition-colors" title={game.name}>
                      {game.name}
                    </h2>
                    
                    <div className="mt-auto flex justify-between items-center">
                      <span className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-3 py-1.5 rounded-full text-sm font-bold shadow-[0_0_10px_rgba(234,179,8,0.1)]">
                        <span>★</span> {game.rating}
                      </span>
                      <span className="text-xs font-medium text-slate-400 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
                        {game.released ? game.released.split('-')[0] : 'N/A'}
                      </span>
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>
        )}
      </div>
    </main>
  );
}