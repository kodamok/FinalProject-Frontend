import React, { useState } from 'react';
import styled from 'styled-components';
// import { Link } from 'react-router-dom';

const ButtonAccordion = styled.button`
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  text-align: left;
  border: none;
  outline: none;
  transition: 0.4s;
`;

const Panel = styled.div``;

// Array, um die Sections zu nummerieren mit id´s

/*
const dataOfButtonAccordion = [
  { color: 'red', id: 1 },
  { color: 'green', id: 2 },
  { color: 'yellow', id: 3 },
  { color: 'blue', id: 4 }
];
*/

/*
const [openPanel, setOpenPanel] = useState(false)
const changeBackground = ()=> {
 setX ((prev) => !prev)
}
 */

// if ...open, else close

function FAQs() {
  const [openPanel, setOpenPanel] = useState(false);
  // true and false
  // setOpenPanel startet mit false, also ist prev erstmal false, !prev bedeutet demnach,dass es true wird (also geöffnetes accordion, da start im initial state von useState false ist, das an den getter openPanel übergeben wird. Es beginnt also mit false). setOpenPanel(prev)=>!prev ist wie ein switch zu sehen(Lichtschalter, der von einem Zustand in den Anderen wechselt Licht aus-Licht an)
  // ob das Ganze prev und !prev heißt oder hallo und !hallo ist egal, es symbolisiert ein switch
  // ich muss die Accordionbuttons mit id´s kennzeichnen, da sich sonst alle mit einmal öffnen.
  // 1. den Array mit dem ID´s schreiben 2. das Ganze ggf. in eine Funktion wie in Zeile 399 bis 404 im header setzen
  return (
    <div>
      <h3> Unsere FAQs</h3>
      <div>
        <ButtonAccordion onClick={() => setOpenPanel((prev) => !prev)}>Section 1</ButtonAccordion>
        {openPanel ? (
          <Panel>
            <p>Lorem ipsum...</p>
          </Panel>
        ) : null}
      </div>
      <div>
        <ButtonAccordion onClick={() => setOpenPanel((prev) => !prev)}>Section 2</ButtonAccordion>
        {openPanel ? (
          <Panel>
            <p>Lorem ipsum...</p>
          </Panel>
        ) : null}
      </div>
      <div>
        <ButtonAccordion onClick={() => setOpenPanel((prev) => !prev)}>Section 3</ButtonAccordion>
        {openPanel ? (
          <Panel>
            <p>Lorem ipsum...</p>
          </Panel>
        ) : null}
      </div>
      <div>
        <ButtonAccordion onClick={() => setOpenPanel((prev) => !prev)}>Section 4</ButtonAccordion>
        {openPanel ? (
          <Panel>
            <p>Lorem ipsum...</p>
          </Panel>
        ) : null}
      </div>
    </div>
  );
}

export default FAQs;
