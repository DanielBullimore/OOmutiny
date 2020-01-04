//Javascript Document
//Copyright 2019 Daniel Bullimore
//* File Name: O.class.js
//* System: OOmutiny
//* Dependencies: <Name any files this one requires to operate correctly>
//****************************************************************************************************** 	
//* Author:        Daniel Bullimore
//* Authors email: daniel.k.bullimore@gmail.com
//* Written:       31/12/2019
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
Stable Loop, executes queued interrupts between drawing the "world".
Drawing the world involves redrawing all the rendered objects to synchronize their GUI state with their
programmatic states. Interrupts are generated by events and are intended to ether act(small immediate
animations) or solve(change a instances properties). I envision the loop + interrupt relationship 
working like an appointment book, except the book is kept by the sun at the center of a solar system.

*That suns line of sight is static

*The sun only sees interrupts by appointment, but they must be on time

*Each page of an appoint book is normally divided into denominated appointment slots.For our sun those
slots are its planets

*More than one Interrupt can queue on a single planet appointment slot

*Interrupts can not queue on the planet furthest from the sun, that slot draws the world

*The planets distances from the sun is determined by a benchmark run before the sun ever existed

*Each time a planet crosses the suns line of sight, the sun executes one interrupt.

*A solar year ends when the most distant planet crosses the suns line of sight it redraws the world(one frame)

As a result the sun can now deal with one off interrupts on a priority basses.A four planet solar system
  will see its closest planet 4 times before it sees its most distant planet once(complete iteration of the
  stable loop).Highest priority interrupts go on the closest planet and lower priority on more distant ones.
  As a cool side effect an HID interrupt on planet 1 might set an interrupt on planet 2 which could be 
  executed before the solar year ends.It also allows 3 intensity settings  for high frequency repeating interrupts.

So what I 'm trying to do here is remove the time in exact milliseconds
  from the framework. The number of milliseconds each iteration of the game
  loop takes is dynamic per machine it benchmarks. So developers 
  implementing my OoMutiny framework couldn't book an interrupt in 67 
  milliseconds if a benchmark determined a 1000 millisecond loop because it
  wouldn 't ever be executed. However if we benchmark two machines A and B.
  A scored 1000ms solar year (complete loop, 1 frame), B scored 400ms. 
  Then we divide those scores by three to get the first planets cycles per
  solar year, divide by 4 to get planet 2, 7 for planet 3...
  Thus our developers can book an interrupt in "Cycles"
  on both machines confident that it will be executed in a timely and 
  graceful fashion regardless of an individual client machines computing power.
  Real time can be derived in a Cycles per second benchmark.
  
This one system quickly provides:

  *Prioritization of immediate interrupts
  *Intensity of high frequency interrupts
  *scaled time critical interrupts over multi solar year runs
  *Performance tailored to each client.

Properties:
  numBenchmarkSolarYear - Protected number, interval in milliseconds between drawing each frame.(one solar year)
  numCyclesPerSecond - private number, derived value, effectively frames per second.Used to calculate realtime.
  rayMecury - public array, highest priority appointment slot for interrupts.11: 1 solar year
  rayVenus - public array, medium priority appointment slot for interrupts.7: 1 solar year
  rayEarth - public array, lowest priority appointment slot for interrupts.4: 1 solar year
  rayMars - public array, list of all the objects to render in the next frame.

Methods:
  funBenchmark() - determines a stable interval in milliseconds
  for the users computer to run the game loop
  funStartLoop() - initiates the game loop
  funStopLoop() - ends the game loop
  funTurnCircle() - set game loop intensity in milliseconds manually
  funRedrawTheWorld - Renders one full frame by calling funRender() method of all the objects in rayMars
*/
//# OOmutiny is licensed under the BSD 3-Clause "New" or "Revised" License
//# To view a copy of this license, visit https://github.com/DanielBullimore/OOmutiny/blob/master/LICENSE
//****************************************************************************************************** 
//###############
//# PROPERTIES #
//###############

var numBenchmarkSolarYear = 0;
var threads = {
  "mars": {
    "work": [],
    "numExeT": 0,
    "fractal": 3
  },
  "earth": {
    "work": [],
    "numExeT": 0,
    "fractal": 4
  },
  "venus": {
    "work": [],
    "numExeT": 0,
    "fractal": 7
  },
  "mercury": {
    "work": [],
    "numExeT": 0,
    "fractal": 11
  },
};

