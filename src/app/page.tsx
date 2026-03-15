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

  // Función asíncrona simplificada (sin parámetros de búsqueda por ahora)
  const fetchGames = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/games');
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

  return (
    <main className="min-h-screen p-8 bg-gray-900 text-white font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Mi Catálogo Gamer (SOA)
        </h1>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-100 p-4 rounded-lg text-center mb-8">
            <p>⚠️ {error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-gray-800 rounded-lg h-72 animate-pulse flex flex-col">
                <div className="h-48 bg-gray-700 rounded-t-lg"></div>
                <div className="p-4 flex-1 space-y-3">
                  <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-600 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.length === 0 && !error ? (
               <p className="text-center col-span-full text-gray-400">No se encontraron juegos.</p>
            ) : (
              games.map((game) => (
                <div key={game.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-purple-500/20 transition-shadow duration-300">
                  {game.background_image ? (
                    <img src={game.background_image} alt={game.name} className="w-full h-48 object-cover" />
                  ) : (
                    <div className="w-full h-48 bg-gray-700 flex items-center justify-center text-gray-500">Sin imagen</div>
                  )}
                  <div className="p-4">
                    <h2 className="text-xl font-bold mb-2 truncate" title={game.name}>{game.name}</h2>
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>⭐ {game.rating}</span>
                      <span>📅 {game.released || 'N/A'}</span>
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