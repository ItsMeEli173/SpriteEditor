import React, { useState, useRef } from "react";
import "../App.css";
import "../pages/Editor.css";

// --- Funciones de ayuda para manipulación de color ---
function hexToRgb(hex) {
  const sanitized = hex.replace("#", "");
  const bigint = parseInt(sanitized, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b),
        min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch(max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) * 60; break;
      case g: h = ((b - r) / d + 2) * 60; break;
      case b: h = ((r - g) / d + 4) * 60; break;
      default: h = 0;
    }
  }
  return { h, s: s*100, l: l*100 };
}

function hslToRgb(h, s, l) {
  s /= 100; l /= 100;
  const c = (1 - Math.abs(2*l -1))*s;
  const x = c * (1 - Math.abs((h/60)%2 -1));
  const m = l - c/2;
  let r1, g1, b1;
  if(h >=0 && h<60) [r1,g1,b1] = [c,x,0];
  else if(h>=60 && h<120) [r1,g1,b1] = [x,c,0];
  else if(h>=120 && h<180) [r1,g1,b1] = [0,c,x];
  else if(h>=180 && h<240) [r1,g1,b1] = [0,x,c];
  else if(h>=240 && h<300) [r1,g1,b1] = [x,0,c];
  else [r1,g1,b1] = [c,0,x];
  return { r: Math.round((r1+m)*255), g: Math.round((g1+m)*255), b: Math.round((b1+m)*255) };
}

function generatePalette(baseColor, type) {
  const { r, g, b } = hexToRgb(baseColor);
  const isGray = r === g && g === b;
  const hsl = rgbToHsl(r,g,b);
  const safeL = Math.min(95, Math.max(5, hsl.l));
  let palette = [];

  switch(type){
    case "monochromatic":
      palette = [
        baseColor,
        isGray ? baseColor : rgbToHex(...Object.values(hslToRgb(hsl.h,hsl.s*0.8,safeL*0.8))),
        isGray ? baseColor : rgbToHex(...Object.values(hslToRgb(hsl.h,hsl.s*0.6,safeL*0.6))),
        isGray ? baseColor : rgbToHex(...Object.values(hslToRgb(hsl.h,hsl.s*0.4,safeL*0.4))),
        isGray ? baseColor : rgbToHex(...Object.values(hslToRgb(hsl.h,hsl.s*0.2,safeL*0.2))),
      ];
      break;
    case "complementary":
      palette = [
        baseColor,
        isGray ? baseColor : rgbToHex(...Object.values(hslToRgb((hsl.h+180)%360,hsl.s,safeL))),
        isGray ? baseColor : rgbToHex(...Object.values(hslToRgb((hsl.h+150)%360,hsl.s*0.7,safeL*0.7))),
        isGray ? baseColor : rgbToHex(...Object.values(hslToRgb((hsl.h+210)%360,hsl.s*0.7,safeL*0.7))),
        baseColor
      ];
      break;
    case "analogous":
      palette = [
        baseColor,
        isGray ? baseColor : rgbToHex(...Object.values(hslToRgb((hsl.h+30)%360,hsl.s,safeL))),
        isGray ? baseColor : rgbToHex(...Object.values(hslToRgb((hsl.h+60)%360,hsl.s*0.8,safeL*0.9))),
        isGray ? baseColor : rgbToHex(...Object.values(hslToRgb((hsl.h-30+360)%360,hsl.s*0.8,safeL*0.9))),
        isGray ? baseColor : rgbToHex(...Object.values(hslToRgb((hsl.h-60+360)%360,hsl.s*0.6,safeL*0.8))),
      ];
      break;
    case "triadic":
      palette = [
        baseColor,
        isGray ? baseColor : rgbToHex(...Object.values(hslToRgb((hsl.h+120)%360,hsl.s,safeL))),
        isGray ? baseColor : rgbToHex(...Object.values(hslToRgb((hsl.h+240)%360,hsl.s,safeL))),
      ];
      break;
    case "tetradic":
      palette = [
        baseColor,
        isGray ? baseColor : rgbToHex(...Object.values(hslToRgb((hsl.h+90)%360,hsl.s,safeL))),
        isGray ? baseColor : rgbToHex(...Object.values(hslToRgb((hsl.h+180)%360,hsl.s,safeL))),
        isGray ? baseColor : rgbToHex(...Object.values(hslToRgb((hsl.h+270)%360,hsl.s,safeL))),
      ];
      break;
    default:
      palette = [baseColor];
      break;
  }

  return [...new Set(palette)];
}

