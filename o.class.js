// JavaScript Document
// Copyright 2019 Daniel Bullimore
//* File Name: o.class.js
//* System: OoMutiny
//* Dependencies: <Name any files this one requires to operate correctly>
//******************************************************************************************************
//* Author:           Daniel Bullimore
//* Authors email: daniel.k.bullimore@gmail.com
//* Written:          26/12/2019
//******************************************************************************************************
//* !---If you modify this file, add your name to this then update the Last Modified date---!
//* Modifications By: <name1>, <name2>, … , <Your Name>
//* Last Modified:      <Date dd/mm/yyyy>
//******************************************************************************************************
//*
//*
//******************************************************************************************************
//* DESCRIPTION
//******************************************************************************************************
// Interrupt object. Associates a function with a time or intervalfor it to be executed. There are two
// types of execution, act and solve. Act is executed on the main thread and is intended to
// make small immediate animations on the GUI.And solve which is intended to complete calculations
// and change object instance properties. Solve executions may implement web workers to calculate off
// the main thread.
// 
//
//# OoMutiny is licensed under the BSD 3-Clause "New" or "Revised" License
//# To view a copy of this license visit https://github.com/DanielBullimore/OOmutiny/blob/master/LICENSE
//******************************************************************************************************
function o()
/*
Overview:
  associates a function with a time or interval for it to be executed.

Properties:

  numCycles - public number, Set as the number of cycles to wait before executing interrupt.
  booActOrSolve - public boolean, True = execute funAct() method after numCycles, False = execute funSolve() method after numCycles.
  booRepeat - public boolean, True = Continue to execute interrupt every numCycles, False = execute once only
  numCycleCount - private number, used by Game loop to track cycles passes since interrupt was first create or executed.
  numExecutions - public number, Used with booRepeat to control how many times to repeatedly execute the interrupt.0 = execute every numCycles indefinitely.

Methods:

  funAct() - void function interface, implementing developers to define this function in combination with booActOrSolve
  funSolve() - void function interface, implementing developers to define this function in combination with boolActOrSolve

Parameters: -

Example: ...

*/
{
  //###############
  //# PROPERTIES #
  //###############
  var numCycles;
  var booActOrSolve;
  var booRepeat;
  var numCycleCount;
  var numExecutions;
  //###################
  //# DERIVED VALUES #
  //###################
  //-
  //#########################
  //# CONSTRUCT DESTRUCT #
  //#########################
  {
    numCycles = 0;
    booActOrSolve = true;
    booRepeat = false;
    numCycleCount = 0;
    numExecutions = 0;
  }
  //##############
  //# FUNCTIONS #
  //##############
  funAct = function() { /*framework implementation developer to define per instance*/ };
  funSolve = function () { /*framework implementation developer to define per instance*/ };
}