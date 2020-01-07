//Javascript Document
//* File Name: OoPoint.class.js
//* System: OOmutiny
//* Dependencies: OO.class.js
//****************************************************************************************************** 	//* Author:           <Your name>
//* Authors email: daniel.k.bullimore@gmail.com
//* Written:          07/01/20
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

Properties:
 numX - private number, x axis index value.
 numY - private number, y axis index value.
 numZ - private number, z axis index value.

Methods:
 funSetPoint() - takes 3 numbers as the x y z index to define the point.
 funGetPoint() - returns an array containing the three indexes of the point
 funGetAxisX() - returns the index value of axis X.
 funGetAxisY() - returns the index value of axis Y.
 funGetAxisZ() - returns the index value of axis Z.
*/
// [Describe any other usefull stuff]
//
//****************************************************************************************************** 
function OoPoint() 
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

//##############
//# FUNCTIONS #
//##############
	function funSetPoint(numX,numY,numZ)
  /*
  Description: 
    - takes 3 numbers as the x y z index to define the point.
  Parameters: 

  Returns:
  */
  {
    try
    {
      if (typeof(numX)+typeof(numY)+typeof(numZ) == "numbernumbernumber")
      {
        this.numX = numX;
        this.numY = numY;
        this.numZ = numZ;
      }
    }
    catch (error)
    {
      console.log("<[O.o]> OoPoint:"+error);
    }
  }
	function funGetPoint()
		/*
		Description: 
	    - returns an array containing the three indexes of the point
		Parameters: 

		Returns:
		*/
	{
	  return [this.numX, this.numY, this.numZ];
	}
	function funGetAxisX() 
	/*
	Description: 
    - returns the index value of axis X.
	Parameters: 
              

	Returns:
	*/
	{
	  return this.numX;
	}
	function funGetAxisY()
	/*
	Description: 
    - returns the index value of axis Y.
	Parameters: 
              

	Returns:
	*/
	{
	  return this.numY;
	}
	function funGetAxisZ()
	/*
	Description: 
    - returns the index value of axis Z.
	Parameters: 
              

	Returns:
	*/
	{
	  return this.numZ;
	}
}
