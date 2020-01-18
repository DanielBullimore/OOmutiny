//Javascript Document
//* File Name: OoPointRegion.class.js
//* System: OOmutiny
//* Dependencies: OO.class.js, OoPoint.class.js, OoColor.class.js
//****************************************************************************************************** 	
//* Author:        Daniel Bullimore
//* Authors email: daniel.k.bullimore@gmail.com
//* Written:       19/01/20 
//                 Using Spck editor on android. Bomb as tool check it -G play store- shot Spck. \m/
//******************************************************************************************************
//* !---If you modify this file, add your name to this then update the Last Modified date---!
//* Modifications By: <name1>, <name2>, … , <Your Name>
//* Last Modified:      <Date dd/mm/yyyy>
//******************************************************************************************************
//* 
//* 
//******************************************************************************************************
//* DESCRIPTION
/******************************************************************************************************

This class inherits OoPoint and draws from the right of its inherited xyz point.The region defined at 
that point with a given width and height forms a right angle quadrilateral.Although the region size is
defined, a z coordinate greater than or less than zero will result in dimensional scaling.

A Point Region may be rendered on the gui and can have a colored border and or filled with color. These
colors are defined with an instance of OoColor implemented as properties of this class.Further more a
border is drawn within a regions dimensions.

# OOmutiny is licensed under the BSD 3 - Clause "New" or "Revised" License
# To view a copy of this license, visit https://github.com/DanielBullimore/OOmutiny/blob/master/LICENSE
*******************************************************************************************************/
function OoPointRegion()
/*
Description: A defined width by height dimension at x,y,z point

Parameters:-

Properties:
  numWith        - Protected number, width in pixels of region on x axis.
  numHeight      - Protected number, height in pixels of region on y axis.
  booFilled      - Protected boolean, switches between rendering with background 
                   filled(true) or unfilled(false).
  objFillColor   - Protected OoColor, color object for background fill color.
  booBorder      - Protected Boolean, switches between rending bordered
                   region(true) or unbordered region(false)
  objBorderColor - Protected OoColor, color object for border color.
  numBorderWidth - Protected number, width of border in pixels.
  
Methods:
  funSetDimension - Used to define width and height of a region.
  funNum_GetWidth - Returns a number representing a regions defined width in pixels.
  funNum_GetHeight- Returns a number representing a regions defined height in pixels.
  funSetBorder    - Accepts OoColor object and number parameters to define the color and width of
                    a regions border.
  funUnsetBorder  - Removes a regions boarder definitions.
  funSetFill      - Accepts an OoColor object parameter as color to fill region with.
  funUnsetFill    - Removes a regions fill definition.
  funMove         - Accepts OoPoint object and a number as parameters representing a destination and 
                    speed in milliseconds at which to move there.
  funTeleport     - Accepts OoPoint as location to redraw region on GUI.
  funRender       - Derives a visual representation of OoPointRegion from an instance 's properties
                    then draws it on the GUI.
                    
Returns: -
*/
{
    //##############
   //# PROPERTIES #
  //##############
  var numWidth;
  var numHeight;
  var booFilled;
  var objFillColor;
  var booBorder;
  var objBorderColor;
  var numBorderWidth;
  
    //##################
   //# DERIVED VALUES #
  //##################
  this.funNum_GetWidth = function() { };
  this.funNum_GetHeight = function() { };
  
    //#######################
   //# CONSTRUCT DESTRUCT  #
  //#######################
  this.Parent = OoPoint;
  this.Parent();
  this.Initialise();
    //#############
   //# FUNCTIONS #
  //#############
  this.funSetDimension = function(numNewWidth,numNewHeight)
  /*
  Description: Used to define width and height of a region.
  
  Parameters:
    numWidth  - number, width of region.
    numHeight - number, height of region.
  
  Returns:-
  */
  {
    try
    {
      if (typeof(numNewWidth)+typeof(numNewHeight) === "numbernumber")
      {
        numWidth = numNewWidth;
        numHeight = numNewHeight;
      }
    }
    catch (error)
    {
      console.log("<[O.o]> OoPointRegion=>funSetDimension: "+error);
    }
  };
  this.funSetBorder = function(objColor,numPixelWidth)
  /*
  Description: Accepts OoColor object and number 
               parameters to define the color and 
               width of a regions border.
  
  Parameters:
    objColor      - object(OoColor), color to draw border.
    numPixelWidth - number, width to draw boarder in pixels.
    
  Returns:
  */
  {
    try
    {
      if ((typeOf(objColor)+typeOf(numPixelWidth) === "objectnumber") && (objColor.funStr_GetType() == "OoColor"))
      {
        booBorder = true;
        objBorderColor = objColor;
        numBorderWidth = numPixelWidth;
      }
    }
    catch (error)
    {
      console.log("<[O.o]> OoPointRegion=>funSetBorder: "+error);
    }
  };
  this.funUnsetBorder = function()
  /*
  Description: Removes a regions boarder definitions.
  
  Parameters:-
    
  Returns: -
  */
  {
    booBorder = false;
  };
  this.funSetFill = function(objColor)
  /*
  Description: Accepts an OoColor object parameter as
               color to fill region with.
  
  Parameters:
    objColor - object(OoColor), color to fill region with.
  
  Returns:-
  */
  {
    try
    {
      if ((objColor.funStr_GetType() === "OoColor") && (objColor.booValidated === true))
      {
        booFilled = true;
        objFillColor = objColor;
      }
    }
    catch (error)
    {
      console.log("<[O.o]> OoPointRegion=>funSetFill: "+ error);
    }
  };
  this.funUnsetFill = function()
  /*
  Description: Removes a regions fill definition.
  
  Parameters: -
  
  Returns: -
  */
  {
    booFilled = false;
  };
  this.funMove = function(objNewPoint,numPixelsPerMillisecond)
  /*
  Description: Accepts OoPoint object and a number as parameters
               representing a destination and speed in
               milliseconds at which to move there.
  
  Parameters:
    objNewPoint - object(OoPoint), xyz point destination.
    numPixelsPerMillisecond - number, speed to move at.

  Returns: -
  */
  {
    try
    {
      if ((objNewPoint.funStr_GetType() === "OoPoint") && (typeof(numPixelsPerMillisecond) === "number"))
      {
        //calculate the vector
        //calculate number of moves
        //generate interrupt
        //push interrupt
      }
    }
    catch (error)
    {
      console.log("<[O.o]> OoPointRegion=>funMove: "+error);
    }
  };
  this.funTeleport = function(objNewPoint)
  /*
  Description:  Accepts OoPoint as location to redraw region on GUI.
  
  Parameters:
    objNewPoint - object(OoPoint), xyz point to teleport to.

  Returns: -
  */
  {
    try
    {
      if (objNewPoint.funStr_GetType() === "OoPoint")
      {
        this.funSetPoint(objNewPoint.funNum_GetAxisX(),objNewPoint.funNum_GetAxisY(),objNewPoint.funNum_GetAxisZ());
      }
    }
    catch (error)
    {
      console.log("<[O.o]> OoPointRegion=>funTeleport "+error);
    }
  };
  this.funRender = function()
  /*
  Description: Derives a visual representation of
               OoPointRegion from an instance's 
               properties then draws it on the GUI.
  
  Parameters:-
  
  Returns:- 
  */
  {};

}
/*
Copyright(c) 2020, Daniel Bullimore
All rights reserved.
*/