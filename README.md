# Circuit Simulator with React Flow and Zustand

## Overview

This project is a logic gate simulator built using *React Flow* and *Zustand*. It allows users to create and simulate various logic gates and circuits, offering a dynamic and interactive environment for visualizing logic operations. The simulator supports basic gates like AND, OR, XOR, and more complex components such as SR and JK flip-flops and full adders.

## Features

- *Interactive Circuit Design*: Users can create nodes representing logic gates and connect them using edges, simulating the flow of logic.
- *Topological Sorting*: The simulator uses Depth-First Search (DFS) to determine a topological order for updating nodes that are dependent on each other.
- *Comprehensive Logic Handling*: The system handles various logic gate operations, flip-flop behaviors, and provides debugging utilities for testing and development.
- *Zustand State Management*: The project leverages Zustand for efficient and scalable state management, ensuring smooth and responsive updates within the simulator.

## Installation

To get started with the project, clone the repository and install the necessary dependencies:

```bash
git clone https://github.com/your-username/circuit-simulator.git
cd circuit-simulator
npm install
```
## Usage

To run the simulator locally:

```bash
Copy code
npm start
This will start the development server, and you can interact with the simulator via your browser at http://localhost:3000.
```

## Components
## Nodes
- *Input Nodes*: Represents the inputs to the circuit. Each input node can be configured to output a specific value.
- *Logic Gates*: Includes basic logic gates like AND, OR, XOR, and NOT. Each gate can connect to other nodes and process inputs according to its logic.
- *Flip-Flops*: Supports SR and JK flip-flops with detailed handling of clock signals and output states.
- *Full Adders*: Implements the logic for a full adder, handling binary addition with three inputs.
## Edges
- *Connections*: Nodes are connected via edges, which can be updated to reflect different types, such as smoothstep or default.
- *Dynamic Updates*: Changes to the circuit structure are reflected in real-time, with dependent nodes recalculating outputs as needed.

## State Management
The project utilizes Zustand to manage the state of the nodes, edges, and their interconnections. This includes:

- Storing input/output values for nodes
- Calculating gate logic based on node connections
- Handling edge types and node changes
- Managing the overall state of the circuit and performing updates as connections are made or altered

## Debugging Tools
- logGateData: Logs the type of a specific gate.
- logNodeData: Logs the data of a specific node.
- logStore: Logs the entire Zustand store for inspection.
- logInStore: Logs only the input nodes and their data.
- logEdges: Logs the edges of the graph and counts the number of nodes.

## License
This project is licensed under the MIT License.
