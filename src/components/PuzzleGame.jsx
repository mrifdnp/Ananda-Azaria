
import React, { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import img1 from "../assets/Puzzle/1.jpg";
import img2 from "../assets/Puzzle/2.jpg";
import img3 from "../assets/Puzzle/3.jpg";
import img4 from "../assets/Puzzle/4.jpg";
import img5 from "../assets/Puzzle/5.jpg";
import { motion } from "framer-motion";

const images = [img1, img2, img3, img4, img5];

const GRID_SIZES = {
  easy: 3,
  medium: 4,
  hard: 5,
  veryhard: 6,
};

const PuzzlePiece = ({ id, image, position, onSwap, gridSize }) => {
  const [, ref] = useDrag({
    type: "piece",
    item: { id, position },
  });

  const [, drop] = useDrop({
    accept: "piece",
    drop: (item) => onSwap(item.position, position),
  });

  const pieceSize = `calc(min(40vw, 40vh) / ${gridSize})`;

  return (
    <div
      ref={(node) => ref(drop(node))}
      className="border border-gray-400 cursor-pointer"
      style={{
        width: pieceSize,
        height: pieceSize,
        backgroundImage: `url(${image})`,
        backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
        backgroundPosition: `${(id % gridSize) * (-100 / (gridSize / 3))}% ${
          Math.floor(id / gridSize) * (-100 / (gridSize / 3))
        }%`,
      }}
    />
  );
};

const PuzzleGame = () => {
  const [gridSize, setGridSize] = useState(GRID_SIZES.easy);
  const [pieces, setPieces] = useState([]);
  const [stepCount, setStepCount] = useState(0);
  const [time, setTime] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    startGame();
  }, [gridSize, imageIndex]);

  useEffect(() => {
    if (isSolved) return;

    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isSolved]);

  const startGame = () => {
    let shuffledPieces = Array.from({ length: gridSize * gridSize }, (_, i) => i);
    shuffledPieces.sort(() => Math.random() - 0.5);
    setPieces(shuffledPieces);
    setStepCount(0);
    setTime(0);
    setIsSolved(false);
  };

  const swapPieces = (pos1, pos2) => {
    const newPieces = [...pieces];
    [newPieces[pos1], newPieces[pos2]] = [newPieces[pos2], newPieces[pos1]];
    setPieces(newPieces);
    setStepCount((prev) => prev + 1);

    if (newPieces.every((val, idx) => val === idx)) {
      setIsSolved(true);
    }
  };

  const nextImage = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen p-4 gap-8">
      <motion.h1
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 1.5 }}
        className="my-20 text-center text-4xl"
      >
        Image Puzzle
      </motion.h1>
        <div className="text-center">
      

          <div className="mb-4 flex flex-wrap justify-center gap-2">
            {Object.keys(GRID_SIZES).map((level) => (
              <button
                key={level}
                className={`px-3 py-2 text-white rounded ${
                  gridSize === GRID_SIZES[level] ? "bg-blue-600" : "bg-gray-400"
                }`}
                onClick={() => setGridSize(GRID_SIZES[level])}
              >
                {level.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="mb-4 p-4 bg-gray-100 rounded-md shadow-md text-left">
  <h2 className="text-xl font-bold mb-2">Feeling bored? Why not challenge yourself</h2>
  <ul className="list-disc list-inside text-gray-700 text-sm">
    <li>Choose a difficulty level: Easy, Medium, Hard, or Very Hard.</li>
    <li>Drag and drop the puzzle pieces to swap their positions.</li>
    <li>Arrange all pieces in the correct order to complete the image.</li>
    <li>Track your steps and time while solving the puzzle.</li>
    <li>Click "Restart" to shuffle and play again.</li>
    <li>Click "Next Image" to change the puzzle image.</li>
  </ul>
</div>


          <div
            className="grid gap-1 border-4"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
              width: "min(40vw, 40vh)",
              height: "min(40vw, 40vh)",
            }}
          >
            {pieces.map((id, index) => (
              <PuzzlePiece key={id} id={id} image={images[imageIndex]} position={index} onSwap={swapPieces} gridSize={gridSize} />
            ))}
          </div>

          <div className="mt-4 p-2 bg-gray-200 rounded text-center w-full max-w-sm">
            <p className="text-lg">Steps: {stepCount}</p>
            <p className="text-lg">Time: {time} seconds</p>
            {isSolved && <p className="text-green-600 font-bold">🎉 Puzzle Completed! 🎉</p>}
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded" onClick={startGame}>Restart</button>
            <button className="mt-2 ml-2 px-4 py-2 bg-green-500 text-white rounded" onClick={nextImage}>Next Image</button>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-bold mb-2 mt-30">Image</h2>
          <img src={images[imageIndex]} alt="Original" className="border-4 border-gray-800 w-[40vw] max-w-[400px]" />
        </div>
      </div>
    </DndProvider>
  );
};

export default PuzzleGame;
