// modules

//IIFE and closures
var budgetController = (function(){
	var Expense = function(id,description,value){
		this.id = id;
		this.description = description;
		this.value = value;
		this.percent = -1;

	};

	Expense.prototype.percentCalc = function(totalIncome){
		if(totalIncome >0){
			this.percent = Math.round((this.value/totalIncome)*10000)/100;
		}
		else {
			this.percent = -1;}

		};

	Expense.prototype.getPercent = function(){
		return this.percent;
	};

	var Income = function(id,description,value){
		this.id = id;
		this.description = description;
		this.value = value;
	};



	var budget = {
		allItems : {
			exp:[],
			inc:[]
		},
		totals:{
			exp:0,
			inc:0
		},
		totalbudget:0,
		percentage:-1
	};

	var calculateTotal = function(type){
		var total = 0;
		budget.allItems[type].forEach(function(e,i,arr){
			total += e.value;
		});

		budget.totals[type] = total;
	};

	return {
		addItem:function(type,des,value){
			var item;
			var ID=0;
			if (budget.allItems[type].length > 0) {ID = budget.allItems[type][budget.allItems[type].length - 1].id + 1;}
			if (type==='exp'){
				item = new Expense(ID,des,value);

			}
			else {
				item = new Income(ID,des,value);
			}

			budget.allItems[type].push(item);
			return item;
		},
		testing:function(){
			console.log(budget);
		},
		calculateBudget:function(){
			calculateTotal('inc');
			calculateTotal('exp');
			budget.totalbudget = budget.totals.inc - budget.totals.exp;
			if(budget.totals.inc > 0) {budget.percentage = Math.round((budget.totals.exp/budget.totals.inc)*10000)/100;}
			else {budget.percentage = -1;}
		},
		calculatePercentages : function(){
			budget.allItems['exp'].forEach(function(cur){
				cur.percentCalc(budget.totals.inc);
			});
		},
		getPercentages : function(){
			var allPercentages = budget.allItems.exp.map(function(cur){
				return cur.getPercent();
			});
			return allPercentages;
		},
		getBudget: function(){
			return {
				totalBudget : budget.totalbudget,
				totalIncome : budget.totals.inc,
				totalExpenses : budget.totals.exp,
				percentage : budget.percentage
			}
		},
		deleteBudgetItem:function(id,type){
			var ids = budget.allItems[type].map(function(cur){
				return cur.id;
			});

			var index = ids.indexOf(id);
			if(index !==-1){
				budget.allItems[type].splice(index,1);
			}
			
		}
	}



})();







