//Javascript Document
//Copyright(c) 2019, Daniel Bullimore
//All rights reserved.
 //################################################################################################################################################ 
   //# File Name       :OO.class.js
    //# System          :OOmutiny
     //# Dependencies    :-
      //# ----------------------------------------------------------------------------------------------------------------------------------------------
      //# Author          :Daniel Bullimore
	  //# Authors email   :daniel.k.bullimore@gmail.com
	  //# Written         :28/5/2019
	  //# ----------------------------------------------------------------------------------------------------------------------------------------------
	    //# !If you modify this file add your name to this list then update the last modified field
	     //# Modifications By: Daniel Bullimore
	      //# Last Modified   : 6/9/2019
	      //################################################################################################################################################
	      //# DESCRIPTION /
	      //#____________/
	      //# This file contains the super class for my OOmutiny framework. Includes the documentation.
	      //# Written in vi on FreeBSD 9.1
	      //#
	      //# OOmutiny is licensed under the BSD 3-Clause "New" or "Revised" License
	      //# To view a copy of this license, visit https://github.com/DanielBullimore/OOmutiny/blob/master/LICENSE
	   //#-------------------------------------------------------------------------------------------------------------------------------------------
     //#
  //#
//################################################################################################################################################
/*<<JS CLASS>>*/
function OO(strDecendantType)
/*
*Overview:
	This is the Master Class for OOmutiny framework. Its sole purpose is to contain and control all
	objects that inherit its form.
	
	Methods:
		Initialise - This function adds a new object to the rayOO multi-dimensional array. This is the minimum constructor for all subclasses of _OO.
		
		funObj_GetObjectByName - This function searches the global multi-dimensional rayOO array for a object using its type and name.
		
		funSetNameOnce - This function allows an instance to be named so long as its name is currently unset or null.
		
		funStr_GetName - This function returns the name given to an instance.
		
		funStr_GetType - Returns an instance class name.
		
		funNum_GetId - returns an instances unique id used to index it rayOO[strType][numID]

		Destroy - Removes a OO object from rayOO multi-dimensional array.

	Derived Values:
		strOO() - returns a string reference to an instance's rayOO entry.
		objOO() - returns an instance's rayOO entry.
		domOO() - returns the DOM node of an instance's HTML element.
		
	Properties 
		numId - Private number
		strType - Protected string
		strName - protected string
		window.rayOO - public array 
		window.rayOOi - public array
		

*Parameters: strDecendantType - string, allows decendant classes to overwrite strType when calling OO as parent.

*Example:
		To start with a new instance of this class should be declared globally like so:
        window.nameOf = new OO()

        Now you have 2 global arrays available: rayOO[] - Multidimensional which stores all objects that inherit this classes form. 
                                                rayOOi[] - which tracks the initial id number for new objects.
                                                
        all subclasses are required to have these 3 properties: numId, strName and strType; 
        Instances can be named with funSetNameOnce("Name"),
        numId is used to give the object a unique identity like so rayOO[<type>][<numId>]
        A subclasses strType should really be the name of the class and numId is automatically assigned on construct (using Initialise()).
        This all means that after an object has Initialised you can access objects using rayOO[<type>][<numId] then access their properties or methods
        like this rayOO['List'][1].funRender() and var x = rayOO['List'][1].strName;
        Another OO decendant can be looked up in the object library using any OO instance or decendant instance using funObj_GetObjectByName()
        
        Initialising Subclasses
        To initialise the absolute minimum subclass of OO requires the following;
        function NewOOSubClass()
        {
            this.Parent = OO;
            this.Parent("NewOOSubclass");//required to overide the super class type property
            this.Initialise(); //indexes the object in rayOO[][] and sets this instances numId
        }

        NewOOSubClass now exists in rayOO['NewOOSubClass'][0] and has all the methods that OO has such as Initialise() which was used to index the new instance above.
        New methods and properties can now be added to NewOOSubClass but if they have the same name as a method or property in a ancestor class the ancestors will be overridden.

        If you have another class that inherits from NewOOSubClass it will have OO and NewOOSubClass's methods and properties. These can be called in the same manner as the constructor
        or with in the subclasses own methods.
	
	Subclasses that produce HTML/Canvas elements should use a method called funRender for uniformity. funRender should implement DOM to create and append the HTML elements
	to the document within a parent element. Giving developers the ability to select a target parent note will make sub classes more diverse.
*/
{

    //###############
    //# PROPERTIES #
    //###############
    //Define the defualt properties 
    var numId;
    var strType;  
    var strName;

    //###################
    //# DERIVED VALUES #
    //###################
    //derive a value using properties of this class
    this.strOO = function()
    {
        //used by html events
        return "rayOO['"+strType+"']['"+numId+"']";
    };
    this.objOO = function()
    {
        //used in javascript
        return rayOO[strType][numId];
    };
    this.domOO = function()
    {
        //short cut for javascript DOM operations
	      return document.getElementById(strType+numId);
    }
    //#########################
    //# CONSTRUCT DESTRUCT #
    //#########################
    //check if rayOO has been defined globally
    if (typeof rayOO === "undefined") 
    { 
        //because the array hasn't been defined, define it globally
        window.rayOO = [];
        window.rayOOi = [];
    }
	  {
  		numId = 0;
  	  
  		if (typeof strDecendantType === "undefined")
  		{
  		  strType = "oomutiny";
  		}
  		else
  		{
  		  strType = strDecendantType;
  		}
  		strName = "";
	  }
    this.Destroy = function(strInstanceName)
    /*
    *Description:
	This function removes a object instance from rayOO[] multi-dimensional array

    *Parameters: strInstanceName - string, name of OO() instance. Without this parameter object will be empty but will still exist in namespace.

    *Returns: true if fully destroyed or false.
    */
    {
  /*remove any html from document
  */  
	    if (this.domOO() !== null)
	    {
	      elmParent = this.domOO().parentNode;
	      for (var nodX in elmParent.childNodes)
	      {
	        if (elmParent.childNodes.item(nodX).isSameNode(this.domOO()))
	        {
	          elmParent.removeChild(elmParent.childNodes[nodX]);
	          break;
	        }
	      }
	    }
	    //remove this instance from global array
	    rayOO[strType].splice(rayOO[strType].lastIndexOf(this),1);
  /*When this function is called from an instance of the super class 
  * delete the global arrays. But Not if other super instances exist 
  */
	    //if ( strType === "oomutiny") failed 0.0Master Test#4 https://github.com/DanielBullimore/OOmutiny/issues/38
	    if ( (strType === "oomutiny") && (rayOO['oomutiny'].length === 0) )
	    {
			  delete window.rayOO;
			  delete window.rayOOi;
	    }

		  for (var objEverything in this) { 
		  delete this[objEverything]; }
	    delete window[strInstanceName];
    };
    //###########
    //# METHODS #
    //###########
    this.Initialise = function ()
    /*
    Description: This function adds a new OO object to the rayOO[] multi-dimensional array. This is the minimum constructor for all subclasses of OO.

    Parameters:-

    Returns: void
    */
    {    
        //check if a multilevel array has been defined to store this type of objects
        if (typeof rayOO[strType] === "undefined") 
        {
          
            //Because this type of  Object array is undefined, define it
            rayOO[strType] = [];
            //this is used to keep track of the next numId of object being added to this types rayOO[]
            rayOOi[strType] = 0;
        }
        
        //console.log(strType);
	//Auto generate an id number for new object
        numId = rayOOi[strType];

	//add the object to the objectas array
        rayOO[strType][numId] = this;
	//and increase the value of this types next gui index
        rayOOi[strType]++;
      
    };
this.funObj_GetObjectByName = function(strType,strFindName)
    /*
    Description: This function searches the global multidimensional GuiObjects array for a object using its type and name

    Parameters: strType - String type of the object being searched for.
                strFindName - String the name of the object to find.

    Returns:  Object or false
    */
    {
        //loop through the array
        console.log(strType);
        for (var x=0; x < rayOO[strType].length; x++)
        {
                //when the name of the current looped object matches the search for name return the found object
            if(rayOO[strType][x].funStr_GetName() == strFindName)
            {   
                return rayOO[strType][x];
            }
        }
        //added 0.0.Master Test#4 https://github.com/DanielBullimore/OOmutiny/issues/38
        return false;
    };
this.funSetNameOnce = function (strNewName)
    /*
    Description: Provides write access to protect property strName provided is value is unset or null.

    Parameters: strNewName - string, name to give instance.

    Returns:  void
    */
	{
	  try
	  {
  	  //if ((strName === "") failed 0.0Master Test#4 https://github.com/DanielBullimore/OOmutiny/issues/38 
  		if ((strName === "") && (this.funObj_GetObjectByName(strType,strNewName) === false))
  		{
  			strName = strNewName;
  		}
	  }
	  catch (error)
	  {
	    console.log("<[O.o]> OO: "+error);
	  }
	};
this.funStr_GetName = function ()
    /*
    Description: Allows read only access to property strName

    Parameters: -

    Returns:  string
    */
	{
	  return strName;
	};
this.funStr_GetType = function () 
    /*
    Description: Allows read only access to property strType

    Parameters: -

    Returns:  string
    */
	{
		return strType;
	};
this.funNum_GetId = function () 
    /*
    Description: Allows read only access to property numId

    Parameters: -

    Returns:  number
    */
	{
		return numId
	};

this.Test = function ()
    /*
    Description: This function is an internal testing method used to test the class functions as designed

    Parameters: -

    Returns: -
    */
	{
	/* 3.1.2 */
		window.document.write("<hr><h2>3.1.2</h2><br>");
		try
		{
			/* 3.1.2.1 */
			strTypeOfTestObject = typeof(this);
			if (strTypeOfTestObject == "object")
			{
				strResult = "pass";
			}
			else strResult = "fail";
	
			window.document.write("<p>* 3.1.2.1 Testing instance decleration:<br>...Typeof is: "+strTypeOfTestObject+"<br>..."+strResult+"</p>");	
			/* 3.1.2.2 */		
			alert(typeof this.funStr_GetType());
			 strPropertyTestType = typeof(strType);
			if (strPropertyTestType == "string")
			{
				strResult = "pass";
			}
			else strResult = "fail";
			window.document.write("<p>* 3.1.2.2 Testing strType Exists:<br>...Typeof is: "+strPropertyTestType+"<br>..."+strResult+"</p>");
			/* 3.1.2.3 */
			 strPropertyTestId = typeof(numId);
			if (strPropertyTestId == "number")
			{
				strResult = "pass";
			}
			else strResult = "fail";
			window.document.write("<p>* 3.1.2.3 Testing numId Exists:<br>...Typeof is: "+strPropertyTestId+"<br>..."+strResult+"</p>");
			/* 3.1.2.4 */
			 strPropertyTestName = typeof(strName);
			if (strPropertyTestName == "string")
			{
				strResult = "pass";
			}
			else strResult = "fail";
			window.document.write("<p>* 3.1.2.4 Testing numName Exists:<br>...Typeof is: "+strPropertyTestName+"<br>..."+strResult+"</p>");
			/* 3.1.2.5 */
			 strPropertyTestIndex = typeof(window.rayOO);
			 strPropertyTestIndexNumber = typeof(window.rayOOi);
			if (strPropertyTestIndex == "object" && strPropertyTestIndexNumber == "object")
			{
				strResult = "pass";
			}
			else strResult = "fail";
			window.document.write("<p>* 3.1.2.5 Testing rayOO and rayOOi Exists:<br>...Typeof is: "+strPropertyTestIndex+" "+strPropertyTestIndexNumber+"<br>..."+strResult+"</p>");
			/* 3.1.2.6 - Methods exist*/
			strMethodTypes = 'Destroy():'+typeof(this.Destroy)+'<br>'+
								'Initialise():'+typeof(this.Initialise)+'<br>'+
								'funObj_GetObjectByName():'+typeof(this.funObj_GetObjectByName)+'<br>'+
								'funSetNameOnce():'+typeof(this.funSetNameOnce)+'<br>'+
								'funNum_GetId():'+typeof(this.funNum_GetId)+'<br>'+
								'funStr_GetName():'+typeof(this.funStr_GetName)+'<br>'+
								'funStr_GetType():'+typeof(this.funStr_GetType)+'<br>';
			if (strMethodTypes === 'Destroy():function<br>Initialise():function<br>funObj_GetObjectByName():function<br>funSetNameOnce():function<br>funNum_GetId():function<br>funStr_GetName():function<br>funStr_GetType():function<br>') { strResult = "...Pass<br>"; }
			else { strResult = "...Fail<br>"; }
			window.document.write("<p>* 3.1.2.6 Testing required methods exist:<br>...<br>"+strMethodTypes+"<br>"+strResult+"</p>");
			
		/* 3.2.1 Post initialise() */
			window.document.write("<hr><h2>3.2.1</h2><br>");
			this.Initialise();
			{
				/* 3.2.1.1 */
				strTypeOfVar = typeof(numId);
				if (strTypeOfVar === "number") { strResult = "...Pass"; }
				else { strResult = "!Fail..."; }
				window.document.write("<p>* 3.2.1.1 Testing type and value of numId<br>...numId is: "+ strTypeOfVar +"<br>...numId value: "+ numId +"<br>"+ strResult + "</p>");
				/* 3.2.1.2 */
				strTypeOfVar = typeof(strType);
				if (strTypeOfVar === "string" && strType === "oomutiny") { strResult = "...Pass"; }
				else { strResult = "!Fail..."; }
				window.document.write("<p>* 3.2.1.2 Testing type and value of strType<br>...strType is: "+ strTypeOfVar +"<br>...strType value: "+ strType +"<br>"+ strResult+ "</p>");
				/* 3.2.1.3 */
				strTypeOfVar = typeof(strName);
				if (strTypeOfVar === "string" && strName ==="") { strResult = "...Pass"; }
				else { strResult = "!Fail..."; }
				window.document.write("<p>* 3.2.1.3 Testing type and value of strName<br>...strName is: "+ strTypeOfVar +"<br>...strName value: "+ strName +"<br>"+ strResult+ "</p>");
				/* 3.2.1.4 */
				strTypeOfVar = typeof(window.rayOO[strType][0]);
				if (strTypeOfVar === "object" && window.rayOO[strType][numId].funNum_GetId() == numId) { strResult = "...Pass"; }
				else { strResult = "!Fail..."; }
				window.document.write("<p>* 3.2.1.4 Testing type and value of rayOO['oomutiny]<br>...Type is: "+ strTypeOfVar +"<br>...value: "+ rayOO[strType][numId] +"<br>"+ strResult+ "</p>");
				/* 3.2.1.5 */
				strDerivedString = this.strOO();
				if (typeof(strDerivedString) === "string" && strDerivedString == "rayOO['oomutiny']['0']") { strResult = "...Pass"; }
				else { strResult = "!..Fail"; }
				window.document.write("<p>* 3.2.1.5 Testing derived string strOO():<br>...Retured value is: "+strDerivedString+"<br>"+strResult+"</p>");
			/* 3.2.1.6 */
				strDerivedObject = this.objOO();
				if (typeof(strDerivedObject) === "object" && strDerivedObject === this) { strResult = "...Test object and returned object are equal<br>...Pass"; }
				else { strResult = "!..Fail"; }
				window.document.write("<p>* 3.2.1.6 Testing derived object objOO():<br>...Retured value is: "+strDerivedObject+"<br>"+strResult+"</p>");
			/* 3.2.1.7 */

				if (this.domOO().className === "pass" ) { strResult = "...Pass"; }
				else { strResult = "!..Fail"; }
				window.document.write("<p>* 3.2.1.7 Testing derived DOM node strOO():<br>...Class names are equal<br>"+strResult+"</p>");
			}
		/* 3.2.2 */
			if(this.funObj_GetObjectByName("oomutiny","") == this) { strResult = "...Pass" }
			else { strResult = "!..Fail"; }
			window.document.write("<hr><h2>3.2.2</h2><br>* Testing funObj_GetObjectByName() returns this instance:<br>"+strResult);
			
			
		}
		catch (strError)
		{
			window.document.write("Unexpected error prevented the test from executing:<br>"+strError);
		}
	};

}
