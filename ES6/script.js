/*
//variables

//ES5
var name5 = 'John';
var age5 = 23;
name5 = 'mark';
console.log(name5);


// let and const
//ES6
//const - cannot be changed
const name6 = 'John';
//let - can be changed after (similar to var)
let age6 = 24;
name6 = 'mark';
console.log(name6);
*/



/*
//functions 
//ES5
function deriverLicence5(passTest){
	if(passTest){
		console.log(firstName);//undefined in ES5 (using variable before declaration statement)
		var firstName='John';
		var yob = 1990;
	}
	console.log(firstName + " " + yob + ' can drive a car');


}

deriverLicence5(true);

//ES6
//let and const are block scoped
function deriverLicence6(passTest){
	//console.log(firstName);//error in ES6 (using variable before declaration statement)
	let firstName;
	const yob = 1990;
	if(passTest){
		
		// let firstName='John';
		// const yob = 1990;
		firstName = 'John';
	}
	console.log(firstName + " " + yob + ' can drive a car');
}

deriverLicence6(true);

//another example of block scoped
let i = 23;
for(let i=0;i<5;i++){
	console.log(i);
}
console.log(i);
*/


/*
////////////////////////////////////////
//Blocks and IIFEs
//defining a block in ES6 -- {}
{
	//remember this block is private iff you use ES6 variables let and const;
	//if you use var they can be accessible from outside;
	const a=1;
	let b = 7;
	console.log(a+b);
}

//defining a block in ES5 
(function(){console.log('IIFEs');})();
*/


/*
///////////////////////////////////////////////
//strings in ES6
let firstName = 'John';
let lastName = 'mark';
const yob = 1987;
function calcAge(yob){
	return 2020-yob;
}

//ES5
console.log('this is ' + firstName +' '+ lastName + ' age = ' + calcAge(yob));

//ES6
console.log(`this is ${firstName} ${lastName} age = ${calcAge(yob)}`);

const name = `${firstName} ${lastName}`;
console.log(name.startsWith('J'));
console.log(name.endsWith('ark'));
console.log(name.includes('r'));
console.log(`${firstName} `.repeat(7));
*/


/*
////////////////////////////////////////////
//Arrow functions

const years = [1990,1997,1996,1987,1945,1985];

//ES5
var ages5  = years.map(function(el){
	return 2020-el;
});
console.log(ages5);

//ES6
let ages6 = years.map(el => 2020-el);
console.log(ages6);

ages6 = years.map((el,ind) => `Age element ${ind+1} : ${2020-el}.`);
console.log(ages6);

ages6 = years.map((el,ind) => {
	const now = new Date().getFullYear();
	const age = now-el;
	return age;
});
console.log(ages6);


//ES5
var box5 = {
	color:'green',
	position:1,
	clickMe:function(){
		var self = this;
		document.querySelector('.green').addEventListener('click',function(){
			//var str = 'this box numer = ' + this.position + ' ' + this.color;
			var str = 'this box numer = ' + self.position + ' ' + self.color;
			alert(str);
		})
	}
}

box5.clickMe();

//ES6
var box6 = {
	color:'green',
	position:1,
	clickMe:function(){
		document.querySelector('.green').addEventListener('click',()=> {
			var str = 'this box numer = ' + this.position + ' ' + this.color;
			alert(str);
		})
	}
}

box6.clickMe();

*/


/*
///////////////////////////////////////////
//Destructuring

//ES5
var john = ['john',23];
var name5 = john[0];
var age5 = john[1];

//ES6
const [name,age] = ['john',23];
const [a,b,c,d,e] = [1,2,5,3,2];
console.log(a,b,c,d,e)

const obj = {
	firstName:'john',
	lastName : 'mark'
}

const {firstName:as,lastName:bs} = obj;
console.log(as,bs);

function AgeRetirement(year){
	const age = new Date().getFullYear() - year;
	return [age,77-age];
}

const [age2,ret2] = AgeRetirement(1995);
console.log(age2,ret2);

*/


/*
//////////////////////////////////////////////
//Arrays

const boxes = document.querySelectorAll('.box');
//ES5
var boxesArr5 = Array.prototype.slice.call(boxes);
boxesArr5.forEach(function(cur){
	cur.style.backgroundColor = 'dodgerblue';
});

//ES6
const boxesArr6 = Array.from(boxes);
boxesArr6.forEach(cur=>cur.style.backgroundColor = 'red');

//ES5
for(var i=0;i<boxesArr5.length;i++){
	if(boxesArr5[i].className==='box blue'){
		continue;
	}
	boxesArr5[i].textContent = "blue";
}


//ES6
for(const cur of boxesArr6){
	if(cur.className === 'box green'){continue;}
	cur.textContent = 'green';
}


//ES5
var ages = [12,17,8,32,21,14,11,38];
var full = ages.map(function(cur){
	return cur >= 18;
})
console.log(full);
console.log(ages[full.indexOf(true)]);

//ES6
console.log(ages.findIndex(cur => cur>= 18));
console.log(ages.find(cur => cur>= 18));

*/


/*
//////////////////////////////////////
//Spread Operator

function addFourNumbers(a,b,c,d){
	return a+b+c+d;
}

var sum1 = addFourNumbers(2,4,1,5);
console.log(sum1);

//ES5
var nums = [2,4,1,5];
var sum2 = addFourNumbers.apply(null,nums);
console.log(sum2);

//ES6
//spread operator - ...
const sum6 = addFourNumbers(...nums);
console.log(sum6);

const f1 = ['john','jane','jame'];
const f2 = ['mary','moni','mike'];
const bgf = [...f1,'raavan',...f2];
console.log(bgf);

const h = document.querySelector('h1');
const boxes = document.querySelectorAll('.box');
const arr = [h,...boxes];
Array.from(arr).forEach(cur=>cur.style.color='purple');
*/


