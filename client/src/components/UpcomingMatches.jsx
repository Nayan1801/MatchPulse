import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const UpcomingMatchesSection = () => {
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLeague, setSelectedLeague] = useState("All");

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/matches`);
        setMatches(res.data.matches);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load match data.");
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  useEffect(() => {
    if (selectedLeague === "All") {
      setFilteredMatches(matches);
    } else {
      setFilteredMatches(
        matches.filter((match) => match.competition.name === selectedLeague)
      );
    }
  }, [matches, selectedLeague]);

  const leagues = [...new Set(matches.map((m) => m.competition.name))];

  return (
    <div className="px-4 py-10 bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen">
      <h2 className="text-4xl font-bold mb-6 text-center text-blue-900">
        Upcoming Matches
      </h2>

      <div className="flex justify-center mb-6">
        <select
          value={selectedLeague}
          onChange={(e) => setSelectedLeague(e.target.value)}
          className="border border-blue-300 rounded-md px-4 py-2 text-black bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <option value="All">All Leagues</option>
          {leagues.map((league) => (
            <option key={league} value={league}>
              {league}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-40">
          <motion.div
            className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1 }}
          />
        </div>
      )}

      {error && (
        <div className="text-red-600 text-center font-semibold">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading &&
          filteredMatches.map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
                
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-gray-600">
                  {match.competition.name}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(match.utcDate).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <img
                    src={match.homeTeam.crest}
                    alt={match.homeTeam.name}
                    className="w-16 h-16 rounded-full border-2 border-blue-300"
                  />
                  <p className="font-medium text-gray-800 text-lg">
                    {match.homeTeam.name}
                  </p>
                </div>
                <span className="font-semibold text-blue-600 text-2xl">
                  {match.score.fullTime.home} - {match.score.fullTime.away}
                </span>
                <div className="flex items-center gap-4">
                  <img
                    src={match.awayTeam.crest}
                    alt={match.awayTeam.name}
                    className="w-16 h-16 rounded-full border-2 border-blue-300"
                  />
                  <p className="font-medium text-gray-800 text-lg">
                    {match.awayTeam.name}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default UpcomingMatchesSection;
