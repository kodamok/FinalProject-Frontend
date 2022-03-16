// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { GrClose } from 'react-icons/gr';
// import { theme } from '../../../assets/styles/theme';
// import { Link } from 'react-router-dom';

import React from 'react';

function FAQsCopy() {
  return <div>FAQs copy</div>;
}

export default FAQsCopy;

/*
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

const dataOfButtonAccordion = [
  { answer: "bla ", id: 1 },
  { color: 'green', id: 2 },
  { color: 'yellow', id: 3 },
  { color: 'blue', id: 4 }
];

/*
const [openPanel, setOpenPanel] = useState(false)
const changeBackground = ()=> {
 setX ((prev) => !prev)
}
 */

// if ...open, else close
/*
function FAQs() {
  const [openedPanel, setOpenedPanel] = useState(false);
  //setOpenPanel wird in handleThePanel gespeichert
  const handleThePanel = () => {
    setOpenedPanel((prev) => !prev);
  };

  // true and false
  // setOpenPanel startet mit false, also ist prev erstmal false, !prev bedeutet demnach,dass es true wird (also geöffnetes accordion, da start im initial state von useState false ist, das an den getter openPanel übergeben wird. Es beginnt also mit false). setOpenPanel(prev)=>!prev ist wie ein switch zu sehen(Lichtschalter, der von einem Zustand in den Anderen wechselt Licht aus-Licht an)
  // ob das Ganze prev und !prev heißt oder hallo und !hallo ist egal, es symbolisiert ein switch
  // ich muss die Accordionbuttons mit id´s kennzeichnen, da sich sonst alle mit einmal öffnen.
  // 1. den Array mit dem ID´s schreiben 2. das Ganze ggf. in eine Funktion wie in Zeile 399 bis 404 im header setzen
  return (
    <div>

      <h3> Unsere FAQs</h3>




/*The Panel is CLOSED now and needs to be OPENED */
/* {openedPanel && (
   <div>
    < GrClose onClick={handleThePanel}/>
        <ButtonAccordion>Section 2</ButtonAccordion>
          <Panel>
            <p>Lorem ipsum 12345678</p>
          </Panel>
      </div>
)}
{dataOfButtonAccordion.map((myParameters) => ({
<div key={myParameters.id}>
<ButtonAccordion ></ButtonAccordion>

</div>
})
)}
*/

// Unterschied forEach und map, liegt darin, dass forEach nix ausgibt und map returned immer ein array mit der gleichen länge wie das ursprungsarray
/*
{/*CLOSED Section will be OPENED ONE BY ONE */
/* {openedPanel &&( 
  dataOfButtonAccordion.map((itemOfTheArray) => {
    <div key={itemOfTheArray.id}>
      <ButtonAccordion onClick={()=> {setOpenedPanel(true)}}> </ButtonAccordion>
    </div>
  })

)}
{/*OPENED PANEL WILL BECOME CLOSED ONE BY ONE */
/* }
{
<div>
< GrClose onClick={handleThePanel}/>
<Panel>lorem ipsum sin amet</Panel>
</div>
}


{/*
      {openPanel && ( 
      {dataOfButtonAccordion.map((hola) => (
        <div key={hola.id}>
          <ButtonAccordion
            onClick={() => {
              setOpenPanel(true);
            }}
            >
            <Panel><p>lorem ipsum dolor sit</p></Panel>
     
          </ButtonAccordion>  
    </div>
        
          */

/*
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

export default FAQ

*/
