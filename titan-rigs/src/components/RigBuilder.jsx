import React, { useState, useEffect } from "react";
import "./RigBuilder.css";

const RigBuilder = () => {
  const [selectedBrand, setSelectedBrand] = useState("Intel");
  const [processors, setProcessors] = useState([]);
  const [selectedProcessor, setSelectedProcessor] = useState(null);
  const [motherboards, setMotherboards] = useState([]);
  const [selectedMotherboard, setSelectedMotherboard] = useState(null); // New state for selected motherboard
  const [ram, setRam] = useState([]); // State for RAM
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

  // Fetch RAM based on DDR type
  const fetchRamByDdrType = async (ddrtype) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:5000/api/products/ram/${ddrtype}`
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

  // Fetch processors when the selected brand changes
  useEffect(() => {
    fetchProcessorsByBrand(selectedBrand);
  }, [selectedBrand]);

  // Fetch motherboards when the selected processor changes
  useEffect(() => {
    if (selectedProcessor) {
      const chipset = selectedProcessor.chipset; // Get the chipset from the selected processor
      fetchMotherboardsByChipset(chipset); // Fetch motherboards with the same chipset
    }
  }, [selectedProcessor]);

  // Fetch RAM when a motherboard is selected
  useEffect(() => {
    if (selectedMotherboard) {
      const ddrtype = selectedMotherboard.ddrtype; // Get DDR type from selected motherboard
      fetchRamByDdrType(ddrtype); // Fetch RAM with the same DDR type
    }
  }, [selectedMotherboard]);

  // Handle brand change
  const handleBrandChange = (e) => {
    const selected = e.target.value;
    setSelectedBrand(selected);
    setSelectedProcessor(null); // Reset selected processor when brand changes
    setMotherboards([]); // Reset motherboards list
    setRam([]); // Reset RAM list
    setSelectedMotherboard(null); // Reset selected motherboard
  };

  // Handle processor change
  const handleProcessorChange = (e) => {
    const processorId = e.target.value;
    const processor = processors.find((p) => p.id === parseInt(processorId));
    setSelectedProcessor(processor); // Set selected processor
    setMotherboards([]); // Reset motherboard list
    setRam([]); // Reset RAM list
    setSelectedMotherboard(null); // Reset selected motherboard
  };

  // Handle motherboard change
  const handleMotherboardChange = (e) => {
    const motherboardId = e.target.value;
    const motherboard = motherboards.find(
      (m) => m.id === parseInt(motherboardId)
    );
    setSelectedMotherboard(motherboard); // Set selected motherboard
  };

  return (
    <div className="dropdown-container">
      {/* Brand Dropdown */}
      <label className="dropdown-label">Select Processor Brand:</label>
      <div className="dropdown">
        <select
          value={selectedBrand}
          onChange={handleBrandChange}
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
                  {processor.name}
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
              onChange={handleMotherboardChange}
              className="dropdown-select"
            >
              {loading && <option>Loading motherboards...</option>}
              {error && <option>Error: {error}</option>}
              {motherboards.length > 0
                ? motherboards.map((motherboard) => (
                    <option key={motherboard.id} value={motherboard.id}>
                      {motherboard.name} - {motherboard.formfactor} -{" "}
                      {motherboard.price}$
                    </option>
                  ))
                : !loading && <option>No motherboards available</option>}
            </select>
          </div>
        </div>
      )}

      {/* Display selected options */}
      <div className="selected-option">
        {selectedProcessor && (
          <p>
            You have selected: <strong>{selectedProcessor.name}</strong> with{" "}
            <strong>{selectedProcessor.chipset}</strong> chipset.
          </p>
        )}
        {selectedMotherboard && (
          <p>
            You have selected: <strong>{selectedMotherboard.name}</strong> with{" "}
            <strong>{selectedMotherboard.ddrtype}</strong> DDR type.
          </p>
        )}
      </div>
    </div>
  );
};

export default RigBuilder;