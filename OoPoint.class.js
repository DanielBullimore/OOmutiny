//Javascript Document
//Copyright(c) 2019, Daniel Bullimore
//All rights reserved.
//* File Name: OoPoint.class.js
//* System: OOmutiny
//* Dependencies: OO.class.js
//****************************************************************************************************** 	
//* Author:        Daniel Bullimore
//* Authors email: daniel.k.bullimore@gmail.com
//* Written:       07/01/20
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
/*

An x,y,z axis triangulation point.

# OOmutiny is licensed under the BSD 3 - Clause "New" or "Revised" License
# To view a copy of this license, visit https: //github.com/DanielBullimore/OOmutiny/blob/master/LICENSE
*******************************************************************************************************/
function OoPoint() 
/*Description: Object class controls x,y,z axis triangulation point.

Properties:
  numX - private number, x axis index value.
  numY - private number, y axis index value.
  numZ - private number, z axis index value.

Methods:
  funSetPoint() - takes 3 numbers as the x y z index to define the point.
  funRay_GetPoint() - returns an array containing the three indexes of the point
  funNum_GetAxisX() - returns the index value of axis X.
  funNum_GetAxisY() - returns the index value of axis Y.
  funNum_GetGetAxisZ() - returns the index value of axis Z.

******************************************************************************************************
* EXAMPLE
******************************************************************************************************
*
  objExamplePoint = new OoPoint();
  objExamplePoint.funSetNameOnce("StartPoint");
  objExamplePoint.funSetPoint(1,4,0)
  numExampleAxisX = objExamplePoint.funNum_GetX();
  alert("Start point X axis index is:"+numExampleAxisX);
  rayPoint = objExamplePoint.funRay_GetPoint();
  alert("Value of z axis is"+rayPoint['z'])
*
*******************************************************************************************************/
{
//###############
//# PROPERTIES #
//###############
var numX;
var numY;
var numZ;
//###################
//# DERIVED VALUES #
//###################
	

//#########################
//# CONSTRUCT DESTRUCT #
//#########################
  {
    this.Parent = OO;
    this.Parent('OoPoint');// "OoPoint"; //required to overide the super class type property
    this.Initialise(); //indexes the object in rayOO[][] and sets this instances numId
  }
//##############
//# FUNCTIONS #
//##############
	this.funSetPoint = function(numX,numY,numZ)
  /*
  Description: 
    Takes 3 numbers as the x y z index to define the point.
    
  Parameters: 
    numX - private number, x axis index value.
    numY - private number, y axis index value.
    numZ - private number, z axis index value.

  Returns: -
  */
  {
    //Always use try catch when working with implemtation developers parameters
    try
    {
      /* only set the axis values when
        all three parameters a numbers
      */
      if (typeof(numX)+typeof(numY)+typeof(numZ) == "numbernumbernumber")
      {
        //set the axis values
        this.numX = numX;
        this.numY = numY;
        this.numZ = numZ;
      }
    }
    catch (error)
    {
      //log any errors to JS console
      console.log("<[O.o]> OoPoint:"+error);
    }
  };
	this.funRay_GetPoint = function()
	/*
		Description: 
	    - returns an array containing the three indexes of the point
		Parameters: 

		Returns: array { z:Number,y:Number,z:Number }
	*/
	{
	  return { x:this.numX, y:this.numY, z:this.numZ };
	};
	this.funNum_GetAxisX = function() 
	/*
	Description: 
    - returns the index value of axis X.
	Parameters: 
              
	Returns: number
	*/
	{
	  return this.numX;
	};
	this.funNum_GetAxisY = function()
	/*
	Description: 
    - returns the index value of axis Y.
	Parameters: 
              
	Returns: number
	*/
	{
	  return this.numY;
	};
	this.funNum_GetAxisZ = function()
	/*
	Description: 
    - returns the index value of axis Z.
	Parameters: 
              
	Returns: number
	*/
	{
	  return this.numZ;
	};
}
