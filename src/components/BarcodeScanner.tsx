import { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { NotFoundException } from '@zxing/library';
import { X, Camera, FlipHorizontal } from 'lucide-react';

interface BarcodeScannerProps {
  onScan: (code: string) => void;
  onClose: () => void;
}

export function BarcodeScanner({ onScan, onClose }: BarcodeScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const readerRef = useRef<BrowserMultiFormatReader | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [cameraIndex, setCameraIndex] = useState(0);
  const [scanning, setScanning] = useState(true);
  const controlsRef = useRef<{ stop: () => void } | null>(null);

  useEffect(() => {
    BrowserMultiFormatReader.listVideoInputDevices()
      .then((devices) => {
        if (devices.length === 0) {
          setError('No se encontró ninguna cámara en este dispositivo.');
          return;
        }
        // Prefer back camera on mobile
        const sorted = [...devices].sort((a) =>
          /back|rear|environment/i.test(a.label) ? -1 : 1
        );
        setCameras(sorted);
      })
      .catch(() => setError('No se pudo acceder a la cámara. Verifica los permisos.'));
  }, []);

  useEffect(() => {
    if (cameras.length === 0 || !videoRef.current) return;

    // Stop previous session
    controlsRef.current?.stop();
    readerRef.current = new BrowserMultiFormatReader();
    setScanning(true);

    const deviceId = cameras[cameraIndex]?.deviceId;

    readerRef.current
      .decodeFromVideoDevice(deviceId, videoRef.current, (result, err) => {
        if (result) {
          setScanning(false);
          controlsRef.current?.stop();
          onScan(result.getText());
        }
        if (err && !(err instanceof NotFoundException)) {
          console.warn('Scan error:', err);
        }
      })
      .then((controls) => {
        controlsRef.current = controls;
      })
      .catch(() => setError('No se pudo iniciar la cámara. Verifica los permisos del navegador.'));

    return () => {
      controlsRef.current?.stop();
    };
  }, [cameras, cameraIndex]);

  const handleFlipCamera = () => {
    controlsRef.current?.stop();
    setCameraIndex((prev) => (prev + 1) % cameras.length);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black flex flex-col animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-black/80 backdrop-blur-sm">
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <X size={22} />
        </button>
        <span className="font-mono text-[14px] font-semibold text-white">
          Escanear Código de Barra
        </span>
        {cameras.length > 1 ? (
          <button
            onClick={handleFlipCamera}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <FlipHorizontal size={20} />
          </button>
        ) : (
          <div className="w-10" />
        )}
      </div>

      {/* Camera View */}
      <div className="flex-1 relative overflow-hidden">
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
              <Camera size={32} className="text-white/60" />
            </div>
            <p className="font-sans text-white/80 text-[15px]">{error}</p>
            <button
              onClick={onClose}
              className="mt-2 px-6 py-2.5 bg-white/20 rounded-full text-white font-mono text-[14px] font-semibold"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              muted
              playsInline
            />

            {/* Scanning Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* Dark overlay with transparent center */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Scan frame */}
              <div className="relative z-10 w-72 h-44">
                {/* Transparent cutout (visual only) */}
                <div className="absolute inset-0 rounded-2xl border-2 border-white/80 overflow-hidden">
                  <div className="absolute inset-0 bg-transparent" />
                  {/* Animated scan line */}
                  {scanning && (
                    <div className="absolute left-0 right-0 h-0.5 bg-primary shadow-[0_0_8px_2px_rgba(62,158,87,0.8)] animate-[scan_2s_ease-in-out_infinite]" />
                  )}
                </div>

                {/* Corner accents */}
                {[
                  'top-0 left-0 border-t-[3px] border-l-[3px] rounded-tl-2xl',
                  'top-0 right-0 border-t-[3px] border-r-[3px] rounded-tr-2xl',
                  'bottom-0 left-0 border-b-[3px] border-l-[3px] rounded-bl-2xl',
                  'bottom-0 right-0 border-b-[3px] border-r-[3px] rounded-br-2xl',
                ].map((cls, i) => (
                  <div key={i} className={`absolute w-7 h-7 border-primary ${cls}`} />
                ))}
              </div>

              {/* Hint text */}
              <p className="absolute bottom-16 font-mono text-[13px] text-white/70 text-center px-4">
                Apunta la cámara al código de barras del producto
              </p>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes scan {
          0%   { top: 10%; }
          50%  { top: 85%; }
          100% { top: 10%; }
        }
      `}</style>
    </div>
  );
}
