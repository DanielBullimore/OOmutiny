//Javascript Document
//Copyright(c) 2020, Daniel Bullimore
//All rights reserved.
//* File Name: OoColor.class.js
//* System: OOmutiny
//* Dependencies: OO.class.js
//****************************************************************************************************** 	
//* Author:        Daniel Bullimore
//* Authors email: daniel.k.bullimore@gmail.com
//* Written:       12/01/20
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

Designed for code reuse. Because many classes will require color as a property and each class would have
get, set, and validation code. With a single color class any object that requires a color property can
accept an instance of OoColor as that color.

# OOmutiny is licensed under the BSD 3 - Clause "New" or "Revised" License
# To view a copy of this license, visit https://github.com/DanielBullimore/OOmutiny/blob/master/LICENSE
*******************************************************************************************************/
function OoColor()
/*Overview: A small object class to set/validate/get a color

Parameters: -

Properties:
  strColor - Private string, color stored in instance.
  booValidated - public boolean, set to true when color passed to funSetColor() is indeed a valid color.

Methods:
  funSetColor(color) - Sets the color, expects rbg, hex or english color as string.
  funStr_GetColor - returns the color.

Example: 
  - declear instance 
  objNewColor = new OoColor();
  
  - set color rgb
  objNewColor.funSetColor("rgb(7,8,245)");
    or english
  objNewColor.funSetColor("lightgreen");
    or hex
  objNewColor.funSetColor("#cf00ff");
  
  - get color 
  objNewColor.funStr_GetColor();
  
  - Inherits OO so .Destroy, .funSetNameOnce, .funStrGetType()... are all part of this class.
  objNewColor.funSetNameOnce("HeadOneTextColor");

*/
{
  //##############
  //# PROPERTIES #
  //##############
  var strColor = "#000000";
  this.booValidated = false;
  //#############
  //# CONSTRUCT #
  //#############
  this.Parent = OO;
  this.Parent('OoColor');
  this.Initialise();
  //###########
  //# METHODS #
  //###########
  this.funSetColor = function(strNewColor)
  /* Description: Use to set color for OoColor instance
    
    Parapeters: strNewColor - Private string, ether hex rgb or english color value
      
    Returns: -
  */
  {
    //Define an tiresome list of all the html colors in engish
    rayEnglishColors = [
    "aliceblue",
    "antiquewhite",
    "aqua",
    "aquamarine",
    "azure",
    "beige",
    "bisque",
    "black",
    "blanchedalmond",
    "blue",
    "blueviolet",
    "brown",
    "burlywood",
    "cadetblue",
    "chartreuse",
    "chocolate",
    "coral",
    "cornflowerblue",
    "cornsilk",
    "crimson",
    "cyan",
    "darkblue",
    "darkcyan",
    "darkgoldenrod",
    "darkgray",
    "darkgrey",
    "darkgreen",
    "darkkhaki",
    "darkmagenta",
    "darkolivegreen",
    "darkorange",
    "darkorchid",
    "darkred",
    "darksalmon",
    "darkseaGreen",
    "darkslateBlue",
    "darkslateGray",
    "darkslateGrey",
    "darkturquoise",
    "darkviolet",
    "deeppink",
    "deepskyblue",
    "dimgray",
    "dodgerblue",
    "direbrick",
    "floralwhite",
    "forestgreen",
    "fuchsia",
    "gainsboro",
    "ghostwhite",
    "gold",
    "goldenrod",
    "gray",
    "green",
    "greenyellow",
    "honeydew",
    "hotpink",
    "indianred",
    "indigo",
    "ivory",
    "khaki",
    "lavender",
    "lavenderblush",
    "lawngreen",
    "lemonchiffon",
    "lightblue",
    "lightcoral",
    "lightcyan",
    "lightgoldenrodyellow",
    "lightgray",
    "lightgrey",
    "lightgreen",
    "lightpink",
    "lightsalmon",
    "lightseagreen",
    "lightskyblue",
    "lightslategray",
    "lightsteelblue",
    "lightyellow",
    "lime",
    "limegreen",
    "linen",
    "magenta",
    "maroon",
    "mediumaquamarine",
    "mediumblue",
    "mediumorchid",
    "mediumpurple",
    "mediumseagreen",
    "mediumslateblue",
    "mediumspringgreen",
    "mediumturquoise",
    "mediumvioletred",
    "midnightblue",
    "mintcream",
    "mistyrose",
    "moccasin",
    "navajowhite",
    "navy",
    "oldlace",
    "olive",
    "olivedrab",
    "orange",
    "orangered",
    "orchid",
    "palegoldenrod",
    "palegreen",
    "paleturquoise",
    "palevioletred",
    "papayawhip",
    "peachpuff",
    "peru",
    "pink",
    "plum",
    "powderblue",
    "purple",
    "rebeccapurple",
    "red",
    "rosybrown",
    "royalblue",
    "saddlebrown",
    "salmon",
    "sandybrown",
    "seagreen",
    "seashell",
    "sienna",
    "silver",
    "skyblue",
    "slateblue",
    "slategray",
    "snow",
    "springgreen",
    "steelblue",
    "tan",
    "teal",
    "thistle",
    "tomato",
    "turquoise",
    "violet",
    "wheat",
    "white",
    "whitesmoke",
    "yellow",
    "yellowgreen" ];

    //define regular expresions to validate colors
    var rexTestHex = new RegExp(/^#[0-9a-f]{6}/i);
    //slightly lose regex, allows values over 255 (oversat)
    var rexTestRgb = new RegExp(/^rgb\u0028([0-9]{1,3}\,)([0-9]{1,3}\,)([0-9]{1,3})\u0029/i);
    //if else to work out if strNewColor is valid
    if (rayEnglishColors.indexOf(strNewColor.toLowerCase()) >= 0)
    {
      //english color name is valid
      this.booValidated = true;
    }
    else if (rexTestHex.test(strNewColor) === true) 
    { 
      //hex color value is valid
      this.booValidated = true;
    }
    else if (rexTestRgb.test(strNewColor) === true)
    {
      //rbg color value is valid
      this.booValidated = true;
    }
    else
    {
      //given color value is invalid
      console.log("<[O.o]> OoColor: Not a color");
      this.booValidated = false;
    }
    if (this.booValidated === true)
    {
      //only set strColor if its valid (use lowercase for comparision sake)
      strColor = strNewColor.toLowerCase();
    }
  };

  this.funStr_GetColor = function()
  /* Description: Use to retrive color of OoColor instance
    
    Parapeters: -
      
    Returns: -
  */
  { 
      return strColor;
  };

}

