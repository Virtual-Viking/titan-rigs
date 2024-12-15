import React, { useState, useEffect } from "react";
import "./RigBuilder.css";

const RigBuilder = () => {
  const [selectedBrand, setSelectedBrand] = useState("Intel");
  const [processors, setProcessors] = useState([]);
  const [selectedProcessor, setSelectedProcessor] = useState(null);
  const [motherboards, setMotherboards] = useState([]);
  const [selectedMotherboard, setSelectedMotherboard] = useState(null);
  const [ram, setRam] = useState([]);
  const [selectedRam, setSelectedRam] = useState(null);
  const [ssds, setSsds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch processors based on selected brand
  const fetchProcessorsByBrand = async (brand) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:5000/api/products/processors/${brand.toLowerCase()}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch processors: ${response.statusText}`);
      }

      const data = await response.json();
      setProcessors(data.processors);
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch motherboards based on the selected processor's chipset
  const fetchMotherboardsByChipset = async (chipset) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:5000/api/products/motherboards/${chipset}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch motherboards: ${response.statusText}`);
      }

      const data = await response.json();
      setMotherboards(data.motherboards);
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch RAM based on selected motherboard's DDR type
  const fetchRamByDdrType = async (ddrType) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:5000/api/products/ram/${ddrType}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch RAM: ${response.statusText}`);
      }

      const data = await response.json();
      setRam(data.ram);
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all SSDs when RAM is selected (no filtering condition)
  const fetchAllSsds = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/products/ssds");

      if (!response.ok) {
        throw new Error(`Failed to fetch SSDs: ${response.statusText}`);
      }

      const data = await response.json();
      setSsds(data.ssds);
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle RAM selection
  const handleRamChange = (e) => {
    const selectedRamId = e.target.value;
    const selectedRam = ram.find((r) => r.id === parseInt(selectedRamId));
    setSelectedRam(selectedRam);
    fetchAllSsds(); // Fetch all SSDs after selecting RAM
  };

  // Handle processor change
  const handleProcessorChange = (e) => {
    const processorId = e.target.value;
    const processor = processors.find((p) => p.id === parseInt(processorId));
    setSelectedProcessor(processor);
  };

  // Fetch processors when the selected brand changes
  useEffect(() => {
    fetchProcessorsByBrand(selectedBrand);
  }, [selectedBrand]);

  // Fetch motherboards when the selected processor changes
  useEffect(() => {
    if (selectedProcessor) {
      const chipset = selectedProcessor.chipset;
      fetchMotherboardsByChipset(chipset);
    }
  }, [selectedProcessor]);

  // Fetch RAM when a motherboard is selected
  useEffect(() => {
    if (selectedMotherboard) {
      const ddrType = selectedMotherboard.ddrtype;
      fetchRamByDdrType(ddrType);
    }
  }, [selectedMotherboard]);

  return (
    <div className="dropdown-container">
      {/* Brand Dropdown */}
      <label className="dropdown-label">Select Processor Brand:</label>
      <div className="dropdown">
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="dropdown-select"
        >
          <option value="Intel">Intel</option>
          <option value="AMD">AMD</option>
        </select>
      </div>

      {/* Processors Dropdown */}
      <label className="dropdown-label">Select Processor:</label>
      <div className="dropdown">
        <select
          value={selectedProcessor?.id || ""}
          onChange={handleProcessorChange}
          className="dropdown-select"
        >
          {loading && <option>Loading processors...</option>}
          {error && <option>Error: {error}</option>}
          {processors.length > 0
            ? processors.map((processor) => (
                <option key={processor.id} value={processor.id}>
                  {processor.name} - {processor.price}$
                </option>
              ))
            : !loading && <option>No processors available</option>}
        </select>
      </div>

      {/* Motherboards Dropdown */}
      {selectedProcessor && (
        <div>
          <label className="dropdown-label">Select Motherboard:</label>
          <div className="dropdown">
            <select
              value={selectedMotherboard?.id || ""}
              onChange={(e) => {
                const motherboard = motherboards.find(
                  (m) => m.id === parseInt(e.target.value)
                );
                setSelectedMotherboard(motherboard);
                fetchRamByDdrType(motherboard.ddrtype); // Fetch RAM based on motherboard's DDR type
              }}
              className="dropdown-select"
            >
              {motherboards.length > 0
                ? motherboards.map((motherboard) => (
                    <option key={motherboard.id} value={motherboard.id}>
                      {motherboard.name} - {motherboard.price}$
                    </option>
                  ))
                : !loading && <option>No motherboards available</option>}
            </select>
          </div>
        </div>
      )}

      {/* RAM Dropdown */}
      {selectedMotherboard && (
        <div>
          <label className="dropdown-label">Select RAM:</label>
          <div className="dropdown">
            <select
              value={selectedRam?.id || ""}
              onChange={handleRamChange}
              className="dropdown-select"
            >
              {ram.length > 0
                ? ram.map((ramItem) => (
                    <option key={ramItem.id} value={ramItem.id}>
                      {ramItem.name} - {ramItem.price}$
                    </option>
                  ))
                : !loading && <option>No RAM available</option>}
            </select>
          </div>
        </div>
      )}

      {/* SSD Dropdown */}
      {selectedRam && (
        <div>
          <label className="dropdown-label">Select SSD:</label>
          <div className="dropdown">
            <select className="dropdown-select">
              {ssds.length > 0
                ? ssds.map((ssd) => (
                    <option key={ssd.id} value={ssd.id}>
                      {ssd.name} - {ssd.price}$
                    </option>
                  ))
                : !loading && <option>No SSDs available</option>}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default RigBuilder;