/*
/////////////////////////////////////
//Rest parameters

// //ES5
// function isFullAge5(){
// 	var args = Array.prototype.slice.call(arguments);
// 	args.forEach(function(cur){
// 		console.log((2020-cur)>=18);
// 	})
// }

// isFullAge5(1997,2010,1993,2012,2000);

// //ES6
// function isFullAge6(...years){
// 	years.forEach(cur => console.log((2020-cur)>=18));
// }

// isFullAge6(1997,2010,2012,1928,2012,2000);


//ES5
function isFullAge5(limit){
	var args = Array.prototype.slice.call(arguments,1);
	args.forEach(function(cur){
		console.log((2020-cur)>=limit);
	})
}

isFullAge5(21,1997,2010,2000);

//ES6
function isFullAge6(limit,...years){
	years.forEach(cur => console.log((2020-cur)>=limit));
}

isFullAge6(21,1928,2012,2000);

*/



/*
//////////////////////////////////////////////
//Default paramaters

//ES5
function Person(firstName,lastName,age,yob){

	lastName === undefined ? lastName='smith' : lastName=lastName;
	this.firstName= firstName;
	this.lastName = lastName;
	this.age = age;
	this.yob = yob;
}

var john = new Person('john');
console.log(john);
var emily = new Person('emily','f**',32,1999);
console.log(emily);

//ES6
function Person6(firstName,lastName='smith',age=32,yob=1997){
	this.firstName= firstName;
	this.lastName = lastName;
	this.age = age;
	this.yob = yob;
}

john6 = new Person6('john');
console.log(john6);

*/

/*
//////////////////////////////////////////////
//Map
const map = new Map();
map.set('question','what just happened?');
map.set('ans','nothing');
console.log(map.has('question'));
console.log(map.get('ans'));
//map.delete('question');
//map.clear();
map.forEach((value,key) => console.log(key,value));

for(let [key,value] of map.entries()){
	console.log(key,value);
}
*/



/*
//////////////////////////////////////////////////
//Classes

//ES5
function Person5(name,yob,job){
	this.name = name;
	this.yob = yob;
	this.job = job;
}

Person5.prototype.calcAge = function(){
	var age = new Date().getFullYear()-this.yob;
	console.log(age);
}

var john = new Person5('john',1977,'software engineer');
john.calcAge();

//ES6
class Person6{
	constructor(name,yob,job){
		this.name=name;
		this.yob=yob;
		this.job=job;
	}
	calcAge(){
		var age = new Date().getFullYear()-this.yob;
		console.log(age);
	}

	static greeting(){
		console.log('this is a static function');
	}
}

john6 = new Person6('john',1977,'coder');
john6.calcAge();
Person6.greeting();

*/


class Park{
	constructor(name,buildYear,trees,area){
		this.name = name;
		this.buildYear = buildYear;
		this.trees = trees;
		this.area = area;
	}

	getAge(){
		const date = new Date().getFullYear();
		console.log(date);
		return date-this.buildYear;
	}

	getDensity(){
		return this.trees/this.area;
	}

}


class Street{
	constructor(name,buildYear,length){
		this.name = name;
		this.buildYear=buildYear;
		this.streetLength = length;
	}
}


const p1 = new Park('park1',1994,1000,234);
const p2 = new Park('park2',1973,2000,356);
const p3 = new Park('park3',1945,198,100);

const s1 = new Street('street1',1923,199);
const s2 = new Street('street2',1934);
const s3 = new Street('street3',1974,200);
const s4 = new Street('street4',1928,100);

let parks = [p1,p2,p3];
let streets = [s1,s2,s3,s4];

//tree density
parks.forEach(el => console.log(`${el.name} has a tree density of ${el.getDensity()}`));

//average age of the parks
let total = 0;
for(const el of parks){
	total += el.getAge();
}
console.log(total/parks.length);

//parks more than 1000 trees
parks.forEach(el => {
	if(el.trees > 1000) {
		console.log(`${el.name} has more than 1000 trees (${el.trees})`);
	}
});

//total lenth and average;
let totalLength = 0;
for(const vl of streets){
	if(vl.streetLength) {totalLength += vl.streetLength;}
}
console.log(`total length = ${totalLength} and average length = ${totalLength/streets.length}`);

// //size classification
// let min=-1;
// let max=-1;
// for(const el of streets){
// 	if(min > el.length || min === -1) {
// 		min = el.length;
// 	}
// 	if(max < el.length || max === -1){
// 		max = el.length;
// 	}
// }
// let range = max - min;
// for(const el of streets){
// 	let temp;
// 	if(el.length === undefined) {
// 		temp = 'normal';
// 	}
// 	else if(el.length < (range*2)/5 ){
// 		temp = 'small';
// 	}
// 	else if(el.length < (range*3)/5){
// 		temp = 'normal';
// 	}
// 	else if(el.length < (range*4)/5){
// 		temp = 'big';
// 	}
// 	else if(el.length < (range*5)/5){
// 		temp = 'huge';
// 	}

// 	console.log(`${el.name} is ${temp}`);

// }


