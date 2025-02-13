/* eslint-disable no-undef */
import img1 from "../assets/1.jpg";

const GRID_SIZE = 3; // 3x3 grid

const Project = () => {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    const shuffledPieces = [];
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
      shuffledPieces.push(i);
    }
    shuffledPieces.sort(() => Math.random() - 0.5); // Acak posisi
    setPieces(shuffledPieces);
  }, []);

  const handleSwap = (index1, index2) => {
    const newPieces = [...pieces];
    [newPieces[index1], newPieces[index2]] = [newPieces[index2], newPieces[index1]];
    setPieces(newPieces);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Image Puzzle</h1>
      <div className="grid grid-cols-3 gap-1 border-4 border-gray-800">
        {pieces.map((piece, index) => (
          <div
            key={index}
            className="w-24 h-24 bg-cover border border-gray-600 cursor-pointer"
            style={{
              backgroundImage: `url(${img1})`,
              backgroundPosition: `${(piece % GRID_SIZE) * -100}px ${(Math.floor(piece / GRID_SIZE)) * -100}px`,
            }}
            onClick={() => {
              if (index > 0) handleSwap(index, index - 1);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Project;
