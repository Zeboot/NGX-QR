import './App.css'

import GenerationInput from './input/GenerationInput'
import GenerationOutput from './output/GenerationOutput'
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

function App() {
  const contentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        contentRef
    });
  return (
    <>
      <GenerationInput handlePrint={handlePrint}/>
      <GenerationOutput ref={contentRef}/>
    </>
  )
}

export default App
