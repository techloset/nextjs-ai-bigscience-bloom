// components/HuggingFaceQuery.js
"use client"
import { useState } from 'react';

async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/bigscience/bloom",
		{
      mode: 'cors',
			headers: { 
        Authorization: "Bearer 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",
        "Content-Type": "application/json",
       },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
  console.log("response=",response)
  console.log("result=",result)
	return result;
}
export default function HuggingFaceQuery() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState([]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await query({ inputs: inputText ,parameters: {
        "seed": 97,
        "early_stopping": false,
        "length_penalty": 0,
        "max_new_tokens": 20,
        "do_sample": false
      }});
      setResult(response);
      
    } catch (error) {
      console.error(error);
      alert(error.response.data.error)
    }
  };

  return (
    <div className=' flex flex-col align-middle items-center justify-center'>
      <div className="w-full max-w-xs">
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
      bigscience bloom
      
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Ask Anything" value={inputText}   onChange={handleInputChange}/>
    </div>
    <div className="flex items-center justify-between">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Submit
      </button>
    </div>
  </form>
</div>
        
<div>
  <h2>Result:</h2>
  {result?.[0]?.generated_text ? (
    <p>{result[0].generated_text}</p>
  ) : (
    <div>
      <p>{result?.error}</p>
      {result?.estimated_time && <p>Estimated Time= {result.estimated_time}</p>}
    </div>
  )}
</div>
    </div>
  );
}
