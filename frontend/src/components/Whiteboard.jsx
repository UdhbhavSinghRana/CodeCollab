import React, { useState, useRef, useEffect } from "react";

function Whiteboard({ isOpen, setIsWhiteboardOpen }) {
  const canvasRef = useRef(null);
  const colorOptions = useRef('');
  const [painting, setPainting] = useState(false);
  const [lineThickness, setLineThickness] = useState(10);
  const [color, setColor] = useState('black');

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      let bound = canvas.getBoundingClientRect();
      canvas.height = bound.bottom - bound.top;
      canvas.width = bound.right - bound.left;
    }
  }, [isOpen]);

  const draw = (e) => {
    if (!painting) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let bound = canvas.getBoundingClientRect();
    ctx.lineWidth = lineThickness;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    ctx.lineTo(e.clientX - bound.left, e.clientY - bound.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - bound.left, e.clientY - bound.top);
  };

  const startDrawing = (e) => {
    setPainting(true);
    draw(e);
  };

  const stopDrawing = () => {
    setPainting(false);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const showColorOptions = () => {
    colorOptions.current.className = 'absolute -top-32 bg-gray-600 w-32 h-32 left-0';
  };

  const changeColor = (e) => {
    setColor(e.target.value);
    hideColorOptions();
  };

  const hideColorOptions = () => {
    colorOptions.current.className = 'absolute -top-32 hidden bg-gray-600 w-32 h-32 left-0';
  };

  return (
    isOpen && (
      <>
      <div>
      <div className='flex w-full h-1/5 py-2'>
            <div className='w-full p-2 bg-gray-800 border-2 flex gap-2'>
              <button onClick={() => setLineThickness(10)}>
                Pencil
              </button>
              <button onClick={clearCanvas}>
                Clear
              </button>
              <div className="relative">
                <div
                  className="absolute -top-32 hidden bg-gray-600 w-32 h-32 left-0"
                  ref={colorOptions}
                >
                  <button className="absolute right-0 top-0" onClick={hideColorOptions}>
                    X
                  </button>
                  {["Violet", "Black", "Red", "Blue", "White", "Yellow"].map((clr) => (
                    <button key={clr} onClick={changeColor} value={clr}>
                      {clr}
                    </button>
                  ))}
                </div>
                <button onClick={showColorOptions}>
                  Color
                </button>
              </div>
            </div>
          </div>
      </div>
      <div className='flex relative w-full h-screen items-center justify-center border-2 border-blue-400'>
        <canvas
          className='w-[80%] h-[80%] border-2 border-red-500 bg-white'
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={draw}
        ></canvas>
      </div>
      </>
    )
  );
}

export default Whiteboard;
