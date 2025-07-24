'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom styles for black and white map with smaller controls
const mapStyles = `
  .leaflet-container {
    filter: grayscale(100%) contrast(120%) brightness(110%);
  }
  
  .leaflet-control-zoom {
    border: none !important;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3) !important;
  }
  
  .leaflet-control-zoom a {
    width: 24px !important;
    height: 24px !important;
    line-height: 22px !important;
    font-size: 14px !important;
    background-color: white !important;
    color: #333 !important;
    border: 1px solid #ccc !important;
    text-decoration: none !important;
  }
  
  .leaflet-control-zoom a:hover {
    background-color: #f5f5f5 !important;
  }
  
  .leaflet-control-zoom-in {
    border-radius: 2px 2px 0 0 !important;
  }
  
  .leaflet-control-zoom-out {
    border-radius: 0 0 2px 2px !important;
    border-top: none !important;
  }
  
  .leaflet-control-attribution {
    background-color: rgba(255, 255, 255, 0.8) !important;
    font-size: 10px !important;
    padding: 2px 4px !important;
    border-radius: 2px !important;
  }
  
  .leaflet-control-attribution a {
    color: #666 !important;
  }
`;

interface InteractiveMapProps {
  latitude: number;
  longitude: number;
  title?: string;
  className?: string;
}

export default function InteractiveMap({ 
  latitude, 
  longitude, 
  title = 'Project Location',
  className = ''
}: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const styleElementRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Add custom styles to the document
    if (!styleElementRef.current) {
      const styleElement = document.createElement('style');
      styleElement.textContent = mapStyles;
      document.head.appendChild(styleElement);
      styleElementRef.current = styleElement;
    }

    // Initialize the map
    const map = L.map(mapRef.current, {
      center: [latitude, longitude],
      zoom: 15,
      zoomControl: true,
      scrollWheelZoom: false,
      attributionControl: false, // Disable default attribution
    });

    // Add custom attribution control with only OpenStreetMap
    L.control.attribution({
      position: 'bottomright',
      prefix: false // This removes the "Leaflet" prefix
    }).addTo(map);

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Add marker
    const marker = L.marker([latitude, longitude]).addTo(map);
    
    if (title) {
      marker.bindPopup(title).openPopup();
    }

    // Store map instance
    mapInstanceRef.current = map;

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      // Remove custom styles
      if (styleElementRef.current && document.head.contains(styleElementRef.current)) {
        document.head.removeChild(styleElementRef.current);
        styleElementRef.current = null;
      }
    };
  }, [latitude, longitude, title]);

  // Update map when coordinates change  
  useEffect(() => {
    if (mapInstanceRef.current) {
      const newCenter = new L.LatLng(latitude, longitude);
      mapInstanceRef.current.setView(newCenter, 15);
      
      // Clear existing markers and add new one
      mapInstanceRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapInstanceRef.current!.removeLayer(layer);
        }
      });
      
      const marker = L.marker([latitude, longitude]).addTo(mapInstanceRef.current);
      if (title) {
        marker.bindPopup(title).openPopup();
      }
    }
  }, [latitude, longitude, title]);

  return (
    <div 
      ref={mapRef} 
      className={`w-full h-64 rounded-lg ${className}`}
      style={{ minHeight: '256px' }}
    />
  );
} 