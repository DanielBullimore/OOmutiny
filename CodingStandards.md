Coding Standards

Contents
Coding Standards	1
Naming Conventions	1
Variable Names:	1
Lines OF Code	1
Functions and Function Names:	1
Classes	2
Other	3
Files and File Headings	3
.PHP File Headings	3
.JS File Headings	4
.CSS File Headers	5
Required Comments	5
standalone code	5
functions	6
classes	6
CSS	9


By Daniel Bullimore

This document outlines how computer code written to develop this project will be formatted and commented.

Comments in examples are green.

Each command should be on a separate line and lines contained inside curly braces should be indented. This applies to html also when elements are contained within other elements.

Naming Conventions
This convention will apply to all code written in PHP, Javascript, and CSS. Examples given are not language specific and slight changes are allowed to adhere to language requirements like the $ prefixing php variables.

Variable Names:

Variables will be named in long form, where the name of the variable describes what the variable is intended to contain or how it will be used. The name itself will start with lowercase and every word after the first will have a capitalized first letter. example:

	var strNameOfClientAuthenticating 

Arrays are considered variables and must be named using these conventions.

Lines OF Code

Each line of code must be on its own line to make space for comments.
Functions and Function Names:

Functions will also be name in long form, where the name of the function describes what area of the system the function is used in and what it does. The name itself will start with a lowercase “fun” followed by its return type with a capitalized letter followed with a “_”, finally every word of the description will start with a capital. Example
	
	funVoid_TaskDeleteTask()

Names of Function parameters will follow the rules outlined for variable names. Example:
	
	funVoid_TaskDeleteTask(intTaskIdToBeDeleted)

Curly braces used to contain the functions code must always be in separate lines from the functions declaration and the code itself. Example:
	
	function funVoid_TaskDeleteTask(intTaskIdToBeDeleted)
	{
		*code*
	}

Classes
The first letter of every word in the class name must be capitalized. The class name should be objective and include and any parent class names first. Example:

	class ListTaskLisItem extends ListTaskList()

Initial parameters must follow the convention defined for Variable Names and class instance names must be prefixed with “cls” followed by a description of how the class is being used. The First letter of each word in the description must be capitalized. 

	class ListTaskListItem 
	{
		*Properties*

		public ListTaskList ( strDisplayedTaskName, intUserIdTaskAssignedTo )

*code*
	}

	clsExampleTaskListItem = new ListTaskListItem(“first task”, 4)

Curly braces used to contain code within classes must be on separate lines. Example:

	Class List 
{
	* class code*
}

Class properties must be the first items contained within classes, they should be named according to the Variable name conventions. Example:
	
	Class List 
	{
		private strNameEnteredByUser as string;

		*other class code *
	}

Any class constructors and destructors must be place under the properties and class functions must be placed beneath them. Example:
	
	class ListListItem extends List
	{
		private strListIndex as string;
		
		public ListListItem ()
		{
			*constructor code*
		}
		
		public ListListItemDestructor ()
		{
			*Destructor code*
		}

		*class functions code*
	}

Class functions should follow the conventions outlined for normal functions

Other
	Any other objects like name spaces and structures should follow the trends set for variables functions and classes. Be Clear! Others may have to follow your code.
Files and File Headings

Three file types will have conventions defined for them in this document, the are PHP, CSS, and Javascript files. Programmers working on this project should try and group code together in separate files for each area of the application objectively. So if I had two <div> elements on a page and each <div> contained buttons for different kinds of activities, then I’d create two files to contain the functions: boxonefunctions.js and boxtwofunctions.js. Use File names to describe what the file contains and which area of the program the files code is used. Use lowercase for file names wherever possible. Put Classes in their own file with a same name as the class put .class before the file extension. Examples:
List.class.js
List.class.php

.PHP File Headings
/* File Name:       <file name>.php
 * System:          <Name of the system this file was developed for>
 * Dependencies: <List Any files this one requires to operate correctly>
 *
 ***************************************************************************************************** 
 * Author:           <Your name>
 * Authors email: <your email address>
 * Written:          <Date dd/mm/yyyy>
 *
 ******************************************************************************************************
 * !---If you modify this file, add your name to this then update the Last Modified date---!
 * Modifications By: <name1>, <name2>, … , <Your Name>
 * Last Modified:      <Date dd/mm/yyyy>
 ******************************************************************************************************
 *
 *
 ******************************************************************************************************
 * DESCRIPTION
 ******************************************************************************************************
 <Describe this file and what it contains>


 *****************************************************************************************************
 */


.JS File Headings

//Javascript Document
//* File Name: <File name>.js
//* System: <Name of the system this file was developed for>
//* Dependencies: <Name any files this one requires to operate correctly>
//****************************************************************************************************** 
//* Author:           <Your name>
//* Authors email: <your email address>
//* Written:          <Date dd/mm/yyyy>
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
// <Describe this file and what it contains and what part of the system it is used in>
// [Describe any other usefull stuff]
//
//****************************************************************************************************** 


.CSS File Headers

/* File Name: <file name>.css
 * System: <Name of the system this file was developed for>
 * Objects: <list any object this sheet styles>
 ***************************************************************************************************** 
 * Author:            <Your name>
 * Authors email: <your email address>
 * Written:           <Date dd/mm/yyyy>
 ******************************************************************************************************
 !---------Modifying this file, add your name to this then update the Last Modified date---!
 * Modifications By: <name1>, <name2>, … , <Your Name>
 * Last Modified:      <Date dd/mm/yyyy>
 ******************************************************************************************************
 *
 *
 ******************************************************************************************************
 * DESCRIPTION
 ******************************************************************************************************
 <Describe this file and what it contains>


 *****************************************************************************************************
 */



