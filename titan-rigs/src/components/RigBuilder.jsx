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
  const [gpus, setGpus] = useState([]);
  const [aios, setAios] = useState([]);
  const [psus, setPsus] = useState([]); // PSU state
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

  // Fetch all GPUs after selecting SSD
  const fetchAllGpus = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:5000/api/products/gpus");

      if (!response.ok) {
        throw new Error(`Failed to fetch GPUs: ${response.statusText}`);
      }

      const data = await response.json();
      setGpus(data.gpus);
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all AIOs after selecting SSD
  const fetchAllAios = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:5000/api/products/aios");

      if (!response.ok) {
        throw new Error(`Failed to fetch Aios: ${response.statusText}`);
      }

      const data = await response.json();
      setAios(data.aios);
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all PSUs after selecting AIO
  // Fetch PSUs based on max TDP (3x the maximum wattage)
  const fetchPsus = async (processorTdp) => {
    setLoading(true);
    setError("");
    const minWatt = processorTdp * 3;
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/psu/${minWatt}`
      );
      if (!response.ok)
        throw new Error(`Failed to fetch PSUs: ${response.statusText}`);
      const data = await response.json();
      setPsus(data.psus);
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
    fetchAllSsds();
  };

  // Handle SSD selection
  const handleSsdChange = (e) => {
    const selectedSsdId = e.target.value;
    const selectedSsd = ssds.find((s) => s.id === parseInt(selectedSsdId));
    setSelectedRam(selectedSsd); // You can modify this based on your use case
    fetchAllGpus(); // Fetch all GPUs after selecting SSD
  };

  // Handle GPU selection
  const handleGpuChange = (e) => {
    const selectedGpuId = e.target.value;
    const selectedGpu = gpus.find((gpu) => gpu.id === parseInt(selectedGpuId));
    setSelectedRam(selectedGpu); // You can modify this based on your use case
    fetchAllAios(); // Fetch all AIOs after selecting GPU
  };

  // Handle AIO selection
  const handleAioChange = (e) => {
    const selectedAioId = e.target.value;
    const selectedAio = aios.find((aio) => aio.id === parseInt(selectedAioId));
    setSelectedRam(selectedAio); // You can modify this based on your use case
    fetchPsus(); // Fetch all PSUs after selecting AIO
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
                fetchRamByDdrType(motherboard.ddrtype);
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
            <select
              value={selectedRam?.id || ""}
              onChange={handleSsdChange}
              className="dropdown-select"
            >
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

      {/* GPU Dropdown */}
      {selectedRam && (
        <div>
          <label className="dropdown-label">Select GPU:</label>
          <div className="dropdown">
            <select
              value={selectedRam?.id || ""}
              onChange={handleGpuChange}
              className="dropdown-select"
            >
              {gpus.length > 0
                ? gpus.map((gpu) => (
                    <option key={gpu.id} value={gpu.id}>
                      {gpu.name} - {gpu.memory}GB - {gpu.price}$
                    </option>
                  ))
                : !loading && <option>No GPUs available</option>}
            </select>
          </div>
        </div>
      )}

      {/* AIO Dropdown */}
      {selectedRam && (
        <div>
          <label className="dropdown-label">Select AIO:</label>
          <div className="dropdown">
            <select
              value={selectedRam?.id || ""}
              onChange={handleAioChange}
              className="dropdown-select"
            >
              {aios.length > 0
                ? aios.map((aio) => (
                    <option key={aio.id} value={aio.id}>
                      {aio.name} - {aio.memory}GB - {aio.price}$
                    </option>
                  ))
                : !loading && <option>No AIOs available</option>}
            </select>
          </div>
        </div>
      )}

      {/* PSU Dropdown */}
      {selectedRam && (
        <div>
          <label className="dropdown-label">Select PSU:</label>
          <div className="dropdown">
            <select className="dropdown-select">
              {psus.length > 0
                ? psus.map((psu) => (
                    <option key={psu.id} value={psu.id}>
                      {psu.name} - {psu.watt} - {psu.price}$
                    </option>
                  ))
                : !loading && <option>No PSUs available</option>}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default RigBuilder;