var UIController = (function(){
		//code for ui controlling


		var formatNumber = function(num,type){
				num = Math.abs(num);
				num = num.toFixed(2);
				var numSplit = num.split('.');
				var int = numSplit[0];
				var dec = numSplit[1];
				if(int.length > 3){
					int.substr(0,int.length-3) + ',' + int.substr(int.length-3,3);
				}
				var sign;
				type === 'exp'?sign = '-':sign = '+';
				return sign + ' ' + int +'.'+ dec;

			};

		var DOM = {
			inputType:'.add__type',
			inputDescription:'.add__description',
			inputValue:'.add__value',
			inputButton:'.add__btn',
			incomeContainer : '.income__list',
			expenseContainer : '.expenses__list',
			budgetIncome : '.budget__income--value',
			budgetExpense : '.budget__expenses--value',
			budgetValue : '.budget__value',
			expensePercent : '.budget__expenses--percentage',
			container : '.container',
			expensePercentLabel : '.item__percentage',
			dateLabel:'.budget__title--month'

		};

		var nodeListForEach = function(list,callback){
					for(var i=0;i<list.length;i++){
						callback(list[i],i);
					}
				};

		return {
			getInput:function(){

				return {
					type: document.querySelector(DOM.inputType).value,
					description: document.querySelector(DOM.inputDescription).value,
					value: parseFloat(document.querySelector(DOM.inputValue).value)
				};
			},
			getDOMStrings:function(){
				return DOM;
			},
			displayMonth:function(){

				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth();
				var monthNames = ['jan','feb','march','april','may','june','july','aug','sep','october','nov','dec'];
				document.querySelector(DOM.dateLabel).textContent = monthNames[month]+','+year;

			},
			addListItem:function(obj,type){
				var html,newHtml,element;
				if (type === 'inc'){
						element = DOM.incomeContainer;
						html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
						}
				else {
						element = DOM.expenseContainer;
						html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">%percent%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
					}

				newHtml = html.replace('%id%',obj.id);
				newHtml = newHtml.replace('%description%',obj.description);
				newHtml = newHtml.replace('%value%',formatNumber(obj.value,type)); 

				document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);

			},

			deleteListItem:function(sid){
				document.getElementById(sid).parentNode.removeChild(document.getElementById(sid));
			},

			clearFields:function() {
				var fields,fieldsArray;
				fields = document.querySelectorAll(DOM.inputDescription + ', ' + DOM.inputValue);
				fieldsArray = Array.prototype.slice.call(fields);
				fieldsArray.forEach(function(current,index,array){
					current.value = "";
				});

				fieldsArray[0].focus();
			},

			displayBudget:function(bud){
				var type ;
				bud.totalBudget >=0 ? type = 'inc' : type = 'exp';
				document.querySelector(DOM.budgetValue).textContent = formatNumber(bud.totalBudget,type);
				document.querySelector(DOM.budgetIncome).textContent =formatNumber(bud.totalIncome,'inc');
				document.querySelector(DOM.budgetExpense).textContent = formatNumber(bud.totalExpenses,'exp');
				

				if(bud.percentage > 0){
					document.querySelector(DOM.expensePercent).textContent = bud.percentage + '%';
				}
				else{
					document.querySelector(DOM.expensePercent).textContent = '--';
				}
			},
			displayPercentages:function(per){
				var fields = document.querySelectorAll(DOM.expensePercentLabel);
				


				nodeListForEach(fields,function(cur,i){
					if(per[i] > 0){
						cur.textContent = per[i] + '%';
					}
					else {
						cur.textContent = '--';
					}
								
				});
			},
			changedType:function(){
				var fields = document.querySelectorAll(DOM.inputType+','+DOM.inputDescription+','+DOM.inputValue);
				nodeListForEach(fields,function(cur,i){
					cur.classList.toggle('red-focus');
				});
				document.querySelector(DOM.inputButton).classList.toggle('red');
			},
		}
})();






var Controller = (function(Bctrl,Uctrl){

	var setListeners = function(){

			var DOM = Uctrl.getDOMStrings();
			document.querySelector(DOM.inputButton).addEventListener('click',ctrlAddItem);
			document.addEventListener('keypress',function(event){
					if (event.keyCode === 13 || event.which === 13){
						ctrlAddItem();
					}
			});

			document.querySelector(DOM.container).addEventListener('click',deleteItem);
			document.querySelector(DOM.inputType).addEventListener('change',Uctrl.changedType);

	};

	var updateBudget = function(){
		Bctrl.calculateBudget();

		var bud = Bctrl.getBudget();
		Uctrl.displayBudget(bud);
	};

	var ctrlAddItem = function(){
		var input = Uctrl.getInput();

		if(input.description !== "" && !isNaN(input.value) && input.value>0) {
		
			var item = Bctrl.addItem(input.type,input.description,input.value);
		
			Uctrl.addListItem(item,input.type);
			Uctrl.clearFields();

			updateBudget();
			updatePercentages();
		}
	};

	var updatePercentages = function(){
		Bctrl.calculatePercentages();
		var percentages = Bctrl.getPercentages();
		Uctrl.displayPercentages(percentages);
	};

	var deleteItem = function(event){
		var itemId,splitId;
		itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;
		if(itemId){
			splitId = itemId.split('-');
			type = splitId[0];
			id = parseInt(splitId[1]);

			Bctrl.deleteBudgetItem(id,type);
			updateBudget();
			updatePercentages();
			Uctrl.deleteListItem(itemId);



		}

	};


	return {
		init : function(){
			console.log('started');
			Uctrl.displayBudget({
				totalBudget : 0,
				totalIncome : 0,
				totalExpenses : 0,
				percentage : -1
			});
			setListeners();
			Uctrl.displayMonth();
		}
	}

})(budgetController,UIController); 


Controller.init();