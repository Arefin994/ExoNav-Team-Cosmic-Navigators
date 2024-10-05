import { useEffect, useRef, useState } from "react";
import { assets } from "../../assets/assets";
import "./newPrompt.css";
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";
import model from "../../lib/Gemini";
import Markdown from "react-markdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const NewPrompt = ({ data }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });

  const isGreeting = (text) => {
    const greetings = [
      "hello",
      "hi",
      "hey",
      "greetings",
      "good morning",
      "good afternoon",
      "good evening",
    ];

    return greetings.some((greeting) => text.toLowerCase().includes(greeting));
  };

  const isRelevantQuestion = (text) => {
    const keywords = [
      "exoplanet",
      "space",
      "planet",
      "astronomy",
      "universe",
      "stars",
      "galaxy",
      "cosmos",
      "astrophysics",
      "spacecraft",
      "terrestrial",
      "gas giant",
      "super-Earth",
      "mini-Neptune",
      "hot Jupiter",
      "cold Jupiter",
      "ice giant",
      "ocean world",
      "exo-moon",
      "rogue planet",
      "habitable zone",
      "Earth-like",
      "sub-Neptune",
      "ultra-hot Jupiter",
      "superhabitable",
      "protoplanet",
      "brown dwarf",
      "metal-rich",
      "carbon-rich",
      "transit method",
      "radial velocity",
      "direct imaging",
      "gravitational microlensing",
      "astrometry",
      "spectroscopy",
      "light curve",
      "transit timing variations",
      "eclipse method",
      "occultation",
      "stellar wobble",
      "Kepler Space Telescope",
      "TESS",
      "CHEOPS",
      "James Webb Space Telescope",
      "Hubble Space Telescope",
      "exoplanet atmosphere",
      "spectral signatures",
      "atmospheric escape",
      "atmospheric composition",
      "exoplanet weather",
      "greenhouse effect",
      "volatile compounds",
      "water vapor",
      "carbon dioxide",
      "methane",
      "nitrogen",
      "oxygen",
      "hydrogen",
      "helium",
      "biosignatures",
      "technosignatures",
      "liquid water",
      "life detection",
      "stellar flares",
      "radiation environment",
      "planetary magnetic field",
      "surface conditions",
      "host star",
      "stellar classification",
      "stellar evolution",
      "main sequence",
      "red dwarf",
      "yellow dwarf",
      "binary star system",
      "multiple star systems",
      "stellar parallax",
      "orbital period",
      "orbital eccentricity",
      "orbital inclination",
      "semi-major axis",
      "surface temperature",
      "mass",
      "density",
      "gravity",
      "escape velocity",
      "axial tilt",
      "surface pressure",
      "rotation period",
      "albedo",
      "geological activity",
      "thermal profile",
      "tidal forces",
      "space missions",
      "NASA",
      "ESA",
      "cosmic background radiation",
      "dark matter",
      "dark energy",
      "quantum mechanics",
      "relativity theory",
      "planetary science",
      "stellar dynamics",
      "exoplanet formation",
      "N-body simulation",
      "habitat models",
      "astrobiology",
      "extremophiles",
      "terraforming",
      "organic molecules",
      "search for life",
      "public engagement",
      "science communication",
      "data analysis",
      "machine learning",
      "robotics",
      "remote sensing",
      "simulation software",
      "next-generation telescopes",
      "space policy",
      "international collaboration",
      "cultural impact",
      "Fermi paradox",
      "exoplanetary dynamics",
      "cosmic evolution",
      "exoplanetary systems",
      "spectral analysis",
      "chemical processes",
      "star-planet interactions",
      "theoretical physics",
      "astrophysical factors",
      "exoplanetary characteristics",
      "stellar habitability",
      "spectroscopy",
      "data mining",
      "citizen science",
      "exoplanet discoveries",
      "exoplanet research",
      "stellar mass",
      "stellar age",
      "stellar luminosity",
      "stellar wind",
      "star formation",
      "protoplanetary disk",
      "circumstellar habitable zone",
      "exoplanet exploration",
      "planetary protection",
      "scientific outreach",
      "ethical considerations",
      "science fiction",
      "funding for research",
      "exoplanet naming",
      "science conferences",
      "exoplanet databases",
      "exoplanet surveys",
      "atmospheric modeling",
      "stellar activity",
      "orbital dynamics",
      "stellar evolution models",
      "habitable zone models",
      "data sharing",
      "spacecraft technology",
      "public perception",
      "future space missions",
      "visualization tools",
      "advanced life detection",
      "extraterrestrial life",
      "interstellar probes",
      "exoplanet climate",
      "stellar environments",
      "transiting exoplanets",
      "radiative transfer",
      "magnetospheres",
      "detection methods",
      "star-planet distance",
      "orbital resonances",
      "exoplanet population",
      "planetary atmospheres",
      "chemical equilibrium",
      "photochemistry",
      "telescope instrumentation",
      "astrobiological markers",
      "stellar brightness",
      "orbital mechanics",
      "cosmological implications",
      "dark skies",
      "gravitational influence",
      "systematic surveys",
      "exoplanet ecosystems",
      "stellar evolution scenarios",
      "galactic dynamics",
      "observational astronomy",
      "science policy",
      "exoplanet characteristics",
      "atmospheric erosion",
      "orbital stability",
      "cosmic phenomena",
      "planetary rings",
      "stellar remnants",
      "exoplanet models",
      "space exploration",
      "galactic structure",
      "gravitational lensing",
      "celestial navigation",
      "solar systems",
      "stellar nursery",
      "faint stars",
      "planetary disks",
      "habitable environments",
      "solar radiation",
      "space weather",
      "stellar temperatures",
      "stellar spectra",
      "space exploration initiatives",
      "stellar masses",
      "dwarf planets",
      "supernovae",
      "black holes",
      "cosmic rays",
      "white dwarfs",
      "planetary collisions",
      "solar flares",
      "magnetic fields",
      "radiation belts",
      "moon formation",
      "orbital parameters",
      "star classification",
      "star formation rate",
      "stellar atmospheres",
      "exoplanetary research",
      "stellar populations",
      "solar system dynamics",
      "space debris",
      "exoplanetary systems",
      "planetary habitability",
      "asteroids",
      "comets",
      "planetary formation",
      "space technologies",
      "stellar nuclear fusion",
      "star cycles",
      "planetary geology",
      "moon exploration",
      "stellar neighborhoods",
      "cosmic evolution",
      "neutron stars",
      "stellar collisions",
      "exoplanet surveys",
      "stellar environments",
      "interstellar medium",
      "exoplanet variability",
      "stellar classification",
      "high-energy astronomy",
      "exoplanet databases",
      "advanced telescopes",
      "exoplanetary climate",
      "space observation",
      "planetary mass",
      "planetary evolution",
      "stellar energy",
      "deep space missions",
      "planetary atmospheres",
      "orbital evolution",
      "interstellar exploration",
      "stellar light curves",
      "astroinformatics",
      "planetary science conferences",
      "exoplanet atmospheric studies",
      "galactic evolution",
      "quantum astronomy",
      "planetary habitability studies",
      "stellar interactions",
      "space exploration technologies",
      "exoplanet characteristics",
      "stellar magnetic fields",
      "orbital dynamics",
      "exoplanet surveys",
      "planetary habitability models",
      "stellar brightness variations",
      "planetary science advancements",
      "exoplanetary classification",
      "solar system formation",
      "planetary dynamics",
      "stellar system formation",
      "cosmic exploration",
      "stellar astrophysics",
      "exoplanet characterization",
      "galactic evolution"
    ];
    

    // Check if the question contains any of the keywords
    return keywords.some((keyword) => text.toLowerCase().includes(keyword));
  };

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello" }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
    generationConfig: {
      // maxOutputTokens: 100,
    },
  });

  const endRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [data, question, answer, img.dbData]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(${import.meta.env.VITE_API_URL}/api/chats/${data._id}, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question.length ? question : undefined,
          answer,
          img: img.dbData?.filePath || undefined,
        }),
      }).then((res) => res.json());
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: ["chat", data?._id] })
        .then(() => {
          formRef.current.reset();
          setQuestion("");
          setAnswer("");
          setImg({
            isLoading: false,
            error: "",
            dbData: {},
            aiData: {},
          });
        });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const add = async (text, isInitial) => {
    if (!isInitial) setQuestion(text);

    // Check if the text is a greeting
    if (isGreeting(text)) {
      setAnswer(
        "Great to meet you! What would you like to know about exoplanets or space?"
      );
      return;
    }

    // Check if the question is relevant
    if (!isRelevantQuestion(text)) {
      setAnswer(
        "I'm sorry, I can only answer questions related to exoplanets and space."
      );
      return;
    }

    try {
      const result = await chat.sendMessageStream(
        Object.entries(img.aiData).length ? [img.aiData, text] : [text]
      );

      let accumulatedText = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText);
        accumulatedText += chunkText;
        setAnswer(accumulatedText);
      }
      mutation.mutate();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = e.target.text.value;
    if (!text) return;

    add(text, false); 

    // Clear the input field
    e.target.text.value = ""; 
  };

  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      if (data?.history?.length === 1) {
        add(data.history[0].parts[0].text, true);
      }
    }
    hasRun.current = true;
  }, []);

  return (
    <>
      {img.isLoading && <div>Loading...</div>}
      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          width="380"
          transformation={[{ width: 380 }]}
        />
      )}
      {question && <div className="message user">{question}</div>}
      {answer && (
        <div className="message">
          <Markdown>{answer}</Markdown>
        </div>
      )}
      <div className="endChat" ref={endRef}></div>
      <form className="newForm" onSubmit={handleSubmit} ref={formRef}>
        <Upload setImg={setImg} />
        <input id="file" type="file" multiple={false} hidden />
        <input type="text" name="text" placeholder="Enter a prompt here" />
        <button>
          <img src={assets.send_icon} alt="" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;