// Utilidad para convertir rgba a hex
function rgbaToHex(rgba) {
  const match = rgba.match(/rgba?\((\d+),(\d+),(\d+)(?:,(\d*\.?\d+))?\)/);
  if (!match) return '#000000';
  const r = parseInt(match[1]);
  const g = parseInt(match[2]);
  const b = parseInt(match[3]);
  // Ignora el canal alpha para el input color
  return (
    '#' +
    [r, g, b]
      .map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
}

function Editor({ spriteSize=16 }) {
  const [spriteName, setSpriteName] = useState("Mi Sprite");
  const [tool, setTool] = useState("pencil");
  const [currentColor, setCurrentColor] = useState("#000000");
  const [recentColors, setRecentColors] = useState([]);
  const [pixels, setPixels] = useState(
    Array.from({ length: spriteSize }, ()=> Array(spriteSize).fill("rgba(0,0,0,0)"))
  );
  const [mouseDown, setMouseDown] = useState(false);
  const [history, setHistory] = useState([]);
  const [fixedPalettes, setFixedPalettes] = useState([]);
  const [fixedPalettesColors, setFixedPalettesColors] = useState({});

  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Dibuja los píxeles en el canvas cada vez que cambian
  React.useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  // Obtiene el tamaño del div contenedor
  const parent = canvas.parentElement;
  // Tamaño visual del canvas igual al contenedor
  canvas.style.width = '100%';
  canvas.style.height = '100%';
    // Tamaño lógico del canvas igual a spriteSize
    canvas.width = spriteSize;
    canvas.height = spriteSize;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Fondo ajedrezado
    for (let y = 0; y < spriteSize; y++) {
      for (let x = 0; x < spriteSize; x++) {
        ctx.fillStyle = (x + y) % 2 === 0 ? '#e3eafc' : '#c5cae9';
        ctx.fillRect(x, y, 1, 1);
      }
    }
    // Dibuja los píxeles
    for (let y = 0; y < spriteSize; y++) {
      for (let x = 0; x < spriteSize; x++) {
        if (pixels[y][x] !== "rgba(0,0,0,0)") {
          ctx.fillStyle = pixels[y][x];
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
    // Dibuja la cuadrícula
    ctx.strokeStyle = "#3949ab";
    ctx.lineWidth = 0.08;
    for (let i = 0; i <= spriteSize; i++) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, spriteSize);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(spriteSize, i);
      ctx.stroke();
    }
  }, [pixels, spriteSize]);

  const addRecentColor = (color) => {
    setRecentColors(prev=>{
      const updated = [color,...prev.filter(c=>c!==color)];
      return updated.slice(0,5);
    });
  }

  const saveHistory = () => setHistory(prev=>[...prev, JSON.parse(JSON.stringify(pixels))]);
  const undo = () => {
    if(history.length===0) return;
    const last = history[history.length-1];
    setPixels(last);
    setHistory(prev=>prev.slice(0,-1));
  }

  const drawPixel = (x,y) => {
    if(x<0||x>=spriteSize||y<0||y>=spriteSize) return;
    let newPixels = JSON.parse(JSON.stringify(pixels));
    switch(tool){
      case "pencil":
        newPixels[y][x] = currentColor;
        addRecentColor(currentColor);
        break;
      case "eraser":
        newPixels[y][x] = "rgba(0,0,0,0)";
        break;
      case "eyedropper": {
        let color = newPixels[y][x];
        // Si el color es rgba, conviértelo a hex
        if (color.startsWith('rgba')) {
          color = rgbaToHex(color);
        }
        setCurrentColor(color);
        addRecentColor(color);
        break;
      }
      case "fill":
        const target = newPixels[y][x];
        const floodFill = (px, py) => {
          if(px<0||px>=spriteSize||py<0||py>=spriteSize||newPixels[py][px]===currentColor||newPixels[py][px]!==target) return;
          newPixels[py][px] = currentColor;
          floodFill(px+1,py); floodFill(px-1,py); floodFill(px,py+1); floodFill(px,py-1);
        };
        floodFill(x,y);
        addRecentColor(currentColor);
        break;
      case "clearFill":
        newPixels = newPixels.map(row=>row.map(()=> "rgba(0,0,0,0)"));
        break;
      default: break;
    }
    setPixels(newPixels);
  }

  const handleCanvasAction = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    // Relación entre coordenadas visuales y lógicas
    const x = Math.floor((e.clientX - rect.left) * (spriteSize / rect.width));
    const y = Math.floor((e.clientY - rect.top) * (spriteSize / rect.height));
    drawPixel(x, y);
  }

  const handleMouseDown = (e) => { saveHistory(); setMouseDown(true); handleCanvasAction(e); }
  const handleMouseUp = () => setMouseDown(false);
  const handleMouseMove = (e) => { if(mouseDown) handleCanvasAction(e); }

  const togglePaletteFixed = (key) => {
    if(fixedPalettes.includes(key)){
      setFixedPalettes(fixedPalettes.filter(p=>p!==key));
      setFixedPalettesColors(prev=> { const copy={...prev}; delete copy[key]; return copy; });
    } else {
      setFixedPalettes([...fixedPalettes,key]);
      setFixedPalettesColors(prev=>({...prev,[key]:generatePalette(currentColor,key)}));
    }
  }

  const handleExportPNG = () => {
    const canvas = document.createElement("canvas");
    canvas.width = spriteSize;
    canvas.height = spriteSize;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    // Dibuja solo los píxeles (sin fondo ni cuadrícula)
    pixels.forEach((row, y) => row.forEach((color, x) => {
      if (color !== "rgba(0,0,0,0)") {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
      }
    }));
    const link = document.createElement("a");
    link.download = `${spriteName}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  const handleExportPNGAmpliado = (factor = 16) => {
    const size = spriteSize * factor;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    // Dibuja los píxeles ampliados
    pixels.forEach((row, y) => row.forEach((color, x) => {
      if (color !== "rgba(0,0,0,0)") {
        ctx.fillStyle = color;
        ctx.fillRect(x * factor, y * factor, factor, factor);
      }
    }));
    const link = document.createElement("a");
    link.download = `${spriteName}_ampliado.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  // Importar PNG y convertirlo en matriz de píxeles
  const handleImportPNG = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = spriteSize;
      canvas.height = spriteSize;
      ctx.drawImage(img, 0, 0, spriteSize, spriteSize);
      const newPixels = [];
      for (let y = 0; y < spriteSize; y++) {
        newPixels[y] = [];
        for (let x = 0; x < spriteSize; x++) {
          const { data } = ctx.getImageData(x, y, 1, 1);
          newPixels[y][x] = `rgba(${data[0]},${data[1]},${data[2]},${data[3]/255})`;
        }
      }
      setPixels(newPixels);
    };
    img.src = URL.createObjectURL(file);
  };

  // Traducción de nombres de herramientas y paletas
  const paletteNames = {
    monochromatic: "Monocromática",
    complementary: "Complementaria",
    analogous: "Análoga",
    triadic: "Triádica",
    tetradic: "Tetrádica"
  };

  return (
    <div className="editor-container">
      <div className="canvas-section">
        <div className="sprite-name-section">
          <label>Nombre:</label>
          <input type="text" value={spriteName} onChange={e=>setSpriteName(e.target.value)} />
        </div>

        <div className="toolbar-grouped" style={{display: 'flex', gap: '32px', alignItems: 'flex-start', marginBottom: '18px'}}>
          {/* Selector de color */}
          <div className="color-selector-highlight">
            <label style={{fontWeight: 'bold', color: '#1c2044ff', fontSize: '1.08em', marginBottom: '8px', display: 'block'}}>Seleccionar Color</label>
            <input
              type="color"
              value={currentColor.startsWith('#') ? currentColor : rgbaToHex(currentColor)}
              onChange={e=>setCurrentColor(e.target.value)}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                border: '3px solid #3949ab',
                boxShadow: '0 2px 8px rgba(26,35,126,0.10)',
                cursor: 'pointer',
                background: '#fff',
                display: 'block',
                maxWidth: '120px'
              }}
            />
          </div>

          {/* Botones principales agrupados */}
          <div className="main-tools-group" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px'}}>
            <button className={tool==="pencil"?"active":""} onClick={()=>setTool("pencil")}>🖌️ Lápiz</button>
            <button className={tool==="eraser"?"active":""} onClick={()=>setTool("eraser")}>🧽 Borrador</button>
            <button className={tool==="fill"?"active":""} onClick={()=>setTool("fill")}>🪣 Rellenar</button>
            <button className={tool==="eyedropper"?"active":""} onClick={()=>setTool("eyedropper")}>🎨 Copiar color</button>
          </div>

          {/* Botones secundarios separados */}
          <div className="secondary-tools-group" style={{display: 'flex', flexDirection: 'column', gap: '8px', marginLeft: '24px'}}>
            <button onClick={()=>setTool("clearFill")}>🗑️ Limpiar</button>
            <button onClick={undo}>↩️ Deshacer</button>
          </div>
        </div>

        <div className="canvas-backdrop" style={{
          background: 'linear-gradient(135deg, #e3eafc 60%, #c5cae9 100%)',
          border: '3px solid #3949ab',
          borderRadius: '16px',
          boxShadow: '0 2px 12px rgba(26,35,126,0.10)',
          width: '100%',
          maxWidth: 'min(90vw, 600px)',
          aspectRatio: '1 / 1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
          minHeight: 'min(60vw, 220px)'
        }}>
          <canvas
            ref={canvasRef}
            className="canvas"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            style={{
              background: 'none',
              display: 'block',
              margin: '0 auto',
              width: '100%',
              height: '100%',
              aspectRatio: '1 / 1',
              maxWidth: 'min(90vw, 600px)',
              maxHeight: 'min(90vw, 600px)'
            }}
          />
        </div>

        <h4>Colores recientes</h4>
        <div className="recent-colors">
          {recentColors.map(color=>(
            <button key={color} className="color-btn" style={{backgroundColor:color}} onClick={()=>setCurrentColor(color)} />
          ))}
        </div>

        <div className="export-section">
          <button onClick={handleExportPNG}>Exportar PNG {spriteSize} px</button>
          <button style={{marginLeft: '12px'}} onClick={() => handleExportPNGAmpliado(16)}>Exportar PNG ampliado nítido</button>
          <button style={{marginLeft: '12px'}} onClick={() => fileInputRef.current.click()}>Importar PNG</button>
          <input
            type="file"
            accept="image/png"
            ref={fileInputRef}
            style={{display: 'none'}}
            onChange={handleImportPNG}
          />
        </div>
      </div>

      <div className="sidebar">
        {["monochromatic","complementary","analogous","triadic","tetradic"].map(key=>{
          const colors = fixedPalettes.includes(key)? fixedPalettesColors[key] : generatePalette(currentColor,key);
          return (
            <div className="palette" key={key}>
              <div className="palette-header">
                <h4 style={{color: '#1c2044ff'}}>{paletteNames[key]}</h4>
                <button
                  className={`palette-pin${fixedPalettes.includes(key) ? ' active' : ''}`}
                  onClick={()=>togglePaletteFixed(key)}
                  style={{
                    background: fixedPalettes.includes(key) ? '#3949ab' : 'none',
                    color: fixedPalettes.includes(key) ? '#fff' : '#3949ab',
                    border: fixedPalettes.includes(key) ? '2px solid #3949ab' : '2px solid #e3eafc',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    fontSize: '1.1em',
                    boxShadow: fixedPalettes.includes(key) ? '0 2px 8px #3949ab55' : 'none',
                    transition: 'all 0.2s',
                    cursor: 'pointer',
                    padding: '2px 6px',
                    minWidth: '28px',
                    minHeight: '28px',
                    lineHeight: '1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  title={fixedPalettes.includes(key) ? 'Paleta fijada' : 'Fijar paleta'}
                >📌</button>
              </div>
              <div className="colors">
                {colors.map(color=>(
                  <button key={color} className={`color-btn ${currentColor===color?"selected":""}`} style={{backgroundColor:color}} onClick={()=>setCurrentColor(color)} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Editor;
