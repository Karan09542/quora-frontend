import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-gray-900">
      <div className="p-8 text-center">
        <h1 className="mb-4 text-4xl font-bold">404 - पृष्ठ नहीं मिला</h1>
        <p className="mb-4 text-xl">महादेव की कृपा से यह पृष्ठ नहीं मिल सका।</p>
        <p className="mb-8 text-sm">
          शायद यह रास्ता महादेव ने आपके लिए उचित नहीं समझा!
        </p>

        <img
          src="https://i.pinimg.com/originals/e0/af/b5/e0afb57261c593e45842a539c1ad1d6f.jpg" // Replace with your image URL
          alt="Mahadev Devotee"
          className="w-48 h-auto mx-auto mb-6"
        />
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-800"
        >
          मुख्य पृष्ठ पर लौटें
        </button>
      </div>

      <footer className="mt-8">
        <p className="text-sm">
          महादेव से शक्ति प्राप्त करें और सही मार्ग पर लौटें। सीताराम
        </p>
      </footer>
    </div>
  );
};

export default NotFoundPage;
