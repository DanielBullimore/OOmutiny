//JavaScript Document
//Copyright 2019 Daniel Bullimore
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
function OO()
/*
*Overview:
	This is the Master Class for OOmutiny framework. Its sole purpose is to contain and control all
	objects that inherit its form.
	
	Methods:
		Initialise - This function adds a new object to the rayOO multi-dimensional array. This is the minimum constructor for all subclasses of _OO.
		
		funGetObjectByName - This function searches the global multi-dimensional rayOO array for a object using its type and name.
		
		funSetNameOnce - This function allows an instance to be named so long as its name is currently unset or null.
		
		funGetName - This function returns the name given to an instance.
		
		funGetType - Returns an instance class name.
		
		funGetId - returns an instances unique id used to index it rayOO[strType][numID]

		Destroy - Removes a OO object from rayOO multi-dimensional array.

	Derived Values:
		strOO() - returns a string reference to an instance's rayOO entry.
		objOO() - returns an instance's rayOO entry.
		domOO() - returns the DOM node of an instance's HTML element.
		
	Properties 
		numId - protected number
		strType - protected string
		strName - protected string
		rayOO - public array 
		rayOOi - public array
		

*Parameters: -

*Example:
		To start with a new instance of this class should be declared globally like so:
        window.nameOf = new OO()

        Now you have 2 global arrays available: rayOO[] - Multidimensional which stores all objects that inherit this classes form. 
                                                rayOOi[] - which tracks the initial id number for new objects.
                                                
        all subclasses are required to have these 2 properties: numId, and strType, strName is optional but helpful;
        numId is used to give the object a unique identity like so rayOO[<type>][<numId>]
        a subclasses strType should really be the name of the class and numId is automatically assigned on construct (using Initialise()).
        This all means that after a  object has rendered you can access objects using rayOO[<type>][<numId] then access their properties or methods
        like this rayOO['List'][1].funRender() and var x = rayOO['List'][1].strName;
        
        Initialising Subclasses
        To initialise the absolute minimum subclass of OO requires the following;
        function NewOOSubClass()
        {
            this.Parent = OO;
            this.Parent();

            strType = "NewOOSubclass"   //required to overide the super class type property
            
            this.Initalise(); //indexes the object in rayOO[][] and sets this instances numId
        }

        NewOOSubClass now exists in rayOO['NewOOSubClass'][0] and has all the methods that OO has such as funInitialise() which was used to index the new instance above.
        New methods and properties can now be added to NewOOSubClass but if they have the same name as a method or property in a ancestor class the ancestors will be overridden.

        If you have another class that inherits from NewOOSubClass it will have OO and NewOOSubClass's methods and properties. These can be called in the same manner as the constructor
        or with in the subclasses own methods.
	
	Subclasses that produce HTML elements should use a method called funRender for uniformity. funRender should implement DOM to create and append the HTML elements
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
        window.rayOO = Array();
        window.rayOOi = Array();
    }
	{
		numId = 0;
		strType = "oomutiny";
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
	/*When this function is called from an instance of the super class 
	* delete the global arrays
	*/
	    if ( strType === "oomutiny")
	    {
			delete window.rayOO;
			delete window.rayOOi;

	    }
    //When this function is called from a subclass remove the instance from global array and remove the html from document
	    else
	    {
    /* When this function is called from a subclass remove the instance from global array and remove the html from document
    * dEFINe some variables, an array to replace the current rayOO without the current instances object entry.
    * store the current instance's type and id just incase
    * seek and destroy \m/
    */
			var rayNewArray = Array();
	/*Go through the global array of OO objects
	* add all the objects in the array to a new array except the object whos calling this function 
	*/
			if (rayOO[strType]) 
			{  
				for (var objEachObject in rayOO[strType])
				{
					if (typeof(objEachObject) === "object" && objEachObject.numId !== numId) //*** Failed test 1 -3.2.11
					{
						rayNewArray[objEachObject.numId] = objEachObject;
					}
	/*When we find the object being removed and it has rendered HTML on the page
	* get the parent that contains the HTML and store it for later. 
	* loop through the child nodes of the parent looking for this instances HTML element
	* Remove the rendered HTML from the saved parent nodes child node list. (delete from page)
	*/
				   else if (objEachObject.domOO())
					{
						elmParent = objEachObject.domNode().parentNode;
						for (var nodX in elmParent.childNodes)
						{
							if (elmParent.childNodes.item(nodX).isSameNode(objEachObject.domNode()) )
							{
								elmParent.removeChild(elmParent.childNodes[nodX]);
								break;
							}
						}
					}
				}
			}
	//Overwrite the global array with the new array which doesnt contain this instances object entry.	
			rayOO[strType] = rayNewArray;
		}
		for (var objEverything in this) { delete this[objEverything]; }
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
            rayOO[strType] = Array();
            //this is used to keep track of the next numId of object being added to this types rayOO[]
            rayOOi[strType] = 0;
        }
	//Auto generate an id number for new object
        numId = rayOOi[strType];

	//add the object to the objectas array
        rayOO[strType][numId] = this;

	//and increase the value of this types next gui index
        rayOOi[strType]++;
      
    };
