// src/app/api/games/[id]/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const apiKey = process.env.RAWG_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'API Key no configurada en el servidor' }, { status: 500 });
  }

  try {
    // Proxy: Consultamos a RAWG por el ID específico del juego
    const response = await axios.get(`https://api.rawg.io/api/games/${params.id}?key=${apiKey}`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error en el Proxy de detalles:", error);
    return NextResponse.json({ error: 'Error al conectar con la API externa' }, { status: 500 });
  }
}