Required Comments
Comments will be required within the source files of this project. This section outlines where comments must be written and what those comments must document. All comments must be written in clear english or pseudo code. Long comments should be split onto multiple lines.

standalone code
Code not contained within a class or function containers must have comments explaining what the code does, this can be line by line for complex code such a string manipulation or regular expressions. Or standard comments can be made every 4-5 line explaining what is being achieved by the following lines. Line by line comments will be written before the line of code. Standard comments will also be written preceding the lines of code they explain. Examples:
	// explain the code line by line
	$strSize = $rayUserInfo[$strUser.$intUserId.tostring()][‘dates’][$intLoopCounter]
	/*
put string into a variable and replace ‘ing’ with a null string
then add the date to the of the string without ‘ing’ and print
it out to the user.
	*/
	strString = “string”;
	strString = replace(‘ing’, ‘’,strstring);
	strString = strString.date.now();
	print(strString);
functions
Functions will require extra commenting compared to stand alone code. A description of the function must be placed between the functions declaration and its opening curly brace with in multiple  lined comments. Under the description place definitions of any parameters the function can take and state the return type. Code contained within functions should be comments according to the standalone code requirements. Example:

function funString_ExampleStringDateAppender ( strStringToAddDateTo, booTodaysDateOrTomorrowsDate )
/*
Description: This function adds the current date to the end of some text

Parameters: 
strStringToAddDateTo                  - Some text to add the date to.
	booTodaysDateOrTomorrowsDate - true adds todays date false adds tomorrows.

Returns:
String 
*/
{


	/*
if tomorrows date mode put string into a variable and replace ‘ing’ with a null string
then add the date to the of the string without ‘ing’ and print
it out to the user.
	*/
	if (!booTodaysDateOrTomorrowsDate)
	{
	strString = “string”;
	strString = replace(‘ing’, ‘’,strstring);
	strString = strString.date.tommorow();
	print(strString);
}

// otherwise take ‘ing’ from the end of string and add the current date and print
	else print( replace(‘ing’, ‘’, “string”).date.now()); 
}

classes
Classes will require comments similar to the function requirements except the class itself will require an overview of purpose, descriptions of any initial parameters and normal use of the class. Any functions contained within a class must have comments according to the function requirements Constructors and Destructors commented as functions. Class properties do not require comments but derived values must be commented according to the Stand Alone code commenting Requirements. Example Class File:

/* File Name:       example.class.php
 * System:          example system
 * Dependencies: none
 *
 ***************************************************************************************************** 
 * Author:           Daniel
 * Authors email: daniel@spinningplanet.co.nz
 * Written:          04/09/2012
 *
 ******************************************************************************************************
 * !---If you modify this file, add your name to this then update the Last Modified date---!
 * Modifications By: Daniel, Bob, Daniel
 * Last Modified:      05/09/2012
 ******************************************************************************************************
 *
 *
 ******************************************************************************************************
 * DESCRIPTION
 ******************************************************************************************************
 This file contains the list class which is used to generate list object HTML.


 *****************************************************************************************************
 */
class List 
/*
Overview: This class produces the HTML code to display a listbox object which can contain listItems.

Parameters:	intMaxItems,                 -the maximum number of its this list can contain
	rayInitalItems,               - And array of list items to add to the list
Howto: 
rayItems = array(“item1”,”Item2”);
rayItems[] = item1; 
var clsLisOfTodaysTasks = new list(40,rayItems);
clsListOfTodaysTasks.sort(); //sorts all items abc
ect... ect...
*/
{
	//###############
	//# PROPERTIES #
	//###############
	private rayItemsContanedInThisList;
	private intMaxItemsThisListHolds;

	//###################
	//# DERIVED VALUES #
	//###################
	//derive a value using properties of this class
	public strDerivedValue =  intMaxItemsThisListHolds - count(rayItemsContanedInThisList);

	//#########################
	//# CONSTRUCT DESTRUCT #
	//#########################
	public list(intMaxItems, rayInitalItems)
/*
Description: This function initalises new instances of this class

Parameters: 
intMaxItems,                 -the maximum number of its this list can contain
	rayInitalItems,               - And array of list items to add to the list

Returns:
void
*/
	{
/* Set array and integer values of this class */
this.ItemsContanedInThisList =  rayInitalItems;
	}


	//##############
	//# FUNCTIONS #
	//##############
function funString_ExampleStringDateAppender ( strStringToAddDateTo, booTodaysDateOrTomorrowsDate )
/*
Description: This function adds the current date to the end of some text

Parameters: 
strStringToAddDateTo                  - Some text to add the date to.
	booTodaysDateOrTomorrowsDate - true adds todays date false adds tomorrows.

Returns:
String 
*/
{
	/*
if tomorrows date mode put string into a variable and replace ‘ing’ with a null string
then add the date to the of the string without ‘ing’ and print
it out to the user.
	*/
	if (!booTodaysDateOrTomorrowsDate)
	{
	strString = “string”;
	strString = replace(‘ing’, ‘’,strstring);
	strString = strString.date.tommorow();
	print(strString);
}

// otherwise take ‘ing’ from the end of string and add the current date and print
	else print( replace(‘ing’, ‘’, “string”).date.now()); 
}
}


CSS 

Each styled class, id or element should have some descript of where its located and what the style is trying to acheive. Example:
/* this is the box in the bottom right, were trying to control the text insides properties*/
div#1 { color:green;font-weight:bold; }

