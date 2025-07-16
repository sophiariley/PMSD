import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Components.css";

interface FormData {
  symptom: string;
  date: string;
  intensity: string;
}

const SymptomForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    symptom: '',
    date: '',
    intensity: ''
  });

  const [webTemplate, setWebTemplate] = useState<any>(null);
  const templateId = "Self_reported_symptoms";

  useEffect(() => {
  const fetchTemplate = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/ehrbase/rest/openehr/v1/definition/template/adl1.4/${templateId}`
      );

      console.log("Fetched template:", data);

      // Optionally, pretty-print the tree structure with names and paths:
      const printNode = (node: any, indent = 0) => {
        const pad = ' '.repeat(indent * 2);
        console.log(`${pad}- name: ${node.name} | aqlPath: ${node.aqlPath || '(no path)'} | _type: ${node._type || '(no type)'}`);
        if (node.children) {
          node.children.forEach((child: any) => printNode(child, indent + 1));
        }
      };

      if (data?.tree?.children) {
        console.log("Template tree structure:");
        data.tree.children.forEach((child: any) => printNode(child));
      }

      setWebTemplate(data);
    } catch (err) {
      console.error("Failed to load template:", err);
    }
  };

  fetchTemplate();
}, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const findNodeByName = (nodes: any[], name: string): any | undefined => {
    for (const node of nodes) {
      if (node.name?.toLowerCase() === name.toLowerCase()) return node;
      if (node.children) {
        const found = findNodeByName(node.children, name);
        if (found) return found;
      }
    }
    return undefined;
  };

  const buildStructuredComposition = (formData: FormData) => {
    const now = new Date().toISOString();
    return {
      ctx: {
        language: "en",
        territory: "DE",
        composer_name: "WebUser",
        time: now
      },
      category: {
        value: "event"
      },
      context: {
        start_time: formData.date ? new Date(formData.date).toISOString() : now,
        setting: {
          value: "other"
        },
        symptom_sign_name: formData.symptom,
        intensity: formData.intensity,
        date_time: formData.date ? new Date(formData.date).toISOString() : now
      }
    };
  };

  const ehrId = "8c3a828c-c88e-4665-88f8-cd670bdad952"; // Existing EHR Id - change if needed!

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!webTemplate) {
      alert("Template not loaded yet. Please try again shortly.");
      return;
    }

    try {
      const payload = buildStructuredComposition(formData);

      const res = await axios.post(
        `http://localhost:8080/ehrbase/rest/openehr/v1/ehr/${ehrId}/composition`
        + `?templateId=${templateId}&format=STRUCTURED&committer=WebUser`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      alert("Saved! Composition UID: " + res.data.meta.href);
    } catch (err: any) {
      console.error(err.response || err);
      alert(`Error: ${err.response?.status} ${err.response?.data?.message || err.message}`);
    }
  };


  return (
    <div className='symptomForm-container'>
      <form onSubmit={handleSubmit} className="symptomForm-form">
        <h2 className="sectionTitle">Symptom Melden</h2>

        <label className="sectionSubText">Symptomname</label>
        <input
          className="sectionSubText"
          type="text"
          name="symptom"
          value={formData.symptom}
          onChange={handleChange}
          placeholder='Kopfschmerzen, Fieber, ...'
          required
        />

        <label className="sectionSubText">Datum und Uhrzeit</label>
        <input
          className="sectionSubText"
          type="datetime-local"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <label className="sectionSubText">Intensität</label>
        <div style={{ display: "flex", gap: "15px" }}>
          {[1, 2, 3, 4, 5].map((num) => (
            <label key={num} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <input
                type="radio"
                name="intensity"
                value={num}
                checked={formData.intensity === String(num)}
                onChange={handleChange}
                required
              />
              {num}
            </label>
          ))}
        </div>

        <button type="submit" className="symptomForm-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SymptomForm;
