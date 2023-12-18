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
        /* Calculate the vector:
		-Pull both point arrays from the two OoPoint instances
		-Use pythagoras calculate 2D vector on XZ plane, subtract the point of
		 origin axis values from end point values becuase not all object will
		 move from A=(0,0,0)
		-Use pythagoras again to calculate length of 3D vector using 2D XZ vector
		 length and y-axis. again subtract point of origin y from end point y.
		-Use inverse sine, the oposite length (z) and hypot vector to 
		 calculate the vector angle.
		O=(3 4 4)
		OA=(6 6 6)
		AB=(1 2 3)

		(6 6 6) - (3 4 4) = (3 2 2)
		sqrt(3^2+2^2) = 3.605551275
		sqry(3.6^2+2^2) =  4.123105626
		asin(2/4.1) = 29.017140622 deg
			prove: A=29.017140622 B=90 C=180-(90+29.017140622)
					  	   C=180-119.1
					   	   C=60.982859378 deg
				ab=3.605551275 ac=4.123105626 bc=2
				A acos(ab/ac) = 29.017140647
				A atan(bc/ab) = 29.017140628 
				A asin(bc/ac) = 29.017140622
				C acos(bc/ac) = 60.982859378
				C atan(ab/bc) = 60.982859372
				C asin(ab/ac) = 60.982859353
				
				covert back to Cartesain 
				x = r * sin(polar) * cos(alpha)
				  = 4.123105626 * sin(60.982859378) * cos( atan(2/3) )
				  = 3
				y = r * sin(polar) * sin(alpha)
				  = 4.123105626 * sin(60.982859378) * sin( atan(2/3) )
				  = 2
				z = r * cos(polar)
				  = 4.123105626 * cos(60.982859378)
				  = 2
				where r is radius, alpha is horz angle from xaxis, polar is vertical angle from zaxis


		(1 2 3) - (6 6 6) = (-5 -4 -3)
		sqrt(-5^2+-4^2) = 6.403124237
		sqrt(6.4^2+-3^2) =  7.071067811
		asin(-3/7.1) = -25.104090254 deg
			prove for negatives: A= -25.104090254 B=90 C=180-(90+25.104090254)
								    =180-115.1041
								    =64.895909746
						ab = 6.403124237 ac = 7.071067811 bc = -3
						A acos(ab/ac) =  25.104090244
						A atan(bc/ab) =  25.104090252 
						A asin(bc/ac) = -25.104090254
						C acos(bc/ac) =  115.104090254 
						C atan(ab/bc) = -64.895909748
						C asin(ab/ac) =  64.895909756

						*looks wrong but graphical proof should show true... -25+115+90 == 180
						 its an inverse triangle.
						z                     y
						 |####################/###################	
						 |###################/####################	
						 |##################/#####################	
						 |#################/######################	
						 |################/#######################	
						 |###############/########################	
						 |##############/#########################	
						 |#############/##########################	
						 |#######x####A###########################	
						 |###########/############################	
						 |##########/#############################	
						9|#########/##############################	
						8|###y####/###############################	
						7|#######/################################	
						6|######6#####A###########################	
						5|###B#/##################################	
						4|####/###################################	
						3|###/####################################	
						2|##2#####################################	
						1|#/#####A#################################	
						0|/^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^x
						    123456789
						
						* i screen shot this graph and rotated it by -25.1  deg and there is right angle
						from point A to B. Proven.
	
	*/ 
	rayPointOfOrigin  = this.funRay_GetPoint();
	rayVectorEndPoint = objNewPoint.funRay_GetPoint();
	numAjacentLength  = Math.sqrt( Math.pow(rayVectorEndPoint[x]-rayPointOfOrigin[x],2) + Math.pow(rayVectorEndPoint[y]-rayPointOfOrigin[y],2) );
	numVectorLength   = Math.sqrt( Math.pow(rayVectorEndPoint[z]-rayPointOfOrigin[z],2) + Math.pow(numAjacentLength,2) );
	numVectorAngle    = Math.asin( Math.pow(rayVectorEndPoint[z]-rayPointOfOrigin[z],2) / numVectorLength );

        //calculate number of moves this involves geting the cycle info and deviding the vector by it.:w
	numAnimationTime = numVectorLength / numPixelsPerMillisecond;
	
        /*
	 Generate interupt
	 what thread suits the speed and number of increments?
	 Q: The interupt only updates the objects parameters and waits for mars to rnder it
	 or does the interupt call render after updating the parameters?

		say i want to animate a object from point A to B 1000px away at 10px/ms
		-mars renders once every solar year, it more for drawing the world which changes slower
		-im currently using 100ms solar year, so mars would skip 9 frames of the animation each year.
		-mercury renders 11times per solar year around 9ms per exe.
		-there are 100 frames to render (1000px/10px/ms)
		if px/ms < 10 mercury |  > 10 <  14 venus | > 14 < 25 earth | > 25px/ms mars
			
			1000px / 10pxpms = 100ms
			100 / 9ms(mercury) = 11.1111 interrupts hmmm how to round... do eleven + 1 extra
			1000px / 11.1111 interrupts = 90px per interrupt

	 A: it will depend on the speed at which the object moves, as shown above0
	*/
	if ( numAnimationTime <=  ( numBenchmarkSolarYear / threads.mercury.fractal ) )
	{
		objNewMercuryInterupt = new o();
		objNewMercuryInterupt.booRepeat = true;
		objNewMercuryInterupt.numExecutions = ( numAnimationTime / ( numBenchmarkSolarYear/ threads.mercury.fractal ) ); //still needs rounding
		objNewMercuryInterupt.booActOrSolve = true;
        //attach rayOO keys to the interupt
		objNewMecuryInterupt.objSubject = this.objOO();
		objNewMecuryInterupt.rayPointOfOrigin = rayPointOfOrigin;
		objNewMecuryInterupt.rayVectorEndPoint = rayVectorEndPoint;
		objNewMecuryInterupt.numAjacentLength = numAjacentLength;
		objNewMecuryInterupt.numVectorLength = numVectorLength;
		objNewMecuryInterupt.numVectorAngle = numVectorAngle;

	// function to execute
		objNewMercuryInterupt.funAct = function(objInterupt)
		{
			objInterupt	
		/*
			damn how pass the path/frames to this function 
			this.value will return funAct?
			Need to make animations rayOO object?
			--Sleeping on

			Dude you slept 4 years on this!

			this is easy when the game loop iterates through the work ques it has the objects
			handle when it executes funAct()  so it can pass prams at exe time.

		*/
		}
		


	}
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