//###################
//# DERIVED VALUES #
//###################
//#########################
//# CONSTRUCT DESTRUCT #
//#########################
//##############
//# FUNCTIONS #
//##############
function funStartLoop() {
  /*
  Description: initiates the game loop provided bench mark is not zero
  Parameters:
  -
  Returns: -
  */
  if (threads.mercury.numExeT === 0)
  {//Light the fires and kick the tyres
    threads.mercury.numExeT = new Date();
    threads.venus.numExeT = new Date();
    threads.earth.numExeT = new Date();
    threads.mars.numExeT = new Date();
    console.log("kicking the tyres and lighting the fires");
  }
  /* If this machine has been benchmarked and the loop isnt puased
   * zero = no benchmark do not loop
   * positive number = benchmarked
   * negative number = puase
   */
  if (numBenchmarkSolarYear > 0)
  {
    //iterate through the list of planet-threads stored on mars array
    for (var strPlanet in threads)
      {    
        //save the exact date in milliseconds
        var datNow = new Date();
        if ( (datNow.valueOf() - threads[strPlanet].numExeT.valueOf()) >= numBenchmarkSolarYear/threads[strPlanet].fractal)
  //### Reached Apointment Time ^^^
        {
          numExecutedInterrupt = -1;
          for (var interrupt = 0; interrupt < Object.keys(threads[strPlanet].work).length+Object.keys(threads[strPlanet].work).length; interrupt++)
          //iterate through interrupts
          {
            if ( interrupt < Object.keys(threads[strPlanet].work).length)
      //### Pre Interrupt Accounting>>>
            {
              threads[strPlanet].work[interrupt].numCycleCount++;
            }
            else //if  (numExecutedInterrupt >= 0)
      //### Interrupt >>>
            {
              numExecutedInterrupt = interrupt - Object.keys(threads[strPlanet].work).length;
              if ( 
                ( numExecutedInterrupt < Object.keys(threads[strPlanet].work).length)
                &&
                (threads[strPlanet].work[numExecutedInterrupt].numCycleCount >= threads[strPlanet].work[numExecutedInterrupt].numCycles) 
                )
              {
                //Fun Act
                if (threads[strPlanet].work[numExecutedInterrupt].booActOrSolve === true)
                {
                  this.funAct = threads[strPlanet].work[numExecutedInterrupt].funAct;
                  this.funAct();

                }
                //Fun Solve
                else
                {
                  this.funSolve = threads[strPlanet].work[numExecutedInterrupt].funSolve;
                  this.funSolve();

                }
                                  threads[strPlanet].work[numExecutedInterrupt].numCycleCount = 0;
                                  threads[strPlanet].numExeT = datNow;
                break;
              }
            }
          }
//### Delete or Shift State? for executed interrupt only >>>
          if (numExecutedInterrupt >= 0) 
          /* making mods to the array after all inerations are complete 
          * otherwise the mods affect the order of indice/keys
          */
          {
            
          //if the executed interrupt is a repeater
            if (threads[strPlanet].work[numExecutedInterrupt].booRepeat === true)
            {
              numExecutions = threads[strPlanet].work[numExecutedInterrupt].numExecutions;
              // push infinite repeating interrupts to the end of the appointment book
              if (numExecutions === 0 )
              {
                //Unlimited repeating appointment, Shift interrupt to the end of array
                threads[strPlanet].work.push(threads[strPlanet].work[numExecutedInterrupt]);
                threads[strPlanet].work.splice(numExecutedInterrupt,1);
                //console.log("repeat shift")
                //alert(""+strPlanet);
              }
              else if (numExecutions > 1)
              {
                //Interrupt has more appointments booked decrease numExecutions & shift it to end of array
                threads[strPlanet].work[numExecutedInterrupt].numExecutions--;
                threads[strPlanet].work.push(threads[strPlanet].work[numExecutedInterrupt]);
                threads[strPlanet].work.splice(numExecutedInterrupt, 1);
              }
              else if (numExecutions === 1)
              {
                //The last of multiple appointments executed, delete interrupt
                threads[strPlanet].work.splice(numExecutedInterrupt, 1);
              }
            }
          //for single executing interrupts
            else
            {
              // Appointment complete, delete it
              threads[strPlanet].work.splice(numExecutedInterrupt, 1);
              //console.log("del no rep")
            }
          }
        }
      }
    }
  /*>>> Now do some accounting.Machines measure timing in a frequency of electon pulses in hz(Ghz, Mhz, Hz).This software measures
    time in milliseconds.It is posible that a fast cpu could execute
    more than one interupt per millisecond.*Determine
    if another thread executed this millisecond
    *add another collision.
  */
  else if (numBenchmarkSolarYear < 0) 
  {
      numBenchmarkSolarYear -= numBenchmarkSolarYear + numBenchmarkSolarYear;
  }
  window.setTimeout(funStartLoop , 1);
  //console.log("LOOP!");
}

function funStopLoop()
/* Description: 
    ends execution of game loop 
* Parameters: - 

* Returns: -
*/
{
  /*inverse the benchmark so its negative value ends execution 
   * but retains the value (to restart with out a new bench) 
   */
  numBenchmarkSolarYear -= numBenchmarkSolarYear + numBenchmarkSolarYear;

}

function funBenchmark() {
  /* Description: 
      calculate how intense a loop the cliet machine can run well
      measure how long it takes to plot a 1000 value vector matrix
  * Parameters: -
  * Returns: -
  */
  //if (executions < 10000) {
  //Beanch Mark 
  //if(confirm("I will now benchmark your browser."))
  if (numBenchmarkSolarYear === 0)
  {
    //dom in a transperent canvas
    document.getElementById("bencher").width=1000;
    document.getElementById("bencher").height=1000;
    //color 1000/1000 px grid one px at a time ether black or white based on random 1|0
    //todo:what size is the screen          
    var xLine = new o();
    xLine.numCycles = 1;
    xLine.booActOrSolve = true;
    xLine.booRepeat = true;
    xLine.numExecutions = 1000;
    xLine.x = 0;
    xLine.y = 0;
    xLine.a = new Date();
    xLine.b = 0;
    xLine.funAct = function()
    {
      xLine.x++;
      xLine.y++
      elbencher = document.getElementById("bencher");
      bencher = elbencher.getContext("2d");
      if (Math.random() === 1)
      {
        bencher.strokeStyle = "#ffffff";
      }
      else
      {
        bencher.strokeStyle = "#000000";
      }
      //paint line at A=(x,y)B=(x,y)
      bencher.moveTo(xLine.x, xLine.y);
      bencher.lineTo((xLine.x+xLine.x)+10, xLine.y^3);//widthOFScreen-x, (widthOfScreen/10)*y^3
      bencher.stroke();
      //console.log(xLine.x+" "+xLine.y)
    };
    threads.mercury.work.push(xLine);
    //document.getElementById("bencher").width = 0;
    //document.getElementById("bencher").height = 0;
    numBenchmarkSolarYear = 1; //c+1;
    funStartLoop();
  }  
}