this.funGetObjectByName = function(strType,strFindName)
    /*
    Description: This function searches the global multidimensional GuiObjects array for a object using its type and name

    Parameters: strType - String type of the object being searched for.
                strFindName - String the name of the object to find.

    Returns:  Object
    */
    {
        //loop through the array
        for (var x=0; x < rayOO[strType].length; x++)
        {
                //when the name of the current looped object matches the search for name return the found object
            if(rayOO[strType][x].strName == strFindName)
            {   
                return rayOO[strType][x];
            }
        }
    };
this.funSetNameOnce = function (strNewName)
    /*
    Description: Provides write access to protect property strName provided is value is unset or null.

    Parameters: strNewName - string, name to give instance.

    Returns:  void
    */
	{
		if (strName === "")
		{
			strName = strNewName;
		}
	};
this.funGetName = function ()
    /*
    Description: Allows read only access to property strName

    Parameters: -

    Returns:  string
    */
	{
		return strName;
	};
this.funGetType = function () 
    /*
    Description: Allows read only access to property strType

    Parameters: -

    Returns:  string
    */
	{
		return strType;
	};
this.funGetId = function () 
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
		document.write("<hr><h2>3.1.2</h2><br>");
		try
		{
			/* 3.1.2.1 */
			strTypeOfTestObject = typeof(this);
			if (strTypeOfTestObject == "object")
			{
				strResult = "pass";
			}
			else strResult = "fail";
	
			document.write("<p>* 3.1.2.1 Testing instance decleration:<br>...Typeof is: "+strTypeOfTestObject+"<br>..."+strResult+"</p>");	
			/* 3.1.2.2 */		
			 strPropertyTestType = typeof(strType)
			if (strPropertyTestType == "string")
			{
				strResult = "pass";
			}
			else strResult = "fail";
			document.write("<p>* 3.1.2.2 Testing strType Exists:<br>...Typeof is: "+strPropertyTestType+"<br>..."+strResult+"</p>");
			/* 3.1.2.3 */
			 strPropertyTestId = typeof(numId)
			if (strPropertyTestId == "number")
			{
				strResult = "pass";
			}
			else strResult = "fail";
			document.write("<p>* 3.1.2.3 Testing numId Exists:<br>...Typeof is: "+strPropertyTestId+"<br>..."+strResult+"</p>");
			/* 3.1.2.4 */
			 strPropertyTestName = typeof(strName)
			if (strPropertyTestName == "string")
			{
				strResult = "pass";
			}
			else strResult = "fail";
			document.write("<p>* 3.1.2.4 Testing numName Exists:<br>...Typeof is: "+strPropertyTestName+"<br>..."+strResult+"</p>");
			/* 3.1.2.5 */
			 strPropertyTestIndex = typeof(window.rayOO);
			 strPropertyTestIndexNumber = typeof(window.rayOOi);
			if (strPropertyTestIndex == "object" && strPropertyTestIndexNumber == "object")
			{
				strResult = "pass";
			}
			else strResult = "fail";
			document.write("<p>* 3.1.2.5 Testing rayOO and rayOOi Exists:<br>...Typeof is: "+strPropertyTestIndex+" "+strPropertyTestIndexNumber+"<br>..."+strResult+"</p>");
			/* 3.1.2.6 - Methods exist*/
			strMethodTypes = 'Destroy():'+typeof(this.Destroy)+'<br>'+
								'Initialise():'+typeof(this.Initialise)+'<br>'+
								'funGetObjectByName():'+typeof(this.funGetObjectByName)+'<br>'+
								'funSetNameOnce():'+typeof(this.funSetNameOnce)+'<br>'+
								'funGetId():'+typeof(this.funGetId)+'<br>'+
								'funGetName():'+typeof(this.funGetName)+'<br>'+
								'funGetType():'+typeof(this.funGetType)+'<br>';
			if (strMethodTypes === 'Destroy():function<br>Initialise():function<br>funGetObjectByName():function<br>funSetNameOnce():function<br>funGetId():function<br>funGetName():function<br>funGetType():function<br>') { strResult = "...Pass<br>"; }
			else { strResult = "...Fail<br>"; }
			document.write("<p>* 3.1.2.6 Testing required methods exist:<br>...<br>"+strMethodTypes+"<br>"+strResult+"</p>");
			
		/* 3.2.1 Post initialise() */
			document.write("<hr><h2>3.2.1</h2><br>");
			this.Initialise();
			{
				/* 3.2.1.1 */
				strTypeOfVar = typeof(numId);
				if (strTypeOfVar === "number") { strResult = "...Pass"; }
				else { strResult = "!Fail..."; }
				document.write("<p>* 3.2.1.1 Testing type and value of numId<br>...numId is: "+ strTypeOfVar +"<br>...numId value: "+ numId +"<br>"+ strResult+ "</p>");
				/* 3.2.1.2 */
				strTypeOfVar = typeof(strType);
				if (strTypeOfVar === "string" && strType === "oomutiny") { strResult = "...Pass"; }
				else { strResult = "!Fail..."; }
				document.write("<p>* 3.2.1.2 Testing type and value of strType<br>...strType is: "+ strTypeOfVar +"<br>...strType value: "+ strType +"<br>"+ strResult+ "</p>");
				/* 3.2.1.3 */
				strTypeOfVar = typeof(strName);
				if (strTypeOfVar === "string" && strName ==="") { strResult = "...Pass"; }
				else { strResult = "!Fail..."; }
				document.write("<p>* 3.2.1.3 Testing type and value of strName<br>...strName is: "+ strTypeOfVar +"<br>...strName value: "+ strName +"<br>"+ strResult+ "</p>");
				/* 3.2.1.4 */
				strTypeOfVar = typeof(window.rayOO[strType][0]);
				if (strTypeOfVar === "object" && window.rayOO[strType][numId].funGetId() == numId) { strResult = "...Pass"; }
				else { strResult = "!Fail..."; }
				document.write("<p>* 3.2.1.4 Testing type and value of rayOO['oomutiny]<br>...Type is: "+ strTypeOfVar +"<br>...value: "+ rayOO[strType][numId] +"<br>"+ strResult+ "</p>");
				/* 3.2.1.5 */
				strDerivedString = this.strOO();
				if (typeof(strDerivedString) === "string" && strDerivedString == "rayOO['oomutiny']['0']") { strResult = "...Pass"; }
				else { strResult = "!..Fail"; }
				document.write("<p>* 3.2.1.5 Testing derived string strOO():<br>...Retured value is: "+strDerivedString+"<br>"+strResult+"</p>");
			/* 3.2.1.6 */
				strDerivedObject = this.objOO();
				if (typeof(strDerivedObject) === "object" && strDerivedObject === this) { strResult = "...Test object and returned object are equal<br>...Pass"; }
				else { strResult = "!..Fail"; }
				document.write("<p>* 3.2.1.6 Testing derived object objOO():<br>...Retured value is: "+strDerivedObject+"<br>"+strResult+"</p>");
			/* 3.2.1.7 */

				if (this.domOO().className === "pass" ) { strResult = "...Pass"; }
				else { strResult = "!..Fail"; }
				document.write("<p>* 3.2.1.7 Testing derived DOM node strOO():<br>...Class names are equal<br>"+strResult+"</p>");
			}
		/* 3.2.2 */
			if(this.funGetObjectByName("oomutiny","") == this) { strResult = "...Pass" }
			else { strResult = "!..Fail"; }
			document.write("<hr><h2>3.2.2</h2><br>* Testing funGetObjectByName() returns this instance:<br>"+strResult);
			
			
		}
		catch (strError)
		{
			document.write("Unexpected error prevented the test from executing:<br>"+strError);
		}
	};

}
