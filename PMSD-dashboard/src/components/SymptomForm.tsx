import React, { useState } from 'react';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const composition = {
      _type: 'COMPOSITION',
      archetype_node_id: 'openEHR-EHR-COMPOSITION.self_reported_data.v1',
      name: { _type: 'DV_TEXT', value: 'Self-reported data' },
      archetype_details: {
        archetype_id: { value: 'openEHR-EHR-COMPOSITION.self_reported_data.v1' },
        template_id: { value: 'Self_reported_data' },
        rm_version: '1.0.4'
      },
      language: {
        _type: 'CODE_PHRASE',
        terminology_id: { _type: 'TERMINOLOGY_ID', value: 'ISO_639-1' },
        code_string: 'en'
      },
      territory: {
        _type: 'CODE_PHRASE',
        terminology_id: { _type: 'TERMINOLOGY_ID', value: 'ISO_3166-1' },
        code_string: 'DE'
      },
      category: {
        _type: 'DV_CODED_TEXT',
        value: 'event',
        defining_code: {
          _type: 'CODE_PHRASE',
          terminology_id: { _type: 'TERMINOLOGY_ID', value: 'openehr' },
          code_string: '433'
        }
      },
      composer: { _type: 'PARTY_IDENTIFIED', name: 'Web User' },
      context: {
        _type: 'EVENT_CONTEXT',
        start_time: { _type: 'DV_DATE_TIME', value: new Date().toISOString() },
        setting: {
          _type: 'DV_CODED_TEXT',
          value: 'home',
          defining_code: {
            _type: 'CODE_PHRASE',
            terminology_id: { _type: 'TERMINOLOGY_ID', value: 'openehr' },
            code_string: '225'
          }
        }
      },
      content: [
        {
          _type: 'OBSERVATION',
          archetype_node_id: 'openEHR-EHR-OBSERVATION.symptom.v1',
          name: { _type: 'DV_TEXT', value: formData.symptom },
          data: {
            _type: 'HISTORY',
            origin: { _type: 'DV_DATE_TIME', value: formData.date },
            events: [
              {
                _type: 'POINT_EVENT',
                time: { _type: 'DV_DATE_TIME', value: formData.date },
                data: {
                  _type: 'ITEM_TREE',
                  items: [
                    {
                      _type: 'ELEMENT',
                      name: { _type: 'DV_TEXT', value: 'Symptom intensity' },
                      value: { _type: 'DV_TEXT', value: formData.intensity }
                    }
                  ]
                }
              }
            ]
          }
        }
      ]
    };

    try {
      const response = await axios.post(
        `http://localhost:8080/ehrbase/rest/openehr/v1/ehr/a18de83f-e7ce-46ca-a90e-077b296f177a/composition?templateId=Self_reported_data&format=STRUCTURED&committer=WebUser`,
        composition,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      alert('Data submitted successfully! Composition ID: ' + response.data.meta.href);
    } catch (err) {
      console.error(err);
      alert('Error submitting data to EHRbase');
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
        <div style={{display: "flex", gap: "15px"}}>
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