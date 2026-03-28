import { faUpDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState, useMemo } from "react";
import "./Home.css";

function Home() {
  const [route, setRoute] = useState({ source: "", destination: "" });
  const [result, setResult] = useState(null);
  const [hover, setHover] = useState(false);
  const [allStops, setAllStops] = useState([]);
  const [busData, setBusData] = useState([]);
  const [sourceSuggestions, setSourceSuggestions] = useState([]);
  const [destSuggestions, setDestSuggestions] = useState([]);

  const sourceRef = useRef(null);
  const destRef = useRef(null);
  const containerRef = useRef(null);

  const localBusData = useMemo(() => [
    {
      Bus_ID: 1,
      Bus_Number: "1",
      Source: "kp-26",
      Destination: "campus-25",
      Stop_Name: "kp-26",
      Stop_Order: 1,
      Time: "07:00 AM",
    },
    {
      Bus_ID: 1,
      Bus_Number: "1",
      Source: "kp-26",
      Destination: "campus-25",
      Stop_Name: "campus-6",
      Stop_Order: 2,
      Time: "07:10 AM",
    },
    {
      Bus_ID: 1,
      Bus_Number: "1",
      Source: "kp-26",
      Destination: "campus-25",
      Stop_Name: "Central library",
      Stop_Order: 3,
      Time: "07:20 AM",
    },
    {
      Bus_ID: 1,
      Bus_Number: "1",
      Source: "kp-26",
      Destination: "campus-25",
      Stop_Name: "campus-14",
      Stop_Order: 4,
      Time: "07:30 AM",
    },
    {
      Bus_ID: 1,
      Bus_Number: "1",
      Source: "kp-26",
      Destination: "campus-25",
      Stop_Name: "campus-25",
      Stop_Order: 5,
      Time: "07:40 AM",
    },

    {
      Bus_ID: 1,
      Bus_Number: "11",
      Source: "kp-26",
      Destination: "campus-25",
      Stop_Name: "kp-26",
      Stop_Order: 1,
      Time: "12:00 PM",
    },
    {
      Bus_ID: 1,
      Bus_Number: "11",
      Source: "kp-26",
      Destination: "campus-25",
      Stop_Name: "campus-6",
      Stop_Order: 2,
      Time: "12:10 PM",
    },
    {
      Bus_ID: 1,
      Bus_Number: "11",
      Source: "kp-26",
      Destination: "campus-25",
      Stop_Name: "Central library",
      Stop_Order: 3,
      Time: "12:20 PM",
    },
    {
      Bus_ID: 1,
      Bus_Number: "11",
      Source: "kp-26",
      Destination: "campus-25",
      Stop_Name: "campus-14",
      Stop_Order: 4,
      Time: "12:30 PM",
    },
    {
      Bus_ID: 1,
      Bus_Number: "11",
      Source: "kp-26",
      Destination: "campus-25",
      Stop_Name: "campus-25",
      Stop_Order: 5,
      Time: "12:40 PM",
    },

    {
      Bus_ID: 1,
      Bus_Number: "21",
      Source: "kp-26",
      Destination: "campus-25",
      Stop_Name: "kp-26",
      Stop_Order: 1,
      Time: "6:00 PM",
    },
    {
      Bus_ID: 1,
      Bus_Number: "21",
      Source: "kp-26",
      Destination: "campus-25",
      Stop_Name: "campus-6",
      Stop_Order: 2,
      Time: "6:10 PM",
    },
    {
      Bus_ID: 1,
      Bus_Number: "21",
      Source: "kp-26",
      Destination: "campus-25",
      Stop_Name: "Central library",
      Stop_Order: 3,
      Time: "6:20 PM",
    },
    {
      Bus_ID: 1,
      Bus_Number: "21",
      Source: "kp-26",
      Destination: "campus-25",
      Stop_Name: "campus-14",
      Stop_Order: 4,
      Time: "6:30 PM",
    },
    {
      Bus_ID: 1,
      Bus_Number: "21",
      Source: "kp-26",
      Destination: "campus-25",
      Stop_Name: "campus-25",
      Stop_Order: 5,
      Time: "6:40 PM",
    },

    {
      Bus_ID: 2,
      Bus_Number: "2",
      Source: "Kp-26",
      Destination: "Campus-15",
      Stop_Name: "Kp-26",
      Stop_Order: 1,
      Time: "08:00 AM",
    },
    {
      Bus_ID: 2,
      Bus_Number: "2",
      Source: "Kp-26",
      Destination: "Campus-15",
      Stop_Name: "campus-6",
      Stop_Order: 2,
      Time: "08:08 AM",
    },
    {
      Bus_ID: 2,
      Bus_Number: "2",
      Source: "Kp-26",
      Destination: "Campus-15",
      Stop_Name: "campus-7",
      Stop_Order: 3,
      Time: "08:16 AM",
    },
    {
      Bus_ID: 2,
      Bus_Number: "2",
      Source: "Kp-26",
      Destination: "Campus-15",
      Stop_Name: "campus-15",
      Stop_Order: 4,
      Time: "08:24 AM",
    },

    {
      Bus_ID: 2,
      Bus_Number: "12",
      Source: "Kp-26",
      Destination: "Campus-15",
      Stop_Name: "Kp-26",
      Stop_Order: 1,
      Time: "12:00 PM",
    },
    {
      Bus_ID: 2,
      Bus_Number: "12",
      Source: "Kp-26",
      Destination: "Campus-15",
      Stop_Name: "campus-6",
      Stop_Order: 2,
      Time: "12:08 PM",
    },
    {
      Bus_ID: 2,
      Bus_Number: "12",
      Source: "Kp-26",
      Destination: "Campus-15",
      Stop_Name: "campus-7",
      Stop_Order: 3,
      Time: "12:16 PM",
    },
    {
      Bus_ID: 2,
      Bus_Number: "12",
      Source: "Kp-26",
      Destination: "Campus-15",
      Stop_Name: "campus-15",
      Stop_Order: 4,
      Time: "12:24 PM",
    },

    {
      Bus_ID: 2,
      Bus_Number: "22",
      Source: "Kp-26",
      Destination: "Campus-15",
      Stop_Name: "Kp-26",
      Stop_Order: 1,
      Time: "06:00 PM",
    },
    {
      Bus_ID: 2,
      Bus_Number: "22",
      Source: "Kp-26",
      Destination: "Campus-15",
      Stop_Name: "campus-6",
      Stop_Order: 2,
      Time: "06:08 PM",
    },
    {
      Bus_ID: 2,
      Bus_Number: "22",
      Source: "Kp-26",
      Destination: "Campus-15",
      Stop_Name: "campus-7",
      Stop_Order: 3,
      Time: "06:16 PM",
    },
    {
      Bus_ID: 2,
      Bus_Number: "22",
      Source: "Kp-26",
      Destination: "Campus-15",
      Stop_Name: "campus-15",
      Stop_Order: 4,
      Time: "06:24 PM",
    },

    {
      Bus_ID: 3,
      Bus_Number: "3",
      Source: "kp-8",
      Destination: "Campus-15",
      Stop_Name: "Kp-8",
      Stop_Order: 1,
      Time: "08:15 AM",
    },
    {
      Bus_ID: 3,
      Bus_Number: "3",
      Source: "Kp-8",
      Destination: "Campus-15",
      Stop_Name: "campus-6",
      Stop_Order: 2,
      Time: "08:25 AM",
    },
    {
      Bus_ID: 3,
      Bus_Number: "3",
      Source: "Kp-8",
      Destination: "Campus-15",
      Stop_Name: "campus-7",
      Stop_Order: 3,
      Time: "08:35 AM",
    },
    {
      Bus_ID: 3,
      Bus_Number: "3",
      Source: "Kp-8",
      Destination: "Campus-15",
      Stop_Name: "campus-17",
      Stop_Order: 4,
      Time: "08:45 AM",
    },
    {
      Bus_ID: 3,
      Bus_Number: "3",
      Source: "Kp-8",
      Destination: "Campus-15",
      Stop_Name: "campus-15",
      Stop_Order: 5,
      Time: "08:55 AM",
    },

    {
      Bus_ID: 3,
      Bus_Number: "33",
      Source: "kp-8",
      Destination: "Campus-15",
      Stop_Name: "Kp-8",
      Stop_Order: 1,
      Time: "12:15 PM",
    },
    {
      Bus_ID: 3,
      Bus_Number: "33",
      Source: "Kp-8",
      Destination: "Campus-15",
      Stop_Name: "campus-6",
      Stop_Order: 2,
      Time: "12:25 PM",
    },
    {
      Bus_ID: 3,
      Bus_Number: "33",
      Source: "Kp-8",
      Destination: "Campus-15",
      Stop_Name: "campus-7",
      Stop_Order: 3,
      Time: "12:35 PM",
    },
    {
      Bus_ID: 3,
      Bus_Number: "33",
      Source: "Kp-8",
      Destination: "Campus-15",
      Stop_Name: "campus-17",
      Stop_Order: 4,
      Time: "12:45 PM",
    },
    {
      Bus_ID: 3,
      Bus_Number: "33",
      Source: "Kp-8",
      Destination: "Campus-15",
      Stop_Name: "campus-15",
      Stop_Order: 5,
      Time: "12:55 PM",
    },

    {
      Bus_ID: 3,
      Bus_Number: "32",
      Source: "kp-8",
      Destination: "Campus-15",
      Stop_Name: "Kp-8",
      Stop_Order: 1,
      Time: "06:15 PM",
    },
    {
      Bus_ID: 3,
      Bus_Number: "32",
      Source: "Kp-8",
      Destination: "Campus-15",
      Stop_Name: "campus-6",
      Stop_Order: 2,
      Time: "06:25 PM",
    },
    {
      Bus_ID: 3,
      Bus_Number: "32",
      Source: "kp-8",
      Destination: "Campus-15",
      Stop_Name: "campus-7",
      Stop_Order: 3,
      Time: "06:35 PM",
    },
    {
      Bus_ID: 3,
      Bus_Number: "32",
      Source: "kp-8",
      Destination: "Campus-15",
      Stop_Name: "campus-17",
      Stop_Order: 4,
      Time: "06:45 PM",
    },
    {
      Bus_ID: 3,
      Bus_Number: "32",
      Source: "kp-8",
      Destination: "Campus-15",
      Stop_Name: "campus-15",
      Stop_Order: 5,
      Time: "06:55 PM",
    },

    {
      Bus_ID: 4,
      Bus_Number: "4",
      Source: "Kp-8",
      Destination: "Campus-25",
      Stop_Name: "Kp-8",
      Stop_Order: 1,
      Time: "07:10 AM",
    },
    {
      Bus_ID: 4,
      Bus_Number: "4",
      Source: "Kp-8",
      Destination: "Campus-25",
      Stop_Name: "Stadium",
      Stop_Order: 2,
      Time: "07:20 AM",
    },
    {
      Bus_ID: 4,
      Bus_Number: "4",
      Source: "Kp-8",
      Destination: "Campus-25",
      Stop_Name: "campus-6",
      Stop_Order: 3,
      Time: "07:30 AM",
    },
    {
      Bus_ID: 4,
      Bus_Number: "4",
      Source: "Kp-8",
      Destination: "Campus-25",
      Stop_Name: "campus-3",
      Stop_Order: 4,
      Time: "08:40 AM",
    },
    {
      Bus_ID: 4,
      Bus_Number: "4",
      Source: "Kp-8",
      Destination: "Campus-25",
      Stop_Name: "campus-14",
      Stop_Order: 5,
      Time: "08:50 AM",
    },
    {
      Bus_ID: 4,
      Bus_Number: "4",
      Source: "Kp-8",
      Destination: "Campus-25",
      Stop_Name: "Campus-25",
      Stop_Order: 6,
      Time: "08:00 AM",
    },

    {
      Bus_ID: 4,
      Bus_Number: "44",
      Source: "Kp-8",
      Destination: "Campus-25",
      Stop_Name: "Kp-8",
      Stop_Order: 1,
      Time: "12:00 PM",
    },
    {
      Bus_ID: 4,
      Bus_Number: "44",
      Source: "Kp-8",
      Destination: "Campus-25",
      Stop_Name: "Stadium",
      Stop_Order: 2,
      Time: "12:10 PM",
    },
    {
      Bus_ID: 4,
      Bus_Number: "44",
      Source: "Kp-8",
      Destination: "Campus-25",
      Stop_Name: "campus-6",
      Stop_Order: 3,
      Time: "12:20 PM",
    },
    {
      Bus_ID: 4,
      Bus_Number: "44",
      Source: "Kp-8",
      Destination: "Campus-25",
      Stop_Name: "campus-3",
      Stop_Order: 4,
      Time: "12:30 PM",
    },
    {
      Bus_ID: 4,
      Bus_Number: "44",
      Source: "Kp-8",
      Destination: "Campus-25",
      Stop_Name: "campus-14",
      Stop_Order: 5,
      Time: "12:40 PM",
    },
    {
      Bus_ID: 4,
      Bus_Number: "44",
      Source: "Kp-8",
      Destination: "Campus-25",
      Stop_Name: "Campus-25",
      Stop_Order: 6,
      Time: "12:50 PM",
    },

    {
      Bus_ID: 4,
      Bus_Number: "41",
      Source: "Kp-8",
      Destination: "Campus-25",
      Stop_Name: "Kp-8",
      Stop_Order: 1,
      Time: "06:00 PM",
    },
    {
      Bus_ID: 4,
      Bus_Number: "41",
      Source: "Kp-8",
      Destination: "Campus-25",
      Stop_Name: "Stadium",
      Stop_Order: 2,
      Time: "06:10 PM",
    },
    {
      Bus_ID: 4,
      Bus_Number: "41",
      Source: "Kp-8",
      Destination: "Campus-25",
      Stop_Name: "campus-6",
      Stop_Order: 3,
      Time: "06:20 PM",
    },
    {
      Bus_ID: 4,
      Bus_Number: "41",
      Source: "Kp-8",
      Destination: "Campus-25",
      Stop_Name: "campus-3",
      Stop_Order: 4,
      Time: "06:30 PM",
    },
    {
      Bus_ID: 4,
      Bus_Number: "41",
      Source: "Kp-8",
      Destination: "Campus-25",
      Stop_Name: "campus-14",
      Stop_Order: 5,
      Time: "06:40 PM",
    },
    {
      Bus_ID: 4,
      Bus_Number: "41",
      Source: "Kp-8",
      Destination: "Campus-25",
      Stop_Name: "Campus-25",
      Stop_Order: 6,
      Time: "06:50 PM",
    },

    {
      Bus_ID: 5,
      Bus_Number: "5",
      Source: "QC-4",
      Destination: "Campus-25",
      Stop_Name: "QC-4",
      Stop_Order: 1,
      Time: "07:45 AM",
    },
    {
      Bus_ID: 5,
      Bus_Number: "5",
      Source: "QC-4",
      Destination: "Campus-25",
      Stop_Name: "campus-14",
      Stop_Order: 2,
      Time: "07:52 AM",
    },
    {
      Bus_ID: 5,
      Bus_Number: "5",
      Source: "QC-4",
      Destination: "Campus-25",
      Stop_Name: "campus-25",
      Stop_Order: 3,
      Time: "07:59 AM",
    },

    {
      Bus_ID: 5,
      Bus_Number: "51",
      Source: "QC-4",
      Destination: "Campus-25",
      Stop_Name: "QC-4",
      Stop_Order: 1,
      Time: "12:45 PM",
    },
    {
      Bus_ID: 5,
      Bus_Number: "51",
      Source: "QC-4",
      Destination: "Campus-25",
      Stop_Name: "campus-14",
      Stop_Order: 2,
      Time: "12:52 PM",
    },
    {
      Bus_ID: 5,
      Bus_Number: "51",
      Source: "QC-4",
      Destination: "Campus-25",
      Stop_Name: "campus-25",
      Stop_Order: 3,
      Time: "12:59 PM",
    },

    {
      Bus_ID: 5,
      Bus_Number: "52",
      Source: "QC-4",
      Destination: "Campus-25",
      Stop_Name: "QC-4",
      Stop_Order: 1,
      Time: "6:45 PM",
    },
    {
      Bus_ID: 5,
      Bus_Number: "52",
      Source: "QC-4",
      Destination: "Campus-25",
      Stop_Name: "campus-14",
      Stop_Order: 2,
      Time: "6:52 PM",
    },
    {
      Bus_ID: 5,
      Bus_Number: "52",
      Source: "QC-4",
      Destination: "Campus-25",
      Stop_Name: "campus-25",
      Stop_Order: 3,
      Time: "6:59 PM",
    },

    {
      Bus_ID: 6,
      Bus_Number: "6",
      Source: "Campus-6",
      Destination: "Koel campus",
      Stop_Name: "Campus-6",
      Stop_Order: 1,
      Time: "08:15 AM",
    },
    {
      Bus_ID: 6,
      Bus_Number: "6",
      Source: "Campus-6",
      Destination: "Koel campus",
      Stop_Name: "Kiit Square",
      Stop_Order: 2,
      Time: "08:22 AM",
    },
    {
      Bus_ID: 6,
      Bus_Number: "6",
      Source: "Campus-6",
      Destination: "Koel campus",
      Stop_Name: "Koel campus",
      Stop_Order: 4,
      Time: "08:36 AM",
    },

    {
      Bus_ID: 6,
      Bus_Number: "61",
      Source: "Campus-6",
      Destination: "Koel campus",
      Stop_Name: "Campus-6",
      Stop_Order: 1,
      Time: "12:15 PM",
    },
    {
      Bus_ID: 6,
      Bus_Number: "61",
      Source: "Campus-6",
      Destination: "Koel campus",
      Stop_Name: "Kiit Square",
      Stop_Order: 2,
      Time: "12:22 PM",
    },
    {
      Bus_ID: 6,
      Bus_Number: "61",
      Source: "Campus-6",
      Destination: "Koel campus",
      Stop_Name: "Koel campus",
      Stop_Order: 4,
      Time: "12:36 PM",
    },

    {
      Bus_ID: 6,
      Bus_Number: "62",
      Source: "Campus-6",
      Destination: "Koel campus",
      Stop_Name: "Campus-6",
      Stop_Order: 1,
      Time: "12:15 PM",
    },
    {
      Bus_ID: 6,
      Bus_Number: "62",
      Source: "Campus-6",
      Destination: "Koel campus",
      Stop_Name: "Kiit Square",
      Stop_Order: 2,
      Time: "12:22 PM",
    },
    {
      Bus_ID: 6,
      Bus_Number: "62",
      Source: "Campus-6",
      Destination: "Koel campus",
      Stop_Name: "Koel campus",
      Stop_Order: 4,
      Time: "12:36 PM",
    },
  ], []);

  // Generate Reverse Routes
  const generateReverseRoutes = (data) => {
    const grouped = data.reduce((acc, cur) => {
      if (!acc[cur.Bus_Number]) acc[cur.Bus_Number] = [];
      acc[cur.Bus_Number].push(cur);
      return acc;
    }, {});
    const reversedRoutes = [];

    Object.keys(grouped).forEach((busNum) => {
      const routeStops = grouped[busNum].sort(
        (a, b) => a.Stop_Order - b.Stop_Order
      );
      const totalStops = routeStops.length;
      const startTime = routeStops[0].Time;
      const endTime = routeStops[totalStops - 1].Time;

      const toMinutes = (t) => {
        const [time, period] = t.split(" ");
        let [h, m] = time.split(":").map(Number);
        if (period === "PM" && h !== 12) h += 12;
        if (period === "AM" && h === 12) h = 0;
        return h * 60 + m;
      };

      const fromMinutes = (mins) => {
        const h = Math.floor(mins / 60) % 24;
        const m = Math.floor(mins % 60);
        const period = h >= 12 ? "PM" : "AM";
        const hr = h % 12 || 12;
        return `${hr}:${m < 10 ? "0" : ""}${m} ${period}`;
      };

      const start = toMinutes(startTime);
      const end = toMinutes(endTime);
      const diff = (end - start) / (totalStops - 1);

      const reversedStops = [...routeStops].reverse();
      reversedStops.forEach((stop, idx) => {
        const newMinutes = end + idx * diff;
        reversedRoutes.push({
          Bus_ID: stop.Bus_ID,
          Bus_Number: stop.Bus_Number + "-R",
          Source: routeStops[routeStops.length - 1].Destination,
          Destination: routeStops[0].Source,
          Stop_Name: stop.Stop_Name,
          Stop_Order: idx + 1,
          Time: fromMinutes(newMinutes),
        });
      });
    });

    return reversedRoutes;
  };

  // Load routes
  useEffect(() => {
    const reverseData = generateReverseRoutes(localBusData);
    const allData = [...localBusData, ...reverseData];
    setBusData(allData);
    const uniqueStops = [
      ...new Set(allData.map((r) => r.Stop_Name.trim().toLowerCase())),
    ];
    setAllStops(uniqueStops);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localBusData]);

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setSourceSuggestions([]);
        setDestSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoute({ ...route, [name]: value });
    setResult(null);

    if (value.length >= 2) {
      const filtered = allStops.filter((stop) =>
        stop.toLowerCase().includes(value.toLowerCase())
      );
      if (name === "source") setSourceSuggestions(filtered);
      if (name === "destination") setDestSuggestions(filtered);
    } else {
      if (name === "source") setSourceSuggestions([]);
      if (name === "destination") setDestSuggestions([]);
    }
  };

  const handleSelect = (name, value) => {
    setRoute({ ...route, [name]: value });
    if (name === "source") setSourceSuggestions([]);
    if (name === "destination") setDestSuggestions([]);
  };

  const handleSwap = () => {
    setRoute((prev) => {
      const swapped = { source: prev.destination, destination: prev.source };
      setTimeout(() => handleSearch(null, swapped), 100);
      return swapped;
    });
  };

  // Search Logic
  const handleSearch = (e, swappedRoute = null) => {
    if (e) e.preventDefault();
    const currentRoute = swappedRoute || route;

    if (!currentRoute.source || !currentRoute.destination) {
      alert("Please enter both Source and Destination");
      return;
    }

    const source = currentRoute.source.trim().toLowerCase();
    const destination = currentRoute.destination.trim().toLowerCase();

    const grouped = busData.reduce((acc, item) => {
      if (!acc[item.Bus_Number]) acc[item.Bus_Number] = [];
      acc[item.Bus_Number].push(item);
      return acc;
    }, {});

    const foundRoutes = [];

    Object.keys(grouped).forEach((bus) => {
      const routeStops = grouped[bus].sort(
        (a, b) => a.Stop_Order - b.Stop_Order
      );
      const stops = routeStops.map((r) => r.Stop_Name.trim().toLowerCase());
      const times = routeStops.map((r) => r.Time);
      const srcIndex = stops.indexOf(source);
      const destIndex = stops.indexOf(destination);

      if (srcIndex !== -1 && destIndex !== -1 && srcIndex < destIndex) {
        foundRoutes.push({
          bus_number: grouped[bus][0].Bus_Number,
          route_name: `${routeStops[0].Source} ➝ ${
            routeStops[routeStops.length - 1].Destination
          }`,
          departure_time: times[srcIndex],
          stops: stops.slice(srcIndex, destIndex + 1),
          timings: routeStops
            .slice(srcIndex, destIndex + 1)
            .map((r) => `${r.Stop_Name} (${r.Time})`),
        });
      }
    });

    if (foundRoutes.length === 0) {
      setResult("No direct bus found");
      return;
    }

    setResult(foundRoutes);
  };

  const styles = {
    container: {
      marginTop: "50px",
      padding: "80px",
      textAlign: "center",
      minHeight: "calc(100vh - 100px)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    mainFlex: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      flexWrap: "wrap",
      gap: "20px",
      width: "100%",
    },
    routeBox: {
      flex: "1 1 350px",
      maxWidth: "500px",
      padding: "30px 20px",
      background: "rgba(0, 0, 0, 0.71)",
      borderRadius: "12px",
      textAlign: "left",
      position: "relative",
    },
    label: { color: "#fff" },
    inputWrapper: { position: "relative", width: "100%", marginBottom: "15px" },
    input: {
      width: "90%",
      padding: "12px 40px 12px 12px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "16px",
    },
    swapInside: {
      position: "absolute",
      right: "20px",
      top: "50%",
      transform: "translateY(-50%)",
      backgroundColor: "#00C853",
      color: "white",
      border: "none",
      borderRadius: "50%",
      width: "42px",
      height: "42px",
      fontSize: "16px",
      cursor: "pointer",
    },
    suggestions: {
      position: "absolute",
      width: "90%",
      top: "100%",
      left: 0,
      background: "rgba(0, 0, 0, 0.9)",
      border: "1px solid #ccc",
      borderRadius: "6px",
      maxHeight: "150px",
      overflowY: "auto",
      color: "white",
      zIndex: 9999,
    },
    suggestionItem: { padding: "10px", cursor: "pointer" },
    button: {
      position: "relative",
      top: "10px",
      width: "90%",
      padding: "12px",
      backgroundColor: hover ? "#00e676" : "#00C853",
      border: "none",
      color: "#fff",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold",
    },
    resultBox: {
      padding: "30px",
      background: "#e8f4ff",
      borderLeft: "5px solid #007bff",
      borderRadius: "8px",
      textAlign: "left",
      color: "black",
      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      minWidth: "320px",
      maxHeight: "62vh",
      overflowY: "auto",
      scrollbarWidth: "thin",
      scrollbarColor: "#007bff #e8f4ff",
    },
  };

  return (
    <div style={styles.container} ref={containerRef}>
      <div style={styles.mainFlex}>
        <div style={styles.routeBox}>
          <h2 style={{ textAlign: "center", color: "#00C853" }}>
            Find Route 🔍
          </h2>

          <form onSubmit={handleSearch}>
            <label style={styles.label}>Source</label>
            <div style={styles.inputWrapper}>
              <input
                type="text"
                name="source"
                placeholder="Enter start point"
                value={route.source}
                onChange={handleChange}
                style={styles.input}
                ref={sourceRef}
              />
              {sourceSuggestions.length > 0 && (
                <div style={styles.suggestions}>
                  {sourceSuggestions.map((s, i) => (
                    <div
                      key={i}
                      style={styles.suggestionItem}
                      onClick={() => handleSelect("source", s)}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleSwap}
              style={styles.swapInside}
            >
              <FontAwesomeIcon icon={faUpDown} />
            </button>

            <label style={styles.label}>Destination</label>
            <div style={styles.inputWrapper}>
              <input
                type="text"
                name="destination"
                placeholder="Enter end point"
                value={route.destination}
                onChange={handleChange}
                style={styles.input}
                ref={destRef}
              />
              {destSuggestions.length > 0 && (
                <div style={styles.suggestions}>
                  {destSuggestions.map((s, i) => (
                    <div
                      key={i}
                      style={styles.suggestionItem}
                      onClick={() => handleSelect("destination", s)}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              style={styles.button}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              Search
            </button>
          </form>
        </div>

        {result && (
          <div style={styles.resultBox}>
            {typeof result === "string" ? (
              <p>{result}</p>
            ) : (
              <>
                <h3 style={{ color: "black" }}>Available Buses:</h3>
                {result.map((bus, i) => (
                  <div
                    key={i}
                    style={{
                      marginBottom: "20px",
                      borderBottom: "1px solid #ccc",
                      paddingBottom: "10px",
                    }}
                  >
                    <h4 style={{ color: "#007bff" }}>
                      Bus Number: {bus.bus_number}
                    </h4>
                    <p>
                      <strong>Full Route:</strong> {bus.route_name}
                    </p>
                    <p>
                      <strong>Selected Route:</strong> {route.source} →{" "}
                      {route.destination}
                    </p>
                    <p>
                      <strong>Stops Between:</strong> {bus.stops.join(" → ")}
                    </p>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      {bus.timings.map((t, j) => (
                        <li key={j}>{t}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
