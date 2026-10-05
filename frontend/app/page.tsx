"use client";

import { useEffect, useState } from "react";

interface HealthData {
  status: string;
  items: string[];
}

export default function Home() {
  const [data, setData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      let response: Response;
      try {
        response = await fetch("/api/health/");
        if (!response.ok) {
          throw new Error(`HTTP status: ${response.status}`);
        }
      } catch {
        response = await fetch("http://localhost:8000/api/health/");
        if (!response.ok) {
          throw new Error(`HTTP fallback status: ${response.status}`);
        }
      }

      const json: HealthData = await response.json();
      setData(json);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro desconhecido ao carregar API");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    async function initialFetch() {
      try {
        let response: Response;
        try {
          response = await fetch("/api/health/");
          if (!response.ok) {
            throw new Error(`HTTP status: ${response.status}`);
          }
        } catch {
          response = await fetch("http://localhost:8000/api/health/");
          if (!response.ok) {
            throw new Error(`HTTP fallback status: ${response.status}`);
          }
        }

        const json: HealthData = await response.json();
        if (!ignore) {
          setData(json);
          setLoading(false);
        }
      } catch (err: unknown) {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "Erro desconhecido");
          setLoading(false);
        }
      }
    }

    initialFetch();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-6">
      <main className="w-full max-w-xl bg-slate-800/80 backdrop-blur border border-slate-700 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 font-semibold border border-blue-500/30">
            Semana 5 · Containerização e CI/CD
          </span>
          <h1 className="text-2xl font-bold mt-4 text-white">
            Do Dev ao Deploy: Containerize Tudo
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            Integração desacoplada Django + Next.js + PostgreSQL + Nginx
          </p>
        </div>

        <div className="bg-slate-900/70 rounded-xl p-6 border border-slate-700/60 mb-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-700">
            <span className="text-sm font-medium text-slate-300">Status do Backend</span>
            {loading ? (
              <span className="inline-flex items-center gap-2 text-xs font-semibold px-2.5 py-1 rounded-full bg-yellow-500/20 text-yellow-400">
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                Consultando...
              </span>
            ) : error ? (
              <span className="inline-flex items-center gap-2 text-xs font-semibold px-2.5 py-1 rounded-full bg-red-500/20 text-red-400">
                <span className="w-2 h-2 rounded-full bg-red-400"></span>
                Offline
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                {data?.status?.toUpperCase() || "OK"}
              </span>
            )}
          </div>

          <div className="mt-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">
              Itens da Trilha (/api/health/)
            </span>

            {loading && (
              <p className="text-sm text-slate-400 italic">Carregando itens da API...</p>
            )}

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                Falha ao obter dados: {error}
              </div>
            )}

            {data && data.items && (
              <ul className="space-y-2">
                {data.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-sm text-slate-200 bg-slate-800/90 px-3.5 py-2.5 rounded-lg border border-slate-700/50"
                  >
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={loadData}
            className="text-xs font-medium px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
          >
            Atualizar Dados
          </button>
        </div>
      </main>
    </div>
  );
}
