import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get('search') || '';
  
  const apiKey = process.env.RAWG_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'API Key no configurada en el servidor' }, { status: 500 });
  }

  try {
    const url = searchQuery 
      ? `https://api.rawg.io/api/games?key=${apiKey}&search=${searchQuery}`
      : `https://api.rawg.io/api/games?key=${apiKey}`;

    const response = await axios.get(url);
    
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error en el Proxy:", error);
    return NextResponse.json({ error: 'Error al conectar con la API externa de RAWG' }, { status: 500 });
  }
}