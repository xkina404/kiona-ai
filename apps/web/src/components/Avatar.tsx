'use client';

import { useEffect, useRef } from 'react';

export default function Avatar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // TODO: Initialize Live2D avatar
    // This will be integrated with Pixi.js and Live2D SDK
  }, []);

  return (
    <div className="h-full flex flex-col bg-slate-900 overflow-hidden">
      {/* Avatar Display */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-slate-800 to-slate-900">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ maxHeight: '100%', maxWidth: '100%' }}
        />
        {/* Placeholder */}
        <div className="text-center text-gray-400 absolute">
          <p className="text-sm">Live2D Avatar Loading...</p>
        </div>
      </div>

      {/* Avatar Info */}
      <div className="border-t border-slate-800 p-4 text-center">
        <p className="text-sm font-medium">Default Avatar</p>
        <p className="text-xs text-gray-400 mt-1">AI Companion</p>
      </div>
    </div>
  );
}