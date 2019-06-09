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
		funInitialise - This function adds a new object to the rayOO multi-dimensional array. This is the minimum constructor for all subclasses of _OO.
		
		funGetByObjectName - This function searches the global multi-dimensional rayOO array for a object using its type and name.
		
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
        var nameOf = new OO()
        or
        window.nameOf = new OO()

        Now you have 2 global arrays available: rayOO[] - Multidimensional which stores all objects that inherit this classes form. 
                                                rayOOi[] - which tracks the initial id number for new objects.
                                                
        all subclasses are required to have these 2 properties: numId, and strType, strName is optional but helpful;
        numId is used to give the object a unique identity like so rayOO[<type>][<numId>]
        a subclasses strType should really be the name of the class and numId is automatically assigned on construct (using funInitialise()).
        This all means that after a  object has rendered you can access objects using rayOO[<type>][<numId] then access their properties or methods
        like this rayOO['List'][1].funRender() and var x = rayOO['List'][1].strName or rayOO['List'][1].strName ="dsfsd";
        
        Initialising Subclasses
        To initialise the absolute minimum subclass of OO requires the following;
        function NewOOSubClass()
        {
            this.Parent = OO;
            this.Parent();

            this.strType = "NewOOSubclass"   //required to overide the super class type property
            
            this.funInitalise(); //indexes the object in rayOO[][] and sets this instances numId
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
        return "rayOO['"+this.strType+"']['"+this.numId+"']";
    };
    this.objOO = function()
    {
        //used in javascript
        return rayOO[this.strType][this.numId];
    };
    this.domOO = function()
    {
        //short cut for javascript DOM operations
	return document.getElementById(this.strType+this.numId);
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
		var numId = 0;
		var strType = "oomutiny";
		var strName = "";
	}
    
    this.Destroy = function()
    /*
    *Description:
	This function removes a object instance from rayOO[] multi-dimensional array

    *Parameters: -

    *Returns: void
    */
    {
	/*When this function is called from an instance of the super class 
	* delete the global arrays
	*/
	    if ( this.type === "OO")
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
		var strType = this.strType;
		var numIdent = this.numId;
	/*Go through the global array of OO objects
	* add all the objects in the array to a new array except the object whos calling this function 
	*/
		for (var x=0; x < rayOO[this.strType].length; x++ )
		{
		    var objTemp = rayOO[this.strType][x];
		    if (typeof(objTemp) === "object" && objTemp.numId !== numIdent) //*** Failed test 1 -3.2.11
		    {
			rayNewArray[x] = objTemp;
		    }
	/*When we find the object being removed and it has rendered HTML on the page
	* get the parent that contains the HTML and store it for later. 
	* loop through the child nodes of the parent looking for this instances HTML element
	* Remove the rendered HTML from the saved parent nodes child node list. (delete from page)
	*/
		   else if (objTemp.domNode())
		    {
			var elmParent = objTemp.domNode().parentNode;
			for (nodX in elmParent.childNodes)
			{

				if (elmParent.childNodes.item(nodX).isSameNode(objTemp.domNode()) )
				{

					elmParent.removeChild(elmParent.childNodes[nodX]);
					break;
				}
			}
		    }
		}
	//Overwrite the global array with the new array which doesnt contain this instances object entry.	
		rayOO[strType] = rayNewArray;
	}
    };
    //###########
    //# METHODS #
    //###########
    this.funInitialise = function ()
    /*
    Description: This function adds a new OO object to the rayOO[] multi-dimensional array. This is the minimum constructor for all subclasses of OO.

    Parameters:-

    Returns: void
    */
    {    
        //check if a multilevel array has been defined to store this type of objects
        if (typeof rayOO[this.strType] === "undefined") 
        {
            //Because this type of  Object array is undefined, define it
            rayOO[this.strType] = Array();
            //this is used to keep track of the next numId of object being added to this types rayOO[]
            rayOOi[this.strType] = 0;
        }
	//Auto generate an id number for new object
        this.numId = rayOOi[this.strType];

	//add the object to the objectas array
        rayOO[this.strType][this.numId] = this;

	//and increase the value of this types next gui index
        rayOOi[this.strType]++;
      
    };
this.funGetByObjectName = function(strType,strFindName)
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
this.funSetNameOnce(strNewName)
    /*
    Description: Provides write access to protect property strName provided is value is unset or null.

    Parameters: strNewName - string, name to give instance.

    Returns:  void
    */
	{
		if (strName == "")
		{
			strName = strNewName;
		}
	}
this.funGetName()
    /*
    Description: Allows read only access to property strName

    Parameters: -

    Returns:  string
    */
	{
		return strName;
	}
this.funGetType() 
    /*
    Description: Allows read only access to property strType

    Parameters: -

    Returns:  string
    */
	{
		return strType;
	}
this.funGetId() 
    /*
    Description: Allows read only access to property numId

    Parameters: -

    Returns:  number
    */
	{
		return numId
	}
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
			var strPropertyTestType = typeof(strType)
			if (strPropertyTestType == "string")
			{
				strResult = "pass";
			}
			else strResult = "fail";
			document.write("<p>* 3.1.2.2 Testing strType Exists:<br>...Typeof is: "+strPropertyTestType+"<br>..."+strResult+"</p>");
		/* 3.1.2.3 */
			var strPropertyTestId = typeof(numId)
			if (strPropertyTestId == "number")
			{
				strResult = "pass";
			}
			else strResult = "fail";
			document.write("<p>* 3.1.2.3 Testing numId Exists:<br>...Typeof is: "+strPropertyTestId+"<br>..."+strResult+"</p>");
		/* 3.1.2.4 */
			var strPropertyTestName = typeof(strName)
			if (strPropertyTestName == "string")
			{
				strResult = "pass";
			}
			else strResult = "fail";
			document.write("<p>* 3.1.2.4 Testing numName Exists:<br>...Typeof is: "+strPropertyTestName+"<br>..."+strResult+"</p>");
		/* 3.1.2.5 */
			var strPropertyTestIndex = typeof(window.rayOO);
			var strPropertyTestIndexNumber = typeof(window.rayOOi);
			if (strPropertyTestIndex == "object" && strPropertyTestIndexNumber == "object")
			{
				strResult = "pass";
			}
			else strResult = "fail";
	
			document.write("<p>* 3.1.2.5 Testing rayOO and rayOOi Exists:<br>...Typeof is: "+strPropertyTestIndex+" "+strPropertyTestIndexNumber+"<br>..."+strResult+"</p>");
		}
		catch (strError)
		{
			document.write("Unexpected error prevented the test from executing:<br>"+strError);
		}
	}

}
