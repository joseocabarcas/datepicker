
(function($, moment) {
	var pluginName = "datepicker";
 
	// Instance moment locale
	moment.locale('es');
 
	// Constructor
	this.datepicker = function() {
		this.element = arguments[0].element;
		this.currentDate = moment();
		this.template = null;
		console.log(arguments[0].element)
		this.initialize();
	}

	datepicker.prototype = {
		initialize: function() {
			this.initializeTemplate();
			this.show();
			this.initButtons();
		},
		initDate: function(da) {
			this.showDate(da);
		},
		showDate: function(data) {
			if (data) {
				document.getElementById('year').innerHTML = data.format('YYYY');
				document.getElementById('datepicker').style.display = 'block';
			}
		},
		initializeTemplate: function() {
			this.template = `
				<div class="datepicker" id="datepicker" style="display: none;">
					<div class="year" id="year"></div>
					<div class="next" id="nextYear">N</div>
				</div>
			`
		},
		initButtons: function() {
				console.log(this)
			document.getElementById('nextYear').addEventListener("click", (e) => {
				console.log(e)
				this.currentDate.add(1, 'years');
				this.initDate(this.currentDate)
			});
			document.getElementById(this.element).addEventListener("click", (e) => {
				console.log(e)
				this.initDate(this.currentDate)
			});
		},
		show: function() {
			console.log('this.template')
			document.body.innerHTML += this.template;
		}
	}
 
})(jQuery, moment);
