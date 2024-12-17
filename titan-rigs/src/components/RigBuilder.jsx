import React, { useState, useEffect, useContext } from "react";
import "./RigBuilder.css";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const RigBuilder = () => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [selectedBrand, setSelectedBrand] = useState("Intel");
  const [processors, setProcessors] = useState([]);
  const [selectedProcessor, setSelectedProcessor] = useState(null);
  const [motherboards, setMotherboards] = useState([]);
  const [selectedMotherboard, setSelectedMotherboard] = useState(null);
  const [ram, setRam] = useState([]);
  const [selectedRam, setSelectedRam] = useState(null);
  const [ssds, setSsds] = useState([]);
  const [selectedSsd, setSelectedSsd] = useState(null); // SSD state
  const [gpus, setGpus] = useState([]);
  const [selectedGpu, setSelectedGpu] = useState(null); // GPU state
  const [aios, setAios] = useState([]);
  const [selectedAio, setSelectedAio] = useState(null); // AIO state
  const [psus, setPsus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cabinets, setCabinets] = useState([]);
  const [selectedCabinet, setSelectedCabinet] = useState(null);

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

      // Fetch processor image URLs
      const processorsWithImages = await Promise.all(
        data.processors.map(async (processor) => {
          // Fetch the image URL for the processor
          const imageResponse = await fetch(
            `http://localhost:5000/api/products/category/images/processors/${processor.id}`
          );
          const imageData = await imageResponse.json();

          // Add image_url to the processor object
          return {
            ...processor,
            image_url: imageData.image_url || "default-image-placeholder.png", // Default image if not found
          };
        })
      );

      setProcessors(processorsWithImages); // Set the processor state with the image URLs included
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

      // Fetch motherboard image URLs
      const motherboardsWithImages = await Promise.all(
        data.motherboards.map(async (motherboard) => {
          // Fetch the image URL for the motherboard
          const imageResponse = await fetch(
            `http://localhost:5000/api/products/category/images/motherboard/${motherboard.id}`
          );
          const imageData = await imageResponse.json();

          // Add image_url to the motherboard object
          return {
            ...motherboard,
            image_url: imageData.image_url || "default-image-placeholder.png", // Default image if not found
          };
        })
      );

      setMotherboards(motherboardsWithImages); // Set the motherboard state with the image URLs included
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch RAM based on the ddrType in motherboard
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

      // Fetch RAM image URLs
      const ramWithImages = await Promise.all(
        data.ram.map(async (ram) => {
          // Fetch the image URL for the RAM
          const imageResponse = await fetch(
            `http://localhost:5000/api/products/category/images/ram/${ram.id}`
          );
          const imageData = await imageResponse.json();

          // Add image_url to the RAM object
          return {
            ...ram,
            image_url: imageData.image_url || "default-image-placeholder.png", // Default image if not found
          };
        })
      );

      setRam(ramWithImages); // Set the RAM state with the image URLs included
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all the SSDs
  const fetchAllSsds = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:5000/api/products/ssds");
      if (!response.ok) {
        throw new Error(`Failed to fetch SSDs: ${response.statusText}`);
      }
      const data = await response.json();

      // Fetch SSD image URLs
      const ssdsWithImages = await Promise.all(
        data.ssds.map(async (ssd) => {
          // Fetch the image URL for the SSD
          const imageResponse = await fetch(
            `http://localhost:5000/api/products/category/images/ssd/${ssd.id}`
          );
          const imageData = await imageResponse.json();

          // Add image_url to the SSD object
          return {
            ...ssd,
            image_url: imageData.image_url || "default-image-placeholder.png", // Default image if not found
          };
        })
      );

      setSsds(ssdsWithImages); // Set the Ssds state with the image URLs included
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all the GPUs
  const fetchAllGpus = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:5000/api/products/gpus");
      if (!response.ok) {
        throw new Error(`Failed to fetch GPUs: ${response.statusText}`);
      }
      const data = await response.json();

      // Fetch GPU image URLs
      const gpusWithImages = await Promise.all(
        data.gpus.map(async (gpu) => {
          // Fetch the image URL for the GPU
          const imageResponse = await fetch(
            `http://localhost:5000/api/products/category/images/gpu/${gpu.id}`
          );
          const imageData = await imageResponse.json();

          // Add image_url to the GPU object
          return {
            ...gpu,
            image_url: imageData.image_url || "default-image-placeholder.png", // Default image if not found
          };
        })
      );

      setGpus(gpusWithImages); // Set the Gpus state with the image URLs included
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all AIOs after selecting GPU
  const fetchAllAios = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:5000/api/products/aios");
      if (!response.ok) {
        throw new Error(`Failed to fetch AIOs: ${response.statusText}`);
      }
      const data = await response.json();

      if (data.aios) {
        // For each AIO, fetch its image URL using the /images/:productType/:productId endpoint
        const aiosWithImages = await Promise.all(
          data.aios.map(async (aio) => {
            try {
              const imageResponse = await fetch(
                `http://localhost:5000/api/products/images/aio/${aio.id}`
              );
              const imageData = await imageResponse.json();
              return {
                ...aio,
                image_url:
                  imageData.image_url || "default-image-placeholder.png",
              };
            } catch (error) {
              console.error(
                `Error fetching image for AIO ${aio.id}: ${error.message}`
              );
              return {
                ...aio,
                image_url: "default-image-placeholder.png", // Fallback in case of an error
              };
            }
          })
        );

        setAios(aiosWithImages); // Set the AIOs state with the image URLs included

        // If a selectedAio is already set, update it with its corresponding image URL
        if (selectedAio) {
          const selectedAioWithImage = aiosWithImages.find(
            (aio) => aio.id === selectedAio.id
          );
          if (selectedAioWithImage) {
            setSelectedAio(selectedAioWithImage); // Update selectedAio with the image_url
          }
        }
      } else {
        setAios([]); // If no data.aios exists
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

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

  // Fetch cabinets based on selected AIO length
  const fetchCabinetsByAioLength = async (aioLength) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/cabinets/${aioLength}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch cabinets: ${response.statusText}`);
      }
      const data = await response.json();

      // Fetch cabinet image URLs
      const cabinetsWithImages = await Promise.all(
        data.cabinets.map(async (cabinet) => {
          // Fetch the image URL for the cabinet
          const imageResponse = await fetch(
            `http://localhost:5000/api/products/category/images/cabinet/${cabinet.id}`
          );
          const imageData = await imageResponse.json();

          // Add image_url to the cabinet object
          return {
            ...cabinet,
            image_url: imageData.image_url || "default-image-placeholder.png", // Default image if not found
          };
        })
      );

      setCabinets(cabinetsWithImages); // Set the cabinet state with the image URLs included
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle adding selected components to the cart
  const handleAddToCart = () => {
    if (
      selectedProcessor &&
      selectedMotherboard &&
      selectedRam &&
      selectedSsd &&
      selectedGpu &&
      selectedAio &&
      selectedCabinet
    ) {
      const rig = [
        {
          id: selectedProcessor.id,
          name: selectedProcessor.name,
          type: "Processor",
          price: selectedProcessor.price,
          image_url: selectedProcessor.image_url,
        },
        {
          id: selectedMotherboard.id,
          name: selectedMotherboard.name,
          type: "Motherboard",
          price: selectedMotherboard.price,
          image_url: selectedMotherboard.image_url,
        },
        {
          id: selectedRam.id,
          name: selectedRam.name,
          type: "RAM",
          price: selectedRam.price,
          image_url: selectedRam.image_url,
        },
        {
          id: selectedSsd.id,
          name: selectedSsd.name,
          type: "SSD",
          price: selectedSsd.price,
          image_url: selectedSsd.image_url,
        },
        {
          id: selectedGpu.id,
          name: selectedGpu.name,
          type: "GPU",
          price: selectedGpu.price,
          image_url: selectedGpu.image_url,
        },
        {
          id: selectedAio.id,
          name: selectedAio.name,
          type: "AIO",
          price: selectedAio.price,
          image_url: selectedAio.image_url,
        },
        {
          id: selectedCabinet.id,
          name: selectedCabinet.name,
          type: "Cabinet",
          price: selectedCabinet.price,
          image_url: selectedCabinet.image_url,
        },
      ];

      addToCart(rig); // Add the rig configuration to the cart
      navigate("/add-to-cart");
    } else {
      alert("Please select all components before adding to the cart.");
    }
  };

  // Handle processor change
  const handleProcessorChange = (e) => {
    const processorId = e.target.value;
    const processor = processors.find((p) => p.id === parseInt(processorId));
    setSelectedProcessor(processor);
  };

  // Handle motherboard change
  const handleMotherboardChange = (e) => {
    const motherboardId = e.target.value;
    const motherboard = motherboards.find(
      (m) => m.id === parseInt(motherboardId)
    );
    setSelectedMotherboard(motherboard);
    fetchRamByDdrType(motherboard.ddrtype);
  };

  // Handle RAM change
  const handleRamChange = (e) => {
    const selectedRamId = e.target.value;
    const selectedRam = ram.find((r) => r.id === parseInt(selectedRamId));
    setSelectedRam(selectedRam);
    fetchAllSsds();
  };

  // Handle SSD change
  const handleSsdChange = (e) => {
    const selectedSsdId = e.target.value;
    const selectedSsd = ssds.find((s) => s.id === parseInt(selectedSsdId));
    setSelectedSsd(selectedSsd);
    fetchAllGpus();
  };

  // Handle GPU change
  const handleGpuChange = (e) => {
    const selectedGpuId = e.target.value;
    const selectedGpu = gpus.find((gpu) => gpu.id === parseInt(selectedGpuId));
    setSelectedGpu(selectedGpu);
    fetchAllAios();
  };

  // Handle AIO change
  const handleAioChange = (e) => {
    const selectedAioId = e.target.value;
    const selectedAio = aios.find((aio) => aio.id === parseInt(selectedAioId));
    setSelectedAio(selectedAio);
    fetchPsus(selectedProcessor.maxtdp); // Assuming the processor TDP is needed
    fetchCabinetsByAioLength(
      parseInt(selectedAio.len.replace(/[^\d]/g, ""), 10)
    );
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

  useEffect(() => {
    if (selectedAio) {
      fetchCabinetsByAioLength(selectedAio.len.replace(/[^\d]/g, ""), 10);
    }
  }, [selectedAio]);

  return (
    <div className="dropdown-container">
      {/* Processor Brand Dropdown */}
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

      {/* Processor Dropdown */}
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

      {/* Motherboard Dropdown */}
      {selectedProcessor && (
        <div>
          <label className="dropdown-label">Select Motherboard:</label>
          <div className="dropdown">
            <select
              value={selectedMotherboard?.id || ""}
              onChange={handleMotherboardChange}
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
              value={selectedSsd?.id || ""}
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
      {selectedSsd && (
        <div>
          <label className="dropdown-label">Select GPU:</label>
          <div className="dropdown">
            <select
              value={selectedGpu?.id || ""}
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
      {selectedGpu && (
        <div>
          <label className="dropdown-label">Select AIO:</label>
          <div className="dropdown">
            <select
              value={selectedAio?.id || ""}
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
      {selectedAio && (
        <div>
          <label className="dropdown-label">Select PSU:</label>
          <div className="dropdown">
            <select className="dropdown-select">
              {psus.length > 0
                ? psus.map((psu) => (
                    <option key={psu.id} value={psu.id}>
                      {psu.name} - {psu.watt}W - {psu.price}$
                    </option>
                  ))
                : !loading && <option>No PSUs available</option>}
            </select>
          </div>
        </div>
      )}

      {/* Cabinet Dropdown */}
      {selectedAio && (
        <div>
          <label className="dropdown-label">Select Cabinet:</label>
          <div className="dropdown">
            <select
              value={selectedCabinet?.id || ""}
              onChange={(e) =>
                setSelectedCabinet(
                  cabinets.find(
                    (cabinet) => cabinet.id === parseInt(e.target.value)
                  )
                )
              }
              className="dropdown-select"
            >
              {cabinets.length > 0
                ? cabinets.map((cabinet) => (
                    <option key={cabinet.id} value={cabinet.id}>
                      {cabinet.name} - {cabinet.price}$
                    </option>
                  ))
                : !loading && <option>No cabinets available</option>}
            </select>
          </div>
        </div>
      )}

      {/* Add to Cart Button */}
      <div className="add-to-cart-container">
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default RigBuilder;
