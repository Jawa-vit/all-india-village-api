import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subDistricts, setSubDistricts] = useState([]);
  const [villages, setVillages] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc3OTUyMDE4NSwiZXhwIjoxNzgwMTI0OTg1fQ.REFzsmqb1ANbwczklh0K3Bd3OAqztDjg3EH1JB_Wq8Y";

  // ================= FETCH STATES =================
  useEffect(() => {

    fetchStates();

  }, []);

  const fetchStates = async () => {

    try {

      setLoading(true);

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/states`
      );

      setStates(response.data.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  // ================= FETCH DISTRICTS =================
  const fetchDistricts = async (stateId) => {

    try {

      setLoading(true);

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/districts/${stateId}`
      );

      setDistricts(response.data.data);

      setSubDistricts([]);
      setVillages([]);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  // ================= FETCH SUBDISTRICTS =================
  const fetchSubDistricts = async (districtId) => {

    try {

      setLoading(true);

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/subdistricts/${districtId}`
      );

      setSubDistricts(response.data.data);

      setVillages([]);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  // ================= FETCH VILLAGES =================
  const fetchVillages = async (subDistrictId) => {

    try {

      setLoading(true);

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/villages/${subDistrictId}`
      );

      setVillages(response.data.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  // ================= SEARCH VILLAGES =================
  const searchVillages = async () => {

      try {
      
        setLoading(true);
      
        setError("");
      
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/search?q=${searchQuery}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        
        if (response.data.data.length === 0) {
        
          setError("No villages found");
        
        }
      
        setSearchResults(response.data.data);
      
      } catch (error) {
      
        console.log(error);
      
        setError("Search failed. Try again.");
      
      } finally {
      
        setLoading(false);
      
      }
    
  };     


  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200">

      {/* NAVBAR */}
      <nav className="bg-white/20 backdrop-blur-lg border-b border-white/20 text-blue-900 shadow-lg">

        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1 className="text-2xl font-bold">
            🇮🇳 India Village API
          </h1>

          <div className="space-x-6 hidden md:flex">

            <button className="hover:text-yellow-300 transition">
              Home
            </button>

            <button className="hover:text-yellow-300 transition">
              Search
            </button>

            <button className="hover:text-yellow-300 transition">
              About
            </button>

          </div>

        </div>

      </nav>

      {/* MAIN CARD */}
      <div className="max-w-4xl mx-auto mt-10 bg-white/40 backdrop-blur-lg border border-white/30 shadow-2xl rounded-3xl p-8 hover:shadow-blue-300 transition-all duration-500">

        <h1 className="text-5xl font-bold text-center text-blue-700 mb-10 animate-pulse">
          🇮🇳 All India Village API
        </h1>

        {/* STATE */}
        <div className="mb-6">

          <label className="block text-xl font-semibold mb-2">
            Select State
          </label>

          <select
            className="w-full p-4 bg-white/60 backdrop-blur-md border border-white/30 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
            onChange={(e) => fetchDistricts(e.target.value)}
          >

            <option>-- Select State --</option>

            {(states || []).map((state) => (

              <option key={state.id} value={state.id}>
                {state.name}
              </option>

            ))}

          </select>

        </div>

        {/* DISTRICT */}
        <div className="mb-6">

          <label className="block text-xl font-semibold mb-2">
            Select District
          </label>

          <select
            className="w-full p-4 border rounded-xl shadow hover:shadow-xl transition"
            onChange={(e) => fetchSubDistricts(e.target.value)}
          >

            <option>-- Select District --</option>

            {(districts || []).map((district) => (

              <option key={district.id} value={district.id}>
                {district.name}
              </option>

            ))}

          </select>

        </div>

        {/* SUBDISTRICT */}
        <div className="mb-6">

          <label className="block text-xl font-semibold mb-2">
            Select SubDistrict
          </label>

          <select
            className="w-full p-4 border rounded-xl shadow hover:shadow-xl transition"
            onChange={(e) => fetchVillages(e.target.value)}
          >

            <option>-- Select SubDistrict --</option>

            {(subDistricts || []).map((sub) => (

              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>

            ))}

          </select>

        </div>

        {/* VILLAGES */}
        <div className="mb-6">

          <label className="block text-xl font-semibold mb-2">
            Select Village
          </label>

          <select className="w-full p-4 border rounded-xl shadow hover:shadow-xl transition">

            <option>-- Select Village --</option>

            {(villages || []).map((village) => (

              <option key={village.id}>
                {village.name}
              </option>

            ))}

          </select>

        </div>

        {/* SEARCH */}
        <div className="mt-10">

          <h2 className="text-3xl font-bold mb-4 text-blue-700">
            🔍 Search Villages
          </h2>

          <div className="flex gap-4">

            <input
              type="text"
              placeholder="Enter village name"
              className="flex-1 p-4 border rounded-xl shadow"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <button
              className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-indigo-700 hover:to-blue-800 hover:scale-105 transition-all duration-300 text-white px-8 py-4 rounded-xl shadow-xl"
              onClick={searchVillages}
            >
              Search
            </button>

          </div>

          {/* ERROR MESSAGE */}

          {
            error && (
            
              <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-4 shadow">
              
                {error}
            
              </div>

            )
          }

          {/* LOADING */}

          {
            loading && (
            
              <div className="flex items-center gap-3 mt-4 text-blue-700 font-semibold">
              
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-700"></div>
            
                Loading data...
            
              </div>

            )
          }

          {/* RESULTS */}
          <div className="mt-6 grid gap-4">

            {(searchResults || []).map((village) => (

              <div
                key={village.id}
                className="bg-white border border-blue-200 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >

                <h3 className="text-2xl font-bold text-blue-700 mb-2">
                {village.name}
              </h3>

              <p className="text-gray-600">
                Village ID: {village.id}
              </p>

              <p className="text-sm text-gray-500 mt-2">
                📍 Located in India
              </p>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* FOOTER */}
      <footer className="mt-16 bg-blue-700 text-white rounded-t-3xl shadow-xl">

        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">

          <h2 className="text-xl font-bold">
            🇮🇳 All India Village API
          </h2>

          <p className="text-sm mt-3 md:mt-0">
            Built with React, Node.js, Prisma & PostgreSQL 🚀
          </p>

        </div>

      </footer>

    </div>

  );

}

export default App;