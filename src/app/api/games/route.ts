import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get('search') || '';
  const apiKey = process.env.RAWG_API_KEY;
  const baseUrl = process.env.RAWG_BASE_URL;

  if (!apiKey || !baseUrl) {
    return NextResponse.json({ error: 'Variables de entorno no configuradas correctamente' }, { status: 500 });
  }

  try {
    const url = searchQuery 
      ? `${baseUrl}?key=${apiKey}&search=${searchQuery}`
      : `${baseUrl}?key=${apiKey}`;

    const response = await axios.get(url);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error en el Proxy:", error);
    return NextResponse.json({ error: 'Error al conectar con la API externa de RAWG' }, { status: 500 });
  }
}