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
