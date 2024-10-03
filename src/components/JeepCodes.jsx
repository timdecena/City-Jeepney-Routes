import React, { useState } from 'react';

const JeepRoutes = () => {
  const [input, setInput] = useState('');
  const [routes, setRoutes] = useState([]);
  const [highlightedStops, setHighlightedStops] = useState([]);

  // Color assignment for stops (Philippine-inspired colors)
  const stopColors = {
    Alpha: 'lightblue',
    Bravo: 'lightgreen',
    Charlie: 'lightcoral',
    Delta: 'lightyellow',
    Echo: 'lightred',
    Foxtrot: 'lightpurple',
    Golf: 'lightgold',
    Hotel: 'lightpink',
    India: 'plum',
    Juliet: 'lightpeach',
    Kilo: 'lightcyan',
    Lima: 'lightseagreen',
    Mike: 'lightsteelblue',
    Oscar: 'lightgreen',
    Papa: 'lightgray',
    Quebec: 'lightgold',
    Romeo: 'lightgrey',
  };

  const jeepCodesData = {
    '01A': 'Alpha <-> Bravo <-> Charlie <-> Echo <-> Golf',
    '02B': 'Alpha <-> Delta <-> Echo <-> Foxtrot <-> Golf',
    '03C': 'Charlie <-> Delta <-> Foxtrot <-> Hotel <-> India',
    '04A': 'Charlie <-> Delta <-> Echo <-> Foxtrot <-> Golf',
    '04D': 'Charlie <-> Echo <-> Foxtrot <-> Golf <-> India',
    '06B': 'Delta <-> Hotel <-> Juliet <-> Kilo <-> Lima',
    '06D': 'Delta <-> Foxtrot <-> Golf <-> India <-> Kilo',
    '10C': 'Foxtrot <-> Golf <-> Hotel <-> India <-> Juliet',
    '10H': 'Foxtrot <-> Hotel <-> Juliet <-> Lima <-> November',
    '11A': 'Foxtrot <-> Golf <-> Kilo <-> Mike <-> November',
    '11B': 'Foxtrot <-> Golf <-> Lima <-> Oscar <-> Papa',
    '20A': 'India <-> Juliet <-> November <-> Papa <-> Romeo',
    '20C': 'India <-> Kilo <-> Lima <-> Mike <-> Romeo',
    '42C': 'Juliet <-> Kilo <-> Lima <-> Mike <-> Oscar',
    '42D': 'Juliet <-> November <-> Oscar <-> Quebec <-> Romeo',
  };

  const findCommonStops = (allRoutes) => {
    const stopCounts = {};
    allRoutes.flat().forEach(stop => {
      stopCounts[stop] = (stopCounts[stop] || 0) + 1;
    });
    return Object.keys(stopCounts).filter(stop => stopCounts[stop] > 1);
  };

  const validateInput = (input) => {
    const pattern = /^[0-9]{2}[A-Z](, *[0-9]{2}[A-Z])*$/; // Basic format: 01A, 03C
    return pattern.test(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Split and trim the input into an array of jeep codes
    const jeepCodes = input.split(',').map(code => code.trim());

    // Validate input format
    if (!validateInput(input)) {
      alert('Invalid input format. Please use valid Jeep Codes (e.g., 01A, 03C)');
      return;
    }

    // Map the jeep codes to the corresponding routes
    const routes = jeepCodes.map((code) => {
      return { code, route: jeepCodesData[code] || 'No route found' };
    });

    // Collect all stops across selected routes
    const allRoutes = jeepCodes.map(code => (jeepCodesData[code] || '').split(' <-> '));

    // Determine the common stops
    const commonStops = findCommonStops(allRoutes);

    setRoutes(routes);
    setHighlightedStops(commonStops);

    // Clear the input field after submission
    setInput('');
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f8ff',
    },
    header: {
      fontSize: '2.5rem',
      color: '#0023a5',
      textShadow: '1px 1px 3px #fcd116',
      marginBottom: '20px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '20px',
    },
    input: {
      padding: '10px',
      width: '300px',
      marginBottom: '10px',
      borderRadius: '10px',
      border: '2px solid #ce1126',
      fontSize: '18px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#ce1126',
      color: '#fff',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '18px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
    },
    routeBox: {
      margin: '15px 0',
      padding: '15px',
      borderRadius: '10px',
      backgroundColor: '#fff',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      width: '420px',
      textAlign: 'center',
      border: '2px solid #007bff',
    },
    stopBox: (color) => ({
      display: 'inline-block',
      padding: '8px 12px',
      margin: '4px',
      backgroundColor: color || 'lightgray',
      borderRadius: '8px',
      fontWeight: 'bold',
      color: '#333',
      textShadow: '1px 1px 2px #fcd116',
    }),
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Jeepney Route Finder</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>Enter Jeep Codes (comma-separated):</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g., 01A, 02B"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Find Routes</button>
      </form>
      <div>
        {routes.length > 0 && routes.map((routeObj, index) => (
          <div key={index} style={styles.routeBox}>
            <h3>Route for {routeObj.code}:</h3>
            <p>
              {routeObj.route.split(' <-> ').map((stop, idx) => (
                <span key={idx} style={styles.stopBox(highlightedStops.includes(stop) ? stopColors[stop] : 'lightgray')}>
                  {stop}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JeepRoutes;
