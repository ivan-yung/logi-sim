import React, { useState } from 'react';
import './Menubar.css';
import howTo1 from '../assets/Controls/howtoconnect.png';
import howTo2 from '../assets/Controls/howconnection.png';
import wireSmoothEx from '../assets/Controls/wireSmoothEx.png';
import SharpWireEx from '../assets/Controls/SharpWireEx.png';
import chip from '../assets/chip.jpg';
import FApin from '../assets/Pinouts/FApinout.png';
import SRpin from '../assets/Pinouts/SRpinout.png';
import JKpin from '../assets/Pinouts/JKpinout.png';
import Ripple1 from '../assets/RippleEx/Ripple1.png';
import Ripple2 from '../assets/RippleEx/Ripple2.png';
import Ripple3 from '../assets/RippleEx/Ripple3.png';
import Ripple4 from '../assets/RippleEx/Ripple4.png';
import reactimg from '../assets/About/React.png';
import xyflowimg from '../assets/About/xyflow.png';
import zustandimg from '../assets/About/Zustand.png';

const Menubar = () => {
  const [popup, setPopup] = useState(null);

  const handlePopup = (popupType) => {
    setPopup(popupType);
  };

  const closePopup = () => {
    setPopup(null);
  };

  return (
    <>
      <div className="sidenav">
        <a href="#logisim" onClick={(e) => { e.preventDefault(); handlePopup('logisim'); }}>Logi-Sim</a>
        <a href="#howto" onClick={(e) => { e.preventDefault(); handlePopup('howto'); }}>Controls</a>
        <a href="#pinouts" onClick={(e) => { e.preventDefault(); handlePopup('pinouts'); }}>Pin Outs</a>
        <a href="#tutorials" onClick={(e) => { e.preventDefault(); handlePopup('Tutorials'); }}>Tutorials</a>
        <a href="#about" onClick={(e) => { e.preventDefault(); handlePopup('about'); }}>About</a>
      </div>

      {popup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closePopup}>&times;</span>
            {popup === 'logisim' && <div>
              <h2>Logi-Sim</h2>
              <p>This digital logic simulator is a learning simulator inspired by the graphing tools Intel Quartus, and Logisim, which are used industry wide for FPGA programming, and other digital logic circuit implimentations.
                
              </p>
              <img src = {chip} alt="chip" style={{ display: 'block', margin: '0 auto' }} width="250" height="250"/>
              <p>With a simple web based design and friendly UI, the goal of this simulator is a free, accurate, reliable tool accessable to anyone. Unlike intel Quartus, this project is a learning tool, and cannot, compile to FPGA, although FPGA 
                and verilog can be tested in this environment. To view potential uses, see the tutorials tab on the left hand side menu. Good luck, and happy Simming!
              </p>

              </div>}
            {popup === 'howto' && <div className="scrollable-content">
              <h2>Controls</h2>
              <h3>Connections</h3>
              <p>To make a connection, click on the handle(blue square) and drag to another nodes handle</p>
              <p> To set an input to 1, click on the dropdown menu and select 1. </p>
              <img src={howTo1} alt="howTo1" style={{ display: 'block', margin: '0 auto' }}/>
              <img src={howTo2} alt="howconnection" style={{ display: 'block', margin: '0 auto' }}/>
              <h3>Change Wire Type</h3>
              <p>To change the wire type, click the SwapWire button on the top lefthand side. This changes the wire from a smooth edge, to a sharp edge.</p>
              <img src={wireSmoothEx} alt="wireSmoothEx" style={{ display: 'block', margin: '0 auto' }}/>
              <img src={SharpWireEx} alt="SharpWireEx" style={{ display: 'block', margin: '0 auto' }}/>
              </div>}
            {popup === 'pinouts' && <div>
              <div className="scrollable-content">
              <h2>Pin-Outs</h2>
              <h3>Full Adder</h3>
              <img src={FApin} alt="FApin" style={{ display: 'block', margin: '0 auto' }}/>
              <p>The Full Adder takes 2 1 bit numbers (a and b) and adds them together. If the input overflows, the output is carried out through Cout, the carry out representation. Combining multiple Full Adders in series allows 
                for a multi-bit ripple adder. This is the basis for how a super basic computer, taking only binary 1 bit integers can add numbers.
              </p>
              <h3>SR Flip-Flop</h3>
              <img src={SRpin} alt="SRpin" style={{ display: 'block', margin: '0 auto' }}/>
              <p>
                The SR Flip-Flop is a component that can be used to store 1 bit of information. Output is based on current input and previous state saved. S stands for Set, and R stands for Reset. the third input CLK represents a clock
                input. A clock pulse is used to operate. At a basic level, when the clock ticks 0, nothing happens. When the clock ticks 1, the component sets or resets to a new state. Therefore, the state Set and Reset cannot be on at
                the same time. This is considered a NULL state. See if you can recreate this.
              </p>
              <h3>JK Flip-Flop</h3>
              <img src={JKpin} alt="JKpin" style={{ display: 'block', margin: '0 auto' }}/>
              <p>
                The JK Flip-Flop is similar to the SR (See SR above) in that the component is used to store 1 bit of information. In this case Set(J) and Reset(K) are used as inputs. You might be wondering how JK and SR differ. When both inputs of an SR
                are HIGH, a NULL state is reached. However for JK Flip-Flops the output changes from high to low, and low to high periodically when both inputs are HIGH. This allows the JK Flip-Flop to be much quicker. Some applications are
                counters, shift registers, or memory units. 
              </p>
              </div>
              </div>}
            {popup === 'Tutorials' && <div>
              <div className="scrollable-content">
              <h2>Build a Ripple Adder!</h2>
              <img src={Ripple3} alt="Ripple3" style={{ display: 'block', margin: '0 auto' }}/>
              <p>This is a 4 bit Ripple Adder that takes 2 4 bit numbers, and adds them together.</p>
              <h4>We'll Need:</h4>
              <p>8 Inputs, 4 Full-Adders, 1 Out node, and 1 seven Segment Display.</p>
              <h4>Connect Ripple Adders:</h4>
              <img src={Ripple1} alt="Ripple1" style={{ display: 'block', margin: '0 auto' }}/>
              <p>Connect the 4 Full-Adders in series, linking the Cout, to the next Full-Adders Cin. This essentially grabs the carry over bit from the previous adder for use in the next Adder's addition.</p>
              <h4>Inputs:</h4>
              <img src={Ripple2} alt="Ripple2" style={{ display: 'block', margin: '0 auto' }}/>
              <p>Connect inputs into a and b slots of FullAdders</p>
              <h4>Displaying the Sum</h4>
              <img src={Ripple4} alt="Ripple4" style={{ display: 'block', margin: '0 auto' }}/>
              <p>Connect the top out handle into the 7 segment display. Next Connect the carry out to an Out node. Using this setup, our 4 bit Ripple-Adder can now calculate and display the sum of 2 binary numbers! Remember, each number is 
                represented using every other input. For example, the first number inputted in our Ripple-Adder above, is 0011(3). While our second number 0100(4) added to our first, results in the number 7. To see the raw output, connect 3 out nodes
                to the out handle of each Full-Adder.
              </p>
              </div>
              </div>}
            {popup === 'about' && <div>
                <div className="scrollable-content">
                  <h2>About:</h2>
                  <p>A minimalistic simulator designed with intuitive controls, and a bright color pallate, this ongoing project is a learning tool designed to show at a base level, how computers function. This applications
                    Dynamic rendering allows users to see real time updates to circuits.
                  </p>
                  <div>
                    <h3>Key Features:</h3>
                      <ul>
                        <li>Interactive Circuit Design: Users can add and connect different nodes, such as AND, OR, XOR gates, and more complex components like SR and JK flip-flops or full adders, to simulate digital circuits.</li>
                        <li>Topological Sorting & Dependency Management: The app uses a depth-first search (DFS) algorithm to determine the topological order of nodes, ensuring that all dependent nodes are accurately updated when an input changes.</li>
                        <li>Real-Time Logic Computation: The simulator computes the logic in real-time, handling multiple inputs and complex dependencies across the circuit.</li>
                      </ul>
                  </div>
                  <h3>Technologies: </h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <img src={reactimg} alt="reactimg" style={{ display: 'block', margin: '0px' }} width="170" height="170"/>
                    <img src={zustandimg} alt="zustand" style={{ display: 'block', margin: '30 px' }} width="250" height="150"/>
                    <img src={xyflowimg} alt="xyflow" style={{ display: 'block', margin: '30 px' }} width="250" height="150"/>
                  </div>
                  <p>This project was assembled via React, Zustand store, React Flow library, and a little bit of DSA. React handles project structure. Zustand acts as a global store that keeps track of each components state, while input is handled by React flow's node based components.</p>

              </div>
              </div>}
          </div>
        </div>
      )}
    </>
  );
};

export default Menubar;
